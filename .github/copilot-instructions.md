# Copilot instructions for this repository

## Quick commands
- Install dependencies: `npm i`
- Start dev server: `npm run dev` (Vite, listens on port 8080 by default)
- Build: `npm run build` (or `npm run build:dev` for a development build)
- Preview production build: `npm run preview`
- Lint: `npm run lint` (runs `eslint .`)
- Tests: No test script or test runner is configured in package.json. If tests are added with Vitest, run single tests with Vitest's filter: `npx vitest path/to/file -t "test name"` or `npx vitest -t "pattern"`.

## High-level architecture
- Tech stack: Vite + TypeScript + React + Tailwind CSS. UI primitives are based on shadcn-ui and Radix packages.
- Entry points:
  - `src/main.tsx` — mounts the app and providers
  - `src/App.tsx` — application-level providers (QueryClientProvider, Tooltip/Toaster, Sonner) and routing (react-router-dom). Routes: `/` → `src/pages/Index.tsx`, `*` → `NotFound`.
- Code organization:
  - `src/pages/` — top-level pages (Index, NotFound)
  - `src/components/` — composed UI sections (Hero, About, Projects, Skills, etc.)
  - `src/components/ui/` — low-level UI primitives and shadcn-style wrappers (many Radix/shadcn components live here)
  - `src/hooks/` and `src/lib/` — shared hooks and utilities
  - `public/` — static assets
- Vite config sets an alias `@` → `./src` (see `vite.config.ts`) and the same alias is reflected in `tsconfig.json` paths.
- Tailwind is configured with many design tokens and CSS variables (see `tailwind.config.ts`) — components rely on those variables for theming.
- Dev-time tooling: `lovable-tagger` used as a Vite plugin in development (`componentTagger`) — may add tags to components in dev mode.

## Key repository conventions
- Files are TypeScript React components (`.tsx`) by default.
- UI primitives live under `src/components/ui/` and are reused across sections. When adding UI behaviour, prefer adding a new primitive here or creating a wrapper in the same `ui` subfolder.
- Use the `@/` import alias for imports rooted at `src/` (e.g., `import Foo from '@/components/Foo'`). Ensure VSCode/IDE picks up `tsconfig.json` paths for IntelliSense.
- Styling: Tailwind utility classes + design tokens (CSS variables). Prefer tokens for color/spacing that map to `tailwind.config.ts` variables.
- Routing: `react-router-dom` is used for client routing; top-level routes live in `App.tsx` and map pages from `src/pages/`.
- Linting: ESLint is invoked via `npm run lint`. Rules are configured in the repository (look at `eslint.config.js`).

## Existing AI assistant assets
- The repo already contains `.github/prompts/` and `.github/skills/` entries (e.g., `ui-ux-pro-max`). Copilot sessions should avoid overwriting those directories and may reuse their prompts/skills.

## Notes for future Copilot sessions
- Prefer reading `src/App.tsx`, `src/main.tsx`, `vite.config.ts`, `tailwind.config.ts`, and `package.json` first to understand app wiring and scripts.
- There are no tests configured; if tests are added, also add a `test` script in `package.json` so CI and Copilot know how to run them.

---

If you'd like, I can also add CI/automation snippets (e.g., GitHub Actions) or configure an MCP server for end-to-end testing. Let me know which you'd prefer.