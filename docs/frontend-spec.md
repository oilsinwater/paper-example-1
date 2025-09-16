# Front-End Specification: STRUDEL Kit Interactive Adaptive Interfaces Demo

**Version**: 2.2  
**Date**: September 2025  
**Document Type**: Technical Specification  
**Status**: Updated for Epic Structure

---

## 1. Executive Summary

This specification defines the complete front-end architecture for a demonstration microsite showcasing STRUDEL Kit's capabilities for building scientific data exploration interfaces. The application transforms 10,608 human-machine interaction research records into an interactive web platform, organized around four strategic epics that demonstrate STRUDEL design patterns through React, TypeScript, Material UI, and Plotly.js.

## 1.1 Epic-Driven Development Approach

The implementation follows a structured epic progression that ensures foundational capabilities support advanced analytical features:

- **Epic 1**: Data Discovery Foundation (P0) - Core search and filtering
    
- **Epic 2**: Interaction Pattern Exploration (P0) - Sequence visualization
    
- **Epic 3**: Comparative Role Analysis (P0) - Side-by-side behavioral comparison
    
- **Epic 4**: Temporal Pattern Intelligence (P1) - Time-based insights
    

## 1.2 Key Objectives

- **Primary**: Demonstrate STRUDEL Kit as the ideal framework for scientific UI development
    
- **Secondary**: Show how interaction data reveals patterns enabling 40% efficiency improvements
    
- **Technical**: Achieve <3s load times, <200ms filter response, >70% component reuse
    

---

## 2. Technical Architecture

## 2.1 Core Technology Stack

- **Framework**: React 18 + TypeScript
    
- **Build Tool**: Vite
    
- **Routing**: TanStack Router (file-based)
    
- **UI Library**: Material UI (MUI) v5
    
- **Visualizations**: Plotly.js
    
- **State Management**: React Context API
    
- **Processing**: Client-side only (no server dependencies)
    

## 2.2 Epic-Based File Structure

text

`src/ ├── pages/ │   ├── index.tsx                    # Landing page with epic tiles │   ├── explore/ │   │   ├── index.tsx               # Epic 1: Data repository search │   │   └── $id.tsx                 # Epic 2: Individual sequence view │   ├── compare/ │   │   └── index.tsx               # Epic 3: Role comparison dashboard │   └── monitor/ │       └── index.tsx               # Epic 4: Temporal analysis ├── components/ │   ├── Layout.tsx                  # App shell with navigation │   ├── epic1/                      # Epic 1 components │   │   ├── FilterPanel.tsx         # Search and filter sidebar │   │   ├── DataCard.tsx            # Interaction summary cards │   │   └── SearchControls.tsx      # Search bar and sort controls │   ├── epic2/                      # Epic 2 components │   │   ├── SequenceVisualizer.tsx  # Plotly Sankey wrapper │   │   ├── DetailPanel.tsx         # Sequence metadata display │   │   └── ActionsTable.tsx        # MUI DataGrid for actions │   ├── epic3/                      # Epic 3 components │   │   ├── ComparisonDashboard.tsx # Split-screen comparison │   │   ├── EfficiencyCharts.tsx    # Grouped bar charts │   │   └── PatternHeatmap.tsx      # Transition frequency heatmap │   └── epic4/                      # Epic 4 components │       ├── TimelineChart.tsx       # Time series visualization │       ├── CalendarHeatmap.tsx     # Daily pattern heatmap │       └── PeakAnalysis.tsx        # Automated insights ├── hooks/ │   ├── useAppContext.tsx           # Context consumer hook │   ├── useDataProcessing.tsx       # Epic 1: Filter/sort/paginate │   ├── useSequenceAnalysis.tsx     # Epic 2: Pattern extraction │   ├── useRoleComparison.tsx       # Epic 3: Comparative metrics │   └── useTemporalAnalysis.tsx     # Epic 4: Time-based insights ├── utils/ │   ├── data-processing.ts          # Core data operations │   ├── export.ts                   # CSV export utilities │   ├── plotly-configs.ts           # Visualization configurations │   └── epic-analytics.ts           # Cross-epic analysis functions ├── types/ │   └── index.ts                    # TypeScript interfaces ├── theme.tsx                       # MUI theme configuration └── data/     └── mock-interactions.ts        # Demo dataset (10,608 records)`

