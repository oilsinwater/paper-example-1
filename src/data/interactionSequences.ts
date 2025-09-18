import { InteractionSequence, UserRole } from '../types/epic1';

const ROLES: UserRole[] = ['novice', 'intermediate', 'expert'];
const TASK_TYPES = [
  'data-cleanup',
  'anomaly-detection',
  'report-synthesis',
  'validation-run',
  'trend-analysis',
  'annotation-review',
];

function generateSequence(index: number): InteractionSequence {
  const role = ROLES[index % ROLES.length];
  const duration = 120 + (index * 7) % 3600;
  const efficiency = 0.45 + ((index * 13) % 50) / 100;
  const completionRate = 0.5 + ((index * 19) % 40) / 100;
  const baseDate = new Date(2024, (index * 3) % 12, ((index * 5) % 27) + 1, index % 24, (index * 11) % 60);
  return {
    id: `seq-${index + 1}`,
    userId: `user-${(index % 100) + 1}`,
    role,
    timestamp: baseDate.toISOString(),
    duration,
    actions: [
      'ingest-dataset',
      index % 2 === 0 ? 'normalize-values' : 'compute-baseline',
      index % 3 === 0 ? 'detect-outliers' : 'score-efficiency',
    ],
    efficiency: Number(efficiency.toFixed(2)),
    taskType: TASK_TYPES[index % TASK_TYPES.length],
    completionRate: Number(Math.min(completionRate, 0.99).toFixed(2)),
  };
}

export const interactionSequences: InteractionSequence[] = Array.from({ length: 6000 }, (_, index) =>
  generateSequence(index)
);
