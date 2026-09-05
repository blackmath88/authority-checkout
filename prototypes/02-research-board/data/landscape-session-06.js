/**
 * Session 06 overlay — approval-fatigue / effect-gate assumption.
 *
 * Project-derived findings. This does not claim a universal fatigue threshold;
 * it records the control assumption Prototype 06 is designed to test.
 */
;(function () {
  var L = window.AUTHORITY_LANDSCAPE
  if (!L) return

  L.nodes.push(
    {
      id: 'as-human-gate-reliable',
      kind: 'assumption',
      camp: 'this-project',
      label: 'Human approval remains meaningful under load',
      detail: 'The effect-gate design assumes a reviewer can reliably distinguish routine from prohibited consequential actions even after repeated similar approval requests. Prototype 06 makes this assumption measurable rather than treating REQUIRE_APPROVAL as automatically safe.',
      status: 'untested · prototype 06',
      confidence: 'low',
      weight: 23,
      createdAt: '2026-09-05'
    },
    {
      id: 'c-approval-fatigue',
      kind: 'contradiction',
      camp: 'this-project',
      label: 'Approval can degrade into ceremony',
      detail: 'A live human gate is not equivalent to deterministic policy. Repetition, ambiguity and habituation can turn an explicit approval step into a rubber stamp, leaving the control present in architecture diagrams but weak in operation.',
      status: 'known challenge · local experiment pending evidence',
      confidence: 'medium',
      weight: 22,
      createdAt: '2026-09-05'
    },
    {
      id: 'a-policy-before-approval',
      kind: 'approach',
      camp: 'this-project',
      label: 'Determinize before escalating to humans',
      detail: 'Prototype 06 tests a design direction: actions that policy can decide should be allowed or denied deterministically; human review should be reserved for genuine ambiguity rather than compensating for missing policy.',
      status: 'design hypothesis',
      confidence: 'medium',
      weight: 20,
      createdAt: '2026-09-05'
    }
  )

  L.relations.push(
    { source: 'c-approval-fatigue', target: 'as-human-gate-reliable', kind: 'contradicts' },
    { source: 'a-policy-before-approval', target: 'c-approval-fatigue', kind: 'relates' },
    { source: 'a-policy-before-approval', target: 'a-preexec', kind: 'relates' }
  )

  L.timeline.push({
    date: '2026-09-05',
    kind: 'assumption',
    camp: 'this-project',
    title: 'The human effect gate becomes an experiment',
    detail: 'Prototype 06 tests whether repeated approval requests degrade reviewer decision quality. Break the Checkout gains AC-07: exhaust the reviewer.'
  })
})()
