'use client'

import { useState } from 'react'
import { tryItContent } from '@/lib/lessonContent'

interface Props {
  lesson: any
  onBack: () => void
  onNext: () => void
}

export default function LessonTryIt({ lesson, onBack, onNext }: Props) {
  const demo = tryItContent[lesson.slug] ?? tryItContent['the-terminal']

  return (
    <div>
      {/* Tag */}
      <div className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 text-xs font-medium px-3 py-1.5 rounded-full border border-green-100 mb-4">
        <span>▶</span> Interactive demo
      </div>

      <h2 className="text-xl font-medium text-gray-900 mb-2">Try it yourself</h2>
      <p className="text-sm text-gray-500 mb-6 leading-relaxed">{demo.description}</p>

      {demo.type === 'terminal' && <TerminalDemo demo={demo} />}
      {demo.type === 'variable_editor' && <VariableEditor demo={demo} />}
      {demo.type === 'logic_flow' && <LogicFlow demo={demo} />}
      {demo.type === 'commit_timeline' && <CommitTimeline demo={demo} />}
      {demo.type === 'branch_visual' && <BranchVisual demo={demo} />}

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

function TerminalDemo({ demo }: { demo: any }) {
  const [activeCmd, setActiveCmd] = useState<string | null>(null)
  const [output, setOutput] = useState<string | null>(null)
  const [explain, setExplain] = useState<string | null>(null)

  const runCommand = (cmd: any) => {
    setActiveCmd(cmd.cmd)
    setOutput(cmd.output)
    setExplain(cmd.explain)
  }

  return (
    <>
      <div className="bg-[#1a1a1a] rounded-xl overflow-hidden mb-5">
        <div className="flex items-center gap-1.5 px-4 py-3 bg-[#262626] border-b border-[#333]">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
          <span className="text-[#666] text-xs ml-2 font-mono">Sandbox terminal</span>
          <span className="text-[#444] text-xs ml-auto">safe · nothing persists</span>
        </div>
        <div className="p-4 font-mono text-xs leading-7 min-h-[100px]">
          {!activeCmd && <div className="text-[#666]">Click a command below to run it.</div>}
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

      <div className="mb-4">
        <div className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">Click a command to run it</div>
        <div className="flex flex-wrap gap-2">
          {demo.commands?.map((cmd: any) => (
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
    </>
  )
}

function VariableEditor({ demo }: { demo: any }) {
  const [values, setValues] = useState<Record<string, string>>(
    Object.fromEntries((demo.variables ?? []).map((v: any) => [v.name, v.value]))
  )

  return (
    <div className="mb-8">
      <div className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">Edit a variable's value</div>
      <div className="flex flex-col gap-3 mb-5">
        {demo.variables?.map((v: any) => (
          <div key={v.name} className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <code className="text-xs bg-gray-100 px-2 py-0.5 rounded font-mono text-purple-700">{v.name}</code>
              <span className="text-xs text-gray-400">{v.type}</span>
            </div>
            <p className="text-xs text-gray-500 mb-2">{v.description}</p>
            <input
              type="text"
              value={values[v.name]}
              onChange={(e) => setValues(prev => ({ ...prev, [v.name]: e.target.value }))}
              className="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-sm font-mono focus:outline-none focus:border-blue-400"
            />
          </div>
        ))}
      </div>
      <div className="bg-[#1a1a1a] rounded-xl p-4 font-mono text-xs text-[#9cdcfe] leading-7">
        <div className="text-[#666] mb-2">// Preview — how these values appear in code</div>
        {demo.variables?.map((v: any) => (
          <div key={v.name}>
            <span className="text-[#4ec9b0]">const </span>
            <span className="text-white">{v.name}</span>
            <span className="text-[#888]"> = </span>
            {v.type === 'string' ? (
              <span className="text-[#ce9178]">"{values[v.name]}"</span>
            ) : v.type === 'boolean' ? (
              <span className="text-[#569cd6]">{values[v.name]}</span>
            ) : (
              <span className="text-[#b5cea8]">{values[v.name]}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function LogicFlow({ demo }: { demo: any }) {
  const [condition, setCondition] = useState(true)

  return (
    <div className="mb-8">
      <div className="bg-white border border-gray-200 rounded-xl p-4 mb-4">
        <div className="text-xs font-medium text-gray-400 mb-1">Scenario</div>
        <p className="text-sm text-gray-700">{demo.scenario}</p>
      </div>

      <div className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">Toggle the condition</div>
      <div className="flex items-center gap-3 mb-5">
        <button
          onClick={() => setCondition(true)}
          className={`px-4 py-2 rounded-lg border text-sm transition-all ${condition ? 'border-green-400 bg-green-50 text-green-800' : 'border-gray-200 text-gray-500 hover:border-gray-300'}`}
        >
          true
        </button>
        <button
          onClick={() => setCondition(false)}
          className={`px-4 py-2 rounded-lg border text-sm transition-all ${!condition ? 'border-red-300 bg-red-50 text-red-800' : 'border-gray-200 text-gray-500 hover:border-gray-300'}`}
        >
          false
        </button>
        <code className="text-xs text-gray-500 font-mono">{demo.condition}</code>
      </div>

      <div className="bg-[#1a1a1a] rounded-xl p-4 font-mono text-xs leading-7 mb-5">
        <div>
          <span className="text-[#569cd6]">if </span>
          <span className="text-[#888]">(</span>
          <span className={condition ? 'text-[#4ec9b0]' : 'text-[#888]'}>{demo.condition}</span>
          <span className="text-[#888]">) {'{'}</span>
        </div>
        <div className={`pl-4 transition-opacity ${condition ? 'opacity-100' : 'opacity-30'}`}>
          <span className="text-[#9cdcfe]">// {demo.trueResult}</span>
        </div>
        <div><span className="text-[#888]">{'}'} </span><span className="text-[#569cd6]">else</span><span className="text-[#888]"> {'{'}</span></div>
        <div className={`pl-4 transition-opacity ${!condition ? 'opacity-100' : 'opacity-30'}`}>
          <span className="text-[#9cdcfe]">// {demo.falseResult}</span>
        </div>
        <div><span className="text-[#888]">{'}'}</span></div>
      </div>

      <div className={`rounded-xl p-4 border text-sm ${condition ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-700'}`}>
        <span className="font-medium">Result: </span>
        {condition ? demo.trueResult : demo.falseResult}
      </div>
    </div>
  )
}

function CommitTimeline({ demo }: { demo: any }) {
  const [selected, setSelected] = useState<string | null>(null)
  const selectedCommit = demo.commits?.find((c: any) => c.id === selected)

  return (
    <div className="mb-8">
      <div className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">Commit history — newest first</div>
      <div className="flex flex-col gap-2 mb-5">
        {demo.commits?.map((commit: any, i: number) => (
          <button
            key={commit.id}
            onClick={() => setSelected(commit.id === selected ? null : commit.id)}
            className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
              selected === commit.id
                ? 'border-blue-400 bg-blue-50'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <div className="flex flex-col items-center gap-1 flex-shrink-0">
              <div className={`w-3 h-3 rounded-full border-2 ${i === 0 ? 'border-blue-500 bg-blue-100' : 'border-gray-300 bg-white'}`} />
              {i < (demo.commits?.length ?? 0) - 1 && <div className="w-0.5 h-3 bg-gray-200" />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm text-gray-900 truncate">{commit.message}</div>
              <div className="text-xs text-gray-400 mt-0.5">{commit.time} · {commit.id}</div>
            </div>
          </button>
        ))}
      </div>
      {selectedCommit && (
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm text-gray-700">
          <span className="font-medium">Commit </span>
          <code className="text-xs bg-gray-200 px-1 rounded font-mono">{selectedCommit.id}</code>
          <span> — {selectedCommit.message}. This was saved {selectedCommit.time}. Every commit is a permanent snapshot you can return to at any time.</span>
        </div>
      )}
      {!selectedCommit && (
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm text-gray-400">
          Click a commit to learn about it.
        </div>
      )}
    </div>
  )
}

function BranchVisual({ demo }: { demo: any }) {
  const [selected, setSelected] = useState<string | null>(null)
  const selectedBranch = demo.branches?.find((b: any) => b.name === selected)

  return (
    <div className="mb-8">
      <div className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">Project branches</div>
      <div className="flex flex-col gap-2 mb-5">
        {demo.branches?.map((branch: any) => (
          <button
            key={branch.name}
            onClick={() => setSelected(branch.name === selected ? null : branch.name)}
            className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
              selected === branch.name
                ? 'border-blue-400 bg-blue-50'
                : branch.isCurrent
                ? 'border-teal-200 bg-teal-50'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${branch.name === 'main' ? 'bg-green-500' : branch.isCurrent ? 'bg-teal-500' : 'bg-gray-400'}`} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <code className="text-xs font-mono text-gray-800">{branch.name}</code>
                {branch.isCurrent && <span className="text-xs text-teal-600 bg-teal-100 px-1.5 py-0.5 rounded">current</span>}
                {branch.name === 'main' && <span className="text-xs text-green-600 bg-green-100 px-1.5 py-0.5 rounded">stable</span>}
              </div>
              <div className="text-xs text-gray-400 mt-0.5">{branch.commits?.length} commits</div>
            </div>
          </button>
        ))}
      </div>
      {selectedBranch && (
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
          <div className="text-xs font-medium text-gray-500 mb-2">Commits on <code className="font-mono">{selectedBranch.name}</code></div>
          <div className="flex flex-col gap-1">
            {selectedBranch.commits?.map((msg: string, i: number) => (
              <div key={i} className="flex items-center gap-2 text-sm text-gray-700">
                <div className="w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0" />
                {msg}
              </div>
            ))}
          </div>
        </div>
      )}
      {!selectedBranch && (
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm text-gray-400">
          Click a branch to see its commits.
        </div>
      )}
    </div>
  )
}
