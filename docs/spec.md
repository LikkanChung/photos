# Photos Frontend Specification

## Overview
Build the public-facing frontend for a photo portfolio site. This is a static, responsive React application styled with Tailwind CSS. It will serve as the homepage, providing basic information about the website with a modern, clean design. The repository is a monorepo with separate folders for each service.

- Monorepo services:
  - `frontend/` – public site (this spec)
  - `admin-frontend/` – admin interface (out of scope for now)
  - `terraform/` – IaC for AWS resources
  - `docs/` – documentation
- CI/CD: GitHub Actions
- IaC: Terraform on AWS
- Package manager: npm
- Conventions: semicolons; single quotes; function-based React components; arrow functions for callbacks
- Device support: desktop and mobile

## Goals
- Deliver a static homepage with header, main content, and footer.
- Ensure responsive design and accessibility basics.
- Establish baseline tooling, quality gates, and deployment pipeline.
- Align with repo coding standards and monorepo conventions.

## Non-goals
- Photo rendering or galleries (static content only for now).
- Admin interface implementation.
- Authentication, backend APIs, or database integrations.

## Tech Stack
- React (with Vite)
- Tailwind CSS
- TypeScript for the React app (recommended for consistency and future growth)
- ESLint and Prettier
- Testing: Vitest + React Testing Library
- Node.js v18+ or v20+ (LTS)

## Target Directory Structure (frontend)
- frontend/
  - public/            # static assets (favicon, manifest)
  - src/
    - assets/          # images, icons, fonts
    - components/      # reusable UI components
    - pages/           # route-level components (Home only for now)
    - hooks/           # custom hooks
    - utils/           # helpers
    - styles/          # Tailwind entry, global styles
    - App.tsx
    - main.tsx
  - index.html
  - tsconfig.json
  - tailwind.config.ts
  - postcss.config.js
  - vite.config.ts
  - package.json
  - README.md

## UI Requirements
- Header
  - Site name/logo (text logo is fine to start).
  - Navigation with anchors to sections on the page (e.g., About, Contact).
  - Sticky at top on scroll.
- Main
  - Hero section with headline, subheadline, and a primary call-to-action button.
  - About section describing the portfolio/site purpose.
  - Highlight section (e.g., “Featured work coming soon” placeholder).
- Footer
  - Copyright text.
  - Social links (placeholders).
  - Contact email or link to contact section.
- Design
  - Modern, clean, minimal.
  - Light theme by default; prepare Tailwind config to support dark mode class in future.
- Accessibility
  - Semantic HTML (header, main, footer, nav).
  - Sufficient color contrast.
  - Focus outlines preserved.
  - Landmarks and aria-labels where appropriate.

## Styling and Theming
- Tailwind CSS utility-first.
- Custom Tailwind theme tokens (colors, spacing) defined conservatively to start.
- CSS reset via Tailwind preflight.
- Global styles entry at `src/styles/index.css` to include Tailwind directives:
  - `@tailwind base;`
  - `@tailwind components;`
  - `@tailwind utilities;`

## Behavior and State
- Static content; no external data fetching.
- Minimal client-side state (e.g., mobile nav toggle).

## Accessibility and Performance
- Lighthouse target scores: Performance 90+, Accessibility 100, Best Practices 100, SEO 90+.
- Use responsive images and lazy loading if/when images are added later.
- Avoid large dependencies; split future routes using code-splitting when needed.

## Quality Gates
- Lint: ESLint with rules to enforce:
  - semicolons required
  - single quotes
  - react/function-component-definition as function declarations
  - arrow callbacks in props
- Format: Prettier aligned to ESLint (semi: true, singleQuote: true).
- Tests: Vitest + React Testing Library for components and pages.
- Types: TypeScript strict mode enabled.

## Tooling Choices
- Vite + React + TypeScript template for faster dev and build.
- Tailwind CSS via PostCSS.
- Vitest for fast unit tests; jsdom environment for component tests.
- Husky + lint-staged (optional) for pre-commit hooks.

## CI/CD
- GitHub Actions workflow:
  - On PR: npm ci, lint, type-check, test, build, upload artifact.
  - On push to main: same checks; deployment handled by AWS Amplify connected to the repository/branch.
- AWS Amplify:
  - Managed via Terraform (aws_amplify_app and aws_amplify_branch for the main branch).
  - Build settings (amplify.yml or buildSpec in Terraform) to install deps, run lint/type-check/tests, and build the Vite app.
  - Uses GitHub connection (token sourced from SSM Parameter Store via Terraform data source).
  - Optional custom domain via aws_amplify_domain_association.

## Deployment Integration
- Description: Connect build to AWS Amplify for hosting and deployment.
- Steps:
  - Define/confirm Amplify resources in terraform/:
    - aws_amplify_app connected to this GitHub repo.
    - aws_amplify_branch for main (or chosen branch).
    - Build settings to run: npm ci, npm run lint, npm run build, npm test (Vitest).
  - Store GitHub OAuth token in SSM Parameter Store; reference it in Terraform.
  - On push to main, Amplify auto-builds and deploys the app.
  - Optional: Add a GitHub Actions step to trigger a redeploy via AWS CLI: aws amplify start-job (not required when auto-build is enabled).
