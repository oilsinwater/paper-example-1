import {
  Card,
  CardContent,
  Chip,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import dayjs from 'dayjs';
import React from 'react';
import { InteractionSequence } from '../../types/epic1';

interface DataCardProps {
  sequence: InteractionSequence;
}

export const DataCard: React.FC<DataCardProps> = ({ sequence }) => {
  const theme = useTheme();
  return (
    <Card
      variant="outlined"
      sx={{
        height: '100%',
        transition: 'border 0.2s ease',
        '&:hover': {
          borderColor: theme.palette.primary.main,
          boxShadow: theme.shadows[2],
        },
      }}
    >
      <CardContent>
        <Stack spacing={1.5}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant="h6" component="h3">
              {sequence.taskType}
            </Typography>
            <Chip label={sequence.role} size="small" color="primary" />
          </Stack>
          <Typography variant="body2" color="text.secondary">
            {dayjs(sequence.timestamp).format('MMM D, YYYY • h:mm A')}
          </Typography>
          <Stack direction="row" spacing={2}>
            <Stack>
              <Typography variant="caption" color="text.secondary">
                Duration
              </Typography>
              <Typography variant="body2">{Math.round(sequence.duration / 60)} min</Typography>
            </Stack>
            <Stack>
              <Typography variant="caption" color="text.secondary">
                Efficiency
              </Typography>
              <Typography variant="body2">
                {(sequence.efficiency * 100).toFixed(0)}%
              </Typography>
            </Stack>
            <Stack>
              <Typography variant="caption" color="text.secondary">
                Completion
              </Typography>
              <Typography variant="body2">
                {(sequence.completionRate * 100).toFixed(0)}%
              </Typography>
            </Stack>
          </Stack>
          <Stack spacing={0.5}>
            <Typography variant="caption" color="text.secondary">
              Recent actions
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap">
              {sequence.actions.map((action) => (
                <Chip key={action} label={action} size="small" variant="outlined" />
              ))}
            </Stack>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};
