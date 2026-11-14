/* CV page: print / save-as-PDF button. */
(function () {
  'use strict';
  var b = document.querySelector('[data-cv-print]');
  if (b) b.addEventListener('click', function () { window.print(); });
})();
