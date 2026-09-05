# Authority Checkout

> **One execution-scoped authority artifact for runtime assembly and human inspection.**

Authority Checkout is an exploratory research project about **runtime projection and authority legibility for agentic software**.

The surviving claim is narrow:

> **The runtime and the human inspector should consume the same derived authority artifact — without that artifact becoming a second source of truth, silently going stale, flattening hostile-influenced context into authority, or pretending that a human approval step is deterministic enforcement.**

```text
canonical systems
identity · policy · delegation · approved grants
                 │
                 ▼
          authorityProjection
                 │
                 ├──────────────┐
                 │              │
                 ▼              ▼
        checkout artifact     live effect path
                 ▲              │
                 │              ├─ policy-resolvable → deterministic decision
          contextProjection     └─ genuine ambiguity → human review
 task · memory · retrieval · tool output
          mixed / hostile-influenced
                 │
                 ▼
        runtime + human inspection
```

## Current research question

> **Can one task-scoped derived artifact improve human reasoning while remaining the same object the runtime consumes, clearly signalling freshness and trust provenance, and exposing where human approval is itself a weak control?**

Compilation itself is not the contribution. Policy projection, pre-execution enforcement, identity governance and trusted/untrusted separation all have substantial prior art.

## Core principles

- The checkout is **never authoritative**; upstream systems and live gates win.
- Human inspection and runtime assembly consume the **same artifact**.
- Freshness is explicit: `SNAPSHOT_SAFE`, `LIVE_REFERENCE`, `INVALIDATING`.
- Mixed-trust context may influence reasoning but may **not expand authority**.
- Provenance and trust class are part of the inspectable artifact.
- `REQUIRE_APPROVAL` is not treated as equivalent to a reliable deterministic control.
- Policy-resolvable effects should be decided deterministically; human review is for genuine ambiguity.
- Structural validity is not acceptance.

## Prototypes

The root `index.html` is the research index.

### 00 — Static boundary simulator
Historical baseline.

### 01 — Authority legibility
Does a materialized authority view improve understanding over raw policy/configuration?

### 01.1 — Single-artifact dual consumption
`inputs + approved grants → checkout.json → human viewer + runtime evaluator`

**Kill criterion:** if either consumer depends on hidden parallel authority state, the abstraction is cosmetic.

### 02 — Authority Research Board
Open `prototypes/02-research-board/index.html`.

Current state after the approval-fatigue overlay:
- 51 nodes
- 53 relations
- 20 timeline entries
- 6 camps

### 03 — Break the Checkout
Open `prototypes/03-break-the-checkout/index.html`.

> **Agents may propose a break. A break only counts after reproducible proof is reviewed.**

Current high-value challenges include:
- `AC-04` — show the checkout is only a picture;
- `AC-05` — make runtime trust stale authority;
- `AC-06` — make hostile context mint authority;
- `AC-07` — exhaust the reviewer until a prohibited effect is approved.

### 04 — Live Authority Drift
Open `prototypes/04-live-authority-drift/index.html`.

**Invariant AD-01:** no runtime decision may rely on stale checkout state when that field is live or invalidating.

### 05 — Split Projection / Trust Boundary
Open `prototypes/05-split-projection/index.html`.

**Invariant SP-01:** hostile-influenced context may narrow, annotate or shape reasoning, but it may never expand effective authority.

### 06 — Approval Fatigue / Effect-Gate Failure
Open `prototypes/06-approval-fatigue/index.html`.

Tests whether a human approval gate remains meaningful under repetition, ambiguity and volume. The deterministic page provides control, fatigue and adversarial queues, while the same checkout stays available for inspection.

**Invariant EG-01:** human approval is not a deterministic security control unless decision quality remains acceptable under realistic approval load.

The prototype tracks local-only metrics: dangerous-effect approvals, overall decision accuracy, response time, sequence position and checkout-inspection count. One run is explicitly **not** treated as evidence.

### 07 — Delegation Trace
Conditional horizon. Treat APS/OAuth-shaped delegation as likely upstream semantics rather than inventing a rival protocol. Do not build until the APS positioning decision is explicit.

## Known failure modes

- ambient authority beneath the checkout;
- stale authority / revocation drift;
- mixed-trust context crossing into authority derivation;
- approval fatigue turning human effect gates into rubber stamps;
- legibility becoming attacker reconnaissance;
- checkout production without real human/runtime consumption;
- delegation and confused-deputy semantics.

See `docs/limitations.md`.

## What this project is not

It does **not** claim to invent policy projection, deterministic enforcement, authority dashboards, agent identity governance, staleness invalidation, trusted/untrusted separation, or delegation protocols. It does not replace IAM, Purview, APS, OAuth, policy engines, sandboxes or capability systems.

## Research process

- `docs/journey/` preserves assumptions, challenges, corrections and verification state.
- `prototypes/02-research-board/` preserves the outside landscape and project tensions.
- `prototypes/03-break-the-checkout/` is the adversarial aperture.
- Findings that weaken the project stay visible.

## Concept history

```text
concept/authority-checkout.json        v0.1 — original idea
concept/authority-checkout.v0.2.json   v0.2 — legibility reframe
concept/authority-checkout.v0.3.json   v0.3 — runtime projection lineage
concept/authority-checkout.v0.4.json   v0.4 — compiled runtime manifest
concept/authority-checkout.v0.5.json   v0.5 — single-artifact dual consumption
concept/authority-checkout.v0.6.json   v0.6 — freshness + split trust provenance
concept/authority-checkout.v0.7.json   v0.7 — effect-gate honesty / approval fatigue
```

## What comes next

**Evidence runs before more architecture.**

Run people and external LLMs against 01.1, 04, 05 and 06 through Break the Checkout. Collect reproducible breaks and reviewer results before adding another conceptual layer. In parallel, resolve the blocking APS question: **is Authority Checkout a viewing/runtime artifact over APS delegation semantics, or a rival?**

## Current status

**Session 09 — the human gate is now part of the threat model.**

> **A control that exists in the diagram but degrades into habit is not the same control in operation.**
