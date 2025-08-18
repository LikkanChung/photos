# Changelog

All notable changes to this project will be documented in this file.

## 2025-08-18
- Iteration 1 Completed: Scaffolded Vite React TypeScript app in `frontend/` and installed dependencies.
- Added `.nvmrc` (Node 20).

## 2025-08-18 (cont.)
- Iteration 4 Completed: Added Header, Home, Footer with Tailwind, accessibility improvements, and wired into App.
- Iteration 5 Completed: Accessibility and responsive pass (skip link, scroll offset, footer nav landmark).
- Iteration 6 Completed: Added Vitest + Testing Library with jsdom. Tests placed under `frontend/tests/**` outside `src`. Configured `vite.config.ts` test block, added setup file, and scripts (`test`, `test:watch`, `coverage`). All tests pass.
- Iteration 7 Completed: Moved all visible content to `frontend/src/content/site.json`. Refactored components and tests to use metadata. Enabled JSON imports.
- Iteration 8 Completed: Added FAQs page and React Router integration (`/faq`). Updated `Header` to support route and hash links. Added tests for `Faq` page and updated existing tests. Fixed a brittle Footer test query.
- Enhancement: Split FAQ content into `frontend/src/content/faq.json` and updated imports accordingly. All tests still pass.
