'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

interface Props {
  lesson: any
  userId: string
  isRevision?: boolean
  onBack: () => void
  onComplete: (score: number) => void
  completing: boolean
}

interface Question {
  id: string
  text: string
  options: Array<{ value: string; label: string }>
  correct: string
  hintOnWrong: string
  feedbackOnCorrect: string
}

const lessonQuizzes: Record<string, Question[]> = {
  'the-terminal': [
    {
      id: 'q1',
      text: 'You open the terminal and see a $ symbol. What does it mean?',
      options: [
        { value: 'a', label: 'The terminal has an error' },
        { value: 'b', label: 'The terminal is ready for you to type a command' },
        { value: 'c', label: 'You need to install something first' },
        { value: 'd', label: 'You are logged in as an administrator' },
      ],
      correct: 'b',
      hintOnWrong: 'Think about what you do right after you open the terminal.',
      feedbackOnCorrect: 'The $ is the prompt — it means the terminal is waiting for your input.',
    },
    {
      id: 'q2',
      text: 'What does the command ls do?',
      options: [
        { value: 'a', label: 'Logs you out of the terminal' },
        { value: 'b', label: 'Creates a new folder' },
        { value: 'c', label: 'Lists the files and folders in the current directory' },
        { value: 'd', label: 'Opens a file in a text editor' },
      ],
      correct: 'c',
      hintOnWrong: 'Think about what you\'d want to do first when landing in a new folder.',
      feedbackOnCorrect: 'ls = "list". It shows you what\'s in your current folder, like opening Finder.',
    },
  ],
  'big-picture': [
    {
      id: 'q1',
      text: 'What is the "frontend" of a web application?',
      options: [
        { value: 'a', label: 'The server that stores all the data' },
        { value: 'b', label: 'The part users see and interact with in their browser' },
        { value: 'c', label: 'The code that handles business logic' },
        { value: 'd', label: 'The database where information is saved' },
      ],
      correct: 'b',
      hintOnWrong: 'Think about the restaurant analogy — what does the customer see?',
      feedbackOnCorrect: 'The frontend is the dining room — what users see and interact with directly.',
    },
    {
      id: 'q2',
      text: 'When you open an app and your data appears, what happened?',
      options: [
        { value: 'a', label: 'Your phone generated the data from scratch' },
        { value: 'b', label: 'The data was hardcoded into the app' },
        { value: 'c', label: 'Your device sent a request to a server which fetched data from a database' },
        { value: 'd', label: 'Another user shared the data with you in real time' },
      ],
      correct: 'c',
      hintOnWrong: 'Think about the chain of events we described — device → server → database → back.',
      feedbackOnCorrect: 'Exactly. Your device asks, the server processes, the database responds, and your screen shows the result.',
    },
  ],
}

const fallbackQuiz: Question[] = [
  {
    id: 'q1',
    text: 'What is the main benefit of understanding code even without writing it?',
    options: [
      { value: 'a', label: 'You can fix bugs yourself without help' },
      { value: 'b', label: 'You can communicate better with developers and AI tools' },
      { value: 'c', label: 'You can build apps without any tools' },
      { value: 'd', label: 'You can read anyone\'s private code' },
    ],
    correct: 'b',
    hintOnWrong: 'Think about the goal of this course — it\'s not about writing code.',
    feedbackOnCorrect: 'Code literacy makes you a much better collaborator — with human developers and AI tools alike.',
  },
]

export default function LessonQuiz({ lesson, userId, isRevision, onBack, onComplete, completing }: Props) {
  const questions = lessonQuizzes[lesson.slug] ?? fallbackQuiz
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
      <div className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 text-xs font-medium px-3 py-1.5 rounded-full border border-amber-100 mb-4">
        <span>★</span> {isRevision ? 'Practice quiz' : `Quick quiz · ${questions.length} questions`}
      </div>

      <h2 className="text-xl font-medium text-gray-900 mb-2">
        {isRevision ? 'Practice quiz' : 'Check your understanding'}
      </h2>
      <p className="text-sm text-gray-500 mb-8">
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
              <div className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
                Question {i + 1} of {questions.length}
              </div>
              <p className="text-base font-medium text-gray-900 mb-4 leading-snug">{q.text}</p>

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
                      className={`text-left px-4 py-3 rounded-xl border text-sm transition-all ${
                        showCorrect
                          ? 'border-green-400 bg-green-50 text-green-800'
                          : showWrong
                          ? 'border-red-300 bg-red-50 text-red-800'
                          : isSelected
                          ? 'border-blue-300 bg-blue-50 text-blue-800'
                          : 'border-gray-200 bg-white hover:border-gray-300 text-gray-700'
                      } disabled:cursor-default`}
                    >
                      {opt.label}
                    </button>
                  )
                })}
              </div>

              {isCorrect && revealed[q.id] && (
                <div className="mt-3 bg-green-50 border border-green-200 rounded-xl px-4 py-3 text-sm text-green-800">
                  {q.feedbackOnCorrect}
                </div>
              )}
              {isWrong && (
                <div className="mt-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700">
                  Not quite — {q.hintOnWrong}
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <button onClick={onBack} className="text-sm text-gray-400 hover:text-gray-600">← Try it again</button>
        <button
          onClick={handleSubmit}
          disabled={!allCorrect || completing}
          className="bg-gray-900 text-white text-sm font-medium px-6 py-2.5 rounded-full hover:bg-gray-700 transition-colors disabled:opacity-30"
        >
          {completing ? 'Saving...' : isRevision ? 'Finish revision →' : 'Complete lesson →'}
        </button>
      </div>
    </div>
  )
}
