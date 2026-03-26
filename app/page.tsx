import Link from 'next/link'

export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-purple-100 rounded-lg flex items-center justify-center">
            <span className="text-purple-700 text-xs font-mono font-bold">{'{}'}</span>
          </div>
          <span className="font-medium text-gray-900">Codelit</span>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/login" className="text-sm text-gray-500 hover:text-gray-900">
            Sign in
          </Link>
          <Link
            href="/signup"
            className="text-sm font-medium bg-gray-900 text-white px-4 py-2 rounded-full hover:bg-gray-700 transition-colors"
          >
            Get started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 py-24 text-center">
        <div className="inline-flex items-center gap-2 bg-purple-50 text-purple-700 text-xs font-medium px-3 py-1.5 rounded-full mb-8 border border-purple-100">
          For designers, PMs & founders
        </div>

        <h1 className="text-5xl font-medium text-gray-900 max-w-2xl leading-tight mb-6">
          Just enough code to build with AI
        </h1>

        <p className="text-xl text-gray-500 max-w-lg leading-relaxed mb-10">
          You don't need to become a developer. You just need to stop feeling lost around code.
          Codelit gets you there in under 10 hours.
        </p>

        <Link
          href="/signup"
          className="bg-gray-900 text-white text-base font-medium px-8 py-3.5 rounded-full hover:bg-gray-700 transition-colors"
        >
          Start for free →
        </Link>

        <p className="text-sm text-gray-400 mt-4">No credit card. No coding experience needed.</p>
      </div>

      {/* Features strip */}
      <div className="border-t border-gray-100 px-8 py-10">
        <div className="max-w-3xl mx-auto grid grid-cols-3 gap-8 text-center">
          {[
            { label: '8 modules', desc: 'Terminal to shipping' },
            { label: 'Bite-sized lessons', desc: '5–10 min each' },
            { label: 'Earn badges', desc: 'Track your progress' },
          ].map((f) => (
            <div key={f.label}>
              <div className="text-base font-medium text-gray-900 mb-1">{f.label}</div>
              <div className="text-sm text-gray-500">{f.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
