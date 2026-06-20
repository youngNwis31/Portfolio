# 🛠️ System Build Log
### James Earl Medrano — AI Portfolio + Job Hunter Dashboard

This log documents the complete engineering process used to design, build, debug, and deploy this site — from first concept to live production. It exists so anyone (including future-me) can understand *how* and *why* this was built the way it was.

---

## 📦 Repository Contents

```
Portfolio/
├── index.html        ← Entire site: HTML + CSS + JS in one file (159KB)
└── README.md          ← Feature documentation + deploy instructions
```

No build tools, no `node_modules`, no bundler. **One file, zero dependencies, deploys anywhere.**

---

## 🗓️ Build Timeline

### Phase 1 — Concept & Architecture
**Goal:** Merge two separate projects — a personal portfolio and a job-hunting AI dashboard — into one unified, single-file website.

**Decisions made:**
- Single HTML file over a multi-file/React build → maximizes portability, works on any static host, no build step required
- Tab-based navigation (`Portfolio` ↔ `AI Dashboard`) inside one page rather than two separate pages → keeps one URL, one repo, one deploy
- Cyberpunk visual identity (cyan/violet neon, hex grid, Chakra Petch + Space Mono fonts) → distinct, memorable, signals "AI-native" before a recruiter reads a single word

---

### Phase 2 — Core Build
**What was built:**
- Full HTML5 structure: Hero, Why Hire Me, About, Experience timeline, Skills, Education, Contact
- CSS3 design system: custom properties (`:root` variables) for instant light/dark theme swapping
- Canvas-based animated hex grid background (`requestAnimationFrame` loop)
- Skill radar chart drawn natively on `<canvas>`
- 17 Claude-powered AI tools wired into a sidebar-navigated dashboard:
  Job Fit Analyzer · Cover Letter Generator · Interview Coach · Cold Email Builder · Follow-Up Emails · ATS Optimizer · LinkedIn Optimizer · Salary Negotiator · Mock Video Interview · Career Path Advisor · Reference Letter · Bullet Rewriter · Daily Planner · Rejection Coach · Thank-You Note · Live AI Chat · Quick AI Orb

  **Claude API integration pattern:**
  ```javascript
  async function callClaude(prompt) {
    const r = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
            headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                      model: 'claude-sonnet-4-20250514',
                            max_tokens: 1000,
                                  system: JAMES_CONTEXT,   // full profile injected as system prompt
                                        messages: [{ role: 'user', content: prompt }]
                                            })
                                              });
                                                const data = await r.json();
                                                  return data.content[0].text;
                                                  }
                                                  ```
                                                  Every tool reuses this single function — one source of truth, one place to debug, one place to update the model.

                                                  ---

                                                  ### Phase 3 — JavaScript Debugging
                                                  **Problem encountered:** The file was generated in parts via a Python build script and concatenated. Python's string-writing process introduced literal newline characters inside JavaScript string literals and — in a few cases — between statements, which JS interprets as broken syntax.

                                                  **Debugging method:**
                                                  1. Extracted the script block and ran node --check to isolate syntax errors
                                                  2. Used binary search across line ranges to pinpoint exact failure points
                                                  3. Wrote a character-level scanner in Python that tracked whether the parser was inside a string vs. outside, and corrected stray escape sequences accordingly
                                                  4. Rebuilt the broken sections (cold email handler, terminal command map, mock interview question array) from scratch with explicit escaping instead of relying on raw newlines

                                                  **Result:** Zero syntax errors confirmed via node --check before every deploy.

                                                  ---

                                                  ### Phase 4 — UX Overhaul: Removing Popup Overload
                                                  **Problem reported:** The original build had too many simultaneous attention-grabbing elements — achievement unlock toasts, a rotating "HR is viewing your profile" banner firing every 15 seconds, toast notifications, and section-completion popups. This risked overwhelming recruiters instead of impressing them.

                                                  **What was removed:**
                                                  | Removed | Why |
                                                  |---|---|
                                                  | Achievement unlock popups | Fired on every scroll section — too frequent, gamified rather than professional |
                                                  | Rotating HR activity banner | Auto-fired every 15s regardless of user action — felt fake/spammy |
                                                  | Toast notification system | Stacked with other popups, added visual noise |
                                                  | Auto-rotating feed interval | Constantly injected new DOM nodes — distracting and unnecessary |
                                                  | Sound fanfares on every AI response | Reduced to a single subtle click sound, used sparingly |

                                                  **What was intentionally kept:**
                                                  - Hex grid background — but opacity reduced from 0.35 to 0.18 (subtle, not distracting)
                                                  - Particle count reduced from 28 to 10
                                                  - Skill bars + radar chart — animate once on scroll-into-view, then stay static
                                                  - Live Manila clock — single interval, 1-second tick, no visual interruption
                                                  - JEM-BOT chatbot and AI Quick Orb — fully functional, but opt-in only (open when clicked, never auto-pop)
                                                  - Secret terminal via Konami code — harmless easter egg, doesn't fire unprompted

                                                  **Verification:** After cleanup, confirmed only one setInterval remains in the entire codebase (the clock tick).

                                                  ---

                                                  ### Phase 5 — Mobile Dashboard Redesign
                                                  **Problem reported:** On mobile, the AI Dashboard sidebar was hidden below 700px with no replacement — tool names were getting cut off and there was no way to navigate between the 17 AI tools on a phone.

                                                  **Solution built:**
                                                  - Bottom tab bar (5 tabs, always visible, thumb-reachable): Home, Tracker, AI Tools, AI Chat, HR Feed
                                                  - Slide-up tool drawer: tapping "AI Tools" opens a 3-column grid of all 15 individual tools with icon and label, closes automatically on selection or outside-tap
                                                  - iOS zoom fix: all input and textarea elements set to 16px font size to prevent Safari's auto-zoom-on-focus behavior
                                                  - Content padding: dashboard main content padded at the bottom so nothing hides behind the fixed tab bar
                                                  - Desktop sidebar navigation and mobile drawer navigation now share the same underlying state, so switching between desktop and mobile views stays in sync

                                                  ---

                                                  ### Phase 6 — Deployment Pipeline
                                                  **Stack chosen:**
                                                  - GitHub (youngNwis31/Portfolio) as the single source of truth
                                                  - Netlify, connected directly to the GitHub repo, set to auto-deploy on every push to main
                                                  - No CI/CD config needed — Netlify auto-detects a static index.html at the repo root

                                                  **Live workflow:**
                                                  ```
                                                  Edit index.html  →  Commit to GitHub  →  Netlify detects push  →  Auto-builds  →  Live in ~60s
                                                  ```

                                                  ---

                                                  ## 🧹 Repository Hygiene

                                                  This repo intentionally contains only the two files needed to run the site:
                                                  - index.html — the entire application
                                                  - README.md — documentation

                                                  Earlier in development, separate working files existed (a standalone dashboard prototype, duplicate portfolio drafts used during the merge process). These were never committed to this repository — they lived only in the local build workspace and were discarded once the unified index.html was finalized. The GitHub repo has never contained more than these two files.

                                                  ---

                                                  ## ✅ Current State (Verified)

                                                  | Check | Status |
                                                  |---|---|
                                                  | JavaScript syntax | Clean (node --check passes) |
                                                  | File size | 159 KB, 2,281 lines |
                                                  | AI tools wired to Claude API | All 17 functional |
                                                  | Popup/notification spam | Removed |
                                                  | Mobile navigation | Bottom tab bar + tool drawer |
                                                  | iOS input zoom bug | Fixed |
                                                  | Repository file count | 2 files (no clutter) |
                                                  | Live deployment | Auto-deploys via Netlify on GitHub push |

                                                  ---

                                                  ### Phase 7 — Ongoing Projects Showcase

