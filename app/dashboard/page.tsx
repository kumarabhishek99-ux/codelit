import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import type { ReactNode } from 'react'

export default async function DashboardPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  // Fetch profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  // Fetch published modules
  const { data: modules } = await supabase
    .from('modules')
    .select('*, lessons(id, slug, title, est_minutes, order_num)')
    .eq('is_published', true)
    .order('order_num')

  // Fetch user progress
  const { data: progress } = await supabase
    .from('user_progress')
    .select('lesson_id, status')
    .eq('user_id', user.id)

  // Fetch user badges
  const { data: userBadges } = await supabase
    .from('user_badges')
    .select('badge_id, earned_at, badge_definitions(name, shape, color_ramp)')
    .eq('user_id', user.id)
    .order('earned_at', { ascending: false })
    .limit(4)

  const progressMap = new Map(progress?.map(p => [p.lesson_id, p.status]) ?? [])

  const completedCount = progress?.filter(p => p.status === 'completed').length ?? 0

  // Find the current lesson (first in_progress or first not_started in unlocked module)
  const currentLesson = (() => {
    for (const mod of modules ?? []) {
      for (const lesson of (mod.lessons ?? []).sort((a: any, b: any) => a.order_num - b.order_num)) {
        const status = progressMap.get(lesson.id)
        if (status === 'in_progress') return { lesson, module: mod }
        if (!status) return { lesson, module: mod }
      }
    }
    return null
  })()

  const firstName = profile?.full_name?.split(' ')[0] ?? 'there'

  // Get hour for greeting
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  const personaLabels: Record<string, string> = {
    designer: 'Designer track',
    pm_founder: 'PM / Founder track',
    general: 'General track',
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top nav */}
      <nav className="bg-white border-b border-gray-100 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-purple-100 rounded-lg flex items-center justify-center">
              <span className="text-purple-700 text-xs font-mono font-bold">{'{}'}</span>
            </div>
            <span className="font-medium text-gray-900 text-sm">Codelit</span>
          </div>
          <div className="flex items-center gap-1">
            <Link href="/dashboard" className="text-sm font-medium text-gray-900 px-3 py-1.5 rounded-lg bg-gray-100">
              Dashboard
            </Link>
            <Link href="/badges" className="text-sm text-gray-500 hover:text-gray-900 px-3 py-1.5 rounded-lg hover:bg-gray-50">
              Badges
            </Link>
          </div>
          <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center text-xs font-medium text-teal-700">
            {firstName[0]?.toUpperCase()}
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Greeting */}
        <div className="mb-6">
          <h1 className="text-xl font-medium text-gray-900">{greeting}, {firstName}.</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {personaLabels[profile?.persona ?? 'general']}
            {(profile?.streak_days ?? 0) > 0 && ` · ${profile?.streak_days} day streak`}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { label: 'Lessons done', value: completedCount },
            { label: 'Day streak', value: profile?.streak_days ?? 0 },
            { label: 'Badges earned', value: userBadges?.length ?? 0 },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-xl border border-gray-100 p-4">
              <div className="text-xs text-gray-400 mb-1">{s.label}</div>
              <div className="text-2xl font-medium text-gray-900">{s.value}</div>
            </div>
          ))}
        </div>

        {/* Continue card */}
        {currentLesson && (
          <Link
            href={`/learn/${currentLesson.module.slug}/${currentLesson.lesson.slug}`}
            className="block bg-white rounded-xl border-2 border-blue-200 p-5 mb-6 hover:border-blue-400 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-blue-600 uppercase tracking-wider mb-1">
                  {progressMap.get(currentLesson.lesson.id) === 'in_progress' ? 'Continue where you left off' : 'Start next lesson'}
                </p>
                <p className="font-medium text-gray-900">{currentLesson.lesson.title}</p>
                <p className="text-sm text-gray-500 mt-0.5">
                  {currentLesson.module.title} · {currentLesson.lesson.est_minutes} min
                </p>
              </div>
              <div className="bg-gray-900 text-white text-sm font-medium px-4 py-2 rounded-full">
                {progressMap.get(currentLesson.lesson.id) === 'in_progress' ? 'Resume →' : 'Start →'}
              </div>
            </div>
          </Link>
        )}

        <div className="grid grid-cols-2 gap-6">
          {/* Modules */}
          <div>
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">Your modules</p>
            <div className="flex flex-col gap-2">
              {modules?.map((mod: any) => {
                const lessons = (mod.lessons ?? []).sort((a: any, b: any) => a.order_num - b.order_num)
                const completedLessons = lessons.filter((l: any) => progressMap.get(l.id) === 'completed').length
                const totalLessons = lessons.length
                const isComplete = completedLessons === totalLessons && totalLessons > 0
                const pct = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0
                const isActive = lessons.some((l: any) => progressMap.get(l.id) === 'in_progress')

                // Link to first in_progress, then first not_started, then first lesson (revision)
                const targetLesson =
                  lessons.find((l: any) => progressMap.get(l.id) === 'in_progress') ??
                  lessons.find((l: any) => !progressMap.get(l.id)) ??
                  lessons[0]

                const cardContent = (
                  <>
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-medium flex-shrink-0 ${
                      isComplete ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                    }`}>
                      M{mod.order_num}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900 truncate">{mod.title}</div>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-400 rounded-full transition-all"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-400 whitespace-nowrap">
                          {isComplete ? '↻ Revisit' : `${completedLessons}/${totalLessons}`}
                        </span>
                      </div>
                    </div>
                  </>
                )

                const className = `flex items-center gap-3 p-3 rounded-xl border text-sm transition-colors ${
                  isActive
                    ? 'border-blue-200 bg-blue-50 hover:border-blue-300'
                    : isComplete
                    ? 'border-teal-100 bg-white hover:border-teal-300'
                    : 'border-gray-100 bg-white hover:border-gray-200'
                }`

                return targetLesson ? (
                  <Link
                    key={mod.id}
                    href={`/learn/${mod.slug}/${targetLesson.slug}`}
                    className={className}
                  >
                    {cardContent}
                  </Link>
                ) : (
                  <div key={mod.id} className={className}>{cardContent}</div>
                )
              })}
            </div>
          </div>

          {/* Badges */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Recent badges</p>
              <Link href="/badges" className="text-xs text-purple-600 hover:text-purple-800">View all →</Link>
            </div>
            {userBadges && userBadges.length > 0 ? (
              <div className="grid grid-cols-2 gap-2">
                {userBadges.map((ub: any) => (
                  <div key={ub.badge_id} className="bg-white border border-gray-100 rounded-xl p-3 text-center">
                    <div className="w-10 h-10 bg-purple-100 rounded-full mx-auto mb-2 flex items-center justify-center">
                      <span className="text-purple-700 text-lg">★</span>
                    </div>
                    <div className="text-xs font-medium text-gray-900">{ub.badge_definitions?.name}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white border border-gray-100 rounded-xl p-6 text-center">
                <div className="text-2xl mb-2">🏅</div>
                <p className="text-sm text-gray-500">Complete your first lesson to earn a badge</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
