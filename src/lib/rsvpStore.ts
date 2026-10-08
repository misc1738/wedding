/**
 * RSVP storage sits behind this adapter so the collection mechanism can change
 * without touching a single component.
 *
 * Responses are submitted to Supabase and mirrored to localStorage so the form
 * still shows a confirmation if the network is briefly unavailable.
 *
 * The admin page can merge responses gathered elsewhere via JSON import.
 */

export type RsvpRecord = {
  id: string;
  reference: string;
  submittedAt: string;
  name: string;
  contact: string;
  attending: 'yes' | 'no';
  guests: number;
  meal: string;
  song: string;
  note: string;
};

export type RsvpInput = Omit<RsvpRecord, 'id' | 'reference' | 'submittedAt'>;

const STORAGE_KEY = 'mw_rsvps_v1';
import { supabase } from './supabase';

function readAll(): RsvpRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item): item is RsvpRecord =>
        typeof item === 'object' && item !== null && 'name' in item,
    );
  } catch {
    return [];
  }
}

function writeAll(records: RsvpRecord[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  } catch {
    /* quota exceeded or storage disabled — the response still shows on screen */
  }
}

function makeReference(): string {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let suffix = '';
  for (let i = 0; i < 5; i += 1) {
    suffix += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return `MW-${suffix}`;
}

export function list(): RsvpRecord[] {
  return readAll().sort((a, b) => b.submittedAt.localeCompare(a.submittedAt));
}

export function save(input: RsvpInput): RsvpRecord {
  const record: RsvpRecord = {
    ...input,
    id:
      typeof crypto !== 'undefined' && 'randomUUID' in crypto
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    reference: makeReference(),
    submittedAt: new Date().toISOString(),
  };

  const all = readAll();
  all.push(record);
  writeAll(all);
  void pushRemote(record);

  return record;
}

async function pushRemote(record: RsvpRecord) {
  try {
    const { error } = await supabase.from('rsvps').upsert({
      id: record.id,
      reference: record.reference,
      submitted_at: record.submittedAt,
      name: record.name,
      contact: record.contact,
      attending: record.attending,
      guests: record.guests,
      meal: record.meal,
      song: record.song,
      note: record.note,
    });
    if (error) throw error;
  } catch (error) {
    console.error('Could not sync RSVP to Supabase.', error);
  }
}

export async function listRemote(): Promise<RsvpRecord[]> {
  const { data, error } = await supabase
    .from('rsvps')
    .select('*')
    .order('submitted_at', { ascending: false });
  if (error) throw error;
  return (data ?? []).map((record) => ({
    id: record.id,
    reference: record.reference,
    submittedAt: record.submitted_at,
    name: record.name,
    contact: record.contact,
    attending: record.attending,
    guests: record.guests,
    meal: record.meal,
    song: record.song,
    note: record.note,
  }));
}

/** Merge externally collected responses, de-duplicating by id or reference. */
export function merge(incoming: RsvpRecord[]): { added: number; skipped: number } {
  const existing = readAll();
  const seenIds = new Set(existing.map((r) => r.id));
  const seenRefs = new Set(existing.map((r) => r.reference));

  let added = 0;
  let skipped = 0;

  for (const record of incoming) {
    const duplicate =
      seenIds.has(record.id) ||
      seenRefs.has(record.reference) ||
      existing.some(
        (r) => r.name.toLowerCase() === record.name.toLowerCase() && r.contact === record.contact,
      );

    if (duplicate) {
      skipped += 1;
      continue;
    }

    existing.push(record);
    seenIds.add(record.id);
    seenRefs.add(record.reference);
    added += 1;
  }

  if (added) writeAll(existing);
  return { added, skipped };
}

export function clearAll() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* nothing to clear */
  }
}

export async function clearRemote() {
  const { error } = await supabase.from('rsvps').delete().not('id', 'is', null);
  if (error) throw error;
}

const CSV_COLUMNS: { key: keyof RsvpRecord; label: string }[] = [
  { key: 'reference', label: 'Reference' },
  { key: 'submittedAt', label: 'Submitted' },
  { key: 'name', label: 'Name' },
  { key: 'contact', label: 'Contact' },
  { key: 'attending', label: 'Attending' },
  { key: 'guests', label: 'Guests' },
  { key: 'meal', label: 'Meal' },
  { key: 'song', label: 'Song request' },
  { key: 'note', label: 'Note' },
];

function csvEscape(value: unknown): string {
  const text = String(value ?? '');
  return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

export function toCsv(records: RsvpRecord[]): string {
  const header = CSV_COLUMNS.map((c) => c.label).join(',');
  const rows = records.map((record) =>
    CSV_COLUMNS.map((c) => csvEscape(record[c.key])).join(','),
  );
  return [header, ...rows].join('\r\n');
}
