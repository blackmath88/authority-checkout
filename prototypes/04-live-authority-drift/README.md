# Prototype 04 — Live Authority Drift

Question:

> **When does a derived checkout stop being trustworthy after upstream authority changes?**

Prototype 01.1 tests one-artifact dual consumption. Prototype 04 adds time and
upstream mutation. The checkout is still useful, but it is explicitly not
canonical and cannot silently outlive the authority state it was derived from.

Open `index.html`. No build step.

## Invariant

`AD-01`

> No runtime decision may rely on stale checkout state when that field is
> declared `LIVE_REFERENCE` or `INVALIDATING`.

## Three freshness classes

### SNAPSHOT_SAFE

Facts that may be materialized into the checkout and remain useful until the
checkout's own expiry boundary.

Examples in this prototype:

- task identity
- actor/principal identity

### LIVE_REFERENCE

The checkout may record that a policy or authority source applies, but runtime
must consult the authoritative source at action time.

Examples:

- disclosure policy
- budget-write approval policy

### INVALIDATING

If this upstream state changes after compilation, dependent checkout state is no
longer trustworthy and the artifact must be recompiled before those decisions
continue.

Examples:

- delegation revocation
- document reclassification
- checkout expiry

## Scenario

At 11:30 a finance checkout is compiled.

Then the user can apply drift:

- 11:37 — delegation revoked
- 11:39 — document changes from `Internal` to `Confidential`
- 11:46 — checkout expiry passes

The UI shows four simultaneous views:

1. authoritative source state,
2. the derived checkout,
3. drift since compilation,
4. current runtime decisions.

Once an invalidating field diverges, runtime decisions return
`RECOMPILE_REQUIRED` rather than trusting the stale snapshot.

## What this is testing

Not whether invalidation exists as a concept — that is established prior art.

The research question is narrower:

> **Can one human-inspectable runtime artifact make the boundary between
> compiled state, live references and invalidating drift understandable without
> becoming a second source of truth?**

## Relationship to Purview / Entra

The prototype deliberately uses fictional local state. Microsoft integration is
parked.

If the interaction survives its kill criterion, a later credibility upgrade can
replace one fictional upstream source with a real control-plane response. That
would test the generic architecture against reality rather than create another
Microsoft integration demo.

## Kill criterion

Stop or narrow this line if either is true:

- developers cannot correctly identify which checkout fields are safe, live or
  invalidating from the artifact;
- the runtime still makes decisions from stale compiled values after an
  invalidating change.

## Next adversarial challenge

Prototype 03 should attack this as `AC-05`:

> **Make the runtime trust stale authority after an invalidating upstream
> change.**
