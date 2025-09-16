# UI Prompt: STRUDEL Kit Interactive Adaptive Interfaces Demo

## Prompt goal

Generate a React + TypeScript microsite using Vite, TanStack Router (file-based), MUI, and Plotly that demonstrates STRUDEL patterns for Search, Explore, Compare, and Monitor with client-side data processing and accessible UI behavior.

## Stack and constraints

- Framework: React 18 + TypeScript; Build: Vite; Routing: TanStack Router with file-based routes; State: React Context; UI: MUI; Charts: Plotly.js.
    
- Must use STRUDEL file structure, MUI components, Plotly visualizations, client-side processing, and Context state, avoiding server-side processing, non-MUI libraries, animations, and Redux.
    
- Use MUI Data Grid for sortable tabular details, MUI Date Pickers for time filters, and Plotly Sankey/Bar/Heatmap/Calendar patterns as specified.
    

## Routes and pages

- Routes: / (Landing), /explore (Search), /explore/:id (Interaction Explorer), /compare (Role Comparison), /monitor (Temporal Monitor).
    
- Preserve state across navigation and support breadcrumbs on the detail page.
    

## File structure

- src/pages/index.tsx, src/pages/explore/index.tsx, src/pages/explore/$id.tsx, src/pages/compare/index.tsx, src/pages/monitor/index.tsx.
    
- Components: Layout.tsx, FilterPanel.tsx, DataCard.tsx, SequenceVisualizer.tsx, ExportButton.tsx.
    
- Utils: data-processing.ts, export.ts, plotly-configs.ts; Types: types/index.ts; Theme: theme.tsx; Data: data/mock-interactions.ts.
    

## Theme tokens

- Primary: #1976d2, Secondary: #dc004e, Background default: #fafafa, paper: #ffffff; h1 2.5rem 500, h2 2rem 500; Cards outlined, Buttons disableElevation.
    
- Maintain WCAG AA contrast and visible focus, with semantic headings and ARIA for interactive controls.
    

## Data model

- InteractionSequence: id, userId, role (novice|intermediate|expert), timestamp, duration, actions[], efficiency (0–1), plus taskType and completionRate for comparison views.
    
- Action: name, timestamp, duration, success, metadata.
    

## Global behaviors

- Client-side filtering, sorting, and pagination with useMemo; debounced search input; sample large datasets to ≤1000 plotted points for performance.
    
- Loading states: skeleton cards and chart placeholders; Error states: MUI Alert with Retry; Empty states: Reset and Clear actions.
    

## Wireframes

- Landing page presents hero, problem statement, pattern tiles, and tech stack with deep links.
    

Wireframe:

text

`+--------------------------------------------------------------+ | [Logo] STRUDEL Kit Demo              [Explore] [Compare] [Monitor] +--------------------------------------------------------------+ | H1: See How STRUDEL Kit Transforms Research Data             | | Subtitle: 10,608 interactions. Hidden patterns. One framework.| | [Start Exploring]  [View Documentation]                      | | +-----------+  +-----------+  +-----------+  +-----------+   | | | SEARCH   |  | EXPLORE   |  | COMPARE   |  | MONITOR   |   | | +-----------+  +-----------+  +-----------+  +-----------+   | | Built with: React • TS • Vite • MUI • Plotly                 | +--------------------------------------------------------------+`

- Explore list uses Drawer filters, search, sort, card grid, and pagination.
    

Wireframe:

text

`+--------------------------------------------------------------+ | [🔍 Search........................]   Sort: [Timestamp ▼]     | +---------------------+----------------------------------------+ | [≡ Filters]         |  Results (Card Grid)                   | | ☑ Novice ☑ Inter ☑ Expert                                    | | Date [Start–End]    |  ┌──────────────┐  ┌──────────────┐    | | Efficiency [0–1]    |  | Sequence #1  |  | Sequence #2  |    | | Duration [0–300s]   |  | role: expert |  | role: novice |    | | [Apply] [Reset]     |  | dur: 42s     |  | dur: 67s     |    | |                     |  | eff: 82%     |  | eff: 61%     |    | |                     |  | [View Detail]|  | [View Detail]|    | |                     |  └──────────────┘  └──────────────┘    | +---------------------+----------------------------------------+ |                 ◄ Prev   1  2  3   Next ►                    | +--------------------------------------------------------------+`

- Explore detail shows Plotly Sankey, a details panel, and an actions DataGrid with CSV export.
    

Wireframe:

text

