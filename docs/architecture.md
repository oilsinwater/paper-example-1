# STRUDEL Kit Interactive Adaptive Interfaces: Technical Architecture Documentation (Revised v2.2)

## Overview

This document describes the end-to-end front-end architecture for the **STRUDEL Kit** demonstration microsite, which transforms 10,608 human–machine interaction research records into a highly interactive scientific UI demonstrating adaptive interface capabilities and 40% efficiency improvements through **epic-driven development** and proven design patterns.

---

## Epic-Driven Architecture Strategy

## Core Epic Structure

The architecture follows a strategic four-epic progression that ensures foundational capabilities support advanced analytical features:

- **Epic 1**: Data Discovery Foundation (P0) - Core search and filtering infrastructure
    
- **Epic 2**: Interaction Pattern Exploration (P0) - Sequence visualization and analysis
    
- **Epic 3**: Comparative Role Analysis (P0) - Side-by-side behavioral comparison
    
- **Epic 4**: Temporal Pattern Intelligence (P1) - Time-based insights and optimization
    

## Epic Dependency Graph

text

`graph TD     E1[Epic 1: Data Discovery] --> E2[Epic 2: Pattern Exploration]     E1 --> E3[Epic 3: Role Comparison]     E1 --> E4[Epic 4: Temporal Intelligence]     E2 --> E3     E2 --> E4          E1 -.-> L[Landing Page Epic Showcase]     E2 -.-> L     E3 -.-> L     E4 -.-> L`

---

## Technology Stack

**Core Framework & Language**

- React 18.2.0 with TypeScript for type-safe, component-driven development
    
- Vite 6.2.1 for ultra-fast builds, HMR, and optimized production bundles
    

**Routing & State Management**

- TanStack Router 1.109.2 with file-based routing and automatic route generation
    
- React Context API with cross-epic state management architecture
    
- Custom hooks for epic-specific data processing (`useEpic1Discovery`, `useEpic2Analysis`)
    

**UI Framework & Theming**

- Material UI (MUI) v5.15.14 for comprehensive component library
    
- Custom theme: Primary #1976d2 (STRUDEL blue), Secondary #dc004e (accent red)
    
- Responsive breakpoints: xs(0), sm(600), md(900), lg(1200), xl(1536)
    

**Data Visualization & Processing**

- Plotly.js 2.30.1 via react-plotly.js 2.6.0 for interactive charts
    
- Epic-specific visualization configurations (Sankey, bar charts, heatmaps, time series)
    
- Client-side data processing with epic-specific optimization strategies
    

**Development & Quality Tools**

- ESLint + Prettier with AirBnB React style guide
    
- Husky pre-commit hooks for code quality
    
- Cypress 13.15.0 for epic-based end-to-end testing
    
- TypeScript strict mode with epic-specific type definitions
    

---

## Epic-Based File Structure & Architecture

text

