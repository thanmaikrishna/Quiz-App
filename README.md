# MindFlip — AI-Powered Quiz App

A fast-paced trivia challenge with AI-generated questions across Web Development, Mathematics, and General Knowledge. Questions are freshly generated every session using AI, so they never repeat.

## Features

- **AI-generated questions** — unique questions every session, powered by GPT
- **3 categories** — Web Dev, Mathematics, General Knowledge
- **3 difficulty levels** — Easy, Medium, Hard
- **15-second countdown timer** per question — auto-fails on timeout
- **Streak counter** — tracks consecutive correct answers with burst animation every 3 in a row
- **50/50 lifeline** — eliminates two wrong answers (once per quiz)
- **Keyboard shortcuts** — press `1`–`4` to answer quickly
- **Animated feedback** — green/red highlighting with correct answer revealed
- **Progress bar** — shows current question out of total
- **Results screen** — score, percentage, personalized feedback, full answer review
- **Personal best tracking** — saved per category + difficulty via localStorage
- **Dark / light mode** — persisted across sessions

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React + TypeScript + Vite |
| Styling | Tailwind CSS + shadcn/ui |
| Animation | Framer Motion |
| Icons | Lucide React |
| Backend | Express 5 (Node.js) |
| AI | OpenAI GPT (question generation) |
| Monorepo | pnpm workspaces |
| API contract | OpenAPI + Orval codegen |

## Project Structure

```
artifacts/
  quiz-app/          — React frontend (Vite)
    src/
      App.tsx                  — root state orchestrator
      data/questions.ts        — 90 fallback questions
      lib/questionsApi.ts      — AI question fetch utility
      components/quiz/         — screens: Welcome, Setup, Quiz, Results, Loading
      hooks/                   — useHighScores, useDarkMode
  api-server/        — Express backend
    src/routes/quiz.ts         — AI question generation endpoint
lib/
  api-spec/          — OpenAPI spec + Orval codegen config
  integrations-openai-ai-server/ — OpenAI client wrapper
```

## Getting Started

### Prerequisites
- Node.js 20+
- pnpm (`npm install -g pnpm`)
- OpenAI API key

### Setup

```bash
# Install dependencies
pnpm install

# Set your OpenAI API key
echo "OPENAI_API_KEY=sk-..." > .env

# Start the API server
pnpm --filter @workspace/api-server run dev

# Start the frontend (in a separate terminal)
pnpm --filter @workspace/quiz-app run dev
```

The app will be available at `http://localhost:5173`.

### Environment Variables

| Variable | Description |
|----------|-------------|
| `OPENAI_API_KEY` | Your OpenAI API key (required for AI questions) |
| `SESSION_SECRET` | Secret for session signing |
| `PORT` | API server port (default: 8080) |

## How AI Questions Work

When you start a quiz, the app calls `POST /api/quiz/questions` with your chosen category and difficulty. The server sends a prompt to GPT asking for 10 unique questions in a structured JSON format. If the AI is unavailable, the app automatically falls back to 90 built-in local questions — so the quiz always works.

## License

MIT
