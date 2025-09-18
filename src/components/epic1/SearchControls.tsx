import SortIcon from '@mui/icons-material/Sort';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
} from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { useEpic1Context } from '../../context/epic1/Epic1Context';
import { Epic1SortDirection, Epic1SortField } from '../../types/epic1';

const SORT_FIELDS: { label: string; value: Epic1SortField }[] = [
  { label: 'Newest', value: 'timestamp' },
  { label: 'Duration', value: 'duration' },
  { label: 'Efficiency', value: 'efficiency' },
];

const DEBOUNCE_MS = 150;

export const SearchControls: React.FC = () => {
  const {
    state,
    setSearchTerm,
    setSortField,
    setSortDirection,
  } = useEpic1Context();
  const [inputValue, setInputValue] = useState(state.searchTerm);

  useEffect(() => {
    setInputValue(state.searchTerm);
  }, [state.searchTerm]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setSearchTerm(inputValue);
    }, DEBOUNCE_MS);
    return () => window.clearTimeout(timer);
  }, [inputValue, setSearchTerm]);

  const handleSortFieldChange = (event: SelectChangeEvent<Epic1SortField>) => {
    const value = event.target.value as Epic1SortField;
    setSortField(value);
  };

  const handleDirectionChange = (
    _event: React.MouseEvent<HTMLElement>,
    next: Epic1SortDirection | null
  ) => {
    if (next) {
      setSortDirection(next);
    }
  };

  const helperText = useMemo(() => {
    if (state.totalResults === 0) {
      return 'No matches. Adjust filters to refine your search.';
    }
    if (state.totalResults > 5000) {
      return 'Large result set virtualized for performance.';
    }
    return `${state.totalResults} sequences match your criteria.`;
  }, [state.totalResults]);

  return (
    <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems="center">
      <TextField
        label="Search sequences"
        fullWidth
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        placeholder="Search by role, task, or keywords"
        inputProps={{ 'data-testid': 'search-input' }}
      />
      <Box sx={{ minWidth: 160 }}>
        <FormControl fullWidth size="small">
          <InputLabel id="sort-field-label">Sort by</InputLabel>
          <Select
            labelId="sort-field-label"
            label="Sort by"
            value={state.sortField}
            onChange={handleSortFieldChange}
            renderValue={(value) => (
              <Stack direction="row" spacing={1} alignItems="center">
                <SortIcon fontSize="small" />
                <span>
                  {SORT_FIELDS.find((option) => option.value === value)?.label ?? value}
                </span>
              </Stack>
            )}
          >
            {SORT_FIELDS.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Tooltip title="Toggle sort direction">
        <ToggleButtonGroup
          size="small"
          value={state.sortDirection}
          exclusive
          onChange={handleDirectionChange}
          aria-label="Sort direction"
        >
          <ToggleButton value="desc" aria-label="Sort newest first">
            Desc
          </ToggleButton>
          <ToggleButton value="asc" aria-label="Sort oldest first">
            Asc
          </ToggleButton>
        </ToggleButtonGroup>
      </Tooltip>
      <Box sx={{ flexGrow: 1 }}>
        <Box component="span" sx={{ fontSize: 12, color: 'text.secondary' }}>
          {helperText}
        </Box>
      </Box>
    </Stack>
  );
};
