import PocketBase from 'pocketbase';

const pbUrl = import.meta.env.VITE_POCKETBASE_URL as string;

if (!pbUrl) {
  throw new Error('Missing VITE_POCKETBASE_URL environment variable');
}

export const pb = new PocketBase(pbUrl);

// Disable auto-cancellation globally.
// React 18 StrictMode double-invokes effects, and Promise.all over multiple
// simultaneous queries triggers the SDK's duplicate-detection heuristic,
// producing ClientResponseError 0 ("request was autocancelled") noise.
pb.autoCancellation(false);

// Global response interceptor — if PocketBase returns 401 or 403 on any
// request, clear the local auth store and dispatch a custom DOM event so
// AuthContext can force a logout and redirect to /login instead of leaving
// the user staring at an infinite spinner.
pb.beforeSend = (url, options) => {
  return { url, options };
};

pb.afterSend = (response, data) => {
  if (response.status === 401 || response.status === 403) {
    pb.authStore.clear();
    window.dispatchEvent(new CustomEvent('pb:authError', { detail: { status: response.status } }));
  }
  return data;
};

/**
 * ensureAuth — call this before every PocketBase write operation.
 *
 * Proactively refreshes the auth token so that a session that has been idle
 * (e.g., the user left the tab open overnight) does not produce a 403 on the
 * next create/update/delete call.  If the token is genuinely expired and the
 * refresh fails, it clears the store and throws so the caller can surface an
 * error rather than silently failing.
 */
export async function ensureAuth(): Promise<void> {
  if (!pb.authStore.isValid) {
    throw new Error('Not authenticated. Please sign in again.');
  }
  try {
    await pb.collection('users').authRefresh({ $autoCancel: false });
  } catch {
    pb.authStore.clear();
    throw new Error('Your session has expired. Please sign in again.');
  }
}
