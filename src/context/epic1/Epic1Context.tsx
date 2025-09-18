import React, { PropsWithChildren, useContext } from 'react';
import { InteractionSequence } from '../../types/epic1';
import { useDataDiscovery } from '../../hooks/epic1/useDataDiscovery';
import { Epic1State, Epic1SortDirection, Epic1SortField, RangeFilter, UserRole } from '../../types/epic1';

interface Epic1ContextValue {
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

const Epic1Context = React.createContext<Epic1ContextValue | undefined>(undefined);

export const Epic1Provider: React.FC<PropsWithChildren> = ({ children }) => {
  const discovery = useDataDiscovery();
  return <Epic1Context.Provider value={discovery}>{children}</Epic1Context.Provider>;
};

export const useEpic1Context = () => {
  const context = useContext(Epic1Context);
  if (!context) {
    throw new Error('useEpic1Context must be used within an Epic1Provider');
  }
  return context;
};
