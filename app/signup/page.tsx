'use client'

import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

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
        emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
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

  return (
    <main className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-7 h-7 bg-purple-100 rounded-lg flex items-center justify-center">
              <span className="text-purple-700 text-xs font-mono font-bold">{'{}'}</span>
            </div>
            <span className="font-medium text-gray-900">Codelit</span>
          </Link>
          <h1 className="text-2xl font-medium text-gray-900 mb-2">Create your account</h1>
          <p className="text-gray-500 text-sm">Free to start. No coding experience needed.</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-8">
          {sent ? (
            <div className="text-center">
              <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="font-medium text-gray-900 mb-1">Check your email</p>
              <p className="text-sm text-gray-500">
                We sent a magic link to <strong>{email}</strong>.<br />
                Click it to activate your account.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSignup} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Your name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Priya"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Email address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
                />
              </div>

              {error && (
                <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gray-900 text-white text-sm font-medium py-2.5 rounded-xl hover:bg-gray-700 transition-colors disabled:opacity-50"
              >
                {loading ? 'Sending...' : 'Get started →'}
              </button>

              <p className="text-xs text-gray-400 text-center">
                By signing up you agree to our terms. No spam ever.
              </p>
            </form>
          )}
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{' '}
          <Link href="/login" className="text-purple-600 hover:text-purple-800 font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </main>
  )
}
