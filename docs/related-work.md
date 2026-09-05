# Related Work Map

Authority Checkout intentionally sits on top of ideas that already exist. The project should avoid novelty claims that collapse under basic comparison.

## Delta-style checkout architecture

The strongest conceptual inspiration is the separation between **authoritative state** and the **materialized working representation** used by an agent or thread.

Authority Checkout generalizes that architectural inversion from software worktrees to agent context and effective authority.

The analogy has limits: enterprise reality is live, distributed and often effectful rather than mergeable.

## IAM and agent identity governance

Identity systems answer important questions such as:

- Who or what is acting?
- Who owns or sponsors it?
- Which roles and entitlements does it have?
- What is its lifecycle?

Authority Checkout assumes those identity signals can be inputs, but asks a different runtime question:

> What state and capability should this actor have for this specific task right now?

It should complement IAM rather than replace it.

## Capability security / least privilege

The project inherits the principle that authority should be explicit and narrow rather than ambient.

An Authority Checkout can be viewed partly as a developer-facing materialization of effective capabilities plus the state those capabilities apply to.

## Sandboxes and ephemeral agents

Agent sandboxes already isolate tools, files, credentials and execution environments.

Authority Checkout does not compete with sandboxing. A real implementation would likely use sandboxing as one enforcement mechanism underneath the abstraction.

## Information-flow control

Prompt injection and tool-mediated exfiltration often depend on where data came from and where it is allowed to flow.

Simple role-based permission checks are insufficient for this.

Provenance and information flow may eventually become first-class checkout dimensions.

## Externalized memory

The project's memory position is architectural:

> persistent memory is system state that can be projected into an agent runtime.

This makes memory subject to the same scoping, provenance and governance questions as other resources.

## Task-specific policy and mediated tool use

Modern agent-security work increasingly evaluates proposed tool calls against deterministic policy derived from trusted task context.

Authority Checkout should be compared directly against these systems. The potential contribution is not the enforcement primitive itself, but whether one coherent materialized representation of state + authority improves inspection, debugging, testing and governance.

## Working novelty claim

The project currently claims only this:

> Authority Checkout is an exploratory systems abstraction for treating an agent's runtime world as a task-scoped materialization of state and authority, with explicit boundaries for expansion and consequential effects.

This claim should become narrower if experiments or related work show that it is already fully captured elsewhere.
