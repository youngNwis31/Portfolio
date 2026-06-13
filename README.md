# 🤖 James Earl Medrano — AI Portfolio + Job Hunter Dashboard

<div align="center">

![Status](https://img.shields.io/badge/Status-Open%20to%20Work-brightgreen?style=for-the-badge)
![Built With](https://img.shields.io/badge/Built%20With-HTML%20%2B%20Claude%20AI-00f0ff?style=for-the-badge)
![Location](https://img.shields.io/badge/Location-Manila%2C%20PH-9b4dff?style=for-the-badge)

**Live Site → [jamesmedrano.netlify.app](https://jamesmedrano.netlify.app)**

A unified cyberpunk-themed portfolio + AI-powered job hunter dashboard.  
One single HTML file. Zero build tools. 17 live Claude AI tools. Fully mobile-friendly.

</div>

---

## 📸 What It Looks Like

| Portfolio Page | AI Dashboard (Desktop) | AI Dashboard (Mobile) |
|---|---|---|
| Cyberpunk hero, skills, timeline | 17 AI tools in sidebar nav | Bottom tab bar + tool drawer |

---

## ✨ Features at a Glance

### 🎨 Portfolio Page
- Animated hex grid canvas background
- Custom cyberpunk cursor (crosshair, turns red on hover)
- Live Manila clock (PHT timezone)
- Typewriter + scramble animation on hero name
- Animated skill bars + 5-axis radar chart
- Scroll-reveal animations on every section
- Social sidebar (LinkedIn, GitHub, Facebook, Instagram, X)
- Mobile hamburger menu
- Light / dark theme toggle
- Print resume button
- Back-to-top button
- Gmail contact form (pre-fills compose window)
- Konami code easter egg → secret terminal (↑↑↓↓←→←→BA)

### 🤖 AI Dashboard — 17 Claude-Powered Tools

| # | Tool | What It Does |
|---|---|---|
| 1 | 🎯 Job Fit Analyzer | Paste any JD → match % + hiring recommendation |
| 2 | ✍️ Cover Letter | Tone selector + role → full tailored letter |
| 3 | 🎤 Interview Coach | 10 question chips + model STAR answers |
| 4 | 📧 Cold Email Builder | Company + angle → subject + body with copy |
| 5 | 🔔 Follow-Up Emails | 6 situational templates → right email every time |
| 6 | 🤖 ATS Resume Optimizer | Keywords + role → full ATS-optimized resume |
| 7 | 💼 LinkedIn Optimizer | Target role → headline + About section |
| 8 | 💰 Salary Negotiator | Offer vs target → negotiation script + PH benchmarks |
| 9 | 🎬 Mock Video Interview | 10 progressive questions + model answers |
| 10 | 🛤️ Career Path Advisor | Dream role + timeframe → step-by-step roadmap |
| 11 | 🏆 Reference Letter | Reference type + role → full professional letter |
| 12 | 📝 Bullet Rewriter | Weak bullets → ATS / Executive / Startup style |
| 13 | 📅 Daily Job Hunt Planner | Hours + stage → timed daily plan |
| 14 | 💪 Rejection Recovery Coach | What happened → honest recovery plan |
| 15 | 🙏 Thank-You Note | Interviewer + detail → post-interview email |
| 16 | 💬 Live AI Chat | Full Claude chat with 8 quick-prompt buttons |
| 17 | ⚡ Quick AI Orb | 8 instant one-tap AI actions (bottom-left fab) |

### 📋 Dashboard Extras
- **Job Application Tracker** — add/track by status (Applied, Interview, Offer, Rejected)
- **HR Activity Feed** — static recruiter signal showcase
- **Portfolio Strength Scorer** — animated bars + AI improvement tips
- **2026 PH Salary Benchmarks** — built-in reference table

### 📱 Mobile-Optimized Dashboard
- **Bottom tab bar** — Home | Tracker | AI Tools | Chat | HR Feed
- **Tool picker drawer** — 15 tools in a 3-column thumb-friendly grid, slides up
- **iOS zoom fix** — inputs set to 16px to prevent auto-zoom
- No sidebar clutter on small screens

---

## 🗂️ Repository Structure

```
james-earl-medrano-portfolio/
│
├── index.html        ← Entire website (159KB, self-contained)
└── README.md         ← This file
```

Everything — HTML, CSS, JavaScript, animations, AI API calls — in **one file**.  
No npm. No webpack. No dependencies. Loads instantly anywhere.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Structure | Semantic HTML5 |
| Styling | Pure CSS3 — Custom Properties, Grid, Flexbox, keyframe animations |
| Fonts | Chakra Petch + Space Mono via Google Fonts |
| Animation | CSS keyframes + IntersectionObserver + requestAnimationFrame |
| Canvas | HTML5 Canvas API — hex grid, radar chart, particles |
| AI Engine | Anthropic Claude Sonnet (`claude-sonnet-4-20250514`) |
| Sound | Web Audio API — subtle oscillator click |
| Deployment | Netlify (static, free tier) |

### Key CSS Techniques
- **CSS Variables** — full theme in `:root`, instant light/dark swap
- **`clip-path: polygon()`** — angular cyberpunk button shapes
- **`backdrop-filter: blur()`** — frosted glass nav bar
- **IntersectionObserver** — scroll reveals + skill bar animations
- **`@keyframes`** — 12+ named animations (hex grid, particles, cursor, typewriter)
- **Mobile-first breakpoints** — 980px (tablet) and 700px (mobile)

### Claude API Integration
```javascript
async function callClaude(prompt) {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1000,
      system: JAMES_CONTEXT,   // Full profile injected as system prompt
      messages: [{ role: 'user', content: prompt }]
    })
  });
  const data = await response.json();
  return data.content[0].text;
}
```

### UI Layout — Fixed Button Positions
```
RIGHT SIDE (no overlap, stacked):
  bottom: 22px  right: 22px  → ↑ Back to Top
  bottom: 72px  right: 22px  → 🔊 Sound Toggle
  bottom: 122px right: 22px  → ⬇ Print Resume

LEFT SIDE (AI tools, separate side):
  bottom: 22px  left: 68px   → 🤖 AI Quick Panel orb
  bottom: 22px  left: 122px  → 🗨️ JEM-BOT Chat
```

---

## 🚀 How to Deploy (Netlify)

### First-Time Setup
1. Go to **[netlify.com](https://netlify.com)** → sign up / log in with GitHub
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose **GitHub** → select this repository
4. Settings:
   - Build command: *(leave blank)*
   - Publish directory: `.` (root)
5. Click **"Deploy site"**
6. Netlify gives you a random URL like `amazing-name-123.netlify.app`
7. Go to **Site settings → Domain management** → click **"Change site name"**
8. Rename to: `jamesmedrano` → your site is now at `jamesmedrano.netlify.app` ✅

### Updating Your Site (after changes)
Every time you push to this GitHub repo, **Netlify auto-deploys within 60 seconds**.

```bash
# Option A — Command line (if you have git installed)
git add index.html
git commit -m "Update: describe what you changed"
git push

# Option B — GitHub web UI (no terminal needed)
# 1. Open this repo on github.com
# 2. Click index.html → click the pencil ✏️ icon → paste new content
# 3. Click "Commit changes"
# Netlify picks it up automatically ✅
```

### Manual Drag-and-Drop Deploy
If you don't want to touch GitHub at all:
1. Go to **netlify.com** → your site → **"Deploys"** tab
2. Drag and drop your updated `index.html` file onto the deploy area
3. Done — live in 30 seconds ✅

---

## 👤 About James Earl Medrano

| | |
|---|---|
| **Role** | AI Operations Analyst & IT Specialist |
| **Education** | BS Information Technology — PLM, 2025 |
| **Location** | Malate, Manila, Philippines |
| **Status** | Open to Work — Full-time, Remote, Hybrid, Freelance |
| **Email** | Workwitheaaarl@gmail.com |
| **Phone** | +63 976 318 9033 |
| **GitHub** | [github.com/youngNwis31](https://github.com/youngNwis31) |
| **LinkedIn** | [linkedin.com/feed/](https://www.linkedin.com/feed/) |
| **Facebook** | [facebook.com/eaarlsuuu](https://facebook.com/eaarlsuuu) |
| **Instagram** | [@eaarlsu](https://instagram.com/eaarlsu) |
| **X / Twitter** | [@eaarlsuu](https://x.com/eaarlsuu) |

### Work Experience
| Period | Role | Company |
|---|---|---|
| Jan–May 2026 | A.I. Analyst II (LLM) | Innodata Knowledge Services · Cebu |
| Jan 2025–Jan 2026 | IT Support & Case Resolution | Alorica Teleservices · Manila |
| Feb–Jul 2024 | Jr. Technical Support | BESPOKE IT Project Corp. · Makati |

### Core Skills
| Skill | Level |
|---|---|
| Prompt Engineering | 92% |
| Data Annotation | 90% |
| Troubleshooting | 90% |
| LLM Evaluation | 88% |
| Advanced Excel | 88% |
| Documentation | 86% |
| Power BI | 84% |
| Networks / Servers | 82% |
| Data Privacy | 82% |
| CRM Systems | 80% |
| Cybersecurity | 78% |

---

## 📄 License

MIT — free to use, modify, and share.

---

*Built with ♥ from Malate, Manila — 2026*  
*Powered by Anthropic Claude AI*
