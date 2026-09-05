# Authority Checkout

> **Compile the agent's working authority into an inspectable runtime artifact.**

Authority Checkout is an exploratory research project about **runtime projection for agentic software**.

The architectural move is simple:

> **The representation an actor works against does not need to be canonical state.**

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
compileCheckout()
      │
      ▼
checkout.json
      │
      ├── human viewer
      └── runtime assembly / effect evaluation
```

## Current research question

> **Can one task-scoped compiled artifact serve both runtime assembly and human reasoning about effective agent authority without duplicating or weakening the underlying identity, policy and enforcement systems?**

This is no longer primarily a permissions-dashboard experiment.

## Why the project changed

Research found three important corrections:

1. **Pre-execution deterministic control is established prior art.** Authority Checkout should not claim it.
2. **Human-readable authority views already exist.** Effective-access dashboards, delegation graphs, revocation controls and authority visualizations are not novel on their own.
3. **Delegation protocols are getting much more formal.** The Agent Passport System (APS) draft is a close neighbour and should be treated as possible upstream authority input, not reinvented here.

That leaves a stronger version of the original Delta-inspired idea:

> **The checkout should be the actual compiled execution manifest, not just a picture of policy.**

## Core distinctions

```text
SOURCE POLICY ≠ CHECKOUT ≠ EXECUTION TRACE
```

- **Source policy / IAM / delegation** remain canonical upstream systems.
- **Checkout** is derived, task-scoped, versioned and disposable.
- **Execution trace / receipts** record what later happened.
- **Live effect gates** may revalidate consequential actions at execution time.

The UI is only one rendering of the checkout.

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

## Working checkout manifest

Prototype 01.1 compiles a manifest with:

- actor + principal
- task + target
- visible resources
- projected memory references
- exposed tools
- effective capabilities
- delegation / authority source
- provenance
- expiry
- effect rules / approval requirements
- pause authority

The exact schema is experimental.

## Prototypes

The root `index.html` is the research index and navigation layer.

### Prototype 00 — static boundary simulator

Historical baseline. Made the metaphor interactive.

### Prototype 01 — authority legibility test

Preserved unchanged. Tests raw policy/configuration versus a human-readable materialized checkout, including revisions, diffs and effect decisions.

### Prototype 01.1 — compiled runtime checkout

Current falsifiable experiment.

`policy + task + delegation + control → compileCheckout() → checkout.json`

The human view, checkout diff and simulated runtime evaluator all consume that same artifact.

**Kill criterion:** if the artifact is not useful to both runtime assembly and human inspection, the checkout abstraction is still cosmetic.

### Prototype 02 — authority research board

Open `prototypes/02-research-board/index.html`.

A static reading surface for the 2026 agent-authority landscape: incidents, research, industry, standards, governance and this project. It borrows the interaction rule from br-ai-nstorm that **semantic state is canonical and the map/timeline are derived read-only views**. Position on the force-directed map carries no meaning.

The board adds one dimension br-ai-nstorm does not have: `camp`. Fill shows which community a position comes from; ring shows semantic `kind`; every view respects the camp filter.

It is deliberately **not** the experiment. It tracks prior art, evidence, contradictions and unresolved claims around the experiment.

Current board state: **44 nodes, 46 relations, 17 timeline entries**.

Three project-facing claims stay unresolved on purpose:

- `c-aps-overlap` — APS may already formalize part of the projection/effect-gate split.
- `as-legibility` — the claimed legibility gap is not yet verified.
- `as-reasoning` — whether materialization actually helps developer reasoning remains the kill criterion.

### Prototype 03 — Break the Checkout

Open `prototypes/03-break-the-checkout/index.html`.

A project-specific adaptation of the **br-ai-nstorm** participation pattern for adversarial falsification rather than collective ideation.

The room exposes bounded architectural claims and fixtures, exports a structured context package to any person or LLM, accepts a bounded proof package back, and keeps imported evidence in a browser-local review queue.

The rule is explicit:

> **Agents may propose a break. A break only counts after reproducible proof is reviewed.**

The prototype deliberately does **not** provide a real security sandbox or vulnerable infrastructure target. Participants are trying to falsify the model: find undeclared runtime authority, stale authority acceptance, effect-gate bypasses, or evidence that the checkout is only a UI picture rather than the runtime artifact.

A structurally valid proof package is not canonical truth. Local review does not mutate the Research Board or the repository.

**Kill criterion:** if adversarial participants mostly return generic critique or non-reproducible claims, do not add backend/MCP infrastructure for this workflow.

### Prototype 04 — delegation trace

Conditional horizon. Rather than inventing delegation semantics, ingest an APS/OAuth-shaped chain and compile its effective authority into one execution-specific checkout.

## What this project is not

It does **not** claim to:

- solve prompt injection
- derive perfect least privilege automatically
- replace IAM, policy engines, sandboxes or capability systems
- invent deterministic out-of-model enforcement
- invent delegation protocols
- introduce novel authority dashboards or graphs
- literally snapshot all external reality
- prevent infrastructure-level sandbox escape
- remain authoritative after its enforcement layer is compromised
- make autonomous agents safe

## Related architectural inspirations

### Delta / DeltaDB

The load-bearing analogy: canonical state and working representation are different objects. The analogy only matters here if the checkout is actually consumed by execution.

### Memory as middleware

Persistent memory is system state that can be projected into execution rather than intrinsically owned by the agent. Authority may be another projected domain of the same substrate.

### Agent Passport System

Potential upstream source for delegated authority, narrowing, revocation and action-policy receipts. Authority Checkout should compile or reference these facts rather than replace the protocol.

### br-ai-nstorm

Two patterns are borrowed from the sibling collective-reasoning prototype:

1. **Semantic state is canonical; visual projections never write.** This powers the Research Board.
2. **Bounded context out, bounded contribution back, explicit provenance and human review.** This powers Break the Checkout.

The br-ai-nstorm repository itself stays generic and unchanged.

### AT Protocol

Still a horizon hypothesis, not a dependency. The useful inspiration is separation of stable identity, hosting and signed state. A future checkout might reference portable attestations without publishing sensitive entitlement detail.

## Learning journey

Open `docs/journey/index.html`.

The journal preserves:

```text
what I assumed
what challenged it
what I learned
what changed
what remains open
verification state
```

Current modules:

- `entries.js` — origin
- `entries-session-02.js` — legibility / enforcement reframe
- `entries-session-03.js` — APS, existing authority dashboards, compiled-runtime reframe
- `entries-session-04.js` — research-board mapping and explicit unresolved claims
- `entries-session-05.js` — adversarial proof-room adaptation from br-ai-nstorm

## Concept history

```text
concept/authority-checkout.json        v0.1 — original authority-checkout idea
concept/authority-checkout.v0.2.json   v0.2 — legibility reframe
concept/authority-checkout.v0.3.json   v0.3 — architecture lineage / runtime projection
concept/authority-checkout.v0.4.json   v0.4 — compiled runtime manifest
```

## Current status

**Session 05 — the project can now be attacked, not just demonstrated**

Prototype 01 / 01.1 remains the core falsifiable architecture experiment. Prototype 02 tracks the outside landscape. Prototype 03 opens a bounded participation aperture so independent agents and people can try to produce evidence that the architecture is wrong.

> **Can `checkout.json` become a real execution boundary artifact that improves human reasoning without quietly recreating ambient authority underneath it — and can adversarial reviewers prove when it fails?**
