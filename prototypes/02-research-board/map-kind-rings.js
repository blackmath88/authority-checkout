/**
 * Derived-map decoration only: kind is encoded as an outer ring while camp
 * remains the node fill. This script never reads or mutates canonical state.
 * It decorates D3-bound SVG nodes after board.js renders/re-renders the map.
 */
;(function () {
  'use strict'

  var KIND_COLORS = {
    problem: '#233137',
    question: '#7fa7c8',
    approach: '#5baea4',
    evidence: '#78a871',
    assumption: '#c3984d',
    contradiction: '#b66f78',
    synthesis: '#9b87c5'
  }

  function decorate () {
    var svg = document.getElementById('map-svg')
    if (!svg) return

    var groups = svg.querySelectorAll('g > g')
    groups.forEach(function (group) {
      var d = group.__data__
      if (!d || !d.kind || group.querySelector('.map-kind-ring')) return

      var base = Math.max(9, (d.weight || 14) * 0.62)
      var ring = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
      ring.setAttribute('class', 'map-kind-ring')
      ring.setAttribute('r', String(base + 4))
      ring.setAttribute('fill', 'none')
      ring.setAttribute('stroke', KIND_COLORS[d.kind] || '#879396')
      ring.setAttribute('stroke-width', '2')
      ring.setAttribute('pointer-events', 'none')
      group.insertBefore(ring, group.firstChild)
    })
  }

  var observer = new MutationObserver(function () { decorate() })
  observer.observe(document.documentElement, { childList: true, subtree: true })
  window.addEventListener('resize', decorate)
  decorate()
})()
