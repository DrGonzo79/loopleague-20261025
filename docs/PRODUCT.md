# Product plan

## ICP and JTBD

**ICP:** youth-market activation agency with a live brand brief, relationships with school faculty, and a need to ship a measurable regional challenge in one quarter.

**JTBD:** “When a schoolyard behavior starts spreading, help me determine whether it can become a sponsor-safe activation and run one verified season without stitching together forms, DMs, consent spreadsheets, and manual rankings.”

## MVP

The MVP is a managed service supported by this operator desk:

- intake a weekly video reference;
- block publication until faculty verification and guardian consent are complete;
- rank eligible submissions with an explainable score;
- filter a regional board and export a sponsor recap later;
- label demo data and keep students out of direct account creation.

Out of scope: payments, public voting, student identity accounts, video hosting, biometric analysis, automated moderation, and merchandise.

## Data model

- **Season:** brand brief, activity, region, dates, sponsor-safe rules.
- **School:** faculty sponsor, approval state, region.
- **Submission:** school, challenge, video reference, views, completion, verification and consent gates.
- **Consent evidence:** guardian approval reference, expiry, allowed uses; never embedded in public output.
- **Ranking result:** deterministic score, blocker, rule version, timestamp.
- **Activation report:** reach, eligible submissions, school completion, approved clips, incident log.

## Technical architecture

Next.js App Router renders a static, repo-base-path-aware operator UI. Demo fixtures are local JSON. TypeScript holds the client-side deterministic score for the Pages demo. FastAPI implements the canonical domain operation and validation for a future hosted service. A production version would use Postgres, private object storage, signed upload URLs, a background media safety queue, immutable consent events, and role-based access.

## AI/model strategy

No model is needed for the wedge. Rules and human verification are safer and more legible. In phase three, a vision model could flag unsafe scenes or possible logos for human review; it must never decide consent, age, eligibility, or disciplinary outcomes. Capture false-positive/negative rates and retain a human override audit trail.

## Economics

Pilot price: $12,500. Illustrative delivery: $4,000 kits/prizes/event plus $1,500 rented ops software, leaving roughly $7,000 before founder labor, insurance, travel, sales cost, and taxes. This is a proof project, not SaaS margin. The business only improves if the same school graph and operating playbook support multiple brand-funded seasons.

## Validation plan

- Send the one-page scope through eight warm agency/brand introductions.
- Success in 14 days: 4 qualified conversations, 2 introductions to budget owners, and 1 written pilot-interest response at $12,500.
- Kill: zero explicit budget-positive responses or inability to recruit five faculty sponsors within two weeks of a conditional brief.
- Measure: introduction rate, call-to-scope rate, price acceptance, approval lead time, consent completion, weekly school retention, and cost per approved clip.

## Moat

Software is not the moat. Potential compounding assets are a trusted faculty network, reusable consent and safety operations, season performance benchmarks, and rights-cleared brand outcomes. Incumbents can copy features; they are harder to beat on distribution.

## Risks and mitigations

- **Trend decay:** sell format flexibility, but require evidence of current school density before launch.
- **Distribution:** lead with agency subcontracting; do not rely on SEO.
- **Minors/privacy:** data minimization, guardian consent, faculty-mediated accounts, deletion SLAs, counsel-reviewed terms.
- **Safety/liability:** low-risk challenge rules, incident workflow, insurance, and school approval.
- **Incumbent response:** avoid equipment ownership and sanctioned-sport infrastructure; operate bespoke campaigns.
- **Manipulated metrics:** verified school roster, rule-versioned scoring, anomaly review, no vanity-view-only winner.

## 30/60/90

- **0-30 days:** eight buyer conversations, one faculty workflow shadow, bracket/consent kit, price test. No additional product work without a budget signal.
- **31-60 days:** conditional sponsor brief, recruit 5-10 schools, run a two-week manual micro-season, measure approval and retention.
- **61-90 days:** if paid, extend to 20 schools, produce sponsor recap, compare actual delivery margin, and decide whether one repeated workflow merits automation.