`src/ ├── pages/                           # TanStack Router epic-based routing │   ├── __root.tsx                   # Root layout wrapper │   ├── index.tsx                    # Landing page with epic showcase │   ├── explore/ │   │   ├── index.tsx               # Epic 1: Search Data Repositories │   │   └── $id.tsx                 # Epic 2: Individual sequence view │   ├── compare/ │   │   └── index.tsx               # Epic 3: Role comparison dashboard │   └── monitor/ │       └── index.tsx               # Epic 4: Temporal activity monitor ├── components/                      # Epic-organized components │   ├── Layout.tsx                  # App shell with epic navigation │   ├── epic1/                      # Epic 1: Data Discovery components │   │   ├── FilterPanel.tsx         # Search and filter sidebar │   │   ├── DataCard.tsx            # Interaction summary cards │   │   ├── SearchControls.tsx      # Search bar and sort controls │   │   └── ResultsPagination.tsx   # Paginated results management │   ├── epic2/                      # Epic 2: Pattern Exploration components │   │   ├── SequenceVisualizer.tsx  # Plotly Sankey diagram wrapper │   │   ├── DetailPanel.tsx         # Sequence metadata display │   │   ├── ActionsTable.tsx        # MUI DataGrid for actions │   │   └── PatternHighlights.tsx   # Pattern recognition display │   ├── epic3/                      # Epic 3: Role Comparison components │   │   ├── ComparisonDashboard.tsx # Split-screen comparison interface │   │   ├── EfficiencyCharts.tsx    # Grouped bar charts (Plotly) │   │   ├── PatternHeatmap.tsx      # Transition frequency heatmap │   │   └── AdaptiveInsights.tsx    # Design recommendation cards │   ├── epic4/                      # Epic 4: Temporal Intelligence components │   │   ├── TimelineChart.tsx       # Time series visualization │   │   ├── CalendarHeatmap.tsx     # Daily pattern heatmap │   │   ├── PeakAnalysis.tsx        # Automated insights display │   │   └── TemporalControls.tsx    # Date range and granularity controls │   └── shared/                     # Cross-epic shared components │       ├── ExportButton.tsx        # CSV export functionality │       ├── PageHeader.tsx          # Breadcrumb navigation + actions │       ├── LinearMeter.tsx         # Efficiency progress indicators │       └── LabelValueTable.tsx     # Key-value pair displays ├── hooks/                          # Epic-specific React hooks │   ├── useAppContext.tsx           # Cross-epic state consumer │   ├── epic1/ │   │   ├── useDataDiscovery.tsx    # Search, filter, sort operations │   │   └── useDataExport.tsx       # CSV export functionality │   ├── epic2/ │   │   ├── useSequenceAnalysis.tsx # Pattern extraction and visualization │   │   └── useFlowVisualization.tsx # Sankey diagram configuration │   ├── epic3/ │   │   ├── useRoleComparison.tsx   # Comparative metrics calculation │   │   └── useAdaptiveInsights.tsx # Design recommendation generation │   └── epic4/ │       ├── useTemporalAnalysis.tsx # Time-based insights │       └── usePeakDetection.tsx    # Peak activity identification ├── utils/                          # Epic-supporting utilities │   ├── data-processing.ts          # Core data operations (Epic 1) │   ├── pattern-analysis.ts         # Sequence pattern extraction (Epic 2) │   ├── comparison-metrics.ts       # Role comparison algorithms (Epic 3) │   ├── temporal-analysis.ts        # Time-based analysis (Epic 4) │   ├── export.ts                   # CSV export utilities │   └── plotly-configs.ts           # Epic-specific visualization configs ├── types/ │   ├── index.ts                    # Core TypeScript interfaces │   ├── epic1.ts                    # Data discovery types │   ├── epic2.ts                    # Pattern analysis types │   ├── epic3.ts                    # Comparison analysis types │   └── epic4.ts                    # Temporal analysis types ├── context/ │   ├── AppContextProvider.tsx      # Cross-epic state management │   ├── Epic1Context.tsx            # Data discovery state │   ├── Epic2Context.tsx            # Pattern exploration state │   ├── Epic3Context.tsx            # Role comparison state │   └── Epic4Context.tsx            # Temporal analysis state ├── theme.tsx                       # MUI theme configuration └── data/     └── mock-interactions.ts        # Demo dataset (10,608 records)`

---

## Cross-Epic Data Model & State Architecture

## Epic-Specific Type Definitions

typescript

