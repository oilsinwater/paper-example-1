# 7. Deployment & CI/CD Pipeline

## 7.1 Pipeline Overview

- **Primary Workflow**: `.github/workflows/epic-testing.yml` executes an epic matrix (`epic1`–`epic4`) running lint, unit, and Cypress suites in parallel.
- **Integration Stage**: After epic jobs succeed, a consolidated job executes `npm run test:integration` and `npm run test:performance` to validate cross-epic interactions and guard performance budgets.
- **Artifact Publishing**: Vite builds (`npm run build`) output to `dist/`; artifacts upload for preview deployments and smoke validation.

## 7.2 Environments & Release Flow

1. **Preview**: Every PR deploys to a temporary environment (Netlify/Vercel) using the build artifact for stakeholder review.
2. **Staging**: `main` merges auto-deploy to staging with feature flags enabling beta analytics.
3. **Production**: Tagging a release triggers promotion; smoke tests run against production URL before marking release complete.

## 7.3 Observability, Rollback & Compliance

- **Monitoring**: Vercel/Netlify analytics track Core Web Vitals, while LogRocket (optional) captures client errors for demo sessions.
- **Rollback**: Retain the last three build artifacts; revert via Git tag or platform rollbacks within minutes if performance budgets regress.
- **Compliance**: All assets remain client-side; no PII stored. Build pipeline enforces OSS license scanning via `license-checker` in CI.

---
