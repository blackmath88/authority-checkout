window.AUTHORITY_CHECKOUT_JOURNEY.push(
  {
    id: "029",
    date: "2026-09-05",
    stage: "architecture",
    title: "A derived checkout needs an explicit freshness model.",
    assumption: "Once one artifact serves both human inspection and runtime decisions, the main remaining problem is keeping both consumers on the same object.",
    challenge: "Upstream state can change after compilation. Delegations are revoked, classifications change, policies are reevaluated and artifacts expire. A dual-consumption artifact can still become dangerously stale even when both consumers read the same bytes.",
    learning: "The checkout needs to say which fields are snapshot-safe, which are live references, and which upstream changes invalidate the artifact. The checkout remains derived and never becomes authoritative merely because it is inspectable.",
    changed: "Prototype 04 — Live Authority Drift — introduces SNAPSHOT_SAFE, LIVE_REFERENCE and INVALIDATING freshness classes and visualizes source state, checkout state, drift and runtime decisions together.",
    open: "Can developers correctly reason about mixed compiled/live state, and which real control-plane signals would be the first useful credibility upgrade after the fictional experiment survives?",
    verification: "implemented as prototypes/04-live-authority-drift with bounded local fixtures",
    tags: ["staleness", "freshness", "revocation", "runtime", "derived-state"]
  },
  {
    id: "030",
    date: "2026-09-05",
    stage: "falsification",
    title: "Staleness becomes an adversarial invariant, not just a design concern.",
    assumption: "Drift could remain a documentation concern until real Entra or Purview integration exists.",
    challenge: "The Purview research made the opposite clearer: staleness is already measurable with fictional state, and a later real integration should validate the same invariant rather than define it for the first time.",
    learning: "The next useful attack is simple: make the runtime trust a stale compiled value after an invalidating upstream change. That can be tested now, without a real Microsoft tenant.",
    changed: "Break the Checkout gains AC-05: stale-authority trust after delegation revocation, data reclassification or checkout expiry.",
    open: "Can an adversarial participant produce a reproducible stale-state counterexample against Prototype 04, or does the freshness boundary hold under the current fixture model?",
    verification: "AC-05 added to Prototype 03",
    tags: ["break-the-checkout", "AC-05", "drift", "falsification"]
  }
);
