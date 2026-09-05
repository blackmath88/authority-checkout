window.AUTHORITY_CHECKOUT_JOURNEY.push(
  {
    id: "025",
    date: "2026-09-05",
    stage: "falsification",
    title: "The prototype should be attackable as an idea, not only demoed as a product.",
    assumption: "The existing checkout and research-board prototypes were enough to expose weak claims because a reviewer could inspect them manually.",
    challenge: "A strong architecture should survive independent adversarial attempts to falsify its invariants. The br-ai-nstorm project already had the right participation pattern: bounded context out, bounded contribution back, explicit provenance, conflicts, and human review before shared state changes.",
    learning: "The missing piece was not a real security sandbox. It was an intellectual adversarial harness where people or LLMs must provide reproducible proof of a counterexample. An AI saying 'I broke it' is only a proposal; a break counts when declared state, observed state, divergence and reproduction steps survive review.",
    changed: "Prototype 03 — Break the Checkout — adapts the br-ai-nstorm aperture locally inside this repository. It defines attackable invariants, bounded fixtures, a context package, a proof-package schema and a browser-local review queue. br-ai-nstorm itself remains unchanged.",
    open: "Will independent agents produce useful counterexamples rather than generic critique, and which invariants need executable runtime fixtures before their proofs become meaningful?",
    verification: "implemented as prototypes/03-break-the-checkout; first version is browser-local and does not mutate canonical research state",
    tags: ["falsification", "adversarial", "br-ai-nstorm", "proof", "aperture"]
  },
  {
    id: "026",
    date: "2026-09-05",
    stage: "architecture",
    title: "A red-team finding is not canonical truth.",
    assumption: "If an external agent returns a structurally valid counterexample package, that could be treated as a successful break.",
    challenge: "The same provenance problem br-ai-nstorm solved for collaborative reasoning appears here in a sharper form: 'AI prepared this counterexample' must not collapse into 'the architecture is falsified'. Structural completeness, reproducibility and human acceptance are different states.",
    learning: "The adversarial workflow needs an authority boundary of its own. External agents can prepare evidence; local review can accept or reject it; only a later explicit repository change can alter the Research Board or project position.",
    changed: "Break the Checkout stores proof submissions and review decisions only in browser localStorage. Accepted local evidence is still not automatically promoted into landscape.js, overlays, or concept files.",
    open: "If the workflow proves valuable, should accepted proofs flow into an append-only br-ai-nstorm-style event log, and what human role is allowed to promote them into project research state?",
    verification: "accepted design principle",
    tags: ["provenance", "review", "canonical-state", "human-in-the-loop"]
  }
);
