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
    status: "preserved",
    question: "Can developers reason about effective agent authority more reliably from a materialized checkout than from policy/configuration alone?",
    description: "The first decisive experiment: raw policy/input beside the resulting Authority Checkout, checkout revisions and diffs, action/effect trace, expiry, provenance and pause authority. Preserved unchanged as the legibility-only version.",
    href: "./prototypes/01-legibility/index.html",
    date: "2026-09-05",
    tags: ["legibility", "diff", "falsification"],
    killCriterion: "If the checkout tells a developer nothing useful beyond the underlying policy/configuration, narrow or stop the project."
  },
  {
    id: "01.1",
    title: "Single-artifact dual consumption",
    status: "working",
    question: "Can one task-scoped checkout artifact be consumed by both the human inspector and the runtime without parallel hidden authority state?",
    description: "Policy, task, delegation and approved grants compile into checkout.json. The human viewer, computed artifact diff and generic runtime-effect evaluator all consume that same machine-readable artifact. Session 06 repaired an earlier implementation that violated this invariant.",
    href: "./prototypes/01.1-compiled-checkout/index.html",
    date: "2026-09-05",
    tags: ["dual-consumption", "runtime-manifest", "legibility", "artifact"],
    killCriterion: "If either the runtime or human inspection depends on separate hardcoded authority state, or the shared artifact adds no reasoning value, narrow or stop the project."
  },
  {
    id: "02",
    title: "Authority research board",
    status: "reading surface",
    question: "Where does Authority Checkout actually differ from the 2026 agent-authority landscape, and which of its own claims remain weak?",
    description: "Static, no-build research board mapping incidents, research, industry, standards, governance and this project. Semantic state is canonical; map and timeline are read-only projections. Camp filtering keeps the landscape from collapsing into one undifferentiated cloud.",
    href: "./prototypes/02-research-board/index.html",
    date: "2026-09-05",
    tags: ["research", "prior-art", "landscape", "br-ai-nstorm"],
    killCriterion: "None. This board does not validate the project; it must preserve findings that weaken it and keep Prototype 01 / 01.1 as the falsifiable experiment."
  },
  {
    id: "03",
    title: "Break the Checkout",
    status: "adversarial proof room",
    question: "Will independent people or LLMs produce useful, reviewable counterexamples when the architectural invariant and required proof format are explicit?",
    description: "A project-specific adaptation of the br-ai-nstorm participation pattern for falsification. Export a bounded challenge context into any LLM, return a structured proof package, and review it locally. Agents can propose a break; they cannot silently turn it into canonical truth.",
    href: "./prototypes/03-break-the-checkout/index.html",
    date: "2026-09-05",
    tags: ["adversarial", "falsification", "proof", "br-ai-nstorm", "llm-aperture"],
    killCriterion: "If adversarial participants mostly produce unverifiable claims, generic critique, or proofs that humans cannot reproduce, do not add backend/MCP infrastructure for this workflow."
  },
  {
    id: "04",
    title: "Delegation trace",
    status: "horizon",
    question: "Can an upstream delegation protocol or authority chain be compiled into one execution-specific checkout without losing provenance or narrowing semantics?",
    description: "Conditional follow-up. Rather than inventing delegation rules, ingest an APS/OAuth-shaped delegation chain and materialize the effective execution authority, then compare it with isolated authorization logs or authority graphs.",
    href: null,
    date: "conditional",
    tags: ["delegation", "APS", "multi-agent", "auditability"],
    killCriterion: "Do not build unless Prototype 01.1 demonstrates value beyond an ordinary governance dashboard."
  }
];
