import CloseIcon from '@mui/icons-material/Close';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  IconButton,
  Slider,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import React from 'react';
import { useEpic1Context } from '../../context/epic1/Epic1Context';
import { RangeFilter, UserRole } from '../../types/epic1';

interface FilterPanelProps {
  open: boolean;
  onClose: () => void;
}

const ROLE_OPTIONS: UserRole[] = ['novice', 'intermediate', 'expert'];
const EFFICIENCY_RANGE: RangeFilter = { min: 0, max: 1 };
const DURATION_RANGE: RangeFilter = { min: 0, max: 7200 };

function formatSecondsToMinutes(seconds: number) {
  const minutes = Math.round(seconds / 60);
  return `${minutes} min`;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({ open, onClose }) => {
  const theme = useTheme();
  const {
    state,
    setRoles,
    setEfficiency,
    setDuration,
    setDateRange,
  } = useEpic1Context();

  const handleRoleChange = (role: UserRole) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const isChecked = event.target.checked;
      const nextRoles = isChecked
        ? [...state.filters.roles, role]
        : state.filters.roles.filter((value) => value !== role);
      setRoles(nextRoles);
    };

  const handleSliderCommit = (
    key: 'efficiency' | 'duration',
    value: number | number[]
  ) => {
    if (!Array.isArray(value)) return;
    const normalized: RangeFilter =
      key === 'efficiency'
        ? { min: value[0] / 100, max: value[1] / 100 }
        : { min: value[0], max: value[1] };
    if (key === 'efficiency') {
      setEfficiency(normalized);
    } else {
      setDuration(normalized);
    }
  };

  const efficiencySliderValue = [
    Math.round(state.filters.efficiency.min * 100),
    Math.round(state.filters.efficiency.max * 100),
  ];

  const durationSliderValue = [
    state.filters.duration.min,
    state.filters.duration.max,
  ];

  const startValue = state.filters.dateRange.start
    ? dayjs(state.filters.dateRange.start)
    : null;
  const endValue = state.filters.dateRange.end
    ? dayjs(state.filters.dateRange.end)
    : null;

  const handleDateChange = (key: 'start' | 'end') =>
    (value: Dayjs | null) => {
      const next = {
        start: key === 'start' ? value?.toISOString() ?? null : state.filters.dateRange.start,
        end: key === 'end' ? value?.toISOString() ?? null : state.filters.dateRange.end,
      };
      setDateRange(next.start, next.end);
    };

  if (!open) return null;

  return (
    <Box
      role="dialog"
      aria-label="Filter results"
      sx={{
        width: { xs: '100%', sm: 320 },
        maxWidth: '100%',
        backgroundColor: theme.palette.background.paper,
        borderRight: `1px solid ${theme.palette.divider}`,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ p: 2 }}
      >
        <Stack direction="row" spacing={1} alignItems="center">
          <FilterAltIcon color="primary" />
          <Typography variant="h6">Filters</Typography>
        </Stack>
        <IconButton aria-label="Close filters" onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </Stack>
      <Divider />
      <Stack spacing={3} sx={{ p: 2, overflowY: 'auto' }}>
        <Box>
          <Typography variant="subtitle2" gutterBottom>
            Role
          </Typography>
          <FormGroup>
            {ROLE_OPTIONS.map((role) => (
              <FormControlLabel
                key={role}
                control={
                  <Checkbox
                    checked={state.filters.roles.includes(role)}
                    onChange={handleRoleChange(role)}
                  />
                }
                label={role}
              />
            ))}
          </FormGroup>
        </Box>
        <Box>
          <Typography variant="subtitle2" gutterBottom>
            Efficiency
          </Typography>
          <Slider
            value={efficiencySliderValue}
            onChangeCommitted={(_event, value) =>
              handleSliderCommit('efficiency', value)
            }
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => `${value}%`}
            min={EFFICIENCY_RANGE.min * 100}
            max={EFFICIENCY_RANGE.max * 100}
            data-testid="efficiency-slider"
          />
        </Box>
        <Box>
          <Typography variant="subtitle2" gutterBottom>
            Duration (seconds)
          </Typography>
          <Slider
            value={durationSliderValue}
            onChangeCommitted={(_event, value) =>
              handleSliderCommit('duration', value)
            }
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => formatSecondsToMinutes(value)}
            min={DURATION_RANGE.min}
            max={DURATION_RANGE.max}
            step={60}
            data-testid="duration-slider"
          />
        </Box>
        <Box>
          <Typography variant="subtitle2" gutterBottom>
            Date range
          </Typography>
          <Stack direction="row" spacing={1}>
            <DatePicker
              label="Start"
              value={startValue}
              onChange={handleDateChange('start')}
              slotProps={{ textField: { size: 'small' } }}
            />
            <DatePicker
              label="End"
              value={endValue}
              onChange={handleDateChange('end')}
              slotProps={{ textField: { size: 'small' } }}
            />
          </Stack>
        </Box>
        <Divider />
        <Button variant="outlined" onClick={() => {
          setRoles([]);
          setEfficiency(EFFICIENCY_RANGE);
          setDuration(DURATION_RANGE);
          setDateRange(null, null);
        }}>
          Reset filters
        </Button>
      </Stack>
    </Box>
  );
};
