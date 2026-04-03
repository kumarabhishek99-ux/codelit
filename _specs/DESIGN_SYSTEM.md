# Codelit Design System — Full Implementation

## Overview
Apply the Codelit design system across the entire app.
One spec, one commit, one push. No npm run dev.

---

## Design tokens

### Brand
- Primary: `#18181B` (ink black)
- White: `#FFFFFF`
- Surface: `#F4F4F5` (near-white bg for cards)

### Accent palette (for callout cards, badges, tags only)
- Amber: bg `#FFF7ED`, icon bg `#FDE68A`, text `#92400E`
- Blue: bg `#EFF6FF`, icon bg `#BFDBFE`, text `#1D4ED8`
- Green: bg `#F0FDF4`, icon bg `#BBF7D0`, text `#15803D`
- Lilac: bg `#FDF4FF`, icon bg `#E9D5FF`, text `#7E22CE`

### Text colours
- Primary: `#18181B`
- Body: `#52525B`
- Muted: `#71717A`
- Placeholder/meta: `#9B9A97`

### Border
- Default: `1px solid #F4F4F5`
- Subtle: `1px solid #E4E4E7`

### Corner radius
- Tags/pills: `100px`
- Buttons: `100px`
- Callout cards: `20px`
- Module/lesson cards: `16px`
- Inputs: `12px`
- Code blocks: `16px`

### Spacing scale (use consistently)
- xs: `8px`
- sm: `12px`
- md: `16px`
- lg: `24px`
- xl: `32px`
- 2xl: `48px`

---

## Step 1 — Install Nunito font

In `app/layout.tsx`, replace the current font import with Nunito from Google Fonts:

```typescript
import { Nunito } from 'next/font/google'

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-nunito',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={nunito.variable}>
      <body className={`${nunito.className} bg-white text-[#18181B]`}>
        {children}
      </body>
    </html>
  )
}
```

---

## Step 2 — Update globals.css

Replace `app/globals.css` with:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --font-nunito: 'Nunito', system-ui, sans-serif;
}

body {
  font-family: var(--font-nunito);
  background: #ffffff;
  color: #18181B;
  -webkit-font-smoothing: antialiased;
}

/* Scrollbar */
::-webkit-scrollbar { width: 5px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: #E4E4E7; border-radius: 10px; }
```

---

## Step 3 — Update tailwind.config.ts

Add Nunito to the font family:

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './lib/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Nunito', 'system-ui', 'sans-serif'],
        mono: ['SF Mono', 'Menlo', 'monospace'],
      },
      colors: {
        brand: '#18181B',
        surface: '#F4F4F5',
        border: '#E4E4E7',
        body: '#52525B',
        muted: '#71717A',
        meta: '#9B9A97',
      },
      borderRadius: {
        'pill': '100px',
        'card': '16px',
        'callout': '20px',
      },
    },
  },
  plugins: [],
}

export default config
```

---

## Step 4 — Create design system component file

Create `components/ui/DS.tsx` — reusable components used everywhere:

```typescript
import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

// ── Button ─────────────────────────────────────────────
interface ButtonProps {
  children: ReactNode
  onClick?: () => void
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  className?: string
  type?: 'button' | 'submit'
}

export function Button({ children, onClick, size = 'md', disabled, className, type = 'button' }: ButtonProps) {
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-2.5 text-sm',
    lg: 'px-7 py-3 text-base',
  }
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'rounded-pill bg-[#18181B] text-white font-bold tracking-wide',
        'transition-opacity hover:opacity-80 active:opacity-70',
        'disabled:opacity-30 disabled:cursor-not-allowed',
        'border-none cursor-pointer font-[Nunito]',
        sizes[size],
        className
      )}
    >
      {children}
    </button>
  )
}

// ── Badge ──────────────────────────────────────────────
interface BadgeProps {
  children: ReactNode
  variant?: 'default' | 'success' | 'warning' | 'locked' | 'brand' | 'lilac'
  icon?: ReactNode
}