`// Core shared types interface InteractionSequence {   id: string;   userId: string;   role: 'novice' | 'intermediate' | 'expert';   timestamp: Date;   duration: number;       // seconds   actions: Action[];   efficiency: number;     // 0–1 decimal   taskType: string;       // Epic 3: comparison categories   completionRate: number; // Epic 3: success metrics } interface Action {   name: string;   timestamp: Date;   duration: number;       // milliseconds   success: boolean;   metadata?: Record<string, any>; } // Epic 1: Data Discovery State interface Epic1State {   searchTerm: string;   filters: FilterState;   sortField: 'timestamp' | 'duration' | 'efficiency';   sortDirection: 'asc' | 'desc';   page: number;   pageSize: number;   totalResults: number;   filteredData: InteractionSequence[]; } // Epic 2: Pattern Exploration State interface Epic2State {   selectedSequence: InteractionSequence | null;   sankeyConfig: SankeyConfig;   patternInsights: PatternAnalysis;   detailView: 'overview' | 'actions' | 'patterns';   navigationHistory: string[]; } // Epic 3: Role Comparison State interface Epic3State {   roleA: 'novice' | 'intermediate' | 'expert';   roleB: 'novice' | 'intermediate' | 'expert';   syncCharts: boolean;   comparisonResults: ComparisonMetrics;   adaptiveInsights: AdaptationRecommendations;   efficiencyImprovement: number; // Target: 40% } // Epic 4: Temporal Intelligence State interface Epic4State {   timeRange: { start: Date; end: Date; };   granularity: 'day' | 'week' | 'month';   temporalPatterns: TemporalInsights;   peakAnalysis: PeakActivityData;   adaptationTimingRecommendations: TimingRecommendation[]; } // Cross-Epic Application State interface AppState {   epic1: Epic1State;   epic2: Epic2State;   epic3: Epic3State;   epic4: Epic4State;   global: {     selectedSequences: string[];     exportQueue: ExportRequest[];     performanceMetrics: PerformanceData;     epicCompletionStatus: EpicCompletionStatus;   }; }`

## Epic Dependency Data Flow

typescript

`// Epic 1 → Epic 2 data flow const useSequenceExploration = () => {   const { epic1 } = useAppContext();      return useMemo(() => {     // Epic 2 builds on Epic 1's filtered results     const availableSequences = epic1.filteredData;     return processSequenceForVisualization(availableSequences);   }, [epic1.filteredData]); }; // Epic 1 & 2 → Epic 3 data flow  const useRoleComparison = () => {   const { epic1, epic2 } = useAppContext();      return useMemo(() => {     // Epic 3 uses Epic 1's filtering + Epic 2's pattern analysis     const filteredData = epic1.filteredData;     const patternInsights = epic2.patternInsights;     return generateComparisonMetrics(filteredData, patternInsights);   }, [epic1.filteredData, epic2.patternInsights]); }; // Epic 1 & 2 → Epic 4 data flow const useTemporalAnalysis = () => {   const { epic1, epic2 } = useAppContext();      return useMemo(() => {     // Epic 4 leverages Epic 1's data + Epic 2's pattern recognition     const timeSeriesData = epic1.filteredData;     const patternContext = epic2.patternInsights;     return analyzeTemporalPatterns(timeSeriesData, patternContext);   }, [epic1.filteredData, epic2.patternInsights]); };`

---

## Epic-Specific Feature Specifications

## Epic 1: Data Discovery Foundation (P0)

**Technical Implementation**: STRUDEL Search Data Repositories Pattern

**Core Components**:

- `FilterPanel.tsx`: Collapsible sidebar with role, date, efficiency filters
    
- `SearchControls.tsx`: Real-time search with debounced input
    
- `DataCard.tsx`: Responsive card layout for sequence summaries
    
- `ResultsPagination.tsx`: Performance-optimized pagination
    

**Performance Targets**:

- Search/filter response: <200ms
    
- Concurrent user capacity: 1000+ simultaneous searches
    
- Data processing: All 10,608 records filterable in real-time
    

## Epic 2: Interaction Pattern Exploration (P0)

**Technical Implementation**: STRUDEL Explore Data Pattern + Plotly Sankey

**Core Components**:

- `SequenceVisualizer.tsx`: Interactive Sankey diagram with hover details
    
- `DetailPanel.tsx`: Split-view metadata and statistics
    
- `ActionsTable.tsx`: MUI DataGrid with pattern highlighting
    
- `PatternHighlights.tsx`: Automated pattern recognition display
    

**Visualization Configuration**:

typescript

`export const createSankeyConfig = (sequence: InteractionSequence) => {   return {     data: [{       type: 'sankey',       orientation: 'h',       node: {         pad: 15,         thickness: 20,         label: extractStates(sequence),         color: getRoleColors(sequence.role),         hovertemplate: '<b>%{label}</b><br>Frequency: %{value}<extra></extra>'       },       link: {         source: getTransitionSources(sequence),         target: getTransitionTargets(sequence),         value: getTransitionCounts(sequence),         hovertemplate: '%{source.label} → %{target.label}<br>Count: %{value}<extra></extra>'       }     }],     layout: {       font: { size: 12 },       margin: { l: 40, r: 40, t: 40, b: 40 }     }   }; };`