## 2.3 Epic Data Dependencies

typescript

`interface InteractionSequence {   id: string;   userId: string;   role: 'novice' | 'intermediate' | 'expert';   timestamp: Date;   duration: number;      // seconds   actions: Action[];   efficiency: number;    // 0-1 decimal   taskType: string;      // Epic 3: comparison categories   completionRate: number; // Epic 3: success metrics } interface Action {   name: string;   timestamp: Date;   duration: number;   success: boolean;   metadata?: Record<string, any>; } // Epic-specific state interfaces interface Epic1State {   searchTerm: string;   filters: FilterState;   sortField: 'timestamp' | 'duration' | 'efficiency';   sortDirection: 'asc' | 'desc';   page: number;   pageSize: number; } interface Epic2State {   selectedSequence: InteractionSequence | null;   sankeyConfig: SankeyConfig;   detailView: 'overview' | 'actions' | 'patterns'; } interface Epic3State {   roleA: 'novice' | 'intermediate' | 'expert';   roleB: 'novice' | 'intermediate' | 'expert';   syncCharts: boolean;   comparisonMetrics: ComparisonResult; } interface Epic4State {   timeRange: { start: Date; end: Date; };   granularity: 'day' | 'week' | 'month';   temporalPatterns: TemporalAnalysis; }`

---

## 3. Epic-Based Feature Specifications

## 3.1 Epic 1: Data Discovery Foundation (P0)

**Epic Goal**: Enable users to search, filter, and discover relevant interaction data from the research dataset.

## Components & User Flow

text

`Search & Filter Interface → Results Management → Data Foundation      ↓                           ↓                    ↓ FilterPanel.tsx            SearchControls.tsx    data-processing.ts DataCard.tsx              Pagination             export.ts`

## Wireframe: Search Interface (`/explore`)

text

`+--------------------------------------------------------------+ | [🔍 Search interactions..............................]  [Sort: Timestamp ▼] +---------------------+----------------------------------------+ | [≡ Filters] (Epic 1)|  Results (548 sequences)              | |                     |                                        | |  Role:              |  ┌──────────────┐  ┌──────────────┐    | |  ☑ Novice (234)     |  │ Sequence #1  │  │ Sequence #2  │    | |  ☑ Intermediate(189)|  │ ID: seq_001  │  │ ID: seq_002  │    | |  ☑ Expert (125)     |  │ User: u_481  │  │ User: u_629  │    | |                     |  │ Role: expert │  │ Role: novice │    | |  Date Range:        |  │ Duration: 42s│  │ Duration: 67s│    | |  [2025-01-01] to    |  │ Efficiency:  │  │ Efficiency:  │    | |  [2025-08-31]       |  │ ████████ 82% │  │ ████░░░░ 61% │    | |                     |  │              │  │              │    | |  Efficiency: 0━━━━100|  │ 8 actions    │  │ 12 actions   │    | |  Duration: 0s━━━300s |  │ [View Detail]│  │ [View Detail]│    | |                     |  └──────────────┘  └──────────────┘    | |  [Apply] [Reset]    |                                        | +---------------------+----------------------------------------+ |                 ◄ Prev   1  2  3  4  5   Next ►  (12 pages)  | +--------------------------------------------------------------+`

## Epic 1 Definition of Done

-  Users can search and filter complete dataset in <200ms
    
-  All interaction sequences discoverable through multiple criteria
    
-  Export functionality works for filtered results
    
-  Search interface follows STRUDEL Kit patterns
    
-  Local testability via CLI for data processing functions
    

## 3.2 Epic 2: Interaction Pattern Exploration (P0)

**Epic Goal**: Allow users to visualize and explore individual interaction sequences to understand user behavior patterns.

**Dependencies**: Epic 1 (requires data discovery foundation)

## Components & User Flow

text

`Sequence Visualization → Detail Analysis Panel → Pattern Recognition         ↓                        ↓                      ↓ SequenceVisualizer.tsx    DetailPanel.tsx      ActionsTable.tsx SankeyConfig              MetadataDisplay       PatternHighlights`

## Wireframe: Sequence Explorer (`/explore/:id`)

text

