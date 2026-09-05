# Authority Checkout

> **Agents shouldn't operate with ambient authority. Give them a checkout.**

Authority Checkout is an exploratory reference model and research prototype for **task-scoped agent authority**.

The core idea is simple:

```text
canonical systems
      │
      ▼
authority checkout
      │
      ▼
agent
      │
      ▼
requested effect
      │
      ▼
live authorization
      │
      ▼
canonical systems
```

An agent should not automatically inherit every resource, memory item, credential, tool, and capability available to the host application. Instead, the system materializes a task-scoped working representation of what that agent may currently perceive and attempt.

The project is inspired by the architectural inversion behind Delta-style checkouts: **the representation an agent works against does not need to be the authoritative state**. Here that idea is generalized from software worktrees to agent context and authority.

## What this project is

- a reference architecture
- a small interactive prototype
- an experimental notebook for agent-security ideas
- a place to test where the checkout metaphor helps and where it breaks

## What this project is not

It does **not** claim to:

- solve prompt injection
- derive perfect least privilege automatically
- replace IAM
- literally snapshot all of external reality
- make autonomous agents safe
- introduce a fundamentally new security primitive

Existing work already covers least privilege, capability systems, sandboxing, information-flow control, task-specific policy, externalized memory and mediated tools. The question here is narrower:

> **Is an authority checkout a useful systems abstraction for making agent runtime authority easier to inspect, constrain, version and test?**

## Core model

An Authority Checkout may include:

- actor identity and delegation
- current task
- visible resources
- projected memory
- available tools
- effective capabilities
- provenance
- constraints
- expiry / freshness

The checkout is not itself sufficient authorization for consequential effects. Sensitive or irreversible actions should cross a live authorization boundary at execution time.

## First experiment

The initial scenario is intentionally small: a procurement agent comparing one supplier quote.

It should be able to:

- read the target supplier
- read the target quote
- create a comparison

It should not receive ambient access to:

- employee salaries
- unrelated invoices
- arbitrary external email
- payments

We then intentionally give the model adversarial instructions and observe the difference between:

1. what the model *tries* to do
2. what exists in its checkout
3. what the external boundary actually permits

## Repository map

```text
concept/
  authority-checkout.json   canonical project concept

docs/
  principles.md             architectural principles
  limitations.md            where the idea breaks
  related-work.md           adjacent ideas and systems
  roadmap.md                iterative research/build path

examples/
  procurement/
    scenario.json           first controlled scenario
```

## Current status

**v0.1 — concept + static scenario**

The next implementation step is a tiny browser simulator that can:

1. load canonical state
2. select an actor and task
3. materialize an Authority Checkout
4. show what is present and absent
5. evaluate proposed actions as `ALLOW`, `DENY`, `APPROVAL`, or `NOT_AVAILABLE`

No production security claims should be made from the prototype.
