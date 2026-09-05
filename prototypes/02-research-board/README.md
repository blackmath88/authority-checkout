# Prototype 02 — Authority Research Board

A working board for the agent-authority landscape: which camp is building what,
what the evidence says, and where this project actually differs.

Open `index.html`. No build step, no server, no dependencies to install.

## Where this came from

The interaction model is borrowed from **br-ai-nstorm**, a sibling prototype for
AI-mediated collective problem solving. One rule carries over unchanged:

> The semantic state is canonical. The map and the timeline are derived views
> and can never write.

This is a **single-author reading surface**, not a shared room. It has no write
path by design. Executable prototypes carry the architecture claims; Prototype 03
is the adversarial proof room. This board only keeps track of where the project
sits and what remains weak.

## Files

```text
index.html                          entry point; registers scripts in order
board.css                           visual language carried from br-ai-nstorm
board.js                            rendering only; never writes
data/landscape.js                   canonical base state
data/landscape-session-04.js        Purview / Agent 365 correction overlay
data/landscape-session-05.js        split-projection / trust-boundary overlay
data/landscape-session-06.js        approval-fatigue / effect-gate overlay
data/landscape-session-EXAMPLE.js   overlay template
```

Overlays append so the research history accumulates rather than being rewritten.
A critique from another LLM is an input, not a fact. Findings that weaken this
project stay visible.

## Current project-facing tensions

- `c-aps-overlap` — APS may already formalize part of the projection/effect-gate split.
- `c-purview-projection` — policy projection itself is shipped prior art.
- `as-legibility` — the narrower composed, human-inspectable execution artifact claim is still unverified.
- `as-reasoning` — whether the checkout actually improves reasoning remains the kill criterion.
- `c-projection-trust-collapse` — one artifact can still flatten authoritative and hostile-influenced inputs unsafely.
- `as-context-cannot-expand` — Prototype 05 enforces SP-01 locally but it remains adversarially untested.
- `as-human-gate-reliable` — Prototype 06 now tests whether human approval remains meaningful under repetitive load.
- `c-approval-fatigue` — an approval step can remain present in architecture while degrading into a rubber stamp operationally.

`a-policy-before-approval` records the current design hypothesis: decisions that
policy can settle should be settled deterministically; human review should be
reserved for genuine ambiguity.

## Current state

- 51 nodes
- 53 relations
- 20 timeline entries
- 6 camps

The D3 map is optional. Offline, State and Timeline remain complete.
