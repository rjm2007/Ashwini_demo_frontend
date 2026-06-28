# Fixyee Warranty Platform — Frontend

Next.js UI. Deployed to Vercel. The backend (NestJS + FastAPI + Postgres + Qdrant) lives in a separate repo, deployed to AWS EC2.

## Local run
1. `npm install`
2. `cp .env.example .env.local` and set `NEXT_PUBLIC_API_URL` to your backend's HTTPS URL.
3. `npm run dev`

## Production
On Vercel: import this repo directly (no Root Directory override needed — this repo IS the app root).
Set `NEXT_PUBLIC_API_URL` as an environment variable in the Vercel project settings before deploying.
