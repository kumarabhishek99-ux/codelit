'use client'

import { useState } from 'react'
import { tryItContent } from '@/lib/lessonContent'
import { Button } from '@/components/ui/DS'

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
      <div className="inline-flex items-center gap-1.5 bg-[#F0FDF4] text-[#15803D] text-[11px] font-bold px-3 py-1.5 rounded-full mb-4 tracking-wide">
        ▶ Interactive demo
      </div>

      <h2 className="text-[22px] font-extrabold text-[#18181B] mb-2">Try it yourself</h2>
      <p className="text-sm text-[#71717A] font-semibold mb-6 leading-relaxed">{demo.description}</p>

      {demo.type === 'terminal' && <TerminalDemo demo={demo} onNext={onNext} onBack={onBack} />}
      {demo.type === 'variable_editor' && <VariableEditor demo={demo} onNext={onNext} onBack={onBack} />}
      {demo.type === 'logic_flow' && <LogicFlow demo={demo} onNext={onNext} onBack={onBack} />}
      {demo.type === 'commit_timeline' && <CommitTimeline demo={demo} onNext={onNext} onBack={onBack} />}
      {demo.type === 'branch_visual' && <BranchVisual demo={demo} onNext={onNext} onBack={onBack} />}
      {demo.type === 'reflection' && <ReflectionDemo demo={demo} onNext={onNext} onBack={onBack} />}
    </div>
  )
}

function Nav({ onBack, onNext, disabled }: { onBack: () => void; onNext: () => void; disabled?: boolean }) {
  return (
    <div className="flex items-center justify-between pt-4 border-t border-[#F4F4F5]">
      <button onClick={onBack} className="text-sm text-[#9B9A97] font-semibold hover:text-[#52525B]">← Read again</button>
      <Button size="md" onClick={onNext} disabled={disabled}>Take the quiz →</Button>
    </div>
  )
}

