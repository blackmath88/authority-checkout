/**
 * Authority Research Board — rendering.
 *
 * The rule carried over from br-ai-nstorm: canonical state is the semantic
 * structure in data/landscape.js. State, Map and Timeline are folds over it.
 * Nothing here writes. Position on the map carries no meaning.
 *
 * No build step, no framework. D3 is optional — if it fails to load the map
 * degrades to a note and the other two views keep working.
 */
;(function () {
  'use strict'

  var DATA = window.AUTHORITY_LANDSCAPE
  if (!DATA) {
    document.getElementById('root').innerHTML =
      '<p class="map-fallback">data/landscape.js did not load.</p>'
    return
  }

  /* Overlay files (landscape-session-NN.js) append here before this runs. */
  var NODES = DATA.nodes.slice()
  var RELATIONS = DATA.relations.slice()
  var TIMELINE = DATA.timeline.slice().sort(function (a, b) {
    return a.date < b.date ? -1 : 1
  })
  var CAMPS = DATA.camps
  var CAMP_BY_ID = {}
  CAMPS.forEach(function (c) { CAMP_BY_ID[c.id] = c })
  var NODE_BY_ID = {}
  NODES.forEach(function (n) { NODE_BY_ID[n.id] = n })

  /* Section order for the state view. Root problem is rendered in the header. */
  var SECTIONS = [
    { kind: 'approach', title: 'Approaches', hint: 'What the different camps are building.' },
    { kind: 'evidence', title: 'Evidence', hint: 'What actually happened or was measured.' },
    { kind: 'contradiction', title: 'Tensions', hint: 'Where the positions disagree.' },
    { kind: 'assumption', title: 'Assumptions', hint: 'Held but not yet verified.' },
    { kind: 'question', title: 'Open questions', hint: 'Undecided.' },
    { kind: 'synthesis', title: 'Synthesis', hint: 'Where it currently lands.' }
  ]

  var state = {
    view: 'state',
    selectedId: null,
    activeCamps: CAMPS.reduce(function (acc, c) { acc[c.id] = true; return acc }, {})
  }

  function esc (s) {
    return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]
    })
  }

  function campActive (campId) { return !!state.activeCamps[campId] }
  function visibleNodes () { return NODES.filter(function (n) { return campActive(n.camp) }) }

  function campColor (campId) {
    var c = CAMP_BY_ID[campId]
    return c ? c.color : '#cdd5d3'
  }

  function renderHeader () {
    var vis = visibleNodes()
    var counts = {}
    vis.forEach(function (n) { counts[n.kind] = (counts[n.kind] || 0) + 1 })
    var summary = [
      (counts.approach || 0) + ' approaches',
      (counts.contradiction || 0) + ' tensions',
      (counts.question || 0) + ' open questions'
    ].join(' \u00b7 ')

    return (
      '<div class="problem-header">' +
        '<div>' +
          '<div class="section-kicker">Landscape</div>' +
          '<h1>' + esc(DATA.meta.title) + '</h1>' +
          '<p>' + esc(DATA.meta.description) + '</p>' +
        '</div>' +
        '<div class="state-summary">' + esc(summary) + '</div>' +
      '</div>'
    )
  }

  function renderCampBar () {
    var chips = CAMPS.map(function (c) {
      var n = NODES.filter(function (x) { return x.camp === c.id }).length
      return (
        '<button class="camp-chip' + (campActive(c.id) ? '' : ' off') + '" data-camp="' + c.id + '">' +
          '<span class="camp-swatch" style="background:' + c.color + '"></span>' +
          esc(c.label) + ' \u00b7 ' + n +
        '</button>'
      )
    }).join('')

    return (
      '<div class="camp-bar">' +
        '<div class="section-kicker" style="margin:0">Camps</div>' +
        '<div class="camp-list">' + chips + '</div>' +
        '<div class="camp-note">Filter by which community a position comes from. Every view respects the filter.</div>' +
      '</div>'
    )
  }

  function nodeCard (n) {
    var meta = [n.status]
    if (n.confidence) meta.push('confidence: ' + n.confidence)
    if (n.sources && n.sources.length) meta.push(n.sources.length + ' source' + (n.sources.length > 1 ? 's' : ''))
    return (
      '<button class="state-card' + (state.selectedId === n.id ? ' selected' : '') + '"' +
        ' data-node="' + n.id + '" style="border-left-color:' + campColor(n.camp) + '">' +
        '<span class="state-card-top">' +
          '<span class="kind-dot ' + n.kind + '"></span>' +
          '<strong>' + esc(n.label) + '</strong>' +
        '</span>' +
        '<span class="state-card-detail">' + esc(n.detail) + '</span>' +
        '<span class="state-card-meta">' +
          '<span class="camp-tag" style="background:' + campColor(n.camp) + '">' +
            esc(CAMP_BY_ID[n.camp] ? CAMP_BY_ID[n.camp].label : n.camp) +
          '</span>' +
          esc(meta.join(' \u00b7 ')) +
        '</span>' +
      '</button>'
    )
  }

  function renderStateView () {
    var vis = visibleNodes()
    var html = SECTIONS.map(function (sec) {
      var items = vis.filter(function (n) { return n.kind === sec.kind })
      if (!items.length) return ''
      items.sort(function (a, b) { return (b.weight || 0) - (a.weight || 0) })
      return (
        '<div class="state-section">' +
          '<div class="section-kicker">' + esc(sec.title) + ' \u00b7 ' + items.length + '</div>' +
          '<div class="state-list">' + items.map(nodeCard).join('') + '</div>' +
        '</div>'
      )
    }).join('')
    if (!html) return '<p class="map-fallback">Every camp is filtered out.</p>'
    return '<div class="state-grid">' + html + '</div>'
  }

  function renderMapShell () {
    if (typeof window.d3 === 'undefined') {
      return (
        '<div class="map-shell"><div class="map-fallback">' +
          'The map needs D3, which is loaded from a CDN and is unavailable offline.<br>' +
          'State and Timeline are complete without it — the map is only a projection.' +
        '</div></div>'
      )
    }
    return (
      '<div class="map-shell">' +
        '<svg class="map-svg" id="map-svg"></svg>' +
        '<div class="map-explainer">' +
          'Fill = camp. Ring = kind. Solid links support, dashed red contradict, dotted amber open a question. ' +
          'Position carries no meaning — this is a projection over the state, never the ontology.' +
        '</div>' +
      '</div>'
    )
  }

  function drawMap () {
    var svgEl = document.getElementById('map-svg')
    if (!svgEl || typeof window.d3 === 'undefined') return
    var d3 = window.d3

    var width = svgEl.clientWidth || 900
    var height = svgEl.clientHeight || 620

    var nodes = visibleNodes().map(function (n) {
      return { id: n.id, kind: n.kind, camp: n.camp, label: n.label, meta: n.status, weight: n.weight || 14 }
    })
    var ids = {}
    nodes.forEach(function (n) { ids[n.id] = true })
    var links = RELATIONS
      .filter(function (r) { return ids[r.source] && ids[r.target] })
      .map(function (r) { return { source: r.source, target: r.target, kind: r.kind } })

    var svg = d3.select(svgEl)
    svg.selectAll('*').remove()

    var link = svg.append('g').selectAll('line').data(links).join('line')
      .attr('class', function (d) { return 'map-link ' + d.kind })

    var node = svg.append('g').selectAll('g').data(nodes).join('g')
      .style('cursor', 'pointer')
      .on('click', function (_e, d) { select(d.id) })

    node.append('circle')
      .attr('class', 'map-circle')
      .attr('r', function (d) { return Math.max(9, d.weight * 0.62) })
      .attr('fill', function (d) { return campColor(d.camp) })

    node.append('text')
      .attr('class', 'map-label')
      .attr('text-anchor', 'middle')
      .attr('dy', function (d) { return Math.max(9, d.weight * 0.62) + 14 })
      .text(function (d) { return d.label })

    node.append('text')
      .attr('class', 'map-sublabel')
      .attr('text-anchor', 'middle')
      .attr('dy', function (d) { return Math.max(9, d.weight * 0.62) + 25 })
      .text(function (d) { return d.meta })

    var sim = d3.forceSimulation(nodes)
      .force('link', d3.forceLink(links).id(function (d) { return d.id }).distance(115).strength(0.35))
      .force('charge', d3.forceManyBody().strength(-460))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collide', d3.forceCollide().radius(function (d) { return Math.max(9, d.weight * 0.62) + 30 }))
      .on('tick', function () {
        link
          .attr('x1', function (d) { return d.source.x }).attr('y1', function (d) { return d.source.y })
          .attr('x2', function (d) { return d.target.x }).attr('y2', function (d) { return d.target.y })
        node.attr('transform', function (d) { return 'translate(' + d.x + ',' + d.y + ')' })
      })

    node.call(d3.drag()
      .on('start', function (e, d) { if (!e.active) sim.alphaTarget(0.28).restart(); d.fx = d.x; d.fy = d.y })
      .on('drag', function (e, d) { d.fx = e.x; d.fy = e.y })
      .on('end', function (e, d) { if (!e.active) sim.alphaTarget(0); d.fx = null; d.fy = null }))

    highlightMap()
  }

  function highlightMap () {
    if (typeof window.d3 === 'undefined') return
    var id = state.selectedId
    var d3 = window.d3
    var neighbours = {}
    if (id) {
      neighbours[id] = true
      RELATIONS.forEach(function (r) {
        if (r.source === id) neighbours[r.target] = true
        if (r.target === id) neighbours[r.source] = true
      })
    }
    d3.select('#map-svg').selectAll('.map-circle')
      .classed('dim', function (d) { return !!id && !neighbours[d.id] })
    d3.select('#map-svg').selectAll('.map-link')
      .classed('dim', function (d) {
        if (!id) return false
        var s = d.source.id || d.source
        var t = d.target.id || d.target
        return s !== id && t !== id
      })
  }

  function renderTimeline () {
    var rows = TIMELINE.filter(function (t) { return campActive(t.camp) }).map(function (t) {
      return (
        '<div class="timeline-row">' +
          '<div class="timeline-date">' + esc(t.date) + '</div>' +
          '<div class="timeline-marker" style="background:' + campColor(t.camp) + '"></div>' +
          '<div class="timeline-body">' +
            '<strong>' + esc(t.title) + '</strong>' +
            '<p>' + esc(t.detail) + '</p>' +
          '</div>' +
        '</div>'
      )
    }).join('')
    return '<div class="timeline">' + (rows || '<p class="map-fallback">Every camp is filtered out.</p>') + '</div>'
  }

  function relationsFor (id) {
    var out = []
    RELATIONS.forEach(function (r) {
      if (r.source === id && NODE_BY_ID[r.target]) out.push({ dir: 'out', kind: r.kind, other: NODE_BY_ID[r.target] })
      if (r.target === id && NODE_BY_ID[r.source]) out.push({ dir: 'in', kind: r.kind, other: NODE_BY_ID[r.source] })
    })
    return out
  }

  var REL_PHRASE = {
    out: { supports: 'supports', contradicts: 'contradicts', opens: 'opens', relates: 'relates to' },
    in: { supports: 'supported by', contradicts: 'contradicted by', opens: 'opened by', relates: 'related to' }
  }

  function renderSelected () {
    var n = state.selectedId ? NODE_BY_ID[state.selectedId] : null
    if (!n) {
      return (
        '<div class="rail-card">' +
          '<div class="section-kicker">Selection</div>' +
          '<h3>Nothing selected</h3>' +
          '<p class="muted">Pick a card or a map node to see its detail, its camp, its sources and how it connects.</p>' +
        '</div>'
      )
    }
    var camp = CAMP_BY_ID[n.camp]
    var rels = relationsFor(n.id)
    var sources = (n.sources || []).map(function (s) {
      return '<a href="' + esc(s.url) + '" target="_blank" rel="noopener">' + esc(s.title) + '</a>'
    }).join('')

    return (
      '<div class="rail-card">' +
        '<div class="section-kicker">Selection</div>' +
        '<div class="chip-row">' +
          '<span class="kind-chip">' + esc(n.kind) + '</span>' +
          '<span class="camp-tag" style="background:' + campColor(n.camp) + '">' +
            esc(camp ? camp.label : n.camp) + '</span>' +
        '</div>' +
        '<h3 style="margin-top:10px">' + esc(n.label) + '</h3>' +
        '<p class="selected-detail">' + esc(n.detail) + '</p>' +
        '<div class="provenance">' +
          'Status: ' + esc(n.status) +
          (n.confidence ? ' \u00b7 confidence: ' + esc(n.confidence) : '') +
          (n.createdAt ? ' \u00b7 ' + esc(n.createdAt) : '') +
          (sources ? sources : '') +
        '</div>' +
        (rels.length
          ? '<div class="rel-list">' + rels.map(function (r) {
              return '<div class="rel-item"><b>' + esc(REL_PHRASE[r.dir][r.kind] || r.kind) + '</b> ' +
                '<button data-node="' + r.other.id + '">' + esc(r.other.label) + '</button></div>'
            }).join('') + '</div>'
          : '') +
      '</div>'
    )
  }

  function renderThinkNext () {
    var vis = visibleNodes()
    var open = vis.filter(function (n) { return n.kind === 'question' })
    var tensions = vis.filter(function (n) { return n.kind === 'contradiction' && /open/.test(n.status) })
    var untested = vis.filter(function (n) { return n.kind === 'assumption' && /untested|weakening/.test(n.status) })

    var items = []
      .concat(tensions.map(function (n) { return { cls: 'tension', label: n.label, detail: n.detail, id: n.id } }))
      .concat(untested.map(function (n) { return { cls: 'assumption', label: n.label, detail: n.detail, id: n.id } }))
      .concat(open.map(function (n) { return { cls: '', label: n.label, detail: n.detail, id: n.id } }))

    if (!items.length) return ''
    return (
      '<div class="rail-card">' +
        '<div class="section-kicker">What to resolve next</div>' +
        '<h3>Unsettled</h3>' +
        '<div class="think-list">' +
          items.map(function (i) {
            return '<button class="think-item ' + i.cls + '" data-node="' + i.id + '" style="text-align:left;border-top:0;border-right:0;border-bottom:0;cursor:pointer;width:100%">' +
              '<strong>' + esc(i.label) + '</strong>' +
              '<span>' + esc(i.detail.length > 150 ? i.detail.slice(0, 150) + '…' : i.detail) + '</span>' +
            '</button>'
          }).join('') +
        '</div>' +
      '</div>'
    )
  }

  function renderCampLegend () {
    return (
      '<div class="rail-card">' +
        '<div class="section-kicker">Reading this board</div>' +
        '<h3>Canonical vs derived</h3>' +
        '<p class="muted">The semantic state is canonical. Map and timeline are projections over it and can never write — the same rule the companion brainstorm prototype is built around, applied to a research landscape instead of a group.</p>' +
        '<div class="rel-list">' +
          CAMPS.map(function (c) {
            return '<div class="rel-item"><b style="color:' + c.color + '">●</b> <b>' + esc(c.label) + '</b> — ' + esc(c.note) + '</div>'
          }).join('') +
        '</div>' +
      '</div>'
    )
  }

  function render () {
    var body =
      state.view === 'state' ? renderStateView()
      : state.view === 'map' ? renderMapShell()
      : renderTimeline()

    document.getElementById('root').innerHTML =
      '<div class="topbar">' +
        '<div>' +
          '<h1 class="brand">authority<span>·board</span></h1>' +
          '<div class="tagline">Who is building what, and where this project actually differs</div>' +
        '</div>' +
        '<div class="top-actions">' +
          '<button class="button" id="clear-selection">Clear selection</button>' +
        '</div>' +
      '</div>' +
      renderCampBar() +
      '<div class="workspace">' +
        '<div class="main-panel">' +
          renderHeader() +
          '<div class="view-switcher">' +
            ['state', 'map', 'timeline'].map(function (v) {
              return '<button data-view="' + v + '"' + (state.view === v ? ' class="active"' : '') + '>' +
                v.charAt(0).toUpperCase() + v.slice(1) + '</button>'
            }).join('') +
          '</div>' +
          '<div class="view-body">' + body + '</div>' +
        '</div>' +
        '<div class="side-rail">' +
          renderSelected() +
          renderThinkNext() +
          renderCampLegend() +
        '</div>' +
      '</div>' +
      '<div class="footer-note">' + esc(DATA.meta.sourceNote) + ' \u00b7 last updated ' + esc(DATA.meta.updated) + '</div>'

    if (state.view === 'map') drawMap()
  }

  function select (id) {
    state.selectedId = state.selectedId === id ? null : id
    if (state.view === 'map') {
      document.querySelector('.side-rail').innerHTML =
        renderSelected() + renderThinkNext() + renderCampLegend()
      highlightMap()
    } else {
      render()
    }
  }

  document.addEventListener('click', function (e) {
    var viewBtn = e.target.closest('[data-view]')
    if (viewBtn) { state.view = viewBtn.getAttribute('data-view'); render(); return }

    var campBtn = e.target.closest('[data-camp]')
    if (campBtn) {
      var id = campBtn.getAttribute('data-camp')
      state.activeCamps[id] = !state.activeCamps[id]
      if (state.selectedId && !campActive((NODE_BY_ID[state.selectedId] || {}).camp)) state.selectedId = null
      render()
      return
    }

    var nodeBtn = e.target.closest('[data-node]')
    if (nodeBtn) { select(nodeBtn.getAttribute('data-node')); return }

    if (e.target.closest('#clear-selection')) { state.selectedId = null; render() }
  })

  window.addEventListener('resize', function () { if (state.view === 'map') drawMap() })

  render()
})()
