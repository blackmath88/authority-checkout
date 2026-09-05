# Authority Checkout

> **One task-scoped authority artifact for runtime assembly and human inspection.**

Authority Checkout is an exploratory research project about **runtime projection and authority legibility for agentic software**.

The architectural move is simple:

> **The representation an actor works against does not need to be canonical state — but the runtime and the human inspector should not get different representations of authority.**

That idea came first from the companion memory work and from Delta / DeltaDB: a working representation can stay useful while the real source of truth lives deeper in the system.

Authority Checkout applies that move to agent execution.

```text
source systems
  identity
  policy
  delegation
  task
  memory
  tool registry
      │
      ▼
compile / project
      │
      ▼
checkout.json
      │
      ├── human inspection
      └── runtime assembly / effect evaluation
```

## Current research question

> **Can one task-scoped derived authority artifact serve both runtime assembly and human reasoning without either consumer relying on parallel hidden authority state — and remain honest when upstream state changes?**

Compilation itself is not the contribution. Policy projection already exists in shipped systems. The surviving hypothesis is **single-artifact dual consumption**, now extended with an explicit freshness model.

## Why the project changed

Research found four important corrections:

1. **Pre-execution deterministic control is established prior art.** Authority Checkout should not claim it.
2. **Human-readable authority views already exist.** Effective-access dashboards, delegation graphs, revocation controls and authority visualizations are not novel on their own.
3. **Delegation protocols are getting much more formal.** The Agent Passport System (APS) draft is a close neighbour and should be treated as possible upstream authority input, not reinvented here.
4. **Compiled policy projections already ship.** Microsoft Purview is a concrete example. Authority Checkout therefore cannot center novelty on compilation or projection alone.

That leaves a narrower claim worth testing:

> **The same execution-scoped authority artifact is consumed by both the runtime and the human inspector, while remaining explicitly derived from fresher upstream control planes.**

## Core distinctions

```text
SOURCE POLICY ≠ CHECKOUT ≠ EXECUTION TRACE
```

- **Source policy / IAM / delegation** remain canonical upstream systems.
- **Checkout** is derived, task-scoped, versioned and disposable.
- **Execution trace / receipts** record what later happened.
- **Live effect gates** may revalidate consequential actions at execution time.
- **The checkout is never authoritative.** Upstream control planes and live gates always win.

The UI is only one rendering of the checkout.

## Freshness model

Prototype 04 makes a previously implicit problem explicit. Checkout fields fall into three classes:

```text
SNAPSHOT_SAFE
  can be materialized until checkout expiry

LIVE_REFERENCE
  checkout records the dependency; runtime asks the authoritative source now

INVALIDATING
  an upstream change makes the checkout untrustworthy for dependent decisions
```

This is not claimed as novel invalidation machinery. The research question is whether a **human-inspectable dual-consumption artifact** can make these boundaries legible without becoming a stale second source of truth.

## Agent framing

Treat the agent as an LLM-powered software module, not as an entity that naturally owns memory, tools and permissions.

```text
agent({
  task,
  stateProjection,
  memoryProjection,
  tools,
  authority,
  provenance
})
```

Ambient authority is treated as the security analogue of an implicit global dependency: power available because of the surrounding environment rather than because it was explicitly materialized for this execution.

## Sandbox vs checkout

These remain separate layers:

```text
Sandbox / isolation
  → where may this code run?

Authority Checkout
  → what state, tools and authority was this execution handed?
```

> **Sandbox is how the execution is contained. Checkout is what it was handed.**

## Prototypes

The root `index.html` is the research index and navigation layer.

### Prototype 00 — static boundary simulator

Historical baseline. Made the metaphor interactive. Preserved deliberately as the pre-legibility version.

### Prototype 01 — authority legibility test

Preserved unchanged. Tests raw policy/configuration versus a human-readable materialized checkout, including revisions, diffs and effect decisions.

### Prototype 01.1 — single-artifact dual consumption

`inputs + approved grants → checkout.json → human viewer + runtime evaluator`

Session 06 found that the first implementation violated its own invariant: `sources.policy` was decorative, the runtime hardcoded effect names, and the diff was literal text. Those paths were repaired so source policy changes the compiled artifact, the runtime generically evaluates the artifact, and the diff is computed artifact-to-artifact.

**Kill criterion:** if either consumer still depends on hidden parallel authority state, or the shared artifact adds no reasoning value over the source inputs, the checkout abstraction is cosmetic.

### Prototype 02 — authority research board

Open `prototypes/02-research-board/index.html`.

