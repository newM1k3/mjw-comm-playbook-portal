import PocketBase from 'pocketbase';

const pbUrl = import.meta.env.VITE_POCKETBASE_URL as string;

if (!pbUrl) {
  throw new Error('Missing VITE_POCKETBASE_URL environment variable');
}

export const pb = new PocketBase(pbUrl);
