export type UserRole = 'novice' | 'intermediate' | 'expert';

export interface InteractionSequence {
  id: string;
  userId: string;
  role: UserRole;
  timestamp: string;
  duration: number; // seconds
  actions: string[];
  efficiency: number; // 0-1
  taskType: string;
  completionRate: number; // 0-1
}

export type Epic1SortField = 'timestamp' | 'duration' | 'efficiency';
export type Epic1SortDirection = 'asc' | 'desc';

export interface RangeFilter {
  min: number;
  max: number;
}

export interface Epic1Filters {
  roles: UserRole[];
  efficiency: RangeFilter;
  duration: RangeFilter;
  dateRange: {
    start: string | null;
    end: string | null;
  };
}

export interface Epic1State {
  searchTerm: string;
  filters: Epic1Filters;
  sortField: Epic1SortField;
  sortDirection: Epic1SortDirection;
  page: number;
  pageSize: number;
  totalResults: number;
}
