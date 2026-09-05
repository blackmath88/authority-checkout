# Roadmap

This repository should grow by adding **evidence**, not by pretending to become production middleware too early.

Every prototype must update the research board, learning journey and project documentation.

## Current sequence

```text
00    static boundary simulator
01    authority legibility
01.1  single-artifact dual consumption
02    authority research board
03    Break the Checkout
04    live authority drift
05    split projection / trust boundary
06    approval fatigue / effect-gate failure
07    delegation trace — horizon
```

## What has survived so far

- Legibility alone was not enough; the runtime and human inspector must consume the same artifact.
- Compilation alone was not enough; shipped systems already project policy.
- Dual consumption alone was not enough; Prototype 04 added freshness and invalidation.
- Freshness alone was not enough; Prototype 05 added trust provenance and `SP-01`.
- A live human approval step is not automatically a strong control; Prototype 06 adds `EG-01`.

## Current decisive phase — evidence runs

Do **not** add another conceptual architecture layer immediately.

Use Break the Checkout to run people and external LLMs against the current executable claims:

```text
01.1  AC-04  one artifact really feeds both consumers
04    AC-05  stale authority is not trusted
05    AC-06  hostile context cannot mint authority
06    AC-07  repeated approvals do not quietly defeat the effect gate
```

For Prototype 06, compare repeated control / fatigue / adversarial runs and record:

- prohibited-effect approval rate,
- benign rejection rate,
- response time,
- sequence position,
- checkout-inspection count,
- reviewer / run provenance.

One run is not evidence. The goal is not statistical publication yet; it is to see whether the architectural assumption is obviously fragile enough to require redesign.

## Blocking architecture decision — APS

Before building delegation trace, resolve explicitly:

```text
Authority Checkout as a view/runtime artifact over APS-style delegation
vs.
Authority Checkout as a competing delegation model
```

Default direction: consume upstream identity/delegation semantics rather than reinvent them, but verify against the draft before promoting that position.

## Conditional experiments after evidence

### Delegation trace
Ingest an APS/OAuth-shaped chain only after the positioning decision is resolved.

### Reconnaissance inversion
Test whether compact authority legibility materially improves attacker target selection. If it does, checkout visibility/redaction becomes part of the model.

### One real adapter
After the local claims survive, connect one low-risk real source such as Purview-style policy projection, Entra entitlement facts, an APS-shaped fixture or a temporary GitHub/filesystem adapter. The purpose is to measure distance between artifact and runtime, not integration breadth.

### Optional LLM execution run
Only after deterministic sequences are understood, record separately what the model tried, what context influenced it, what authority the checkout exposed, what the live gate permitted and what actually executed.

## Rule for every experiment

Every prototype build must update, at minimum:

```text
experiments.js
README.md
prototype README
learning journey
research board when the claim landscape changes
concept version when the architecture changes materially
Break the Checkout when a new falsifiable invariant appears
```

A critique from another LLM is an **input**, not automatically a fact. A result that weakens or kills the idea is a valid result.
