# Looksmaxxing AI — Project Roadmap

## Phase 1 — Foundation `✅ Complete`

| Task | File(s) | Status |
|------|---------|--------|
| Project scaffold (Next.js 16, Tailwind v4, Anthropic SDK) | `package.json` | ✅ |
| Shared TypeScript types | `lib/types.ts` | ✅ |
| Claude analysis engine | `lib/claude.ts` | ✅ |
| Minimalist Organic theme (colors, fonts, tokens) | `app/globals.css`, `app/layout.tsx` | ✅ |

---

## Phase 2 — Core Feature `✅ Complete`

Build the end-to-end photo → analysis flow.

| Task | File(s) | Status |
|------|---------|--------|
| API route: receive photo, call analysis engine, return JSON | `app/api/analyze/route.ts` | ✅ |
| Photo capture step: upload or camera input | `app/page.tsx` | ✅ |
| Loading state: breathing gradient card | `components/LoadingShimmer.tsx` | ✅ |
| Results view: Glow Score, annotated photo, insights, routine | `components/ResultsView.tsx`, `components/AnnotatedPhoto.tsx` | ✅ |

**Acceptance criteria:** A user can upload a photo, see a loading screen, and receive a formatted analysis with score, insights, and a daily routine.

---

## Phase 3 — Polish & UX `✅ Complete`

| Task | Notes | Status |
|------|-------|--------|
| Mobile-first responsive layout | Tailwind breakpoints throughout | ✅ |
| Smooth transitions between steps | CSS `panelClass` fade + slide | ✅ |
| Error states (bad image, API failure) | Toast component + `NoFaceError` sentinel | ✅ |
| Empty/onboarding state copy | Brand voice headline + 3-step instructions | ✅ |
| Favicon + Open Graph meta image | `layout.tsx` updated; drop assets in `public/` to activate | ✅ |

---

## Phase 4 — Deployment `⬜ Planned`

| Task | Notes | Status |
|------|-------|--------|
| Environment variable audit | Ensure `ANTHROPIC_API_KEY` is set in prod | ⬜ |
| Vercel deploy | `vercel --prod` | ⬜ |
| Custom domain (optional) | Vercel dashboard | ⬜ |

---

## Design Tokens (reference)

| Token | Value | Tailwind class |
|-------|-------|----------------|
| Background | `#FAFAFA` | `bg-background` |
| Foreground | `#2C2C2C` | `text-foreground` |
| Warm accent | `#C4A882` | `bg-warm-accent` / `text-warm-accent` |
| Sand | `#E8D5B7` | `bg-accent-sand` |
| Beige | `#F5F5DC` | `bg-accent-beige` |
| Muted text | `#9C9C9C` | `text-muted` |
| Heading font | Playfair Display | `font-serif` |
| Body font | Geist Sans | `font-sans` |
