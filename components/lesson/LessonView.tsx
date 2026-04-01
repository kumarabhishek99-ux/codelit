'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import LessonRead from './LessonRead'
import LessonTryIt from './LessonTryIt'
import LessonQuiz from './LessonQuiz'
import LessonComplete from './LessonComplete'
import BadgeToast from '@/components/ui/BadgeToast'

interface Props {
  module: any
  lesson: any
  allLessons: any[]
  progressMap: Record<string, string>
  initialProgress: any
  userId: string
}

export default function LessonView({
  module: mod,
  lesson,
  allLessons,
  progressMap,
  initialProgress,
  userId,
}: Props) {
  const router = useRouter()
  const [phase, setPhase] = useState<'read' | 'tryit' | 'quiz' | 'complete'>(
    initialProgress?.status === 'completed' ? 'complete' : 'read'
  )
  const [completing, setCompleting] = useState(false)
  const [newlyEarnedBadges, setNewlyEarnedBadges] = useState<any[]>([])

  const lessonIndex = allLessons.findIndex((l: any) => l.id === lesson.id)
  const totalLessons = allLessons.length
  const nextLesson = allLessons[lessonIndex + 1] ?? null

  const phasePills = [
    { key: 'read', label: 'Read' },
    { key: 'tryit', label: 'Try it' },
    { key: 'quiz', label: 'Quiz' },
  ]

  const phaseIndex = { read: 0, tryit: 1, quiz: 2, complete: 3 }

  // Mark lesson as in_progress on mount
  useEffect(() => {
    if (initialProgress?.status !== 'completed') {
      const supabase = createClient()
      supabase.from('user_progress').upsert({
        user_id: userId,
        lesson_id: lesson.id,
        status: 'in_progress',
        started_at: new Date().toISOString(),
      }, { onConflict: 'user_id,lesson_id' })
    }
  }, [])

  const handleComplete = async (scorePct = 100) => {
    setCompleting(true)
    const supabase = createClient()

    await supabase.from('user_progress').upsert({
      user_id: userId,
      lesson_id: lesson.id,
      status: 'completed',
      score_pct: scorePct,
      completed_at: new Date().toISOString(),
    }, { onConflict: 'user_id,lesson_id' })

    // Update last_active_date for streak
    await supabase
      .from('profiles')
      .update({ last_active_date: new Date().toISOString().split('T')[0] })
      .eq('id', userId)

    setCompleting(false)
    setPhase('complete')

    // Poll for new badges (fallback for Realtime)
    setTimeout(async () => {
      const supabase = createClient()
      const { data: newBadges } = await supabase
        .from('user_badges')
        .select('badge_id, earned_at, badge_definitions(*)')
        .eq('user_id', userId)
        .gte('earned_at', new Date(Date.now() - 5000).toISOString())
        .order('earned_at', { ascending: false })

      if (newBadges && newBadges.length > 0) {
        setNewlyEarnedBadges(newBadges.map((b: any) => b.badge_definitions))
      }
    }, 2000)
  }

  const currentPhaseIndex = phaseIndex[phase]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <nav className="bg-white border-b border-gray-100 px-6 py-3.5 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Link href="/dashboard" className="hover:text-gray-700">← Dashboard</Link>
            <span>/</span>
            <span className="text-gray-500">{mod.title}</span>
            <span>/</span>
            <span className="text-gray-900 font-medium truncate max-w-32">{lesson.title}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-xs text-gray-400">
              {lessonIndex + 1} of {totalLessons}
            </div>
            <div className="w-20 h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-400 rounded-full transition-all"
                style={{ width: `${((lessonIndex + 1) / totalLessons) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-6 py-8">

        {/* Phase pills */}
        {phase !== 'complete' && (
          <div className="flex gap-2 mb-8">
            {phasePills.map((p, i) => (
              <div
                key={p.key}
                className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-all ${
                  i < currentPhaseIndex
                    ? 'border-green-300 bg-green-50 text-green-700'
                    : i === currentPhaseIndex
                    ? 'border-blue-300 bg-blue-50 text-blue-700'
                    : 'border-gray-200 bg-white text-gray-400'
                }`}
              >
                {i < currentPhaseIndex ? `✓ ${p.label}` : p.label}
              </div>
            ))}
          </div>
        )}

        {/* Phase content */}
        {phase === 'read' && (
          <LessonRead
            lesson={lesson}
            module={mod}
            onNext={() => setPhase('tryit')}
          />
        )}

        {phase === 'tryit' && (
          <LessonTryIt
            lesson={lesson}
            onBack={() => setPhase('read')}
            onNext={() => setPhase('quiz')}
          />
        )}

        {phase === 'quiz' && (
          <LessonQuiz
            lesson={lesson}
            userId={userId}
            onBack={() => setPhase('tryit')}
            onComplete={handleComplete}
            completing={completing}
          />
        )}

        {phase === 'complete' && (
          <LessonComplete
            lesson={lesson}
            module={mod}
            nextLesson={nextLesson}
          />
        )}

      </div>
      <BadgeToast userId={userId} initialBadges={newlyEarnedBadges} />
    </div>
  )
}
