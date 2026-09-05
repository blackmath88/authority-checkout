/**
 * Session 04 overlay — Microsoft Purview / Agent 365 boundary correction.
 *
 * This does not rewrite the base landscape. It records a new finding that
 * weakens one formulation of the project's legibility/novelty claim.
 */
;(function () {
  var L = window.AUTHORITY_LANDSCAPE
  if (!L) return

  L.nodes.push({
    id: 'c-purview-projection',
    kind: 'contradiction',
    camp: 'industry',
    label: 'Purview already projects policy scope',
    detail: 'Microsoft Purview already exposes a real policy-projection pattern for AI applications: Compute protection scopes tells an application which activities are subject to Purview policy, while Process content evaluates a concrete activity and returns enforcement actions such as block. Agent Framework can also place Purview policy middleware directly in the agent pipeline. This falsifies the broad claim that policy projection into an AI runtime is novel. It does not by itself establish that Microsoft produces one human-inspectable, execution-scoped artifact spanning identity, information policy, delegation and application semantics.',
    status: 'verified · partial contradiction',
    confidence: 'high',
    weight: 21,
    createdAt: '2026-09-05',
    sources: [
      {
        title: 'Microsoft Graph — Purview data security and governance overview',
        url: 'https://learn.microsoft.com/en-us/graph/security-datasecurityandgovernance-overview'
      },
      {
        title: 'Microsoft Purview — secure custom AI apps and agents',
        url: 'https://learn.microsoft.com/en-us/purview/developer/secure-ai-with-purview'
      },
      {
        title: 'Microsoft Agent 365 — Purview guidance',
        url: 'https://learn.microsoft.com/en-us/microsoft-agent-365/guidance/purview-agent-365'
      }
    ]
  })

  L.relations.push(
    { source: 'c-purview-projection', target: 'as-legibility', kind: 'contradicts' }
  )

  L.timeline.push({
    date: '2026-09-05',
    kind: 'contradiction',
    camp: 'industry',
    title: 'Purview removes a novelty claim',
    detail: 'Microsoft already computes protection scopes and performs live content-policy evaluation for AI apps. Authority Checkout must not claim policy projection itself as novel; the remaining hypothesis is whether a composed, execution-scoped artifact improves human reasoning.'
  })
})()
