window.AUTHORITY_CHECKOUT_JOURNEY.push(
  {
    id: "023",
    date: "2026-09-05",
    stage: "research",
    title: "The authority landscape needed its own reading surface.",
    assumption: "The prior-art notes in the journey and roadmap were enough to keep track of where Authority Checkout sits.",
    challenge: "By session 03 the evidence spanned incidents, research, vendors, standards, regulation and this project itself. A linear journal made individual findings legible but made the cross-camp structure hard to inspect without flattening everything into one list.",
    learning: "A separate research board is useful if it remains a derived reading surface rather than becoming the ontology. The semantic state stays canonical; map and timeline are projections and never write. Position on the force-directed map carries no meaning.",
    changed: "Prototype 02 adds an Authority Research Board with camp-aware filtering across state, map and timeline views. It remains static and single-author by design.",
    open: "Which relationships on the board are real enough to change the project, and which are only useful prompts for the next falsifiable experiment?",
    verification: "implemented as prototypes/02-research-board; board state verified at 44 nodes, 46 relations and 17 timeline entries",
    tags: ["research-board", "br-ai-nstorm", "projection", "prior-art"]
  },
  {
    id: "024",
    date: "2026-09-05",
    stage: "falsification",
    title: "The board makes three project-facing claims impossible to hide.",
    assumption: "The compiled-checkout framing was now differentiated enough to move straight toward implementation.",
    challenge: "The landscape still points back at three unresolved claims: APS may already formalize monotonic authority narrowing and a reversibility dimension close to the projection/effect-gate split; the claimed legibility gap is asserted rather than verified; and the claim that materialization improves developer reasoning is still untested.",
    learning: "The research board is only useful if findings that weaken the project remain visible. It must not become a presentation layer that quietly converts open tensions into resolved positioning.",
    changed: "c-aps-overlap, as-legibility and as-reasoning remain explicitly unresolved. Prototype 01 / 01.1 remains the kill-or-validate experiment; Prototype 02 only tracks the landscape around it.",
    open: "Can the checkout-diff experiment show a measurable improvement in developer reasoning, and does APS reduce Authority Checkout to a useful projection/view layer rather than an independent authority model?",
    verification: "open research questions; no status promotion performed",
    tags: ["kill-criterion", "APS", "legibility", "reasoning"]
  }
);
