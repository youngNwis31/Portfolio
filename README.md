# James Earl Medrano — AI Portfolio + Job Hunter Dashboard

**Live Site:** https://jamesmedrano.netlify.app  
**GitHub:** https://github.com/youngNwis31/Portfolio  
**Stack:** Pure HTML5 · CSS3 · Vanilla JS · Claude API · Netlify

> A single self-contained HTML file. Zero build tools. Zero npm. Zero frameworks.  
> Just raw code, real AI, and a cyberpunk aesthetic — built from scratch by someone who needed a job and decided to build something worth hiring for.

---

## 🧠 Origin Story — How This Portfolio Was Born

### The Problem

In early 2026, James Earl Medrano was wrapping up a contract as an **AI Analyst II (LLM)** at Innodata Knowledge Services in Cebu — doing prompt engineering, LLM fine-tuning, and model QA on real production AI systems. When the contract ended in May 2026, he needed to find the next role fast.

The typical approach — a PDF resume and a LinkedIn profile — felt wrong for someone whose whole identity was being an AI-native builder. Generic templates don't show that you can actually build things. They tell. They don't show.

So instead of just applying, James built.

### The Goal

Build a portfolio that:
- **Proves** the claims on the resume by shipping real, working AI tools
- **Lets recruiters talk to an AI version of James** instead of reading a bio
- **Works as a job application in itself** — every tool in the dashboard is a live demonstration of what he can build
- **Runs entirely in one HTML file** with no backend, no database, no build step

### The Approach

The entire site lives in a single `index.html` file — ~3.2MB of hand-written HTML, CSS, and JavaScript. No React, no Vue, no webpack, no package.json. The decision was intentional: it's a statement. If you can build something this complex without a framework, you understand the fundamentals deeply enough to use any framework.

The Anthropic Claude API is called directly from the browser using `anthropic-dangerous-direct-browser-access: true` — also intentional. This is a portfolio demo, not a production app. The CORS header exists for exactly this use case.

---

## 🏗️ System Build Log

### v1.0 — Initial Build: Portfolio Foundation
**Date:** Early 2026 (pre-launch)

The site started as a static portfolio page — no AI, no dashboard, just the core sections:
- Hero section with typewriter animation and scramble text effect
- About section with skill bars
- Projects section for CourtBook and Arangkada AI
- Contact form via Gmail mailto
- Cyberpunk visual theme: hex grid canvas background, `#00b4c8` cyan accent, `Chakra Petch` + `Space Mono` fonts
- Custom animated cursor
- Animated skill bars and radar chart (HTML5 Canvas)
- Social sidebar (LinkedIn, GitHub, Facebook, Instagram, X)
- Light/dark theme toggle
- Back-to-top button
- Mobile hamburger menu
- Live Manila clock (PHT) in the nav

**Files:** `index.html` (static, no AI)

---

### v2.0 — AI Dashboard: 17 Tools Launch
**Date:** 2026 (pre-CORS fix)

Added a full AI-powered dashboard tab with **17 Claude-powered tools**:

| # | Tool |
|---|---|
| 1 | Job Fit Analyzer |
| 2 | Cover Letter Generator |
| 3 | Follow-Up Email Templates |
| 4 | ATS Resume Optimizer |
| 5 | Salary Negotiator |
| 6 | Interview Coach |
| 7 | Mock Video Interview |
| 8 | Career Path Advisor |
| 9 | Reference Letter Writer |
| 10 | Cold Email Builder |
| 11 | Daily Job Hunt Planner |
| 12 | Rejection Recovery Coach |
| 13 | Thank-You Note Generator |
| 14 | Job Tracker (local state) |
| 15 | HR Activity Feed (static) |
| 16 | Portfolio Strength Scorer |
| 17 | Live AI Chat |

**Problem:** All 17 tools were silently failing. The Anthropic API rejects direct browser requests without `anthropic-dangerous-direct-browser-access: true`. Tools appeared to load but returned no AI output.

**Files:** `index.html` — dashboard added, CORS bug present

---

### v3.0 — CORS Fix + Dashboard Redesign
**Date:** 2026-06-23

**Root bug fixed:** One missing header was killing all 17 tools. Added `anthropic-dangerous-direct-browser-access: true` to `callClaude()`:

