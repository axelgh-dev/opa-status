import type { Project } from '../types'
import { fmtDate, overallLabel } from '../lib/labels'
import { projectProgress } from '../lib/progress'
import { Badge, Bar, pct } from './ui'

export function ProjectCard({ project }: { project: Project }) {
  const progress = projectProgress(project)
  const phase = project.phases.find((p) => p.id === project.currentPhaseId)
  const phaseNo = project.phases.findIndex((p) => p.id === project.currentPhaseId) + 1
  const high = project.risks.filter((r) => r.severity === 'alta').length

  return (
    <a
      href={`#/${project.id}`}
      className="card group block p-5 transition hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand sm:p-6"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="eyebrow">{project.client}</p>
          <h2 className="mt-1 text-2xl font-semibold leading-tight">{project.name}</h2>
        </div>
        <Badge tone={overallLabel[project.overall.status]}>{project.overall.label}</Badge>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-muted">{project.summary}</p>

      <div className="mt-5">
        <div className="mb-1.5 flex items-baseline justify-between">
          <span className="text-sm font-medium">Avance global</span>
          <span className="font-serif text-2xl font-semibold">{pct(progress)}</span>
        </div>
        <Bar value={progress} label={`Avance de ${project.name}`} />
        <p className="mt-1.5 text-xs text-muted">
          {project.headline.done} de {project.headline.total} {project.headline.label}
        </p>
      </div>

      <dl className="mt-5 grid grid-cols-3 gap-3 border-t border-line pt-4 text-sm">
        <div>
          <dt className="eyebrow">Fase</dt>
          <dd className="mt-0.5 font-medium">{phaseNo} de {project.phases.length}</dd>
          <dd className="text-xs text-muted line-clamp-2">{phase?.name}</dd>
        </div>
        <div>
          <dt className="eyebrow">Stoppers</dt>
          <dd className={`mt-0.5 font-medium ${project.stoppers.length ? 'text-warn' : ''}`}>{project.stoppers.length}</dd>
          <dd className="text-xs text-muted">{high} riesgos altos</dd>
        </div>
        <div>
          <dt className="eyebrow">Pendientes</dt>
          <dd className="mt-0.5 font-medium">{project.pending.filter((p) => p.status !== 'futuro' && p.status !== 'resuelto').length}</dd>
          <dd className="text-xs text-muted">por resolver</dd>
        </div>
      </dl>
      <p className="mt-4 flex items-center justify-between text-xs text-muted">
        <span>Actualizado {fmtDate(project.updated)}</span>
        <span className="font-medium text-brand group-hover:underline">Ver panel →</span>
      </p>
    </a>
  )
}
