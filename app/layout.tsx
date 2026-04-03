import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import './globals.css'

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-nunito',
})

export const metadata: Metadata = {
  title: 'Codelit — Code literacy for non-coders',
  description: 'Learn just enough code to build with AI. For designers, PMs, and founders.',
  openGraph: {
    title: 'Codelit',
    description: 'Learn just enough code to build with AI.',
    url: 'https://codelit-bay.vercel.app',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={nunito.variable}>
      <body className={`${nunito.className} bg-white text-[#18181B]`}>
        {children}
      </body>
    </html>
  )
}