const badgeVariants = {
  default: 'bg-[#F4F4F5] text-[#18181B]',
  success: 'bg-[#F0FDF4] text-[#15803D]',
  warning: 'bg-[#FFF7ED] text-[#92400E]',
  locked: 'bg-[#FDF4FF] text-[#7E22CE]',
  brand: 'bg-[#18181B] text-white',
  lilac: 'bg-[#FDF4FF] text-[#7E22CE]',
}

export function Badge({ children, variant = 'default', icon }: BadgeProps) {
  return (
    <span className={cn(
      'inline-flex items-center gap-1.5 rounded-pill px-3 py-1 text-xs font-bold',
      badgeVariants[variant]
    )}>
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </span>
  )
}

// ── Callout card ──────────────────────────────────────
interface CalloutProps {
  type: 'analogy' | 'concept' | 'vibe'
  children: ReactNode
}

const calloutConfig = {
  analogy: {
    bg: '#FFF7ED',
    iconBg: '#FDE68A',
    labelColor: '#92400E',
    label: 'Think of it like this',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 2a6 6 0 0 1 4 10.5V14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-1.5A6 6 0 0 1 10 2z" stroke="#92400E" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M7 17h6M8 19h4" stroke="#92400E" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  concept: {
    bg: '#EFF6FF',
    iconBg: '#BFDBFE',
    labelColor: '#1D4ED8',
    label: 'Key concept',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 3l1.5 4.5H16l-3.5 2.5 1.5 4.5L10 12l-4 2.5 1.5-4.5L4 7.5h4.5z" stroke="#1D4ED8" strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    ),
  },
  vibe: {
    bg: '#F0FDF4',
    iconBg: '#BBF7D0',
    labelColor: '#15803D',
    label: 'Why this matters for vibe coding',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 2l2 5h5l-4 3 1.5 5L10 12.5 5.5 15 7 10 3 7h5z" stroke="#15803D" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M10 15v3M8.5 18h3" stroke="#15803D" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
}

export function Callout({ type, children }: CalloutProps) {
  const config = calloutConfig[type]
  return (
    <div
      className="flex items-start gap-3.5 rounded-[20px] p-5"
      style={{ background: config.bg }}
    >
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: config.iconBg }}
      >
        {config.icon}
      </div>
      <div>
        <div
          className="text-[10px] font-bold tracking-[0.09em] uppercase mb-2"
          style={{ color: config.labelColor }}
        >
          {config.label}
        </div>
        <div className="text-sm text-[#3F3F46] leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  )
}

// ── Progress bar ──────────────────────────────────────
interface ProgressProps {
  value: number
  max?: number
  complete?: boolean
}

export function ProgressBar({ value, max = 100, complete }: ProgressProps) {
  const pct = Math.round((value / max) * 100)
  return (
    <div className="h-1.5 bg-[#F4F4F5] rounded-full overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-500"
        style={{
          width: `${pct}%`,
          background: complete ? '#22C55E' : '#18181B',
        }}
      />
    </div>
  )
}

// ── Meta label ────────────────────────────────────────
export function MetaLabel({ children }: { children: ReactNode }) {
  return (
    <div className="text-[11px] font-bold text-[#9B9A97] tracking-[0.1em] uppercase">
      {children}
    </div>
  )
}

// ── Inline code ───────────────────────────────────────
export function InlineCode({ children }: { children: ReactNode }) {
  return (
    <code className="bg-[#F4F4F5] text-[#18181B] px-1.5 py-0.5 rounded-md font-mono text-[12.5px] font-semibold">
      {children}
    </code>
  )
}

// ── Code block ────────────────────────────────────────
export function CodeBlock({ children }: { children: ReactNode }) {
  return (
    <div className="bg-[#18181B] rounded-[16px] px-5 py-4 font-mono text-[13px] leading-[1.9] text-[#D4D4D4] overflow-x-auto my-1">
      {children}
    </div>
  )
}
```

---

## Step 5 — Create lib/utils.ts if it doesn't exist

```typescript
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

Install deps if needed: `npm install clsx tailwind-merge`

