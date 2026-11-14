/* Loads the ElevenLabs voice assistant only when the visitor asks for it.
   The widget script is self-hosted (assets/third-party/elevenlabs, MIT) and the
   agent only accepts conversations from paulmartinmcneill.com. */
(function () {
  'use strict';
  var root = document.querySelector('[data-voice-agent]');
  if (!root) return;
  var btn = root.querySelector('[data-voice-agent-load]');
  var status = root.querySelector('[data-voice-agent-status]');
  var agentId = root.getAttribute('data-agent-id');
  var src = root.getAttribute('data-widget-src');
  if (!btn || !agentId || !src) return;

  btn.addEventListener('click', function () {
    if (document.querySelector('elevenlabs-convai')) return;
    btn.disabled = true;
    status.textContent = 'Loading…';
    var widget = document.createElement('elevenlabs-convai');
    widget.setAttribute('agent-id', agentId);
    document.body.appendChild(widget);
    var s = document.createElement('script');
    s.src = src;
    s.async = true;
    s.onload = function () {
      btn.hidden = true;
      status.textContent = 'Ready. Use the assistant at the bottom left of the screen.';
    };
    s.onerror = function () {
      btn.disabled = false;
      widget.remove();
      status.textContent = 'The assistant could not load. Please try again later.';
    };
    document.body.appendChild(s);
  });
})();
