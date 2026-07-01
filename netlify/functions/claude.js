// netlify/functions/claude.js
// AI proxy for the portfolio. Keeps your API key server-side; visitors call /api/claude.
//
// FREE OPTION (recommended): Google Gemini
//   1. Get a free key at https://aistudio.google.com/app/apikey   (no credit card)
//   2. Netlify -> Site settings -> Environment variables -> add GEMINI_API_KEY = your key
//   (optional) GEMINI_MODEL = gemini-2.0-flash   <- change only if a model name is retired
//
// PAID OPTION: Anthropic Claude
//   add ANTHROPIC_API_KEY = sk-ant-...   (used only when no GEMINI_API_KEY is set)

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

  const geminiKey = process.env.GEMINI_API_KEY;
  const anthropicKey = process.env.ANTHROPIC_API_KEY;
  if (!geminiKey && !anthropicKey)
    return { statusCode: 500, headers: cors, body: JSON.stringify({ error: { message: 'Server not configured: add a free GEMINI_API_KEY (or ANTHROPIC_API_KEY) in Netlify environment variables.' } }) };

  // Optional: lock the proxy to your own site so others cannot use your quota.
  const allow = process.env.ALLOWED_HOST;
  if (allow) {
    const ref = (event.headers.origin || event.headers.referer || '');
    if (ref && ref.indexOf(allow) === -1)
      return { statusCode: 403, headers: cors, body: JSON.stringify({ error: { message: 'Origin not allowed.' } }) };
  }

  let p;
  try { p = JSON.parse(event.body || '{}'); }
  catch (_) { return { statusCode: 400, headers: cors, body: JSON.stringify({ error: { message: 'Bad JSON body.' } }) }; }

  const maxTokens = Math.min(Number(p.max_tokens) || 1000, 1500);
  const system = (typeof p.system === 'string') ? p.system.slice(0, 12000) : '';
  const msgs = Array.isArray(p.messages)
    ? p.messages.slice(-12).map(m => ({ role: m.role === 'assistant' ? 'assistant' : 'user', content: String(m.content || '').slice(0, 8000) }))
    : [];

  try {
    // -- Preferred: Google Gemini (free tier) --------------------------
    if (geminiKey) {
      const model = process.env.GEMINI_MODEL || 'gemini-2.0-flash';
      const gBody = {
        contents: msgs.map(m => ({
          role: m.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: m.content }]
        })),
        generationConfig: { maxOutputTokens: maxTokens }
      };
      if (system) gBody.systemInstruction = { parts: [{ text: system }] };

      const gUrl = 'https://generativelanguage.googleapis.com/v1beta/models/' +
        encodeURIComponent(model) + ':generateContent?key=' + encodeURIComponent(geminiKey);
      const gr = await fetch(gUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(gBody)
      });
      const gd = await gr.json().catch(() => ({}));
      if (!gr.ok) {
        const gm = (gd.error && gd.error.message) || ('Gemini HTTP ' + gr.status);
        return { statusCode: gr.status, headers: cors, body: JSON.stringify({ error: { message: gm } }) };
      }
      let text = '';
      if (gd.candidates && gd.candidates[0] && gd.candidates[0].content && gd.candidates[0].content.parts) {
        text = gd.candidates[0].content.parts.map(x => x.text || '').join('');
      }
      if (!text) text = 'AI returned an empty response. Please try again.';
      // Return in the Anthropic shape the front-end already understands.
      return { statusCode: 200, headers: cors, body: JSON.stringify({ content: [{ type: 'text', text: text }] }) };
    }

    // -- Fallback: Anthropic Claude ------------------------------------
    const body = {
      model: (typeof p.model === 'string' && /^claude-/.test(p.model)) ? p.model : 'claude-sonnet-4-6',
      max_tokens: maxTokens,
      messages: msgs
    };
    if (system) body.system = system;
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-api-key': anthropicKey, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify(body)
    });
    const t = await r.text();
    return { statusCode: r.status, headers: cors, body: t };
  } catch (e) {
    return { statusCode: 502, headers: cors, body: JSON.stringify({ error: { message: 'Upstream error: ' + e.message } }) };
  }
};
