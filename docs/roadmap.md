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

## Phase 4 — Auth & User Accounts `✅ Complete`

| Task | File(s) | Status |
|------|---------|--------|
| NextAuth v5 config (Google provider, Neon adapter) | `auth.ts` | ✅ |
| Route protection (Next.js 16: `proxy.ts` replaces `middleware.ts`) | `proxy.ts` | ✅ |
| Neon DB schema (NextAuth tables + analyses history) | `lib/schema.sql` | ✅ |
| DB client | `lib/db.ts` | ✅ |
| Auth API handler | `app/api/auth/[...nextauth]/route.ts` | ✅ |
| Analyses API (save + list history) | `app/api/analyses/route.ts` | ✅ |
| Login page | `app/login/page.tsx` | ✅ |
| Google sign-in button (client component) | `components/GoogleSignInButton.tsx` | ✅ |
| User dashboard (analysis history) | `app/dashboard/page.tsx` | ✅ |
| Global header with auth state | `components/Header.tsx` | ✅ |
| Session provider wrapper | `components/Providers.tsx` | ✅ |
| Sign-out button | `components/SignOutButton.tsx` | ✅ |
| Session-aware analysis saving + privacy copy | `app/page.tsx` | ✅ |
| `AnalysisRecord` type | `lib/types.ts` | ✅ |

**Known prerequisite before auth works end-to-end:**
- Run `lib/schema.sql` in Neon SQL console to create tables
- Register `http://localhost:3000/api/auth/callback/google` in Google Cloud Console as an authorized redirect URI

---

## Phase 5 — Deployment `⬜ Planned`

| Task | Notes | Status |
|------|-------|--------|
| Run DB schema in Neon | Execute `lib/schema.sql` in Neon SQL console | ⬜ |
| Register Google OAuth callback | Add `https://<prod-domain>/api/auth/callback/google` to Google Cloud Console | ⬜ |
| Environment variable audit | `ANTHROPIC_API_KEY`, `DATABASE_URL_UNPOOLED`, `AUTH_GOOGLE_ID`, `AUTH_GOOGLE_SECRET`, `AUTH_SECRET` | ⬜ |
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
