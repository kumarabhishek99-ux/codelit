'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/DS'

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
          <circle cx="40" cy="40" r="36" fill="#F0FDF4" stroke="#22C55E" strokeWidth="2"/>
          <text x="40" y="50" textAnchor="middle" fontSize="28" fill="#15803D" fontFamily="system-ui">↻</text>
        </svg>
      </div>

      <h2 className="text-[24px] font-extrabold text-[#18181B] mb-2">Revision done!</h2>
      <p className="text-[15px] text-[#52525B] mb-8 leading-relaxed">
        Good work revisiting <strong className="font-bold text-[#18181B]">{lesson.title}</strong>.
        <br />Revisit 3 lessons total to earn the Reviser badge.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        {nextLesson && (
          <Link href={`/learn/${mod.slug}/${nextLesson.slug}`}>
            <Button size="lg">Next lesson →</Button>
          </Link>
        )}
        <Link
          href="/dashboard"
          className="text-sm font-bold text-[#18181B] border-2 border-[#E4E4E7] px-7 py-3 rounded-full hover:border-[#18181B] transition-colors"
        >
          Back to dashboard
        </Link>
      </div>
    </div>
  )
}
