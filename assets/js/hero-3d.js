/* Hero 3D background — hand-rolled WebGL particle field.
   Sparse accent-tinted points in a shallow 3D frustum with faint
   connecting lines, slow ambient rotation, and eased mouse parallax.
   Zero dependencies. Injected only when safe:
     - skipped under prefers-reduced-motion (static .hero__bg remains)
     - skipped when WebGL is unavailable
     - devicePixelRatio capped at 2, particle count halved on mobile
     - render loop pauses off-screen and on hidden tabs
     - initialised after window load via requestIdleCallback         */
(() => {
  'use strict';

  const hero = document.querySelector('.hero');
  if (!hero) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const coarse = window.matchMedia('(pointer: coarse)');

  let state = null; // live scene, or null when torn down

  /* ---------- helpers ---------- */

  function accentRgb() {
    const hex = getComputedStyle(document.documentElement)
      .getPropertyValue('--accent').trim();
    const m = /^#([0-9a-f]{6})$/i.exec(hex);
    if (!m) return [0.976, 0.451, 0.086]; // --accent default #f97316
    const n = parseInt(m[1], 16);
    return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
  }

  const isLight = () =>
    document.documentElement.getAttribute('data-theme') === 'light';

  // Column-major 4x4 perspective — the only matrix the scene needs;
  // rotation and camera offset happen per-particle on the CPU/shader.
  const FOV = Math.PI / 3;
  const CAM_Z = 14; // camera pull-back distance in world units
  function projectionMatrix(aspect) {
    const f = 1 / Math.tan(FOV / 2);
    const near = 0.1, far = 100;
    const nf = 1 / (near - far);
    return new Float32Array([
      f / aspect, 0, 0, 0,
      0, f, 0, 0,
      0, 0, (far + near) * nf, -1,
      0, 0, 2 * far * near * nf, 0,
    ]);
  }

  /* ---------- scene ---------- */

  function createScene() {
    const canvas = document.createElement('canvas');
    canvas.className = 'hero__canvas';
    canvas.setAttribute('aria-hidden', 'true');

    let gl;
    try {
      gl = canvas.getContext('webgl', {
        alpha: true,
        antialias: true,
        depth: false,
        powerPreference: 'low-power',
      });
    } catch (e) { gl = null; }
    if (!gl) return null;

    hero.insertBefore(canvas, hero.firstChild);

    const mobile = coarse.matches || window.innerWidth < 768;
    const COUNT = mobile ? 70 : 140;
    // Half-extents of the particle volume; x/y track the visible
    // frustum at CAM_Z so density holds across aspect ratios.
    const SPREAD = { x: 11, y: 6, z: 5 };
    const LINK_DIST = 2.6;                      // max distance for a line
    const MAX_LINKS = COUNT * 6;

    /* -- shaders -- */
    const compile = (type, src) => {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null;
    };
    const link = (vsSrc, fsSrc) => {
      const vs = compile(gl.VERTEX_SHADER, vsSrc);
      const fs = compile(gl.FRAGMENT_SHADER, fsSrc);
      if (!vs || !fs) return null;
      const p = gl.createProgram();
      gl.attachShader(p, vs);
      gl.attachShader(p, fs);
      gl.linkProgram(p);
      return gl.getProgramParameter(p, gl.LINK_STATUS) ? p : null;
    };

    const pointProgram = link(
      `attribute vec3 aPos;
       attribute float aSize;
       uniform mat4 uProj;
       uniform vec3 uCam;
       uniform float uDpr;
       varying float vDepth;
       void main() {
         vec3 p = aPos - uCam;
         gl_Position = uProj * vec4(p, 1.0);
         float dist = -p.z;
         gl_PointSize = aSize * uDpr * (10.0 / dist);
         vDepth = clamp(1.0 - (dist - 6.0) / 14.0, 0.25, 1.0);
       }`,
      `precision mediump float;
       uniform vec3 uColor;
       uniform float uAlpha;
       varying float vDepth;
       void main() {
         vec2 c = gl_PointCoord - 0.5;
         float d = length(c) * 2.0;
         float glow = smoothstep(1.0, 0.1, d);
         gl_FragColor = vec4(uColor, glow * vDepth * uAlpha);
       }`
    );

    const lineProgram = link(
      `attribute vec3 aPos;
       attribute float aFade;
       uniform mat4 uProj;
       uniform vec3 uCam;
       varying float vFade;
       void main() {
         gl_Position = uProj * vec4(aPos - uCam, 1.0);
         vFade = aFade;
       }`,
      `precision mediump float;
       uniform vec3 uColor;
       uniform float uAlpha;
       varying float vFade;
       void main() {
         gl_FragColor = vec4(uColor, vFade * uAlpha);
       }`
    );

    if (!pointProgram || !lineProgram) { canvas.remove(); return null; }

    /* -- particles (positions seeded after the first resize below,
          once SPREAD matches the real frustum) -- */
    const pos = new Float32Array(COUNT * 3);
    const vel = new Float32Array(COUNT * 3);
    const sizes = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      vel[i * 3]     = (Math.random() * 2 - 1) * 0.004;
      vel[i * 3 + 1] = (Math.random() * 2 - 1) * 0.003;
      vel[i * 3 + 2] = (Math.random() * 2 - 1) * 0.002;
      sizes[i] = 5 + Math.random() * 7;
    }
    const rotated = new Float32Array(COUNT * 3);
    const disp = new Float32Array(COUNT * 2);   // eased cursor repulsion
    const lineVerts = new Float32Array(MAX_LINKS * 2 * 4); // xyz + fade

    const pointBuf = gl.createBuffer();
    const sizeBuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, sizeBuf);
    gl.bufferData(gl.ARRAY_BUFFER, sizes, gl.STATIC_DRAW);
    const lineBuf = gl.createBuffer();

    const pLoc = {
      aPos: gl.getAttribLocation(pointProgram, 'aPos'),
      aSize: gl.getAttribLocation(pointProgram, 'aSize'),
      uProj: gl.getUniformLocation(pointProgram, 'uProj'),
      uCam: gl.getUniformLocation(pointProgram, 'uCam'),
      uColor: gl.getUniformLocation(pointProgram, 'uColor'),
      uAlpha: gl.getUniformLocation(pointProgram, 'uAlpha'),
      uDpr: gl.getUniformLocation(pointProgram, 'uDpr'),
    };
    const lLoc = {
      aPos: gl.getAttribLocation(lineProgram, 'aPos'),
      aFade: gl.getAttribLocation(lineProgram, 'aFade'),
      uProj: gl.getUniformLocation(lineProgram, 'uProj'),
      uCam: gl.getUniformLocation(lineProgram, 'uCam'),
      uColor: gl.getUniformLocation(lineProgram, 'uColor'),
      uAlpha: gl.getUniformLocation(lineProgram, 'uAlpha'),
    };

    const scene = {
      canvas, gl, mobile,
      color: accentRgb(),
      light: isLight(),
      proj: null,
      dpr: 1,
      raf: 0,
      running: false,
      visible: true,      // hero in viewport (IntersectionObserver)
      pageVisible: !document.hidden,
      angle: 0,
      mouse: { x: 0, y: 0 },       // target, normalised -1..1
      eased: { x: 0, y: 0 },       // eased camera offset
      lost: false,
      destroyables: [],
    };

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = hero.clientWidth || 1, h = hero.clientHeight || 1;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
      scene.dpr = dpr;
      scene.proj = projectionMatrix(w / h);
      // keep the volume matched to the visible frustum so density
      // holds on narrow viewports (particles wrap to the new bounds)
      const halfH = Math.tan(FOV / 2) * CAM_Z;
      SPREAD.y = halfH * 0.8;
      SPREAD.x = Math.max(4, halfH * (w / h) * 0.95);
    }
    resize();

    for (let i = 0; i < COUNT; i++) {
      pos[i * 3]     = (Math.random() * 2 - 1) * SPREAD.x;
      pos[i * 3 + 1] = (Math.random() * 2 - 1) * SPREAD.y;
      pos[i * 3 + 2] = (Math.random() * 2 - 1) * SPREAD.z;
    }

    gl.disable(gl.DEPTH_TEST);
    gl.enable(gl.BLEND);
    gl.clearColor(0, 0, 0, 0);

    function frame() {
      scene.raf = 0;
      if (!scene.running || scene.lost) return;

      // ease camera toward the cursor — gentle parallax, no snapping
      scene.eased.x += (scene.mouse.x - scene.eased.x) * 0.05;
      scene.eased.y += (scene.mouse.y - scene.eased.y) * 0.05;
      scene.angle += 0.0009;

      const sin = Math.sin(scene.angle), cos = Math.cos(scene.angle);
      // cursor projected onto the z=0 plane of the field
      const curX = scene.eased.x * SPREAD.x;
      const curY = -scene.eased.y * SPREAD.y;
      const REPEL_R = 3.2;

      for (let i = 0; i < COUNT; i++) {
        const ix = i * 3;
        // drift and soft-wrap inside the volume
        for (let a = 0; a < 3; a++) {
          pos[ix + a] += vel[ix + a];
        }
        if (pos[ix] > SPREAD.x) pos[ix] = -SPREAD.x;
        else if (pos[ix] < -SPREAD.x) pos[ix] = SPREAD.x;
        if (pos[ix + 1] > SPREAD.y) pos[ix + 1] = -SPREAD.y;
        else if (pos[ix + 1] < -SPREAD.y) pos[ix + 1] = SPREAD.y;
        if (pos[ix + 2] > SPREAD.z) pos[ix + 2] = -SPREAD.z;
        else if (pos[ix + 2] < -SPREAD.z) pos[ix + 2] = SPREAD.z;

        // slow global Y rotation
        const x = pos[ix], z = pos[ix + 2];
        rotated[ix]     = x * cos - z * sin;
        rotated[ix + 1] = pos[ix + 1];
        rotated[ix + 2] = x * sin + z * cos;

        // eased drift away from the cursor (desktop only)
        if (!mobile) {
          const dx = rotated[ix] - curX;
          const dy = rotated[ix + 1] - curY;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < REPEL_R && d > 0.001) {
            const f = (1 - d / REPEL_R);
            const tx = (dx / d) * f * 1.1;
            const ty = (dy / d) * f * 1.1;
            disp[i * 2]     += (tx - disp[i * 2]) * 0.06;
            disp[i * 2 + 1] += (ty - disp[i * 2 + 1]) * 0.06;
          } else {
            disp[i * 2]     += (0 - disp[i * 2]) * 0.06;
            disp[i * 2 + 1] += (0 - disp[i * 2 + 1]) * 0.06;
          }
          rotated[ix]     += disp[i * 2];
          rotated[ix + 1] += disp[i * 2 + 1];
        }
      }

      // connecting lines between near neighbours, alpha fades with length
      let li = 0;
      const maxFloats = lineVerts.length;
      for (let i = 0; i < COUNT && li < maxFloats; i++) {
        for (let j = i + 1; j < COUNT && li < maxFloats; j++) {
          const dx = rotated[i * 3] - rotated[j * 3];
          const dy = rotated[i * 3 + 1] - rotated[j * 3 + 1];
          const dz = rotated[i * 3 + 2] - rotated[j * 3 + 2];
          const d2 = dx * dx + dy * dy + dz * dz;
          if (d2 < LINK_DIST * LINK_DIST) {
            const fade = 1 - Math.sqrt(d2) / LINK_DIST;
            lineVerts[li++] = rotated[i * 3];
            lineVerts[li++] = rotated[i * 3 + 1];
            lineVerts[li++] = rotated[i * 3 + 2];
            lineVerts[li++] = fade;
            lineVerts[li++] = rotated[j * 3];
            lineVerts[li++] = rotated[j * 3 + 1];
            lineVerts[li++] = rotated[j * 3 + 2];
            lineVerts[li++] = fade;
          }
        }
      }

      const light = scene.light;
      const camX = scene.eased.x * 1.4;
      const camY = scene.eased.y * -0.9;
      const camZ = CAM_Z;

      gl.clear(gl.COLOR_BUFFER_BIT);
      // dark: additive glow; light: standard alpha so points read as ink
      gl.blendFunc(gl.SRC_ALPHA, light ? gl.ONE_MINUS_SRC_ALPHA : gl.ONE);

      // lines first (dimmer), points on top
      gl.useProgram(lineProgram);
      gl.uniformMatrix4fv(lLoc.uProj, false, scene.proj);
      gl.uniform3f(lLoc.uCam, camX, camY, camZ);
      gl.uniform3fv(lLoc.uColor, scene.color);
      gl.uniform1f(lLoc.uAlpha, light ? 0.20 : 0.16);
      gl.bindBuffer(gl.ARRAY_BUFFER, lineBuf);
      gl.bufferData(gl.ARRAY_BUFFER, lineVerts.subarray(0, li), gl.DYNAMIC_DRAW);
      gl.enableVertexAttribArray(lLoc.aPos);
      gl.vertexAttribPointer(lLoc.aPos, 3, gl.FLOAT, false, 16, 0);
      gl.enableVertexAttribArray(lLoc.aFade);
      gl.vertexAttribPointer(lLoc.aFade, 1, gl.FLOAT, false, 16, 12);
      gl.drawArrays(gl.LINES, 0, li / 4);

      gl.useProgram(pointProgram);
      gl.uniformMatrix4fv(pLoc.uProj, false, scene.proj);
      gl.uniform3f(pLoc.uCam, camX, camY, camZ);
      gl.uniform3fv(pLoc.uColor, scene.color);
      gl.uniform1f(pLoc.uAlpha, light ? 0.55 : 0.75);
      gl.uniform1f(pLoc.uDpr, scene.dpr);
      gl.bindBuffer(gl.ARRAY_BUFFER, pointBuf);
      gl.bufferData(gl.ARRAY_BUFFER, rotated, gl.DYNAMIC_DRAW);
      gl.enableVertexAttribArray(pLoc.aPos);
      gl.vertexAttribPointer(pLoc.aPos, 3, gl.FLOAT, false, 0, 0);
      gl.bindBuffer(gl.ARRAY_BUFFER, sizeBuf);
      gl.enableVertexAttribArray(pLoc.aSize);
      gl.vertexAttribPointer(pLoc.aSize, 1, gl.FLOAT, false, 0, 0);
      gl.drawArrays(gl.POINTS, 0, COUNT);

      scene.raf = requestAnimationFrame(frame);
    }

    function play() {
      const shouldRun = scene.visible && scene.pageVisible && !scene.lost;
      if (shouldRun && !scene.running) {
        scene.running = true;
        scene.raf = requestAnimationFrame(frame);
      } else if (!shouldRun && scene.running) {
        scene.running = false;
        if (scene.raf) cancelAnimationFrame(scene.raf);
        scene.raf = 0;
      }
    }

    /* -- listeners (all tracked for teardown) -- */
    const on = (target, type, fn, opts) => {
      target.addEventListener(type, fn, opts);
      scene.destroyables.push(() => target.removeEventListener(type, fn, opts));
    };

    if (!mobile) {
      on(window, 'pointermove', (e) => {
        scene.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        scene.mouse.y = (e.clientY / window.innerHeight) * 2 - 1;
      }, { passive: true });
    }

    on(window, 'resize', resize);

    on(document, 'visibilitychange', () => {
      scene.pageVisible = !document.hidden;
      play();
    });

    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        scene.visible = entries[0].isIntersecting;
        play();
      }, { threshold: 0 });
      io.observe(hero);
      scene.destroyables.push(() => io.disconnect());
    }

    on(canvas, 'webglcontextlost', (e) => {
      e.preventDefault();
      scene.lost = true;
      play();
    });

    // re-tint instantly when the accent picker or theme toggle mutates
    // :root — accent.js sets an inline --accent + data-accent-key, and
    // theme.js toggles data-theme.
    const mo = new MutationObserver(() => {
      scene.color = accentRgb();
      scene.light = isLight();
    });
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['style', 'data-accent-key', 'data-theme'],
    });
    scene.destroyables.push(() => mo.disconnect());

    scene.visible = true;
    scene.pageVisible = !document.hidden;
    play();

    // gentle fade-in so the field never pops over the static grid
    requestAnimationFrame(() => canvas.classList.add('is-live'));

    return scene;
  }

  function destroyScene() {
    if (!state) return;
    state.running = false;
    if (state.raf) cancelAnimationFrame(state.raf);
    state.destroyables.forEach((fn) => fn());
    const ext = state.gl.getExtension('WEBGL_lose_context');
    if (ext) ext.loseContext();
    state.canvas.remove();
    state = null;
  }

  function boot() {
    if (state || reducedMotion.matches) return;
    state = createScene(); // stays null on WebGL failure — silent fallback
  }

  // honour live OS-level motion-preference changes
  const onMotionChange = () => { reducedMotion.matches ? destroyScene() : boot(); };
  if (reducedMotion.addEventListener) {
    reducedMotion.addEventListener('change', onMotionChange);
  }

  // lazy-init: after load, in an idle slot — zero pre-paint work
  const idle = () => {
    if ('requestIdleCallback' in window) {
      requestIdleCallback(boot, { timeout: 2000 });
    } else {
      setTimeout(boot, 200);
    }
  };
  if (document.readyState === 'complete') idle();
  else window.addEventListener('load', idle, { once: true });
})();
