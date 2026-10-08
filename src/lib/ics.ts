export type CalendarEvent = {
  title: string;
  start: string;
  end: string;
  location?: string;
  description?: string;
};

/** 2026-11-26T10:00:00+03:00 -> 20261126T070000Z */
function toIcsDate(iso: string): string {
  return new Date(iso).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
}

function escapeText(value: string): string {
  return value
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\r?\n/g, '\\n');
}

function fold(line: string): string {
  // ICS lines should not exceed 75 octets; split conservatively on characters.
  if (line.length <= 74) return line;
  const parts: string[] = [];
  let rest = line;
  parts.push(rest.slice(0, 74));
  rest = rest.slice(74);
  while (rest.length > 73) {
    parts.push(' ' + rest.slice(0, 73));
    rest = rest.slice(73);
  }
  if (rest.length) parts.push(' ' + rest);
  return parts.join('\r\n');
}

export function buildIcs(events: CalendarEvent[], productId = '-//Mutua and Wahito//Wedding//EN'): string {
  const stamp = toIcsDate(new Date().toISOString());

  const body = events
    .map((event, index) => {
      const lines = [
        'BEGIN:VEVENT',
        `UID:wedding-${index + 1}@mutua-and-wahito`,
        `DTSTAMP:${stamp}`,
        `DTSTART:${toIcsDate(event.start)}`,
        `DTEND:${toIcsDate(event.end)}`,
        `SUMMARY:${escapeText(event.title)}`,
      ];

      if (event.location) lines.push(`LOCATION:${escapeText(event.location)}`);
      if (event.description) lines.push(`DESCRIPTION:${escapeText(event.description)}`);
      lines.push('END:VEVENT');

      return lines.map(fold).join('\r\n');
    })
    .join('\r\n');

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    `PRODID:${productId}`,
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    body,
    'END:VCALENDAR',
    '',
  ].join('\r\n');
}

function downloadBlob(content: string, filename: string, mime: string) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  // Revoke on the next tick so Safari has time to start the download.
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function downloadIcs(events: CalendarEvent[], filename = 'mutua-and-wahito.ics') {
  downloadBlob(buildIcs(events), filename, 'text/calendar;charset=utf-8');
}

export function downloadText(content: string, filename: string, mime: string) {
  downloadBlob(content, filename, mime);
}
