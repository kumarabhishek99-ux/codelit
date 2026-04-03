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
        'rounded-full bg-[#18181B] text-white font-bold tracking-wide',
        'transition-opacity hover:opacity-80 active:opacity-70',
        'disabled:opacity-30 disabled:cursor-not-allowed',
        'border-none cursor-pointer',
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
      'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold',
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
