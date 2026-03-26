'use client'

interface Props {
  lesson: any
  module: any
  onNext: () => void
}

// Placeholder content map — real content comes from MDX files in Phase 2
const lessonContent: Record<string, { body: string; analogy: string; keyConcept: string; vibeBridge: string }> = {
  'the-terminal': {
    body: `You've seen developers type into a dark window and things happen. That window is the <strong>terminal</strong> — and it's simpler than it looks. It's just another way to talk to your computer. Instead of clicking, you type.

Every click you make in a normal interface is secretly a command running underneath. When you drag a file to trash, the computer runs something like <code>rm filename</code>. The terminal just skips the middleman.

When an AI tool like Claude Code tells you to "run this in your terminal" it means: open that window, type this exact text, press enter. That's it. The mystery is usually just unfamiliarity, not complexity.`,
    analogy: 'Your desktop is a restaurant menu — visual, friendly, designed for browsing. The terminal is talking directly to the chef. More precise, more powerful, but you need to know what to say.',
    keyConcept: 'The terminal is just a text interface to the same computer you already use. Nothing it can do is fundamentally different from clicking — it\'s just faster and more direct for certain things.',
    vibeBridge: 'When Claude Code sets up your project, installs packages, or runs your app — it\'s doing it through the terminal. You don\'t need to write these commands yourself, but recognising what\'s happening means you won\'t be confused when you see it.',
  },
  'big-picture': {
    body: `Every piece of software you use was built by people writing instructions for computers. Those instructions are called <strong>code</strong>. But software isn't just code — it's code organised into projects, stored somewhere, and run on computers (or servers) somewhere else.

When you open an app on your phone, a chain of events happens: your device sends a request to a server, the server runs some code, that code talks to a database, and a response comes back to your screen. All of this happens in milliseconds.

Understanding this chain — even at a high level — makes the whole world of software suddenly legible. You start to see why things are structured the way they are, why developers make certain decisions, and where AI tools like Claude Code fit in.`,
    analogy: 'Software is like a restaurant. The frontend is the dining room — what customers see and interact with. The backend is the kitchen — where the actual work happens. The database is the pantry — where everything is stored. The chef (the developer, or Claude Code) knows how all three parts work together.',
    keyConcept: 'Every digital product has three layers: something users interact with (frontend), something that processes logic (backend), and somewhere data is stored (database). AI coding tools help you build all three — but you need to know which layer you\'re working on.',
    vibeBridge: 'When you describe a feature to Claude Code, it needs to decide which layer to work on. Understanding the big picture helps you give better instructions — and understand the code it produces.',
  },
}

// Fallback content for lessons without specific content yet
const fallbackContent = {
  body: `This lesson covers an important concept in your coding literacy journey. The content for this lesson is being prepared and will be available shortly.

In the meantime, you can explore other lessons or come back to this one later. Each lesson builds on the previous one, so feel free to move through the course at your own pace.`,
  analogy: 'Learning to read code is like learning to read a map. You don\'t need to know how to make the map — you just need to know how to use it to get where you\'re going.',
  keyConcept: 'Code literacy isn\'t about memorising syntax. It\'s about building mental models that help you understand what code is doing and why.',
  vibeBridge: 'Every concept in this course directly applies to how you\'ll work with AI coding tools. Understanding the fundamentals makes your AI conversations sharper and more productive.',
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
