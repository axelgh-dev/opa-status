import { useEffect, useState } from 'react'
import { projects } from './data'
import { ProjectCard } from './components/ProjectCard'
import { ProjectPanel } from './components/ProjectPanel'
import { fmtDate } from './lib/labels'

const useHash = () => {
  const [hash, setHash] = useState(() => location.hash.replace(/^#\/?/, ''))
  useEffect(() => {
    const on = () => { setHash(location.hash.replace(/^#\/?/, '')); window.scrollTo({ top: 0 }) }
    window.addEventListener('hashchange', on)
    return () => window.removeEventListener('hashchange', on)
  }, [])
  return hash
}

export default function App() {
  const hash = useHash()
  const project = projects.find((p) => p.id === hash)
  const latest = projects.map((p) => p.updated).sort().at(-1)!

  useEffect(() => {
    document.title = project ? `${project.name} · OP&A` : 'OP&A · Estatus de proyectos'
  }, [project])

  return (
    <div className="min-h-dvh">
      <nav className="sticky top-0 z-20 border-b border-line bg-surface/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <a href="#/" className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#1f3a5f] font-serif text-lg font-semibold text-[#e5c48a]">OP</span>
            <span className="leading-tight">
              <span className="block font-serif text-lg font-semibold">OP&A Asesores</span>
              <span className="block text-xs text-muted">Estatus de proyectos</span>
            </span>
          </a>
          <div className="flex items-center gap-1 overflow-x-auto text-sm">
            {projects.map((p) => (
              <a key={p.id} href={`#/${p.id}`} aria-current={p.id === hash ? 'page' : undefined}
                className={`whitespace-nowrap rounded-full px-3 py-1.5 font-medium ${p.id === hash ? 'bg-brand text-white dark:text-bg' : 'text-muted hover:text-ink'}`}>
                {p.id === 'portal-facturacion' ? 'Portal' : 'Correos'}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-10">
        {project ? (
          <>
            <a href="#/" className="mb-4 inline-block text-sm font-medium text-brand hover:underline">← Todos los proyectos</a>
            <ProjectPanel project={project} />
          </>
        ) : (
          <>
            <div className="mb-8 max-w-2xl">
              <p className="eyebrow">Reporte para la dirección</p>
              <h1 className="mt-1 text-4xl font-semibold leading-tight sm:text-5xl">Estatus de proyectos</h1>
              <p className="mt-3 text-muted">Fase, avance, pendientes y bloqueos de cada proyecto en curso. Última actualización: {fmtDate(latest)}.</p>
            </div>
            <div className="grid gap-5 lg:grid-cols-2">
              {projects.map((p) => <ProjectCard key={p.id} project={p} />)}
            </div>
          </>
        )}
      </main>
      <footer className="mx-auto max-w-6xl px-4 pb-10 text-xs text-muted sm:px-6">Documento interno · OP&A Asesores</footer>
    </div>
  )
}
