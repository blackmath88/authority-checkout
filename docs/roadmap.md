# Roadmap

This repository should grow by adding **evidence**, not by pretending to become production middleware too early.

The original v0.1 → v0.8 ladder was too confident before the abstraction had been validated. The roadmap is now question-driven.

## First decisive demo — Legibility test

Goal: test whether a materialized checkout is more useful than reading policy/configuration directly.

Build one single-page browser prototype with:

- local canonical-state JSON
- deterministic TypeScript checkout materializer
- one procurement task
- one actor
- a visible checkout with resources, capabilities, provenance and expiry
- a hardcoded clean action sequence
- a hardcoded adversarial action sequence
- live effect decisions: `ALLOW`, `DENY`, `REQUIRE_APPROVAL`, `NOT_AVAILABLE`
- checkout revisions
- a prominent checkout diff view

Suggested layout:

```text
┌──────────────────────┬────────────────────────┐
│ CURRENT CHECKOUT     │ AGENT / ACTION TRACE   │
│ resources            │                        │
│ capabilities         │                        │
│ provenance           │                        │
│ expiry               │                        │
├──────────────────────┴────────────────────────┤
│ CHECKOUT DIFF                                 │
├───────────────────────────────────────────────┤
│ LIVE EFFECT LOG                               │
└───────────────────────────────────────────────┘
```

Do **not** wire an LLM first. Hardcode the attempted actions so model variability cannot hide whether the representation itself is useful.

Primary question:

> Can a developer explain the agent's current effective authority and what changed between revisions more reliably from the checkout than from the underlying policy/configuration alone?

Kill criterion:

> If the checkout tells the developer nothing the policy file already tells them, this is only a visualization of existing policy machinery. Narrow or stop the project rather than decorating it.

## Early branch candidate — Delegation legibility

If the first demo shows value, delegation moves near the front of the research queue.

Minimal experiment:

```text
human / service
      ↓ delegates
Agent A
      ↓ delegates
Agent B
      ↓ invokes
Tool / effect
```

Represent:

- originating authority
- inherited authority
- narrowing / expansion at each hop
- expiry
- final effect
- attribution

Question:

> Does a materialized authority trace make a delegation chain easier to understand than isolated authorization logs?

Do not claim this gap is unique or unsolved until the multi-agent related work is reviewed more deeply.

## Early branch candidate — Pause authority

Represent, initially without implementing:

- who may halt an agent
- which runtime/capabilities are revoked
- whether monitoring may invoke the pause path
- propagation delay / freshness
- who may restart the agent

Question:

> Is "who can stop this actor right now?" part of effective authority and therefore something the checkout should make visible?

## Conditional experiments

Only pursue these if the preceding experiment creates a concrete question.

### Authority expansion

Let the agent request another resource or capability. Record rationale, provenance, decision and the resulting checkout diff.

### Adversarial scenario library

Add indirect prompt injection, memory poisoning, cross-task access, stale authority and tool misuse as reproducible scenarios. Successful community breaks should become regression cases or reasons to change the model.

### One real adapter

Connect only a low-risk environment such as a temporary filesystem, test GitHub repo or mock mail service. The purpose is to test whether the visible checkout and actual runtime authority drift apart.

### Optional LLM run

After deterministic sequences are understood, run the same scenario with an LLM and separately record:

- what the model tried
- what the checkout exposed
- what the live effect gate permitted
- what actually executed

The model is an experimental subject, not the enforcement boundary.

---

## Rule for every experiment

Every experiment should add a learning-journey entry containing:

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
