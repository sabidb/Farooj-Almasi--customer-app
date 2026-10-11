# Farooj Almasi customer app — Agent instructions

الفروج الماسي · Farooj Almasi customer ordering app. This is a rebrand/replica of
the Broast Al Bahr customer app (`sabidb/broast-albahr`) for a **separate company**
with its **own, separate Firebase project**. The two companies must never share a
database. If you ever see `broast-al-bahr` project ids or Al-Bahr Firebase keys in
this repo, that is a bug — fix it.

## Architecture

Astro + React + Tailwind + Framer Motion.

- Entry: `src/pages/index.astro` mounts `src/components/App.tsx` with `client:load`.
- All screens live in `src/components/`. Shared data + Firebase in `src/lib/`.
- Global styling: `src/styles/global.css` + `tailwind.config.mjs`.
- Firebase config: `src/lib/fb.ts` (see the TODO block — fill in the Almasi project keys).

Build: `npm install && npm run build` → static output in `dist/`.

## Theme (from the logo)

Green primary + gold accent, warm off-white surfaces — derived from the Al-Masi
logo (green badge, gold rim, red banner, corn). Tailwind `brand.*` token KEYS are
kept from the original app so components need no churn; ROLES are remapped:
`brand.red` = primary leaf-green, `brand.gold` = gold, `brand.green` = success.
See the comment block in `tailwind.config.mjs`.

## App version

`export const APP_VERSION` in `src/lib/utils.ts` is the single source of truth for
the visible customer-app version. Rendered as a tiny `v<x.y.z>` stamp on the app.

### Auto-bump policy — do this on every commit that changes any file under `src/`

Before committing any code change under `src/`, bump `APP_VERSION` in place (semver):

- **patch** (`x.y.Z`) — every non-trivial fix, small tweak, copy change, wiring update. Default.
- **minor** (`x.Y.0`) — a new customer-facing feature (new screen, new interaction, new tab).
- **major** (`X.0.0`) — breaking change to the Firestore schema or a redesigned flow.

Never skip the bump. Never batch — one commit that changes `src/` = one version bump.

Docs-only commits (README, CLAUDE.md, comments-only) do not bump the version.

Current baseline established: `1.0.0`.

## Branching

Work on `main` unless the user tells you otherwise. This is a fresh repo; pushing
`main` deploys to production once the user wires up hosting (Vercel auto-detects Astro).
