# Prototype 02 — Authority Research Board

A working board for the agent-authority landscape: which camp is building what,
what the evidence says, and where this project actually differs.

Open `index.html`. No build step, no server, no dependencies to install.

## Where this came from

The interaction model is borrowed from **br-ai-nstorm**, a sibling prototype for
AI-mediated collective problem solving. One rule carries over unchanged:

> The semantic state is canonical. The map and the timeline are derived views
> and can never write.

That rule exists in br-ai-nstorm to stop a force-directed graph from quietly
becoming the system's ontology. The same risk applies here: it would be easy to
start believing the picture instead of the argument. Position on the map carries
no meaning.

What br-ai-nstorm does **not** have, and what this board adds, is the **camp**
dimension — which community a position comes from. Without it the landscape
renders as one undifferentiated cloud and the whole point is lost.

## What was deliberately left out

br-ai-nstorm v0.3 has an event-sourced backend, MCP transports, a contribution
aperture, a curation queue and multiple participants. None of that is here.

This is a **single-author reading surface**, not a shared room. It has no write
path by design. If it starts wanting one, that is scope creep back toward
br-ai-nstorm proper — build there instead.

It is also not the falsifiable experiment. Executable prototypes 01/01.1, 04 and
05 carry the architecture claims; Prototype 03 is the adversarial proof room.
This board only keeps track of where the project sits and what remains weak.

## Files

```text
index.html                          entry point; registers scripts in order
board.css                           visual language carried from br-ai-nstorm
board.js                            rendering only; never writes
data/landscape.js                   canonical state — the base writable truth
data/landscape-session-04.js        Purview / Agent 365 correction overlay
data/landscape-session-05.js        split-projection / trust-boundary overlay
data/landscape-session-EXAMPLE.js   overlay template
```

`landscape.js` is loaded as a plain script rather than fetched as JSON, so the
board works from `file://` with no server — the same choice `docs/journey/entries.js`
makes.

## The vocabulary

Every node has a `kind` and a `camp`.

| kind | means |
|---|---|
| `problem` | the root question the board is organised around |
| `question` | open, undecided |
| `approach` | something a camp is building or proposing |
| `evidence` | something that happened or was measured |
| `assumption` | held but not verified |
| `contradiction` | a tension between positions |
| `synthesis` | where it currently lands |

| camp | means |
|---|---|
| `incident` | what actually happened |
| `research` | academic and lab work |
| `industry` | vendors and security operations |
| `standards` | protocols and identity specs |
| `regulator` | frameworks, auditors, law |
| `this-project` | Authority Checkout itself |

Relations are `supports`, `contradicts`, `opens`, `relates`.

## Updating it

Do not edit `landscape.js` for new findings. Add an overlay:

1. Copy `data/landscape-session-EXAMPLE.js` to `data/landscape-session-NN.js`.
2. Push new nodes, relations and timeline entries.
3. Register it in `index.html` after `landscape.js`, before `board.js`.

Overlays append so the research history accumulates rather than being rewritten,
matching how `docs/journey/` is structured. When a position changes, use
`setStatus` rather than deleting the node — deleting loses the record of having
believed it.

Every node that makes a factual claim should carry a `sources` array. Vendor
figures should say so in `status` or `confidence`.

## Honesty rules for content

- A critique from another LLM is an **input**, not a fact.
- Quantitative and publication-facing claims get verified against primary
  sources before their `confidence` rises above `medium`.
- Findings that weaken this project are valid entries and stay on the board.
- Project-derived architecture nodes do not become external novelty claims just
  because they are represented on the board.

The current project-facing tensions include:

- `c-aps-overlap` — the Agent Passport System draft may already formalize
  monotonic authority narrowing, including a reversibility dimension that
  overlaps the projection/effect-gate split.
- `c-purview-projection` — Microsoft Purview already computes protection scopes
  and performs live content-policy evaluation for AI applications. Policy
  projection itself is not a novelty claim available to this project.
- `as-legibility` — the narrower claim that no existing system produces one
  human-inspectable, execution-scoped artifact spanning the effective authority
  picture is still unverified.
- `as-reasoning` — the claim that materialization helps developer reasoning is
  the project's kill criterion and is still untested.
- `c-projection-trust-collapse` — a single artifact can still be unsafe if it
  flattens authoritative state and hostile-influenced context into one trust
  domain.
- `as-context-cannot-expand` — Prototype 05 enforces the rule locally, but the
  invariant remains adversarially untested across alternative runtime assembly
  paths.

The Purview correction remains a **partial contradiction** rather than a quiet
resolution of `as-legibility`: Microsoft documentation verifies policy projection
for one control-plane dimension; it does not by itself establish an equivalent
composed authority artifact across identity, information policy, delegation and
application semantics.

The split-projection overlay also stays modest: it records a project invariant
and its failure mode. It does **not** claim that trusted/untrusted separation is
novel; CaMeL and broader information-flow / capability work are explicit nearby
prior art.

## Current state

- 48 nodes
- 50 relations
- 19 timeline entries
- 6 camps

The D3 map is optional. Offline, it degrades to a note while the canonical state
view and timeline remain complete.
