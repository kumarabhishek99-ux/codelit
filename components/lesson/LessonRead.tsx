'use client'

import { Button, Callout } from '@/components/ui/DS'
import { lessonContent, fallbackContent } from '@/lib/lessonContent'

interface Props {
  lesson: any
  module: any
  onNext: () => void
}

function formatInline(html: string) {
  return html
    .replace(/<strong>(.*?)<\/strong>/g, '<strong class="font-bold text-[#18181B]">$1</strong>')
    .replace(/<code>(.*?)<\/code>/g, '<code class="bg-[#F4F4F5] text-[#18181B] px-1.5 py-0.5 rounded-md font-mono text-[12.5px] font-semibold">$1</code>')
}

function renderBody(html: string) {
  const chunks = html.split('\n\n').filter(Boolean)

  return chunks.map((chunk, i) => {
    if (chunk.trim().startsWith('- ')) {
      const items = chunk.split('\n').filter(l => l.startsWith('- '))
      return (
        <ul key={i} className="my-5 space-y-2.5 list-none p-0">
          {items.map((item, j) => (
            <li key={j} className="flex items-baseline gap-3 text-[16px] text-[#52525B] leading-[1.6]">
              <span className="text-[#D4D4D8] text-lg leading-none flex-shrink-0 mt-0.5">·</span>
              <span dangerouslySetInnerHTML={{ __html: formatInline(item.replace(/^- /, '')) }} />
            </li>
          ))}
        </ul>
      )
    }

    if (chunk.includes('\n') && chunk.trim().startsWith('<code>')) {
      const code = chunk.replace(/<\/?code>/g, '')
      return (
        <div key={i} className="my-5">
          <div className="bg-[#18181B] rounded-[16px] px-5 py-4 font-mono text-[13px] leading-[1.9] text-[#D4D4D4] overflow-x-auto">
            {code.split('\n').map((line, j) => (
              <div key={j}>{line || '\u00A0'}</div>
            ))}
          </div>
        </div>
      )
    }

    return (
      <p
        key={i}
        className="text-[16px] text-[#52525B] leading-[1.6] mb-5"
        dangerouslySetInnerHTML={{ __html: formatInline(chunk) }}
      />
    )
  })
}

export default function LessonRead({ lesson, module: mod, onNext }: Props) {
  const content = lessonContent[lesson.slug] ?? fallbackContent

  return (
    <div className="max-w-[600px]">

      {/* Meta */}
      <div className="flex items-center gap-2 mb-8">
        <span className="text-[11px] font-bold text-[#9B9A97] tracking-[0.1em] uppercase">
          {mod.title}
        </span>
        <span className="text-[#D4D4D8]">·</span>
        <span className="text-[11px] font-bold text-[#9B9A97] tracking-[0.1em] uppercase">
          {lesson.est_minutes} min read
        </span>
      </div>

      {/* Title */}
      <h1 className="text-[30px] font-extrabold tracking-tight text-[#18181B] leading-[1.15] mb-10">
        {lesson.title}
      </h1>

      {/* Body */}
      <div className="mb-10">
        {renderBody(content.body)}
      </div>

      {/* Callout cards */}
      <div className="space-y-3 mb-10">
        <Callout type="analogy">{content.analogy}</Callout>
        <Callout type="concept">{content.keyConcept}</Callout>
        <Callout type="vibe">{content.vibeBridge}</Callout>
      </div>

      {/* Nav */}
      <div className="flex justify-end pt-6 border-t border-[#F4F4F5]">
        <Button size="lg" onClick={onNext}>Try it →</Button>
      </div>
    </div>
  )
}
