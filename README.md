# Authority Checkout

> **One execution-scoped authority artifact for runtime assembly and human inspection.**

Authority Checkout is an exploratory research project about **runtime projection and authority legibility for agentic software**.

The surviving architectural claim is deliberately narrow:

> **The runtime and the human inspector should consume the same derived authority artifact — without that artifact becoming a second source of truth, silently going stale, or flattening hostile-influenced context into authority.**

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
        checkout artifact     live gates
                 ▲
                 │
          contextProjection
 task · memory · retrieval · tool output
          mixed / hostile-influenced
                 │
                 ▼
        runtime + human inspection
```

## Current research question

> **Can one task-scoped derived artifact improve human reasoning while remaining the same object the runtime consumes, clearly signalling freshness, and preserving which inputs are allowed to define authority?**

Compilation itself is not the contribution. Policy projection already exists in shipped systems. Trusted/untrusted separation is not claimed as novel either. The project is testing whether these properties can coexist in one useful, inspectable execution artifact.

## Core principles

```text
SOURCE POLICY ≠ CHECKOUT ≠ EXECUTION TRACE
```

- Source policy / IAM / delegation remain canonical upstream systems.
- The checkout is derived, task-scoped, versioned and disposable.
- The checkout is **never authoritative**; upstream systems and live gates win.
- Human inspection and runtime assembly consume the **same artifact**.
- Freshness is explicit: `SNAPSHOT_SAFE`, `LIVE_REFERENCE`, `INVALIDATING`.
- Mixed-trust context may influence reasoning but may **not expand authority**.
- Provenance and trust class are part of the inspectable artifact.
- Structural validity is not acceptance.

## Why the project changed

Research killed several broad novelty claims:

1. deterministic pre-execution control is established prior art;
2. authority dashboards and effective-access views already exist;
3. formal delegation work such as APS is close prior art and likely upstream input;
4. compiled AI policy projections already ship, including Microsoft Purview patterns.

That leaves a smaller but testable hypothesis:

> **single-artifact dual consumption, with explicit freshness and trust provenance.**

## Prototypes

The root `index.html` is the research index.

### 00 — Static boundary simulator

Historical baseline. Preserved as the pre-legibility form.

### 01 — Authority legibility

Tests whether a materialized authority view helps more than reading underlying policy/configuration directly.

### 01.1 — Single-artifact dual consumption

`inputs + approved grants → checkout.json → human viewer + runtime evaluator`

Session 06 found and repaired three self-contradictions: decorative policy input, hardcoded runtime effects, and a fake artifact diff.

**Kill criterion:** if either consumer depends on hidden parallel authority state, the abstraction is cosmetic.

### 02 — Authority Research Board

Open `prototypes/02-research-board/index.html`.

A static reading surface for prior art, incidents, standards, industry systems and project claims. Semantic state is canonical; map and timeline are read-only projections.

Current board state after the split-projection overlay:

- 48 nodes
- 50 relations
- 19 timeline entries
- 6 camps

The board now records both the Purview prior-art correction and the new trust-collapse tension: one artifact can still be unsafe if authoritative control-plane state and hostile-influenced context are flattened into one trust domain.

### 03 — Break the Checkout

Open `prototypes/03-break-the-checkout/index.html`.

A bounded adversarial proof room adapted from br-ai-nstorm.

> **Agents may propose a break. A break only counts after reproducible proof is reviewed.**

Current high-value challenges include:

- `AC-04` — show the checkout is only a picture;
- `AC-05` — make runtime trust stale authority;
- `AC-06` — make hostile context mint authority.

### 04 — Live Authority Drift

Open `prototypes/04-live-authority-drift/index.html`.

Adds time and mutable upstream state.

```text
SNAPSHOT_SAFE
LIVE_REFERENCE
INVALIDATING
```

**Invariant AD-01:** no runtime decision may rely on stale checkout state when that field is live or invalidating.

### 05 — Split Projection / Trust Boundary

Open `prototypes/05-split-projection/index.html`.

Separates two classes of input before compiling one checkout:

```text
AUTHORITATIVE
identity · delegation · policy · approved grants
        ↓
authorityProjection

MIXED TRUST
task · memory · retrieval · tool output · external content
        ↓
