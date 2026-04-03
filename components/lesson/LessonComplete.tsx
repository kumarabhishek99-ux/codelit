'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/DS'

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

      {/* Badge circle */}
      <div className={`w-20 h-20 mx-auto mb-6 transition-all duration-700 delay-100 ${shown ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}>
        <svg viewBox="0 0 80 80" className="w-full h-full">
          <circle cx="40" cy="40" r="36" fill="#F0FDF4" stroke="#22C55E" strokeWidth="2"/>
          <polyline
            points="22,40 34,52 58,28"
            stroke="#15803D"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <h2 className="text-[24px] font-extrabold text-[#18181B] mb-2">Lesson complete!</h2>
      <p className="text-[15px] text-[#52525B] mb-8 leading-relaxed">
        You finished <strong className="font-bold text-[#18181B]">{lesson.title}</strong>.
        {nextLesson ? ' The next lesson is ready for you.' : ' You\'ve completed this module!'}
      </p>

      {/* Up next card */}
      {nextLesson && (
        <div className="bg-[#F4F4F5] rounded-[16px] p-4 mb-6 text-left max-w-sm mx-auto">
          <div className="text-[11px] font-bold text-[#9B9A97] tracking-[0.1em] uppercase mb-2">Up next</div>
          <div className="font-bold text-[#18181B] text-sm">{nextLesson.title}</div>
          <div className="text-xs text-[#71717A] font-semibold mt-0.5">{mod.title} · {nextLesson.est_minutes} min</div>
        </div>
      )}

      {/* Actions */}
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
