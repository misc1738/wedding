import { ADMIN } from '../config/site';

const SESSION_KEY = 'mw_admin_unlocked';

/**
 * A deterrent, not authentication: this runs entirely in the guest's browser,
 * so anyone comfortable reading the bundle gets past it. Treat it accordingly.
 */
export async function verifyPasscode(input: string): Promise<boolean> {
  const trimmed = input.trim();
  if (!trimmed) return false;

  const digest = await crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(trimmed),
  );
  const hex = Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');

  const ok = hex === ADMIN.passcodeHash;
  if (ok) sessionStorage.setItem(SESSION_KEY, '1');
  return ok;
}

export function isUnlocked(): boolean {
  try {
    return sessionStorage.getItem(SESSION_KEY) === '1';
  } catch {
    return false;
  }
}

export function lock() {
  try {
    sessionStorage.removeItem(SESSION_KEY);
  } catch {
    /* storage unavailable — nothing to clear */
  }
}
