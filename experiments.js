window.AUTHORITY_CHECKOUT_EXPERIMENTS = [
  {
    id: "00",
    title: "Static boundary simulator",
    status: "baseline",
    question: "Can the checkout metaphor be made concrete enough to interact with?",
    description: "The first rough simulator. It shows a static procurement checkout and lets the user attempt actions against a simple deterministic boundary. Preserved as the historical baseline rather than treated as the current research experiment.",
    href: "./prototype/index.html",
    date: "2026-09-05",
    tags: ["baseline", "procurement", "static"],
    killCriterion: "None. This prototype exists to make the metaphor visible, not to validate the current legibility claim."
  },
  {
    id: "01",
    title: "Authority legibility test",
    status: "next",
    question: "Can developers reason about effective agent authority more reliably from a materialized checkout than from policy/configuration alone?",
    description: "The first decisive experiment: raw policy/input beside the resulting Authority Checkout, checkout revisions and diffs, action/effect trace, expiry, provenance, delegation context and pause authority. No LLM initially.",
    href: null,
    date: "planned",
    tags: ["legibility", "diff", "falsification"],
    killCriterion: "If the checkout tells a developer nothing useful beyond the underlying policy/configuration, narrow or stop the project."
  },
  {
    id: "02",
    title: "Delegation trace",
    status: "horizon",
    question: "Does a materialized authority trace make multi-agent delegation easier to understand than isolated authorization logs?",
    description: "A possible early follow-up if Prototype 01 survives: human/service → Agent A → Agent B → tool/effect, with inherited authority, narrowing, expiry and attribution shown as one trace.",
    href: null,
    date: "conditional",
    tags: ["delegation", "multi-agent", "auditability"],
    killCriterion: "Do not build unless Prototype 01 demonstrates real legibility value."
  }
];
