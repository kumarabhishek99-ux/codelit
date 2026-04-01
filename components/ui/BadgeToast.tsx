'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

interface Badge {
  id: string
  name: string
  description: string
  shape: string
  color_ramp: string
}

interface Props {
  userId: string
}

const colorMap: Record<string, { bg: string; border: string; text: string }> = {
  purple: { bg: '#EEEDFE', border: '#AFA9EC', text: '#534AB7' },
  teal: { bg: '#E1F5EE', border: '#5DCAA5', text: '#085041' },
  amber: { bg: '#FAEEDA', border: '#EF9F27', text: '#633806' },
  blue: { bg: '#E6F1FB', border: '#85B7EB', text: '#185FA5' },
  green: { bg: '#EAF3DE', border: '#97C459', text: '#27500A' },
  coral: { bg: '#FAECE7', border: '#F0997B', text: '#712B13' },
}

function BadgeIcon({ shape, color }: { shape: string; color: string }) {
  const c = colorMap[color] ?? colorMap.purple
  return (
    <svg viewBox="0 0 48 48" width="48" height="48">
      {shape === 'circle' ? (
        <circle cx="24" cy="24" r="20" fill={c.bg} stroke={c.border} strokeWidth="1.2"/>
      ) : shape === 'stamp' ? (
        <rect x="3" y="3" width="42" height="42" rx="8" fill={c.bg} stroke={c.border} strokeWidth="1.2"/>
      ) : shape === 'hex' ? (
        <polygon points="24,2 42,12 42,36 24,46 6,36 6,12" fill={c.bg} stroke={c.border} strokeWidth="1.2"/>
      ) : (
        <polygon points="24,2 30,16 46,16 34,24 38,40 24,31 10,40 14,24 2,16 18,16" fill={c.bg} stroke={c.border} strokeWidth="1.2"/>
      )}
      <text x="24" y="29" textAnchor="middle" fontSize="14" fill={c.text} fontFamily="system-ui">★</text>
    </svg>
  )
}

export default function BadgeToast({ userId }: Props) {
  const [queue, setQueue] = useState<Badge[]>([])
  const [visible, setVisible] = useState<Badge | null>(null)
  const [animating, setAnimating] = useState(false)

  useEffect(() => {
    const supabase = createClient()
    const channel = supabase
      .channel('badge-awards')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'user_badges',
          filter: `user_id=eq.${userId}`,
        },
        async (payload) => {
          const { data } = await supabase
            .from('badge_definitions')
            .select('*')
            .eq('id', payload.new.badge_id)
            .single()
          if (data) {
            setQueue(prev => [...prev, data])
          }
        }
      )
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [userId])

  useEffect(() => {
    if (queue.length > 0 && !visible) {
      const next = queue[0]
      setQueue(prev => prev.slice(1))
      setVisible(next)
      setAnimating(true)
      setTimeout(() => setAnimating(false), 400)
      setTimeout(() => setVisible(null), 4000)
    }
  }, [queue, visible])

  if (!visible) return null

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 1000,
        background: 'white',
        border: '0.5px solid #e5e7eb',
        borderRadius: '16px',
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
        maxWidth: '280px',
        transform: animating ? 'scale(0.8) translateY(20px)' : 'scale(1) translateY(0)',
        opacity: animating ? 0 : 1,
        transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
      }}
    >
      <div style={{ flexShrink: 0 }}>
        <BadgeIcon shape={visible.shape} color={visible.color_ramp} />
      </div>
      <div>
        <div style={{ fontSize: '11px', fontWeight: 500, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '2px' }}>
          Badge earned
        </div>
        <div style={{ fontSize: '14px', fontWeight: 500, color: '#111827' }}>{visible.name}</div>
        <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '1px' }}>{visible.description}</div>
      </div>
    </div>
  )
}
