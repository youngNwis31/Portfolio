# James Earl Medrano — Portfolio

AI Automation VA portfolio. Static front-end + one serverless function (the Claude proxy).
Refactored from a single 3.5 MB `index.html` into a maintainable, modular project — **with zero change to product behavior.**

---

## Folder structure

```
portfolio-clean/
├── index.html                      # Structure only (259 KB, was 3.5 MB). No inline CSS/JS/media.
│
├── css/                            # Presentation layer
│   ├── styles.css                  # Global design system: tokens (:root), layout, components
│   └── components/                 # Component-scoped styles (loaded after global; id-namespaced)
│       ├── playground.css          #   #page-playground — the Automation Playground engine UI
│       ├── educational.css         #   .ap-edu — the "what is an automation" teaching layer
│       └── case-study.css          #   #case-study-arangkada — the flagship case study
│
├── js/                             # Behavior layer
│   ├── core/
│   │   ├── config.js               # Single source of truth: AI endpoint + key accessor (the seam)
│   │   └── app.js                  # Site shell: nav, theme, dashboard, AI tools, contact
│   └── features/
│       └── playground.engine.js    # Self-contained feature module (already an isolated IIFE)
│
├── assets/                         # Static media (was base64-inlined)
│   ├── images/                     # 13 deduplicated images (avatar referenced 3×, stored once)
│   └── media/                      # Arangkada walkthrough video + chime
│
├── netlify/
│   └── functions/
│       └── claude.js               # Serverless proxy — holds ANTHROPIC_API_KEY server-side
│
├── netlify.toml                    # /api/claude → function redirect + build config
└── og-cover.png                    # Social share image
```

---

## Clean-architecture breakdown (right-sized for a static site)

This is a static marketing site, not a business-logic application, so the goal is **separation of concerns + low coupling**, not enterprise layering (entities/use-cases/adapters would be over-engineering here). The boundaries that earn their keep:

| Layer | Owns | Files | Depends on |
|---|---|---|---|
| **Structure** | DOM, content, semantics | `index.html` | nothing |
| **Presentation** | look & feel, animation | `css/**` | design tokens in `styles.css` |
| **Behavior — shell** | nav, theme, tools, contact | `js/core/app.js` | `config.js` |
| **Behavior — features** | the Playground | `js/features/playground.engine.js` | `config.js` |
| **Configuration / seam** | where AI calls go, how the key is read | `js/core/config.js` | nothing |
| **Service (server)** | the only thing that holds the secret key | `netlify/functions/claude.js` | env var |

**Dependency direction is inward and one-way:** features and the shell depend on `config.js`; nothing depends on them. The secret key lives only on the server side of the seam. Swapping the AI backend (proxy → different host, or mock for testing) is a one-line change in `config.js` — no feature code touches a URL.

Load order (defined in `index.html`): `config.js` → `app.js` → `playground.engine.js`. Config is first so the endpoint/accessors exist before any feature reads them. (They're only read on user interaction, so this is provably behavior-identical to the original order.)

---

## What changed, and why

| Smell (before) | Fix (after) | Principle |
|---|---|---|
| One 3.5 MB file mixing HTML, CSS, JS, and media | Split into structure / presentation / behavior / assets | Separation of concerns |
| ~2.8 MB of base64 media in the HTML | Externalized to `assets/`; HTML is now 259 KB (**13.6× smaller**) | Scalability, cacheability |
| Same headshot embedded 3× | Deduplicated — stored once, referenced 3× | DRY |
| 1 global + 3 component stylesheets all inline | Global design system + id-scoped component CSS files | Modularity |
| AI endpoint URL implied in call sites | Centralized in `config.js` as the single seam | Low coupling |
| Two 1,300/800-line scripts inline | Isolated modules; feature engine already encapsulated | Modularity |

**Cacheability win (scalability):** browsers now cache CSS/JS/images independently. A content edit re-downloads ~259 KB, not 3.5 MB. The 2.8 MB of media is fetched once and cached across visits — materially faster repeat loads on the phones recruiters use.

---

## Behavior preservation — verified, not assumed

- Markup element IDs: **identical** to the original.
- JavaScript: **byte-for-byte identical** (relocated, not rewritten).
- All four stylesheets preserved; cascade order maintained via `<head>` link order.
- Every `assets/` reference resolves; all modules pass `node --check`.

No product behavior was changed. This was a structural refactor only.

---

## Run & deploy

**Local:** serve the folder (don't open via `file://` — the proxy needs HTTP):
```bash
npx serve portfolio-clean        # or: python3 -m http.server -d portfolio-clean
```
(Live AI tools only work once deployed, since they call the serverless function.)

**Deploy (Netlify):**
1. Drag this folder onto app.netlify.com/drop.
2. Site settings → Environment variables → `ANTHROPIC_API_KEY = sk-ant-…` (and optionally `ALLOWED_HOST = yourdomain`).
3. Redeploy.

---

## Stage-2 roadmap (do incrementally, with browser testing — not a big-bang rewrite)

`js/core/app.js` is still a 1,300-line shell. The senior move is to decompose it *one seam at a time*, verifying in a browser after each step, rather than rewriting it blind. Suggested cut lines, lowest-risk first:

1. `core/theme.js` — dark/light toggle (small, self-contained, near-zero risk).
2. `core/navigation.js` — `navTo` / `switchTab` / mobile menu.
3. `services/ai.service.js` — wrap `callClaude` so tools depend on a service, not `fetch`.
4. `features/ai-tools.js` — Recruiter Brief, Interview Coach, Cold Email, Chat.
5. `features/dashboard.js`, `features/contact.js`.

Each extraction: move the functions, keep them on the global namespace (the inline `onclick` handlers depend on it) **or** migrate handlers to `addEventListener` in the same commit, then re-test. Longer term, the 117 inline `on*=` handlers and 840 inline `style=` attributes are the remaining coupling to retire — but only behind tests, because they're load-bearing.
