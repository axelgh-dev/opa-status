import type { ReactNode } from 'react'
import type { Tone } from '../types'

export const Badge = ({ tone, children }: { tone: Tone; children: ReactNode }) => (
  <span className={`badge t-${tone}`}>{children}</span>
)

export const Section = ({ title, hint, children }: { title: string; hint?: string; children: ReactNode }) => (
  <section className="card p-5 sm:p-6">
    <div className="mb-4">
      <h2 className="text-xl font-semibold">{title}</h2>
      {hint && <p className="mt-0.5 text-sm text-muted">{hint}</p>}
    </div>
    {children}
  </section>
)

export const pct = (n: number) => `${Math.round(n)}%`

export function Bar({ value, tone = 'info', label }: { value: number; tone?: Tone; label: string }) {
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuenow={Math.round(value)}
      aria-valuemin={0}
      aria-valuemax={100}
      className="h-2 w-full overflow-hidden rounded-full bg-line"
    >
      <div className="fill h-full rounded-full" style={{ width: `${Math.max(value, value > 0 ? 2 : 0)}%`, background: `var(--${tone === 'info' ? 'brand' : tone})` }} />
    </div>
  )
}

export function Ring({ value, size = 120, caption }: { value: number; size?: number; caption?: string }) {
  const r = 52
  const c = 2 * Math.PI * r
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }} role="img" aria-label={`Avance global ${pct(value)}`}>
      <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
        <circle cx="60" cy="60" r={r} fill="none" stroke="var(--line)" strokeWidth="10" />
        <circle
          cx="60" cy="60" r={r} fill="none" stroke="var(--accent)" strokeWidth="10" strokeLinecap="round"
          strokeDasharray={c} strokeDashoffset={c * (1 - value / 100)} className="fill" style={{ transition: 'stroke-dashoffset .8s cubic-bezier(.2,.7,.2,1)' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-serif text-3xl font-semibold leading-none">{pct(value)}</span>
        {caption && <span className="mt-1 text-[11px] text-muted">{caption}</span>}
      </div>
    </div>
  )
}
