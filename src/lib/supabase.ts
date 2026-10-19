import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export const isSupabaseConfigured = Boolean(url && key);

// Keep the public site renderable when Supabase is not configured. Features
// that require the client report their configuration error at the call site.
export const supabase = createClient(
  url || 'https://placeholder.supabase.co',
  key || 'placeholder-publishable-key',
);
