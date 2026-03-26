import { createClient } from '@/lib/supabase/server'
import { redirect, notFound } from 'next/navigation'
import LessonView from '@/components/lesson/LessonView'

interface Props {
  params: Promise<{ module: string; lesson: string }>
}

export default async function LessonPage({ params }: Props) {
  const { module: moduleSlug, lesson: lessonSlug } = await params
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  // Fetch module
  const { data: mod } = await supabase
    .from('modules')
    .select('*')
    .eq('slug', moduleSlug)
    .eq('is_published', true)
    .single()

  if (!mod) notFound()

  // Fetch lesson
  const { data: lesson } = await supabase
    .from('lessons')
    .select('*')
    .eq('module_id', mod.id)
    .eq('slug', lessonSlug)
    .eq('is_published', true)
    .single()

  if (!lesson) notFound()

  // Fetch all lessons in this module for progress strip
  const { data: allLessons } = await supabase
    .from('lessons')
    .select('*')
    .eq('module_id', mod.id)
    .eq('is_published', true)
    .order('order_num')

  // Fetch progress for this lesson
  const { data: progress } = await supabase
    .from('user_progress')
    .select('*')
    .eq('user_id', user.id)
    .eq('lesson_id', lesson.id)
    .single()

  // Fetch progress for all lessons in module
  const { data: moduleProgress } = await supabase
    .from('user_progress')
    .select('lesson_id, status')
    .eq('user_id', user.id)
    .in('lesson_id', allLessons?.map((l: any) => l.id) ?? [])

  const progressMap = new Map(moduleProgress?.map(p => [p.lesson_id, p.status]) ?? [])

  return (
    <LessonView
      module={mod}
      lesson={lesson}
      allLessons={allLessons ?? []}
      progressMap={Object.fromEntries(progressMap)}
      initialProgress={progress}
      userId={user.id}
    />
  )
}
