# AI Bestie Studio™ v2.0
### The Complete AI Creator Operating System™

Built by **AI Bestie Club™** — teaching women to build, grow, and monetize AI influencer brands.

---

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## What's Built (All 6 Phases)

### Phase 2 — AI Character Builder™
- 4-step wizard: Identity → Physical → Style → Brand
- Live preview card updates as you type
- Skin tone visual picker with hex color swatches
- Emoji avatar selector (12 options)
- Personality traits (up to 5), energy types, content niches
- Zod validation + local storage save
- Completion progress bar

### Phase 3 — Config-Driven Builders
- Outfit Builder (type, designer brand, shoes, details)
- Location Builder (20+ locations with emoji, time of day, season)
- Pose & Expression Builder
- Camera & Shot Builder (camera body, lens, shot type, angle)
- Lighting Builder (visual grid with descriptions)
- Mood & Creative Builder
- All driven by `builder-config.ts` — zero hardcoded JSX

### Phase 4 — Live Prompt Generator™
- Real-time assembly from all builder selections
- Prompt quality score (0–100: Basic → Elite) with animated bar
- **Enhance** button — adds editorial modifiers from curated pools
- Copy to clipboard with flash state
- **Save to Vault** with inline title form (Enter/Escape)
- Negative prompt with 6 toggle presets
- Auto-history logging on save

### Phase 5 — Prompt Vault, Templates, History, Settings
- **Prompt Vault**: grid/list toggle, search, collections, favorites, duplicate/delete
- **Templates**: category filter chips, search, featured row, 10 preset packs
- **History**: grouped by date, search, copy per entry, clear all
- **Settings**: default niche/lighting/camera, 5 behavior toggles, animated storage bar, export JSON, clear data

### Phase 6 — Mobile, Animations, Accessibility
- Fixed bottom mobile nav with safe-area padding and backdrop blur
- Desktop sidebar with ARIA landmarks and `aria-current`
- Framer Motion stagger animations on dashboard
- `AnimatePresence` on character grid and prompt vault
- `loading.tsx` skeleton screen
- `not-found.tsx` 404 page
- Touch targets ≥ 44px, `no-tap-highlight` on all interactive chips
- `prefers-reduced-motion` respected in CSS
- Suspense boundary on Create page for `useSearchParams`

---

## Tech Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 3 + tailwindcss-animate |
| Animation | Framer Motion 11 |
| Validation | Zod 3 |
| UI Primitives | Radix UI (Select, Switch, Label, Slot) |
| Icons | Lucide React |
| Fonts | Inter + Playfair Display (Google Fonts) |
| Storage | localStorage (no backend) |

---

## Design System — Black Girl Luxury™

| Token | Value |
|---|---|
| Background | `#090611` |
| Card | `#141022` |
| Border | `#3A2462` |
| Purple | `#9B59E8` |
| Pink | `#E85998` |
| Text Primary | `#FFFFFF` |
| Text Faint | `#5A4D7A` |

---

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── dashboard/          # Home dashboard
│   ├── create/             # Main builder page
│   ├── characters/         # Character library
│   ├── prompt-vault/       # Saved prompts + collections
│   ├── templates/          # Template library
│   ├── history/            # Generation history
│   ├── campaigns/          # Coming soon
│   └── settings/           # App settings
├── components/
│   ├── character-builder/  # Phase 2: CharacterBuilder
│   ├── prompt-builder/     # Phase 3-4: Builders + LivePromptBox
│   ├── dashboard/          # Dashboard widgets
│   ├── layout/             # AppShell, Sidebar, TopNav, MobileNav
│   ├── shared/             # BuilderSection, SelectionChip
│   └── ui/                 # Button, Badge, Input, Select, etc.
├── data/
│   ├── options.ts          # All builder option arrays
│   ├── presets.ts          # 10 preset packs
│   └── builder-config.ts   # Phase 3 section configs
├── hooks/                  # useCharacters, usePromptVault, useHistory, useSettings
├── lib/                    # utils, storage, prompt-engine
└── types/                  # All TypeScript types + Zod schemas
```

---

## Deploy to Vercel

```bash
npx vercel
```

Or connect the GitHub repo in the Vercel dashboard. No environment variables needed — fully client-side.

---

*Built with 💜 by AI Bestie Club™ — aibestieclub.com* git init
git add .
git commit -m "initial commit"
git branch -M main
git remote add origin https://github.com/YOURUSERNAME/ai-bestie-studio.git
git push -u origin main

