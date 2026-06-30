// netlify/functions/claude.js
// Holds your Anthropic key server-side. Visitors call /api/claude and never see the key.
// Setup: Netlify → Site settings → Environment variables → add ANTHROPIC_API_KEY = sk-ant-...
exports.handler = async (event) => {
  const cors = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };
  if (event.httpMethod === 'OPTIONS') return { statusCode: 200, headers: cors, body: '' };
  if (event.httpMethod !== 'POST')
    return { statusCode: 405, headers: cors, body: JSON.stringify({ error: { message: 'POST only' } }) };

  const key = process.env.ANTHROPIC_API_KEY;
  if (!key)
    return { statusCode: 500, headers: cors, body: JSON.stringify({ error: { message: 'Server not configured: set ANTHROPIC_API_KEY in Netlify environment variables.' } }) };

  // Optional: lock the proxy to your own site so other sites can't burn your credits.
  // Set ALLOWED_HOST = jamesmedrano.netlify.app in Netlify env vars to enable.
  const allow = process.env.ALLOWED_HOST;
  if (allow) {
    const ref = (event.headers.origin || event.headers.referer || '');
    if (ref && ref.indexOf(allow) === -1)
      return { statusCode: 403, headers: cors, body: JSON.stringify({ error: { message: 'Origin not allowed.' } }) };
  }

  let p;
  try { p = JSON.parse(event.body || '{}'); }
  catch (_) { return { statusCode: 400, headers: cors, body: JSON.stringify({ error: { message: 'Bad JSON body.' } }) }; }

  // Safety caps to limit per-call cost / abuse
  const body = {
    model: (typeof p.model === 'string' && /^claude-/.test(p.model)) ? p.model : 'claude-sonnet-4-6',
    max_tokens: Math.min(Number(p.max_tokens) || 1000, 1500),
    messages: Array.isArray(p.messages)
      ? p.messages.slice(-12).map(m => ({ role: m.role === 'assistant' ? 'assistant' : 'user', content: String(m.content || '').slice(0, 8000) }))
      : []
  };
  if (typeof p.system === 'string') body.system = p.system.slice(0, 12000);

  try {
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-api-key': key, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify(body)
    });
    const text = await r.text();
    return { statusCode: r.status, headers: cors, body: text };
  } catch (e) {
    return { statusCode: 502, headers: cors, body: JSON.stringify({ error: { message: 'Upstream error: ' + e.message } }) };
  }
};
