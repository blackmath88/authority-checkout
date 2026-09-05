;(function () {
  'use strict'

  var DATA = window.BREAK_THE_CHECKOUT
  var STORE_KEY = 'authority-checkout.break-room.v0.1'
  var state = {
    selectedId: DATA.challenges[0].id,
    tab: 'challenge',
    submissions: loadSubmissions(),
    message: null
  }

  function esc (s) {
    return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]
    })
  }

  function selectedChallenge () {
    return DATA.challenges.find(function (c) { return c.id === state.selectedId }) || DATA.challenges[0]
  }

  function loadSubmissions () {
    try { return JSON.parse(localStorage.getItem(STORE_KEY) || '[]') }
    catch (_e) { return [] }
  }

  function saveSubmissions () {
    localStorage.setItem(STORE_KEY, JSON.stringify(state.submissions))
  }

  function uid () {
    return 'proof-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 7)
  }

  function buildContextPackage (challenge) {
    return {
      $type: 'ai.bridgework.authorityCheckout.breakContext',
      schemaVersion: '0.1',
      challenge: {
        id: challenge.id,
        title: challenge.title,
        invariant: challenge.invariant,
        successCriterion: challenge.successCriterion,
        severityIfBroken: challenge.severityIfBroken,
        requiredProof: challenge.requiredProof
      },
      materials: challenge.materials,
      apertureRules: [
        'Do not claim success without a concrete counterexample.',
        'A break must identify declared state, observed state, exact divergence, and reproduction steps.',
        'Do not modify canonical project state. Return only a proof package.',
        'Treat sample fixtures as bounded test material, not as access to a real system.'
      ],
      expectedOutput: {
        $type: 'ai.bridgework.authorityCheckout.breakProof',
        schemaVersion: '0.1',
        challengeId: challenge.id,
        verdict: 'falsified | not_falsified | uncertain',
        participant: { id: 'string', preparedBy: 'string', source: 'external_llm | direct | mcp' },
        requiredFields: challenge.requiredProof
      }
    }
  }

  function structuralChecks (proof, challenge) {
    var checks = []
    checks.push({ ok: proof && proof.$type === 'ai.bridgework.authorityCheckout.breakProof', label: '$type is breakProof' })
    checks.push({ ok: proof && proof.challengeId === challenge.id, label: 'challengeId matches selected challenge' })
    challenge.requiredProof.forEach(function (field) {
      var value = proof ? proof[field] : null
      var present = Array.isArray(value) ? value.length > 0 : !!String(value == null ? '' : value).trim()
      checks.push({ ok: present, label: field })
    })
    checks.push({ ok: !!(proof && proof.participant && proof.participant.id), label: 'participant.id' })
    return checks
  }

  function importProof (raw) {
    var challenge = selectedChallenge()
    var proof
    try { proof = JSON.parse(raw) }
    catch (e) {
      state.message = { kind: 'bad', text: 'Invalid JSON: ' + e.message }
      render()
      return
    }

    var checks = structuralChecks(proof, challenge)
    var complete = checks.every(function (c) { return c.ok })
    var record = {
      id: uid(),
      challengeId: challenge.id,
      status: 'pending',
      structurallyComplete: complete,
      proof: proof,
      checks: checks,
      submittedAt: new Date().toISOString(),
      review: null
    }
    state.submissions.unshift(record)
    saveSubmissions()
    state.message = {
      kind: complete ? 'good' : 'warn',
      text: complete
        ? 'Proof package imported. Structure is complete, but the claim is not verified until a human accepts the evidence.'
        : 'Proof package imported with missing fields. It stays reviewable, but it does not count as a break.'
    }
    state.tab = 'queue'
    render()
  }

  function review (id, decision) {
    var record = state.submissions.find(function (x) { return x.id === id })
    if (!record) return
    record.status = decision
    record.review = {
      reviewedAt: new Date().toISOString(),
      reviewedBy: 'local-human-reviewer',
      note: decision === 'accepted'
        ? 'Accepted locally as evidence for further project review. This does not rewrite canonical research state.'
        : 'Rejected locally. The submission remains preserved in the local queue.'
    }
    saveSubmissions()
    render()
  }

  function clearLocal () {
    if (!confirm('Clear all local proof submissions for this browser? Canonical project files are unaffected.')) return
    state.submissions = []
    saveSubmissions()
    render()
  }

  function challengeCards () {
    return DATA.challenges.map(function (c) {
      return '<button class="challenge' + (c.id === state.selectedId ? ' active' : '') + '" data-challenge="' + c.id + '">' +
        '<div class="id">' + esc(c.id) + '</div>' +
        '<h3>' + esc(c.title) + '</h3>' +
        '<p>' + esc(c.invariant) + '</p>' +
        '<span class="severity ' + esc(c.severityIfBroken) + '">' + esc(c.severityIfBroken) + ' if broken</span>' +
      '</button>'
    }).join('')
  }

  function renderChallenge () {
    var c = selectedChallenge()
    return '<div class="detail">' +
      '<div class="eyebrow">' + esc(c.id) + ' · invariant</div>' +
      '<h3>' + esc(c.title) + '</h3>' +
      '<div class="claim">' + esc(c.invariant) + '</div>' +
      '<div class="block"><div class="label">What counts as a break</div><p>' + esc(c.successCriterion) + '</p></div>' +
      '<div class="block"><div class="label">Suggested roles</div><div class="role-row">' + c.roles.map(function (r) { return '<span class="role">' + esc(r) + '</span>' }).join('') + '</div></div>' +
      '<div class="block"><div class="label">Required proof</div><ul>' + c.requiredProof.map(function (x) { return '<li>' + esc(x) + '</li>' }).join('') + '</ul></div>' +
      '<div class="block"><div class="label">Bounded fixture</div><pre class="code">' + esc(JSON.stringify(c.materials, null, 2)) + '</pre></div>' +
      '<div class="block"><div class="label">Important boundary</div><p>This is an intellectual adversarial harness. The fixture is deliberately bounded. You are trying to falsify an architectural claim, not attack a real system.</p></div>' +
    '</div>'
  }

  function renderAperture () {
    var c = selectedChallenge()
    var context = buildContextPackage(c)
    return '<div class="aperture">' +
      '<div class="notice">Borrowed from br-ai-nstorm: export a bounded context package into any LLM, think privately, and return only a bounded proof package. AI output is a proposal, never canonical truth.</div>' +
      '<div><div class="label">Context package</div><pre class="code" id="context-json">' + esc(JSON.stringify(context, null, 2)) + '</pre></div>' +
      '<div class="actions"><button class="button primary" id="copy-context">Copy context package</button><button class="button" id="load-sample">Load sample proof</button></div>' +
      '<div><div class="label">Paste proof package</div><textarea id="proof-input" spellcheck="false" placeholder="Paste ai.bridgework.authorityCheckout.breakProof JSON here"></textarea></div>' +
      '<button class="button primary" id="import-proof">Import for review</button>' +
    '</div>'
  }

  function renderQueue () {
    var filtered = state.submissions.filter(function (s) { return s.challengeId === state.selectedId })
    if (!filtered.length) return '<div class="empty">No proof submissions for this challenge in this browser yet.</div>'
    return '<div class="queue">' + filtered.map(function (s) {
      var p = s.proof || {}
      var checks = s.checks.map(function (c) {
        return '<div class="proof-check ' + (c.ok ? 'ok' : 'missing') + '">' + esc(c.label) + '</div>'
      }).join('')
      var summary = p.exact_divergence || p.note || p.claim_attacked || 'No summary supplied.'
      return '<article class="submission">' +
        '<div class="submission-top"><div><div class="eyebrow">' + esc(s.id) + '</div><h4>' + esc((p.participant && p.participant.id) || 'unknown participant') + '</h4></div><span class="status ' + esc(s.status) + '">' + esc(s.status) + '</span></div>' +
        '<p>' + esc(summary) + '</p>' +
        '<div class="proof-checks">' + checks + '</div>' +
        '<div class="actions">' +
          '<button class="button small" data-inspect="' + s.id + '">Inspect JSON</button>' +
          (s.status === 'pending' ? '<button class="button small primary" data-review="accepted" data-id="' + s.id + '">Accept evidence</button><button class="button small danger" data-review="rejected" data-id="' + s.id + '">Reject</button>' : '') +
        '</div>' +
        (s.review ? '<div class="footer-note">' + esc(s.review.note) + ' · ' + esc(s.review.reviewedAt) + '</div>' : '') +
      '</article>'
    }).join('') + '</div>'
  }

  function renderInspect (record) {
    return '<div class="detail"><div class="eyebrow">Proof package</div><h3>' + esc(record.id) + '</h3><pre class="code">' + esc(JSON.stringify(record.proof, null, 2)) + '</pre><div class="footer-note">Imported ' + esc(record.submittedAt) + '. Local review status: ' + esc(record.status) + '.</div></div>'
  }

  function render () {
    var c = selectedChallenge()
    var activeInspect = state.inspectId && state.submissions.find(function (s) { return s.id === state.inspectId })
    var mainBody = activeInspect ? renderInspect(activeInspect) : state.tab === 'challenge' ? renderChallenge() : state.tab === 'aperture' ? renderAperture() : renderQueue()

    document.getElementById('root').innerHTML =
      '<header class="top"><div class="wrap"><div class="topline"><div><div class="eyebrow">Prototype 03 · adversarial proof room</div><h1>' + esc(DATA.meta.title) + '</h1><p class="lede">' + esc(DATA.meta.subtitle) + ' Inspired by br-ai-nstorm, adapted for falsification rather than collective ideation.</p><div class="rule">' + esc(DATA.meta.rule) + '</div></div><a class="back" href="../../index.html">← Research index</a></div>' +
      '<div class="toolbar"><button class="tab' + (state.tab === 'challenge' && !activeInspect ? ' active' : '') + '" data-tab="challenge">Challenge</button><button class="tab' + (state.tab === 'aperture' && !activeInspect ? ' active' : '') + '" data-tab="aperture">LLM aperture</button><button class="tab' + (state.tab === 'queue' && !activeInspect ? ' active' : '') + '" data-tab="queue">Review queue · ' + state.submissions.filter(function (s) { return s.challengeId === c.id }).length + '</button></div></div></header>' +
      '<main class="wrap"><div class="layout">' +
        '<section class="panel"><div class="panel-head"><h2>Claims to attack</h2><span class="badge">bounded fixtures</span></div><div class="panel-body"><div class="challenge-grid">' + challengeCards() + '</div></div></section>' +
        '<aside class="panel"><div class="panel-head"><h2>Room state</h2><span class="badge">local only</span></div><div class="panel-body"><div class="notice">Submissions and review decisions live only in this browser via localStorage. They never mutate Authority Checkout, the Research Board, or br-ai-nstorm.</div>' +
        (state.message ? '<div class="notice ' + state.message.kind + '" style="margin-top:10px">' + esc(state.message.text) + '</div>' : '') +
        '<div class="block"><div class="label">Participation model</div><p>Export context → independent LLM or person → bounded proof package → local review. Accepted evidence still requires an explicit human step before it can become a research-board overlay or project change.</p></div>' +
        '<div class="actions"><button class="button small" id="clear-local">Clear local queue</button><a class="button small" href="../02-research-board/index.html">Open research board</a></div></div></aside>' +
        '<section class="panel" style="grid-column:1/-1"><div class="panel-head"><h2>' + esc(activeInspect ? 'Proof inspection' : state.tab === 'challenge' ? 'Selected challenge' : state.tab === 'aperture' ? 'External LLM aperture' : 'Human review queue') + '</h2><span class="badge">' + esc(c.id) + '</span></div><div class="panel-body">' + mainBody + '</div></section>' +
      '</div><div class="footer-note">No infrastructure sandbox is provided. The prototype is a falsification harness over bounded fixtures and architectural claims. A structurally valid JSON package is not itself proof that the claim is false.</div></main>'
  }

  document.addEventListener('click', function (e) {
    var challenge = e.target.closest('[data-challenge]')
    if (challenge) { state.selectedId = challenge.getAttribute('data-challenge'); state.inspectId = null; state.message = null; render(); return }

    var tab = e.target.closest('[data-tab]')
    if (tab) { state.tab = tab.getAttribute('data-tab'); state.inspectId = null; state.message = null; render(); return }

    if (e.target.closest('#copy-context')) {
      var text = JSON.stringify(buildContextPackage(selectedChallenge()), null, 2)
      if (!navigator.clipboard || !navigator.clipboard.writeText) {
        state.message = { kind: 'warn', text: 'Clipboard API unavailable. Copy the context JSON manually.' }
        render()
        return
      }
      navigator.clipboard.writeText(text).then(function () {
        state.message = { kind: 'good', text: 'Context package copied.' }; render()
      }).catch(function () {
        state.message = { kind: 'warn', text: 'Clipboard API unavailable. Copy the context JSON manually.' }; render()
      })
      return
    }

    if (e.target.closest('#load-sample')) {
      var input = document.getElementById('proof-input')
      if (input) input.value = JSON.stringify(Object.assign({}, DATA.sampleProof, { challengeId: selectedChallenge().id }), null, 2)
      return
    }

    if (e.target.closest('#import-proof')) {
      var raw = (document.getElementById('proof-input') || {}).value || ''
      importProof(raw)
      return
    }

    var reviewBtn = e.target.closest('[data-review]')
    if (reviewBtn) { review(reviewBtn.getAttribute('data-id'), reviewBtn.getAttribute('data-review')); return }

    var inspect = e.target.closest('[data-inspect]')
    if (inspect) { state.inspectId = inspect.getAttribute('data-inspect'); render(); return }

    if (e.target.closest('#clear-local')) clearLocal()
  })

  render()
})()
