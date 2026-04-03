import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { ProgressBar } from '@/components/ui/DS'

const colorClasses: Record<string, { bg: string; border: string; text: string }> = {
  purple: { bg: '#EEEDFE', border: '#AFA9EC', text: '#534AB7' },
  teal: { bg: '#E1F5EE', border: '#5DCAA5', text: '#085041' },
  amber: { bg: '#FAEEDA', border: '#EF9F27', text: '#633806' },
  blue: { bg: '#E6F1FB', border: '#85B7EB', text: '#185FA5' },
  green: { bg: '#EAF3DE', border: '#97C459', text: '#27500A' },
  coral: { bg: '#FAECE7', border: '#F0997B', text: '#712B13' },
}

function BadgeIcon({ shape, color, earned }: { shape: string; color: string; earned: boolean }) {
  const c = colorClasses[color] ?? colorClasses.purple
  const bg = earned ? c.bg : '#F1EFE8'
  const border = earned ? c.border : '#D3D1C7'
  const textColor = earned ? c.text : '#888780'

  return (
    <svg viewBox="0 0 48 48" className="w-12 h-12">
      {shape === 'circle' ? (
        <circle cx="24" cy="24" r="20" fill={bg} stroke={border} strokeWidth="1.2"/>
      ) : shape === 'stamp' ? (
        <>
          <rect x="4" y="4" width="40" height="40" rx="8" fill={bg} stroke={border} strokeWidth="1.2"/>
          <rect x="8" y="8" width="32" height="32" rx="5" fill="none" stroke={border} strokeWidth="0.6" strokeDasharray="2.5 2"/>
        </>
      ) : shape === 'hex' ? (
        <polygon points="24,3 42,13 42,35 24,45 6,35 6,13" fill={bg} stroke={border} strokeWidth="1.2"/>
      ) : (
        <polygon points="24,2 30,16 46,16 34,26 38,42 24,33 10,42 14,26 2,16 18,16" fill={bg} stroke={border} strokeWidth="1.2"/>
      )}
      <text x="24" y="28" textAnchor="middle" fontSize="14" fill={textColor} fontFamily="system-ui">
        {earned ? '★' : '?'}
      </text>
    </svg>
  )
}

export default async function BadgesPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: allBadges } = await supabase
    .from('badge_definitions')
    .select('*')
    .order('created_at')

  const { data: earnedBadges } = await supabase
    .from('user_badges')
    .select('badge_id, earned_at')
    .eq('user_id', user.id)

  const earnedSet = new Set(earnedBadges?.map(b => b.badge_id) ?? [])
  const earnedMap = new Map(earnedBadges?.map(b => [b.badge_id, b.earned_at]) ?? [])

  const earnedCount = earnedSet.size
  const totalCount = allBadges?.length ?? 0

  return (
    <div className="min-h-screen bg-[#F4F4F5]">
      <nav className="bg-white border-b border-[#F4F4F5] px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[#18181B] rounded-lg flex items-center justify-center">
              <span className="text-white text-xs font-mono font-bold">{'{}'}</span>
            </div>
            <span className="font-bold text-[#18181B] text-sm">Codelit</span>
          </div>
          <div className="flex items-center gap-1">
            <Link href="/dashboard" className="text-sm text-[#71717A] hover:text-[#18181B] px-3 py-1.5 rounded-full hover:bg-[#F4F4F5] transition-colors">
              Dashboard
            </Link>
            <Link href="/badges" className="text-sm font-bold text-[#18181B] px-3 py-1.5 rounded-full bg-[#F4F4F5]">
              Badges
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-extrabold text-[#18181B] mb-1">Your badges</h1>
          <p className="text-sm text-[#71717A] font-semibold">{earnedCount} of {totalCount} earned</p>
          <div className="w-48 mt-3">
            <ProgressBar value={earnedCount} max={totalCount} complete={earnedCount === totalCount && totalCount > 0} />
          </div>
        </div>

        {/* Earned */}
        {earnedCount > 0 && (
          <div className="mb-10">
            <p className="text-[11px] font-bold text-[#9B9A97] tracking-[0.1em] uppercase mb-4">Earned</p>
            <div className="grid grid-cols-4 gap-4 sm:grid-cols-6">
              {allBadges?.filter(b => earnedSet.has(b.id)).map((badge) => (
                <div key={badge.id} className="flex flex-col items-center gap-2 p-3 bg-white rounded-[16px] border border-[#F4F4F5]">
                  <BadgeIcon shape={badge.shape} color={badge.color_ramp} earned={true} />
                  <div className="text-xs font-bold text-[#18181B] text-center leading-tight">{badge.name}</div>
                  <div className="text-[10px] text-[#9B9A97] font-semibold">
                    {new Date(earnedMap.get(badge.id)!).toLocaleDateString('en', { month: 'short', day: 'numeric' })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Locked */}
        <div>
          <p className="text-[11px] font-bold text-[#9B9A97] tracking-[0.1em] uppercase mb-4">Locked</p>
          <div className="grid grid-cols-4 gap-4 sm:grid-cols-6">
            {allBadges?.filter(b => !earnedSet.has(b.id)).map((badge) => (
              <div key={badge.id} className="flex flex-col items-center gap-2 p-3 bg-white rounded-[16px] border border-[#F4F4F5] opacity-40">
                <BadgeIcon shape={badge.shape} color={badge.color_ramp} earned={false} />
                <div className="text-xs font-bold text-[#18181B] text-center leading-tight">{badge.name}</div>
                <div className="text-[10px] text-[#9B9A97] text-center font-semibold">{badge.description}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
