(function(){
'use strict';

/* ── ANTHROPIC API KEY ─────────────────────────────────────────────
   Paste your key from https://console.anthropic.com/settings/keys
   Then save and re-upload index.html to Netlify.
─────────────────────────────────────────────────────────────────── */
var API_KEY = '';
if (!API_KEY) { var _sk = sessionStorage.getItem('jemApiKey'); if (_sk) API_KEY = _sk; }

/* ═══════════════════════════════════════════════
   JAMES EARL MEDRANO — Context for Claude AI
═══════════════════════════════════════════════ */
var JC = "You are an AI career assistant embedded in James Earl Medrano's portfolio and Job Hunter Dashboard. " +
"Always answer helpfully and accurately based on his real background.\n\n" +
"PROFILE: James Earl Medrano | AI Automation VA | Location: Malate, Manila, PH | Status: Open to Work\n" +
"Education: BS IT, Pamantasan ng Lungsod ng Maynila (PLM), 2025\n" +
"Niche: AI Automation VA — builds n8n workflows, Zapier automations, Claude/OpenAI API integrations, Notion systems.\n" +
"Services: Email triage, lead routing, report generation, content pipelines, CRM sync, client onboarding automation.\n" +
"Availability: Freelance projects, part-time VA, full-time remote. PHT timezone, overlaps US/AU/EU. Available immediately.\n" +
"Rate: PHP 35,000-55,000/month local | USD 800-1,200/month remote | Project-based negotiable.\n" +
"Email: Workwitheaaarl@gmail.com | Phone: +63 976 318 9033\n" +
"GitHub: github.com/youngNwis31 | LinkedIn: linkedin.com/in/james-earl-medrano-49b303394/\n" +
"Facebook: facebook.com/eaarlsuuu | Instagram: @eaarlsu | X: @eaarlsuu\n\n" +
"CURRENT STATUS: Contract at Innodata ended May 2026. Actively interviewing. Available immediately.\n\n" +
"EXPERIENCE:\n" +
"1. A.I. Analyst II (LLM) - Innodata Knowledge Services, Jan-May 2026, Cebu.\n" +
"   Engineered 200+ prompt templates weekly, improved LLM accuracy, reduced hallucinations.\n" +
"   Delivered data annotation and model comparisons for supervised fine-tuning pipelines.\n" +
"   Identified model vulnerabilities in adversarial testing; findings used in production updates.\n" +
"2. IT Support and Case Resolution - Alorica Teleservices, Jan 2025-Jan 2026, Makati.\n" +
"   Handled financial data security for international credit card company Asia-Pacific operations.\n" +
"   Built Power BI dashboards and Excel reports adopted for weekly team performance reviews.\n" +
"   Ensured audit-ready data privacy compliance across all CRM case resolutions.\n" +
"3. Jr. Technical Support - BESPOKE IT Project Corp., Feb-Jul 2024, Makati.\n" +
"   Deployed secure enterprise environments: workstations, POS, servers, firewalls for CBD clients.\n" +
"   Authored troubleshooting runbooks that reduced repeat issue resolution time.\n\n" +
"SKILLS: Prompt Engineering 92%, Data Annotation 90%, LLM Evaluation 88%, AI QA 85%,\n" +
"Troubleshooting 90%, Advanced Excel 88%, Documentation 86%, Power BI 84%,\n" +
"Networks 82%, Data Privacy 82%, CRM 80%, Cybersecurity 78%\n\n" +
"SALARY TARGET: PHP 35,000-60,000/month (remote roles command higher).\n" +
"AVAILABILITY: Immediate. Full-time, remote, hybrid, freelance.\n" +
"LANGUAGES: Filipino (native), English (professional).";

/* ═══ CLAUDE API ═══ */
async function callClaude(prompt, systemOverride) {
  try {
    var r = await fetch((window.AI_ENDPOINT||'/api/claude'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': getKey(),
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 1000,
        system: systemOverride || JC,
        messages: [{ role: 'user', content: prompt }]
      })
    });
    var d; try { d = await r.json(); } catch(_) { d = {}; }
    if (!r.ok || d.error) {
      var em = (d.error && d.error.message) || ('HTTP ' + r.status);
      if (r.status === 404 || r.status === 405) return 'Live AI is not set up on this host yet. Deploy to Netlify with the included Claude function and it works for everyone \u2014 no key needed.';
      if (r.status === 500 && /configured|ANTHROPIC/i.test(em)) return 'Almost there \u2014 add ANTHROPIC_API_KEY in Netlify (Site settings \u2192 Environment variables), then redeploy.';
      if (r.status === 401 || r.status === 403) return 'Server key rejected. Check the ANTHROPIC_API_KEY value in your Netlify environment variables.';
      if (r.status === 429) return 'The AI is busy (rate limit). Please try again in a moment.';
      return 'AI error ' + r.status + ': ' + em;
    }
    return (d.content && d.content[0] && d.content[0].text) ? d.content[0].text : 'AI unavailable. Please try again.';
  } catch(e) {
    return 'Could not reach the AI service. If you opened the local file, note the live demos only run on your deployed Netlify site (no key needed there).';
  }
}

function aiOut(id, text, loading) {
  var el = document.getElementById(id);
  if (!el) return;
  if (loading) {
    el.className = 'ai-out show loading';
    el.textContent = '';
    return;
  }
  el.className = 'ai-out show';
  var d = document.createElement('div');
  d.style.cssText = 'white-space:pre-wrap;word-break:break-word';
  d.textContent = text;
  var cb = document.createElement('button');
  cb.className = 'aicopy';
  cb.textContent = 'Copy';
  cb.onclick = function() {
    if (navigator.clipboard) navigator.clipboard.writeText(text).then(function() {
      cb.textContent = 'Copied!';
      setTimeout(function() { cb.textContent = 'Copy'; }, 2000);
    });
  };
  el.innerHTML = '';
  el.appendChild(d);
  el.appendChild(cb);
}

window.aiQ = async function(prompt, outId) {
  aiOut(outId, '', true);
  var r = await callClaude(prompt);
  aiOut(outId, r, false);
};

