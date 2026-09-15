/**
 * Universal CSV Export Utility
 * Formats objects into RFC 4180 compliant CSV and triggers client-side file download.
 */

export function exportToCSV<T extends Record<string, any>>(
  data: T[],
  filename: string = 'export.csv',
  columns?: { key: keyof T; header: string }[]
) {
  if (!data || data.length === 0) {
    console.warn('No data available to export to CSV.');
    return;
  }

  const headers = columns
    ? columns.map((c) => c.header)
    : Object.keys(data[0]);

  const keys = columns
    ? columns.map((c) => c.key)
    : (Object.keys(data[0]) as (keyof T)[]);

  const csvRows: string[] = [];
  csvRows.push(headers.map((h) => `"${String(h).replace(/"/g, '""')}"`).join(','));

  for (const item of data) {
    const values = keys.map((key) => {
      const val = item[key];
      if (val === null || val === undefined) return '""';
      if (typeof val === 'object') {
        return `"${JSON.stringify(val).replace(/"/g, '""')}"`;
      }
      return `"${String(val).replace(/"/g, '""')}"`;
    });
    csvRows.push(values.join(','));
  }

  const blob = new Blob([csvRows.join('\r\n')], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
