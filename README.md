# OP&A · Estatus de proyectos

Reporte digital para la dirección: fase, avance, pendientes, stoppers y riesgos de cada proyecto.

## Uso

```sh
pnpm install
pnpm dev        # desarrollo
pnpm build      # genera dist/ (sitio estático)
pnpm preview    # sirve dist/ localmente
```

## Cómo actualizar un proyecto

Cada proyecto es un archivo tipado en `src/data/`:

- `portal-facturacion.ts`
- `migracion-correos.ts`

Edita solo ese archivo. El avance se calcula solo:

- Fase con `steps: { done, total }` → avance = done/total.
- Fase sin pasos: `status: 'listo'` = 100 %, o `progress` manual (0-100) si está en curso.
- Avance global = promedio de fases ponderado por pasos.

Al terminar: cambia `updated`, `overall`, `currentPhaseId`, `nextStep`, `headline`, agrega una línea a `log` y corre `pnpm build`.

Para un proyecto nuevo: crea su archivo con el tipo `Project` (`src/types.ts`) y agrégalo en `src/data/index.ts`.
