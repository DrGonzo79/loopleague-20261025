# Architecture

```text
GitHub Pages / Next.js static export
  ├─ local fictional fixtures
  ├─ submission intake + validation states
  └─ deterministic ranking preview

FastAPI source (local + CI only)
  ├─ Pydantic input validation
  ├─ consent/faculty eligibility gate
  └─ explainable sponsor-readiness ranking
```

The Pages demo does not call a hosted backend. Python is runnable and tested source only. Production would place an authenticated API between the operator UI and Postgres/object storage. Browser clients would receive signed upload targets, never storage credentials. Consent events and score rule versions would be immutable audit records.

## Observability and failure modes

Track intake validation failures, verification aging, consent aging, media-processing failures, score rule version, manual overrides, and school completion. Alert on missing consent before publication, repeated failed uploads, abnormal ranking shifts, and deletion-request SLA breaches. If the API is unavailable, preserve draft metadata locally and show a non-destructive retry state; never silently mark a submission ready.
