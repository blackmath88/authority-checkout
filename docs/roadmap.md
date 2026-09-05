# Roadmap

This repository should grow by adding **evidence**, not by pretending to become production middleware too early.

## v0.1 — Static Checkout

Goal: make the abstraction inspectable.

Build:

- canonical state fixture
- actor fixture
- task fixture
- deterministic checkout materializer
- browser view of included / excluded state and capabilities

Question:

> Is the checkout representation immediately understandable?

## v0.2 — Action Boundary

Goal: separate model intent from executable authority.

Build:

- proposed-action schema
- deterministic evaluator
- outcomes: `ALLOW`, `DENY`, `APPROVAL`, `NOT_AVAILABLE`
- decision explanation

Question:

> Can a user see why an action is possible or impossible without reading policy code?

## v0.3 — Agent Experiment

Goal: introduce probabilistic reasoning without making it the security boundary.

Build:

- optional LLM adapter
- normal instruction scenario
- adversarial / injected instruction scenario
- attempt log

Measure separately:

- what the model tried
- what the checkout exposed
- what the boundary permitted
- what effect executed

Question:

> Does bounded authority remain meaningful when reasoning is compromised?

## v0.4 — Authority Expansion

Goal: preserve useful autonomy without ambient authority.

Build:

- agent requests new resource/capability
- request rationale
- policy or human decision
- checkout revision

Question:

> Can explicit expansion work without turning every agent step into an approval workflow?

## v0.5 — Checkout History

Goal: make changing authority auditable.

Build:

- checkout IDs and versions
- diff view
- expiry / freshness metadata
- reason for each expansion or reduction

Question:

> Is an authority diff a useful debugging and governance artifact?

## v0.6 — Red-Team Scenario Library

Goal: learn what the abstraction does and does not stop.

Scenarios:

- indirect prompt injection
- memory poisoning
- cross-task resource access
- tool misuse
- stale checkout
- capability escalation

Question:

> Which attacks are constrained, unaffected, or made worse by the checkout model?

## v0.7 — One Real Adapter

Goal: test whether the concept survives contact with a real capability.

Use a low-risk environment such as:

- temporary filesystem
- test GitHub repository
- mock email service

Do not start with production finance, enterprise mail or privileged infrastructure.

Question:

> Can the visible checkout and the actual runtime authority stay aligned?

## v0.8 — Delegation

Goal: explore two-agent authority propagation.

Question:

> When Agent A delegates to Agent B, what authority should B receive, and how do we avoid authority resetting or expanding across the hop?

---

## Rule for every iteration

Each experiment should add an entry documenting:

```text
hypothesis
setup
expected property
observed behavior
what checkout helped with
what checkout did not help with
new failure modes
next question
```

A version can conclude that the idea is weaker than expected. That is a valid project result.
