'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { quizContent } from '@/lib/quizContent'
import { Button } from '@/components/ui/DS'

interface Props {
  lesson: any
  userId: string
  isRevision?: boolean
  onBack: () => void
  onComplete: (score: number) => void
  completing: boolean
}

export default function LessonQuiz({ lesson, userId, isRevision, onBack, onComplete, completing }: Props) {
  const questions = quizContent[lesson.slug] ?? quizContent['fallback']
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [revealed, setRevealed] = useState<Record<string, boolean>>({})
  const [wrongAttempts, setWrongAttempts] = useState<Record<string, number>>({})

  const handleAnswer = (qId: string, value: string, correct: string) => {
    if (revealed[qId] && answers[qId] === correct) return

    setAnswers(prev => ({ ...prev, [qId]: value }))

    if (value === correct) {
      setRevealed(prev => ({ ...prev, [qId]: true }))
    } else {
      setWrongAttempts(prev => ({ ...prev, [qId]: (prev[qId] ?? 0) + 1 }))
    }
  }

  const allCorrect = questions.every(q => answers[q.id] === q.correct)

  const isUnlocked = (index: number) => {
    if (index === 0) return true
    return questions.slice(0, index).every(q => answers[q.id] === q.correct)
  }

  const handleSubmit = async () => {
    const scorePct = 100
    if (!isRevision) {
      const supabase = createClient()
      await supabase.from('quiz_attempts').insert({
        user_id: userId,
        lesson_id: lesson.id,
        answers,
        score_pct: scorePct,
        passed: true,
      })
    }
    onComplete(scorePct)
  }

  return (
    <div>
      {/* Tag */}
      <div className="inline-flex items-center gap-1.5 bg-[#FFF7ED] text-[#92400E] text-xs font-bold px-3 py-1.5 rounded-full border border-[#FDE68A] mb-4">
        <span>★</span> {isRevision ? 'Practice quiz' : `Quick quiz · ${questions.length} questions`}
      </div>

      <h2 className="text-[22px] font-extrabold text-[#18181B] mb-2">
        {isRevision ? 'Practice quiz' : 'Check your understanding'}
      </h2>
      <p className="text-sm text-[#71717A] font-semibold mb-8">
        {isRevision
          ? 'This is just for practice — no badges will change.'
          : 'Get all questions right to complete this lesson.'}
      </p>

      <div className="flex flex-col gap-8 mb-8">
        {questions.map((q, i) => {
          const unlocked = isUnlocked(i)
          const userAnswer = answers[q.id]
          const isCorrect = userAnswer === q.correct
          const isWrong = userAnswer && !isCorrect

          return (
            <div
              key={q.id}
              className={`transition-opacity duration-300 ${unlocked ? 'opacity-100' : 'opacity-30 pointer-events-none'}`}
            >
              <div className="text-[11px] font-bold text-[#9B9A97] tracking-[0.1em] uppercase mb-2">
                Question {i + 1} of {questions.length}
              </div>
              <p className="text-[17px] font-bold text-[#18181B] mb-4 leading-snug">{q.text}</p>

              <div className="flex flex-col gap-2">
                {q.options.map((opt) => {
                  const isSelected = userAnswer === opt.value
                  const isThisCorrect = opt.value === q.correct
                  const showCorrect = isSelected && isThisCorrect
                  const showWrong = isSelected && !isThisCorrect

                  return (
                    <button
                      key={opt.value}
                      onClick={() => handleAnswer(q.id, opt.value, q.correct)}
                      disabled={!!revealed[q.id]}
                      className={`text-left px-4 py-3 rounded-[16px] border-2 text-[15px] transition-all ${
                        showCorrect
                          ? 'border-[#22C55E] bg-[#F0FDF4] text-[#15803D]'
                          : showWrong
                          ? 'border-[#EF4444] bg-[#FEF2F2] text-[#991B1B]'
                          : isSelected
                          ? 'border-[#18181B] bg-[#F4F4F5] text-[#18181B]'
                          : 'border-[#E4E4E7] bg-white hover:border-[#18181B] hover:bg-[#F4F4F5] text-[#52525B]'
                      } disabled:cursor-default`}
                    >
                      {opt.label}
                    </button>
                  )
                })}
              </div>

              {isCorrect && revealed[q.id] && (
                <div className="mt-3 bg-[#F0FDF4] text-[#15803D] rounded-[12px] p-3 text-sm font-semibold">
                  {q.feedbackOnCorrect}
                </div>
              )}
              {isWrong && (
                <div className="mt-3 bg-[#FEF2F2] text-[#991B1B] rounded-[12px] p-3 text-sm font-semibold">
                  Not quite — {q.hintOnWrong}
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-[#F4F4F5]">
        <button onClick={onBack} className="text-sm text-[#9B9A97] font-semibold hover:text-[#52525B]">← Try it again</button>
        <Button onClick={handleSubmit} disabled={!allCorrect || completing}>
          {completing ? 'Saving...' : isRevision ? 'Finish revision →' : 'Complete lesson →'}
        </Button>
      </div>
    </div>
  )
}
