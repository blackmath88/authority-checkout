# Prototype 03 — Break the Checkout

An adversarial proof room for **falsifying Authority Checkout claims**.

Open `index.html`. No backend is required for this first version.

## Why it exists

Authority Checkout makes architectural claims such as:

> Effective runtime authority is completely described by `checkout.json` plus
> explicitly declared live gates.

This prototype asks independent people or LLMs to attack those claims rather
than merely discuss them.

The goal is not to provide an infrastructure sandbox or a vulnerable target.
The goal is to provide a **bounded intellectual adversarial harness**:

```text
claim
  ↓
bounded fixture + context package
  ↓
independent person / LLM
  ↓
proof package
  ↓
human review
  ↓
accepted or rejected evidence
```

A claim such as "I broke it" is not enough. A break must include the declared
state, observed state, exact divergence, reproduction steps and evidence.

## Relationship to br-ai-nstorm

This prototype deliberately leaves `blackmath88/br-ai-nstorm` unchanged.

It borrows only the interaction pattern:

- bounded context package out,
- bounded contribution/proof package back,
- provenance,
- independent LLM participation,
- proposals do not silently become canonical truth,
- human review is an explicit act.

In br-ai-nstorm the shared object is a collective problem. Here the shared object
is a **falsifiable claim**.

The adapted rule is:

> **Agents may propose a break. A break only counts after reproducible proof is reviewed.**

## What it is not

This is not a real security sandbox, penetration-test target or production agent
runtime. It does not give participants network, shell, credentials or access to
real systems.

All bundled fixtures are synthetic and bounded. Participants are testing the
**honesty and completeness of an architectural model**, not attacking
infrastructure.

## Current challenges

### AC-01 — undeclared runtime authority

Find a capability the runtime can exercise that is absent from the checkout and
not covered by a declared live gate.

This attacks the core invariant:

```text
effective runtime authority
=
checkout projection
+
explicit live gates
```

with no hidden ambient remainder.

### AC-02 — stale authority acceptance

Show that a compiled checkout keeps granting authority after an upstream grant,
policy or delegation was revoked or expired.

### AC-03 — effect-gate bypass

Produce an irreversible effect without traversing the declared live gate.
Equivalent side effects through another adapter still count.

### AC-04 — checkout is only a picture

Show that the UI and runtime do not actually derive from the same compiled
artifact.

## Browser-local review queue

The first version stores imported proof packages and review decisions in
`localStorage` only.

That choice is deliberate:

- an external LLM cannot mutate the repository;
- a structurally valid package is still only a proposal;
- accepting a proof locally does **not** change the research board;
- canonical project changes still require a deliberate human repository edit.

This keeps the authority boundary visible while the interaction model is still
being tested.

## LLM aperture

The `LLM aperture` tab exports:

```text
ai.bridgework.authorityCheckout.breakContext
```

and expects:

```text
ai.bridgework.authorityCheckout.breakProof
```

The schemas live under `schemas/`.

This is intentionally similar to br-ai-nstorm's clipboard aperture: the LLM can
think privately in any environment, but only the bounded result returns.

## Provenance

A proof package records at least:

- participant id,
- optional `preparedBy` model/agent,
- source (`external_llm`, `direct`, `mcp`),
- challenge id,
- verdict,
- challenge-specific proof fields.

"AI prepared" is not equivalent to "human verified". The browser review action
is deliberately separate.

## Future path

Do **not** copy the full br-ai-nstorm backend yet.

Only if the interaction proves useful should this prototype consider:

1. connecting to a real br-ai-nstorm room or reusing its MCP transport,
2. storing proof submissions in an append-only event log,
3. adding evaluator-to-evaluator conflicts,
4. exporting accepted findings into a new research-board overlay,
5. testing actual runtime fixtures rather than bounded static fixtures.

The current prototype exists to answer the smaller question first:

> **Will independent agents produce useful, reviewable counterexamples when the success criterion and proof format are explicit?**
