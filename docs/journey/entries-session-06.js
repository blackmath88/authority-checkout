window.AUTHORITY_CHECKOUT_JOURNEY.push(
  {
    id: "027",
    date: "2026-09-05",
    stage: "falsification",
    title: "Prototype 01.1 failed its own dual-consumption invariant.",
    assumption: "The compiled-checkout prototype already demonstrated that source policy compiled into checkout.json and that viewer, diff and runtime all consumed the same artifact.",
    challenge: "Review showed three direct violations. First, compileCheckout() never read sources.policy, so radically changing policy produced byte-identical checkout output. Second, decision() hardcoded specific effect names, so the runtime could disagree with an effect declared in checkout.json. Third, renderDiff() printed literal strings instead of comparing two artifacts, despite labelling the panel artifact-to-artifact.",
    learning: "The failure is not cosmetic. It is exactly the architectural drift the project says should be detectable: decorative source inputs, a decorative artifact view, and parallel runtime logic. The prototype therefore falsified its own implementation claim before external red-teaming even began.",
    changed: "Prototype 01.1 now uses compileCheckout(inputs, approvedGrants); source policy is actual compiler input; effect evaluation is generic over checkout.effects; and the diff is computed from baseline and current artifacts. The headline is changed from compilation to single-artifact dual consumption.",
    open: "Can an external reviewer still find hidden state or divergent authority paths after this repair, and does the shared artifact actually improve human reasoning compared with raw source inputs?",
    verification: "confirmed by source inspection and repaired in prototypes/01.1-compiled-checkout/index.html",
    tags: ["self-falsification", "dual-consumption", "runtime-rule", "prototype-01.1"]
  },
  {
    id: "028",
    date: "2026-09-05",
    stage: "reframe",
    title: "Compilation is not the contribution; dual consumption is the surviving claim.",
    assumption: "The project could center its positioning on compiling an agent's working authority into a runtime projection.",
    challenge: "Session 04 established that shipped systems such as Microsoft Purview already compute and enforce policy projections. Compilation and staleness invalidation therefore cannot carry the novelty claim by themselves.",
    learning: "The sharper hypothesis is narrower: one execution-scoped, derived authority artifact is consumed by both the runtime and a human inspector. The checkout is never authoritative; upstream control planes and live effect gates remain canonical.",
    changed: "Concept v0.5 supersedes v0.4 and centers single-artifact dual consumption. Microsoft integration remains parked until the local legibility and reasoning kill criterion survives.",
    open: "Is the combined human/runtime artifact materially more useful than separate policy and runtime views, or is it only a convenient serialization layer?",
    verification: "accepted research reframe; novelty remains unverified",
    tags: ["Purview", "novelty", "single-artifact", "legibility"]
  }
);