`+--------------------------------------------------------------+ | Breadcrumbs: Explore > Sequence #seq_001 (Epic 2)           | +-------------------------------+------------------------------+ | Sankey (Plotly)              | Details                       | |                               |                              | | ┌──────────────────────────┐  | • ID: seq_001                | | │ [Start] ──→ [Search] ──→ │  | • User: u_481                | | │    ↓           ↓         │  | • Role: expert               | | │ [Filter] ──→ [Select]    │  | • Started: 2025-08-12 14:32  | | │    ↓           ↓         │  | • Duration: 42s              | | │ [Refine] ──→ [Execute]   │  | • Efficiency: 82%            | | │              ↓           │  | • Task: data_analysis        | | │          [Complete]      │  | • Pattern Score: 0.91        | | └──────────────────────────┘  | [📋 Export CSV] [🔗 Copy Link] | +-------------------------------+------------------------------+ | Action Timeline (MUI DataGrid) - Epic 2 Enhancement          | | ┌─────────────┬──────────────┬─────────┬─────────┬─────────┐ | | │ Timestamp   │ Action       │ Duration│ Success │ Pattern │ | | ├─────────────┼──────────────┼─────────┼─────────┼─────────┤ | | │ 00:00:00.0  │ Start Task   │ 0.1s    │ ✓       │ Expert  │ | | │ 00:00:02.1  │ Search Data  │ 3.2s    │ ✓       │ Common  │ | | │ 00:00:05.3  │ Apply Filter │ 1.8s    │ ✓       │ Expert  │ | | │ 00:00:12.1  │ Select Items │ 2.4s    │ ✓       │ Common  │ | | │ 00:00:18.7  │ Refine Query │ 4.1s    │ ✓       │ Expert  │ | | │ ... (showing pattern analysis) ...                        │ | | └─────────────┴──────────────┴─────────┴─────────┴─────────┘ | +--------------------------------------------------------------+`

## Epic 2 Definition of Done

-  Users can visualize any interaction sequence as intuitive flow diagram
    
-  Detail panels provide complete action-by-action breakdowns
    
-  Visualization renders in <1 second for sequences up to 100 actions
    
-  Pattern highlighting identifies optimization opportunities
    
-  Navigation between sequences is seamless
    

## 3.3 Epic 3: Comparative Role Analysis (P0)

**Epic Goal**: Enable side-by-side comparison of interaction patterns between user roles to reveal behavioral differences and optimization opportunities.

**Dependencies**: Epic 1 (data foundation), Epic 2 (visualization components)

## Components & User Flow

text

`Split-Screen Interface → Efficiency Metrics → Adaptive Insights         ↓                       ↓                   ↓ ComparisonDashboard.tsx  EfficiencyCharts.tsx  InsightCards.tsx RoleSelector             PatternHeatmap        OptimizationTips`

## Wireframe: Role Comparison (`/compare`)

text

`+--------------------------------------------------------------+ |  Compare User Roles (Epic 3)                [⚙️ Sync Charts ☐]| +--------------------------------------------------------------+ | Role A: [Novice    ▼] vs Role B: [Expert    ▼]   [Tasks: All ▼]| +-------------------------------+------------------------------+ | Efficiency by Task (Plotly)  | Transition Heatmap (Plotly) | |                               |                              | | Efficiency %                  | To State →                   | |  100 ┌─┐    ┌──┐              | ↑ From    ████ ██ ░░ ░░ ░░   | |   80 │N│    │E │              | │ State   ██ ████ ██ ░░ ░░   | |   60 │o│ ┌─┐│x │              | │         ░░ ██ ████ ██ ░░   | |   40 │v│ │I││p │              | │         ░░ ░░ ██ ████ ██   | |   20 │i│ │n││e │              | │         ░░ ░░ ░░ ██ ████   | |    0 └─┘ └─┘└─t┘              | └─────────────────────────→  | |      Task1 Task2 Task3        |                              | +-------------------------------+------------------------------+ | Adaptive Interface Insights (Epic 3 Value):                  | | ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐  | | │ Current Novice  │ │ Expert Baseline │ │ Potential Gain  │  | | │ 61% efficiency  │ │ 82% efficiency  │ │ +34% improvement│  | | │ 67s avg time    │ │ 42s avg time    │ │ -37% time saved │  | | │ 23% error rate  │ │ 8% error rate   │ │ -65% fewer errors│  | | └─────────────────┘ └─────────────────┘ └─────────────────┘  | | 🎯 Recommendations: Auto-filter suggestions, Context hints    | | [📊 Download Comparison CSV]                                  | +--------------------------------------------------------------+`

