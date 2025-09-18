import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, renderHook } from '@testing-library/react';
import dayjs from 'dayjs';
import { useDataDiscovery } from '../useDataDiscovery';

describe('useDataDiscovery', () => {
  const createWrapper = () => {
    const queryClient = new QueryClient();
    return ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  };

  it('filters results by search term', () => {
    const { result } = renderHook(() => useDataDiscovery(), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.setSearchTerm('novice');
    });

    expect(result.current.results.every((sequence) => sequence.role === 'novice')).toBe(true);
  });

  it('applies efficiency and duration filters', () => {
    const { result } = renderHook(() => useDataDiscovery(), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.setEfficiency({ min: 0.6, max: 0.7 });
      result.current.setDuration({ min: 600, max: 1200 });
    });

    expect(
      result.current.results.every(
        (sequence) =>
          sequence.efficiency >= 0.6 &&
          sequence.efficiency <= 0.7 &&
          sequence.duration >= 600 &&
          sequence.duration <= 1200
      )
    ).toBe(true);
  });

  it('applies date range filtering', () => {
    const { result } = renderHook(() => useDataDiscovery(), {
      wrapper: createWrapper(),
    });

    const start = dayjs('2024-06-01');
    const end = dayjs('2024-09-01');

    act(() => {
      result.current.setDateRange(start.toISOString(), end.toISOString());
    });

    expect(
      result.current.results.every((sequence) => {
        const timestamp = dayjs(sequence.timestamp);
        return timestamp.isSameOrAfter(start) && timestamp.isSameOrBefore(end);
      })
    ).toBe(true);
  });

  it('flags virtualization when result set is large', () => {
    const { result } = renderHook(() => useDataDiscovery(), {
      wrapper: createWrapper(),
    });

    expect(result.current.shouldVirtualize).toBe(true);
    expect(result.current.results.length).toBeGreaterThan(5000);
  });
});
