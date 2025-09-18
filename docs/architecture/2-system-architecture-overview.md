# 2. System Architecture Overview

## 2.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    STRUDEL Kit Demo                         │
├─────────────────────────────────────────────────────────────┤
│  Presentation Layer (React + MUI Components)               │
│  ┌─────────────┬─────────────┬─────────────┬─────────────┐  │
│  │   Epic 1    │   Epic 2    │   Epic 3    │   Epic 4    │  │
│  │ Data Search │ Pattern Viz │Role Compare │ Temporal    │  │
│  └─────────────┴─────────────┴─────────────┴─────────────┘  │
├─────────────────────────────────────────────────────────────┤
│  State Management (React Context API)                      │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │  Cross-Epic State + Individual Epic State              │ │
│  └─────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────┤
│  Data Processing Layer (Client-side TypeScript)            │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │  Filtering • Sorting • Analytics • Export Utilities    │ │
│  └─────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────┤
│  Data Layer (Static JSON - 10,608 interaction records)     │
└─────────────────────────────────────────────────────────────┘
```

## 2.2 Technology Stack Rationale

| Technology          | Version  | Rationale                                                         |
| ------------------- | -------- | ----------------------------------------------------------------- |
| **React**           | 18       | STRUDEL Kit standard; excellent scientific UI ecosystem           |
| **TypeScript**      | 5.2+     | Type safety critical for data processing and component interfaces |
| **Vite**            | 6.2+     | Fast development builds; STRUDEL Kit default                      |
| **TanStack Router** | 1.109+   | File-based routing matches STRUDEL patterns; type-safe            |
| **Material UI**     | 5.15+    | Scientific UI component library; consistent design system         |
| **Plotly.js**       | 2.30+    | Industry standard for scientific visualizations                   |
| **React Context**   | Built-in | Sufficient for demo complexity; matches STRUDEL examples          |

**Architectural Decision**: Client-side only processing eliminates server dependencies while demonstrating STRUDEL Kit's ability to handle substantial datasets in browser environments.

## 2.3 Epic Dependency Flow

```
Epic 1 (Data Discovery) ──┬─→ Epic 2 (Pattern Exploration)
                          ├─→ Epic 3 (Role Comparison)
                          └─→ Epic 4 (Temporal Analysis)
                                      ↑
Epic 2 (Patterns) ────────────────────┼─→ Epic 3 (Role Comparison)
                                      └─→ Epic 4 (Temporal Analysis)
```

**Critical Path**: Epic 1 must complete before others can begin. Epic 2 and 3 form the core value demonstration. Epic 4 enhances with temporal insights.

---