## Epic 3 Definition of Done

-  Users can compare patterns between any two user roles simultaneously
    
-  Efficiency metrics clearly demonstrate 40% improvement potential
    
-  Visual comparisons highlight specific interface optimization areas
    
-  Statistical insights are accurate and meaningful
    
-  Recommendations provide actionable adaptive design guidance
    

## 3.4 Epic 4: Temporal Pattern Intelligence (P1)

**Epic Goal**: Reveal time-based patterns in user interactions to understand when and why behavioral changes occur.

**Dependencies**: Epic 1 (data foundation), Epic 2 (visualization patterns)

## Components & User Flow

text

`Activity Timeline → Pattern Discovery → Temporal Correlation        ↓                  ↓                    ↓ TimelineChart.tsx   CalendarHeatmap.tsx   PeakAnalysis.tsx DateRangeFilter     AnomalyDetection      AdaptationTiming`

## Wireframe: Temporal Monitor (`/monitor`)

text

`+--------------------------------------------------------------+ |  Activity Monitor (Epic 4)                                  | +--------------------------------------------------------------+ | Date Range: [2025-01-01 ▼] to [2025-08-31 ▼]  Granularity: [Day ▼] +--------------------------------------------------------------+ | Interaction Count Over Time (Plotly)                        | |   Count                                                      | |    50 ┌─────────────────────────────────────────────────────┐| |       │     ▄▄                    ▄▄▄                       │| |    30 │   ▄▄  ▄▄▄               ▄▄   ▄▄▄                    │| |       │ ▄▄      ▄▄▄         ▄▄▄▄       ▄▄▄▄                │| |    10 │▄            ▄▄▄▄▄▄▄▄            ▄▄▄▄▄▄             │| |     0 └─────────────────────────────────────────────────────┘| |       Jan    Feb    Mar    Apr    May    Jun    Jul    Aug   | +--------------------------------------------------------------+ | Daily Activity Heatmap (Plotly) - Weekly Patterns           | |       Su  Mo  Tu  We  Th  Fr  Sa                            | | Week1 ░░  ▒▒  ▓▓  ██  ▓▓  ▒▒  ░░                            | | Week2 ░░  ▒▒  ▓▓  ██  ██  ▒▒  ░░                            | | Week3 ▒▒  ▓▓  ██  ██  ██  ▓▓  ▒▒                            | | ...   (calendar pattern continues)                           | +--------------------------------------------------------------+ | 🔍 Temporal Intelligence Insights (Epic 4):                 | | • Peak efficiency: Wednesday 2-3 PM (+38% above average)    | | • Optimal adaptation timing: Tuesday-Thursday mornings      | | • Weekly pattern: Mid-week peaks, weekend lows              | | • Seasonal trend: Summer 15% increase in complex tasks      | | 💡 Adaptive Timing: Deploy interface changes Tues 9-11 AM   | +--------------------------------------------------------------+`

## Epic 4 Definition of Done

-  Users can identify peak usage periods and efficiency patterns
    
-  Temporal visualizations reveal actionable timing insights
    
-  Calendar views make large time ranges comprehensible
    
-  Correlations between time and performance clearly demonstrated
    
-  Analysis supports evidence-based decisions about interface timing
    

---

## 4. Cross-Epic State Management

## 4.1 Context Architecture

typescript

`interface AppState {   // Epic 1: Data Discovery   epic1: {     searchTerm: string;     filters: FilterState;     sortField: string;     sortDirection: 'asc' | 'desc';     page: number;     pageSize: number;     totalResults: number;   };      // Epic 2: Pattern Exploration    epic2: {     selectedSequence: InteractionSequence | null;     sankeyConfig: SankeyConfig;     patternInsights: PatternAnalysis;     navigationHistory: string[];   };      // Epic 3: Role Comparison   epic3: {     roleA: UserRole;     roleB: UserRole;     syncCharts: boolean;     comparisonResults: ComparisonMetrics;     adaptiveInsights: AdaptationRecommendations;   };      // Epic 4: Temporal Analysis   epic4: {     timeRange: { start: Date; end: Date; };     granularity: 'day' | 'week' | 'month';     temporalPatterns: TemporalInsights;     peakAnalysis: PeakActivityData;   };      // Cross-epic shared state   global: {     selectedSequences: string[];     exportQueue: ExportRequest[];     performanceMetrics: PerformanceData;   }; }`

