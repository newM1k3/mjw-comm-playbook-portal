/**
 * Netlify Function: create-checkout-session
 *
 * Creates a Stripe Checkout session for a PER Playbook purchase.
 * Called by the frontend LockScreen component via POST /api/create-checkout-session.
 *
 * Required environment variables (set in Netlify dashboard):
 *   STRIPE_SECRET_KEY          – Stripe secret key (sk_live_... or sk_test_...)
 *   STRIPE_PUBLISHABLE_KEY     – Stripe publishable key (pk_live_... or pk_test_...)
 *   VITE_POCKETBASE_URL        – PocketBase instance URL (e.g. https://mjwdesign-core.pockethost.io)
 *   POCKETBASE_ADMIN_EMAIL     – PocketBase superuser email
 *   POCKETBASE_ADMIN_PASSWORD  – PocketBase superuser password
 */
import { Handler } from '@netlify/functions';
import Stripe from 'stripe';
import PocketBase from 'pocketbase';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-06-20',
});

const pb = new PocketBase(process.env.VITE_POCKETBASE_URL);

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { playbookId, userId } = JSON.parse(event.body || '{}');

    if (!playbookId || !userId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing playbookId or userId' }),
      };
    }

    // Authenticate as PocketBase admin to read the playbook record
    await pb.admins.authWithPassword(
      process.env.POCKETBASE_ADMIN_EMAIL || '',
      process.env.POCKETBASE_ADMIN_PASSWORD || ''
    );

    // Collection name matches the portal's PocketBase schema: per_playbooks
    const playbook = await pb.collection('per_playbooks').getOne(playbookId);

    if (!playbook) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'Playbook not found' }),
      };
    }

    const origin = event.headers.origin || event.headers.host || 'http://localhost:5173';
    const baseUrl = origin.startsWith('http') ? origin : `https://${origin}`;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: playbook.title,
              description: (playbook.description as string)?.substring(0, 255) ?? '',
            },
            unit_amount: Math.round((playbook.price as number) * 100),
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      metadata: {
        playbookId,
        userId,
      },
      success_url: `${baseUrl}/?per_success=true&playbookId=${playbookId}`,
      cancel_url: `${baseUrl}/?per_canceled=true&playbookId=${playbookId}`,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ sessionId: session.id }),
    };
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error instanceof Error ? error.message : 'Internal Server Error',
      }),
    };
  }
};
