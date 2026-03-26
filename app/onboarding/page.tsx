'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

type Persona = 'designer' | 'pm_founder' | 'general'

const personas = {
  designer: {
    label: 'Designer track',
    desc: 'Design-first analogies, Figma-to-code bridges, frontend focus',
    color: 'purple',
  },
  pm_founder: {
    label: 'PM / Founder track',
    desc: 'Full-stack overview, shipping focus, team collaboration',
    color: 'teal',
  },
  general: {
    label: 'General track',
    desc: 'No persona — covers everything equally',
    color: 'amber',
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
  const [step, setStep] = useState(0) // 0=welcome, 1=q1, 2=q2, 3=q3, 4=result, 5=done
  const [q1, setQ1] = useState('')
  const [q2, setQ2] = useState<Persona | ''>('')
  const [q3, setQ3] = useState('')
  const [selectedTrack, setSelectedTrack] = useState<Persona>('general')
  const [saving, setSaving] = useState(false)

  const skipToGeneral = () => {
    setSelectedTrack('general')
    setStep(4)
  }

  const handleQ2Select = (val: string) => {
    setQ2(val as Persona)
  }

  const showResult = () => {
    const persona = (q2 || 'general') as Persona
    setSelectedTrack(persona)
    setStep(4)
  }

  const saveAndStart = async () => {
    setSaving(true)
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    await supabase
      .from('profiles')
      .update({
        persona: selectedTrack,
        onboarding_complete: true,
      })
      .eq('id', user.id)

    router.push('/dashboard')
  }

  const dots = [0, 1, 2, 3, 4]

  return (
    <main className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
      <div className="w-full max-w-lg bg-white rounded-2xl border border-gray-100 p-8">

        {/* Progress dots */}
        {step < 5 && (
          <div className="flex justify-center gap-1.5 mb-8">
            {dots.map((d) => (
              <div
                key={d}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  d === step ? 'w-5 bg-gray-900' : d < step ? 'w-1.5 bg-green-400' : 'w-1.5 bg-gray-200'
                }`}
              />
            ))}
          </div>
        )}

        {/* Step 0: Welcome */}
        {step === 0 && (
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <span className="text-purple-700 text-2xl font-mono font-bold">{'{}'}</span>
            </div>
            <h1 className="text-2xl font-medium text-gray-900 mb-3">Welcome to Codelit</h1>
            <p className="text-gray-500 text-sm leading-relaxed mb-8">
              You don't need to become a developer. You just need to stop feeling lost around code.
              Answer 3 quick questions and we'll set up your personal track.
            </p>
            <button
              onClick={() => setStep(1)}
              className="w-full bg-gray-900 text-white text-sm font-medium py-3 rounded-xl hover:bg-gray-700 transition-colors"
            >
              Let's get started →
            </button>
            <button
              onClick={skipToGeneral}
              className="mt-3 w-full text-sm text-gray-400 hover:text-gray-600 py-2"
            >
              Skip quiz — put me on the general track
            </button>
          </div>
        )}

        {/* Step 1: Q1 */}
        {step === 1 && (
          <div>
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">Question 1 of 3</p>
            <h2 className="text-lg font-medium text-gray-900 mb-1">When you see a block of code, what happens?</h2>
            <p className="text-sm text-gray-500 mb-6">Be honest — this helps us set the right pace.</p>
            <div className="flex flex-col gap-2 mb-6">
              {q1Options.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setQ1(opt.value)}
                  className={`text-left px-4 py-3 rounded-xl border text-sm transition-all ${
                    q1 === opt.value
                      ? 'border-blue-400 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="font-medium text-gray-900">{opt.label}</div>
                  <div className="text-gray-500 text-xs mt-0.5">{opt.desc}</div>
                </button>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <button onClick={() => setStep(0)} className="text-sm text-gray-400 hover:text-gray-600">← Back</button>
              <button
                onClick={() => setStep(2)}
                disabled={!q1}
                className="bg-gray-900 text-white text-sm font-medium px-5 py-2 rounded-full disabled:opacity-30 hover:bg-gray-700 transition-colors"
              >
                Next →
              </button>
            </div>
            <button onClick={skipToGeneral} className="mt-4 w-full text-xs text-gray-400 hover:text-gray-500">
              Skip — just use the general track
            </button>
          </div>
        )}

        {/* Step 2: Q2 */}
        {step === 2 && (
          <div>
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">Question 2 of 3</p>
            <h2 className="text-lg font-medium text-gray-900 mb-1">What best describes your work?</h2>
            <p className="text-sm text-gray-500 mb-6">We'll tailor examples to make sense for you.</p>
            <div className="flex flex-col gap-2 mb-6">
              {q2Options.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => handleQ2Select(opt.value)}
                  className={`text-left px-4 py-3 rounded-xl border text-sm transition-all ${
                    q2 === opt.value
                      ? 'border-blue-400 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="font-medium text-gray-900">{opt.label}</div>
                  <div className="text-gray-500 text-xs mt-0.5">{opt.desc}</div>
                </button>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <button onClick={() => setStep(1)} className="text-sm text-gray-400 hover:text-gray-600">← Back</button>
              <button
                onClick={() => setStep(3)}
                disabled={!q2}
                className="bg-gray-900 text-white text-sm font-medium px-5 py-2 rounded-full disabled:opacity-30 hover:bg-gray-700 transition-colors"
              >
                Next →
              </button>
            </div>
            <button onClick={skipToGeneral} className="mt-4 w-full text-xs text-gray-400 hover:text-gray-500">
              Skip — just use the general track
            </button>
          </div>
        )}

        {/* Step 3: Q3 */}
        {step === 3 && (
          <div>
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">Question 3 of 3</p>
            <h2 className="text-lg font-medium text-gray-900 mb-1">What's the main thing you want to do?</h2>
            <p className="text-sm text-gray-500 mb-6">Pick the one that feels most true right now.</p>
            <div className="flex flex-col gap-2 mb-6">
              {q3Options.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setQ3(opt.value)}
                  className={`text-left px-4 py-3 rounded-xl border text-sm transition-all ${
                    q3 === opt.value
                      ? 'border-blue-400 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="font-medium text-gray-900">{opt.label}</div>
                  <div className="text-gray-500 text-xs mt-0.5">{opt.desc}</div>
                </button>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <button onClick={() => setStep(2)} className="text-sm text-gray-400 hover:text-gray-600">← Back</button>
              <button
                onClick={showResult}
                disabled={!q3}
                className="bg-gray-900 text-white text-sm font-medium px-5 py-2 rounded-full disabled:opacity-30 hover:bg-gray-700 transition-colors"
              >
                See my track →
              </button>
            </div>
            <button onClick={skipToGeneral} className="mt-4 w-full text-xs text-gray-400 hover:text-gray-500">
              Skip — just use the general track
            </button>
          </div>
        )}

        {/* Step 4: Result */}
        {step === 4 && (
          <div>
            <div className="bg-purple-50 rounded-xl p-5 mb-5">
              <p className="text-xs font-medium text-purple-600 uppercase tracking-wider mb-2">
                {q2 ? 'Recommended for you' : 'Your track'}
              </p>
              <h2 className="text-lg font-medium text-gray-900 mb-1">
                {personas[selectedTrack].label}
              </h2>
              <p className="text-sm text-gray-600">{personas[selectedTrack].desc}</p>
            </div>

            <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">
              Or pick a different track
            </p>
            <div className="flex flex-col gap-2 mb-6">
              {(Object.entries(personas) as [Persona, typeof personas[Persona]][]).map(([key, p]) => (
                <button
                  key={key}
                  onClick={() => setSelectedTrack(key)}
                  className={`text-left px-4 py-3 rounded-xl border text-sm transition-all ${
                    selectedTrack === key
                      ? 'border-blue-400 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-medium text-gray-900">{p.label}</div>
                  <div className="text-gray-500 text-xs mt-0.5">{p.desc}</div>
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <button onClick={() => setStep(q2 ? 3 : 0)} className="text-sm text-gray-400 hover:text-gray-600">
                ← Change answers
              </button>
              <button
                onClick={saveAndStart}
                disabled={saving}
                className="bg-gray-900 text-white text-sm font-medium px-5 py-2 rounded-full hover:bg-gray-700 transition-colors disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Start learning →'}
              </button>
            </div>
          </div>
        )}

      </div>
    </main>
  )
}
