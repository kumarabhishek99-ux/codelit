'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/DS'

type Persona = 'designer' | 'pm_founder' | 'general'

const personas = {
  designer: {
    label: 'Designer track',
    desc: 'Design-first analogies, Figma-to-code bridges, frontend focus',
    resultBg: '#EFF6FF',
    resultLabel: '#1D4ED8',
  },
  pm_founder: {
    label: 'PM / Founder track',
    desc: 'Full-stack overview, shipping focus, team collaboration',
    resultBg: '#F0FDF4',
    resultLabel: '#15803D',
  },
  general: {
    label: 'General track',
    desc: 'No persona — covers everything equally',
    resultBg: '#FFF7ED',
    resultLabel: '#92400E',
  },
}

const q1Options = [
  { value: 'a', label: 'I close the tab immediately', desc: 'It feels like a foreign language' },
  { value: 'b', label: 'I skim it but understand nothing', desc: 'I can tell it does something, but not what' },
  { value: 'c', label: 'I can follow the general idea', desc: 'The details still lose me though' },
]

const q2Options = [
  { value: 'designer', label: 'Designer', desc: 'UI/UX, product design, visual or interaction work' },
  { value: 'pm_founder', label: 'PM or founder', desc: 'Product management, strategy, or building a startup' },
  { value: 'general', label: 'Something else', desc: 'Marketing, ops, content, or just curious' },
]