`+--------------------------------------------------------------+ | Breadcrumbs: Explore > Sequence #seq_001                     | +-------------------------------+------------------------------+ | Sankey (Plotly)              | Details                       | | [Start]→[Search]→[Select]    | • ID: seq_001                 | |    ↓         ↓      ↓        | • Role: expert                | | [Filter]→[Refine]→[Execute]  | • Duration: 42s               | |                ↓             | • Efficiency: 82%             | |             [Complete]       | [Export CSV] [Copy Link]      | +-------------------------------+------------------------------+ | Actions (MUI DataGrid): Timestamp | Action | Duration | ...  | +--------------------------------------------------------------+`

- Compare dashboard includes grouped bar chart, transition heatmap, summary cards, and Sync Axes toggle.
    

Wireframe:

text

`+--------------------------------------------------------------+ | Compare Roles                              [Sync Charts ☐]   | | Role A [Novice ▼] vs Role B [Expert ▼]  [Select Tasks ▼]     | +-------------------------------+------------------------------+ | Grouped Bar: Efficiency       | Heatmap: Transition Patterns | +-------------------------------+------------------------------+ | Summary: Avg A 61% | Avg B 82% | Δ +21 pts | Time Δ -25s     | | [Download Comparison CSV]                                  | +--------------------------------------------------------------+`

- Monitor includes time series, calendar heatmap, and peak insights with date range and granularity.
    

Wireframe:

text

`+--------------------------------------------------------------+ | Temporal Monitor                                             | | Date: [Start ▼]–[End ▼]    Granularity: [Day ▼]              | +--------------------------------------------------------------+ | Time Series (interactions over time)                         | +--------------------------------------------------------------+ | Calendar Heatmap (daily patterns)                            | +--------------------------------------------------------------+ | Alerts: Peak Wed 14:00–15:00 (+38%)                          | +--------------------------------------------------------------+`

## Interactions and flows

- Explore flow: initial load with defaults, type to search (debounced), toggle roles and date range, adjust efficiency/duration sliders, change sort and pagination, then open detail and return with state preserved.
    
- Detail flow: compute Sankey from actions, hover tooltips, inspect details, review actions in DataGrid, export CSV, navigate via breadcrumbs.
    
- Compare flow: choose roles, render grouped bars and heatmap, toggle synced zoom/pan, review summary cards, download CSV.
    
- Monitor flow: set date range and granularity, review timeline and calendar, show automated peak alerts.
    

## Components and props

- FilterPanel: role checkboxes, date pickers, efficiency and duration sliders, Apply and Reset; emits onChange to Context.
    
- DataCard: shows role, duration, efficiency, timestamp, actions count; click navigates to /explore/:id.
    
- SequenceVisualizer: Plotly Sankey wrapper consuming arrays of labels, sources, targets, and values with role-based colors.
    
- ExportButton: exports actions or comparison summary as CSV; non-blocking with success/failure snackbars.
    
- DataGrid: sortable columns with pagination for actions table; responsive layout and keyboard navigation.
    

## Plotly configurations

- Sankey config uses node.label, link.source, link.target, and link.value arrays with horizontal orientation and role-driven colors.
    
- Grouped bar chart compares efficiency by task for two roles with shared x-axis and interactive legends.
    
- Heatmap visualizes transition frequencies in a square matrix of states with a continuous colorscale.
    
- Calendar heatmap shows daily counts with a Blues colorscale for temporal density.
    

## State and data processing

- Context holds filters, sortField and sortDirection, page and pageSize, selectedSequences, compareMode, and timeRange.
    
- useMemo pipeline filters data by search, roles, dates, efficiency, and duration, then sorts and paginates before rendering; sample to ≤1000 points for charts.
    

## Accessibility and performance

- ARIA labels on Drawer, filters, toggles, DataGrid, and chart containers, with keyboard focus management and semantic headings.
    
- Targets: <3s initial load, <1s chart render, <200ms filter response, and sampling/virtualization strategies for large datasets.
    

## Deliverables

- Implement the routes, components, and wires exactly as described, using MUI for layout and controls and Plotly for all visualizations.
    
- Provide a mock dataset of 10,608 InteractionSequence records and ensure deterministic filters and charts for the demo.
    
- Include loading, empty, and error states, CSV exports, and breadcrumb navigation with preserved state.
    

1. [https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/attachments/6379155/b1cd8284-9405-4682-af18-ef1252e0df9f/STRUDEL-example-2-PRD.md](https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/attachments/6379155/b1cd8284-9405-4682-af18-ef1252e0df9f/STRUDEL-example-2-PRD.md)