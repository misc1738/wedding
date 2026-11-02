import { createClient } from '@supabase/supabase-js';
import { readFile } from 'node:fs/promises';

const envText = await readFile('.env.local', 'utf8');
const env = Object.fromEntries(
  envText
    .split(/\r?\n/)
    .filter((line) => line && !line.startsWith('#'))
    .map((line) => {
      const separator = line.indexOf('=');
      return [line.slice(0, separator), line.slice(separator + 1)];
    }),
);

const required = ['SUPABASE_URL', 'SUPABASE_SECRET_KEY'];
const missing = required.filter((key) => !env[key]);
if (missing.length) {
  throw new Error(`Missing ${missing.join(', ')} in .env.local`);
}

const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_SECRET_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const { error } = await supabase.from('rsvps').select('id').limit(1);
if (error) {
  if (error.code === 'PGRST205') {
    throw new Error(
      'The rsvps table is missing. Run supabase/schema.sql in the Supabase SQL Editor, then rerun this command.',
    );
  }
  throw new Error(`Supabase verification failed: ${error.message}`);
}

console.log('Supabase rsvps table is available.');