function TerminalDemo({ demo, onBack, onNext }: { demo: any; onBack: () => void; onNext: () => void }) {
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
      <div className="bg-[#18181B] rounded-[16px] overflow-hidden mb-5">
        <div className="flex items-center gap-1.5 px-4 py-3 bg-[#27272A] border-b border-[#3F3F46]">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
          <span className="text-[#71717A] text-xs ml-2 font-mono font-semibold">Sandbox terminal</span>
          <span className="text-[#52525B] text-xs ml-auto font-semibold">safe · nothing persists</span>
        </div>
        <div className="p-4 font-mono text-xs leading-7 min-h-[100px]">
          {!activeCmd && <div className="text-[#52525B]">Click a command below to run it.</div>}
          {activeCmd && (
            <>
              <div>
                <span className="text-[#4ec9b0]">you@sandbox</span>
                <span className="text-[#71717A]">:~$</span>{' '}
                <span className="text-white">{activeCmd}</span>
              </div>
              {output ? (
                <div className="text-[#9cdcfe]">{output}</div>
              ) : (
                <div className="text-[#52525B] text-[10px]">(no output — ran silently, which means success)</div>
              )}
            </>
          )}
          <div className="mt-1">
            <span className="text-[#4ec9b0]">you@sandbox</span>
            <span className="text-[#71717A]">:~$</span>{' '}
            <span className="border-r border-white animate-pulse">&nbsp;</span>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <div className="text-[11px] font-bold text-[#9B9A97] tracking-[0.1em] uppercase mb-2">Click a command to run it</div>
        <div className="flex flex-wrap gap-2">
          {demo.commands?.map((cmd: any) => (
            <button
              key={cmd.cmd}
              onClick={() => runCommand(cmd)}
              className={`flex items-center gap-2 px-3 py-2 rounded-[10px] border-2 text-sm font-mono transition-all ${
                activeCmd === cmd.cmd
                  ? 'border-[#18181B] bg-[#F4F4F5] text-[#18181B]'
                  : 'border-[#E4E4E7] bg-white hover:border-[#18181B] text-[#52525B]'
              }`}
            >
              <code className="text-xs font-bold">{cmd.cmd}</code>
              <span className="text-xs text-[#9B9A97] font-sans font-semibold">— {cmd.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-[#F4F4F5] rounded-[16px] p-4 mb-8 min-h-[52px]">
        {explain ? (
          <p
            className="text-sm text-[#52525B] leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: explain
                .replace(/<strong>/g, '<strong class="font-bold text-[#18181B]">')
                .replace(/<code>/g, '<code class="bg-white px-1.5 py-0.5 rounded-md font-mono text-xs font-bold text-[#18181B]">')
            }}
          />
        ) : (
          <p className="text-sm text-[#9B9A97] font-semibold">Click a command above to see what each part means.</p>
        )}
      </div>
      <Nav onBack={onBack} onNext={onNext} />
    </>
  )
}

function VariableEditor({ demo, onBack, onNext }: { demo: any; onBack: () => void; onNext: () => void }) {
  const [values, setValues] = useState<Record<string, string>>(
    Object.fromEntries((demo.variables ?? []).map((v: any) => [v.name, v.value]))
  )

  return (
    <div className="mb-8">
      <div className="text-[11px] font-bold text-[#9B9A97] tracking-[0.1em] uppercase mb-3">Edit a variable's value</div>
      <div className="flex flex-col gap-3 mb-5">
        {demo.variables?.map((v: any) => (
          <div key={v.name} className="bg-white border border-[#E4E4E7] rounded-[16px] p-4">
            <div className="flex items-center gap-3 mb-2">
              <code className="text-xs bg-[#F4F4F5] px-2 py-0.5 rounded-md font-mono font-bold text-[#18181B]">{v.name}</code>
              <span className="text-xs text-[#9B9A97] font-bold">{v.type}</span>
            </div>
            <p className="text-xs text-[#71717A] font-semibold mb-2">{v.description}</p>
            <input
              type="text"
              value={values[v.name]}
              onChange={(e) => setValues(prev => ({ ...prev, [v.name]: e.target.value }))}
              className="w-full border border-[#E4E4E7] rounded-[10px] px-3 py-1.5 text-sm font-mono focus:outline-none focus:border-[#18181B] text-[#18181B]"
            />
          </div>
        ))}
      </div>
      <div className="bg-[#18181B] rounded-[16px] p-4 font-mono text-xs text-[#9cdcfe] leading-7 mb-8">
        <div className="text-[#52525B] mb-2">// Preview — how these values appear in code</div>
        {demo.variables?.map((v: any) => (
          <div key={v.name}>
            <span className="text-[#4ec9b0]">const </span>
            <span className="text-white">{v.name}</span>
            <span className="text-[#71717A]"> = </span>
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
      <Nav onBack={onBack} onNext={onNext} />
    </div>
  )
}

function LogicFlow({ demo, onBack, onNext }: { demo: any; onBack: () => void; onNext: () => void }) {
  const [condition, setCondition] = useState(true)

  return (
    <div className="mb-8">
      <div className="bg-white border border-[#E4E4E7] rounded-[16px] p-4 mb-4">
        <div className="text-[11px] font-bold text-[#9B9A97] uppercase tracking-[0.1em] mb-1">Scenario</div>
        <p className="text-sm text-[#18181B] font-semibold">{demo.scenario}</p>
      </div>

      <div className="text-[11px] font-bold text-[#9B9A97] tracking-[0.1em] uppercase mb-2">Toggle the condition</div>
      <div className="flex items-center gap-3 mb-5">
        <button
          onClick={() => setCondition(true)}
          className={`px-4 py-2 rounded-[10px] border-2 text-sm font-bold transition-all ${condition ? 'border-[#22C55E] bg-[#F0FDF4] text-[#15803D]' : 'border-[#E4E4E7] text-[#9B9A97] hover:border-[#18181B]'}`}
        >
          true
        </button>
        <button
          onClick={() => setCondition(false)}
          className={`px-4 py-2 rounded-[10px] border-2 text-sm font-bold transition-all ${!condition ? 'border-[#EF4444] bg-[#FEF2F2] text-[#991B1B]' : 'border-[#E4E4E7] text-[#9B9A97] hover:border-[#18181B]'}`}
        >
          false
        </button>
        <code className="text-xs text-[#9B9A97] font-mono font-bold">{demo.condition}</code>
      </div>

      <div className="bg-[#18181B] rounded-[16px] p-4 font-mono text-xs leading-7 mb-5">
        <div>
          <span className="text-[#569cd6]">if </span>
          <span className="text-[#71717A]">(</span>
          <span className={condition ? 'text-[#4ec9b0]' : 'text-[#71717A]'}>{demo.condition}</span>
          <span className="text-[#71717A]">) {'{'}</span>
        </div>
        <div className={`pl-4 transition-opacity ${condition ? 'opacity-100' : 'opacity-30'}`}>
          <span className="text-[#9cdcfe]">// {demo.trueResult}</span>
        </div>
        <div><span className="text-[#71717A]">{'}'} </span><span className="text-[#569cd6]">else</span><span className="text-[#71717A]"> {'{'}</span></div>
        <div className={`pl-4 transition-opacity ${!condition ? 'opacity-100' : 'opacity-30'}`}>
          <span className="text-[#9cdcfe]">// {demo.falseResult}</span>
        </div>
        <div><span className="text-[#71717A]">{'}'}</span></div>
      </div>

      <div className={`rounded-[16px] p-4 border-2 text-sm font-semibold mb-8 ${condition ? 'bg-[#F0FDF4] border-[#22C55E] text-[#15803D]' : 'bg-[#FEF2F2] border-[#EF4444] text-[#991B1B]'}`}>
        <span className="font-bold">Result: </span>
        {condition ? demo.trueResult : demo.falseResult}
      </div>
      <Nav onBack={onBack} onNext={onNext} />
    </div>
  )
}

function CommitTimeline({ demo, onBack, onNext }: { demo: any; onBack: () => void; onNext: () => void }) {
  const [selected, setSelected] = useState<string | null>(null)
  const selectedCommit = demo.commits?.find((c: any) => c.id === selected)

  return (
    <div className="mb-8">
      <div className="text-[11px] font-bold text-[#9B9A97] tracking-[0.1em] uppercase mb-3">Commit history — newest first</div>
      <div className="flex flex-col gap-2 mb-5">
        {demo.commits?.map((commit: any, i: number) => (
          <button
            key={commit.id}
            onClick={() => setSelected(commit.id === selected ? null : commit.id)}
            className={`flex items-center gap-3 p-3 rounded-[14px] border-2 text-left transition-all ${
              selected === commit.id
                ? 'border-[#18181B] bg-[#F4F4F5]'
                : 'border-[#E4E4E7] bg-white hover:border-[#18181B]'
            }`}
          >
            <div className="flex flex-col items-center gap-1 flex-shrink-0">
              <div className={`w-3 h-3 rounded-full border-2 ${i === 0 ? 'border-[#18181B] bg-[#F4F4F5]' : 'border-[#D4D4D8] bg-white'}`} />
              {i < (demo.commits?.length ?? 0) - 1 && <div className="w-0.5 h-3 bg-[#E4E4E7]" />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-bold text-[#18181B] truncate">{commit.message}</div>
              <div className="text-xs text-[#9B9A97] font-semibold mt-0.5">{commit.time} · {commit.id}</div>
            </div>
          </button>
        ))}
      </div>
      {selectedCommit ? (
        <div className="bg-[#F4F4F5] rounded-[16px] p-4 text-sm text-[#52525B] font-semibold">
          <span className="font-bold text-[#18181B]">Commit </span>
          <code className="text-xs bg-white px-1.5 py-0.5 rounded-md font-mono font-bold text-[#18181B]">{selectedCommit.id}</code>
          <span> — {selectedCommit.message}. Saved {selectedCommit.time}. Every commit is a permanent snapshot you can return to.</span>
        </div>
      ) : (
        <div className="bg-[#F4F4F5] rounded-[16px] p-4 text-sm text-[#9B9A97] font-semibold">
          Click a commit to learn about it.
        </div>
      )}
      <div className="mt-6">
        <Nav onBack={onBack} onNext={onNext} />
      </div>
    </div>
  )
}

function BranchVisual({ demo, onBack, onNext }: { demo: any; onBack: () => void; onNext: () => void }) {
  const [selected, setSelected] = useState<string | null>(null)
  const selectedBranch = demo.branches?.find((b: any) => b.name === selected)

  return (
    <div className="mb-8">
      <div className="text-[11px] font-bold text-[#9B9A97] tracking-[0.1em] uppercase mb-3">Project branches</div>
      <div className="flex flex-col gap-2 mb-5">
        {demo.branches?.map((branch: any) => (
          <button
            key={branch.name}
            onClick={() => setSelected(branch.name === selected ? null : branch.name)}
            className={`flex items-center gap-3 p-3 rounded-[14px] border-2 text-left transition-all ${
              selected === branch.name
                ? 'border-[#18181B] bg-[#F4F4F5]'
                : branch.isCurrent
                ? 'border-[#22C55E] bg-[#F0FDF4]'
                : 'border-[#E4E4E7] bg-white hover:border-[#18181B]'
            }`}
          >
            <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${branch.name === 'main' ? 'bg-[#22C55E]' : branch.isCurrent ? 'bg-[#15803D]' : 'bg-[#D4D4D8]'}`} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <code className="text-xs font-mono font-bold text-[#18181B]">{branch.name}</code>
                {branch.isCurrent && <span className="text-[10px] font-bold text-[#15803D] bg-[#F0FDF4] px-1.5 py-0.5 rounded-full">current</span>}
                {branch.name === 'main' && <span className="text-[10px] font-bold text-[#15803D] bg-[#F0FDF4] px-1.5 py-0.5 rounded-full">stable</span>}
              </div>
              <div className="text-xs text-[#9B9A97] font-semibold mt-0.5">{branch.commits?.length} commits</div>
            </div>
          </button>
        ))}
      </div>
      {selectedBranch ? (
        <div className="bg-[#F4F4F5] rounded-[16px] p-4">
          <div className="text-[11px] font-bold text-[#9B9A97] tracking-[0.1em] uppercase mb-2">
            Commits on <code className="font-mono normal-case">{selectedBranch.name}</code>
          </div>
          <div className="flex flex-col gap-1">
            {selectedBranch.commits?.map((msg: string, i: number) => (
              <div key={i} className="flex items-center gap-2 text-sm text-[#52525B] font-semibold">
                <div className="w-1.5 h-1.5 rounded-full bg-[#D4D4D8] flex-shrink-0" />
                {msg}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-[#F4F4F5] rounded-[16px] p-4 text-sm text-[#9B9A97] font-semibold">
          Click a branch to see its commits.
        </div>
      )}
      <div className="mt-6">
        <Nav onBack={onBack} onNext={onNext} />
      </div>
    </div>
  )
}

function ReflectionDemo({ demo, onBack, onNext }: { demo: any; onBack: () => void; onNext: () => void }) {
  const total = demo.prompts?.length ?? 0
  const [hints, setHints] = useState<Record<number, boolean>>({})
  const [ticked, setTicked] = useState<Record<number, boolean>>({})
  const allTicked = total > 0 && Object.values(ticked).filter(Boolean).length === total

  const toggleHint = (i: number) => setHints(prev => ({ ...prev, [i]: !prev[i] }))
  const toggleTick = (i: number) => setTicked(prev => ({ ...prev, [i]: !prev[i] }))

  return (
    <div className="mb-2">
      <div className="flex flex-col gap-4 mb-8">
        {demo.prompts?.map((prompt: any, i: number) => (
          <div
            key={i}
            className={`rounded-[20px] border-2 p-5 transition-all ${
              ticked[i] ? 'border-[#22C55E] bg-[#F0FDF4]' : 'border-[#E4E4E7] bg-white'
            }`}
          >
            <p className={`text-[15px] font-bold leading-snug mb-4 ${ticked[i] ? 'text-[#15803D]' : 'text-[#18181B]'}`}>
              {prompt.question}
            </p>

            <div className="flex items-center gap-3">
              <button
                onClick={() => toggleHint(i)}
                className="text-xs font-bold text-[#18181B] bg-[#F4F4F5] px-3 py-1.5 rounded-full hover:bg-[#E4E4E7] transition-colors"
              >
                {hints[i] ? 'Hide hint' : 'Show hint'}
              </button>
              <button
                onClick={() => toggleTick(i)}
                className={`ml-auto flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full border-2 transition-all ${
                  ticked[i]
                    ? 'border-[#22C55E] bg-[#F0FDF4] text-[#15803D]'
                    : 'border-[#E4E4E7] text-[#9B9A97] hover:border-[#18181B] hover:text-[#18181B]'
                }`}
              >
                {ticked[i] ? (
                  <><span className="text-sm">✓</span> Considered</>
                ) : (
                  <>Mark as considered</>
                )}
              </button>
            </div>

            {hints[i] && (
              <div className="mt-3 bg-[#FFF7ED] rounded-[12px] px-4 py-3 text-sm text-[#92400E] font-semibold leading-relaxed">
                💡 {prompt.hint}
              </div>
            )}
          </div>
        ))}
      </div>

      {!allTicked && (
        <p className="text-xs text-[#9B9A97] font-semibold text-center mb-4">
          Mark all prompts as considered to continue
        </p>
      )}

      <Nav onBack={onBack} onNext={onNext} disabled={!allTicked} />
    </div>
  )
}
