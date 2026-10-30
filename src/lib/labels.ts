import type { AccountItem, ModuleItem, OverallStatus, PendingStatus, PhaseStatus, Severity, Tone } from '../types'

export const overallLabel: Record<OverallStatus, Tone> = {
  planeacion: 'info', 'en-curso': 'info', 'demo-lista': 'ok', 'en-riesgo': 'warn', detenido: 'danger', completado: 'ok',
}
export const phaseStatus: Record<PhaseStatus, { label: string; tone: Tone }> = {
  listo: { label: 'Terminada', tone: 'ok' },
  'en-curso': { label: 'En curso', tone: 'info' },
  pendiente: { label: 'Pendiente', tone: 'neutral' },
  bloqueado: { label: 'Bloqueada', tone: 'danger' },
}
export const severity: Record<Severity, { label: string; tone: Tone; order: number }> = {
  alta: { label: 'Alta', tone: 'danger', order: 0 },
  media: { label: 'Media', tone: 'warn', order: 1 },
  baja: { label: 'Baja', tone: 'neutral', order: 2 },
}
export const pendingStatus: Record<PendingStatus, { label: string; tone: Tone }> = {
  'por-confirmar': { label: 'Por confirmar', tone: 'warn' },
  'por-investigar': { label: 'Por investigar', tone: 'warn' },
  'por-validar': { label: 'Por validar', tone: 'warn' },
  futuro: { label: 'Fase posterior', tone: 'neutral' },
  resuelto: { label: 'Resuelto', tone: 'ok' },
}
export const moduleStatus: Record<ModuleItem['status'], { label: string; tone: Tone }> = {
  listo: { label: 'Listo', tone: 'ok' },
  'en-desarrollo': { label: 'En desarrollo', tone: 'info' },
  'por-iniciar': { label: 'Por iniciar', tone: 'neutral' },
  'fase-posterior': { label: 'Fase posterior', tone: 'neutral' },
}
export const accountStatus: Record<AccountItem['status'], { label: string; tone: Tone; step: number }> = {
  'por-inventariar': { label: 'Por inventariar', tone: 'neutral', step: 0 },
  inventariada: { label: 'Inventariada', tone: 'info', step: 1 },
  respaldada: { label: 'Respaldada', tone: 'info', step: 2 },
  migrada: { label: 'Migrada', tone: 'info', step: 3 },
  'alias-activo': { label: 'Alias activo', tone: 'ok', step: 4 },
  'usuario-eliminado': { label: 'Usuario eliminado', tone: 'ok', step: 5 },
}

export const mxn = (n: number) => n.toLocaleString('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 })
export const fmtDate = (iso: string) =>
  new Date(iso + 'T12:00:00').toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' })
