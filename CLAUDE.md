# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

AI love-compatibility prediction app (Chinese, `lang="zh-CN"`). Flow: 3-step test (basic info → personality → relationship values) → DeepSeek AI analysis → result report with QR sharing.

## Stack

Next.js 15 (App Router) · React 19 · TypeScript 5 (strict) · Tailwind CSS 3 · npm.

## Commands

- `npm run dev` — dev server
- `npm run build` — production build
- `npm run lint` — `eslint . --ignore-pattern .next`

No test or format scripts exist; ESLint is the only style gate (no Prettier/Biome).

## Conventions

- Imports use the `@/*` alias → `./src/*` (e.g. `import { x } from '@/lib/love-analysis'`).
- Commit messages follow Conventional Commits (`feat:`, `fix:`, `style:`, etc.).

## AI integration (do not break the contract)

- Endpoint: `src/app/api/analyze/route.ts` (POST, `runtime = 'nodejs'`). Core prompts/validation/normalization: `src/lib/love-analysis.ts`.
- Requires `DEEPSEEK_API_KEY` in `.env.local` (not committed).
- Model `deepseek-v4-flash` called with `response_format: { type: 'json_object' }` — responses must stay valid JSON matching `LoveAnalysisResult`. Keep temperature/max_tokens and the structured-output format intact when editing.

## Gotchas

- `next.config.ts` sets `eslint: { ignoreDuringBuilds: true }` — `npm run build` will NOT fail on lint errors. Run `npm run lint` separately to catch them.
