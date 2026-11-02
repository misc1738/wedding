import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseKeys = [
  process.env.SUPABASE_SECRET_KEY,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  process.env.SUPABASE_PUBLISHABLE_KEY,
  process.env.VITE_SUPABASE_PUBLISHABLE_KEY,
].filter(Boolean);

function isValidRsvp(value) {
  return (
    value &&
    typeof value === 'object' &&
    typeof value.id === 'string' &&
    typeof value.reference === 'string' &&
    typeof value.submitted_at === 'string' &&
    typeof value.name === 'string' &&
    typeof value.contact === 'string' &&
    (value.attending === 'yes' || value.attending === 'no') &&
    Number.isInteger(value.guests) &&
    value.guests >= 0 &&
    value.guests <= 6 &&
    typeof value.guest_names === 'string' &&
    typeof value.meal === 'string' &&
    typeof value.dietary === 'string' &&
    typeof value.song === 'string' &&
    typeof value.note === 'string' &&
    value.name.trim().length >= 2 &&
    value.contact.trim().length > 0
  );
}

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return response.status(405).json({ error: 'Method not allowed.' });
  }

  if (!supabaseUrl || supabaseKeys.length === 0) {
    console.error('RSVP endpoint is missing Supabase server configuration.');
    return response.status(503).json({ error: 'RSVP service is not configured.' });
  }

  if (!isValidRsvp(request.body)) {
    return response.status(400).json({ error: 'Invalid RSVP data.' });
  }

  let error;
  for (const key of supabaseKeys) {
    const supabase = createClient(supabaseUrl, key, {
      auth: { autoRefreshToken: false, persistSession: false },
    });
    let result = await supabase.from('rsvps').insert(request.body);
    if (
      result.error?.code === 'PGRST204' &&
      result.error.message.includes("'dietary' column")
    ) {
      const { dietary: _dietary, guest_names: _guestNames, ...legacyPayload } =
        request.body;
      result = await supabase.from('rsvps').insert(legacyPayload);
    }
    if (!result.error) {
      return response.status(201).json({ ok: true });
    }
    error = result.error;
  }

  if (error) {
    console.error('Could not save RSVP to Supabase.', {
      code: error.code,
      message: error.message,
      details: error.details,
      hint: error.hint,
    });
    return response.status(502).json({ error: 'Could not save RSVP.' });
  }
}
