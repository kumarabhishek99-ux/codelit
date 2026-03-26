'use client'

import { useState } from 'react'

interface Props {
  lesson: any
  onBack: () => void
  onNext: () => void
}

const terminalDemos: Record<string, {
  commands: Array<{ cmd: string; label: string; output: string; explain: string }>
}> = {
  'the-terminal': {
    commands: [
      {
        cmd: 'ls',
        label: 'list files',
        output: 'Desktop   Documents   Downloads   Projects   notes.txt',
        explain: '<strong>ls</strong> = "list". Shows every file and folder in your current location. Same as opening Finder and looking at what\'s there — just in text form.',
      },
      {
        cmd: 'pwd',
        label: 'where am I?',
        output: '/Users/you',
        explain: '<strong>pwd</strong> = "print working directory". Your computer is always "inside" a folder. This tells you which one. Think of it as asking "where am I right now?"',
      },
      {
        cmd: 'cd Documents',
        label: 'move into a folder',
        output: '',
        explain: '<strong>cd</strong> = "change directory". Moves you into the Documents folder. Like double-clicking a folder. No output means it worked silently — that\'s normal.',
      },
      {
        cmd: 'mkdir my-project',
        label: 'create a folder',
        output: '',
        explain: '<strong>mkdir</strong> = "make directory". Creates a brand new empty folder called my-project. No output = success. Run <code>ls</code> and you\'ll see it appear.',
      },
    ],
  },
}

const fallbackDemo = {
  commands: [
    {
      cmd: 'ls',
      label: 'list files',
      output: 'Desktop   Documents   Downloads   Projects',
      explain: '<strong>ls</strong> lists all files and folders in your current location.',
    },
    {
      cmd: 'pwd',
      label: 'where am I?',
      output: '/Users/you',
      explain: '<strong>pwd</strong> shows your current location in the file system.',
    },
  ],
}

export default function LessonTryIt({ lesson, onBack, onNext }: Props) {
  const demo = terminalDemos[lesson.slug] ?? fallbackDemo
  const [activeCmd, setActiveCmd] = useState<string | null>(null)
  const [output, setOutput] = useState<string | null>(null)
  const [explain, setExplain] = useState<string | null>(null)

  const runCommand = (cmd: typeof demo.commands[0]) => {
    setActiveCmd(cmd.cmd)
    setOutput(cmd.output)
    setExplain(cmd.explain)
  }

  return (
    <div>
      {/* Tag */}
      <div className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 text-xs font-medium px-3 py-1.5 rounded-full border border-green-100 mb-4">
        <span>▶</span> Interactive demo
      </div>

      <h2 className="text-xl font-medium text-gray-900 mb-2">Try it yourself</h2>
      <p className="text-sm text-gray-500 mb-6 leading-relaxed">
        Click any command to run it in the sandbox. Nothing can break — this is a safe simulation.
      </p>

      {/* Terminal */}
      <div className="bg-[#1a1a1a] rounded-xl overflow-hidden mb-5">
        <div className="flex items-center gap-1.5 px-4 py-3 bg-[#262626] border-b border-[#333]">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
          <span className="text-[#666] text-xs ml-2 font-mono">Sandbox terminal</span>
          <span className="text-[#444] text-xs ml-auto">safe · nothing persists</span>
        </div>
        <div className="p-4 font-mono text-xs leading-7 min-h-[100px]">
          {!activeCmd && (
            <div className="text-[#666]">Click a command below to run it.</div>
          )}
          {activeCmd && (
            <>
              <div>
                <span className="text-[#4ec9b0]">you@sandbox</span>
                <span className="text-[#888]">:~$</span>{' '}
                <span className="text-white">{activeCmd}</span>
              </div>
              {output ? (
                <div className="text-[#9cdcfe]">{output}</div>
              ) : (
                <div className="text-[#555] text-[10px]">(no output — ran silently, which means success)</div>
              )}
            </>
          )}
          <div className="mt-1">
            <span className="text-[#4ec9b0]">you@sandbox</span>
            <span className="text-[#888]">:~$</span>{' '}
            <span className="border-r border-white animate-pulse">&nbsp;</span>
          </div>
        </div>
      </div>

      {/* Command buttons */}
      <div className="mb-4">
        <div className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">Click a command to run it</div>
        <div className="flex flex-wrap gap-2">
          {demo.commands.map((cmd) => (
            <button
              key={cmd.cmd}
              onClick={() => runCommand(cmd)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-mono transition-all ${
                activeCmd === cmd.cmd
                  ? 'border-blue-400 bg-blue-50 text-blue-700'
                  : 'border-gray-200 bg-white hover:border-gray-300 text-gray-700'
              }`}
            >
              <code className="text-xs">{cmd.cmd}</code>
              <span className="text-xs text-gray-400 font-sans">— {cmd.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Explainer */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-8 min-h-[52px]">
        {explain ? (
          <p
            className="text-sm text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: explain
                .replace(/<strong>/g, '<strong class="font-medium text-gray-900">')
                .replace(/<code>/g, '<code class="bg-gray-200 px-1 rounded font-mono text-xs">')
            }}
          />
        ) : (
          <p className="text-sm text-gray-400">Click a command above to see what each part means.</p>
        )}
      </div>

      {/* Nav */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <button onClick={onBack} className="text-sm text-gray-400 hover:text-gray-600">← Read again</button>
        <button
          onClick={onNext}
          className="bg-gray-900 text-white text-sm font-medium px-6 py-2.5 rounded-full hover:bg-gray-700 transition-colors"
        >
          Take the quiz →
        </button>
      </div>
    </div>
  )
}
