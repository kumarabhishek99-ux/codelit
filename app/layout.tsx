import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'

const geist = Geist({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Codelit — Code literacy for non-coders',
  description: 'Learn just enough code to build with AI. For designers, PMs, and founders.',
  openGraph: {
    title: 'Codelit',
    description: 'Learn just enough code to build with AI.',
    url: 'https://codelit-bay.vercel.app',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={geist.className}>
        {children}
      </body>
    </html>
  )
}