contextProjection
```

**Invariant SP-01:** hostile-influenced context may narrow, annotate or shape reasoning, but it may never expand effective authority.

The interactive demo injects an external document that explicitly requests `supplier.history.read:ACME` and `payment.execute`. The safe compiler preserves the instruction in context but does not add either capability. A deliberately unsafe compiler is included as the counterexample implementation.

**Kill criterion:** if mixed-trust context can add capabilities through any runtime path, or the split exists only in the UI, the prototype fails.

### 06 — Delegation Trace

Conditional horizon. Treat APS/OAuth-shaped delegation as likely upstream semantics rather than casually inventing a rival protocol.

## Known failure modes

The project now keeps these visible rather than treating them as implementation details:

- **ambient authority** — runtime can reach more than the checkout declares;
- **staleness** — checkout no longer matches authoritative upstream state;
- **trust collapse** — mixed-trust context crosses into authority derivation;
- **approval fatigue** — human effect gate becomes an operational rubber stamp;
- **reconnaissance gift** — compact legibility helps attackers too;
- **artifact non-consumption** — checkout gets produced like an SBOM but neither humans nor runtime actually use it;
- **delegation / confused deputy** — authority semantics become unclear across hops.

See `docs/limitations.md`.

## What this project is not

It does **not** claim to:

- solve prompt injection;
- derive perfect least privilege automatically;
- replace IAM, policy engines, sandboxes or capability systems;
- invent deterministic out-of-model enforcement;
- invent delegation protocols;
- introduce novel authority dashboards;
- introduce novel compiled policy projection;
- solve staleness invalidation in general;
- invent trusted/untrusted information-flow separation;
- prevent infrastructure-level sandbox escape;
- make autonomous agents safe.

## Related architectural inspirations

### Delta / DeltaDB

Canonical state and working representation are different objects. The analogy matters only if work actually happens against the materialized representation.

### Memory as middleware

Persistent memory is system state that can be projected into execution rather than intrinsically owned by the agent. Authority is another projected domain, but Prototype 05 now makes clear that not every projected input has the same trust role.

### Agent Passport System

Potential upstream source for delegated authority, narrowing, revocation and receipts. A blocking question remains: **view/runtime artifact over APS, or rival?** Current direction is to consume, not reinvent.

### Entra / Purview

Concrete control-plane examples, not things to recreate. A future integration is a credibility upgrade only if the local architecture survives first.

### br-ai-nstorm

Two patterns are borrowed from the sibling project:

1. semantic state is canonical; visual projections never write;
2. bounded context out, bounded contribution back, provenance and explicit human review.

The br-ai-nstorm repository remains generic and unchanged.

## Learning journey

Open `docs/journey/index.html`.

Current modules now run through `entries-session-08.js`, covering:

- legibility and enforcement reframe;
- APS and prior-art corrections;
- research-board construction;
- adversarial proof-room adaptation;
- Prototype 01.1 self-falsification and repair;
- live authority drift;
- split projection / trust-boundary turn.

## Concept history

```text
concept/authority-checkout.json        v0.1 — original idea
concept/authority-checkout.v0.2.json   v0.2 — legibility reframe
concept/authority-checkout.v0.3.json   v0.3 — runtime projection lineage
concept/authority-checkout.v0.4.json   v0.4 — compiled runtime manifest
concept/authority-checkout.v0.5.json   v0.5 — single-artifact dual consumption
concept/authority-checkout.v0.6.json   v0.6 — freshness + split trust provenance
```

## Next experiment

**Approval Fatigue / Effect-Gate Failure.**

The current effect gate assumes that handing a consequential decision to a human restores safety. That assumption should be attacked directly.

> **Does human approval remain a meaningful security boundary as benign approval volume and ambiguity rise?**

See `docs/roadmap.md`.

## Current status

**Session 08 — the checkout now has an internal trust boundary.**

Prototype 01.1 tests one artifact with two consumers. Prototype 04 tests time. Prototype 05 tests whether hostile-influenced context can cross into authority. Prototype 03 now attacks all three.

> **Can the artifact remain useful precisely because it exposes where authority came from, what is stale, and what the runtime is actually allowed to do?**