A static reading surface for the 2026 agent-authority landscape. Semantic state is canonical; map and timeline are read-only projections. The Purview finding is recorded as an industry contradiction against the broad projection claim: policy projection is shipped prior art, while the narrower composed dual-consumption artifact remains unverified.

### Prototype 03 — Break the Checkout

Open `prototypes/03-break-the-checkout/index.html`.

A project-specific adaptation of the br-ai-nstorm participation pattern for adversarial falsification.

> **Agents may propose a break. A break only counts after reproducible proof is reviewed.**

The room now includes **AC-05 — stale-authority trust**, which attacks Prototype 04 directly.

### Prototype 04 — live authority drift

Open `prototypes/04-live-authority-drift/index.html`.

Adds time and mutable upstream state. The UI shows four simultaneous views:

```text
SOURCE STATE
CHECKOUT
DRIFT
RUNTIME DECISION
```

The scenario starts with a valid finance checkout at 11:30, then applies:

- 11:37 — delegation revoked,
- 11:39 — document reclassified `Internal → Confidential`,
- 11:46 — checkout expiry passes.

The checkout labels fields as `SNAPSHOT_SAFE`, `LIVE_REFERENCE` or `INVALIDATING`. Once invalidating drift occurs, dependent runtime decisions return `RECOMPILE_REQUIRED` rather than trusting stale compiled values.

**Invariant AD-01:** no runtime decision may rely on stale checkout state when that field is declared live or invalidating.

**Kill criterion:** if developers cannot identify what is stale/live/invalidating, or runtime decisions still trust stale compiled state after an invalidating change, narrow or stop this line.

### Prototype 05 — delegation trace

Conditional horizon. Rather than inventing delegation semantics, ingest an APS/OAuth-shaped chain and compile its effective authority into one execution-specific checkout.

## What this project is not

It does **not** claim to:

- solve prompt injection
- derive perfect least privilege automatically
- replace IAM, policy engines, sandboxes or capability systems
- invent deterministic out-of-model enforcement
- invent delegation protocols
- introduce novel authority dashboards or graphs
- introduce novel compiled policy projection
- solve staleness invalidation in general
- literally snapshot all external reality
- prevent infrastructure-level sandbox escape
- remain authoritative after its enforcement layer is compromised
- make autonomous agents safe

## Related architectural inspirations

### Delta / DeltaDB

Canonical state and working representation are different objects. The analogy only matters here if work actually happens against the materialized representation.

### Memory as middleware

Persistent memory is system state that can be projected into execution rather than intrinsically owned by the agent. Authority may be another projected domain of the same substrate.

### Agent Passport System

Potential upstream source for delegated authority, narrowing, revocation and action-policy receipts. Authority Checkout should compile or reference these facts rather than replace the protocol.

### Entra / Purview

Concrete upstream control-plane examples, not things to recreate. A future integration is a credibility upgrade only if the local dual-consumption and freshness experiments survive first.

### br-ai-nstorm

Two patterns are borrowed from the sibling collective-reasoning prototype:

1. **Semantic state is canonical; visual projections never write.** This powers the Research Board.
2. **Bounded context out, bounded contribution back, explicit provenance and human review.** This powers Break the Checkout.

The br-ai-nstorm repository itself stays generic and unchanged.

## Learning journey

Open `docs/journey/index.html`.

Current modules:

- `entries.js` — origin
- `entries-session-02.js` — legibility / enforcement reframe
- `entries-session-03.js` — APS, existing authority dashboards, compiled-runtime reframe
- `entries-session-04.js` — research-board mapping and explicit unresolved claims
- `entries-session-05.js` — adversarial proof-room adaptation from br-ai-nstorm
- `entries-session-06.js` — Prototype 01.1 self-falsification, repair, and dual-consumption reframe
- `entries-session-07.js` — live authority drift and AC-05

## Concept history

```text
concept/authority-checkout.json        v0.1 — original authority-checkout idea
concept/authority-checkout.v0.2.json   v0.2 — legibility reframe
concept/authority-checkout.v0.3.json   v0.3 — architecture lineage / runtime projection
concept/authority-checkout.v0.4.json   v0.4 — compiled runtime manifest
concept/authority-checkout.v0.5.json   v0.5 — single-artifact dual consumption
```

## Current status

**Session 07 — the artifact now has to survive time.**

Prototype 01.1 tests one artifact with two consumers. Prototype 04 tests whether that artifact stays honest when upstream authority changes. Prototype 03 now has a concrete stale-state invariant to attack.

> **Can one task-scoped authority artifact improve human reasoning, remain the same object the runtime consumes, and clearly signal when it has stopped being trustworthy?**