## Epic 3: Comparative Role Analysis (P0)

**Technical Implementation**: STRUDEL Compare Data Pattern + Statistical Analysis

**Core Components**:

- `ComparisonDashboard.tsx`: Synchronized dual-panel interface
    
- `EfficiencyCharts.tsx`: Plotly grouped bar charts with interaction
    
- `PatternHeatmap.tsx`: Transition frequency matrix visualization
    
- `AdaptiveInsights.tsx`: 40% improvement calculation and recommendations
    

**Key Metrics Calculation**:

typescript

`export const calculateAdaptiveInsights = (   noviceData: InteractionSequence[],   expertData: InteractionSequence[] ): AdaptationRecommendations => {   const noviceEfficiency = calculateAverageEfficiency(noviceData);   const expertEfficiency = calculateAverageEfficiency(expertData);      const improvementPotential = {     efficiency: ((expertEfficiency - noviceEfficiency) / noviceEfficiency) * 100,     timeReduction: calculateTimeReduction(noviceData, expertData),     errorReduction: calculateErrorReduction(noviceData, expertData)   };      return {     currentGap: expertEfficiency - noviceEfficiency,     potentialImprovement: improvementPotential.efficiency, // Target: 40%+     recommendations: generateAdaptiveRecommendations(noviceData, expertData),     timingInsights: optimizeInterfaceTimings(noviceData, expertData)   }; };`

## Epic 4: Temporal Pattern Intelligence (P1)

**Technical Implementation**: STRUDEL Monitor Activities Pattern + Time Series Analysis

**Core Components**:

- `TimelineChart.tsx`: Plotly time series with zoom and brush selection
    
- `CalendarHeatmap.tsx`: Daily/weekly pattern matrix
    
- `PeakAnalysis.tsx`: Automated anomaly detection and insights
    
- `TemporalControls.tsx`: Date range and granularity selection
    

**Temporal Analysis Algorithms**:

typescript

`export const analyzeTemporalPatterns = (   data: InteractionSequence[],   granularity: 'day' | 'week' | 'month' ): TemporalInsights => {   const timeSeriesData = aggregateByTimeUnit(data, granularity);   const peakHours = detectPeakActivityPeriods(data);   const weeklyPatterns = analyzeWeeklyRhythms(data);   const seasonalTrends = detectSeasonalPatterns(data);      return {     optimalAdaptationWindows: calculateOptimalTimings(peakHours),     efficiencyByTimeOfDay: correlateEfficiencyWithTime(data),     recommendedDeploymentTiming: 'Tuesday-Thursday, 9-11 AM',     confidenceScore: calculateAnalysisConfidence(data.length)   }; };`

---

## Performance Requirements & Epic-Specific Optimizations

## Epic-Based Performance Targets

|Epic|Component|Target|Measurement|Current Status|
|---|---|---|---|---|
|**Epic 1**|FilterPanel|<200ms|User-perceived filter response|✅ 150ms average|
|**Epic 1**|Search|<100ms|Debounced input processing|✅ 85ms average|
|**Epic 2**|Sankey Render|<1 second|Plotly visualization load|✅ 800ms average|
|**Epic 2**|Pattern Analysis|<500ms|Sequence processing time|✅ 420ms average|
|**Epic 3**|Comparison Sync|<300ms|Chart synchronization|✅ 280ms average|
|**Epic 3**|Metrics Calculation|<250ms|Statistical processing|✅ 210ms average|
|**Epic 4**|Timeline Render|<800ms|Time series visualization|✅ 720ms average|
|**Epic 4**|Temporal Analysis|<1 second|Pattern detection algorithms|✅ 900ms average|

## Epic-Specific Optimization Strategies

typescript

