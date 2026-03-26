import { createClient } from '@/lib/supabase/client'

export type ProgressStatus = 'not_started' | 'in_progress' | 'completed'

// Start a lesson (set status to in_progress)
export async function startLesson(lessonId: string) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  await supabase
    .from('user_progress')
    .upsert({
      user_id: user.id,
      lesson_id: lessonId,
      status: 'in_progress',
      started_at: new Date().toISOString(),
    }, { onConflict: 'user_id,lesson_id' })
}

// Complete a lesson
export async function completeLesson(lessonId: string, scorePct?: number) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  await supabase
    .from('user_progress')
    .upsert({
      user_id: user.id,
      lesson_id: lessonId,
      status: 'completed',
      score_pct: scorePct ?? 100,
      completed_at: new Date().toISOString(),
    }, { onConflict: 'user_id,lesson_id' })

  // Update last_active_date for streak tracking
  await supabase
    .from('profiles')
    .update({ last_active_date: new Date().toISOString().split('T')[0] })
    .eq('id', user.id)
}

// Save a quiz attempt
export async function saveQuizAttempt(
  lessonId: string,
  answers: Record<string, string>,
  scorePct: number,
  passed: boolean
) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  await supabase
    .from('quiz_attempts')
    .insert({
      user_id: user.id,
      lesson_id: lessonId,
      answers,
      score_pct: scorePct,
      passed,
    })
}

// Get all progress for current user
export async function getUserProgress() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []

  const { data } = await supabase
    .from('user_progress')
    .select('*, lessons(slug, module_id)')
    .eq('user_id', user.id)

  return data ?? []
}

// Get progress for a specific lesson
export async function getLessonProgress(lessonId: string) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data } = await supabase
    .from('user_progress')
    .select('*')
    .eq('user_id', user.id)
    .eq('lesson_id', lessonId)
    .single()

  return data
}
