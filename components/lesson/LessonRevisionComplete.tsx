'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Props {
  lesson: any
  module: any
  nextLesson: any | null
}

export default function LessonRevisionComplete({ lesson, module: mod, nextLesson }: Props) {
  const [shown, setShown] = useState(false)
  useEffect(() => { setTimeout(() => setShown(true), 100) }, [])

  return (
    <div className={`text-center py-8 transition-all duration-500 ${shown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>

      {/* Revision icon */}
      <div className={`w-20 h-20 mx-auto mb-6 transition-all duration-700 delay-100 ${shown ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}>
        <svg viewBox="0 0 80 80" className="w-full h-full">
          <circle cx="40" cy="40" r="36" fill="#E1F5EE" stroke="#5DCAA5" strokeWidth="1.5"/>
          <text x="40" y="50" textAnchor="middle" fontSize="28" fill="#085041" fontFamily="system-ui">↻</text>
        </svg>
      </div>

      <h2 className="text-2xl font-medium text-gray-900 mb-2">Revision done!</h2>
      <p className="text-gray-500 text-sm mb-8 leading-relaxed">
        Good work revisiting <strong className="text-gray-700">{lesson.title}</strong>.
        <br />Revisit 3 lessons total to earn the Reviser badge.
      </p>

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
