# GitHub Copilot Instructions for React Modern Gantt

## Project intent
- This repository is a **TypeScript React library** (`react-modern-gantt`), not an app-first codebase.
- Keep changes focused on reusable library behavior in `src/`.
- The `example/` folder is a demo playground and should only be updated when a feature needs visual demonstration.

## Stack and tooling
- Language: TypeScript + React (`.ts` / `.tsx`).
- Build: Rollup (`npm run build`).
- Tests: Jest + Testing Library (`npm test`).
- Lint: ESLint (`npm run lint`).
- Package manager: **npm** (`package-lock.json` is authoritative).

## Architecture and file layout
- Public entrypoint: `src/index.ts`.
  - Maintain backward compatibility for exports and default export behavior.
  - Do not remove or rename exported types/components/utilities without a strong reason.
- Core rendering split:
  - `src/components/core/` for `GanttChart`
  - `src/components/task/` for task list/rows/items
  - `src/components/timeline/` for timeline headers/markers
  - `src/components/ui/` for UI helpers (tooltips, selectors, export controls)
- Shared logic:
  - `src/services/` for positioning/collision/export/business logic
  - `src/utils/` for date/find/position helpers
  - `src/types/` for public and internal TypeScript contracts

## Change style expectations
- Prefer **small, reviewable, targeted** edits.
- Avoid broad refactors unless explicitly requested.
- Reuse existing utilities/services before adding new abstractions.
- Keep comments and code text in English.

## API and compatibility rules
- Treat `Task`, `TaskGroup`, and component prop interfaces as part of the public API.
- Additive changes are preferred (optional props/fields) over breaking changes.
- Preserve existing behavior for generic consumers when adding integration-specific enhancements.

## React + TypeScript conventions in this repo
- Follow existing functional component patterns and prop typing style.
- Keep type safety strict; avoid unnecessary `any`.
- Do not add `try/catch` around imports.
- Keep render logic readable; extract small helper functions only when it improves clarity.

## UI/Rendering specifics to respect
- Left task list and timeline must stay visually aligned; be careful with row height and spacing changes.
- Preserve overflow/ellipsis behavior for compact labels.
- Tooltip behavior supports portal rendering and inline rendering (`renderTooltipInPortal`); do not break either mode.
- Sticky headers, infinite scroll, and drag interactions are core features; avoid side effects in unrelated areas.
- Dark mode styles exist in `src/styles/gantt.css`; update both default and dark selectors when adjusting visual hierarchy.

## Localization and text
- Localization is supported through `locale` and `localeText` props.
- Avoid hardcoding user-facing text when a localized prop already exists.
- For date-sensitive tests, avoid assumptions tied to the current real date.

## Testing expectations
- For logic or rendering behavior changes, update/add Jest tests in `__tests__/`.
- For bug fixes, prefer a regression-style test that fails before the fix.
- Keep tests deterministic (avoid current-date flakiness by setting explicit dates/currentDate where needed).

## CI stability
- CI should use existing npm scripts and avoid introducing new toolchains.
- Keep workflows minimal and reliable: install dependencies, run tests, optionally lint/build when appropriate.
