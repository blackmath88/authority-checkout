# Roadmap

This repository should grow by adding **evidence**, not by pretending to become production middleware too early.

The original v0.1 → v0.8 ladder was too confident before the abstraction had been validated. The roadmap is now question-driven and every prototype must update the research board and learning journey.

## Current sequence

```text
00    static boundary simulator
01    authority legibility
01.1  single-artifact dual consumption
02    authority research board
03    Break the Checkout
04    live authority drift
05    split projection / trust boundary
06    delegation trace — horizon
```

## What has been learned so far

### Legibility alone was not enough

A prettier permissions view already has substantial prior art. The project narrowed to one stronger requirement:

> the runtime and the human inspector should consume the same execution-scoped authority artifact.

### Compilation alone was not enough

Shipped systems already compile/project policy for AI applications. Compilation itself is not a novelty claim.

### Dual consumption alone was not enough

Prototype 04 added time: a derived checkout must show what is snapshot-safe, what needs live revalidation, and what upstream changes invalidate the artifact.

### Freshness alone was not enough

Prototype 05 adds trust provenance. A checkout can be consistent and current yet still be unsafe if it flattens authoritative control-plane state and hostile-influenced context into one derivation path.

Invariant `SP-01`:

> Hostile-influenced context may narrow, annotate or shape reasoning, but it may never expand effective authority.

## Next decisive experiment — Approval Fatigue / Effect-Gate Failure

The live effect gate currently assumes that sending a consequential action to a human creates a strong safety boundary.

That assumption should be tested, not inherited.

Minimal experiment:

```text
benign approval requests
benign approval requests
ambiguous request
benign approval requests
malicious / policy-breaking request
more benign requests
```

Measure:

- correct approvals / rejections
- false approvals
- time per decision
- confidence
- position-in-sequence effect
- performance as approval volume rises

Primary question:

> Does a human approval gate remain a meaningful safety boundary as benign approval volume and ambiguity increase?

Kill / change criterion:

> If reviewer accuracy degrades materially under realistic approval volume, human approval cannot be treated as the default answer for consequential effects. The architecture should determinize more decisions and reserve human review for genuine ambiguity.

## Near-term adversarial work

Break the Checkout should evolve with every architecture prototype rather than as a separate later phase.

Current high-value challenges:

- `AC-04` — prove runtime and human view consume different state
- `AC-05` — make runtime trust stale authority
- `AC-06` — make hostile-influenced context mint authority

Successful breaks should become regression fixtures or explicit reasons to change the concept.

## Blocking architecture decision — APS

Before building delegation semantics, read the Agent Passport System draft deeply enough to decide explicitly:

```text
Authority Checkout as a view/runtime artifact over APS-style delegation
vs.
Authority Checkout as a competing delegation model
```

The default direction should be to consume upstream identity/delegation semantics rather than reinvent them, but this remains an explicit research decision until verified.

## Conditional experiments

### Delegation trace

Ingest an APS/OAuth-shaped delegation chain and materialize:

- originating authority
- inherited authority
- monotonic narrowing / expansion attempts
- expiry and revocation
- final effect
- attribution and provenance

Question:

> Does one materialized authority artifact make a delegation chain easier to understand than isolated authorization logs without replacing the upstream protocol?

### Reconnaissance inversion

Treat the checkout itself as an attacker aid and test whether compact authority legibility materially improves target selection.

If it does, checkout visibility and redaction become part of the authority model.

### One real adapter

Only after the local architecture survives, connect one low-risk real control-plane source or test environment.

Possible directions:

- real Purview-style policy projection as a credibility input
- Entra/identity entitlement facts
- APS-shaped delegation fixture
- temporary GitHub/filesystem resource adapter

The purpose is to test **distance between artifact and runtime**, not to claim integration breadth.

### Optional LLM run

After deterministic sequences are understood, run the same scenario with an LLM and separately record:

- what the model tried
- what context influenced it
- what authority the checkout exposed
- what the live effect gate permitted
- what actually executed

The model is an experimental subject, not the enforcement boundary.

---

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

Every experiment should preserve:

```text
what I assumed
what challenged it
what I learned
what changed
what remains open
source / provenance
verification state
```

A critique from another LLM is an **input**, not automatically a fact. Quantitative or publication-facing claims should be verified against primary sources where possible.

A result that weakens or kills the idea is a valid project result.
