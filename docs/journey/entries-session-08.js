window.AUTHORITY_CHECKOUT_JOURNEY.push(
  {
    id: "029",
    date: "2026-09-05",
    stage: "architecture",
    title: "One artifact still needs an internal trust boundary.",
    assumption: "If the runtime and human inspector consume the same checkout artifact, the authority picture is structurally honest enough to reason about.",
    challenge: "The lineage work exposed a different failure mode: task text, retrieval, memory and tool output are often hostile-influenced or mixed-trust, while identity, policy, delegation and approved grants come from authoritative control planes. Flattening both into one projection can make an unsafe derivation look legitimate even when dual consumption is technically satisfied.",
    learning: "Single-artifact dual consumption is necessary but not sufficient. The artifact must preserve which inputs are allowed to define authority and which are allowed only to influence reasoning.",
    changed: "Prototype 05 introduces authorityProjection and contextProjection inside the same checkout. The first is derived only from authoritative inputs; the second carries task, memory, retrieval and tool-output context with explicit mixed-trust provenance.",
    open: "Can the split survive a more realistic runtime where context indirectly influences tool selection, proposals and downstream policy inputs, or will authority leak back through a side channel?",
    verification: "implemented as prototypes/05-split-projection/index.html; local invariant SP-01 holds in the included safe compiler",
    tags: ["trust-boundary", "projection", "provenance", "dual-consumption"]
  },
  {
    id: "030",
    date: "2026-09-05",
    stage: "falsification",
    title: "The trust split gets its own attack surface.",
    assumption: "Showing the safe split and an intentionally unsafe merge is enough to communicate the rule.",
    challenge: "A project invariant is more useful when independent agents can try to break it. The dangerous case is exact and reproducible: hostile-influenced context causes a new capability to appear in the authoritative projection.",
    learning: "The research board and Break the Checkout should move with each prototype rather than lag behind it. New architecture creates new falsifiable claims immediately.",
    changed: "Break the Checkout gains AC-06: make hostile context mint authority. The research board gains a session-05 overlay recording the trust-collapse tension, the split-projection approach and the still-untested assumption that mixed-trust context cannot expand authority.",
    open: "Which indirect authority-expansion paths should AC-06 include next: tool-proposal approval, memory write-back, dynamic resource discovery, or policy-generation inputs?",
    verification: "AC-06 added; board overlay registered at 48 nodes, 50 relations and 19 timeline entries",
    tags: ["break-the-checkout", "AC-06", "research-board", "falsification"]
  }
);
