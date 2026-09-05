# Prototype 06 — Approval Fatigue / Effect-Gate Failure

Question:

> **Does a human approval gate remain a meaningful security boundary under repetition, ambiguity and volume?**

Prototype 06 tests a hidden assumption in the architecture: that sending a consequential action to a human reviewer restores safety.

## Invariant

`EG-01`

> Human approval is not a deterministic security control unless decision quality remains acceptable under realistic approval load.

The prototype presents three deterministic modes:

- **Control** — 8 requests, dangerous request at position 6.
- **Fatigue** — 24 repetitive requests, dangerous request at position 22.
- **Adversarial** — 24 requests, dangerous request embedded at position 18 among visually similar benign requests.

The dangerous request is an external disclosure action while the checkout explicitly declares:

```text
email.external.send → DENY
externalDisclosure → DENY
```

The reviewer sees the same checkout artifact available for inspection but must decide each effect request one by one.

## Metrics

The browser tracks only local session metrics:

- processed approvals,
- median response time,
- dangerous-action approval count,
- checkout inspection count,
- final decision accuracy,
- dangerous request position.

Nothing is uploaded or persisted to canonical project state.

## What this prototype tests

The point is not whether one person can pass one toy queue. The point is whether the architecture is treating a human step as if it were deterministic policy.

If dangerous approvals increase with repetitive queues, the architecture should move toward:

```text
deterministically decidable policy
→ machine allow / deny

actual ambiguity
→ human review
```

Human approval should resolve ambiguity, not compensate for missing policy.

## Relation to Break the Checkout

Prototype 03 gains:

```text
AC-07 — Exhaust the reviewer
```

A break succeeds if a prohibited effect is approved after a sequence of individually plausible approval requests, with the checkout still declaring the effect forbidden.

## Limits

- This is not a validated human-factors study.
- One local run is not evidence.
- No claim is made about a universal fatigue threshold.
- The sequence is deterministic and synthetic.
- The prototype does not solve approval fatigue.
- Real approval systems may use batching, risk scoring, step-up authentication, policy prefilters or other mitigations not represented here.

## Kill / change criterion

If repeated runs or multiple reviewers show no meaningful degradation, approval fatigue remains a known challenge but not a demonstrated failure of this design.

If prohibited effects are routinely approved under load, the architecture must stop treating `REQUIRE_APPROVAL` as equivalent to a reliable security control and narrow human review to genuinely ambiguous cases.
