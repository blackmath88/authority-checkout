# Authority Checkout

> **Make agent authority inspectable.**

Authority Checkout is an exploratory reference model and research prototype for **task-scoped agent authority legibility**.

The project is built around one architectural move:

> **The representation an actor works against does not need to be canonical state.**

That move first appeared in the companion memory work, where persistent memory became system state projected into an execution rather than something intrinsically owned by an agent. Delta / DeltaDB supplied the load-bearing analogy: a familiar working representation can remain useful while no longer being the deepest source of truth.

Authority Checkout applies the same move to authority.

```text
canonical substrate
  state
  memory
  identity
  policy
  capabilities
  provenance
      │
      ▼
materialized runtime projection
      │
      ▼
LLM-powered software module
      │
      ├── proposed state changes
      └── consequential effects
                 │
                 ▼
          live effect gate
```

## Current research question

> **Can developers reason about an agent's effective authority more reliably when that authority is materialized as an inspectable, diffable object?**

This is a **legibility experiment**, not a claim of a new security primitive.

## Agent framing

The project deliberately avoids treating the agent as a digital employee that naturally owns memory, tools and permissions.

Instead, treat it as an LLM-powered software module receiving explicit runtime inputs:

```text
agent({
  task,
  stateProjection,
  memoryProjection,
  capabilities,
  provenance
})
```

Ambient authority is therefore treated like an implicit global dependency: power available because of the surrounding environment rather than because it was explicitly handed to this execution for this task.

## Sandbox vs checkout

These are different layers.

```text
Sandbox / isolation
  → where may this code run?

Authority Checkout
  → what state and capability was this execution handed?
```

> **Sandbox is how the execution is contained. Checkout is what it was handed.**

Authority Checkout does not claim to survive compromise of the layer that actually enforces the authority boundary.

## Current model

### Runtime projection / Authority Checkout

Checkout-like and inspectable:

- actor identity
- delegation context
- task
- visible resources
- projected memory
- tools
- attemptable capabilities
- provenance
- expiry / freshness
- pause-control metadata

It should be versionable and diffable.

### Effect gate

Consequential effects are not mergeable source-control diffs. Sending, publishing, purchasing, transferring or deleting should be authorized live when they execute.

### Pause authority

A separate control question:

> **Who can stop this execution right now, through which path, and what authority disappears when they do?**

### Proposal loop

If the execution discovers that it lacks something genuinely required for the task, that should become a governed proposal rather than implicit privilege expansion:

```text
ephemeral request
      ↓
proposal
      ↓
governed release
      ↓
new checkout revision
```

## What this project is not

It does **not** claim to:

- solve prompt injection
- derive perfect least privilege automatically
- replace IAM, policy engines, sandboxes or capability systems
- introduce novel deterministic enforcement outside the model
- literally snapshot all external reality
- prevent infrastructure-level sandbox escape
- remain authoritative after its enforcement layer is compromised
- have prevented the July 2026 OpenAI/Hugging Face incident
- make autonomous agents safe
- introduce a fundamentally new security primitive

## First decisive prototype

One page. One actor. One procurement task. No production integration.

The first prototype should compare:

1. **policy/config input**
2. **materialized checkout**

and then make the user answer practical questions such as:

- Can the agent read this quote?
- Can it access an unrelated invoice?
- Can it send an external email right now?
- Why does it have this capability?
- When does it expire?
- What changed since the previous checkout?
- Who delegated this authority?
- Who can pause it?

The page also shows:

- a hardcoded attempted-action trace
- checkout revisions
- a prominent checkout diff
- a simulated live effect log

Do **not** wire an LLM first. The first test is the representation, not model behavior.

### Kill criterion

> **If the checkout tells the developer nothing useful beyond what the underlying policy/configuration already tells them, the project is only a visualization layer and should be narrowed or stopped.**

## Horizon: AT Protocol

AT Protocol may become relevant later, but it is deliberately excluded from the first prototype.

Potentially interesting properties are:

- stable actor identity via DID
- identity separated from the hosting provider
- signed, verifiable repositories
- portable ownership of records

A future question is whether **authority checkout revisions, delegation grants or audit records** benefit from stable portable identity and independently attributable signed records across separately operated infrastructure.

ATProto would not provide the authorization enforcement itself.

## Learning journey

Open `docs/journey/index.html` to see the chronological journal.

Each entry records:

- what I assumed
- what challenged that assumption
- what I learned
- what changed in the model
- what remains open
- provenance / verification state when relevant

The journal is modular by session so the history is appended rather than rewritten.

See also `docs/lineage.md` for the architectural path from memory projection and Delta to Authority Checkout.

## Repository map

```text
concept/
  authority-checkout.json        original v0.1 concept
  authority-checkout.v0.2.json   legibility reframe
  authority-checkout.v0.3.json   runtime-projection / lineage model

docs/
  lineage.md
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

**Session 02 — architecture lineage + legibility reframe**

The next build target is one falsifiable browser experiment centered on the **checkout diff and authority questions**, not a governance platform.
