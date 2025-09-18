import { useEffect, useMemo, useReducer } from 'react';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { interactionSequences } from '../../data/interactionSequences';
import {
  Epic1Filters,
  Epic1SortDirection,
  Epic1SortField,
  Epic1State,
  InteractionSequence,
  RangeFilter,
  UserRole,
} from '../../types/epic1';

interface UpdateFilterPayload {
  key: keyof Epic1Filters;
  value: Epic1Filters[keyof Epic1Filters];
}

type Action =
  | { type: 'SET_SEARCH_TERM'; payload: string }
  | { type: 'SET_FILTER'; payload: UpdateFilterPayload }
  | { type: 'SET_SORT'; payload: { field: Epic1SortField; direction: Epic1SortDirection } }
  | { type: 'SET_PAGE'; payload: number }
  | { type: 'SET_PAGE_SIZE'; payload: number }
  | { type: 'SET_TOTAL_RESULTS'; payload: number };

const DEFAULT_RANGE = (min: number, max: number): RangeFilter => ({ min, max });

const initialState: Epic1State = {
  searchTerm: '',
  filters: {
    roles: [] as UserRole[],
    efficiency: DEFAULT_RANGE(0, 1),
    duration: DEFAULT_RANGE(0, 7200),
    dateRange: {
      start: null,
      end: null,
    },
  },
  sortField: 'timestamp',
  sortDirection: 'desc',
  page: 1,
  pageSize: 24,
  totalResults: 0,
};

function reducer(state: Epic1State, action: Action): Epic1State {
  switch (action.type) {
    case 'SET_SEARCH_TERM':
      return {
        ...state,
        searchTerm: action.payload,
        page: 1,
      };
    case 'SET_FILTER': {
      const nextFilters = {
        ...state.filters,
        [action.payload.key]: action.payload.value,
      } as Epic1Filters;
      return {
        ...state,
        filters: nextFilters,
        page: 1,
      };
    }
    case 'SET_SORT':
      return {
        ...state,
        sortField: action.payload.field,
        sortDirection: action.payload.direction,
        page: 1,
      };
    case 'SET_PAGE':
      return {
        ...state,
        page: action.payload,
      };
    case 'SET_PAGE_SIZE':
      return {
        ...state,
        pageSize: action.payload,
        page: 1,
      };
    case 'SET_TOTAL_RESULTS':
      return {
        ...state,
        totalResults: action.payload,
      };
    default:
      return state;
  }
}

const VIRTUALIZATION_THRESHOLD = 5000;
const VIRTUALIZATION_SAMPLE_SIZE = 2000;

function textMatches(sequence: InteractionSequence, searchTerm: string) {
  if (!searchTerm) return true;
  const term = searchTerm.toLowerCase();
  return [
    sequence.id,
    sequence.userId,
    sequence.role,
    sequence.taskType,
    sequence.actions.join(' '),
  ].some((value) => value.toLowerCase().includes(term));
}

function withinRange(range: RangeFilter, value: number) {
  return value >= range.min && value <= range.max;
}

function withinDateRange(
  dateRange: Epic1Filters['dateRange'],
  timestamp: string
) {
  if (!dateRange.start && !dateRange.end) return true;
  const date = dayjs(timestamp);
  const afterStart = dateRange.start ? date.isSameOrAfter(dayjs(dateRange.start)) : true;
  const beforeEnd = dateRange.end ? date.isSameOrBefore(dayjs(dateRange.end)) : true;
  return afterStart && beforeEnd;
}

function sortSequences(
  sequences: InteractionSequence[],
  sortField: Epic1SortField,
  direction: Epic1SortDirection
) {
  const sorted = [...sequences].sort((a, b) => {
    const multiplier = direction === 'asc' ? 1 : -1;
    if (sortField === 'timestamp') {
      return (
        (dayjs(a.timestamp).valueOf() - dayjs(b.timestamp).valueOf()) * multiplier
      );
    }
    if (sortField === 'duration') {
      return (a.duration - b.duration) * multiplier;
    }
    return (a.efficiency - b.efficiency) * multiplier;
  });
  return sorted;
}

