# Design Principles

## 1. The agent-visible world is not the canonical world

The agent should operate on a purpose-built representation of the state relevant to its current task. That representation may omit data, memory, tools and capabilities that exist elsewhere in the system.

This is an architectural boundary, not a claim that external reality can be perfectly snapshotted.

## 2. Persistent state belongs to the system

Memory should be treated as system state that can be projected into a checkout, not as an opaque database intrinsically owned by an agent.

This allows memory to be scoped, attributed, inspected, versioned and withheld independently of the model.

## 3. Context minimization is not authorization

Not showing a resource to the model does not prove the runtime cannot reach it.

A secure implementation must separately control:

- model-visible context
- runtime credentials
- tool availability
- resource-side authorization
- effect execution

## 4. No ambient authority

The host application's maximum authority should not automatically become the agent's effective authority.

The checkout should make effective authority explicit.

## 5. Authority is task-scoped

Identity and role are necessary but insufficient.

Effective authority should also be shaped by the current task, target resources, delegation, policy, time and other runtime constraints.

## 6. Authority may grow, but only across a boundary

Autonomous work often requires discovering that additional information or capability is needed.

The agent may request expansion, but it should not silently expand its own authority.

A later experiment will model this as a checkout revision.

## 7. Consequential effects are authorized live

A checkout can become stale. Irreversible actions also cannot safely be treated as ordinary state diffs.

Actions such as sending, publishing, purchasing, deleting or transferring should be re-evaluated at execution time.

## 8. Attempt and effect are separate facts

A compromised or confused model may propose an unsafe action. That is not the same as the system executing it.

The prototype should preserve:

```text
model attempt
!=
available capability
!=
authorized effect
!=
executed effect
```

## 9. Provenance matters

Projected data and tools are not automatically trustworthy simply because they are allowed into the checkout.

Where possible, the system should retain where resources, instructions, memory and tool definitions came from.

## 10. The abstraction must be falsifiable

The project is not committed to proving Authority Checkout correct.

Every experiment should ask:

- Did the abstraction make authority easier to understand?
- Did it actually constrain anything?
- What remained reachable outside the checkout?
- What legitimate work became harder?
- Is another existing abstraction clearer?

If the checkout metaphor stops adding value, document that rather than forcing the model to survive.
