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

## Tool trust is separate

A tool may be malicious, misleading, over-privileged or incorrectly described.

Restricting which tools are exposed helps only if the exposed tools and their runtime credentials are themselves governed.

## Hidden from context does not mean unreachable

A model might not see salary data while a generic SQL tool or inherited credential can still retrieve it.

Any serious implementation must enforce restrictions outside the LLM context.

## Stale authority is dangerous

Permissions, policies and resource state can change after checkout creation.

Consequential actions therefore need live authorization rather than relying solely on checkout-time decisions.

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

The latter must be controlled before execution.

## Multi-agent delegation complicates authority

An agent may ask another agent or tool to act on its behalf. Rights can accidentally expand across these hops, creating confused-deputy problems.

Delegation is intentionally deferred to a later experiment.

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

Those would be useful findings.