**What changed:** Added a new Projects section to the portfolio (between Experience and Skills) featuring the two other active builds: CourtBook (a tennis court booking web app) and Arangkada AI (an offline-first rider assistant app for Filipino motorcycle delivery drivers).

**What was built:**
- A Figma-canvas-style step-by-step flow diagram for each app: a dot-grid canvas background, a title bar with traffic-light dots styled like a real Figma tab, numbered frame labels above each screen mockup, and curved dashed SVG connector arrows between frames — mimicking how Figma actually displays prototype flows
- A dedicated 3-tier AI fallback architecture diagram for Arangkada AI, showing how its AI assistant escalates from an offline knowledge base, to Gemini Flash when online, to an on-device LLM, to a rule-based fallback
- Full how-it-works writeups, tech stack pill lists, and 4 highlight callouts per project
- Live demo and GitHub repo links for CourtBook; GitHub repo link for Arangkada AI (mobile app, no web demo)

**Bug caught and fixed during this update:** an early draft of the CourtBook description accidentally used language from the Arangkada AI rider app ("a rider opens the app") instead of describing CourtBook's actual users. Caught and corrected to "a player opens the app" before this went live, with the surrounding paragraph double-checked to confirm no other cross-contamination between the two project descriptions.

---

### Phase 8 — Mobile UI/UX Overlap Fix

**Problem reported:** On mobile devices, multiple floating UI elements were overlapping each other and the new bottom tab bar, making parts of the site unusable on phones.

**Root cause found:** the site has two responsive breakpoints, 980px and 700px. When the mobile bottom tab bar (for the AI Dashboard) was added in an earlier session, the floating action buttons (back-to-top, sound toggle, print button, AI quick-orb, chatbot toggle) were never given mobile-specific positions. They kept their desktop coordinates, which placed them directly on top of the new 58px-tall bottom tab bar. Separately, two contradictory CSS rules existed in the same breakpoint: one hid the Portfolio/AI Dashboard tab switcher on mobile, while a second, later rule forced it back on screen, fighting for space with the hamburger menu icon in a way that caused crowding in the navigation bar.

**What was fixed:**
- Removed the contradictory tab-switcher visibility rule entirely
- Hid the desktop Portfolio/AI Dashboard tab switcher on mobile and replaced it with two clear buttons inside the slide-out mobile menu instead, so switching between Portfolio and Dashboard is still one tap away without crowding the top bar
- Repositioned every floating button (back-to-top, sound toggle, print, AI orb, chatbot, terminal, AI quick panel) to sit safely above the 58px bottom tab bar with consistent spacing between each one, so nothing stacks on top of anything else
- Added a small JavaScript change so the right-side utility buttons (back-to-top, sound, print) automatically hide while the AI Dashboard is open on mobile, since the bottom tab bar already provides navigation there and the extra buttons were unnecessary clutter in that view
- Added a dedicated tablet-width rule (701–1980px) to fix the navigation bar spacing in that in-between range, which had been overlooked previously

**Verification:** confirmed via the live deployed site that the new Projects section renders correctly with working Figma-style diagrams, and that the corrected mobile CSS removes both conflicting rules that were causing the overlap.

---

*This log is updated whenever a significant architectural or UX change is made to the site.*