---

## Step 6 — Update LessonRead.tsx

Replace `components/lesson/LessonRead.tsx` entirely:

```typescript
'use client'

import { Button, Callout, InlineCode, CodeBlock } from '@/components/ui/DS'
import { lessonContent } from '@/lib/lessonContent'

interface Props {
  lesson: any
  module: any
  onNext: () => void
}

function renderBody(html: string) {
  // Split into paragraphs on double newline
  const chunks = html.split('\n\n').filter(Boolean)

  return chunks.map((chunk, i) => {
    // Detect bullet list
    if (chunk.trim().startsWith('- ')) {
      const items = chunk.split('\n').filter(l => l.startsWith('- '))
      return (
        <ul key={i} className="my-5 space-y-2.5 list-none p-0">
          {items.map((item, j) => (
            <li key={j} className="flex items-baseline gap-3 text-[16px] text-[#52525B] leading-[1.6]">
              <span className="text-[#D4D4D8] text-lg leading-none flex-shrink-0 mt-0.5">·</span>
              <span dangerouslySetInnerHTML={{ __html: formatInline(item.replace(/^- /, '')) }} />
            </li>
          ))}
        </ul>
      )
    }

    // Detect code block (contains newline inside code tag)
    if (chunk.includes('\n') && chunk.trim().startsWith('<code>')) {
      const code = chunk.replace(/<\/?code>/g, '')
      return (
        <div key={i} className="my-5">
          <div className="bg-[#18181B] rounded-[16px] px-5 py-4 font-mono text-[13px] leading-[1.9] text-[#D4D4D4] overflow-x-auto">
            {code.split('\n').map((line, j) => (
              <div key={j}>{line || '\u00A0'}</div>
            ))}
          </div>
        </div>
      )
    }

    // Normal paragraph
    return (
      <p
        key={i}
        className="text-[16px] text-[#52525B] leading-[1.6] mb-5"
        dangerouslySetInnerHTML={{ __html: formatInline(chunk) }}
      />
    )
  })
}

function formatInline(html: string) {
  return html
    .replace(/<strong>(.*?)<\/strong>/g, '<strong class="font-bold text-[#18181B]">$1</strong>')
    .replace(/<code>(.*?)<\/code>/g, '<code class="bg-[#F4F4F5] text-[#18181B] px-1.5 py-0.5 rounded-md font-mono text-[12.5px] font-semibold">$1</code>')
}

const fallbackContent = {
  body: 'This lesson content is being prepared.',
  analogy: 'Learning to read code is like learning to read a map.',
  keyConcept: 'Code literacy is about building mental models, not memorising syntax.',
  vibeBridge: 'Every concept in this course makes you a better director of AI coding tools.',
}

export default function LessonRead({ lesson, module: mod, onNext }: Props) {
  const content = lessonContent[lesson.slug] ?? fallbackContent

  return (
    <div className="max-w-[600px]">

      {/* Meta */}
      <div className="flex items-center gap-2 mb-8">
        <span className="text-[11px] font-bold text-[#9B9A97] tracking-[0.1em] uppercase">
          {mod.title}
        </span>
        <span className="text-[#D4D4D8]">·</span>
        <span className="text-[11px] font-bold text-[#9B9A97] tracking-[0.1em] uppercase">
          {lesson.est_minutes} min read
        </span>
      </div>

      {/* Title */}
      <h1 className="text-[30px] font-extrabold tracking-tight text-[#18181B] leading-[1.15] mb-10">
        {lesson.title}
      </h1>

      {/* Body */}
      <div className="mb-10">
        {renderBody(content.body)}
      </div>

      {/* Callout cards */}
      <div className="space-y-3 mb-10">
        <Callout type="analogy">{content.analogy}</Callout>
        <Callout type="concept">{content.keyConcept}</Callout>
        <Callout type="vibe">{content.vibeBridge}</Callout>
      </div>

      {/* Nav */}
      <div className="flex justify-end pt-6 border-t border-[#F4F4F5]">
        <Button size="lg" onClick={onNext}>Try it →</Button>
      </div>
    </div>
  )
}
```

