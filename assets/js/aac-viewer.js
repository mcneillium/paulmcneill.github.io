(function () {
  var VIEWER_ID = "project-aac-ai-viewer";
  var $backdrop = document.getElementById(VIEWER_ID);
  var $img = document.getElementById("project-aac-ai-viewer-img");
  var $cap = document.getElementById("project-aac-ai-viewer-cap");
  var $pos = document.getElementById("project-aac-ai-viewer-pos");
  var $prev = document.getElementById("project-aac-ai-viewer-prev");
  var $next = document.getElementById("project-aac-ai-viewer-next");
  var $close = document.getElementById("project-aac-ai-viewer-close");

  // Build album maps from DOM
  var albums = {}; // albumId -> [{src, cap, thumbEl}, ...]
  document.querySelectorAll('.tile-gallery').forEach(function(g) {
    var id = g.getAttribute('data-album');
    var items = [];
    g.querySelectorAll('a[href][data-index]').forEach(function(a) {
      items.push({
        src: a.getAttribute('href'),
        cap: a.getAttribute('data-caption') || (a.querySelector('.cap') ? a.querySelector('.cap').textContent : ''),
        thumbEl: a
      });
    });
    albums[id] = items;
  });

  var state = { albumId: null, index: 0 };

  function openViewer(albumId, index) {
    var items = albums[albumId] || [];
    if (!items.length) return;
    state.albumId = albumId;
    state.index = Math.max(0, Math.min(index, items.length - 1));
    render();
    $backdrop.classList.add('open');
    $backdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    $close.focus();
  }

  function closeViewer() {
    $backdrop.classList.remove('open');
    $backdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function render() {
    var items = albums[state.albumId];
    var it = items[state.index];
    // simple preload of neighbors
    [state.index + 1, state.index - 1].forEach(function(i){
      if (i>=0 && i<items.length) { var p = new Image(); p.src = items[i].src; }
    });
    $img.src = it.src;
    $img.alt = it.cap || "Image " + (state.index + 1);
    $cap.textContent = it.cap || '';
    $pos.textContent = (state.index + 1) + "/" + items.length;
    $prev.style.visibility = (state.index > 0) ? 'visible' : 'hidden';
    $next.style.visibility = (state.index < items.length - 1) ? 'visible' : 'hidden';
  }

  function next() {
    var items = albums[state.albumId];
    if (state.index < items.length - 1) { state.index++; render(); }
  }
  function prev() {
    if (state.index > 0) { state.index--; render(); }
  }

  // Tile clicks
  document.querySelectorAll('.tile-gallery a[data-index]').forEach(function(a) {
    a.addEventListener('click', function(e) {
      e.preventDefault();
      var albumEl = a.closest('.tile-gallery');
      var albumId = albumEl.getAttribute('data-album');
      var idx = parseInt(a.getAttribute('data-index'), 10) || 0;
      openViewer(albumId, idx);
    });
  });

  // Viewer controls
  $next.addEventListener('click', next);
  $prev.addEventListener('click', prev);
  $close.addEventListener('click', closeViewer);
  $backdrop.addEventListener('click', function(e) {
    if (e.target === $backdrop) closeViewer();
  });

  // Keyboard
  document.addEventListener('keydown', function(e) {
    if (!$backdrop.classList.contains('open')) return;
    if (e.key === 'Escape') closeViewer();
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') prev();
  });

  // Touch swipe
  (function addSwipe(el){
    var x0=null,y0=null;
    el.addEventListener('touchstart', function(e){
      var t=e.touches[0]; x0=t.clientX; y0=t.clientY;
    }, {passive:true});
    el.addEventListener('touchmove', function(e){
      if(x0===null) return;
      var t=e.touches[0]; var dx=t.clientX-x0; var dy=t.clientY-y0;
      if(Math.abs(dx)>40 && Math.abs(dx)>Math.abs(dy)){
        if(dx<0) next(); else prev();
        x0=null; y0=null;
      }
    }, {passive:true});
    el.addEventListener('touchend', function(){ x0=null; y0=null; });
  })($backdrop);
})();