const q3Options = [
  { value: 'read', label: 'Read code without panicking', desc: 'Understand what a codebase is doing' },
  { value: 'collab', label: 'Work better with developers', desc: 'Speak the same language, review PRs' },
  { value: 'ship', label: 'Ship something with AI', desc: 'Build and deploy a real product' },
]

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [q1, setQ1] = useState('')
  const [q2, setQ2] = useState<Persona | ''>('')
  const [q3, setQ3] = useState('')
  const [selectedTrack, setSelectedTrack] = useState<Persona>('general')
  const [saving, setSaving] = useState(false)

  const skipToGeneral = () => {
    setSelectedTrack('general')
    setStep(4)
  }

  const showResult = () => {
    setSelectedTrack((q2 || 'general') as Persona)
    setStep(4)
  }

  const saveAndStart = async () => {
    setSaving(true)
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    await supabase
      .from('profiles')
      .update({ persona: selectedTrack, onboarding_complete: true })
      .eq('id', user.id)

    router.push('/dashboard')
  }

  const dots = [0, 1, 2, 3, 4]

  const optionClass = (selected: boolean) =>
    `text-left px-4 py-3 rounded-[16px] border-2 text-sm transition-all ${
      selected
        ? 'border-[#18181B] bg-[#F4F4F5]'
        : 'border-[#E4E4E7] bg-white hover:border-[#18181B] hover:bg-[#F4F4F5]'
    }`

  return (
    <main className="min-h-screen flex items-center justify-center px-4 bg-[#F4F4F5]">
      <div className="w-full max-w-lg bg-white rounded-[20px] border border-[#E4E4E7] p-8">

        {/* Progress dots */}
        {step < 5 && (
          <div className="flex justify-center gap-1.5 mb-8">
            {dots.map((d) => (
              <div
                key={d}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  d === step ? 'w-5 bg-[#18181B]' : d < step ? 'w-1.5 bg-[#22C55E]' : 'w-1.5 bg-[#F4F4F5]'
                }`}
              />
            ))}
          </div>
        )}

        {/* Step 0: Welcome */}
        {step === 0 && (
          <div className="text-center">
            <div className="w-16 h-16 bg-[#18181B] rounded-2xl flex items-center justify-center mx-auto mb-6">
              <span className="text-white text-2xl font-mono font-bold">{'{}'}</span>
            </div>
            <h1 className="text-2xl font-extrabold text-[#18181B] mb-3">Welcome to Codelit</h1>
            <p className="text-[#52525B] text-sm leading-relaxed mb-8">
              You don't need to become a developer. You just need to stop feeling lost around code.
              Answer 3 quick questions and we'll set up your personal track.
            </p>
            <Button size="lg" onClick={() => setStep(1)} className="w-full">Let's get started →</Button>
            <button
              onClick={skipToGeneral}
              className="mt-3 w-full text-sm text-[#9B9A97] font-semibold underline underline-offset-2 hover:text-[#52525B] py-2"
            >
              Skip quiz — put me on the general track
            </button>
          </div>
        )}

        {/* Step 1: Q1 */}
        {step === 1 && (
          <div>
            <p className="text-[11px] font-bold text-[#9B9A97] tracking-[0.1em] uppercase mb-2">Question 1 of 3</p>
            <h2 className="text-lg font-extrabold text-[#18181B] mb-1">When you see a block of code, what happens?</h2>
            <p className="text-sm text-[#71717A] mb-6">Be honest — this helps us set the right pace.</p>
            <div className="flex flex-col gap-2 mb-6">
              {q1Options.map((opt) => (
                <button key={opt.value} onClick={() => setQ1(opt.value)} className={optionClass(q1 === opt.value)}>
                  <div className="font-bold text-[#18181B]">{opt.label}</div>
                  <div className="text-[#71717A] text-xs mt-0.5">{opt.desc}</div>
                </button>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <button onClick={() => setStep(0)} className="text-sm text-[#9B9A97] font-semibold hover:text-[#52525B]">← Back</button>
              <Button onClick={() => setStep(2)} disabled={!q1}>Next →</Button>
            </div>
            <button onClick={skipToGeneral} className="mt-4 w-full text-xs text-[#9B9A97] font-semibold underline underline-offset-2 hover:text-[#52525B]">
              Skip — just use the general track
            </button>
          </div>
        )}

        {/* Step 2: Q2 */}
        {step === 2 && (
          <div>
            <p className="text-[11px] font-bold text-[#9B9A97] tracking-[0.1em] uppercase mb-2">Question 2 of 3</p>
            <h2 className="text-lg font-extrabold text-[#18181B] mb-1">What best describes your work?</h2>
            <p className="text-sm text-[#71717A] mb-6">We'll tailor examples to make sense for you.</p>
            <div className="flex flex-col gap-2 mb-6">
              {q2Options.map((opt) => (
                <button key={opt.value} onClick={() => setQ2(opt.value as Persona)} className={optionClass(q2 === opt.value)}>
                  <div className="font-bold text-[#18181B]">{opt.label}</div>
                  <div className="text-[#71717A] text-xs mt-0.5">{opt.desc}</div>
                </button>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <button onClick={() => setStep(1)} className="text-sm text-[#9B9A97] font-semibold hover:text-[#52525B]">← Back</button>
              <Button onClick={() => setStep(3)} disabled={!q2}>Next →</Button>
            </div>
            <button onClick={skipToGeneral} className="mt-4 w-full text-xs text-[#9B9A97] font-semibold underline underline-offset-2 hover:text-[#52525B]">
              Skip — just use the general track
            </button>
          </div>
        )}

        {/* Step 3: Q3 */}
        {step === 3 && (
          <div>
            <p className="text-[11px] font-bold text-[#9B9A97] tracking-[0.1em] uppercase mb-2">Question 3 of 3</p>
            <h2 className="text-lg font-extrabold text-[#18181B] mb-1">What's the main thing you want to do?</h2>
            <p className="text-sm text-[#71717A] mb-6">Pick the one that feels most true right now.</p>
            <div className="flex flex-col gap-2 mb-6">
              {q3Options.map((opt) => (
                <button key={opt.value} onClick={() => setQ3(opt.value)} className={optionClass(q3 === opt.value)}>
                  <div className="font-bold text-[#18181B]">{opt.label}</div>
                  <div className="text-[#71717A] text-xs mt-0.5">{opt.desc}</div>
                </button>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <button onClick={() => setStep(2)} className="text-sm text-[#9B9A97] font-semibold hover:text-[#52525B]">← Back</button>
              <Button onClick={showResult} disabled={!q3}>See my track →</Button>
            </div>
            <button onClick={skipToGeneral} className="mt-4 w-full text-xs text-[#9B9A97] font-semibold underline underline-offset-2 hover:text-[#52525B]">
              Skip — just use the general track
            </button>
          </div>
        )}

        {/* Step 4: Result */}
        {step === 4 && (
          <div>
            <div
              className="rounded-[20px] p-5 mb-5"
              style={{ background: personas[selectedTrack].resultBg }}
            >
              <p
                className="text-[11px] font-bold tracking-[0.1em] uppercase mb-2"
                style={{ color: personas[selectedTrack].resultLabel }}
              >
                {q2 ? 'Recommended for you' : 'Your track'}
              </p>
              <h2 className="text-lg font-extrabold text-[#18181B] mb-1">{personas[selectedTrack].label}</h2>
              <p className="text-sm text-[#52525B]">{personas[selectedTrack].desc}</p>
            </div>

            <p className="text-[11px] font-bold text-[#9B9A97] tracking-[0.1em] uppercase mb-3">Or pick a different track</p>
            <div className="flex flex-col gap-2 mb-6">
              {(Object.entries(personas) as [Persona, typeof personas[Persona]][]).map(([key, p]) => (
                <button key={key} onClick={() => setSelectedTrack(key)} className={optionClass(selectedTrack === key)}>
                  <div className="font-bold text-[#18181B]">{p.label}</div>
                  <div className="text-[#71717A] text-xs mt-0.5">{p.desc}</div>
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <button onClick={() => setStep(q2 ? 3 : 0)} className="text-sm text-[#9B9A97] font-semibold hover:text-[#52525B]">
                ← Change answers
              </button>
              <Button onClick={saveAndStart} disabled={saving}>
                {saving ? 'Saving...' : 'Start learning →'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