export interface UseDataDiscoveryResult {
  state: Epic1State;
  results: InteractionSequence[];
  paginatedResults: InteractionSequence[];
  shouldVirtualize: boolean;
  setSearchTerm: (value: string) => void;
  setRoles: (roles: UserRole[]) => void;
  setEfficiency: (range: RangeFilter) => void;
  setDuration: (range: RangeFilter) => void;
  setDateRange: (start: string | null, end: string | null) => void;
  setSortField: (field: Epic1SortField) => void;
  setSortDirection: (direction: Epic1SortDirection) => void;
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
}

export function useDataDiscovery(): UseDataDiscoveryResult {
  const { data = [] } = useQuery({
    queryKey: ['epic1-interaction-sequences'],
    queryFn: async () => interactionSequences,
    staleTime: Infinity,
  });

  const [state, dispatch] = useReducer(reducer, initialState);

  const filteredResults = useMemo(() => {
    return data.filter((sequence) => {
      const roleMatch =
        state.filters.roles.length === 0 ||
        state.filters.roles.includes(sequence.role);
      const efficiencyMatch = withinRange(state.filters.efficiency, sequence.efficiency);
      const durationMatch = withinRange(state.filters.duration, sequence.duration);
      const dateMatch = withinDateRange(state.filters.dateRange, sequence.timestamp);
      const searchMatch = textMatches(sequence, state.searchTerm);
      return roleMatch && efficiencyMatch && durationMatch && dateMatch && searchMatch;
    });
  }, [data, state.filters, state.searchTerm]);

  const sortedResults = useMemo(() => {
    return sortSequences(filteredResults, state.sortField, state.sortDirection);
  }, [filteredResults, state.sortField, state.sortDirection]);

  const shouldVirtualize = sortedResults.length > VIRTUALIZATION_THRESHOLD;

  const paginatedResults = useMemo(() => {
    if (shouldVirtualize) {
      return sortedResults.slice(0, VIRTUALIZATION_SAMPLE_SIZE);
    }
    const start = (state.page - 1) * state.pageSize;
    const end = start + state.pageSize;
    return sortedResults.slice(start, end);
  }, [sortedResults, shouldVirtualize, state.page, state.pageSize]);

  useEffect(() => {
    dispatch({ type: 'SET_TOTAL_RESULTS', payload: sortedResults.length });
  }, [sortedResults.length, dispatch]);

  return {
    state,
    results: sortedResults,
    paginatedResults,
    shouldVirtualize,
    setSearchTerm: (value: string) => dispatch({ type: 'SET_SEARCH_TERM', payload: value }),
    setRoles: (roles: UserRole[]) =>
      dispatch({ type: 'SET_FILTER', payload: { key: 'roles', value: roles } }),
    setEfficiency: (range: RangeFilter) =>
      dispatch({ type: 'SET_FILTER', payload: { key: 'efficiency', value: range } }),
    setDuration: (range: RangeFilter) =>
      dispatch({ type: 'SET_FILTER', payload: { key: 'duration', value: range } }),
    setDateRange: (start: string | null, end: string | null) =>
      dispatch({
        type: 'SET_FILTER',
        payload: {
          key: 'dateRange',
          value: {
            start,
            end,
          },
        },
      }),
    setSortField: (field: Epic1SortField) =>
      dispatch({ type: 'SET_SORT', payload: { field, direction: state.sortDirection } }),
    setSortDirection: (direction: Epic1SortDirection) =>
      dispatch({ type: 'SET_SORT', payload: { field: state.sortField, direction } }),
    setPage: (page: number) => dispatch({ type: 'SET_PAGE', payload: page }),
    setPageSize: (pageSize: number) =>
      dispatch({ type: 'SET_PAGE_SIZE', payload: pageSize }),
  };
}
