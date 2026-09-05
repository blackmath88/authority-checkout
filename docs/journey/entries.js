window.AUTHORITY_CHECKOUT_JOURNEY = [
  {
    id: "001",
    date: "2026-09-05",
    stage: "origin",
    title: "The useful idea was not agent memory. It was separation from authoritative state.",
    assumption: "Agent memory looked like the interesting architectural problem on its own.",
    challenge: "The deeper pattern was that the representation an agent works against does not need to be the source of truth. Delta-style checkouts made that separation concrete.",
    learning: "Memory is one state domain among several. The more general question is what state, tools and authority are materialized for an agent at runtime.",
    changed: "The project moved from externalized memory toward task-scoped agent authority.",
    open: "How far can the checkout analogy be generalized before it becomes misleading?",
    tags: ["delta", "memory", "state"]
  },
  {
    id: "002",
    date: "2026-09-05",
    stage: "reframe",
    title: "A checkout is not a frozen copy of reality.",
    assumption: "The agent could operate on a virtualized checkout of its complete perceived environment.",
    challenge: "Real agent environments are live: email arrives, permissions change, APIs mutate state and other actors work concurrently. External reality cannot be cleanly snapshotted like a source tree.",
    learning: "\"Reality checkout\" is a metaphor, not a literal implementation. The useful object is narrower: a materialized authority envelope for the current task.",
    changed: "The working term became Authority Checkout rather than claiming complete reality virtualization.",
    open: "Which pieces should be snapshotted, referenced live, or revalidated on every action?",
    tags: ["checkout", "staleness", "scope"]
  },
  {
    id: "003",
    date: "2026-09-05",
    stage: "architecture",
    title: "Not every agent action is a reviewable delta.",
    assumption: "Agents could propose changes which are later reviewed and committed, analogous to source-control diffs.",
    challenge: "Many actions are effects, not state diffs: sending email, transferring money, publishing, deleting or unlocking something may be irreversible once executed.",
    learning: "State changes and effectful actions need different control paths. Candidate state can sometimes be reviewed later; consequential effects must often be authorized before execution.",
    changed: "The model now separates proposed state changes from effectful actions and keeps a live authorization boundary.",
    open: "What effect taxonomy is useful without turning the prototype into a policy engine?",
    tags: ["effects", "commit-boundary", "authorization"]
  },
  {
    id: "004",
    date: "2026-09-05",
    stage: "security",
    title: "Least privilege is not just a policy file. Discovering it is part of the problem.",
    assumption: "Given an actor and a task, the system could generate the minimum checkout the agent needs.",
    challenge: "Autonomous agents are useful precisely because their path is not fully known in advance. Too little authority breaks the task; too much authority removes the security benefit.",
    learning: "A checkout may need to expand during execution. Expansion itself must become an explicit, inspectable event rather than ambient privilege growth.",
    changed: "Dynamic authority expansion became a future experiment instead of assuming perfect precomputed least privilege.",
    open: "Can an agent request more authority without letting malicious context manufacture convincing escalation requests?",
    tags: ["least-privilege", "expansion", "autonomy"]
  },
  {
    id: "005",
    date: "2026-09-05",
    stage: "security",
    title: "Context isolation is weaker than runtime isolation.",
    assumption: "If sensitive information or a capability is absent from the model context, the agent effectively cannot use it.",
    challenge: "The runtime may still hold broad credentials, generic database access, authenticated browser state or overly powerful tools. Hidden from the LLM does not mean unreachable by the system.",
    learning: "The security boundary has to live outside the model and be enforced at the resource or tool boundary. Context projection is useful, but it is not authorization.",
    changed: "The project explicitly distinguishes model-visible state from effective runtime authority.",
    open: "How small can a demonstrator be while still enforcing this distinction for real?",
    tags: ["context", "runtime", "credentials"]
  },
  {
    id: "006",
    date: "2026-09-05",
    stage: "security",
    title: "The checkout can contain the attack.",
    assumption: "A carefully curated checkout would give the model a trustworthy task environment.",
    challenge: "Authorized documents, memory and tool outputs can themselves contain malicious instructions. Projection limits blast radius but does not make projected content trustworthy.",
    learning: "Prompt injection and provenance remain separate problems. A checkout can constrain consequences even when the model reasoning is compromised, but it does not prevent compromise.",
    changed: "The project stopped presenting checkout isolation as a prompt-injection solution.",
    open: "Should provenance be a first-class property of every projected item?",
    tags: ["prompt-injection", "provenance", "blast-radius"]
  },
  {
    id: "007",
    date: "2026-09-05",
    stage: "positioning",
    title: "The ingredients already exist. The test is whether the abstraction adds value.",
    assumption: "The project might be introducing a new security primitive for agents.",
    challenge: "Least privilege, capability systems, sandboxing, information-flow controls, task-specific policy and externalized memory already exist in adjacent work.",
    learning: "Novelty cannot be the claim. The defensible hypothesis is that a materialized authority checkout may make runtime authority easier to inspect, version, explain and test.",
    changed: "The repo became a research prototype and notebook rather than a product claim.",
    open: "At what point does the checkout metaphor become only a UI over existing security mechanisms?",
    tags: ["related-work", "novelty", "research-question"]
  },
  {
    id: "008",
    date: "2026-09-05",
    stage: "direction",
    title: "A successful break should advance the project.",
    assumption: "Progress would mean adding more controls until the prototype looked secure.",
    challenge: "That risks building a brittle demo that only survives scenarios we invented ourselves.",
    learning: "A better long-term model is adversarial evolution: publish assumptions and challenge scenarios, accept reproducible breaks, then turn them into design constraints and regression cases.",
    changed: "A future open challenge mode is now part of the horizon, but not the current build scope.",
    open: "How should a community challenge distinguish a model failure, a policy failure and a failure of the checkout abstraction itself?",
    tags: ["red-team", "community", "regression"]
  }
];