```javascript
async function callClaude(prompt) {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'anthropic-dangerous-direct-browser-access': 'true'  // ← this was the fix
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 1000,
      system: JAMES_CONTEXT,
      messages: [{ role: 'user', content: prompt }]
    })
  });
  const data = await response.json();
  return data.content[0].text;
}
```

**Dashboard redesigned:** 13 tools removed. The ones removed were serving James the applicant — not showcasing James the builder. The dashboard was renamed from **"AI Job Hunter Command Center"** to **"AI Tools I Built"** and reframed as a capability demo.

| Removed (13) | Kept & Fixed (4) |
|---|---|
| Cover Letter Generator | ✅ Job Fit Analyzer |
| Follow-Up Email Templates | ✅ Interview Coach |
| ATS Resume Optimizer | ✅ Cold Email Builder |
| Salary Negotiator | ✅ Live AI Chat |
| Mock Video Interview | |
| Career Path Advisor | |
| Reference Letter Writer | |
| Daily Job Hunt Planner | |
| Rejection Recovery Coach | |
| Thank-You Note Generator | |
| Job Tracker (local state) | |
| HR Activity Feed (static) | |
| Portfolio Strength Scorer | |

**New: "Ask James's AI"** — A live Claude chat widget added between the Skills and Contact sections. HR and recruiters can talk directly to the portfolio. Quick-prompt buttons: Available now? · Top skills? · Why hire James? · Salary range? · Remote/hybrid? · His projects?

**New: Print Resume** — Clicking "⬇ Print Resume" hides the entire portfolio and renders a clean ATS-friendly resume via `@media print`. Matches the standalone `Medrano_James_Earl_Resume.pdf`.

**Nav update:** Added `🤖 Ask AI` link to both desktop and mobile menus.

**Deployment:** Pushed to GitHub → Netlify auto-deployed.

**Files changed:**
- `index.html` — CORS fix, dashboard redesign, Ask James AI, print resume
- `README.md` — first changelog
- `Medrano_James_Earl_Resume.pdf` — standalone resume (built with ReportLab)

---

### v4.0 — Model Upgrade: claude-sonnet-4-6
**Date:** 2026-06-23

**Model string updated:** `claude-sonnet-4-20250514` → `claude-sonnet-4-6`

This was a targeted 2-line change across the codebase:
- API call in `callClaude()`: model field updated
- Display label in Ask James's AI section: "Powered by claude-sonnet-4" → "Powered by claude-sonnet-4-6"

**README updated** with system build log.

**Deployment method:** GitHub API (PUT `/repos/.../contents/index.html`) with a Personal Access Token — the only reliable way to push a 3.14MB file since GitHub's web editor silently fails to load files over ~1MB.

**Files changed:**
- `index.html` — 2 occurrences updated
- `README.md` — v4.0 build log entry added

---

### v6.0 — HR Optimization: 6-Fix Battle Plan
**Date:** 2026-06-23

Portfolio redesigned to convert HR into callbacks. 6 targeted fixes based on audit of what was hurting conversion:

**Fix 1 — LinkedIn URL (all 11 occurrences):** Every LinkedIn link was pointing to  — HR clicking it saw a random news feed, not James's profile. All replaced with .

**Fix 2 — Hero headline rewritten:** Changed from "IT graduate bridging AI systems" (reads as IT support) to **"LLM Engineer · Prompt Specialist · AI Analyst II"** — the exact titles AI job posts search for. Subtitle updated to lead with real credentials: Innodata experience, live tools in production, 3 industries before 25.

**Fix 3 — AI Tools CTA surfaced in hero:** Added **"⚡ Try My Live AI Tools"** button directly in the hero CTA row — styled with the cyan/violet gradient so it stands out. HR now sees the live tools within 3 seconds of landing, without needing to find the dashboard tab.

**Fix 4 — Innodata metrics block:** Added 4 stat cards inside the Innodata experience entry: 500+ prompts engineered · 1,000+ annotation tasks · 5 LLM models tested · 5 months production work. Quantified numbers make the experience real to HR.

**Fix 5 — "Champion Me" hire pitch:** Added a one-paragraph pitch block in the Why Hire Me section with a Copy button. HR can copy-paste the pitch into a Slack message to their hiring manager — makes it easy to internally champion James without rewriting anything.