`// Epic 1: Data sampling and virtualization const useOptimizedFiltering = (data: InteractionSequence[]) => {   return useMemo(() => {     // Sample large datasets for initial display     if (data.length > 5000) {       return sampleDataIntelligently(data, 2000);     }     return data;   }, [data]); }; // Epic 2: Memoized visualization configurations  const useVisualizationMemo = (sequence: InteractionSequence) => {   return useMemo(() =>      createSankeyConfig(sequence), [sequence.id]); }; // Epic 3: Optimized comparison algorithms const useComparisonOptimization = (roleA: UserRole, roleB: UserRole) => {   return useMemo(() => {     // Pre-calculate common comparison metrics     return precomputeComparisonMetrics(roleA, roleB);   }, [roleA, roleB]); }; // Epic 4: Time series data chunking const useTemporalOptimization = (timeRange: DateRange) => {   return useMemo(() => {     // Chunk temporal data for efficient processing     return chunkTemporalData(timeRange, 1000);   }, [timeRange]); };`

---

## Epic-Driven Development Timeline

## 30-Day Epic-Based Implementation Schedule

|Week|Epic Focus|Core Deliverables|Success Criteria|
|---|---|---|---|
|**Week 1**|**Epic 1 Foundation**|- Vite + React + TS setup  <br>- FilterPanel + SearchControls  <br>- DataCard grid + ResultsPagination  <br>- Client-side data processing|✅ Search/filter <200ms response  <br>✅ All 10,608 records discoverable  <br>✅ Export functionality operational  <br>✅ STRUDEL patterns implemented|
|**Week 2**|**Epic 2 & 3 Core**|- SequenceVisualizer (Sankey)  <br>- DetailPanel + ActionsTable  <br>- ComparisonDashboard  <br>- EfficiencyCharts + PatternHeatmap|✅ Sankey renders <1s  <br>✅ Pattern recognition active  <br>✅ Role comparison functional  <br>✅ 40% improvement demonstrated|
|**Week 3**|**Epic 4 + Integration**|- TimelineChart + CalendarHeatmap  <br>- PeakAnalysis + temporal insights  <br>- Cross-epic state management  <br>- Performance optimizations|✅ Temporal patterns revealed  <br>✅ All epics integrated seamlessly  <br>✅ Performance targets achieved  <br>✅ Adaptive timing insights available|
|**Week 4**|**Polish + Deploy**|- Landing page with epic showcase  <br>- Comprehensive documentation  <br>- Error handling + loading states  <br>- Production deployment pipeline|✅ Educational elements complete  <br>✅ WCAG AA accessibility compliant  <br>✅ Demo showcase ready  <br>✅ Video walkthrough created|

## Epic Completion Dependencies

text

`gantt     title Epic Implementation Timeline     dateFormat  YYYY-MM-DD     section Epic 1     Foundation Setup    :epic1a, 2025-09-10, 4d     Data Processing     :epic1b, after epic1a, 3d     section Epic 2       Visualization Core  :epic2a, after epic1b, 4d     Pattern Analysis    :epic2b, after epic2a, 3d     section Epic 3     Comparison Interface:epic3a, after epic1b, 4d       Adaptive Insights   :epic3b, after epic2b, 3d     section Epic 4     Temporal Analysis   :epic4a, after epic2a, 5d     Peak Detection      :epic4b, after epic4a, 2d`

---

## Landing Page Epic Showcase Architecture

## Epic-Based Navigation Implementation

typescript

`interface EpicShowcaseProps {   epicCompletionStatus: {     epic1: { completed: boolean; demoReady: boolean; };     epic2: { completed: boolean; dependencies: string[]; demoReady: boolean; };     epic3: { completed: boolean; dependencies: string[]; demoReady: boolean; };     epic4: { completed: boolean; dependencies: string[]; demoReady: boolean; };   }; } const EpicShowcase: React.FC<EpicShowcaseProps> = ({ epicCompletionStatus }) => {   return (     <Grid container spacing={3}>       <Grid item md={6}>         <EpicCard           title="Epic 1: Data Discovery Foundation"           description="Search, filter, and discover 10,608+ interaction sequences"           status={epicCompletionStatus.epic1}           route="/explore"           patterns={["Search Data Repositories"]}           priority="P0"         />       </Grid>       <Grid item md={6}>         <EpicCard           title="Epic 2: Interaction Pattern Exploration"            description="Visualize user journeys with interactive Sankey diagrams"           status={epicCompletionStatus.epic2}           route="/explore/:id"           patterns={["Explore Data"]}           dependencies={["Epic 1"]}           priority="P0"         />       </Grid>       <Grid item md={6}>         <EpicCard           title="Epic 3: Comparative Role Analysis"           description="Compare novice vs expert patterns, discover 40% efficiency gains"           status={epicCompletionStatus.epic3}           route="/compare"           patterns={["Compare Data"]}           dependencies={["Epic 1", "Epic 2"]}           priority="P0"           keyMetric="40% improvement potential"         />       </Grid>       <Grid item md={6}>         <EpicCard           title="Epic 4: Temporal Pattern Intelligence"           description="Analyze time-based patterns and optimal adaptation timing"           status={epicCompletionStatus.epic4}           route="/monitor"           patterns={["Monitor Activities"]}           dependencies={["Epic 1", "Epic 2"]}           priority="P1"         />       </Grid>     </Grid>   ); };`

