# James Earl Medrano — AI Portfolio + Job Hunter Dashboard

Live Site: https://jamesmedrano.netlify.app

A unified cyberpunk-themed portfolio and AI-powered job hunter dashboard. One single HTML file. Zero build tools. 17 live Claude AI tools. Fully mobile-friendly.

---

## Features at a Glance

### Portfolio Page

Animated hex grid canvas background, custom cyberpunk cursor, live Manila clock (PHT), typewriter and scramble hero animation, animated skill bars and radar chart, scroll-reveal animations, social sidebar (LinkedIn, GitHub, Facebook, Instagram, X), mobile hamburger menu, light/dark theme toggle, print resume button, back-to-top button, Gmail contact form, and a Konami code easter egg that opens a secret terminal.

### AI Dashboard — 17 Claude-Powered Tools

| # | Tool | What It Does |
|---|---|---|
| 1 | Job Fit Analyzer | Paste any JD, get match % + hiring recommendation |
| 2 | Cover Letter | Tone selector + role, full tailored letter |
| 3 | Interview Coach | 10 question chips + model STAR answers |
| 4 | Cold Email Builder | Company + angle, subject + body with copy |
| 5 | Follow-Up Emails | 6 situational templates |
| 6 | ATS Resume Optimizer | Keywords + role, full ATS-optimized resume |
| 7 | LinkedIn Optimizer | Target role, headline + About section |
| 8 | Salary Negotiator | Offer vs target, negotiation script + PH benchmarks |
| 9 | Mock Video Interview | 10 progressive questions + model answers |
| 10 | Career Path Advisor | Dream role + timeframe, step-by-step roadmap |
| 11 | Reference Letter | Reference type + role, full professional letter |
| 12 | Bullet Rewriter | Weak bullets to ATS / Executive / Startup style |
| 13 | Daily Job Hunt Planner | Hours + stage, timed daily plan |
| 14 | Rejection Recovery Coach | What happened, honest recovery plan |
| 15 | Thank-You Note | Interviewer + detail, post-interview email |
| 16 | Live AI Chat | Full Claude chat with 8 quick-prompt buttons |
| 17 | Quick AI Orb | 8 instant one-tap AI actions |

### Dashboard Extras

Job Application Tracker with status tracking, a static HR Activity Feed, an animated Portfolio Strength Scorer with AI tips, and built-in 2026 PH Salary Benchmarks.

### Mobile-Optimized Dashboard

Bottom tab bar (Home, Tracker, AI Tools, Chat, HR Feed), a slide-up tool picker drawer with all 15 tools in a 3-column grid, an iOS zoom fix on inputs, and no sidebar clutter on small screens.

---

## Ongoing Projects

Beyond this portfolio, here are two active builds also under development on GitHub.

### CourtBook — Tennis Court Booking App

Live: https://tenniscourtbooker.netlify.app

Repo: https://github.com/youngNwis31/tennis-court-booker

A full-stack web app for browsing and booking tennis courts across Metro Manila. Built with React 19, TypeScript, Supabase, and Tailwind CSS v4.

How it works: users browse 18 real Metro Manila courts on an interactive Leaflet map or list view, filter by city, surface type, or distance from their GPS location, then pick a date and book a 1-hour slot between 7 AM and 8 PM. Supabase handles authentication (email/password plus Google OAuth) and row-level security so each user can only manage their own bookings. An AI layer adds playing tips based on weather and surface, a 5-question court recommender quiz, smart price alerts, and personalized recommendations based on booking history. The app also supports Filipino and English, dark mode, achievement badges, player matchmaking, and a 3-day weather forecast pulled from the free Open-Meteo API.

Highlights: 18 real courts across 12 Metro Manila cities priced in PHP, AI-powered quiz and price alerts and optimal slot finder, Supabase auth with row-level security, interactive Leaflet.js map with court comparison and GPS distance sorting, dark mode and Filipino/English toggle, mobile-responsive with iOS fixes, and 50+ React/TypeScript source files with a fully documented build log in its own README.

Tech stack: React 19, TypeScript, Vite, Tailwind CSS v4, React Router v7, Supabase (PostgreSQL, Auth, Row Level Security), Leaflet.js, Open-Meteo API, hosted on Netlify with auto-deploy from GitHub.

### Arangkada AI — Rider Road Assistant

Repo: https://github.com/youngNwis31/arangkada-ai

A Flutter-based offline-first navigation and AI assistant app built for Filipino motorcycle riders working on Grab, FoodPanda, Angkas, JoyRide, MoveIt, and Lalamove. Currently at v0.05 with 63 Dart files and roughly 14,500 lines of code, built entirely on free and open-source tools at a 0 peso budget.

