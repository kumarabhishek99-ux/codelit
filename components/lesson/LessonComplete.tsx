'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Props {
  lesson: any
  module: any
  nextLesson: any | null
}

export default function LessonComplete({ lesson, module: mod, nextLesson }: Props) {
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setShown(true), 100)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className={`text-center py-8 transition-all duration-500 ${shown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>

      {/* Badge animation */}
      <div className={`w-20 h-20 mx-auto mb-6 transition-all duration-700 delay-100 ${shown ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}>
        <svg viewBox="0 0 80 80" className="w-full h-full">
          <circle cx="40" cy="40" r="36" fill="#E1F5EE" stroke="#1D9E75" strokeWidth="1.5"/>
          <polyline
            points="22,40 34,52 58,28"
            stroke="#085041"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <h2 className="text-2xl font-medium text-gray-900 mb-2">Lesson complete!</h2>
      <p className="text-gray-500 text-sm mb-8 leading-relaxed">
        You finished <strong className="text-gray-700">{lesson.title}</strong>.
        {nextLesson ? ' The next lesson is ready for you.' : ' You\'ve completed this module!'}
      </p>

      {/* Up next card */}
      {nextLesson && (
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-6 text-left max-w-sm mx-auto">
          <div className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">Up next</div>
          <div className="font-medium text-gray-900 text-sm">{nextLesson.title}</div>
          <div className="text-xs text-gray-500 mt-0.5">{mod.title} · {nextLesson.est_minutes} min</div>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        {nextLesson && (
          <Link
            href={`/learn/${mod.slug}/${nextLesson.slug}`}
            className="bg-gray-900 text-white text-sm font-medium px-6 py-3 rounded-full hover:bg-gray-700 transition-colors"
          >
            Next lesson →
          </Link>
        )}
        <Link
          href="/dashboard"
          className="text-sm text-gray-500 border border-gray-200 px-6 py-3 rounded-full hover:border-gray-300 hover:text-gray-700 transition-colors"
        >
          Back to dashboard
        </Link>
      </div>
    </div>
  )
}
