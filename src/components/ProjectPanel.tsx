import { useState } from 'react'
import type { Project } from '../types'
import { accountStatus, fmtDate, moduleStatus, mxn, overallLabel, pendingStatus, phaseStatus, severity } from '../lib/labels'
import { phaseProgress, projectProgress } from '../lib/progress'
import { Badge, Bar, Ring, Section, pct } from './ui'

export function ProjectPanel({ project: p }: { project: Project }) {
  const progress = projectProgress(p)
  const [sev, setSev] = useState<'todas' | 'alta' | 'media' | 'baja'>('todas')
  const risks = [...p.risks].sort((a, b) => severity[a.severity].order - severity[b.severity].order).filter((r) => sev === 'todas' || r.severity === sev)
  const openPending = p.pending.filter((x) => x.status !== 'resuelto')

  return (
    <div className="space-y-5">
      {/* Encabezado */}
      <header className="card overflow-hidden">
        <div className="bg-brand p-5 text-white sm:p-7" style={{ background: 'linear-gradient(135deg, #1f3a5f, #2a4d7c)' }}>
          <p className="text-xs font-semibold uppercase tracking-widest text-white/70">{p.client}</p>
          <h1 className="mt-1 text-3xl font-semibold leading-tight sm:text-4xl">{p.name}</h1>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-white/80">{p.summary}</p>
        </div>
        <div className="flex flex-col gap-6 p-5 sm:flex-row sm:items-center sm:p-7">
          <Ring value={progress} size={132} caption="avance global" />
          <dl className="grid flex-1 grid-cols-2 gap-x-6 gap-y-4 text-sm lg:grid-cols-4">
            <div>
              <dt className="eyebrow">Estado general</dt>
              <dd className="mt-1"><Badge tone={overallLabel[p.overall.status]}>{p.overall.label}</Badge></dd>
            </div>
            <div>
              <dt className="eyebrow">Fase actual</dt>
              <dd className="mt-1 font-medium">{p.phases.find((x) => x.id === p.currentPhaseId)?.name}</dd>
              {p.currentStage && <dd className="text-xs text-muted">{p.currentStage}</dd>}
            </div>
            <div>
              <dt className="eyebrow">{p.headline.label}</dt>
              <dd className="mt-1 font-serif text-2xl font-semibold">{p.headline.done} <span className="text-base text-muted">de {p.headline.total}</span></dd>
            </div>
            <div>
              <dt className="eyebrow">Actualizado</dt>
              <dd className="mt-1 font-medium">{fmtDate(p.updated)}</dd>
              <dd className="text-xs text-muted">{p.owner}</dd>
            </div>
          </dl>
        </div>
        <div className="border-t border-line bg-bg/60 px-5 py-3 text-sm sm:px-7">
          <span className="eyebrow mr-2">Siguiente paso</span>{p.nextStep}
        </div>
      </header>

      {/* Indicadores */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {p.metrics.map((m) => (
          <div key={m.label} className="card p-4">
            <p className="eyebrow">{m.label}</p>
            <p className="mt-1 font-serif text-2xl font-semibold break-words">{m.value}</p>
            {m.note && <p className="mt-0.5 text-xs text-muted">{m.note}</p>}
          </div>
        ))}
      </div>

      {/* Fases */}
      <Section title="Fases del proyecto" hint="Avance por fase y estado actual.">
        <ol className="space-y-0">
          {p.phases.map((ph, i) => {
            const v = phaseProgress(ph)
            const st = phaseStatus[ph.status]
            const current = ph.id === p.currentPhaseId
            return (
              <li key={ph.id} className="relative flex gap-4 pb-6 last:pb-0">
                {i < p.phases.length - 1 && <span className="absolute left-[15px] top-8 h-[calc(100%-2rem)] w-px bg-line" aria-hidden />}
                <span
                  className="z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold"
                  style={{
                    borderColor: `var(--${st.tone === 'info' ? 'brand' : st.tone})`,
                    background: ph.status === 'listo' ? 'var(--ok)' : 'var(--surface)',
                    color: ph.status === 'listo' ? '#fff' : 'var(--ink)',
                  }}
                >
                  {ph.status === 'listo' ? '✓' : i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <h3 className="text-lg font-semibold leading-tight">{ph.name}</h3>
                    <Badge tone={st.tone}>{st.label}</Badge>
                    {current && ph.status !== 'listo' && <Badge tone="warn">Actual</Badge>}
                  </div>
                  <p className="mt-0.5 text-sm text-muted">{ph.description}</p>
                  <div className="mt-2 flex items-center gap-3">
                    <div className="flex-1"><Bar value={v} tone={ph.status === 'listo' ? 'ok' : 'info'} label={`Avance de ${ph.name}`} /></div>
                    <span className="w-10 text-right text-xs font-semibold tabular-nums">{pct(v)}</span>
                  </div>
                  <p className="mt-1 text-xs text-muted">
                    {[ph.steps && `${ph.steps.done}/${ph.steps.total} pasos`, ph.duration && `Duración: ${ph.duration}`, ph.impact && `Impacto: ${ph.impact}`, ph.period].filter(Boolean).join(' · ')}
                  </p>
                </div>
              </li>
            )
          })}
        </ol>
      </Section>

      <div className="grid gap-5 lg:grid-cols-2">
        {/* Stoppers */}
        <Section title="Stoppers" hint="Lo que hoy frena el avance.">
          {p.stoppers.length === 0 ? (
            <p className="text-sm text-muted">Sin bloqueos activos.</p>
          ) : (
            <ul className="space-y-3">
              {p.stoppers.map((s) => (
                <li key={s.title} className="rounded-xl border border-line p-3.5" style={{ borderLeft: '4px solid var(--warn)' }}>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-base font-semibold leading-snug">{s.title}</h3>
                    <Badge tone="warn">Bloquea: {s.blocks}</Badge>
                  </div>
                  <p className="mt-1 text-sm text-muted">{s.detail}</p>
                </li>
              ))}
            </ul>
          )}
        </Section>

        {/* Hitos */}
        <Section title="Hitos" hint={`${p.milestones.filter((m) => m.done).length} de ${p.milestones.length} alcanzados.`}>
          <ul className="space-y-2.5">
            {p.milestones.map((m) => (
              <li key={m.title} className="flex items-start gap-3 text-sm">
                <span
                  aria-hidden
                  className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[11px] font-bold"
                  style={m.done ? { background: 'var(--ok)', borderColor: 'var(--ok)', color: '#fff' } : { borderColor: 'var(--line)' }}
                >
                  {m.done && '✓'}
                </span>
                <span className={m.done ? '' : 'text-muted'}>
                  {m.title}
                  <span className="sr-only">{m.done ? ' (logrado)' : ' (pendiente)'}</span>
                </span>
              </li>
            ))}
          </ul>
        </Section>
      </div>

      {/* Pendientes */}
      <Section title="Pendientes y decisiones" hint={`${openPending.length} abiertos.`}>
        <ul className="divide-y divide-line">
          {p.pending.map((x) => {
            const st = pendingStatus[x.status]
            return (
              <li key={x.id} className="flex flex-col gap-1.5 py-3 first:pt-0 last:pb-0 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                <div className="flex gap-3">
                  <span className="mt-0.5 w-5 shrink-0 text-sm font-semibold text-muted tabular-nums">{x.id}</span>
                  <div>
                    <p className="font-medium leading-snug">{x.title}</p>
                    <p className="text-sm text-muted">{x.detail}</p>
                  </div>
                </div>
                <div className="pl-8 sm:pl-0"><Badge tone={st.tone}>{st.label}</Badge></div>
              </li>
            )
          })}
        </ul>
      </Section>

      {/* Riesgos */}
      <Section title="Riesgos abiertos" hint="Ordenados por severidad.">
        <div className="mb-4 flex flex-wrap gap-2" role="group" aria-label="Filtrar por severidad">
          {(['todas', 'alta', 'media', 'baja'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setSev(s)}
              aria-pressed={sev === s}
              className={`rounded-full border px-3.5 py-1.5 text-sm font-medium capitalize transition ${sev === s ? 'border-brand bg-brand text-white dark:text-bg' : 'border-line text-muted hover:text-ink'}`}
            >
              {s} {s !== 'todas' && <span className="opacity-70">({p.risks.filter((r) => r.severity === s).length})</span>}
            </button>
          ))}
        </div>
        <ul className="grid gap-3 md:grid-cols-2">
          {risks.map((r) => (
            <li key={r.title} className="rounded-xl border border-line p-3.5">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-base font-semibold leading-snug">{r.title}</h3>
                <Badge tone={severity[r.severity].tone}>{severity[r.severity].label}</Badge>
              </div>
              <p className="mt-1.5 text-sm text-muted"><span className="font-medium text-ink">Mitigación: </span>{r.mitigation}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Módulos (portal) */}
      {p.modules && (
        <Section title="Alcance por módulo" hint={`${p.modules.filter((m) => m.status === 'listo').length} de ${p.modules.length} listos.`}>
          <div className="grid gap-3 sm:grid-cols-2">
            {p.modules.map((m) => (
              <div key={m.name} className="flex items-start justify-between gap-3 rounded-xl border border-line p-3.5">
                <div>
                  <h3 className="text-base font-semibold leading-snug">{m.name}</h3>
                  <p className="mt-0.5 text-sm text-muted">{m.description}</p>
                </div>
                <Badge tone={moduleStatus[m.status].tone}>{moduleStatus[m.status].label}</Badge>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Cuentas (correos) */}
      {p.accounts && (
        <Section title="Cuentas base" hint="Avance por cuenta: por inventariar → inventariada → respaldada → migrada → alias activo → usuario eliminado.">
          <div className="grid gap-3 md:grid-cols-3">
            {p.accounts.map((a) => {
              const st = accountStatus[a.status]
              return (
                <div key={a.email} className="rounded-xl border border-line p-4">
                  <p className="break-all font-semibold">{a.email}</p>
                  <p className="mt-1 text-sm text-muted">{a.role}</p>
                  <p className="mt-2 text-xs text-muted"><span className="font-medium text-ink">Alias: </span>{a.aliases}</p>
                  <div className="mt-3 space-y-1.5">
                    <Badge tone={st.tone}>{st.label}</Badge>
                    <Bar value={(st.step / 5) * 100} label={`Avance de ${a.email}`} />
                  </div>
                </div>
              )
            })}
          </div>
        </Section>
      )}

      {/* Ahorro (correos) */}
      {p.savings && (
        <Section title={p.savings.title} hint={p.savings.note}>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead>
                <tr className="eyebrow border-b border-line">
                  <th className="py-2 pr-3 font-semibold">Escenario</th>
                  <th className="px-3 py-2 text-right font-semibold">Cuentas</th>
                  <th className="px-3 py-2 text-right font-semibold">Mensual</th>
                  <th className="px-3 py-2 text-right font-semibold">Anual</th>
                  <th className="py-2 pl-3 text-right font-semibold">Ahorro anual</th>
                </tr>
              </thead>
              <tbody>
                {p.savings.rows.map((r) => (
                  <tr key={r.scenario} className={`border-b border-line last:border-0 ${r.highlight ? 'font-semibold' : ''}`}>
                    <td className="py-2.5 pr-3">{r.scenario}{r.highlight && <span className="ml-2"><Badge tone="ok">Recomendado</Badge></span>}</td>
                    <td className="px-3 py-2.5 text-right tabular-nums">{r.accounts}</td>
                    <td className="px-3 py-2.5 text-right tabular-nums">{mxn(r.monthly)}</td>
                    <td className="px-3 py-2.5 text-right tabular-nums">{mxn(r.annual)}</td>
                    <td className="py-2.5 pl-3 text-right tabular-nums text-ok">{r.saving ? mxn(r.saving) : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>
      )}

      {/* Bitácora */}
      <Section title="Bitácora de avances">
        <ul className="space-y-4">
          {p.log.map((l) => (
            <li key={l.date + l.text} className="grid gap-1 sm:grid-cols-[9rem_1fr] sm:gap-4">
              <span className="text-sm font-semibold text-brand">{/^\d{4}-\d{2}-\d{2}$/.test(l.date) ? fmtDate(l.date) : l.date}</span>
              <span className="text-sm leading-relaxed">{l.text}</span>
            </li>
          ))}
        </ul>
      </Section>
    </div>
  )
}
