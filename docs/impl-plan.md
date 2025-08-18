# Implementation Plan

This implementation plan breaks the work into small, meaningful iterations based on the specification in `docs/spec.md`. Each iteration lists tasks, technical details, and dependencies. The plan aligns with coding standards (TypeScript, semicolons, single quotes, function-based React components, arrow callbacks) and deploys via AWS Amplify.

## Iteration 1 — Scaffolding the Frontend (Vite + React + TS)
- Status: Completed (2025-08-18)
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
- Status: Completed (2025-08-18)
- Tasks
  - Install and configure Tailwind CSS.
  - Configure `tailwind.config.ts` content for `index.html` and `src/**/*.{ts,tsx}`.
  - Create `src/styles/index.css` and import Tailwind v4 via `@import "tailwindcss";`.
  - Import styles in `src/main.tsx`.
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
- Status: Completed (2025-08-18)
- Tasks
  - Established directory structure (`components`, `pages`).
  - Implemented `Header`, `Footer`, and `Home` pages with Tailwind styling.
  - Wired `App.tsx` to render `Header`, `Home`, `Footer`.
  - Added accessible skip link, mobile nav toggle, and landmarks/ids.
- Deliverables
  - Static homepage rendering the required sections.
- Dependencies: Iteration 2, Iteration 3.

## Iteration 5 — Accessibility and Responsive Pass
- Status: Completed (2025-08-18)
- Tasks
  - Ensured semantic landmarks and added skip link.
  - Added scroll-mt offsets for anchor navigation with sticky header.
  - Wrapped footer links in a nav with aria-label.
  - Verified responsive layout with Tailwind breakpoints.
- Deliverables
  - Lighthouse-ready structure with accessible navigation and responsive sections.
- Dependencies: Iteration 4.

## Iteration 6 — Testing Setup and Coverage
- Status: Completed (2025-08-18)
- Tasks
  - Install testing stack: `vitest`, `@testing-library/react`, `@testing-library/user-event`, `@testing-library/jest-dom`, `jsdom`.
  - Configure `vite.config.ts` test block with `environment: 'jsdom'`, `setupFiles: './tests/setup.ts'`, `css: true`, and coverage reporters.
  - Place tests outside `src` under `frontend/tests/**` with structure:
    - `tests/setup.ts`
    - `tests/components/Header.test.tsx`
    - `tests/pages/Home.test.tsx`
    - `tests/components/Footer.test.tsx`
  - Add scripts: `test`, `test:watch`, `coverage`. Update lint to include `tests`.
- Deliverables
  - Passing unit tests with core UI covered and coverage reporting configured.
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