**Fix 6 — Job Fit Analyzer surfaced on portfolio page:** Added a full live Job Fit section between Projects and Ask James's AI. HR can paste any job description and get Claude's match analysis without navigating to the dashboard. Includes a "Try sample JD" button and a link to open the full tool.

**Files changed:**
-  — all 6 fixes applied
-  — v6.0 build log entry added

---

### v5.0 — Resume Update: Work Experience Refreshed
**Date:** 2026-06-23

**Resume section overhauled.** The print resume embedded in `index.html` was updated to reflect the latest real-world experience. This is the version shown when a recruiter clicks "⬇ Print Resume."

**Updated experience entries:**

| Role | Company | Period |
|---|---|---|
| A.I. Analyst II (LLM) | Innodata Knowledge Services, Inc. · Mandaue City, Cebu | Jan 2026 – May 2026 |
| IT Support & Case Resolution | Alorica Teleservices, Inc. · Cyberpod Centris, Manila | Jan 2025 – Jan 2026 |
| Jr. Technical Support | BESPOKE IT Project Corp. · GC Corporate Plaza, Makati | Feb 2024 – Jul 2024 |

**Skills section refreshed:**
- AI & LLM: Advanced Prompt Engineering · RLHF & Data Annotation · Side-by-Side Response Analysis · Vulnerability & QA Testing · AI Model Evaluation
- Software & Web: HTML5 · CSS3 · JavaScript · Web APIs · Git & GitHub · Netlify CI/CD · React · TypeScript · Flutter/Dart
- Technical Support: Enterprise Hardware · Network & Endpoint Security · POS Systems · Firewall Admin · Technical Documentation
- Data Analytics: PowerBI · Advanced Excel · Salesforce · Optis · Fraud Mitigation · Risk Analysis

**Deployment:** Full `index.html` pushed via GitHub API with PAT. Netlify auto-deployed within 60 seconds.

**Files changed:**
- `index.html` — resume section fully updated, model string kept at `claude-sonnet-4-6`
- `README.md` — v5.0 build log entry added (this entry)

---

## 🔧 Features

### Portfolio Page

| Feature | Detail |
|---|---|
| Hex grid background | HTML5 Canvas, animated |
| Custom cursor | Cyberpunk crosshair |
| Live Manila clock | PHT timezone, updates every second |
| Hero animation | Typewriter + character scramble |
| Skill bars | Animated on scroll |
| Radar chart | HTML5 Canvas, 6-axis skills |
| Scroll-reveal | IntersectionObserver on all sections |
| Social sidebar | LinkedIn, GitHub, Facebook, Instagram, X |
| Mobile nav | Hamburger menu with slide-in drawer |
| Theme toggle | Light / dark |
| Print resume | `@media print` — full ATS resume, no portfolio chrome |
| Back-to-top | Smooth scroll |
| Contact form | Gmail mailto |
| Easter egg | Konami code |
| Ask James's AI | Live Claude chat widget, 6 quick-prompt buttons |
| BUILD tag | HUD badge showing current version (`v5.0`) |

### AI Tools I Built — 4 Live Claude-Powered Demos

| # | Tool | What It Does |
|---|---|---|
| 1 | Job Fit Analyzer | Paste any JD → match %, hiring recommendation, strengths, gaps |
| 2 | Interview Coach | 10 question chips → model STAR answers tailored to James's real experience |
| 3 | Cold Email Builder | Company + angle → subject line + body with one-click copy |
| 4 | Live AI Chat | Full Claude conversation with 8 quick-prompt buttons |

### Ask James's AI (Portfolio Page)

Live chat widget between Skills and Contact. Quick-prompts:
- Available now?
- Top skills?
- Why hire James?
- Salary range?
- Remote/hybrid?
- His projects?

### Mobile-Optimized Dashboard

- Bottom tab bar: Home · Tracker · AI Tools · Chat · HR Feed
- Slide-up tool picker drawer with 4 tools in a grid
- iOS zoom fix on inputs (`font-size: 16px` minimum)

---

## 🗂️ Repository Structure

```
Portfolio/
├── index.html              ← Entire site (~3.2MB, self-contained)
├── README.md               ← This file + system build log
├── Medrano_James_Earl_Resume.pdf  ← Standalone resume PDF
└── BUILD_LOG.md            ← Original engineering build log
```

