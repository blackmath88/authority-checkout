window.AUTHORITY_CHECKOUT_JOURNEY.push(
  {
    id: "029",
    date: "2026-09-05",
    stage: "falsification",
    title: "The human effect gate was an untested control assumption.",
    assumption: "Consequential actions could be made safe enough by routing them to REQUIRE_APPROVAL and letting a human decide at the moment of effect.",
    challenge: "Approval is not deterministic enforcement. Repetition, ambiguity and habituation can make a live gate operationally ceremonial even while the architecture still shows a human-in-the-loop step.",
    learning: "The project has to distinguish the existence of an approval step from the reliability of that step. Human review is best treated as a control for genuine ambiguity, not as a substitute for policy the system could decide deterministically.",
    changed: "Prototype 06 adds control, fatigue and adversarial approval queues, local decision metrics and invariant EG-01. Break the Checkout gains AC-07 — exhaust the reviewer.",
    open: "Does decision quality actually degrade across repeated runs or multiple reviewers, and what level of evidence would justify changing the effect-gate architecture?",
    verification: "Prototype 06 implemented; no human-study result claimed yet",
    tags: ["approval-fatigue", "effect-gate", "human-in-the-loop", "falsification"]
  },
  {
    id: "030",
    date: "2026-09-05",
    stage: "architecture",
    title: "Determinize what policy can decide; escalate only ambiguity.",
    assumption: "Human approval and deterministic policy were interchangeable ways to stop a consequential action.",
    challenge: "A human gate has variable decision quality and cost. Deterministic policy has different failure modes but does not habituate. Treating both as equivalent hides an architectural distinction.",
    learning: "The effect path should prefer deterministic allow/deny for policy-resolvable cases and reserve human approval for uncertain or context-sensitive decisions.",
    changed: "The Research Board records approval reliability as an untested assumption and policy-before-approval as a design hypothesis rather than a solved rule.",
    open: "Which effect classes are actually ambiguous enough to justify human review, and how should repeated or batched approvals change the checkout representation?",
    verification: "design hypothesis; requires reviewer data",
    tags: ["deterministic-policy", "approval", "runtime-governance"]
  }
);