/* ═══ PAGE TABS ═══ */
// ── navTo: switch to portfolio page then scroll to section ──────────
window.navTo = function(sectionId) {
  // Check if we're on any non-portfolio page
  var notPortfolio = !document.getElementById('page-portfolio').classList.contains('act');
  if (notPortfolio) {
    window.switchTab('portfolio');
    setTimeout(function() {
      var el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  } else {
    var el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }
};

window.switchTab = function(tab) {
  document.querySelectorAll('.page').forEach(function(p) { p.classList.remove('act'); });
  document.querySelectorAll('.ntab').forEach(function(t) { t.classList.remove('act'); });
  document.querySelectorAll('.mmen-tab').forEach(function(t) { t.classList.remove('act'); });
  var pg = document.getElementById('page-' + tab);
  if (pg) pg.classList.add('act');
  var tb = document.getElementById('tab-' + tab);
  if (tb) tb.classList.add('act');
  var mt = document.getElementById('mmt-' + tab);
  if (mt) mt.classList.add('act');
  document.body.classList.toggle('dash-active', tab === 'dashboard');
  if (tab === 'dashboard') {
    document.body.classList.add('dash-active');
    setTimeout(animDashBars, 200);
    setTimeout(function(){ showDPage('overview'); }, 50);
  } else if (tab === 'playground') {
    document.body.classList.remove('dash-active');
  } else {
    document.body.classList.remove('dash-active');
    // Highlight Home tab when switching back to portfolio
    document.querySelectorAll('.mob-tab').forEach(function(t){t.classList.remove('act');});
    var hTab = document.getElementById('mobt-home');
    if (hTab) hTab.classList.add('act');
  }
  window.scrollTo(0, 0);
};

/* ═══ SWITCH TO DASHBOARD + SPECIFIC PANEL ═══ */
window.switchDPage = function(panelId) {
  switchTab('dashboard');
  setTimeout(function() { showDPage(panelId); }, 100);
};

/* ═══ PORTFOLIO PAGE CHAT (Ask James's AI) ═══ */
(function() {
  var msgs = document.getElementById('portfolio-chat-msgs');
  var inp = document.getElementById('portfolio-chat-inp');
  var sendBtn = document.getElementById('portfolio-chat-send');
  var typing = document.getElementById('portfolio-chat-typing');

  function addMsg(text, isUser) {
    var wrap = document.createElement('div');
    wrap.style.cssText = 'display:flex;gap:8px;align-items:flex-end' + (isUser ? ';flex-direction:row-reverse' : '');
    var av = document.createElement('div');
    av.style.cssText = 'width:26px;height:26px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;flex-shrink:0;border:1px solid var(--line)';
    av.style.background = isUser ? 'linear-gradient(135deg,rgba(0,240,255,.1),rgba(155,77,255,.1))' : 'linear-gradient(135deg,rgba(0,240,255,.14),rgba(155,77,255,.14))';
    av.textContent = isUser ? '👤' : '🤖';
    var bub = document.createElement('div');
    bub.style.cssText = 'max-width:480px;padding:9px 13px;font-size:12px;line-height:1.65;font-weight:300;';
    if (isUser) {
      bub.style.cssText += 'background:linear-gradient(135deg,rgba(0,240,255,.1),rgba(155,77,255,.1));border:1px solid var(--lc);border-radius:8px 0 8px 8px;color:var(--cyan)';
    } else {
      bub.style.cssText += 'background:var(--panel);border:1px solid var(--line);border-radius:0 8px 8px 8px;color:var(--txt)';
    }
    bub.style.whiteSpace = 'pre-wrap';
    bub.style.wordBreak = 'break-word';
    bub.textContent = text;
    wrap.appendChild(av);
    wrap.appendChild(bub);
    msgs.appendChild(wrap);
    msgs.scrollTop = msgs.scrollHeight;
  }

  window.portfolioChat = function(q) {
    if (!q) q = inp.value.trim();
    if (!q) return;
    inp.value = '';
    addMsg(q, true);
    if (typing) typing.style.display = 'block';
    callClaude(q).then(function(r) {
      if (typing) typing.style.display = 'none';
      addMsg(r, false);
    });
  };

  if (sendBtn) {
    sendBtn.addEventListener('click', function() { portfolioChat(null); });
  }
  if (inp) {
    inp.addEventListener('keydown', function(e) { if (e.key === 'Enter') portfolioChat(null); });
  }
})();

document.querySelectorAll('.ntab').forEach(function(t) {
  t.addEventListener('click', function() { switchTab(t.dataset.tab); });
});

/* ═══ DASHBOARD SIDEBAR NAV ═══ */
function showDPage(id) {
  document.querySelectorAll('.dpage').forEach(function(p) { p.classList.remove('act'); });
  document.querySelectorAll('.dsi').forEach(function(s) { s.classList.remove('act'); });
  var dp = document.getElementById('dp-' + id);
  if (dp) dp.classList.add('act');
  var si = document.querySelector('[data-dp="' + id + '"]');
  if (si) si.classList.add('act');
  var dm = document.getElementById('dmain');
  if (dm) dm.scrollTop = 0;
}
document.querySelectorAll('.dsi').forEach(function(s) {
  s.addEventListener('click', function() { showDPage(s.dataset.dp); });
});

/* ═══ BACK / HOME NAV on every tool panel ═══ */
(function(){
  document.querySelectorAll('.dpage').forEach(function(p){
    if (p.id === 'dp-overview') return;
    if (p.querySelector('.tool-backnav')) return;
    var bar = document.createElement('div');
    bar.className = 'tool-backnav';
    bar.style.cssText = 'display:flex;gap:8px;margin-bottom:14px';
    var back = document.createElement('button');
    back.className = 'btn bg'; back.style.cssText = 'padding:6px 12px;font-size:10px';
    back.textContent = '\u2190 All Tools';
    back.addEventListener('click', function(){ showDPage('overview'); });
    var home = document.createElement('button');
    home.className = 'btn bg'; home.style.cssText = 'padding:6px 12px;font-size:10px';
    home.textContent = '\uD83C\uDFE0 Home';
    home.addEventListener('click', function(){ if(window.switchTab) window.switchTab('portfolio'); window.scrollTo(0,0); });
    bar.appendChild(back); bar.appendChild(home);
    p.insertBefore(bar, p.firstChild);
  });
})();

/* ═══ HEX CANVAS BACKGROUND ═══ */
var hexC = document.getElementById('hex');
var hctx = hexC ? hexC.getContext('2d') : null;
var HW, HH, ht = 0;
function rsz() { if (hexC) { HW = hexC.width = innerWidth; HH = hexC.height = innerHeight; } }
rsz();
addEventListener('resize', rsz);
function drawHex() {
  if (!hctx) return;
  hctx.clearRect(0, 0, HW, HH);
  var S = 36, rows = Math.ceil(HH / (S * 1.73)) + 2, cols = Math.ceil(HW / (S * 2)) + 2;
  for (var r = -1; r < rows; r++) {
    for (var c = -1; c < cols; c++) {
      var x = c * S * 1.73 + (r % 2) * S * 0.865, y = r * S * 1.5;
      var dist = Math.sqrt((x - HW * 0.5) * (x - HW * 0.5) + (y - HH * 0.5) * (y - HH * 0.5));
      var wave = Math.sin(dist * 0.01 - ht * 0.7) * 0.5 + 0.5;
      var alpha = wave * 0.03 + 0.004;
      var pts = [];
      for (var i = 0; i < 6; i++) {
        var a = Math.PI / 3 * i - Math.PI / 6;
        pts.push([x + S * 0.88 * Math.cos(a), y + S * 0.88 * Math.sin(a)]);
      }
      hctx.beginPath();
      hctx.moveTo(pts[0][0], pts[0][1]);
      for (var j = 1; j < 6; j++) hctx.lineTo(pts[j][0], pts[j][1]);
      hctx.closePath();
      hctx.strokeStyle = (dist / Math.max(HW, HH) < 0.5 ? 'rgba(0,240,255,' : 'rgba(155,77,255,') + alpha + ')';
      hctx.lineWidth = 0.6;
      hctx.stroke();
    }
  }
  ht += 0.012;
  requestAnimationFrame(drawHex);
}
drawHex();

/* ═══ PARTICLES (10 — subtle) ═══ */
var ptsEl = document.getElementById('pts');
if (ptsEl) {
  for (var pi = 0; pi < 10; pi++) {
    var pt = document.createElement('div');
    pt.className = 'pt';
    var sz = Math.random() < 0.5 ? 1.5 : 2;
    var col = Math.random() < 0.6 ? '#00f0ff' : '#9b4dff';
    pt.style.cssText = 'left:' + Math.random() * 100 + '%;bottom:' + (Math.random() * 20 - 10) + '%;width:' + sz + 'px;height:' + sz + 'px;background:' + col + ';animation-duration:' + (12 + Math.random() * 16) + 's;animation-delay:' + (Math.random() * 14) + 's;--d:' + ((-40 + Math.random() * 80)) + 'px;opacity:' + (0.1 + Math.random() * 0.2);
    ptsEl.appendChild(pt);
  }
}

/* ═══ MOUSE GLOW ═══ */
var mg = document.getElementById('mg');
document.addEventListener('mousemove', function(e) {
  if (mg) { mg.style.left = e.clientX + 'px'; mg.style.top = e.clientY + 'px'; }
}, { passive: true });

/* ═══ CUSTOM CURSOR ═══ */
var curEl = document.getElementById('cur');
if (curEl) {
  var ring = curEl.querySelector('#cr'), dot = curEl.querySelector('#cd');
  var clines = ['lh1','lh2','lv1','lv2'].map(function(id) { return document.getElementById(id); });
  document.addEventListener('mousemove', function(e) {
    curEl.style.transform = 'translate(' + e.clientX + 'px,' + e.clientY + 'px)';
  }, { passive: true });
  document.addEventListener('mouseover', function(e) {
    var ih = !!(e.target && e.target.closest('a,button,input,textarea,select,.pill,.dsi'));
    var col = ih ? '#ff2d55' : '#00f0ff';
    if (ring) ring.setAttribute('stroke', col);
    if (dot) dot.setAttribute('fill', col);
    clines.forEach(function(l) { if (l) l.setAttribute('stroke', col); });
    var svg = curEl.querySelector('svg');
    if (svg) svg.style.transform = ih ? 'scale(1.35)' : 'scale(1)';
  });
}

/* ═══ SOUND (subtle click only) ═══ */
var AC = window.AudioContext || window.webkitAudioContext;
var sndOn = true, ac = null;
function iAC() { if (!ac && AC) try { ac = new AC(); } catch(e) {} }
function sClick() {
  if (!sndOn) return;
  try {
    iAC(); if (!ac) return;
    var o = ac.createOscillator(), g = ac.createGain();
    o.connect(g); g.connect(ac.destination);
    o.type = 'sine'; o.frequency.value = 660;
    g.gain.setValueAtTime(0.02, ac.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.06);
    o.start(); o.stop(ac.currentTime + 0.06);
  } catch(e) {}
}
var sndbtn = document.getElementById('sndbtn');
if (sndbtn) sndbtn.addEventListener('click', function() {
  sndOn = !sndOn;
  sndbtn.textContent = sndOn ? '🔊' : '🔇';
});

/* ═══ THEME TOGGLE ═══ */
var thbtn = document.getElementById('thbtn');
if (thbtn) thbtn.addEventListener('click', function() {
  document.body.classList.toggle('light');
  thbtn.textContent = document.body.classList.contains('light') ? '🌑' : '🌙';
  drawRadar();
});

/* ═══ PRINT ═══ */
var dlr = document.getElementById('dlr');
if (dlr) dlr.addEventListener('click', function() { window.print(); });

/* ═══ HIRE ME BUTTON ═══ */
var nhire = document.getElementById('nhire');
if (nhire) nhire.addEventListener('click', function() {
  navTo('contact');
});

/* ═══ MOBILE MENU ═══ */
var mbtn = document.getElementById('mbtn'), mmen = document.getElementById('mmen');
function closeMM() {
  if (mbtn) mbtn.classList.remove('open');
  if (mmen) mmen.classList.remove('open');
}
window.closeMM = closeMM;
if (mbtn) mbtn.addEventListener('click', function() {
  mbtn.classList.toggle('open');
  if (mmen) mmen.classList.toggle('open');
});

/* ═══ SCROLL: progress bar + back-to-top + nav active ═══ */
var pbar = document.getElementById('pbar');
var bttEl = document.getElementById('btt');
window.addEventListener('scroll', function() {
  var sc = document.documentElement;
  if (pbar) pbar.style.width = (sc.scrollTop / (sc.scrollHeight - sc.clientHeight) * 100) + '%';
  if (bttEl) bttEl.classList.toggle('show', scrollY > 600);
  var cur = '';
  document.querySelectorAll('section[id]').forEach(function(sec) {
    if (scrollY >= sec.offsetTop - 130) cur = sec.id;
  });
  document.querySelectorAll('.nav-links a').forEach(function(a) {
    a.classList.toggle('act', a.getAttribute('href') === '#' + cur);
  });
}, { passive: true });
if (bttEl) bttEl.addEventListener('click', function() { scrollTo({ top: 0, behavior: 'smooth' }); });

/* ═══ SCROLL REVEALS ═══ */
var revIO = new IntersectionObserver(function(entries) {
  entries.forEach(function(e) { if (e.isIntersecting) e.target.classList.add('in'); });
}, { threshold: 0.1 });
document.querySelectorAll('.rv').forEach(function(el) { revIO.observe(el); });

/* ═══ SKILL BARS (portfolio) ═══ */
var barIO = new IntersectionObserver(function(entries) {
  entries.forEach(function(e) {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.sbfi').forEach(function(b) {
        b.style.transform = 'scaleX(' + b.dataset.w + ')';
      });
      barIO.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.skc').forEach(function(c) { barIO.observe(c); });

/* ═══ SKILL BARS (dashboard) ═══ */
function animDashBars() {
  document.querySelectorAll('.sk-f[data-w]').forEach(function(b) {
    setTimeout(function() { b.style.width = b.dataset.w + '%'; }, 100);
  });
}
var dashIO = new IntersectionObserver(function(entries) {
  entries.forEach(function(e) { if (e.isIntersecting) animDashBars(); });
}, { threshold: 0.2 });
var ovBars = document.getElementById('ov-bars');
if (ovBars) dashIO.observe(ovBars);

/* ═══ LIVE MANILA CLOCK ═══ */
function tick() {
  try {
    var n = new Date();
    var ph = new Date(n.toLocaleString('en-US', { timeZone: 'Asia/Manila' }));
    var hh = String(ph.getHours()).padStart(2, '0');
    var mm = String(ph.getMinutes()).padStart(2, '0');
    var ss = String(ph.getSeconds()).padStart(2, '0');
    var el = document.getElementById('clk');
    if (el) el.textContent = hh + ':' + mm + ':' + ss;
  } catch(e) {}
}
setInterval(tick, 1000);
tick();

/* ═══ TYPEWRITER HERO NAME ═══ */
(function() {
  var l1 = document.getElementById('tw1');
  var l2 = document.getElementById('tw2');
  var cur = document.getElementById('twcur');
  var lines = ['JAMES EARL', 'MEDRANO'];
  var li = 0, ci = 0, done = false;
  function type() {
    if (done) return;
    var t = lines[li];
    if (li === 0) { if (l1) l1.textContent = t.slice(0, ci); }
    else { if (l2) l2.textContent = t.slice(0, ci); }
    ci++;
    if (ci > t.length) {
      if (li < lines.length - 1) { li++; ci = 0; setTimeout(type, 280); }
      else { done = true; setTimeout(function() { if (cur) cur.style.display = 'none'; }, 900); }
    } else { setTimeout(type, 70); }
  }
  type();
})();

/* ═══ SCRAMBLE ROLE TEXT ═══ */
(function() {
  var el = document.getElementById('srole');
  if (!el) return;
  var final = 'AI Automation VA & Developer';
  var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%';
  var frame = 0;
  function sc() {
    var out = '';
    for (var i = 0; i < final.length; i++) {
      if (i < frame) out += final[i];
      else out += final[i] === ' ' ? ' ' : chars[Math.floor(Math.random() * chars.length)];
    }
    el.textContent = out;
    frame++;
    if (frame <= final.length) setTimeout(sc, 36);
    else el.innerHTML = 'AI Automation VA &amp; Developer';
  }
  setTimeout(sc, 2200);
})();

/* ═══ STAT COUNTERS ═══ */
function animCount(el, target, sfx) {
  if (!el) return;
  var v = 0;
  var t = setInterval(function() {
    v = Math.min(v + target / 110, target);
    el.textContent = Math.floor(v) + (sfx || '');
    if (v >= target) clearInterval(t);
  }, 16);
}
var cntIO = new IntersectionObserver(function(entries) {
  entries.forEach(function(e) {
    if (!e.isIntersecting) return;
    cntIO.unobserve(e.target);
    var id = e.target.id;
    if (id === 'c1' || id === 'sa1') animCount(e.target, 3, '+');
    if (id === 'c2' || id === 'sa2') animCount(e.target, 3, '');
  });
}, { threshold: 0.5 });
['c1','c2','sa1','sa2'].forEach(function(id) {
  var el = document.getElementById(id);
  if (el) cntIO.observe(el);
});

/* ═══ RADAR CHART ═══ */
function drawRadar() {
  var c = document.getElementById('radar');
  if (!c) return;
  var ctx = c.getContext('2d'), W = 250, H = 210, cx = W/2, cy = H/2, R = 78;
  var labels = ['n8n','Zapier','Claude API','Notion','JavaScript','Process Design'];
  var vals = [0.90, 0.85, 0.92, 0.88, 0.86, 0.88];
  var n = labels.length;
  ctx.clearRect(0, 0, W, H);
  var angs = labels.map(function(_, i) { return i * (2 * Math.PI / n) - Math.PI / 2; });
  [0.25, 0.5, 0.75, 1].forEach(function(sc) {
    ctx.beginPath();
    angs.forEach(function(a, i) {
      var x = cx + R * sc * Math.cos(a), y = cy + R * sc * Math.sin(a);
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });
    ctx.closePath();
    ctx.strokeStyle = 'rgba(0,240,255,0.09)';
    ctx.lineWidth = 1;
    ctx.stroke();
  });
  angs.forEach(function(a) {
    ctx.beginPath(); ctx.moveTo(cx, cy);
    ctx.lineTo(cx + R * Math.cos(a), cy + R * Math.sin(a));
    ctx.strokeStyle = 'rgba(0,240,255,0.08)'; ctx.lineWidth = 1; ctx.stroke();
  });
  ctx.beginPath();
  angs.forEach(function(a, i) {
    var x = cx + R * vals[i] * Math.cos(a), y = cy + R * vals[i] * Math.sin(a);
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  });
  ctx.closePath();
  ctx.fillStyle = 'rgba(0,240,255,0.07)'; ctx.fill();
  ctx.strokeStyle = 'rgba(0,240,255,0.62)'; ctx.lineWidth = 1.5; ctx.stroke();
  angs.forEach(function(a, i) {
    ctx.beginPath();
    ctx.arc(cx + R * vals[i] * Math.cos(a), cy + R * vals[i] * Math.sin(a), 3, 0, Math.PI * 2);
    ctx.fillStyle = '#00f0ff'; ctx.fill();
  });
  var tc = document.body.classList.contains('light') ? 'rgba(8,11,26,0.5)' : 'rgba(236,238,248,0.44)';
  ctx.fillStyle = tc; ctx.font = '9px Space Mono,monospace'; ctx.textAlign = 'center';
  angs.forEach(function(a, i) {
    ctx.fillText(labels[i], cx + (R + 16) * Math.cos(a), cy + (R + 16) * Math.sin(a) + 3);
  });
}
drawRadar();
new IntersectionObserver(function(entries) {
  entries.forEach(function(e) { if (e.isIntersecting) drawRadar(); });
}, { threshold: 0.3 }).observe(document.getElementById('radar') || document.body);

/* ═══ COPY CONTACT BUTTONS ═══ */
document.querySelectorAll('.cpb').forEach(function(btn) {
  btn.addEventListener('click', function(e) {
    e.preventDefault(); e.stopPropagation();
    var val = btn.dataset.copy;
    if (!val) return;
    if (navigator.clipboard) navigator.clipboard.writeText(val).then(function() {
      btn.textContent = 'Copied!';
      btn.classList.add('done');
      setTimeout(function() { btn.textContent = 'Copy'; btn.classList.remove('done'); }, 2000);
    });
  });
});

/* ═══ GMAIL CONTACT FORM ═══ */
var fsub = document.getElementById('fsub');
if (fsub) fsub.addEventListener('click', function() {
  var n = (document.getElementById('fn') || {}).value || '';
  var em = (document.getElementById('fe') || {}).value || '';
  var subj = (document.getElementById('fs') || {}).value || '';
  var msg = (document.getElementById('fm') || {}).value || '';
  var st = document.getElementById('fst');
  if (!n.trim() || !em.trim() || !msg.trim()) {
    if (st) { st.className = 'fst er'; st.textContent = '// Please fill in name, email, and message.'; }
    return;
  }
  var to = 'Workwitheaaarl@gmail.com';
  var sub = encodeURIComponent(subj || 'Inquiry from ' + n + ' via Portfolio');
  var body = encodeURIComponent('Hi James,\n\nMy name is ' + n + ' (' + em + ').\n\n' + msg + '\n\nBest regards,\n' + n);
  window.open('https://mail.google.com/mail/?view=cm&fs=1&to=' + to + '&su=' + sub + '&body=' + body, '_blank');
  if (st) { st.className = 'fst ok'; st.textContent = '// Gmail opened! Your message is pre-filled and ready to send.'; }
});

/* ═══ AI QUICK FAB (bottom-left orb) ═══ */
var aiOrb = document.getElementById('ai-orb');
var afpEl = document.getElementById('afp');
if (aiOrb) aiOrb.addEventListener('click', function() {
  if (afpEl) afpEl.classList.toggle('open');
});
var afpX = document.getElementById('afp-x');
if (afpX) afpX.addEventListener('click', function() {
  if (afpEl) afpEl.classList.remove('open');
});
var FAB_ACTIONS = {
  pitch:   'Write a 3-sentence elevator pitch for James that an HR reads in 10 seconds and immediately wants to interview him.',
  summary: 'Write a powerful professional summary for James under 25 words for his resume header.',
  unique:  'In 3 bullet points, what makes James uniquely different from other BS IT 2025 graduates applying for AI roles?',
  hire:    'Give exactly 3 compelling, punchy reasons an HR manager should shortlist James immediately.',
  salary:  'What salary range should James target in PH for AI and IT roles in 2026? Give specific ranges by role type.',
  linkedin:'Write an optimized LinkedIn headline for James under 220 characters targeting AI and IT roles in the Philippines.',
  cold:    'Write a compelling opening line for a cold email James could send to a hiring manager at any Philippine tech company.',
  ats:     'List the top 10 ATS keywords James must include in his resume for AI and IT roles in 2026, with a brief note for each.'
};
var afpRes = document.getElementById('afp-res');
document.querySelectorAll('.afp-btn').forEach(function(b) {
  b.addEventListener('click', async function() {
    if (!afpRes) return;
    // Highlight active button
    document.querySelectorAll('.afp-btn').forEach(function(x) { x.style.opacity = '0.5'; });
    b.style.opacity = '1';
    b.style.borderColor = 'rgba(0,240,255,0.5)';
    afpRes.className = 'afp-res show loading';
    afpRes.textContent = '⚡ Claude is generating...';
    var r = await callClaude(FAB_ACTIONS[b.dataset.a] || b.dataset.a);
    afpRes.className = 'afp-res show';
    afpRes.textContent = r;
    // Reset buttons
    document.querySelectorAll('.afp-btn').forEach(function(x) { x.style.opacity = '1'; x.style.borderColor = ''; });
  });
});

/* ═══ CHATBOT (JEM-BOT) ═══ */
var cbt = document.getElementById('cbt');
var cwin = document.getElementById('cwin');
var cms = document.getElementById('cms');
var cin = document.getElementById('cin');
var ctyp = document.getElementById('ctyp');
if (cbt) cbt.addEventListener('click', function() {
  if (cwin) cwin.classList.toggle('open');
  var cn = document.getElementById('cbno');
  if (cn) cn.style.display = 'none';
  if (cms && cms.children.length === 0) addBotMsg('Hi! I am JEM-BOT, powered by Claude AI. Ask me anything about James — his skills, experience, social links, or why you should hire him.');
});
var cwx = document.getElementById('cwx');
if (cwx) cwx.addEventListener('click', function() { if (cwin) cwin.classList.remove('open'); });

var KB = {
  skills:     'James top skills:\n  AI/LLM: Prompt Engineering 92%, Annotation 90%, LLM Eval 88%\n  IT Ops: Troubleshooting 90%, Networks 82%, Cybersec 78%\n  Data: Excel 88%, Power BI 84%, CRM 80%',
  experience: 'Work history:\n  1. A.I. Analyst II — Innodata (Jan-May 2026)\n  2. IT Support — Alorica Teleservices (2025)\n  3. Jr. Tech Support — BESPOKE IT Corp. (2024)',
  contact:    'Reach James:\n  Email: Workwitheaaarl@gmail.com\n  Phone: +63 976 318 9033\n  Location: Malate, Manila, PH',
  social:     'James socials:\n  LinkedIn: linkedin.com/in/james-earl-medrano-49b303394/\n  GitHub: github.com/youngNwis31\n  Facebook: facebook.com/eaarlsuuu\n  Instagram: @eaarlsu\n  X: @eaarlsuu',
  hire:       'Why hire James?\n  - Real LLM fine-tuning and prompt engineering experience\n  - 3 industries in 2 years: cybersec, BPO, AI research\n  - BS IT 2025, open to work immediately\n  - Bilingual: Filipino and English'
};
function botReply(q) {
  var t = q.toLowerCase();
  if (t.includes('hire') || t.includes('why')) return KB.hire;
  if (t.includes('skill') || t.includes('capab')) return KB.skills;
  if (t.includes('exp') || t.includes('work') || t.includes('career')) return KB.experience;
  if (t.includes('contact') || t.includes('email') || t.includes('phone')) return KB.contact;
  if (t.includes('social') || t.includes('linkedin') || t.includes('github')) return KB.social;
  if (t.includes('hi') || t.includes('hello') || t.includes('hey')) return 'Hi there! Ask me about James — his skills, experience, or how to hire him.';
  return 'I can tell you about James skills, experience, social links, or how to contact him. What do you need?';
}
function addBotMsg(text) {
  if (!cms) return;
  var m = document.createElement('div'); m.className = 'msg';
  var av = document.createElement('div'); av.className = 'mav'; av.textContent = 'J';
  av.style.cssText = 'background:linear-gradient(135deg,rgba(0,240,255,.14),rgba(155,77,255,.14));border:1px solid var(--lc)';
  var bub = document.createElement('div'); bub.className = 'mbub b';
  bub.innerHTML = text.replace(/\n/g, '<br>');
  m.appendChild(av); m.appendChild(bub);
  cms.appendChild(m); cms.scrollTop = cms.scrollHeight;
}
function sendBotMsg(txt) {
  if (!txt || !txt.trim()) return;
  var m = document.createElement('div'); m.className = 'msg u';
  var av = document.createElement('div'); av.className = 'mav'; av.textContent = 'You';
  av.style.cssText = 'background:var(--panel);border:1px solid var(--line);font-size:9px';
  var bub = document.createElement('div'); bub.className = 'mbub u'; bub.textContent = txt;
  m.appendChild(av); m.appendChild(bub);
  if (cms) cms.appendChild(m);
  if (cin) cin.value = '';
  if (ctyp) ctyp.classList.add('show');
  if (cms) cms.scrollTop = cms.scrollHeight;
  var JEM_SYS = "You are JEM-BOT, the AI assistant on James Earl Medrano's portfolio website. You represent James and answer questions from HR managers, recruiters, and hiring managers.\n\nJames's background:\n- AI Analyst II (LLM) at Innodata Knowledge Services, Jan-May 2026, Cebu — prompt engineering, LLM fine-tuning, data annotation, adversarial model testing. Contract ended May 2026.\n- IT Support & Case Resolution at Alorica Teleservices, Jan 2025-Jan 2026, Makati — Power BI, Advanced Excel, CRM, financial data security for international credit card company.\n- Jr. Technical Support at BESPOKE IT Project Corp., Feb-Jul 2024, Makati — firewalls, servers, POS systems, technical documentation.\n- BS Information Technology, Pamantasan ng Lungsod ng Maynila (PLM), 2025.\n- Currently OPEN TO WORK — available immediately for full-time, remote, hybrid, or freelance roles.\n- Salary target: ₱35,000-₱55,000/month for local PH roles; $800-$1,200/month for remote international.\n- Email: Workwitheaaarl@gmail.com | Phone: +63 976 318 9033 | LinkedIn: linkedin.com/in/james-earl-medrano-49b303394/\n- Projects: CourtBook (React+Supabase tennis booking app), Arangkada AI (Flutter offline navigation for motorcycle riders with 3-tier AI fallback), Modular AI Support Router (n8n + Claude cost-routing + circuit breaker).\n\nBe warm, confident, and conversational. Keep answers concise (3-5 sentences max). Always represent James positively. If asked about salary, give the range. If asked how to contact, give email and phone.";
  callClaude(txt, JEM_SYS).then(function(reply) {
    if (ctyp) ctyp.classList.remove('show');
    addBotMsg(reply);
  });
}
var cse = document.getElementById('cse');
if (cse) cse.addEventListener('click', function() { if (cin) sendBotMsg(cin.value); });
if (cin) cin.addEventListener('keydown', function(e) { if (e.key === 'Enter') sendBotMsg(cin.value); });
document.querySelectorAll('.qb').forEach(function(b) {
  b.addEventListener('click', function() { sendBotMsg(b.dataset.q); });
});

/* ═══ TERMINAL (Konami easter egg) ═══ */
var trm = document.getElementById('trm');
var tro = document.getElementById('tro');
var trin = document.getElementById('trin');
var CMDS = {
  help:       'Commands: help | whoami | skills | experience | contact | social | time | ping | ls | clear | exit',
  whoami:     'James Earl Medrano\nAI Ops Analyst & IT Specialist\nBS IT 2025 - Malate, Manila, PH\nEmail: Workwitheaaarl@gmail.com',
  skills:     '[01] AI & LLM  — Prompt Eng 92% · Annotation 90% · LLM Eval 88%\n[02] IT Ops   — Troubleshooting 90% · Networks 82% · Cybersec 78%\n[03] Data     — Excel 88% · Power BI 84% · CRM 80%',
  experience: '[1] A.I. Analyst II   — Innodata (Jan-May 2026)\n[2] IT Support       — Alorica Teleservices (2025)\n[3] Jr. Tech Support — BESPOKE IT Corp. (2024)',
  contact:    'EMAIL: Workwitheaaarl@gmail.com\nPHONE: +63 976 318 9033\nLOC:   Malate, Manila, PH',
  social:     'LinkedIn:  linkedin.com/in/james-earl-medrano-49b303394/\nGitHub:    github.com/youngNwis31\nFacebook:  facebook.com/eaarlsuuu\nInstagram: @eaarlsu\nX:         @eaarlsuu',
  ls:         'portfolio/\n  00_hire.dat  01_about.dat  02_experience.log\n  03_skills.json  04_education.cert  05_contact.enc\n  dashboard/ (17 AI tools)',
  ping:       'PONG // LAT 14.5764N · LON 120.9831E · 1ms · MALATE_NODE',
  clear:      '__clear__',
  exit:       '__close__'
};
CMDS.time = function() {
  return 'MANILA: ' + new Date().toLocaleTimeString('en-PH', { timeZone: 'Asia/Manila' });
};
function tPrint(msg) {
  if (!tro) return;
  var d = document.createElement('div');
  d.innerHTML = msg.replace(/\n/g, '<br>');
  tro.appendChild(d);
  tro.scrollTop = tro.scrollHeight;
}
if (trin) trin.addEventListener('keydown', function(e) {
  if (e.key !== 'Enter') return;
  var cmd = trin.value.trim().toLowerCase();
  trin.value = '';
  tPrint('<span style="color:var(--cyan)">james@manila:~$</span> ' + cmd);
  var r = CMDS[cmd];
  if (typeof r === 'function') r = r();
  if (r === '__clear__') tro.innerHTML = '';
  else if (r === '__close__') { if (trm) trm.classList.remove('open'); }
  else if (r) tPrint(r);
  else tPrint('command not found: <span style="color:var(--red)">' + cmd + '</span> — type "help"');
});
var trc = document.getElementById('trc');
if (trc) trc.addEventListener('click', function() { if (trm) trm.classList.remove('open'); });
var KONAMI = [38,38,40,40,37,39,37,39,66,65], ki = 0;
document.addEventListener('keydown', function(e) {
  if (e.keyCode === KONAMI[ki]) ki++; else ki = 0;
  if (ki === KONAMI.length) {
    ki = 0;
    if (trm) trm.classList.toggle('open');
    if (trm && trm.classList.contains('open')) tPrint('<span style="color:var(--gold)">// KONAMI CODE — JAMES_OS v4.0 UNLOCKED</span>');
  }
});

/* ═══ JOB TRACKER ═══ */
var jobs = [];
function renderJobs() {
  var counts = { applied: 0, interview: 0, offer: 0, rejected: 0 };
  jobs.forEach(function(j) { if (counts[j.st] !== undefined) counts[j.st]++; });
  ['jt-total','ov-apps'].forEach(function(id) { var el = document.getElementById(id); if (el) el.textContent = jobs.length; });
  var jtApp = document.getElementById('jt-applied'); if (jtApp) jtApp.textContent = counts.applied;
  ['jt-interview','ov-int'].forEach(function(id) { var el = document.getElementById(id); if (el) el.textContent = counts.interview; });
  ['jt-offer','ov-off'].forEach(function(id) { var el = document.getElementById(id); if (el) el.textContent = counts.offer; });
  var list = document.getElementById('jt-list');
  if (!list) return;
  if (!jobs.length) {
    list.innerHTML = '<div style="font-family:var(--fm);font-size:9px;color:var(--mut);text-align:center;padding:14px;letter-spacing:.1em;text-transform:uppercase">No applications yet — add one below</div>';
    return;
  }
  list.innerHTML = '';
  jobs.forEach(function(j, i) {
    var el = document.createElement('div'); el.className = 'jtrow';
    var diff = Math.floor((Date.now() - j.ts) / 86400000);
    var ds = diff === 0 ? 'Today' : diff === 1 ? 'Yesterday' : diff + 'd ago';
    el.innerHTML = '<div class="jtdot ' + j.st + '"></div><div class="jtinfo"><div class="jtrl">' + j.role + '</div><div class="jtco">' + j.co + '</div></div><div class="jtdt">' + ds + '</div><button class="jtdel" data-i="' + i + '">x</button>';
    list.appendChild(el);
  });
  list.querySelectorAll('.jtdel').forEach(function(b) {
    b.addEventListener('click', function() { jobs.splice(parseInt(b.dataset.i), 1); renderJobs(); });
  });
}
var jtAdd = document.getElementById('jt-add');
if (jtAdd) jtAdd.addEventListener('click', function() {
  var role = (document.getElementById('jt-role') || {}).value || '';
  var co   = (document.getElementById('jt-co')   || {}).value || '';
  var st   = (document.getElementById('jt-st')   || {}).value || 'applied';
  if (!role.trim() || !co.trim()) return;
  jobs.push({ role: role.trim(), co: co.trim(), st: st, ts: Date.now() });
  var ri = document.getElementById('jt-role'); if (ri) ri.value = '';
  var ci = document.getElementById('jt-co');   if (ci) ci.value = '';
  renderJobs();
});
renderJobs();

var jtAI = document.getElementById('jt-ai-btn');
if (jtAI) jtAI.addEventListener('click', async function() {
  aiOut('jt-ai-out', '', true);
  var sum = jobs.length ? jobs.map(function(j) { return j.role + ' at ' + j.co + ' (' + j.st + ')'; }).join('; ') : 'No applications tracked yet';
  var r = await callClaude('James has these job applications: ' + sum + '. Give 5 specific, actionable tips to improve his job search strategy and increase his interview rate.');
  aiOut('jt-ai-out', r, false);
});

/* ═══ HR ACTIVITY FEED (static — no auto-rotating popups) ═══ */
var HR_FEED = [
  { ico: '👀', txt: 'Talent Acquisition from Accenture PH viewed your profile', sub: 'BGC, Taguig', col: 'var(--cyan)' },
  { ico: '💼', txt: 'Globe Telecom recruiter opened your LinkedIn', sub: 'Mandaluyong', col: 'rgba(10,102,194,.8)' },
  { ico: '⭐', txt: 'HR Manager saved your profile to shortlist', sub: 'Ortigas Center', col: 'var(--gold)' },
  { ico: '🎯', txt: 'High match score for Prompt Engineer role', sub: '3 companies looking', col: 'var(--vio)' },
  { ico: '📞', txt: 'Interview inquiry from BGC tech startup', sub: 'Bonifacio Global City', col: 'var(--grn)' },
  { ico: '🌟', txt: 'AI skills scored in the 90th percentile', sub: 'vs. other BS IT 2025 graduates', col: 'var(--gold)' },
  { ico: '📨', txt: 'Grab Philippines tech team sent a connection request', sub: 'Pasig City', col: 'var(--grn)' },
  { ico: '🏆', txt: 'Portfolio ranked in top candidates this week', sub: 'AI Analyst Manila 2026', col: 'var(--red)' }
];
function buildFeed(containerId, count) {
  var feed = document.getElementById(containerId);
  if (!feed) return;
  feed.innerHTML = '';
  HR_FEED.slice(0, count || 5).forEach(function(ev) {
    var d = document.createElement('div'); d.className = 'nitem';
    d.style.borderLeftColor = ev.col;
    d.innerHTML = '<div class="nicon">' + ev.ico + '</div><div><div class="ntxt">' + ev.txt + '</div><div class="nsub">' + ev.sub + '</div></div>';
    feed.appendChild(d);
  });
}
buildFeed('ov-feed', 5);
buildFeed('act-feed', 8);

/* ═══ ACTIVITY AI RESPONDER ═══ */
var actAI = document.getElementById('act-ai');
if (actAI) actAI.addEventListener('click', async function() {
  aiOut('act-out', '', true);
  var scenario = (document.getElementById('act-scenario') || {}).value || '';
  var r = await callClaude('James is in this situation: "' + scenario + '". Write the perfect professional response. Include what to say, how to say it, what to avoid, and clear next steps.');
  aiOut('act-out', r, false);
});

/* ═══ TONE / CHIP HELPERS ═══ */
function initTones(gid) {
  var g = document.getElementById(gid);
  if (!g) return;
  g.querySelectorAll('.tone-btn').forEach(function(b) {
    b.addEventListener('click', function() {
      g.querySelectorAll('.tone-btn').forEach(function(x) { x.classList.remove('sel'); });
      b.classList.add('sel');
    });
  });
}
function getTone(gid) {
  var g = document.getElementById(gid);
  if (!g) return 'Professional';
  var a = g.querySelector('.sel');
  return a ? a.dataset.tone : 'Professional';
}
initTones('cl-tones');
initTones('rb-tones');

document.querySelectorAll('#li-chips .chip').forEach(function(c) {
  c.addEventListener('click', function() { c.classList.toggle('sel'); });
});
document.querySelectorAll('.qchip[data-q]').forEach(function(c) {
  c.addEventListener('click', function() {
    var inp = document.getElementById('iv-inp');
    if (inp) inp.value = c.dataset.q;
  });
});

/* ═══ AI TOOL: generic runner ═══ */
async // ── CURRENTLY BUILDING TICKER ────────────────────────────────────
(function() {
  var items = [
    'Automation #5 — AI Meeting Summarizer · n8n',
    'Zapier + Notion CRM Pipeline · Claude API',
    'SOAR pipeline portfolio write-up · GitHub',
    'VA client outreach templates · Anthropic API',
    'n8n Official Certification · in progress'
  ];
  var el = document.getElementById('ticker-text');
  if (!el) return;
  var i = 0;
  function showNext() {
    el.style.opacity = '0';
    setTimeout(function() {
      el.textContent = items[i % items.length];
      el.style.opacity = '1';
      i++;
    }, 400);
  }
  el.style.transition = 'opacity .4s';
  showNext();
  setInterval(showNext, 3200);
})();

// ── OTW FLOATING BUTTON ───────────────────────────────────────────
(function() {
  var btn = document.getElementById('otw-btn');
  if (!btn) return;
  // Show on desktop only (hide on mobile via JS complement to CSS)
  function checkWidth() {
    btn.style.display = window.innerWidth > 768 ? 'block' : 'none';
  }
  checkWidth();
  window.addEventListener('resize', checkWidth);
})();

// ── MOBILE TAB ACTIVE STATE HELPER ────────────────────────────────
function mobTab(btn) {
  document.querySelectorAll('.mob-tab').forEach(function(t) { t.classList.remove('act'); });
  if (btn) btn.classList.add('act');
  // Close any open overlays when switching tabs (except the one being opened)
  var afp = document.getElementById('afp');
  var cwin = document.getElementById('cwin');
  var btnId = btn ? btn.id : '';
  if (btnId !== 'mobt-quickai' && afp) afp.classList.remove('open');
  if (btnId !== 'mobt-chat' && cwin) cwin.classList.remove('open');
}

function runTool(btnId, outId, promptFn) {
  var btn = document.getElementById(btnId);
  if (!btn) return;
  btn.addEventListener('click', async function() {
    var prompt = promptFn();
    if (!prompt) { return; }
    aiOut(outId, '', true);
    var r = await callClaude(prompt);
    aiOut(outId, r, false);
  });
}

/* ═══ ALL 15 AI TOOLS ═══ */
runTool('jfa-btn', 'jfa-out', function() {
  var jd = (document.getElementById('jfa-jd') || {}).value || '';
  return jd.trim() ? 'A recruiter pasted the job description below. Write a tight, confident Recruiter Brief for James using these exact bold headers and nothing else:\n\n**FIT:** a match score out of 100 and a one-line verdict.\n**WHY JAMES:** 3 short bullets connecting his REAL experience (Arangkada AI \u2014 a 3-tier AI assistant with cloud + on-device fallback; a 16-node n8n AI support router; Zapier and Claude API automations; IT and technical-support background) to THIS specific role.\n**HONEST GAPS:** 1-2 things he would ramp up on \u2014 be candid, it builds trust.\n**WHAT I\'D BUILD FOR YOU IN WEEK ONE:** the single most useful automation James would build for THIS team, inferred from the job description. Name the trigger, the steps, the tools (n8n / Zapier / Claude), and a rough time saved. Make it concrete and specific to their world \u2014 not generic.\n**FORWARD THIS:** one sentence the recruiter can paste to their hiring manager on why to talk to James.\n\nNo preamble, no fluff. Job description:\n' + jd : '';
});
runTool('cl-btn', 'cl-out', function() {
  var role = (document.getElementById('cl-role') || {}).value || '';
  var reqs = (document.getElementById('cl-reqs') || {}).value || '';
  var tone = getTone('cl-tones');
  return role.trim() ? 'Write a ' + tone + ' cover letter from James for: ' + role + (reqs ? '. Key requirements: ' + reqs : '.') + ' Under 350 words. Strong opening, 2-3 body paragraphs using real experience, confident close. Ready to send.' : '';
});
runTool('iv-btn', 'iv-out', function() {
  var q = (document.getElementById('iv-inp') || {}).value || '';
  return q.trim() ? 'Model answer (150-250 words) for James to this interview question: "' + q + '". Use STAR method where relevant. Reference real experience. Natural for speaking aloud. End confidently.' : '';
});
runTool('ats-btn', 'ats-out', function() {
  var kw   = (document.getElementById('ats-kw')   || {}).value || '';
  var role = (document.getElementById('ats-role') || {}).value || 'AI Automation VA';
  return 'Generate a complete ATS-optimized resume for James targeting "' + role + '"' + (kw ? ' with keywords: ' + kw : '') + '. Include professional summary, work experience with action verbs and quantified results, skills section, and education.';
});
runTool('li-btn', 'li-out', function() {
  var t     = (document.getElementById('li-target') || {}).value || '';
  var chips = Array.from(document.querySelectorAll('#li-chips .chip.sel')).map(function(c) { return c.dataset.v; }).join(', ');
  return (t || chips) ? 'Optimize James LinkedIn for "' + (t || chips) + '". Give: 1) Headline under 220 characters, 2) About section with 3 paragraphs and a call-to-action, 3) Top 5 skills to list, 4) 3 specific profile improvement tips.' : '';
});
runTool('sal-btn', 'sal-out', function() {
  var offer  = (document.getElementById('sal-offer')  || {}).value || '';
  var target = (document.getElementById('sal-target') || {}).value || '';
  var role   = (document.getElementById('sal-role')   || {}).value || '';
  return (offer && target) ? 'James received an offer of PHP ' + offer + ' per month for "' + role + '" but wants PHP ' + target + ' per month. Write: 1) A negotiation email script, 2) Key talking points, 3) Counter-offer strategy, 4) How to respond if pushed back. Tone: confident and professional.' : '';
});
runTool('cp-btn', 'cp-out', function() {
  var goal = (document.getElementById('cp-goal') || {}).value || '';
  var time = (document.getElementById('cp-time') || {}).value || '3-5 years';
  return goal.trim() ? 'James wants to become "' + goal + '" in ' + time + '. Create a specific roadmap: 1) Step-by-step milestones, 2) Skills to acquire at each stage, 3) Recommended certifications, 4) Timeline with checkpoints, 5) One bold accelerator move.' : '';
});
runTool('ref-btn', 'ref-out', function() {
  var type = (document.getElementById('ref-type') || {}).value || '';
  var role = (document.getElementById('ref-role') || {}).value || '';
  return 'Write a professional reference letter for James from "' + type + '" for his application for "' + role + '". Make it 3-4 paragraphs, specific and credible with real examples. End with a strong endorsement.';
});
runTool('rb-btn', 'rb-out', function() {
  var bullets = (document.getElementById('rb-inp') || {}).value || '';
  var tone    = getTone('rb-tones');
  return bullets.trim() ? 'Rewrite these resume bullets for James in ' + tone + ' style. Use strong action verbs and quantify results where possible:\n\n' + bullets : '';
});
runTool('djp-btn', 'djp-out', function() {
  var hours = (document.getElementById('djp-hours') || {}).value || '2-3 hours';
  var stage = (document.getElementById('djp-stage') || {}).value || 'Actively applying';
  return 'Create a specific, actionable daily job hunt plan for James. He has ' + hours + ' today and is at stage: "' + stage + '". Include: timed hourly schedule, exact tasks on platforms like LinkedIn, JobStreet, Kalibrr, and Indeed PH, one networking action, one skill-building task. Be specific to an AI and IT specialist in Manila.';
});
runTool('rrc-btn', 'rrc-out', function() {
  var type = (document.getElementById('rrc-type') || {}).value || '';
  var role = (document.getElementById('rrc-role') || {}).value || '';
  return 'James experienced: "' + type + '"' + (role ? ' for the role "' + role + '"' : '') + '. As his career coach give: 1) Honest empathetic acknowledgment, 2) What this means and does NOT mean, 3) 3 concrete actions in the next 24 hours, 4) How to turn this into momentum, 5) Encouraging close tailored to his AI and IT background.';
});
runTool('ty-btn', 'ty-out', function() {
  var name   = (document.getElementById('ty-name')   || {}).value || 'the interviewer';
  var role   = (document.getElementById('ty-role')   || {}).value || '';
  var detail = (document.getElementById('ty-detail') || {}).value || '';
  return 'Write a thank-you email for James after an interview. Interviewer: ' + name + '. Role and company: ' + role + '. Specific detail from the interview: "' + detail + '". Format: start with SUBJECT: [subject line], then the email body. Under 150 words. Reference the detail naturally, reaffirm enthusiasm, end confidently.';
});

/* ═══ COLD EMAIL (custom handler — shows preview) ═══ */
var ceBtn = document.getElementById('ce-btn');
if (ceBtn) ceBtn.addEventListener('click', async function() {
  var co    = (document.getElementById('ce-co')    || {}).value || '';
  var to    = (document.getElementById('ce-to')    || {}).value || 'Hiring Manager';
  var angle = (document.getElementById('ce-angle') || {}).value || '';
  if (!co.trim()) return;
  var prev  = document.getElementById('ce-prev');
  var subjEl= document.getElementById('ce-subj');
  var bodyEl= document.getElementById('ce-body');
  var copyEl= document.getElementById('ce-copy');
  if (prev) prev.className = 'ep show';
  if (subjEl) subjEl.textContent = 'Generating...';
  if (bodyEl) bodyEl.textContent = '';
  var r = await callClaude('Write a cold email from James to ' + to + ' at ' + co + '. Angle: ' + angle + '. Start with SUBJECT: [subject line] on the first line, then a blank line, then the email body. Under 200 words. Compelling, mention AI and LLM experience, strong call to action.');
  var lines = r.split('\n');
  var sub = '', bd = [], found = false;
  lines.forEach(function(l) {
    if (!found && l.toLowerCase().startsWith('subject:')) { sub = l.replace(/^subject:\s*/i, ''); found = true; }
    else bd.push(l);
  });
  if (subjEl) subjEl.textContent = 'Subject: ' + (sub || 'James Earl Medrano — AI Professional');
  if (bodyEl) bodyEl.textContent = bd.join('\n').trim();
  if (copyEl) {
    copyEl.style.display = 'block';
    copyEl.onclick = function() {
      if (navigator.clipboard) navigator.clipboard.writeText((sub ? 'Subject: ' + sub + '\n\n' : '') + bd.join('\n').trim()).then(function() {
        copyEl.textContent = 'Copied!';
        setTimeout(function() { copyEl.textContent = 'Copy'; }, 2000);
      });
    };
  }
});

/* ═══ FOLLOW-UP EMAILS ═══ */
var fuSel = 'after applying online 7 days ago with no response';
document.querySelectorAll('.fu-step').forEach(function(s) {
  s.addEventListener('click', function() {
    document.querySelectorAll('.fu-step').forEach(function(x) { x.classList.remove('act'); });
    s.classList.add('act');
    fuSel = s.dataset.s;
  });
});
var fuBtn = document.getElementById('fu-btn');
if (fuBtn) fuBtn.addEventListener('click', async function() {
  aiOut('fu-out', '', true);
  var co = (document.getElementById('fu-co') || {}).value || '';
  var r = await callClaude('Write a follow-up email for James for this situation: "' + fuSel + '" for the role: "' + co + '". Start with SUBJECT: on the first line. Under 180 words. Warm, professional, specific about qualifications, clear ask, confident close.');
  aiOut('fu-out', r, false);
});

/* ═══ MOCK VIDEO INTERVIEW ═══ */
var VQS = [
  'Tell me about yourself and your journey into AI and technology.',
  'Why are you the ideal candidate for this specific role?',
  'Describe the most complex AI task you have completed. Walk me through your process.',
  'How do you stay current with fast-moving AI developments?',
  'Tell me about a time you identified and resolved a critical technical issue.',
  'How do you approach working with incomplete or ambiguous requirements?',
  'Describe your data annotation experience and how you ensure quality.',
  'What is your greatest professional achievement in the past 2 years?',
  'Where do you see yourself in 3 years?',
  'Why should we choose you over a candidate with a computer science degree?'
];
var vIdx = 0, vStarted = false;
var vidQ   = document.getElementById('vid-q');
var vidLbl = document.getElementById('vid-label');
var vidCtr = document.getElementById('vid-ctr');
var vidRec = document.getElementById('vid-rec');
var vidNxt = document.getElementById('vid-next');
var vidAns = document.getElementById('vid-ans');
if (vidNxt) vidNxt.addEventListener('click', function() {
  if (vIdx >= VQS.length) return;
  if (vidQ)   vidQ.textContent   = VQS[vIdx];
  if (vidLbl) vidLbl.textContent = 'Question ' + (vIdx + 1) + ' of ' + VQS.length;
  if (vidCtr) vidCtr.textContent = 'Q ' + (vIdx + 1) + ' / ' + VQS.length;
  if (vidRec) vidRec.classList.add('show');
  if (!vStarted) { vStarted = true; if (vidNxt) vidNxt.textContent = 'Next Question'; }
  vIdx++;
});
if (vidAns) vidAns.addEventListener('click', async function() {
  var q = vidQ ? vidQ.textContent : '';
  if (!q || q.includes('Press Start')) return;
  aiOut('vid-out', '', true);
  var r = await callClaude('Write a model answer for James to this interview question (under 200 words, natural spoken language): "' + q + '". Use STAR method where relevant. Reference his real experience. End forward-looking.');
  aiOut('vid-out', r, false);
});

/* ═══ DASHBOARD AI CHAT ═══ */
var dcMsgs   = document.getElementById('dc-msgs');
var dcInp    = document.getElementById('dc-inp');
var dcTyping = document.getElementById('dc-typing');
function addDCMsg(text, type) {
  if (!dcMsgs) return;
  var m = document.createElement('div');
  m.style.cssText = 'display:flex;gap:8px;align-items:flex-end' + (type === 'u' ? ';flex-direction:row-reverse' : '');
  var av = document.createElement('div');
  av.style.cssText = 'width:22px;height:22px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;flex-shrink:0;border:1px solid var(--line);background:var(--panel)';
  av.textContent = type === 'u' ? 'You' : 'AI';
  var bub = document.createElement('div');
  bub.style.cssText = 'max-width:78%;padding:8px 12px;font-size:11px;line-height:1.65;font-weight:300;' +
    (type === 'u'
      ? 'background:linear-gradient(135deg,rgba(0,240,255,.1),rgba(155,77,255,.1));border:1px solid var(--lc);border-radius:10px 0 10px 10px;color:var(--cyan)'
      : 'background:var(--panel);border:1px solid var(--line);border-radius:0 10px 10px 10px;color:var(--txt)');
  bub.innerHTML = text.replace(/\n/g, '<br>');
  m.appendChild(av); m.appendChild(bub);
  dcMsgs.appendChild(m);
  dcMsgs.scrollTop = dcMsgs.scrollHeight;
}
window.sendChat = async function(txt) {
  if (!txt || !txt.trim()) return;
  addDCMsg(txt, 'u');
  if (dcInp) dcInp.value = '';
  if (dcTyping) dcTyping.style.display = 'block';
  dcMsgs.scrollTop = dcMsgs.scrollHeight;
  var r = await callClaude(txt);
  if (dcTyping) dcTyping.style.display = 'none';
  addDCMsg(r, 'ai');
};
var dcSend = document.getElementById('dc-send');
if (dcSend) dcSend.addEventListener('click', function() { if (dcInp) sendChat(dcInp.value); });
if (dcInp)  dcInp.addEventListener('keydown', function(e) { if (e.key === 'Enter') sendChat(dcInp.value); });
setTimeout(function() {
  if (dcMsgs && dcMsgs.children.length === 0) {
    addDCMsg('Hello! I am Claude AI. Ask me anything about James — his skills, fit for a role, salary expectations, or why you should hire him.', 'ai');
  }
}, 400);


/* ═══ MOBILE DASHBOARD NAVIGATION ═══ */
(function() {
  var mobTabs     = document.getElementById('mob-tabs');
  var mobDrawer   = document.getElementById('mob-drawer');
  var mobDrawerX  = document.getElementById('mob-drawer-x');
  var mobToolsBtn = document.getElementById('mobt-tools-open');

  if (!mobTabs) return; // not on mobile, skip

  // Mobile nav is ALWAYS visible on mobile — CSS handles display via media query
  // No JS show/hide needed

  // Hook into switchTab just to close drawer on tab switch
  var _origSwitch = window.switchTab;
  window.switchTab = function(tab) {
    if (_origSwitch) _origSwitch(tab);
    if (mobDrawer) mobDrawer.classList.remove('open');
  };

  // Bottom tab: direct page buttons (overview, tracker, chat, activity)
  document.querySelectorAll('.mob-tab[data-mob]').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var target = btn.dataset.mob;
      // activate dpage
      document.querySelectorAll('.dpage').forEach(function(p) { p.classList.remove('act'); });
      document.querySelectorAll('.dsi').forEach(function(s) { s.classList.remove('act'); });
      var dp = document.getElementById('dp-' + target);
      if (dp) dp.classList.add('act');
      var si = document.querySelector('[data-dp="' + target + '"]');
      if (si) si.classList.add('act');
      // activate mob tab
      document.querySelectorAll('.mob-tab').forEach(function(t) { t.classList.remove('act'); });
      btn.classList.add('act');
      // close drawer
      if (mobDrawer) mobDrawer.classList.remove('open');
      // scroll to top of main
      var dm = document.getElementById('dmain');
      if (dm) dm.scrollTop = 0;
    });
  });

  // Open tool drawer
  if (mobToolsBtn) mobToolsBtn.addEventListener('click', function() {
    if (mobDrawer) mobDrawer.classList.toggle('open');
  });

  // Close drawer X
  if (mobDrawerX) mobDrawerX.addEventListener('click', function() {
    if (mobDrawer) mobDrawer.classList.remove('open');
  });

  // Tool picker buttons inside drawer
  document.querySelectorAll('.mob-tool-btn[data-dp]').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var target = btn.dataset.dp;
      // activate dpage
      document.querySelectorAll('.dpage').forEach(function(p) { p.classList.remove('act'); });
      document.querySelectorAll('.dsi').forEach(function(s) { s.classList.remove('act'); });
      document.querySelectorAll('.mob-tool-btn').forEach(function(b) { b.classList.remove('act'); });
      var dp = document.getElementById('dp-' + target);
      if (dp) dp.classList.add('act');
      var si = document.querySelector('[data-dp="' + target + '"]');
      if (si) si.classList.add('act');
      btn.classList.add('act');
      // close drawer, mark AI Tools tab as active
      if (mobDrawer) mobDrawer.classList.remove('open');
      document.querySelectorAll('.mob-tab').forEach(function(t) { t.classList.remove('act'); });
      if (mobToolsBtn) mobToolsBtn.classList.add('act');
      // scroll to top
      var dm = document.getElementById('dmain');
      if (dm) dm.scrollTop = 0;
    });
  });

  // Close drawer on outside tap
  document.addEventListener('click', function(e) {
    if (mobDrawer && mobDrawer.classList.contains('open')) {
      if (!mobDrawer.contains(e.target) && e.target !== mobToolsBtn && !mobToolsBtn.contains(e.target)) {
        mobDrawer.classList.remove('open');
      }
    }
  });

  // Also hook showDPage so sidebar clicks (desktop) keep in sync
  var _origShowD = window.showDPage;
  window.showDPage = function(id) {
    if (_origShowD) _origShowD(id);
    // sync mobile drawer active state
    document.querySelectorAll('.mob-tool-btn').forEach(function(b) {
      b.classList.toggle('act', b.dataset.dp === id);
    });
  };
})();

})();

