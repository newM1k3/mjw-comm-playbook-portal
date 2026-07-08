/**
 * Netlify Function: stripe-webhook
 *
 * Receives Stripe webhook events and records completed purchases in PocketBase.
 * On a successful checkout.session.completed event, it creates a record in the
 * per_playbook_purchases collection, which the usePerPlaybookAccess hook queries
 * to grant the user access to the purchased playbook.
 *
 * Required environment variables (set in Netlify dashboard):
 *   STRIPE_SECRET_KEY          – Stripe secret key (sk_live_... or sk_test_...)
 *   STRIPE_WEBHOOK_SECRET      – Stripe webhook signing secret (whsec_...)
 *   VITE_POCKETBASE_URL        – PocketBase instance URL (e.g. https://mjwdesign-core.pockethost.io)
 *   POCKETBASE_ADMIN_EMAIL     – PocketBase superuser email
 *   POCKETBASE_ADMIN_PASSWORD  – PocketBase superuser password
 *
 * Stripe webhook setup:
 *   1. In the Stripe dashboard, create a webhook endpoint pointing to:
 *      https://<your-netlify-domain>/api/stripe-webhook
 *   2. Subscribe to the event: checkout.session.completed
 *   3. Copy the signing secret into the STRIPE_WEBHOOK_SECRET env var.
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

  const sig = event.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig || !webhookSecret) {
    return { statusCode: 400, body: 'Missing signature or webhook secret' };
  }

  let stripeEvent: Stripe.Event;

  try {
    stripeEvent = stripe.webhooks.constructEvent(event.body || '', sig, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return {
      statusCode: 400,
      body: `Webhook Error: ${err instanceof Error ? err.message : 'Unknown'}`,
    };
  }

  if (stripeEvent.type === 'checkout.session.completed') {
    const session = stripeEvent.data.object as Stripe.Checkout.Session;
    const playbookId = session.metadata?.playbookId;
    const userId = session.metadata?.userId;

    if (playbookId && userId) {
      try {
        // Authenticate as PocketBase admin to write the purchase record
        await pb.admins.authWithPassword(
          process.env.POCKETBASE_ADMIN_EMAIL || '',
          process.env.POCKETBASE_ADMIN_PASSWORD || ''
        );

        // Collection name matches the portal's usePerPlaybookAccess hook: per_playbook_purchases
        await pb.collection('per_playbook_purchases').create({
          user_id: userId,
          playbook_id: playbookId,
          stripe_session_id: session.id,
          purchase_date: new Date().toISOString(),
        });

        console.log(`Successfully unlocked per_playbook ${playbookId} for user ${userId}`);
      } catch (dbError) {
        console.error('Failed to create purchase record in PocketBase:', dbError);
        return { statusCode: 500, body: 'Database error' };
      }
    }
  }

  return { statusCode: 200, body: JSON.stringify({ received: true }) };
};