- Dependencies: CI Setup.

## Environment and Config
- No secrets required for static content.
- Future-ready `.env` structure with `VITE_`-prefixed variables if needed.
- Build output: `dist/`.

## Tasks and Subtasks

1) Project Scaffolding
- Description: Initialize a new React + TypeScript + Vite project under `frontend/`.
- Steps:
  - npm create vite@latest frontend -- --template react-ts
  - Initialize repo local config and `.nvmrc` (Node 20) if used.
- Dependencies: none.

2) Tailwind Setup
- Description: Add Tailwind to the Vite project.
- Steps:
  - npm i -D tailwindcss postcss autoprefixer
  - npx tailwindcss init -p
  - Configure `tailwind.config.ts` content paths for `index.html` and `src/**/*.{ts,tsx}`.
  - Create `src/styles/index.css` with Tailwind directives and import in `main.tsx`.
- Dependencies: Project Scaffolding.

3) Linting and Formatting
- Description: Configure ESLint/Prettier with required conventions.
- Steps:
  - npm i -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-react-refresh eslint-config-prettier prettier
  - Add `.eslintrc.cjs` rules:
    - semi: ['error', 'always']
    - quotes: ['error', 'single', { avoidEscape: true }]
    - react/function-component-definition: ['error', { namedComponents: 'function-declaration', unnamedComponents: 'arrow-function' }]
  - Add `.prettierrc` with { "semi": true, "singleQuote": true }
  - Add lint and format scripts.
- Dependencies: Project Scaffolding.

4) Base App Structure
- Description: Create directories and base components.
- Steps:
  - Create `src/components/Header.tsx`, `src/components/Footer.tsx`, `src/pages/Home.tsx`.
  - Wire `App.tsx` to render `<Header />`, `<Home />`, `<Footer />`.
  - Add mobile nav toggle behavior in Header.
- Dependencies: Tailwind Setup.

5) Content Implementation
- Description: Add static copy and placeholders.
- Steps:
  - Hero with H1, subtext, primary CTA button.
  - About section with brief description.
  - Placeholder for featured work.
  - Footer with links and contact info.
- Dependencies: Base App Structure.

6) Accessibility and Responsive Pass
- Description: Ensure semantic HTML, alt text, keyboard nav, responsive breakpoints (`sm`, `md`, `lg`).
- Steps:
  - Validate landmarks and headings.
  - Test keyboard-only navigation.
  - Ensure nav toggle is keyboard accessible and labelled.
- Dependencies: Content Implementation.

7) Testing
- Description: Unit tests for structural components and interactions.
- Steps:
  - Install Vitest, React Testing Library, jsdom: npm i -D vitest @testing-library/react @testing-library/user-event @testing-library/jest-dom jsdom
  - Configure `vite.config.ts` test block with environment: 'jsdom'.
  - Add tests:
    - Header renders site name and toggles mobile menu.
    - Home renders hero/about/placeholder.
    - Footer renders copyright and links.
- Dependencies: Base App Structure, Content Implementation.

8) CI Setup
- Description: Add GitHub Actions workflow.
- Steps:
  - Node 20 matrix: checkout, setup-node, npm ci, lint, type-check, test, build, upload artifact.
  - PR status checks required.
- Dependencies: Testing, Linting.

9) Deployment Integration
- Description: Connect build to AWS Amplify for hosting and deployment.
- Steps:
  - Define/confirm Amplify resources in terraform/:
    - aws_amplify_app connected to this GitHub repo.
    - aws_amplify_branch for main (or chosen branch).
    - Build settings to run: npm ci, npm run lint, npm run build, npm test (Vitest).
  - Store GitHub OAuth token in SSM Parameter Store; reference it in Terraform.
  - On push to main, Amplify auto-builds and deploys the app.
  - Optional: Add a GitHub Actions step to trigger a redeploy via AWS CLI: aws amplify start-job (not required when auto-build is enabled).
- Dependencies: CI Setup.

10) Documentation
- Description: Update `frontend/README.md` and `docs/spec.md` with usage, scripts, and deploy notes.
- Steps:
  - Include local dev instructions, scripts, lint/test guidance, and CI/CD description.
- Dependencies: All previous tasks.

## Scripts (frontend/package.json)
- "dev": "vite"
- "build": "vite build"
- "preview": "vite preview --port 5173"
- "lint": "eslint \"src/**/*.{ts,tsx}\""
- "format": "prettier --write ."
- "test": "vitest run"
- "test:watch": "vitest"

## Acceptance Criteria
- A Vite-powered React + TypeScript app exists under frontend/ and builds successfully.
- Tailwind is configured; styles load and apply.
- Homepage renders header, main (hero + about + placeholder), and footer.
- Responsive layout works on mobile and desktop.
- ESLint and Prettier enforce semicolons and single quotes; function components are used.
- Unit tests pass in CI; build artifact is produced.
- On main, CI checks pass and AWS Amplify automatically builds and deploys the app.

## Future Enhancements (Not in scope)
- Photo gallery grid with lazy-loading and responsive sources.
- Theming toggle (light/dark).
- Internationalization.
- Analytics and SEO enhancements.
- Admin interface integration and authenticated routes.