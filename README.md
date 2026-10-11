# Farooj Almasi — Customer App · الفروج الماسي

Customer ordering app for **Farooj Almasi** (الفروج الماسي). Astro + React + Tailwind +
Framer Motion static single-page app. Customers browse the menu, pick a branch, and
place pickup/delivery orders that branch staff receive in the Farooj Almasi admin app.

This is a brand replica of the Broast Al Bahr ordering app, rebuilt for Farooj Almasi
as a **separate company with its own Firebase project** (no shared data).

## Setup

1. `npm install`
2. Fill in your Firebase project config in `src/lib/fb.ts` (see the `TODO(Farooj Almasi)`
   block — use the **Almasi** Firebase project, not Al-Bahr's).
3. `npm run dev` to run locally, `npm run build` to produce the static `dist/`.

## Status at launch

- Menu and branches start **empty** — add real items and branches from the admin app.
- Firebase config is a **placeholder** until the new Almasi project keys are pasted in.

## Theme

Green primary + gold accent, derived from the Al-Masi logo.
