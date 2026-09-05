# Prototype 05 — Split Projection / Trust Boundary

Question:

> **Can the checkout preserve the distinction between authoritative control-plane state and hostile-influenced context so that untrusted content can shape reasoning without expanding authority?**

This prototype follows directly from the lineage work and the earlier dual-consumption / drift experiments.

Prototype 01.1 established one artifact with two consumers.
Prototype 04 established that a derived artifact needs a freshness model.
Prototype 05 adds a different structural constraint: **not every input to the agent is equally entitled to define authority.**

## Invariant

`SP-01`

> Hostile-influenced context may narrow, annotate or shape reasoning, but it may never expand effective authority.

The prototype separates two planes before compilation:

```text
AUTHORITATIVE PLANE
identity
policy
delegation
approved grants
        │
        ▼
authorityProjection

MIXED-TRUST CONTEXT PLANE
task interpretation
memory
retrieval
tool output
external content
        │
        ▼
contextProjection
```

Both projections still live inside one checkout artifact. The point is not to create two runtimes; it is to preserve provenance and trust class instead of flattening everything into one bag of state.

## Interactive scenario

The baseline checkout allows:

- `supplier.read:ACME`
- `quote.read:ACME-2026-17`
- `comparison.write:draft`

Then an external document is injected containing an instruction to add:

- `supplier.history.read:ACME`
- `payment.execute`

The safe compiler keeps the instruction visible inside `contextProjection` but does not add either capability to `authorityProjection`.

The **Show unsafe merge** control deliberately demonstrates the forbidden implementation: it reads `requestsAuthority` from retrieved content and merges those values into capabilities.

That counterexample exists so the invariant is concrete rather than rhetorical.

## What this prototype does not claim

- Trust separation is not claimed as novel.
- It does not solve prompt injection.
- It does not prove that all authoritative systems are actually trustworthy.
- It does not classify real data sources automatically.
- It does not provide production taint tracking or information-flow control.
- It does not prevent infrastructure-level compromise.

The narrow claim is architectural: **authority derivation and mixed-trust reasoning context must not be the same input channel.**

## Relation to Break the Checkout

Prototype 03 should attack this with a dedicated challenge:

```text
AC-06
Cause hostile-influenced context to expand the authoritative projection.
```

A valid break must show the exact context input, the resulting checkout, the newly gained capability, and reproducible steps.

## Kill criterion

If the split is only visual — for example, if runtime assembly still derives authority from mixed-trust fields elsewhere — then the prototype fails.

Likewise, if the split cannot be maintained without duplicating hidden policy state, the design needs to narrow.

## Why this matters

The checkout is intentionally legible. That makes the provenance of authority part of the object humans inspect. A capability should not merely appear in the manifest; a reviewer should be able to see whether it came from an authoritative control plane or from context that was allowed only to influence reasoning.

The next unresolved issue is **approval fatigue**: even if authority projection is clean, a live human effect gate can degrade into a rubber stamp under volume.
