# CLAUDE.md — Looksmaxxing AI

## Project Vision & Vibe
- **Core Identity:** Expert Aesthetic & Wellness Consultant providing "objective but kind" physical improvement plans.
- **Design Aesthetic:** Minimalist Organic. 
- **Palette:** Light and airy. Primary: Warm white (#FAFAFA); Accents: Soft beige (#F5F5DC) and sand tones.
- **Typography:** Elegant serif for headings; clean sans-serif for body text.

## Tech Stack & Commands
- **Framework:** Next.js (App Router)
- **Dev Server:** `npm run dev` (Runs on localhost:3000)
- **AI Integration:** Claude 3.5 Sonnet via `@anthropic-ai/sdk`
- **Styling:** Tailwind CSS v4 (Using `@theme` in globals.css)

## Architecture Overview
- **Logic Layer:** Analysis engine is located in `lib/claude.ts`.
- **API Bridge:** The frontend communicates with the AI via `app/api/analyze/route.ts`.
- **Data Types:** Shared TypeScript interfaces are in `lib/types.ts`.

## Implementation Rules
- **Tone:** Science-based, professional, and empathetic. Avoid harsh critiques.
- **Verification:** Always test backend logic after changes before updating the UI.
- **Environment:** Requires `ANTHROPIC_API_KEY` (Stored in .env).