How it works: the app runs on OpenStreetMap instead of paid map APIs, with OSRM for routing and Nominatim for geocoding, all fully offline-capable once map tiles are downloaded for a region. A 3-tier AI assistant first checks a built-in knowledge base of 100+ rider-specific topics for instant offline answers, then falls back to Gemini Flash when online for higher-quality responses, then falls back again to a small on-device LLM (Qwen2.5-0.5B) when fully offline, and finally to rule-based responses as a last resort. Riders can use voice commands in English or Taglish to navigate, log a ride, report a hazard, or check earnings hands-free. A built-in fare estimator calculates whether a trip offer is worth taking, labeled SULIT, PUWEDE NA, or LUGI based on projected earnings per hour after fuel cost. A flood and weather alert system pulls live data from Open-Meteo and overlays flood severity markers on the map during navigation.

Highlights: offline-first architecture where maps, search, and AI all work without internet, a 3-tier AI fallback chain from Knowledge Base to Gemini Flash to on-device LLM to rule-based, voice commands for navigation and ride logging and hazard reports and earnings queries, a fare estimator with a real-time SULIT/PUWEDE NA/LUGI verdict, flood and weather alerts with 3 severity levels and live map markers, storage optimized from roughly 2.1 GB down to about 280 MB total, and a detailed day-by-day development log with 27 commits across 7 days.

Tech stack: Flutter (Dart), OpenStreetMap via flutter_map, OSRM, Nominatim, Overpass API, SQLite (sqflite), Gemini 2.0 Flash REST API, an on-device Qwen2.5-0.5B GGUF model, Provider state management, and the Open-Meteo API.

---

## Repository Structure

This Portfolio repository contains index.html (the entire website, self-contained), README.md (this file), and BUILD_LOG.md (the full system build log documenting how this site was engineered).

Everything is in one file. No npm, no webpack, no dependencies. Loads instantly anywhere. See BUILD_LOG.md for the full engineering changelog on how this was built, debugged, and deployed.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Structure | Semantic HTML5 |
| Styling | Pure CSS3, Custom Properties, Grid, Flexbox |
| Fonts | Chakra Petch and Space Mono |
| Animation | CSS keyframes, IntersectionObserver, requestAnimationFrame |
| Canvas | HTML5 Canvas API for hex grid and radar chart |
| AI Engine | Anthropic Claude Sonnet, model claude-sonnet-4-20250514 |
| Sound | Web Audio API, subtle click only |
| Deployment | Netlify, static, free tier |

### Claude API Integration

```javascript
async function callClaude(prompt) {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1000,
      system: JAMES_CONTEXT,
      messages: [{ role: 'user', content: prompt }]
    })
  });
  const data = await response.json();
  return data.content[0].text;
}
```

---

## How to Deploy on Netlify

First-time setup: go to netlify.com, sign up with GitHub, click Add new site then Import an existing project, choose this repository, leave build command blank, set publish directory to a single dot, then click Deploy site. Rename the site to jamesmedrano in Site settings under Domain management.

Updating after changes: every push to this GitHub repo auto-deploys on Netlify within about 60 seconds. Just edit index.html on GitHub directly using the pencil icon, paste the new content, and commit.

---

## About James Earl Medrano

| Field | Value |
|---|---|
| Role | AI Operations Analyst and IT Specialist |
| Education | BS Information Technology, PLM, 2025 |
| Location | Malate, Manila, Philippines |
| Status | Open to Work, Full-time, Remote, Hybrid, Freelance |
| Email | Workwitheaaarl@gmail.com |
| Phone | +63 976 318 9033 |
| GitHub | github.com/youngNwis31 |
| LinkedIn | linkedin.com/feed/ |
| Facebook | facebook.com/eaarlsuuu |
| Instagram | @eaarlsu |
| X / Twitter | @eaarlsuu |

### Work Experience

| Period | Role | Company |
|---|---|---|
| Jan to May 2026 | A.I. Analyst II (LLM) | Innodata Knowledge Services, Cebu |
| Jan 2025 to Jan 2026 | IT Support and Case Resolution | Alorica Teleservices, Manila |
| Feb to Jul 2024 | Jr. Technical Support | BESPOKE IT Project Corp., Makati |

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
| Networks and Servers | 82% |
| Data Privacy | 82% |
| CRM Systems | 80% |
| Cybersecurity | 78% |

---

## License

MIT, free to use, modify, and share.

---

Built with love from Malate, Manila, 2026. Powered by Anthropic Claude AI.
