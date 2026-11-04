    (function () {
      try {
        var saved = localStorage.getItem('theme');
        var isLight = saved === 'light';
        if (isLight) document.documentElement.setAttribute('data-theme', 'light');

        var ACCENTS = {
          lime:    { dark:'#c9f270', light:'#4a7c10' },
          cyan:    { dark:'#22d3ee', light:'#0e7490' },
          purple:  { dark:'#a78bfa', light:'#6d28d9' },
          rose:    { dark:'#fb7185', light:'#be123c' },
          amber:   { dark:'#fbbf24', light:'#b45309' },
          emerald: { dark:'#34d399', light:'#047857' },
          blue:    { dark:'#60a5fa', light:'#2563eb' },
          orange:  { dark:'#f97316', light:'#c2410c' }
        };
        var key = localStorage.getItem('accent-key') || 'purple';
        if (!ACCENTS[key]) key = 'purple';
        var hex = ACCENTS[key][isLight ? 'light' : 'dark'];

        // Compute --accent-dim (rgba 28%) and --accent-glow (rgba 35%)
        var r = parseInt(hex.slice(1,3), 16);
        var g = parseInt(hex.slice(3,5), 16);
        var b = parseInt(hex.slice(5,7), 16);
        var s = document.documentElement.style;
        s.setProperty('--accent', hex);
        s.setProperty('--accent-dim',  'rgba(' + r + ',' + g + ',' + b + ',0.28)');
        s.setProperty('--accent-glow', 'rgba(' + r + ',' + g + ',' + b + ',0.35)');
        document.documentElement.setAttribute('data-accent-key', key);

        // Font theme — mirror table in assets/js/fonts.js. Inject the
        // Google Fonts <link> synchronously when a non-default preset
        // is saved so the right family is requested before paint.
        var FONTS = {
          workbench: { display: '"Space Grotesk", system-ui, sans-serif', body: '"DM Sans", system-ui, sans-serif', mono: '"JetBrains Mono", ui-monospace, monospace', href: null },
          editorial: { display: '"Instrument Serif", Georgia, serif',
                       body:    '"DM Sans", system-ui, sans-serif',
                       mono:    '"JetBrains Mono", ui-monospace, Menlo, monospace',
                       href:    null },
          modern:    { display: '"Inter", system-ui, sans-serif',
                       body:    '"Inter", system-ui, sans-serif',
                       mono:    '"Fira Code", ui-monospace, monospace',
                       href:    'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Fira+Code:wght@400;500&display=swap' },
          classic:   { display: '"Playfair Display", Georgia, serif',
                       body:    '"Source Sans 3", system-ui, sans-serif',
                       mono:    '"Source Code Pro", ui-monospace, monospace',
                       href:    'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Source+Sans+3:wght@400;500;600&family=Source+Code+Pro:wght@400;500&display=swap' },
          minimal:   { display: '"Space Grotesk", system-ui, sans-serif',
                       body:    '"Space Grotesk", system-ui, sans-serif',
                       mono:    '"Space Mono", ui-monospace, monospace',
                       href:    'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap' },
          terminal:  { display: '"JetBrains Mono", ui-monospace, monospace',
                       body:    '"JetBrains Mono", ui-monospace, monospace',
                       mono:    '"JetBrains Mono", ui-monospace, monospace',
                       href:    null },
          elegant:   { display: '"Cormorant Garamond", Georgia, serif',
                       body:    '"Nunito Sans", system-ui, sans-serif',
                       mono:    '"JetBrains Mono", ui-monospace, monospace',
                       href:    'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Nunito+Sans:wght@400;500;600&display=swap' }
        };
        var fkey = localStorage.getItem('font-key') || 'workbench';
        if (!FONTS[fkey]) fkey = 'workbench';
        var fp = FONTS[fkey];
        s.setProperty('--font-display', fp.display);
        s.setProperty('--font-body',    fp.body);
        s.setProperty('--font-mono',    fp.mono);
        document.documentElement.setAttribute('data-font-key', fkey);
        if (fp.href) {
          var fl = document.createElement('link');
          fl.rel = 'stylesheet';
          fl.href = fp.href;
          fl.dataset.fontTheme = fkey;
          document.head.appendChild(fl);
        }
      } catch (e) { /* noop */ }
    })();