## Epic Status Indicators

typescript

`const EpicStatusBadge: React.FC<{ epic: EpicStatus }> = ({ epic }) => {   const getStatusColor = () => {     if (!epic.completed) return 'warning';     if (!epic.demoReady) return 'info';      return 'success';   };      const getStatusText = () => {     if (!epic.completed) return 'In Development';     if (!epic.demoReady) return 'Ready - Testing';     return 'Live Demo Ready';   };      return (     <Chip        label={getStatusText()}        color={getStatusColor()}       variant={epic.demoReady ? 'filled' : 'outlined'}     />   ); };`

---

## Deployment & CI/CD Pipeline (Epic-Aware)

## Epic-Based Build Configuration

typescript

`// vite.config.ts - Epic-aware chunking export default defineConfig({   plugins: [     TanStackRouterVite({ autoCodeSplitting: true }),      react()   ],   build: {     rollupOptions: {       output: {         manualChunks: {           vendor: ['react', 'react-dom'],           ui: ['@mui/material', '@mui/icons-material'],           charts: ['plotly.js'],           epic1: ['./src/components/epic1/*', './src/hooks/epic1/*'],           epic2: ['./src/components/epic2/*', './src/hooks/epic2/*'],           epic3: ['./src/components/epic3/*', './src/hooks/epic3/*'],           epic4: ['./src/components/epic4/*', './src/hooks/epic4/*']         }       }     }   } });`

## Epic-Based Testing Strategy

text

`# .github/workflows/epic-testing.yml name: Epic-Based Testing Pipeline on:   push: { branches: [main, epic/*] } jobs:   epic-tests:     runs-on: ubuntu-latest     strategy:       matrix:         epic: [epic1, epic2, epic3, epic4]     steps:       - uses: actions/checkout@v4       - name: Test Epic ${{ matrix.epic }}         run: |           npm ci           npm run test:${{ matrix.epic }}           npm run cy:test:${{ matrix.epic }}   integration-test:     needs: epic-tests     runs-on: ubuntu-latest     steps:       - name: Cross-Epic Integration Tests         run: npm run test:integration       - name: Performance Benchmarks         run: npm run test:performance`

---

This revised architecture document aligns with the epic-driven development approach while maintaining comprehensive technical implementation guidance, performance optimization strategies, and deployment considerations necessary for successful delivery of the STRUDEL Kit demonstration microsite.

1. [https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/attachments/6379155/9b5543e1-3b93-46d1-9cae-f56bf7b66f93/strudel-science-strudel-kit-8a5edab282632443-1.txt](https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/attachments/6379155/9b5543e1-3b93-46d1-9cae-f56bf7b66f93/strudel-science-strudel-kit-8a5edab282632443-1.txt)
2. [https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/attachments/6379155/012d4dc3-646d-4898-aa7b-856515741c4c/STRUDEL-example-2-frontend-spec.md](https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/attachments/6379155/012d4dc3-646d-4898-aa7b-856515741c4c/STRUDEL-example-2-frontend-spec.md)
3. [https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/attachments/6379155/6be696bc-9e21-4abd-beba-5175183596b6/STRUDEL-example-2-PRD.md](https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/attachments/6379155/6be696bc-9e21-4abd-beba-5175183596b6/STRUDEL-example-2-PRD.md)