---

## Step 7 — Update Dashboard

In `app/dashboard/page.tsx`, apply design system tokens:

- All headings: `font-extrabold` or `font-bold`, `text-[#18181B]`
- Body text: `text-[#52525B]`
- Meta labels: `text-[11px] font-bold text-[#9B9A97] tracking-[0.1em] uppercase`
- All buttons: replace with `<Button>` from DS.tsx
- Module cards: `rounded-[16px]` corners, `bg-white border border-[#F4F4F5]`
- Continue card: `rounded-[20px] bg-[#18181B] text-white p-5` — invert the continue card to black background white text for maximum prominence
- Progress bars: replace with `<ProgressBar>` from DS.tsx
- Stat cards: `rounded-[16px] bg-[#F4F4F5] p-4`

---

## Step 8 — Update Onboarding

In `app/onboarding/page.tsx`:

- Progress dots: active dot = `bg-[#18181B] w-5`, done dot = `bg-[#22C55E]`, inactive = `bg-[#F4F4F5]`
- Choice cards selected state: `border-[#18181B] border-2 bg-[#F4F4F5]`
- All buttons: `<Button>` from DS.tsx
- Skip link: `text-[#9B9A97] text-sm font-semibold underline-offset-2 hover:text-[#52525B]`
- Persona result card: use Callout type colours — designer = blue bg, pm_founder = green bg, general = amber bg

---

## Step 9 — Update Badges page

In `app/badges/page.tsx`:

- Progress bar: `<ProgressBar>`
- Badge cards earned: `rounded-[16px] bg-white border border-[#F4F4F5] p-4`
- Badge cards locked: same but `opacity-40`
- Badge labels: `text-xs font-bold text-[#18181B]`

---

## Step 10 — Update LessonQuiz.tsx

- Question text: `text-[17px] font-bold text-[#18181B] leading-snug`
- Option cards default: `rounded-[16px] border border-[#E4E4E7] bg-white p-4 text-[15px] text-[#52525B] cursor-pointer`
- Option selected: `border-[#18181B] border-2 bg-[#F4F4F5]`
- Option correct: `border-[#22C55E] border-2 bg-[#F0FDF4] text-[#15803D]`
- Option wrong: `border-[#EF4444] border-2 bg-[#FEF2F2] text-[#991B1B]`
- Feedback correct: `bg-[#F0FDF4] text-[#15803D] rounded-[12px] p-3 text-sm`
- Feedback wrong: `bg-[#FEF2F2] text-[#991B1B] rounded-[12px] p-3 text-sm`
- Complete button: `<Button>` disabled until all correct

---

## Step 11 — Update LessonComplete and LessonRevisionComplete

- Badge circle: `bg-[#F0FDF4] border-2 border-[#22C55E]`
- Title: `text-[24px] font-extrabold text-[#18181B]`
- Subtitle: `text-[15px] text-[#52525B]`
- Next lesson card: `rounded-[16px] bg-[#F4F4F5] p-4`
- Buttons: `<Button>` from DS.tsx

---

## Step 12 — Update Login and Signup pages

- Card: `rounded-[20px] bg-white border border-[#E4E4E7] p-8`
- Inputs: `rounded-[12px] border border-[#E4E4E7] text-[15px] px-4 py-3`
- Input focus: `focus:border-[#18181B] focus:ring-0 outline-none`
- Button: `<Button size="lg" className="w-full">` 
- Link text: `text-[#18181B] font-bold underline underline-offset-2`

---

## Step 13 — Run and push

```bash
npm install clsx tailwind-merge
npx supabase db push
git add .
git commit -m "feat: Codelit design system — Nunito, ink black, callout cards, rounded UI"
git push
```

## Done when
- Nunito font loads across the whole app
- All buttons are black pill with white text
- Lesson read view uses the three callout card types
- Body text is 16px / 1.6 line height
- Dashboard continue card is inverted black
- Consistent border radius throughout
- No npm run dev — verify on Vercel
