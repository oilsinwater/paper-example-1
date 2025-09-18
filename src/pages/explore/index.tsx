import DownloadIcon from '@mui/icons-material/Download';
import FilterListIcon from '@mui/icons-material/FilterList';
import {
  Alert,
  Box,
  Button,
  Grid,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
  Snackbar,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { createFileRoute } from '@tanstack/react-router';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { Epic1Provider, useEpic1Context } from '../../context/epic1/Epic1Context';
import { SearchControls } from '../../components/epic1/SearchControls';
import { FilterPanel } from '../../components/epic1/FilterPanel';
import { DataCard } from '../../components/epic1/DataCard';
import { downloadCsv, generateCsv } from '../../utils/csv';

export const Route = createFileRoute('/explore/')({
  component: ExploreRoute,
});

const PAGE_SIZE_OPTIONS = [12, 24, 48];

const ExploreRoute: React.FC = () => (
  <Epic1Provider>
    <ExploreContent />
  </Epic1Provider>
);

const ExploreContent: React.FC = () => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  const [filtersOpen, setFiltersOpen] = useState(!isSmall);
  const [snackbar, setSnackbar] = useState<{ message: string; severity: 'success' | 'error' } | null>(
    null
  );

  const {
    state,
    results,
    paginatedResults,
    shouldVirtualize,
    setPage,
    setPageSize,
  } = useEpic1Context();

  const scrollParentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isSmall) {
      setFiltersOpen(false);
    }
  }, [isSmall]);

  const dataForDisplay = useMemo(
    () => (shouldVirtualize ? results : paginatedResults),
    [shouldVirtualize, results, paginatedResults]
  );

  const virtualizer = useVirtualizer({
    count: shouldVirtualize ? results.length : 0,
    getScrollElement: () => scrollParentRef.current,
    estimateSize: () => 220,
    overscan: 8,
  });

  const handleExport = () => {
    try {
      if (results.length === 0) {
        throw new Error('No results to export');
      }
      const csv = generateCsv(results);
      downloadCsv(`interaction-sequences-${new Date().toISOString()}.csv`, csv);
      setSnackbar({ message: `Exported ${results.length} rows`, severity: 'success' });
    } catch (error) {
      setSnackbar({ message: (error as Error).message ?? 'Export failed', severity: 'error' });
    }
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    setPage(page);
  };

  const handlePageSizeChange = (event: SelectChangeEvent<string>) => {
    setPageSize(Number(event.target.value));
  };

  const renderResults = () => {
    if (state.totalResults === 0) {
      return (
        <Alert severity="info" sx={{ mt: 4 }}>
          No interaction sequences match the current criteria. Try broadening your search or
          resetting filters.
        </Alert>
      );
    }

    if (shouldVirtualize) {
      const items = virtualizer.getVirtualItems();
      return (
        <Box
          ref={scrollParentRef}
          sx={{
            height: 640,
            overflow: 'auto',
            borderRadius: 1,
            border: `1px solid ${theme.palette.divider}`,
            p: 2,
          }}
        >
          <Box
            sx={{
              height: virtualizer.getTotalSize(),
              position: 'relative',
            }}
          >
            {items.map((virtualRow) => {
              const sequence = results[virtualRow.index];
              return (
                <Box
                  key={sequence.id}
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    transform: `translateY(${virtualRow.start}px)`,
                    pb: 2,
                  }}
                >
                  <DataCard sequence={sequence} />
                </Box>
              );
            })}
          </Box>
        </Box>
      );
    }

    return (
      <>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          {dataForDisplay.map((sequence) => (
            <Grid key={sequence.id} item xs={12} sm={6} md={4} lg={3}>
              <DataCard sequence={sequence} />
            </Grid>
          ))}
        </Grid>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          alignItems={{ xs: 'stretch', sm: 'center' }}
          justifyContent="space-between"
          spacing={2}
          sx={{ mt: 3 }}
        >
          <Pagination
            count={Math.max(Math.ceil(state.totalResults / state.pageSize), 1)}
            page={state.page}
            onChange={handlePageChange}
          />
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant="caption">Results per page</Typography>
            <Select
              size="small"
              value={state.pageSize.toString()}
              onChange={handlePageSizeChange}
            >
              {PAGE_SIZE_OPTIONS.map((option) => (
                <MenuItem key={option} value={option.toString()}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </Stack>
        </Stack>
      </>
    );
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <Stack spacing={3}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h4" component="h1">
            Interaction Search &amp; Filter
          </Typography>
          <Stack direction="row" spacing={1}>
            <Button
              variant="outlined"
              startIcon={<FilterListIcon />}
              onClick={() => setFiltersOpen((prev) => !prev)}
              aria-expanded={filtersOpen}
              aria-controls="epic1-filter-panel"
            >
              {filtersOpen ? 'Hide filters' : 'Show filters'}
            </Button>
            <Button
              variant="contained"
              startIcon={<DownloadIcon />}
              onClick={handleExport}
            >
              Export CSV
            </Button>
          </Stack>
        </Stack>
        <SearchControls />
        <Stack direction="row" spacing={3} alignItems="stretch">
          {filtersOpen && (
            <Box id="epic1-filter-panel" sx={{ flexBasis: { xs: '100%', md: 320 } }}>
              <FilterPanel open={filtersOpen} onClose={() => setFiltersOpen(false)} />
            </Box>
          )}
          <Box sx={{ flexGrow: 1 }}>{renderResults()}</Box>
        </Stack>
      </Stack>
      <Snackbar
        open={Boolean(snackbar)}
        autoHideDuration={4000}
        onClose={() => setSnackbar(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        {snackbar && <Alert severity={snackbar.severity}>{snackbar.message}</Alert>}
      </Snackbar>
    </Box>
  );
};
