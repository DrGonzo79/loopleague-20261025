# LoopLeague

A runnable prototype of the narrowest credible wedge from IdeaBrowser's October 25, 2026 free report: an operator desk for a **managed, sponsor-funded inter-school challenge**. It is not a claim that a broad league platform should be built.

## What works

- filter a fictional regional leaderboard;
- intake and validate a demo weekly submission;
- hard-gate rankings on faculty verification and guardian consent;
- verify a held fixture and recalculate its deterministic sponsor-readiness score;
- run the equivalent ranking and validation operation through FastAPI.

All schools, people, metrics, and submissions are fictional. No media is uploaded. No AI is used.

## Run

Requires Node 26.12.1 and Python 3.12+.

```bash
npm ci
npm run dev

uv sync --project api --locked --dev
uv run --project api uvicorn api.main:app --reload
```

## Verify

```bash
npm run typecheck
npm run test:e2e
npm run build
npm audit --audit-level=high
uv run --project api pytest api/tests
```

The public GitHub Pages deployment hosts only the static Next.js frontend. The FastAPI backend is source-tested in CI and is **not publicly deployed**.

## Source and judgment

- [Research summary](research/notes.md)
- [Office Hours diagnostic](docs/OFFICE_HOURS.md)
- [Opportunity score](docs/OPPORTUNITY_SCORE.md)
- [Product plan](docs/PRODUCT.md)
- [CEO review](docs/CEO_REVIEW.md)
- [Architecture](docs/ARCHITECTURE.md)
- [Build prompts](docs/BUILD_PROMPTS.md)

Public report URL: https://www.ideabrowser.com/hub/ideas/today
