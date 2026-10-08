import { useMemo, useRef, useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { isUnlocked, lock, verifyPasscode } from '../lib/admin';
import { clearAll, list, merge, toCsv, type RsvpRecord } from '../lib/rsvpStore';
import { downloadText } from '../lib/ics';
import { ADMIN, couple } from '../config/site';

type ImportOutcome = { added: number; skipped: number } | null;

export default function Admin() {
  const [unlocked, setUnlocked] = useState(() => isUnlocked());
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [version, setVersion] = useState(0);
  const [importOutcome, setImportOutcome] = useState<ImportOutcome>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const records = useMemo<RsvpRecord[]>(() => list(), [version]);

  const stats = useMemo(() => {
    const attending = records.filter((r) => r.attending === 'yes');
    return {
      total: records.length,
      attending: attending.length,
      declined: records.filter((r) => r.attending === 'no').length,
      seats: attending.reduce((sum, r) => sum + r.guests, 0),
    };
  }, [records]);

  const onUnlock = async (event: FormEvent) => {
    event.preventDefault();
    setBusy(true);
    setError('');
    const ok = await verifyPasscode(passcode);
    setBusy(false);
    if (ok) {
      setUnlocked(true);
      setPasscode('');
    } else {
      setError('That passcode is not right.');
    }
  };

  const onImport = async (file: File) => {
    try {
      const parsed: unknown = JSON.parse(await file.text());
      if (!Array.isArray(parsed)) throw new Error('Expected an array');
      const outcome = merge(parsed as RsvpRecord[]);
      setImportOutcome(outcome);
      setVersion((v) => v + 1);
    } catch {
      setImportOutcome(null);
      window.alert('That file could not be read as a JSON array of responses.');
    } finally {
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  /* ── Locked ─────────────────────────────────────────────── */
  if (!unlocked) {
    return (
      <main className="flex min-h-[100svh] flex-col items-center justify-center bg-field px-6 text-cream">
        <form
          onSubmit={onUnlock}
          className="w-full max-w-sm border border-gold/45 bg-field-deep/60 p-8 text-center backdrop-blur-sm"
        >
          <p className="eyebrow text-gold-light/80">Private</p>
          <h1 className="mt-4 font-script text-4xl text-cream">
            Couple’s dashboard
          </h1>
          <div className="hairline mx-auto my-5 w-24" aria-hidden="true" />

          <label htmlFor="passcode" className="sr-only">
            Passcode
          </label>
          <input
            id="passcode"
            type="password"
            inputMode="numeric"
            autoComplete="off"
            className="field-input text-center tracking-[0.5em]"
            placeholder="••••••"
            value={passcode}
            onChange={(e) => setPasscode(e.target.value)}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? 'passcode-error' : 'passcode-hint'}
          />

          {error ? (
            <p id="passcode-error" className="mt-2 text-sm text-blush-deep">
              {error}
            </p>
          ) : (
            <p id="passcode-hint" className="mt-2 text-xs italic text-cream/45">
              {ADMIN.hint}
            </p>
          )}

          <button
            type="submit"
            className="btn-gold btn-gold--solid mt-6 w-full"
            disabled={busy}
          >
            {busy ? 'Checking…' : 'Unlock'}
          </button>

          <Link to="/" className="eyebrow mt-6 inline-block text-cream/45 hover:text-gold-light">
            Back to the site
          </Link>
        </form>
      </main>
    );
  }

  /* ── Unlocked ───────────────────────────────────────────── */
  return (
    <main className="min-h-[100svh] bg-cream px-4 py-10 md:px-8">
      <div className="mx-auto max-w-5xl">
        <header className="flex flex-wrap items-end justify-between gap-4 border-b border-gold/40 pb-6">
          <div>
            <p className="eyebrow text-gold-deep">Private</p>
            <h1 className="mt-2 font-script text-4xl text-field-deep">
              {couple.display} · RSVPs
            </h1>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              className="btn-gold"
              onClick={() => downloadText(toCsv(records), 'rsvps.csv', 'text/csv;charset=utf-8')}
              disabled={records.length === 0}
            >
              Export CSV
            </button>
            <button
              type="button"
              className="btn-gold"
              onClick={() => fileRef.current?.click()}
            >
              Import JSON
            </button>
            <button
              type="button"
              className="btn-gold"
              onClick={() => {
                lock();
                setUnlocked(false);
              }}
            >
              Lock
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="application/json,.json"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) void onImport(file);
              }}
            />
          </div>
        </header>

        {/* Stats */}
        <section className="mt-7 grid grid-cols-2 gap-3 md:grid-cols-4">
          {[
            ['Responses', stats.total],
            ['Attending', stats.attending],
            ['Declined', stats.declined],
            ['Seats', stats.seats],
          ].map(([label, value]) => (
            <div key={String(label)} className="border border-gold/35 bg-white/60 p-4 text-center">
              <p className="font-serif text-3xl text-field-deep tabular-nums">{value}</p>
              <p className="eyebrow mt-1 text-gold-deep">{label}</p>
            </div>
          ))}
        </section>

        <p className="mt-4 rounded border border-gold/30 bg-white/50 px-4 py-3 text-sm text-ink/70">
          Responses are stored in this browser. Use <strong>Export CSV</strong> to
          save a copy, or <strong>Import JSON</strong> to merge replies gathered on
          another device.
        </p>

        {importOutcome ? (
          <p className="mt-3 border border-sage/60 bg-sage/20 px-4 py-3 text-sm text-field-deep">
            Imported: {importOutcome.added} new, {importOutcome.skipped} already
            present.
          </p>
        ) : null}

        {/* Table */}
        <div className="mt-7 overflow-x-auto border border-gold/35 bg-white/70">
          {records.length === 0 ? (
            <p className="px-6 py-14 text-center italic text-ink/55">
              No responses yet. They will appear here as guests submit the form.
            </p>
          ) : (
            <table className="w-full min-w-[52rem] border-collapse text-left text-[0.95rem]">
              <thead>
                <tr className="border-b border-gold/40 bg-cream-warm/70">
                  {['Ref', 'Name', 'Contact', 'Attending', 'Party', 'Meal', 'Song', 'Note'].map(
                    (head) => (
                      <th key={head} className="eyebrow px-3 py-3 text-gold-deep">
                        {head}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {records.map((record) => (
                  <tr key={record.id} className="border-b border-gold/20 align-top">
                    <td className="px-3 py-3 font-mono text-[0.85rem] text-gold-deep">
                      {record.reference}
                    </td>
                    <td className="px-3 py-3 text-field-deep">{record.name}</td>
                    <td className="px-3 py-3 text-ink/75">{record.contact}</td>
                    <td className="px-3 py-3">
                      <span
                        className={`inline-block border px-2 py-0.5 text-[0.8rem] ${
                          record.attending === 'yes'
                            ? 'border-sage bg-sage/25 text-field-deep'
                            : 'border-dusty bg-dusty/25 text-plum'
                        }`}
                      >
                        {record.attending === 'yes' ? 'Yes' : 'No'}
                      </span>
                    </td>
                    <td className="px-3 py-3 tabular-nums">{record.guests || '—'}</td>
                    <td className="px-3 py-3">{record.meal || '—'}</td>
                    <td className="px-3 py-3">{record.song || '—'}</td>
                    <td className="max-w-[16rem] px-3 py-3 text-ink/75">{record.note || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <footer className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <Link to="/" className="eyebrow text-gold-deep hover:text-field-deep">
            ← Back to the site
          </Link>
          {records.length > 0 ? (
            <button
              type="button"
              className="text-sm text-ink/45 underline decoration-dotted underline-offset-4 hover:text-plum"
              onClick={() => {
                if (window.confirm('Delete every response stored in this browser?')) {
                  clearAll();
                  setVersion((v) => v + 1);
                }
              }}
            >
              Clear all responses from this browser
            </button>
          ) : null}
        </footer>
      </div>
    </main>
  );
}
