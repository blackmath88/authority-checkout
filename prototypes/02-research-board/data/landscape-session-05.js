/**
 * Session 05 overlay — split projection / trust-boundary turn.
 *
 * Project-derived findings only. This overlay does not claim the split itself is
 * novel; it records the new invariant created by Prototype 05 and the specific
 * failure mode the prototype is designed to expose.
 */
;(function () {
  var L = window.AUTHORITY_LANDSCAPE
  if (!L) return

  L.nodes.push(
    {
      id: 'c-projection-trust-collapse',
      kind: 'contradiction',
      camp: 'this-project',
      label: 'A legible checkout can still flatten trust',
      detail: 'Single-artifact dual consumption is not enough if the artifact erases which fields came from authoritative control planes and which came from task text, retrieval, memory or tool output. A checkout can be internally consistent and still make an unsafe authority derivation look legitimate.',
      status: 'open tension',
      confidence: 'high',
      weight: 20,
      createdAt: '2026-09-05'
    },
    {
      id: 'a-split-projection',
      kind: 'approach',
      camp: 'this-project',
      label: 'Split authority from mixed-trust context',
      detail: 'Prototype 05 keeps authorityProjection and contextProjection inside one checkout while preserving their different trust provenance. Identity, policy, delegation and approved grants may define authority; task interpretation, memory, retrieval, tool output and external content may influence reasoning but do not mint capabilities.',
      status: 'prototype 05 implemented',
      confidence: 'medium-high',
      weight: 23,
      createdAt: '2026-09-05'
    },
    {
      id: 'as-context-cannot-expand',
      kind: 'assumption',
      camp: 'this-project',
      label: 'Mixed-trust context cannot expand authority',
      detail: 'Invariant SP-01: hostile-influenced context may narrow, annotate or shape reasoning, but it may never expand effective authority. The local prototype enforces this by construction, but the claim remains adversarially untested across alternative runtime assembly paths.',
      status: 'implemented · adversarially untested',
      confidence: 'medium',
      weight: 22,
      createdAt: '2026-09-05'
    }
  )

  L.relations.push(
    { source: 'a-split-projection', target: 'c-projection-trust-collapse', kind: 'relates' },
    { source: 'a-split-projection', target: 'a-camel', kind: 'relates' },
    { source: 'as-context-cannot-expand', target: 'a-split-projection', kind: 'supports' }
  )

  L.timeline.push({
    date: '2026-09-05',
    kind: 'approach',
    camp: 'this-project',
    title: 'Projection gets a trust boundary',
    detail: 'Prototype 05 separates authoritative inputs from mixed-trust reasoning context inside one checkout. Break the Checkout gains AC-06: cause hostile context to mint authority.'
  })
})()