// ── AUTOMATION FILTER BAR ─────────────────────────────────────────
function afFilter(btn, filter) {
  document.querySelectorAll('.af-btn').forEach(function(b) { b.classList.remove('act'); });
  btn.classList.add('act');
  document.querySelectorAll('.af-card').forEach(function(card) {
    if (filter === 'all') {
      card.style.display = '';
    } else {
      var tags = (card.dataset.tags || '').split(' ');
      card.style.display = tags.includes(filter) ? '' : 'none';
    }
  });
}

// ── PROOF DEMO (homepage demo spotlight) ───────────────────────────
async function runProofDemo() {
  var input = document.getElementById('proof-input');
  if (!input || !input.value.trim()) return;
  var outDiv = document.getElementById('proof-out');
  var resultDiv = document.getElementById('proof-result');
  if (!outDiv || !resultDiv) return;
  outDiv.style.display = 'block';
  resultDiv.textContent = '⚡ Building your blueprint...';
  resultDiv.style.color = 'var(--mut)';
  try {
    var r = await fetch((window.AI_ENDPOINT||'/api/claude'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': getKey(),
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 1000,
        system: AC_SYSTEM,
        messages: [{ role: 'user', content: input.value.trim() }]
      })
    });
    var d = await r.json();
    var text = d.content && d.content[0] ? d.content[0].text : 'Could not generate blueprint. Please try again in a moment.';
    resultDiv.textContent = text;
    resultDiv.style.color = 'var(--txt)';
  } catch(e) {
    resultDiv.textContent = 'Connection error: ' + e.message;
    resultDiv.style.color = 'var(--red)';
  }
}

