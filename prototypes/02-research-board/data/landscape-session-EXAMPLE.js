/**
 * Overlay template — copy to `landscape-session-04.js` and register it in
 * index.html AFTER data/landscape.js and BEFORE board.js.
 *
 * Overlays append. They do not rewrite the core file, so the research history
 * accumulates the same way docs/journey entries do.
 *
 * The only supported mutation of an existing node is a status change, because
 * a position moving from `untested` to `resolved` is the point of the board.
 * Deleting a node loses the record of having believed it — supersede instead.
 */
;(function () {
  var L = window.AUTHORITY_LANDSCAPE
  if (!L) return

  /* --- new positions ---------------------------------------------------- */
  L.nodes.push(
    // {
    //   id: 'a-example',
    //   kind: 'approach',          // problem | question | approach | evidence
    //                              // assumption | contradiction | synthesis
    //   camp: 'research',          // incident | research | industry
    //                              // standards | regulator | this-project
    //   label: 'Short name',
    //   detail: 'One paragraph. Say what it claims and what it measured.',
    //   status: 'read · not yet assessed',
    //   confidence: 'medium',      // optional
    //   weight: 18,                // optional, drives map node size
    //   createdAt: '2026-09-12',
    //   sources: [{ title: 'Paper or post', url: 'https://…' }]
    // }
  )

  /* --- new edges -------------------------------------------------------- */
  L.relations.push(
    // { source: 'a-example', target: 'a-checkout', kind: 'contradicts' }
    // kinds: supports | contradicts | opens | relates
  )

  /* --- new timeline entries --------------------------------------------- */
  L.timeline.push(
    // { date: '2026-09-12', kind: 'approach', camp: 'research',
    //   title: 'What happened', detail: 'Why it mattered.' }
  )

  /* --- status changes on existing nodes --------------------------------- */
  // setStatus('as-legibility', 'verified · no equivalent artifact found')
  function setStatus (id, status) {
    var n = L.nodes.find(function (x) { return x.id === id })
    if (n) n.status = status
  }
  void setStatus
})()