## 4.2 Epic Dependencies in Data Flow

typescript

`// Epic 1 → Epic 2 data flow const useSequenceExploration = () => {   const { epic1 } = useAppContext();      return useMemo(() => {     // Epic 2 builds on Epic 1's filtered results     const availableSequences = epic1.filteredResults;     return processSequenceForVisualization(availableSequences);   }, [epic1.filteredResults]); }; // Epic 1 & 2 → Epic 3 data flow  const useRoleComparison = () => {   const { epic1, epic2 } = useAppContext();      return useMemo(() => {     // Epic 3 uses Epic 1's filtering + Epic 2's pattern analysis     const filteredData = epic1.processedData;     const patternInsights = epic2.patternAnalysis;     return generateComparisonMetrics(filteredData, patternInsights);   }, [epic1.processedData, epic2.patternAnalysis]); };`

---

## 5. Implementation Timeline (Epic-Based)

## 5.1 Epic-Driven Development Schedule

|Week|Epic Focus|Deliverables|Success Criteria|
|---|---|---|---|
|**Week 1**|Epic 1 Foundation|- Vite + React + TS setup  <br>- FilterPanel + SearchControls  <br>- DataCard grid + Pagination  <br>- Basic data processing|- Search/filter <200ms response  <br>- All 10,608 records discoverable  <br>- Export functionality working  <br>- STRUDEL patterns implemented|
|**Week 2**|Epic 2 + Epic 3 Core|- SequenceVisualizer (Sankey)  <br>- DetailPanel + ActionsTable  <br>- ComparisonDashboard  <br>- EfficiencyCharts + PatternHeatmap|- Sankey renders <1s  <br>- Pattern recognition active  <br>- Role comparison functional  <br>- 40% improvement demonstrated|
|**Week 3**|Epic 4 + Integration|- TimelineChart + CalendarHeatmap  <br>- PeakAnalysis + insights  <br>- Cross-epic state management  <br>- Performance optimizations|- Temporal patterns revealed  <br>- All epics integrated  <br>- Performance targets met  <br>- Adaptive timing insights|
|**Week 4**|Polish + Deploy|- Landing page with epic tiles  <br>- Documentation + tooltips  <br>- Error handling + loading states  <br>- Production deployment|- Educational elements complete  <br>- Accessibility compliant  <br>- Demo ready for showcase  <br>- Video walkthrough created|

## 5.2 Epic Dependency Management

text

`graph TD     E1[Epic 1: Data Discovery] --> E2[Epic 2: Pattern Exploration]     E1 --> E3[Epic 3: Role Comparison]     E1 --> E4[Epic 4: Temporal Intelligence]     E2 --> E3     E2 --> E4          E1 -.-> L[Landing Page]     E2 -.-> L     E3 -.-> L     E4 -.-> L`

**Critical Path**: Epic 1 must complete before Epic 2 and 3 can begin. Epic 4 can develop in parallel after Epic 2 components are available.

---

## 6. Landing Page Epic Showcase

## 6.1 Epic-Based Navigation Wireframe

text