// ── AUTOMATION CONSULTANT ─────────────────────────────────────────
var AC_SYSTEM = "You are James Earl Medrano's Automation Consultant AI — an expert in n8n, Zapier, Claude API, Notion, Google Sheets, Gmail, Slack, and workflow automation. James built a production AI support router in n8n with cost routing (Haiku vs Sonnet), circuit-breaker failover (Anthropic → OpenAI), and multi-provider response normalization.\n\nWhen given a business problem, respond with a concrete automation blueprint in this format:\n\n**THE AUTOMATION: [name it]**\n\n**Tools I'd use:** [list specific tools]\n\n**Trigger:** [what starts the workflow]\n\n**Flow (step by step):**\n1. [step]\n2. [step]\n...\n\n**Time saved:** [estimate]\n**Complexity:** [Beginner / Intermediate / Advanced]\n\n**James's note:** [1-2 sentences on a gotcha or best practice from real experience]\n\nBe specific, practical, and opinionated. No waffle.";

function acQuick(prompt) {
  document.getElementById('ac-input').value = prompt;
  runAutoConsult();
}

async function runAutoConsult() {
  var input = document.getElementById('ac-input').value.trim();
  if (!input) return;
  var outDiv = document.getElementById('ac-out');
  var resultDiv = document.getElementById('ac-result');
  outDiv.style.display = 'block';
  resultDiv.textContent = '⚡ Building your automation blueprint...';
  try {
    var r = await fetch((window.AI_ENDPOINT||'/api/claude'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': getKey(),
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 1000,
        system: AC_SYSTEM,
        messages: [{ role: 'user', content: input }]
      })
    });
    var d = await r.json();
    resultDiv.textContent = d.content[0].text;
  } catch(e) {
    resultDiv.textContent = 'Error: ' + e.message;
  }
}



// ═══════════════════════════════════════════════════════════════════
// AUTOMATION PLAYGROUND — Node Connector Puzzle Game v3
// Strategy: CSS handles sizing (width:100%), JS reads offsetWidth
// at draw time. No clientWidth-when-hidden bugs.
// ═══════════════════════════════════════════════════════════════════






// ═══════════════════════════════════════════════════════════════════
// AUTOMATION PLAYGROUND — DIV+SVG based (no canvas sizing bugs)
// Nodes = absolutely positioned divs  |  Lines = SVG paths
// ═══════════════════════════════════════════════════════════════════
