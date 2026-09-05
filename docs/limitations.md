# Limitations and Failure Modes

Authority Checkout is a research abstraction, not a complete agent-security architecture.

The project should keep these limitations visible from the beginning.

## A checkout is not a literal copy of reality

Enterprise agent environments are live and distributed: email, calendars, APIs, databases, users, external services and other agents can all change while an agent works.

A checkout is therefore better understood as a **current authority envelope and materialized working view** than a frozen snapshot of all relevant reality.

## Least privilege is difficult to derive

The system may not know in advance which resources an autonomous agent will legitimately need.

Under-projection harms utility. Over-projection weakens security.

This tension is central to the project rather than a solved implementation detail.

## Prompt injection still exists

Data legitimately included in a checkout can itself contain malicious instructions.

The checkout may reduce blast radius, but it does not make projected content trustworthy.

Prototype 05 sharpens this into an explicit trust-boundary rule: mixed-trust task, memory, retrieval and tool-output context may influence reasoning, but it must not become an authority source.

## Projection can flatten trust

A single runtime artifact can still be unsafe if it erases where its fields came from.

Identity, delegation, policy and approved grants have a different authority role from task text, retrieved documents, memory and tool output. If those inputs are flattened into one undifferentiated projection, hostile-influenced content can appear to have the same standing as authoritative control-plane state.

Prototype 05 separates `authorityProjection` from `contextProjection` inside one checkout to make this failure mode visible. That local separation is not a proof that all indirect authority-expansion paths are closed.

## Tool trust is separate

A tool may be malicious, misleading, over-privileged or incorrectly described.

Restricting which tools are exposed helps only if the exposed tools and their runtime credentials are themselves governed.

## Hidden from context does not mean unreachable

A model might not see salary data while a generic SQL tool or inherited credential can still retrieve it.

Any serious implementation must enforce restrictions outside the LLM context.

## Stale authority is dangerous

Permissions, policies and resource state can change after checkout creation.

Consequential actions therefore need live authorization rather than relying solely on checkout-time decisions.

Prototype 04 adds an explicit freshness model, but the project does not claim to solve staleness invalidation in general.

## Approval fatigue can collapse the effect gate

Human approval is not automatically a strong control.

If an agent generates enough approval requests, reviewers can learn to approve routinely, turning a technically present effect gate into an operational rubber stamp. This failure mode requires no bypass of the policy engine itself.

Approval fatigue should be treated as a first-class security challenge, not a UX detail. A later prototype should measure whether detection accuracy degrades as benign approval volume rises.

## Not all effects are deltas

Some changes are naturally reviewable candidate state:

- draft an invoice
- edit a document
- update a record

Others are irreversible or externally observable events:

- send email
- transfer money
- publish content
- delete a resource
- open a physical lock

The latter must be controlled before execution, but human approval alone may still fail under volume or ambiguity.

## Legibility can become reconnaissance

A good checkout helps defenders answer what an actor can reach. The same compact authority view can also help an attacker identify high-value paths.

The artifact may therefore need an authority boundary of its own: who may inspect the full checkout, which fields are redacted, and what an external participant receives should not be assumed to be universal.

## Multi-agent delegation complicates authority

An agent may ask another agent or tool to act on its behalf. Rights can accidentally expand across these hops, creating confused-deputy problems.

Delegation remains an explicit horizon experiment. APS and OAuth-shaped delegation should be consumed as upstream authority semantics rather than casually reimplemented here.

## Confinement can undermine autonomy

Agents are useful partly because they discover unexpected paths and intermediate needs.

A checkout that is too rigid may turn an agent into a brittle workflow.

Dynamic authority requests are therefore a required later experiment, not optional polish.

## What would falsify the idea?

Authority Checkout would be less useful than hoped if experiments show that:

- existing capability or policy abstractions already express the same thing more clearly
- checkout visualization does not improve developer understanding
- dynamic expansion becomes so frequent that the checkout ceases to be meaningful
- enforcing the checkout requires duplicating all underlying authorization systems
- the metaphor encourages false confidence by hiding important live dependencies
- mixed-trust context can expand authority through indirect runtime paths despite the visible split
- the artifact is produced for compliance but is not actually consumed by humans or runtime systems

Those would be useful findings.
