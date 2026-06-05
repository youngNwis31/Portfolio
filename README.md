# James Earl Medrano — AI Portfolio + Job Hunter Dashboard

> 🌐 **Live site:** [your-name.netlify.app](https://your-name.netlify.app)  
> 📁 **One single HTML file** — no build tools, no dependencies, deploys anywhere in seconds.

---

## 🚀 What This Is

A fully unified, cyberpunk-themed **personal portfolio + AI-powered job hunter dashboard** built as a single `index.html` file. Powered by the **Claude Sonnet AI API** with 19 live AI tools that help James — and impress any HR who lands on the page.

---

## ✨ Features

### 🎨 Portfolio Page
| Feature | Details |
|---|---|
| Animated hex grid canvas | Procedurally drawn cyberpunk background |
| Floating particles | 28 color particles with randomized paths |
| Custom cyberpunk cursor | Crosshair that turns red on hover |
| Live Manila clock | Real-time PHT timezone clock in the hero |
| Typewriter hero name | Letter-by-letter animation for "JAMES EARL MEDRANO" |
| Scramble role text | Matrix-style text scramble for the job title |
| Scroll reveal animations | `.rv` elements fade up on scroll via IntersectionObserver |
| Animated skill bars | Canvas-based bars animate when scrolled into view |
| Radar chart | 5-axis skill radar drawn on `<canvas>` |
| Animated stat counters | Numbers count up when visible |
| Social sidebar | Fixed left sidebar with LinkedIn, GitHub, Facebook, Instagram, X |
| HR notification simulator | Rotating fake recruiter activity every 15 seconds |
| Achievement toasts | Section achievements fire as you scroll |
| Light/dark theme toggle | CSS variable swap with localStorage |
| Print resume button | Print stylesheet hides all UI chrome |
| Back-to-top button | Appears after 600px scroll |
| Sound toggle | Web Audio API beeps on interactions |
| Mobile hamburger menu | Full-screen mobile nav with social links |
| Konami code easter egg | ↑↑↓↓←→←→BA → opens secret terminal |
| JAMES_OS terminal | Retro terminal with 10+ commands |
| JEM-BOT chatbot | Keyword-based chat about James |

### 🤖 AI Dashboard (17 Claude-Powered Tools)
| # | Tool | What it does |
|---|---|---|
| 1 | 🎯 **Job Fit Analyzer** | Paste any JD → match % + hiring recommendation |
| 2 | ✍️ **Cover Letter Generator** | Tone selector + role → full tailored letter |
| 3 | 🎤 **Interview Coach** | 10 question chips + custom → model STAR answers |
| 4 | 📧 **Cold Email Builder** | Company + angle → subject + body with copy button |
| 5 | 🔔 **Follow-Up Email** | 6 situational steps → the right email at the right time |
| 6 | 🤖 **ATS Optimizer** | Keywords + role → full ATS-optimized resume |
| 7 | 💼 **LinkedIn Optimizer** | Target + chips → headline + About section |
| 8 | 💰 **Salary Negotiator** | Offer vs target → negotiation script + 2026 PH benchmarks |
| 9 | 🎬 **Mock Video Interview** | 10 progressive questions + model answers |
| 10 | 🛤️ **Career Path Advisor** | Goal + timeframe → step-by-step roadmap |
| 11 | 🏆 **Reference Letter** | Reference type + role → full professional letter |
| 12 | 📝 **Bullet Rewriter** | Weak bullets → ATS/Executive/Startup style |
| 13 | 📅 **Daily Job Hunt Planner** | Hours + stage → timed daily plan |
| 14 | 💪 **Rejection Recovery Coach** | Rejection type → honest recovery plan |
| 15 | 🙏 **Thank-You Note Generator** | Interviewer + detail → post-interview email |
| 16 | 💬 **Live AI Chat** | Full Claude chat — 8 HR-focused quick prompts |
| 17 | ⚡ **Quick AI Orb** | 8 instant one-tap AI actions (bottom-left fab) |

### 📋 Dashboard Extras
- **Job Application Tracker** — add/track applications by status with live stats
- **HR Activity Feed** — rotating recruiter attention simulation
- **Portfolio Strength Scorer** — animated bars with AI improvement tips
- **2026 PH Salary Benchmarks** — built-in reference table

---

## 🗂️ File Structure

```
james-earl-medrano-portfolio/
│
├── index.html          ← The entire site (150KB, self-contained)
├── README.md           ← This file
└── .github/
    └── (optional CI for auto-deploy to Netlify)
```

Everything — HTML, CSS, JavaScript, animations, AI tools — lives in **one file**.  
No npm, no webpack, no React build step.

---

## 🛠️ How It Was Built

### Tech Stack
| Layer | Technology |
|---|---|
| **Structure** | Semantic HTML5 |
| **Styling** | Pure CSS3 — CSS Variables, Grid, Flexbox, animations |
| **Fonts** | Chakra Petch (body) + Space Mono (monospace/terminal) — Google Fonts |
| **Animation** | CSS keyframes + IntersectionObserver + requestAnimationFrame |
| **Canvas** | Native HTML5 Canvas API — hex grid, particles, radar chart |
| **AI Engine** | Anthropic Claude Sonnet (`claude-sonnet-4-20250514`) via REST API |
| **Sound** | Web Audio API — oscillator beeps on UI interactions |
| **Icons** | Emoji (zero external dependencies) |
| **Hosting** | Netlify (static, free tier) |

### Key CSS Techniques
- **CSS Variables** — entire theme (colors, fonts) in `:root` with instant light/dark swap
- **`clip-path: polygon()`** — angular cyberpunk button shapes
- **`backdrop-filter: blur()`** — frosted glass nav bar
- **`IntersectionObserver`** — scroll reveals and skill bar animations
- **`@keyframes`** — 15+ named animations (orbp, pip, bdota, ptrise, etc.)
- **Custom scrollbar** — 3px gradient scrollbar via `::-webkit-scrollbar`

### Key JavaScript Techniques
- **IIFE pattern** — `(function(){ 'use strict'; })()` — no global pollution
- **Async/await** — clean Claude API calls with error handling
- **IntersectionObserver** — performant scroll detection for reveals + counters
- **Web Audio API** — synthesized sound effects without audio files
- **Canvas 2D API** — hex grid (trigonometry), radar chart, particle system
- **requestAnimationFrame** — smooth 60fps hex grid animation loop
- **Event delegation** — efficient click handling across dynamic content

### Claude API Integration
```javascript
async function callClaude(prompt) {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1000,
      system: JAMES_CONTEXT,   // full profile injected as system prompt
      messages: [{ role: 'user', content: prompt }]
    })
  });
  const data = await response.json();
  return data.content[0].text;
}
```
The `JAMES_CONTEXT` system prompt contains James's full profile — experience, skills, salary expectations, availability — so every AI response is personalized and accurate.

### UI Layout — Fixed Button Positions (No Overlap)
```
RIGHT SIDE (utility controls):
  bottom:22px  right:22px  → ↑ Back to Top
  bottom:72px  right:22px  → 🔊 Sound Toggle
  bottom:122px right:22px  → ⬇ Print Resume

LEFT SIDE (AI tools — completely separate):
  bottom:22px  left:68px   → 🤖 AI Quick Panel (orb)
  bottom:22px  left:122px  → 🗨️ JEM-BOT Chat
```

---

## 🌐 Deploying to Netlify

### Step 1 — GitHub Setup
```bash
# Create a new repo at github.com/youngNwis31
# Name it: james-earl-medrano-portfolio  (or just: portfolio)

git init
git add index.html README.md
git commit -m "🚀 Launch: AI Portfolio + Job Hunter Dashboard"
git branch -M main
git remote add origin https://github.com/youngNwis31/james-earl-medrano-portfolio.git
git push -u origin main
```

### Step 2 — Netlify Deploy
1. Go to **netlify.com** → Log in with GitHub
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose **GitHub** → Select `james-earl-medrano-portfolio`
4. Settings:
   - Build command: *(leave blank)*
   - Publish directory: `.` *(root)*
5. Click **"Deploy site"**
6. Netlify gives you: `random-name.netlify.app`
7. Go to **Site settings → Domain** → Change to: `jamesmedrano.netlify.app`

### Step 3 — Add Netlify URL to README
Update the top of this README:
```markdown
> 🌐 **Live site:** [jamesmedrano.netlify.app](https://jamesmedrano.netlify.app)
```

### Step 4 — Add to Your Resume
In your resume header/contact section:
```
Portfolio: jamesmedrano.netlify.app
GitHub:    github.com/youngNwis31
```

---

## 🔄 How to Update

To make changes and redeploy:
```bash
# 1. Edit index.html locally
# 2. Commit and push
git add index.html
git commit -m "Update: [describe what you changed]"
git push

# Netlify auto-deploys within 30 seconds ✅
```

---

## 🔑 Claude API Key Setup

The site uses the Anthropic Claude API. For the AI tools to work:

**Option A — Browser-based (current setup)**  
The API is called directly from the browser. Anthropic's API supports browser calls when deployed on a public site. The API key is managed by Anthropic's infrastructure when using Claude.ai artifacts.

**Option B — If you want your own API key**  
1. Get a key at [console.anthropic.com](https://console.anthropic.com)
2. In `index.html`, find the `callClaude` function
3. Add your key to the headers:
```javascript
headers: {
  'Content-Type': 'application/json',
  'x-api-key': 'YOUR_KEY_HERE',
  'anthropic-version': '2023-06-01'
}
```
> ⚠️ Never commit real API keys to a public repo. Use environment variables or a backend proxy for production.

---

## 👤 About James Earl Medrano

| | |
|---|---|
| **Role** | AI Operations Analyst & IT Specialist |
| **Education** | BS IT — Pamantasan ng Lungsod ng Maynila, 2025 |
| **Location** | Malate, Manila, Philippines |
| **Status** | Open to Work — Full-time, Remote, Hybrid, Freelance |
| **Email** | Workwitheaaarl@gmail.com |
| **Phone** | +63 976 318 9033 |
| **GitHub** | [github.com/youngNwis31](https://github.com/youngNwis31) |
| **LinkedIn** | [linkedin.com/feed/](https://www.linkedin.com/feed/) |

### Experience
- **A.I. Analyst II (LLM)** — Innodata Knowledge Services · Jan–May 2026
- **IT Support & Case Resolution** — Alorica Teleservices · Jan 2025–Jan 2026
- **Jr. Technical Support** — BESPOKE IT Project Corp. · Feb–Jul 2024

### Top Skills
`Prompt Engineering 92%` `Data Annotation 90%` `LLM Evaluation 88%` `Troubleshooting 90%` `Advanced Excel 88%` `Power BI 84%`

---

## 📄 License

MIT — free to use, modify, and share.

---

*Built with ♥ from Malate, Manila — 2026*
