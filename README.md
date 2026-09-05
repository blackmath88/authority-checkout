# Authority Checkout

> **Make agent authority inspectable.**

Authority Checkout is an exploratory reference model and research prototype for **task-scoped agent authority legibility**.

The core idea is simple:

```text
canonical systems
      │
      ▼
checkout-like projection
      │
      ▼
agent
      │
      ▼
requested consequential effect
      │
      ▼
live effect gate
      │
      ▼
canonical systems
```

The project asks whether an agent's effective authority becomes easier for developers to reason about when it is materialized as a visible, inspectable and diffable object instead of remaining distributed across policy files, credentials, tool registrations, runtime state and logs.

The project is inspired by the architectural inversion behind Delta-style checkouts: **the representation an agent works against does not need to be the authoritative state**. Here that idea is generalized cautiously from software worktrees to task-scoped agent state and authority.

## Current research question

> **Can developers reason about an agent's effective authority more reliably when that authority is materialized as an inspectable, diffable object?**

This is now primarily a **legibility experiment**, not a claim of a new security primitive.

## What this project is

- a reference architecture
- a small interactive prototype
- an experimental notebook for agent-security ideas
- a place to test where the checkout metaphor helps and where it breaks
- a documented learning journey, including wrong assumptions and failed ideas

## What this project is not

It does **not** claim to:

- solve prompt injection
- derive perfect least privilege automatically
- replace IAM, policy engines, sandboxes or capability systems
- introduce novel deterministic enforcement outside the model
- literally snapshot all external reality
- address infrastructure-level sandbox escape or credential harvesting by itself
- have prevented the July 2026 OpenAI/Hugging Face incident
- make autonomous agents safe
- introduce a fundamentally new security primitive

## v0.2 model

The current model separates three questions that were originally mixed together.

### Projection

Checkout-like and inspectable:

- visible resources
- projected memory
- read capabilities
- tools
- provenance
- identity / delegation context
- expiry / freshness

It should be versionable and diffable.

### Effect gate

Consequential effects are not treated like mergeable source-code changes. Actions such as sending, publishing, purchasing, transferring or deleting should be authorized live when they execute.

### Pause authority

A newly explicit question:

> **Who can stop this agent right now, through which path, and what authority disappears when they do?**

This is currently a research primitive, not an implemented kill switch.

## First decisive experiment

The initial scenario stays intentionally small: a procurement agent comparing one supplier quote.

The first prototype should show, on one page:

- the current checkout
- an action/agent trace
- a checkout diff between revisions
- a live effect log

Run it twice:

1. clean task sequence
2. adversarial action sequence

The action sequence should be hardcoded first. An LLM comes later, so model variability does not hide whether the checkout representation itself is useful.

### Kill criterion

> **If the checkout tells the developer nothing useful beyond what the underlying policy/configuration already tells them, the project is only a visualization layer and should be narrowed or stopped.**

## Learning journey

Open `docs/journey/index.html` to see the chronological learning journal.

Each entry records:

- what I assumed
- what challenged that assumption
- what I learned
- what changed in the model
- what remains open
- provenance / verification state when relevant

The base entries live in `docs/journey/entries.js`. Later sparring sessions append separate files such as `entries-session-02.js`, so the history stays modular instead of being rewritten after every reframe.

## Repository map

```text
concept/
  authority-checkout.json        original v0.1 concept
  authority-checkout.v0.2.json   current research reframe

docs/
  principles.md
  limitations.md
  related-work.md
  roadmap.md
  journey/
    index.html
    entries.js
    entries-session-02.js

examples/
  procurement/
    scenario.json

prototype/
  index.html
```

## Current status

**Session 02 — research reframe**

The security claims got smaller and the legibility question got bigger.

Next build target: one decisive browser experiment centered on the **checkout diff**, not a production governance stack.
