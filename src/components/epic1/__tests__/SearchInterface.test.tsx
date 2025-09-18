import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Epic1Provider, useEpic1Context } from '../../../context/epic1/Epic1Context';
import { SearchControls } from '../SearchControls';
import { FilterPanel } from '../FilterPanel';

const queryClient = new QueryClient();

const HelperInspector: React.FC = () => {
  const { state } = useEpic1Context();
  return <div data-testid="result-count">{state.totalResults}</div>;
};

function renderInterface() {
  return render(
    <QueryClientProvider client={queryClient}>
      <Epic1Provider>
        <SearchControls />
        <FilterPanel open onClose={() => null} />
        <HelperInspector />
      </Epic1Provider>
    </QueryClientProvider>
  );
}

describe('Epic 1 search interface', () => {
  it('updates helper text when searching', async () => {
    renderInterface();

    await screen.findByText('Large result set virtualized for performance.');

    const searchInput = screen.getByTestId('search-input');
    await userEvent.clear(searchInput);
    await userEvent.type(searchInput, 'expert');

    await waitFor(() => {
      expect(
        screen.getByText('2000 sequences match your criteria.')
      ).toBeInTheDocument();
    });
  });

  it('applies role filters via filter panel', async () => {
    renderInterface();

    const noviceCheckbox = await screen.findByLabelText('novice');
    await userEvent.click(noviceCheckbox);

    await waitFor(() => {
      expect(screen.getByText('2000 sequences match your criteria.')).toBeInTheDocument();
    });
  });
});