---

## ⚙️ Tech Stack

| Layer | Technology |
|---|---|
| Structure | Semantic HTML5 |
| Styling | Pure CSS3, Custom Properties, Grid, Flexbox |
| Fonts | Chakra Petch · Space Mono (Google Fonts) |
| Animation | CSS keyframes · IntersectionObserver · requestAnimationFrame |
| Canvas | HTML5 Canvas API — hex grid background + radar chart |
| AI Engine | Anthropic Claude Sonnet (`claude-sonnet-4-6`) |
| Sound | Web Audio API |
| Deployment | Netlify — static, free tier, auto-deploy from GitHub main |

---

## 🚀 Claude API Integration

```javascript
async function callClaude(prompt) {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'anthropic-dangerous-direct-browser-access': 'true'
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 1000,
      system: JAMES_CONTEXT,
      messages: [{ role: 'user', content: prompt }]
    })
  });
  const data = await response.json();
  return data.content[0].text;
}
```

> **Note:** `anthropic-dangerous-direct-browser-access: true` is required for browser-to-API calls. Without it, all requests return a CORS error with no visible failure. This was the root bug that silenced all 17 original tools for weeks.

---

## 📦 How to Deploy on Netlify

### First time
1. Push to GitHub
2. netlify.com → Add new site → Import from GitHub
3. Build command: *(leave blank)*
4. Publish directory: `.`
5. Deploy

### Updates
Push any commit to `main` → Netlify auto-deploys within ~60 seconds.

### Pushing large files (>1MB)
GitHub's web editor silently fails on files over ~1MB. Use the GitHub API:

```python
import base64, urllib.request, json

with open('index.html', 'rb') as f:
    b64 = base64.b64encode(f.read()).decode()

# Get current SHA
req = urllib.request.Request(
    'https://api.github.com/repos/USERNAME/Portfolio/contents/index.html',
    headers={'Authorization': 'Bearer YOUR_PAT', 'Accept': 'application/vnd.github+json'}
)
sha = json.loads(urllib.request.urlopen(req).read())['sha']

# Push
payload = json.dumps({'message': 'update', 'content': b64, 'sha': sha}).encode()
req2 = urllib.request.Request(
    'https://api.github.com/repos/USERNAME/Portfolio/contents/index.html',
    data=payload, method='PUT',
    headers={'Authorization': 'Bearer YOUR_PAT', 'Content-Type': 'application/json'}
)
urllib.request.urlopen(req2)
```

---

## 🔨 Ongoing Projects

### CourtBook — Tennis Court Booking App
**Live:** https://tenniscourtbooker.netlify.app  
**Repo:** https://github.com/youngNwis31/tennis-court-booker

React 19 · TypeScript · Supabase · Tailwind CSS v4 · Leaflet.js  
18 real Metro Manila courts on an interactive map. Filter by city, surface type, and distance. Book 1-hour slots between 7AM–8PM. AI layer: playing tips, court recommender quiz, price alerts, personalized recommendations.

### Arangkada AI — Rider Road Assistant
**Repo:** https://github.com/youngNwis31/arangkada-ai

Flutter/Dart · Offline-first · 3-tier AI fallback chain  
`v0.05` · 63 Dart files · ~14,500 LOC · ₱0 budget

Navigation and AI assistant for Filipino motorcycle riders. Works offline. 3-tier AI: Knowledge Base → Gemini Flash → on-device Qwen2.5-0.5B → rule-based fallback. Features: voice commands, fare estimator (SULIT/PUWEDE NA/LUGI verdict), flood and weather alerts, OpenStreetMap routing.

---

## 👤 About James Earl Medrano

| | |
|---|---|
| **Role** | AI Operations Analyst & IT Specialist |
| **Education** | BS Information Technology, PLM Intramuros · Graduated 2025 |
| **Location** | Malate, Manila, Philippines |
| **Status** | Open to Work — Full-time · Remote · Hybrid · Freelance |
| **Email** | Workwitheaaarl@gmail.com |
| **Phone** | +63 976 318 9033 |
| **GitHub** | github.com/youngNwis31 |
| **Portfolio** | jamesmedrano.netlify.app |

---

*Built with ☕ and determination from Malate, Manila. Powered by Anthropic Claude AI.*
