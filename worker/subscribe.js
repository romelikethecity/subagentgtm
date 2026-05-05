/**
 * Cloudflare Worker — subagent/gtm newsletter subscribe endpoint
 *
 * Receives POST { email, list, source? } from the newsletter signup forms
 * and writes the subscriber to D1.
 *
 * We capture in our own database first. Once subscriber count justifies
 * sending, the domain gets verified in Resend and a separate sender Worker
 * reads from this same D1 table.
 *
 * Setup:
 *   1. Create the D1 database:
 *        npx wrangler d1 create subagent-newsletter
 *      Copy the printed `database_id` into wrangler.toml.
 *
 *   2. Apply the schema:
 *        npx wrangler d1 execute subagent-newsletter --file=./schema.sql --remote
 *
 *   3. Deploy the worker:
 *        npx wrangler deploy
 *
 *   4. Copy the deployed worker URL into:
 *        src/pages/newsletter/index.astro          (SIGNUP_URL constant)
 *        src/pages/newsletter/sample/index.astro   (SIGNUP_URL constant)
 *
 *   5. Inspect subscribers any time:
 *        npx wrangler d1 execute subagent-newsletter --remote \
 *          --command="SELECT email, list, source, created_at FROM subscribers ORDER BY created_at DESC LIMIT 50;"
 */

const ALLOWED_ORIGINS = [
  'https://subagentgtm.com',
  'https://www.subagentgtm.com',
  'http://localhost:4321',
  'http://localhost:3000',
];

function corsHeaders(request) {
  const origin = request.headers.get('Origin') || '';
  const allowed = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': allowed,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

function json(request, data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders(request), 'Content-Type': 'application/json' },
  });
}

function isValidEmail(email) {
  if (!email || email.length > 254) return false;
  // Simple shape check; D1 unique constraint catches the rest
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders(request) });
    }

    if (request.method !== 'POST') {
      return json(request, { error: 'Method not allowed' }, 405);
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return json(request, { error: 'Invalid JSON' }, 400);
    }

    const email = (body.email || '').trim().toLowerCase();
    const list = (body.list || 'gtm-triggers-weekly').trim().toLowerCase();
    const source = (body.source || request.headers.get('Referer') || '').slice(0, 500);

    if (!isValidEmail(email)) {
      return json(request, { error: 'Valid email required' }, 400);
    }

    try {
      // Insert; on conflict (same email + list) refresh source + updated_at
      const stmt = env.DB.prepare(
        `INSERT INTO subscribers (email, list, source, created_at, updated_at)
         VALUES (?1, ?2, ?3, datetime('now'), datetime('now'))
         ON CONFLICT(email, list) DO UPDATE SET
           source = excluded.source,
           updated_at = datetime('now'),
           unsubscribed_at = NULL`
      );
      await stmt.bind(email, list, source).run();

      return json(request, { success: true });
    } catch (err) {
      console.error('D1 error:', err && err.message ? err.message : err);
      return json(request, { error: 'Subscription failed' }, 500);
    }
  },
};
