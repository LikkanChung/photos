# Implementation Plan

This implementation plan breaks the work into small, meaningful iterations based on the specification in `docs/spec.md`. Each iteration lists tasks, technical details, and dependencies. The plan aligns with coding standards (TypeScript, semicolons, single quotes, function-based React components, arrow callbacks) and deploys via AWS Amplify.

## Iteration 1 — Scaffolding the Frontend (Vite + React + TS)
- Tasks
  - Initialize a Vite React TypeScript app in `frontend/` without overwriting existing content; back up any existing `frontend` assets first.
    - Command: `npm create vite@latest frontend -- --template react-ts`
  - Add `.nvmrc` with Node 20 (optional) and update `.gitignore`.
  - Verify `npm run dev` works locally.
- Deliverables
  - Vite app builds and runs locally.
  - No orphaned files (backup/migrate existing assets as needed).
- Dependencies: none.

## Iteration 2 — Tailwind CSS Setup
- Tasks
  - Install and configure Tailwind CSS: `npm i -D tailwindcss postcss autoprefixer` and `npx tailwindcss init -p`.
  - Configure `tailwind.config.ts` content for `index.html` and `src/**/*.{ts,tsx}`.
  - Create `src/styles/index.css` with Tailwind directives and import in `main.tsx`.
  - Confirm Tailwind classes render in dev.
- Deliverables
  - Tailwind working with a minimal theme.
- Dependencies: Iteration 1.

## Iteration 3 — Linting and Formatting
- Tasks
  - Install ESLint/Prettier stack: `eslint`, `@typescript-eslint/*`, `eslint-plugin-react`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`, `eslint-config-prettier`, `prettier`.
  - Add `.eslintrc.cjs` enforcing:
    - `semi: ['error', 'always']`
    - `quotes: ['error', 'single', { avoidEscape: true }]`
    - `react/function-component-definition: ['error', { namedComponents: 'function-declaration', unnamedComponents: 'arrow-function' }]`
  - Add `.prettierrc` with `{ "semi": true, "singleQuote": true }`.
  - Add scripts: `lint`, `format`, `type-check` (use `tsc --noEmit`).
- Deliverables
  - Lint and format run clean on the codebase.
- Dependencies: Iteration 1.

## Iteration 4 — Base App Structure and Pages
- Tasks
  - Establish directory structure under `src/`: `assets/`, `components/`, `pages/`, `hooks/`, `utils/`, `styles/`.
  - Implement base components:
    - `components/Header.tsx` (site title, nav with anchors, mobile toggle).
    - `components/Footer.tsx` (copyright, social placeholders, contact).
    - `pages/Home.tsx` with Hero, About, Placeholder sections.
  - Wire `App.tsx` to render `Header`, `Home`, `Footer` and import global styles.
  - Port any existing branding assets into `src/assets/` (e.g., `logo.svg`).
- Deliverables
  - Static homepage rendering the required sections.
- Dependencies: Iteration 2, Iteration 3.

## Iteration 5 — Accessibility and Responsive Pass
- Tasks
  - Ensure semantic landmarks: `<header>`, `<nav>`, `<main>`, `<footer>`.
  - Verify focus styles and keyboard access for mobile nav toggle.
  - Adjust Tailwind breakpoints for responsive layout (`sm`, `md`, `lg`).
  - Run a Lighthouse check and address contrast/aria issues.
- Deliverables
  - Lighthouse targets close to: Perf 90+, A11y 100, Best Practices 100, SEO 90+.
- Dependencies: Iteration 4.

## Iteration 6 — Testing Setup and Coverage
- Tasks
  - Install testing stack: `vitest`, `@testing-library/react`, `@testing-library/user-event`, `@testing-library/jest-dom`, `jsdom`.
  - Configure `vite.config.ts` test block with `environment: 'jsdom'`.
  - Add tests:
    - Header renders site name and toggles mobile menu.
    - Home renders hero, about, and placeholder sections.
    - Footer renders copyright and links.
  - Add scripts: `test`, `test:watch`.
- Deliverables
  - Passing unit tests with core UI covered.
- Dependencies: Iteration 4.

## Iteration 7 — GitHub Actions CI
- Tasks
  - Add `.github/workflows/frontend-ci.yml`:
    - Triggers: PRs and pushes to `main` (or default branch).
    - Steps: checkout, setup-node (Node 20), `npm ci`, `npm run lint`, `npm run type-check`, `npm test`, `npm run build`.
    - Upload build artifact on PR.
  - Protect branch with required checks (optional, repo settings).
- Deliverables
  - CI enforces quality gates and build integrity.
- Dependencies: Iteration 3, Iteration 6.

## Iteration 8 — AWS Amplify Hosting via Terraform
- Tasks
  - In `terraform/`, define or update resources:
    - `aws_amplify_app` connected to this GitHub repo.
    - `aws_amplify_branch` for `main` (or chosen branch).
    - Build settings (amplify `buildSpec` or `amplify.yml`) to run: `npm ci`, `npm run lint`, `npm run type-check`, `npm test`, `npm run build`, then publish `dist/`.
  - Store GitHub OAuth token in SSM Parameter Store and reference in Terraform `data`.
  - Optional: `aws_amplify_domain_association` for custom domain.
  - Verify automatic builds and deployments occur on push to `main`.
- Deliverables
  - Amplify app URL serving the built frontend; optional custom domain.
- Dependencies: Iteration 7.

## Iteration 9 — Documentation and Developer Experience
- Tasks
  - Update `frontend/README.md` with local dev, scripts, testing, and CI/CD notes.
  - Update `docs/spec.md` if scope or architecture evolves and cross-link this `impl-plan.md`.
  - Add basic contribution guidelines (coding standards recap) and troubleshooting.
- Deliverables
  - Clear docs enabling onboarding and maintenance.
- Dependencies: All prior iterations.

## Risk Management and Notes
- Avoid orphaning any existing `frontend` files by backing up and incrementally migrating assets into the Vite structure.
- Ensure consistent Node version via `.nvmrc` and the CI runner matrix.
- Keep bundle small; avoid heavy dependencies to meet performance goals.

## Success Criteria (End-to-End)
- Vite React TS app under `frontend/` builds and runs.
- Tailwind styles apply and pass visual checks.
- Homepage is responsive, accessible, and implements required sections.
- ESLint/Prettier enforce standards; tests pass locally and in CI.
- Amplify automatically builds and deploys on push to `main`.
- Documentation is up to date in `frontend/README.md` and `docs/impl-plan.md`.
