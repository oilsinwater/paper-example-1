import { InteractionSequence } from '../types/epic1';

const CSV_HEADERS = [
  'id',
  'userId',
  'role',
  'timestamp',
  'duration',
  'efficiency',
  'taskType',
  'completionRate',
  'actions',
];

function escapeValue(value: unknown): string {
  if (value === null || value === undefined) return '';
  const serialized = Array.isArray(value) ? value.join('|') : String(value);
  if (serialized.includes(',') || serialized.includes('"')) {
    return `"${serialized.replace(/"/g, '""')}"`;
  }
  return serialized;
}

export function generateCsv(rows: InteractionSequence[]): string {
  const headerRow = CSV_HEADERS.join(',');
  const dataRows = rows.map((row) =>
    [
      row.id,
      row.userId,
      row.role,
      row.timestamp,
      row.duration,
      row.efficiency,
      row.taskType,
      row.completionRate,
      row.actions.join('|'),
    ]
      .map(escapeValue)
      .join(',')
  );
  return [headerRow, ...dataRows].join('\n');
}

export function downloadCsv(filename: string, content: string): void {
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