`+--------------------------------------------------------------+ | [Logo] STRUDEL Kit Demo              [Explore] [Compare] [Monitor] +--------------------------------------------------------------+ | H1: See How STRUDEL Kit Transforms Research Data             | | Subtitle: 10,608 interactions. 4 proven patterns. One framework.| |                                                              | | [Start with Epic 1: Discovery]   [View Documentation]        | |                                                              | | ┌─────────────────────────────────────────────────────────┐ | | │  Four Strategic Epics for Scientific UI Development     │ | | └─────────────────────────────────────────────────────────┘ | |                                                              | | ┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐ | │ 📊 EPIC 1 (P0)   │ │ 🔍 EPIC 2 (P0)   │ │ ⚖️  EPIC 3 (P0)  │ | │ Data Discovery   │ │ Pattern Explorer │ │ Role Comparison  │ | │ Foundation       │ │ Sequence Flows   │ │ Adaptive Design  │ | │                  │ │                  │ │                  │ | │ Search & Filter  │ │ Sankey Diagrams  │ │ +40% Efficiency  │ | │ Export Results   │ │ Pattern Analysis │ │ Design Insights  │ | │ [Try Epic 1]     │ │ [Try Epic 2]     │ │ [Try Epic 3]     │ | └──────────────────┘ └──────────────────┘ └──────────────────┘ | ┌──────────────────┐                                         │ | │ 📈 EPIC 4 (P1)   │   Epic Dependencies:                    │ | │ Temporal Intel   │   • Epic 1 → Epics 2,3,4               │ | │ Time Patterns    │   • Epic 2 → Epic 3,4                  │ | │                  │   • All → Landing showcase              │ | │ Peak Analysis    │                                         │ | │ Timing Insights  │                                         │ | │ [Try Epic 4]     │                                         │ | └──────────────────┘                                         │ |                                                              | | Built with: React • TypeScript • Vite • MUI • Plotly        | | Architecture: Epic-driven development with STRUDEL patterns  | | [Start Building →]                                           | +--------------------------------------------------------------+`

## 6.2 Epic Status Indicators

typescript

`interface EpicStatus {   epic1: {     completed: boolean;     stories: { completed: number; total: number; };     demo: boolean;   };   epic2: {     completed: boolean;     dependencies: ['epic1'];     demo: boolean;   };   epic3: {     completed: boolean;     dependencies: ['epic1', 'epic2'];     demo: boolean;   };   epic4: {     completed: boolean;     dependencies: ['epic1', 'epic2'];     demo: boolean;   }; }`

---

## 7. Component Architecture by Epic

## 7.1 Epic 1 Components

typescript

`// components/epic1/FilterPanel.tsx interface FilterPanelProps {   filters: FilterState;   onFiltersChange: (filters: FilterState) => void;   onReset: () => void; } // components/epic1/DataCard.tsx  interface DataCardProps {   sequence: InteractionSequence;   onClick: (id: string) => void;   showPatternHints?: boolean; // Epic 2 integration } // components/epic1/SearchControls.tsx interface SearchControlsProps {   searchTerm: string;   onSearchChange: (term: string) => void;   sortField: string;   sortDirection: 'asc' | 'desc';   onSortChange: (field: string, direction: 'asc' | 'desc') => void; }`

## 7.2 Epic 2 Components

typescript

`// components/epic2/SequenceVisualizer.tsx interface SequenceVisualizerProps {   sequence: InteractionSequence;   highlightPatterns?: boolean;   onNodeClick?: (nodeId: string) => void; } // components/epic2/DetailPanel.tsx interface DetailPanelProps {   sequence: InteractionSequence;   patternAnalysis: PatternAnalysis;   showComparison?: boolean; // Epic 3 integration } // components/epic2/ActionsTable.tsx interface ActionsTableProps {   actions: Action[];   patternHighlights: PatternHighlight[];   onExport: () => void; }`

## 7.3 Epic 3 Components

typescript

`// components/epic3/ComparisonDashboard.tsx interface ComparisonDashboardProps {   roleA: UserRole;   roleB: UserRole;   syncCharts: boolean;   onSyncToggle: (sync: boolean) => void; } // components/epic3/EfficiencyCharts.tsx interface EfficiencyChartsProps {   comparisonData: ComparisonMetrics;   syncedInteraction: boolean;   onInteraction?: (event: PlotlyInteractionEvent) => void; }`

## 7.4 Epic 4 Components

typescript

`// components/epic4/TimelineChart.tsx interface TimelineChartProps {   timeRange: { start: Date; end: Date; };   granularity: 'day' | 'week' | 'month';   data: TemporalData; } // components/epic4/PeakAnalysis.tsx interface PeakAnalysisProps {   insights: TemporalInsights;   showAdaptationTiming: boolean; }`

---

This updated front-end specification reflects the epic-driven development approach from the revised PRD while maintaining all technical implementation details, wireframes, and architectural guidance necessary for successful development of the STRUDEL Kit demonstration microsite.

1. [https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/attachments/6379155/a408e212-4627-405a-af4b-6452c8a89014/STRUDEL-example-2-PRD.md](https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/attachments/6379155/a408e212-4627-405a-af4b-6452c8a89014/STRUDEL-example-2-PRD.md)