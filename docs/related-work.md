# Related Work Map

Authority Checkout intentionally sits on top of ideas that already exist. The project should avoid novelty claims that collapse under basic comparison.

## Working position

The current hypothesis is **not** that Authority Checkout introduces a new enforcement primitive.

The working contribution is narrower:

> Can effective agent authority be materialized as a human-inspectable, diffable object that improves debugging, governance and delegation reasoning?

Deterministic enforcement outside the model is treated as prior art and infrastructure underneath this experiment.

## Delta-style checkout architecture

The strongest conceptual inspiration is the separation between **authoritative state** and the **materialized working representation** used by an agent or thread.

Authority Checkout generalizes that architectural inversion from software worktrees to agent context and effective authority.

The analogy has limits: enterprise reality is live, distributed and often effectful rather than mergeable. The v0.2 model therefore separates a checkout-like **projection** from a live **effect gate**.

## CaMeL — Defeating Prompt Injections by Design

CaMeL creates a protective system layer around the LLM, explicitly separates control and data flow, and uses capabilities to prevent unauthorized information flow. The published paper abstract reports solving **67% of AgentDojo tasks with provable security**.

Authority Checkout does **not** duplicate CaMeL's per-value information-flow model or claim stronger enforcement. The experiment asks whether a task-scoped authority envelope can be materialized as a legible developer artifact.

Reference: https://arxiv.org/abs/2503.18813

## FIDES / Progent / RTBAS / FORGE and other out-of-band defenses

Adjacent research uses deterministic reference monitors, capability checks, information-flow labels and out-of-band policy enforcement.

Authority Checkout belongs to the same broad architectural family in the sense that security decisions should not depend on the model voluntarily following a prompt. Its proposed contribution is representation and inspectability, not enforcement strength.

This block needs deeper paper-by-paper verification before publication-level claims are made.

## Dual-LLM / privileged-planner patterns

Architectures that isolate trusted planning from untrusted content address a different dimension of the problem.

Authority Checkout is orthogonal: a checkout could be the authority representation underneath a single-model, dual-model or other agent architecture.

## Cedar / OPA and policy-as-code

Policy engines answer authorization questions from policy and request context.

Authority Checkout should not recreate them. Its research question is whether **materializing the effective result** — including resources, capabilities, provenance, expiry and changes over time — provides something operationally useful beyond per-call evaluation and raw policy inspection.

The project's explicit kill criterion is that, if the checkout tells a developer nothing useful beyond the policy inputs, the concept should be narrowed or stopped.

## IAM and agent identity governance

Identity systems answer questions such as:

- Who or what is acting?
- Who owns or sponsors it?
- Which roles and entitlements does it have?
- What is its lifecycle?

Authority Checkout assumes those signals can be inputs, but asks a different runtime question:

> What effective authority is materialized for this actor, for this task, right now?

The checkout should be treated as an entitlement/runtime artifact, not as the agent's identity.

## MCP gateways and agent-governance products

Commercial and open-source stacks increasingly offer per-agent identity, scoped tools, gateways and audit trails.

Authority Checkout is not intended to compete with that product category. It is a reference architecture and research probe that should be tested against those systems to see whether the checkout representation adds anything useful.

## Agentic governance taxonomies

OWASP agentic security guidance, NIST AI risk-management guidance and FINOS agent-governance controls are existing taxonomies practitioners already use.

If the prototype grows beyond a toy, its controls should be mapped to established taxonomies rather than inventing a parallel vocabulary simply for novelty.

## Delegation

Authority propagation across multiple cooperating agents is now an early research candidate rather than a late feature.

The interesting question is not merely whether each individual call was authorized, but whether a human can reconstruct:

- where authority originated
- how it narrowed or expanded at each hop
- which agent/tool exercised it
- who is attributable for the final effect

Claims that this is an unsolved or unique gap require deeper related-work verification before publication.

## July 2026 OpenAI / Hugging Face incident

This incident is **not** evidence that Authority Checkout would have prevented a real-world breach.

First-party reports describe sandbox escape, infrastructure exploitation, credentials, lateral movement and third-party compromise. Those are below the layer currently modeled here.

Transferable architectural questions remain useful:

- What ambient authority exists outside the model-visible environment?
- When should task authority expire?
- Who has authority to pause or revoke automated work?

The incident is therefore a boundary lesson and inspiration, not a validation case.

## Working novelty claim

The current claim is intentionally modest:

> Authority Checkout is an exploratory systems representation for materializing effective agent authority as an inspectable, versionable and diffable artifact while keeping consequential effects behind live authorization.

If experiments show that existing policy/governance tooling already provides the same legibility, this claim should become narrower.
