export type Tone = 'ok' | 'warn' | 'danger' | 'info' | 'neutral'
export type Severity = 'alta' | 'media' | 'baja'
export type PhaseStatus = 'listo' | 'en-curso' | 'pendiente' | 'bloqueado'
export type OverallStatus = 'planeacion' | 'en-curso' | 'demo-lista' | 'en-riesgo' | 'detenido' | 'completado'
export type PendingStatus = 'por-confirmar' | 'por-investigar' | 'por-validar' | 'futuro' | 'resuelto'

export interface Phase {
  id: string
  name: string
  description: string
  status: PhaseStatus
  /** Si hay checklist, el avance se calcula con él. */
  steps?: { done: number; total: number }
  /** Avance manual (0-100) para fases en curso sin checklist. */
  progress?: number
  duration?: string
  impact?: string
  period?: string
}

export interface Pending {
  id: number
  title: string
  detail: string
  status: PendingStatus
}

export interface Stopper {
  title: string
  detail: string
  blocks: string
}

export interface Risk {
  title: string
  severity: Severity
  mitigation: string
}

export interface Milestone {
  title: string
  done: boolean
}

export interface ModuleItem {
  name: string
  description: string
  status: 'listo' | 'en-desarrollo' | 'por-iniciar' | 'fase-posterior'
}

export interface AccountItem {
  email: string
  role: string
  aliases: string
  status: 'por-inventariar' | 'inventariada' | 'respaldada' | 'migrada' | 'alias-activo' | 'usuario-eliminado'
}

export interface Metric {
  label: string
  value: string
  note?: string
}

export interface LogEntry {
  date: string
  text: string
}

export interface Project {
  id: string
  name: string
  client: string
  summary: string
  owner: string
  updated: string
  overall: { status: OverallStatus; label: string }
  currentPhaseId: string
  currentStage?: string
  nextStep: string
  phases: Phase[]
  /** Etiqueta del avance principal, p. ej. "módulos terminados". */
  headline: { label: string; done: number; total: number }
  metrics: Metric[]
  pending: Pending[]
  stoppers: Stopper[]
  risks: Risk[]
  milestones: Milestone[]
  modules?: ModuleItem[]
  accounts?: AccountItem[]
  savings?: { title: string; rows: { scenario: string; accounts: number; monthly: number; annual: number; saving: number | null; highlight?: boolean }[]; note: string }
  log: LogEntry[]
}
