'use client'

import { lessonContent, fallbackContent } from '@/lib/lessonContent'

interface Props {
  lesson: any
  module: any
  onNext: () => void
}

export default function LessonRead({ lesson, module: mod, onNext }: Props) {
  const content = lessonContent[lesson.slug] ?? fallbackContent

  return (
    <div>
      {/* Tag */}
      <div className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 text-xs font-medium px-3 py-1.5 rounded-full border border-blue-100 mb-4">
        <span>●</span> {lesson.est_minutes} min read
      </div>

      <h1 className="text-2xl font-medium text-gray-900 mb-3 leading-snug">{lesson.title}</h1>

      {/* Body */}
      <div
        className="text-[15px] text-gray-600 leading-relaxed mb-6"
        dangerouslySetInnerHTML={{
          __html: content.body
            .replace(/<strong>/g, '<strong class="font-medium text-gray-900">')
            .replace(/<code>/g, '<code class="bg-gray-100 px-1.5 py-0.5 rounded text-xs font-mono text-gray-800">')
        }}
      />

      {/* Analogy card */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-6">
        <div className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">Think of it like this</div>
        <p className="text-sm text-gray-700 leading-relaxed">{content.analogy}</p>
      </div>

      {/* Key concept */}
      <div className="border-l-2 border-blue-400 pl-4 mb-6 bg-blue-50 py-3 pr-4 rounded-r-xl">
        <div className="text-xs font-medium text-blue-600 mb-1">Key concept</div>
        <p className="text-sm text-gray-800 leading-relaxed">{content.keyConcept}</p>
      </div>

      {/* Vibe coding bridge */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-8">
        <div className="text-xs font-medium text-green-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <span>★</span> Why this matters for vibe coding
        </div>
        <p className="text-sm text-green-800 leading-relaxed">{content.vibeBridge}</p>
      </div>

      {/* Nav */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div />
        <button
          onClick={onNext}
          className="bg-gray-900 text-white text-sm font-medium px-6 py-2.5 rounded-full hover:bg-gray-700 transition-colors"
        >
          Try it →
        </button>
      </div>
    </div>
  )
}
