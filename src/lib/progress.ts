import type { Phase, Project } from '../types'

export function phaseProgress(p: Phase): number {
  if (p.steps) return p.steps.total ? (p.steps.done / p.steps.total) * 100 : 0
  if (p.status === 'listo') return 100
  return p.progress ?? 0
}

/** Avance global: promedio de las fases, ponderado por sus pasos (1 si no hay checklist). */
export function projectProgress(proj: Project): number {
  const weights = proj.phases.map((p) => p.steps?.total ?? 1)
  const total = weights.reduce((a, b) => a + b, 0)
  if (!total) return 0
  return proj.phases.reduce((acc, p, i) => acc + phaseProgress(p) * weights[i], 0) / total
}
