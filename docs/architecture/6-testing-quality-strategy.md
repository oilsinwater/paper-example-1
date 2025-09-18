# 6. Testing & Quality Strategy

## 6.1 Quality Gates

- **Static Analysis**: ESLint (AirBnB React rules) and TypeScript strict mode run on every commit; builds fail on any lint or type error.
- **Unit Coverage**: Each epic maintains targeted Jest suites (`npm run test:epic{n}`) that must pass locally and in CI before merge.
- **Component Contracts**: React Testing Library scenarios verify key UI flows (`components/epic*/__tests__/*`).
- **End-to-End Validation**: Cypress journeys (`npm run cy:test:epic{n}`) cover cross-component behavior for each epic plus an integration smoke.
- **Performance Watch**: Lighthouse and custom Vite performance scripts enforce <3s load and <200ms interaction budgets.

## 6.2 Automated Testing Matrix

| Layer       | Scope                                          | Tooling                           | Trigger                      |
| ----------- | ---------------------------------------------- | --------------------------------- | ---------------------------- |
| Unit        | Hooks, utilities, reducers                     | Jest + React Testing Library      | Local dev, CI epic matrix    |
| Component   | Epic-specific UI components                    | React Testing Library + MSW       | Pre-merge, nightly           |
| End-to-End  | Critical user flows (search, compare, monitor) | Cypress component + e2e modes     | CI matrix, release candidate |
| Integration | Cross-epic data interactions                   | Playwright light regression       | Nightly pipeline             |
| Performance | Filter/search benchmarks, Plotly renders       | Custom `npm run test:performance` | Weekly + before demos        |

## 6.3 Test Data & Fixtures

- Synthetic fixtures derived from the 10,608-record dataset are stored under `src/data/__fixtures__/` to keep deterministic runs.
- MSW (Mock Service Worker) scenarios mirror expected network behavior for future API-backed deployments while remaining client-only for the demo.
- Shared generators in `utils/testing.ts` create randomized but bounded interaction sequences to stress memoization and virtualization paths.

## 6.4 Accessibility & UX Validation

- Storybook accessibility add-ons (axe-core) run against interactive components each sprint.
- Keyboard navigation scripts ensure FilterPanel, SearchControls, and visualization tooltips meet WCAG 2.1 AA.
- Manual heuristic reviews accompany each epic during pre-demo sign-off, capturing UX refinements and documentation updates.

---
