# Copilot instructions for this repository

> NOTE: This file was created at the repository root because the environment could not create a .github directory.

## Build, test, and lint
- Development server: npm run dev  (Vite; dev server binds to port 8080)
- Production build: npm run build
- Build (dev mode): npm run build:dev
- Preview production build: npm run preview
- Lint: npm run lint  (runs `eslint .`)
- Tests: none present in package.json. No test runner configured; add Vitest/Jest and a script like `test` to enable tests. To run a single test once configured, use the test runner CLI (e.g., `npx vitest run src/my.test.ts --run`) or `npm run test -- src/my.test.ts` depending on script setup.

## High-level architecture
- Tooling: Vite + React + TypeScript. Entry: src/main.tsx -> App.tsx.
- App composition: App wraps the app with TanStack Query (QueryClientProvider) and global UI providers (Toaster/Sonner, TooltipProvider); BrowserRouter provides routing.
- Pages & components: src/pages/* contains top-level pages (Index, NotFound). The Index page composes many UI sections implemented under src/components (HeroSection, ProjectsSection, etc.).
- Styling: Tailwind CSS (tailwind.config.ts) + shadcn-ui; theme tokens are driven by CSS variables referenced in tailwind.config.ts.
- Aliases: "@" is aliased to ./src via vite.config.ts — imports use `@/...` throughout.
- Dev plugins: `lovable-tagger` runs in development mode (vite plugin) if mode === "development".

## Key conventions
- Path alias: always import internal modules using "@/...".
- Global providers: Toaster and Sonner are mounted once in App — avoid re-mounting them in children.
- Routes: Add specific routes above the catch-all ("*") route in App.tsx.
- Tailwind: Keep component files under the content globs (pages, components, src) so utility classes are preserved.
- CSS variables: Color and theme values use CSS variables; prefer tokens over literal color values.
- Lint: eslint config uses typescript-eslint and recommends running `npm run lint` and fixing via editor or `eslint --fix`.

## Local dev notes
- Dev server host/port: configured in vite.config.ts (host: "::", port: 8080). When developing on a LAN use the host binding.
- Entry points: src/main.tsx and src/App.tsx are the places to look for global app wiring.

## Docs scanned
- README.md (project setup and Lovable integration).

## AI assistant configs
- No additional AI assistant configuration files were found (CLAUDE.md, .cursorrules, AGENTS.md, .windsurfrules, CONVENTIONS.md, AIDER_CONVENTIONS.md, .clinerules).

---
If you'd like this moved into .github/copilot-instructions.md, enable PowerShell or create the .github directory and ask me to retry; alternatively I can update the file content or add CI/test instructions — tell me what to add.