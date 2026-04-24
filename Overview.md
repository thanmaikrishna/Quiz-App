# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

## Artifacts

### Quiz App (`artifacts/quiz-app`)
- **Type**: React + Vite (frontend-only, no backend)
- **Preview path**: `/`
- **Stack**: React, TypeScript, Tailwind CSS, Framer Motion, shadcn/ui, Lucide icons

#### Features
- Welcome screen with feature overview and dark mode toggle
- Setup screen: Category (Web Dev / Math / General Knowledge) + Difficulty (Easy / Medium / Hard)
- Quiz screen with 10 shuffled questions per session
- 15-second countdown timer per question (auto-fails on timeout)
- Streak counter + burst animation every 3 in a row
- 50/50 lifeline (once per quiz — eliminates 2 wrong options)
- Keyboard shortcuts: press 1–4 to answer
- Green/red animated answer feedback, correct answer revealed
- Progress bar showing current question / total
- Results screen with score, percentage, and personalized feedback
- Answer review breakdown (expandable — shows your pick vs correct)
- Personal best tracking (saved to localStorage per category + difficulty)
- "New personal best!" badge with star icon
- Dark / light mode toggle (persisted to localStorage)

#### File Structure
```
src/
  App.tsx                        — root state orchestrator
  main.tsx                       — entry point
  index.css                      — theme + Tailwind
  data/
    questions.ts                 — 90 questions (10 per category per difficulty)
  hooks/
    useHighScores.ts             — personal best scores via localStorage
    useDarkMode.ts               — dark mode toggle + persistence
    use-mobile.tsx               — mobile breakpoint detection
    use-toast.ts                 — toast notification helper
  components/
    quiz/
      WelcomeScreen.tsx          — start screen with feature cards
      SetupScreen.tsx            — category + difficulty picker with high score badges
      QuizScreen.tsx             — active quiz with timer, streak, lifeline, keyboard
      ProgressBar.tsx            — animated progress bar
      ResultsScreen.tsx          — score, review, personal best, replay actions
    ui/                          — shadcn/ui components
  lib/
    utils.ts                     — shared utilities (cn)
  pages/
    not-found.tsx                — 404 fallback
```
