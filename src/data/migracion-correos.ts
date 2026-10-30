import type { Project } from '../types'

export const correos: Project = {
  id: 'migracion-correos',
  name: 'Migración de correos',
  client: 'Google Workspace · Despacho OP&A',
  summary:
    'Unificar los dos Workspaces del despacho (opasesores.com y nomiplus.com.mx) para reducir licencias, conservar las direcciones como alias y no perder accesos a IMSS e Infonavit.',
  owner: 'Axel Gutiérrez Hernández',
  updated: '2026-10-29',
  overall: { status: 'planeacion', label: 'Planeación completa' },
  currentPhaseId: 'f1',
  currentStage: 'Etapa A · Consolidación dentro de nomiplus (8 → 3 cuentas)',
  nextStep: 'Iniciar la Fase 1: inventario y auditoría (solo lectura, sin impacto para usuarios).',
  headline: { label: 'pasos completados', done: 0, total: 34 },
  phases: [
    { id: 'f0', name: 'Seguridad y preparación de la consola', description: 'Segundo super admin y preparación de la consola.', status: 'pendiente', steps: { done: 0, total: 6 }, duration: '1 día', impact: 'Ninguno' },
    { id: 'f1', name: 'Inventario y auditoría', description: 'Cierra los 4 pendientes: inventario, OAuth y agrupación de cuentas.', status: 'en-curso', steps: { done: 0, total: 6 }, duration: '3–5 días hábiles', impact: 'Ninguno (solo lectura)' },
    { id: 'f2', name: 'Respaldo y preparación de cuentas base', description: 'Respaldo Takeout fuera de Google y preparación de las cuentas base.', status: 'pendiente', steps: { done: 0, total: 4 }, duration: '2–3 días', impact: 'Ninguno' },
    { id: 'f3', name: 'Migración de Gmail y Drive', description: 'Una cuenta a la vez; el origen sigue activo.', status: 'pendiente', steps: { done: 0, total: 6 }, duration: '1–2 días por cuenta', impact: 'Ninguno' },
    { id: 'f4', name: 'Baja del usuario y conversión a alias', description: 'Por cuenta y fuera de horario, con catch-all como mitigación.', status: 'pendiente', steps: { done: 0, total: 7 }, duration: 'Por cuenta', impact: 'Bajo, mitigado' },
    { id: 'f5', name: 'Estabilización y cierre', description: '15 días de observación y liberación de licencias en Squarespace.', status: 'pendiente', steps: { done: 0, total: 5 }, duration: '15 días', impact: 'Ninguno' },
  ],
  metrics: [
    { label: 'Cuentas hoy (nomiplus)', value: '8', note: 'Meta Etapa A: 3' },
    { label: 'Usuarios totales', value: '40', note: '32 opasesores + 8 nomiplus' },
    { label: 'Costo mensual actual', value: '$13,440', note: 'MXN, ambos Workspaces' },
    { label: 'Ahorro anual Etapa A', value: '$20,160', note: 'Sin confirmar en Squarespace' },
  ],
  pending: [
    { id: 1, title: 'Qué correos se unifican y cuáles quedan como base', detail: 'Propuesta: ejecutivo001, administracion y laboral.', status: 'por-confirmar' },
    { id: 2, title: 'Si alguna cuenta usó «Iniciar sesión con Google»', detail: 'Auditar tokens OAuth y apps conectadas por usuario.', status: 'por-investigar' },
    { id: 3, title: 'Cantidad final de cuentas utilizables', detail: '3 en Etapa A; la meta de la Etapa B depende de este dato.', status: 'por-confirmar' },
    { id: 4, title: 'Diagrama de uso de correos', detail: 'Propuesta lista; faltan los nombres reales de las personas.', status: 'por-validar' },
  ],
  stoppers: [
    { title: 'Agrupación de cuentas sin aprobar', detail: 'Administración debe confirmar qué correos se unifican antes de respaldar y migrar.', blocks: 'Fase 2' },
    { title: 'Auditoría OAuth pendiente', detail: 'Un alias no puede iniciar sesión con Google; hay que cambiar el correo de acceso de las apps antes de eliminar usuarios.', blocks: 'Fase 4' },
  ],
  risks: [
    { title: 'Alias no puede iniciar sesión con Google', severity: 'alta', mitigation: 'Auditar OAuth en Fase 1 y cambiar el correo de acceso de cada app antes de eliminar.' },
    { title: 'Infonavit usa el correo como parte del usuario', severity: 'alta', mitigation: 'Guardar credenciales en gestor y probar la recuperación de contraseña tras crear el alias.' },
    { title: 'Aviso del Buzón IMSS no visto (plazos legales)', severity: 'media', mitigation: 'Etiqueta propia IMSS/* y revisión diaria durante 15 días.' },
    { title: 'Hueco entre eliminar el usuario y crear el alias', severity: 'media', mitigation: 'Catch-all hacia la cuenta base; usuario restaurable durante 20 días.' },
    { title: 'Certificados e.firma o IMSS en el Drive de una cuenta a eliminar', severity: 'media', mitigation: 'Moverlos a una unidad compartida restringida antes de la baja.' },
    { title: 'Suspender no libera licencia ni permite crear el alias', severity: 'media', mitigation: 'La baja real es eliminar el usuario.' },
    { title: 'Business Standard no incluye Vault', severity: 'media', mitigation: 'Respaldo con Takeout fuera de Google.' },
    { title: 'El ahorro depende de reducir licencias en Squarespace', severity: 'media', mitigation: 'Confirmar proceso y ciclo de facturación en la Fase 0.' },
  ],
  milestones: [
    { title: 'Plan de migración y propuesta ejecutiva', done: true },
    { title: 'Guía de implementación (runbook Etapa A)', done: true },
    { title: 'Segundo super admin asignado (administracion@)', done: false },
    { title: 'Respaldo Takeout de las 8 cuentas fuera de Google', done: false },
    { title: 'Inventario completo y agrupación aprobada', done: false },
    { title: 'Piloto migrado sin incidencias', done: false },
    { title: 'Última cuenta convertida a alias + 15 días sin hallazgos', done: false },
    { title: 'Licencias liberadas en Squarespace', done: false },
  ],
  accounts: [
    { email: 'ejecutivo001@nomiplus.com.mx', role: 'Ejecutivos y atención a clientes · super admin', aliases: 'ejecutivo02@, ejecutivo03@, ejecutivo04@', status: 'por-inventariar' },
    { email: 'administracion@nomiplus.com.mx', role: 'Administración del despacho · segundo super admin', aliases: 'Ninguno en Etapa A', status: 'por-inventariar' },
    { email: 'laboral@nomiplus.com.mx', role: 'Laboral, RRHH, IMSS e Infonavit · buzón crítico', aliases: 'recursoshumanos@, recursoshumanos02@', status: 'por-inventariar' },
  ],
  savings: {
    title: 'Ahorro por escenario',
    note: 'Referencia: $336 MXN por usuario al mes (Business Standard), sin impuestos. Confirmar con la factura de Squarespace.',
    rows: [
      { scenario: 'Hoy (solo nomiplus)', accounts: 8, monthly: 2688, annual: 32256, saving: null },
      { scenario: 'Etapa A recomendada', accounts: 3, monthly: 1008, annual: 12096, saving: 20160, highlight: true },
      { scenario: 'Etapa A mínima', accounts: 2, monthly: 672, annual: 8064, saving: 24192 },
    ],
  },
  log: [
    { date: '2026-10-29', text: 'Planificación completa. Se corrige el plan: un dominio no puede estar verificado en dos Workspaces, por lo que se consolida primero a 3 cuentas (Etapa A).' },
    { date: '2026-10', text: 'Propuesta ejecutiva de costos y plan de migración de 4 fases elaborados.' },
  ],
}
