'use client'

import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/DS'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
        data: { full_name: name },
      },
    })

    if (error) {
      setError(error.message)
    } else {
      setSent(true)
    }
    setLoading(false)
  }

  const inputClass = "w-full px-4 py-3 rounded-[12px] border border-[#E4E4E7] text-[15px] focus:outline-none focus:border-[#18181B] text-[#18181B]"

  return (
    <main className="min-h-screen flex items-center justify-center px-4 bg-[#F4F4F5]">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-7 h-7 bg-[#18181B] rounded-lg flex items-center justify-center">
              <span className="text-white text-xs font-mono font-bold">{'{}'}</span>
            </div>
            <span className="font-bold text-[#18181B]">Codelit</span>
          </Link>
          <h1 className="text-2xl font-extrabold text-[#18181B] mb-2">Create your account</h1>
          <p className="text-[#71717A] text-sm font-semibold">Free to start. No coding experience needed.</p>
        </div>

        <div className="bg-white rounded-[20px] border border-[#E4E4E7] p-8">
          {sent ? (
            <div className="text-center">
              <div className="w-12 h-12 bg-[#F0FDF4] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-[#15803D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="font-bold text-[#18181B] mb-1">Check your email</p>
              <p className="text-sm text-[#71717A] font-semibold">
                We sent a magic link to <strong className="text-[#18181B]">{email}</strong>.<br />
                Click it to activate your account.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSignup} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-bold text-[#18181B] mb-1.5">Your name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Priya"
                  required
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-[#18181B] mb-1.5">Email address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className={inputClass}
                />
              </div>

              {error && (
                <p className="text-sm text-[#991B1B] bg-[#FEF2F2] px-3 py-2 rounded-xl font-semibold">{error}</p>
              )}

              <Button type="submit" size="lg" disabled={loading} className="w-full">
                {loading ? 'Sending...' : 'Get started →'}
              </Button>

              <p className="text-xs text-[#9B9A97] text-center font-semibold">
                By signing up you agree to our terms. No spam ever.
              </p>
            </form>
          )}
        </div>

        <p className="text-center text-sm text-[#71717A] font-semibold mt-6">
          Already have an account?{' '}
          <Link href="/login" className="text-[#18181B] font-bold underline underline-offset-2 hover:opacity-70">
            Sign in
          </Link>
        </p>
      </div>
    </main>
  )
}
