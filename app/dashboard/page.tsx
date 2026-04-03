import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { ProgressBar } from '@/components/ui/DS'

export default async function DashboardPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  const { data: modules } = await supabase
    .from('modules')
    .select('*, lessons(id, slug, title, est_minutes, order_num)')
    .eq('is_published', true)
    .order('order_num')

  const { data: progress } = await supabase
    .from('user_progress')
    .select('lesson_id, status')
    .eq('user_id', user.id)

  const { data: userBadges } = await supabase
    .from('user_badges')
    .select('badge_id, earned_at, badge_definitions(name, shape, color_ramp)')
    .eq('user_id', user.id)
    .order('earned_at', { ascending: false })
    .limit(4)

  const progressMap = new Map(progress?.map(p => [p.lesson_id, p.status]) ?? [])
  const completedCount = progress?.filter(p => p.status === 'completed').length ?? 0

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

  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  const personaLabels: Record<string, string> = {
    designer: 'Designer track',
    pm_founder: 'PM / Founder track',
    general: 'General track',
  }

  return (
    <div className="min-h-screen bg-[#F4F4F5]">
      {/* Top nav */}
      <nav className="bg-white border-b border-[#F4F4F5] px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[#18181B] rounded-lg flex items-center justify-center">
              <span className="text-white text-xs font-mono font-bold">{'{}'}</span>
            </div>
            <span className="font-bold text-[#18181B] text-sm">Codelit</span>
          </div>
          <div className="flex items-center gap-1">
            <Link href="/dashboard" className="text-sm font-bold text-[#18181B] px-3 py-1.5 rounded-full bg-[#F4F4F5]">
              Dashboard
            </Link>
            <Link href="/badges" className="text-sm text-[#71717A] hover:text-[#18181B] px-3 py-1.5 rounded-full hover:bg-[#F4F4F5] transition-colors">
              Badges
            </Link>
          </div>
          <div className="w-8 h-8 bg-[#18181B] rounded-full flex items-center justify-center text-xs font-bold text-white">
            {firstName[0]?.toUpperCase()}
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Greeting */}
        <div className="mb-6">
          <h1 className="text-2xl font-extrabold text-[#18181B]">{greeting}, {firstName}.</h1>
          <p className="text-sm text-[#71717A] mt-0.5 font-semibold">
            {personaLabels[profile?.persona ?? 'general']}
            {(profile?.streak_days ?? 0) > 0 && ` · ${profile?.streak_days} day streak 🔥`}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { label: 'Lessons done', value: completedCount },
            { label: 'Day streak', value: profile?.streak_days ?? 0 },
            { label: 'Badges earned', value: userBadges?.length ?? 0 },
          ].map((s) => (
            <div key={s.label} className="bg-[#F4F4F5] rounded-[16px] p-4">
              <div className="text-[11px] font-bold text-[#9B9A97] tracking-[0.1em] uppercase mb-1">{s.label}</div>
              <div className="text-2xl font-extrabold text-[#18181B]">{s.value}</div>
            </div>
          ))}
        </div>

        {/* Continue card — inverted black */}
        {currentLesson && (
          <Link
            href={`/learn/${currentLesson.module.slug}/${currentLesson.lesson.slug}`}
            className="block bg-[#18181B] rounded-[20px] p-5 mb-6 hover:opacity-90 transition-opacity"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-bold text-[#9B9A97] tracking-[0.1em] uppercase mb-1">
                  {progressMap.get(currentLesson.lesson.id) === 'in_progress' ? 'Continue where you left off' : 'Start next lesson'}
                </p>
                <p className="font-bold text-white text-base">{currentLesson.lesson.title}</p>
                <p className="text-sm text-[#71717A] mt-0.5">
                  {currentLesson.module.title} · {currentLesson.lesson.est_minutes} min
                </p>
              </div>
              <div className="bg-white text-[#18181B] text-sm font-bold px-4 py-2 rounded-full flex-shrink-0">
                {progressMap.get(currentLesson.lesson.id) === 'in_progress' ? 'Resume →' : 'Start →'}
              </div>
            </div>
          </Link>
        )}

        <div className="grid grid-cols-2 gap-6">
          {/* Modules */}
          <div>
            <p className="text-[11px] font-bold text-[#9B9A97] tracking-[0.1em] uppercase mb-3">Your modules</p>
            <div className="flex flex-col gap-2">
              {modules?.map((mod: any) => {
                const lessons = (mod.lessons ?? []).sort((a: any, b: any) => a.order_num - b.order_num)
                const completedLessons = lessons.filter((l: any) => progressMap.get(l.id) === 'completed').length
                const totalLessons = lessons.length
                const isComplete = completedLessons === totalLessons && totalLessons > 0
                const pct = totalLessons > 0 ? completedLessons : 0
                const isActive = lessons.some((l: any) => progressMap.get(l.id) === 'in_progress')

                const targetLesson =
                  lessons.find((l: any) => progressMap.get(l.id) === 'in_progress') ??
                  lessons.find((l: any) => !progressMap.get(l.id)) ??
                  lessons[0]

                const cardContent = (
                  <>
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                      isComplete ? 'bg-[#F0FDF4] text-[#15803D]' : 'bg-[#F4F4F5] text-[#52525B]'
                    }`}>
                      M{mod.order_num}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-[#18181B] truncate text-sm">{mod.title}</div>
                      <div className="flex items-center gap-2 mt-1.5">
                        <div className="flex-1">
                          <ProgressBar value={pct} max={totalLessons} complete={isComplete} />
                        </div>
                        <span className="text-[11px] text-[#9B9A97] font-bold whitespace-nowrap">
                          {isComplete ? '↻ Revisit' : `${completedLessons}/${totalLessons}`}
                        </span>
                      </div>
                    </div>
                  </>
                )

                const className = `flex items-center gap-3 p-3 rounded-[16px] border text-sm transition-colors ${
                  isActive
                    ? 'border-[#18181B] bg-white'
                    : isComplete
                    ? 'border-[#F4F4F5] bg-white'
                    : 'border-[#F4F4F5] bg-white hover:border-[#E4E4E7]'
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
              <p className="text-[11px] font-bold text-[#9B9A97] tracking-[0.1em] uppercase">Recent badges</p>
              <Link href="/badges" className="text-xs text-[#18181B] font-bold hover:opacity-70">View all →</Link>
            </div>
            {userBadges && userBadges.length > 0 ? (
              <div className="grid grid-cols-2 gap-2">
                {userBadges.map((ub: any) => (
                  <div key={ub.badge_id} className="bg-white border border-[#F4F4F5] rounded-[16px] p-3 text-center">
                    <div className="w-10 h-10 bg-[#F4F4F5] rounded-full mx-auto mb-2 flex items-center justify-center">
                      <span className="text-[#18181B] text-lg font-bold">★</span>
                    </div>
                    <div className="text-xs font-bold text-[#18181B]">{ub.badge_definitions?.name}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white border border-[#F4F4F5] rounded-[16px] p-6 text-center">
                <div className="text-2xl mb-2">🏅</div>
                <p className="text-sm text-[#71717A] font-semibold">Complete your first lesson to earn a badge</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
