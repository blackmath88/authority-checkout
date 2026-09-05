# Architectural Lineage

Authority Checkout did not start as an attempt to invent an agent-security system.

It emerged from one repeated architectural move:

> **The representation an actor works against does not need to be canonical state.**

The project applies that move to authority.

## 1. Memory as system state

The first version of the idea came from thinking about agent memory.

The important shift was away from:

```text
agent
├── memory
├── tools
├── skills
└── prompt
```

and toward:

```text
canonical system state
        ↓
projection
        ↓
execution
```

Memory becomes one domain of application state with provenance, temporal state, supersession and governed write-back.

The question changed from:

> How should an agent remember?

into:

> What state should this execution receive, and who owns the authoritative version?

## 2. Delta / DeltaDB

Delta provided the load-bearing analogy.

The filesystem remains the interface used by tools and agents, but it is no longer necessarily the deepest source of truth. A worktree can be materialized from a deeper canonical representation.

The transferable lesson is not "copy the filesystem architecture".

It is:

> **A familiar runtime representation can be demoted from source of truth to materialized view.**

## 3. From memory projection to authority projection

If memory can be projected into an execution rather than owned by the agent, the same question can be asked of authority.

Instead of treating an agent as an entity that intrinsically owns memory, skills, tools and permissions, treat it as an LLM-powered software module receiving explicit runtime inputs.

A rough analogy:

```text
implicit / ambient module

agent()
  magically sees database
  magically sees memory
  magically sees credentials
  magically sees tools
```

versus:

```text
explicit execution

agent({
  task,
  stateProjection,
  memoryProjection,
  capabilities,
  provenance
})
```

The project calls the resulting inspectable authority representation an **Authority Checkout**.

## 4. Sandbox and checkout are different layers

Authority Checkout is not a substitute for sandboxing.

```text
Isolation
  answers: where may this code run?
  mechanisms: OS / kernel / hypervisor / network / container

Authority Checkout
  answers: what state and capability was this execution handed?
  mechanisms: application policy / scoped credentials / capability binding / projection
```

A useful shorthand:

> **Sandbox is how the execution is contained. Checkout is what it was handed.**

If the enforcement layer is compromised, the checkout is not assumed to remain authoritative.

## 5. Projection and effects are different

The original model incorrectly treated all agent actions like reviewable source-control deltas.

That works for some state changes:

- draft creation
- document edits
- proposed record updates

It does not work for irreversible or externally effectful actions:

- send
- publish
- purchase
- transfer
- delete

The current model therefore separates:

### Projection

Checkout-like:

- inspectable
- diffable
- versionable
- revocable
- task-scoped

### Effect gate

Live:

- authorized at execution time
- not assumed reversible
- not treated as a merge operation

## 6. Pause authority

Monitoring does not itself stop an autonomous process.

The architecture therefore asks a separate control question:

> **Who has authority to halt, suspend, revoke or restart this execution?**

This remains an open research concept in the project rather than a claimed new security primitive.

## 7. Current research claim: legibility

External enforcement, least privilege, capability systems, sandboxing and policy engines are established prior art.

Authority Checkout does not claim stronger enforcement.

The current falsifiable question is:

> **Can developers reason about an agent's effective authority more reliably when that authority is materialized as an inspectable, diffable object?**

The project's kill criterion remains deliberately harsh:

> If a checkout tells a developer nothing useful beyond reading the policy and entitlement configuration directly, the project should be narrowed or stopped.

## 8. A possible larger architecture

Memory projection and authority projection may eventually turn out to be two slices of a common runtime-projection architecture:

```text
canonical substrate
  state
  memory
  identity
  policy
  capabilities
  relationships
  provenance
        ↓
materialized runtime projection
        ↓
actor / execution
        ↓
observations, requests, proposals
        ↓
governed write-back / live effects
```

This is currently a hypothesis, not a separate project or product.

## 9. AT Protocol horizon hypothesis

AT Protocol introduces another architectural separation that may become relevant later:

- stable decentralized identity via DID
- hosting/service location separated from identity
- signed, verifiable repositories of records
- account/data portability between hosts

Authority Checkout should **not** adopt ATProto in the first prototype.

A future research question is whether checkout artifacts, delegation records, authority grants or audit traces benefit from an identity/state model where the actor identifier is stable and the records are independently attributable and portable.

ATProto would not supply authorization enforcement. Its possible relevance is identity, ownership, provenance and portable signed records.
