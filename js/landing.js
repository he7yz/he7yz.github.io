/* the beauty of ascii*/

class ASCIIMorph {
  constructor(el, text) {
    this.c    = el;
    this.text = text;
    this.pool = {
      normal:  '▓▒░│─┼╋+=-_.~*#:;!?/\\^<>|&#@%',
      braille: '⠿⠾⠻⠷⠯⠟⡿⣿⢿⣾⣽⡾⠛⠚⡀⢀⣀⣤⣶⠿⠛⠙⠘⠃⠁',
    };
    this.λ     = 'λ';
    this.p     = [];
    this.live  = false;
    this.build();
    this.listen();
  }

  /* random ahh canvas pixels to particles */
  build() {
    const W   = this.c.offsetWidth || 510;
    const H   = Math.min(138, window.innerHeight * 0.18);
    this.c.style.cssText = `position:relative;height:${H}px;cursor:crosshair;overflow:visible;`;
    this.c.innerHTML = '';
    this.p = [];
    this.live = false;

    const cvs = document.createElement('canvas');
    const ctx = cvs.getContext('2d');
    const DPR = Math.min(devicePixelRatio || 1, 2);
    cvs.width  = W * DPR;
    cvs.height = H * DPR;
    ctx.scale(DPR, DPR);

    const fs = Math.min(W / this.text.length * 1.2, 136);
    ctx.font          = `800 ${fs}px "JetBrains Mono", monospace`;
    ctx.textBaseline  = 'middle';
    ctx.fillStyle     = '#fff';
    const tw = ctx.measureText(this.text).width;
    ctx.fillText(this.text, (W - tw) / 2, H / 2);

    const px   = ctx.getImageData(0, 0, cvs.width, cvs.height).data;
    const STEP = Math.max(8, ~~(W / 78));

    for (let y = 0; y < H; y += STEP) {
      for (let x = 0; x < W; x += STEP) {
        const i = (~~(y * DPR) * cvs.width + ~~(x * DPR)) * 4;
        if (i < px.length && px[i] > 100) {
          const ch = this._rnd('normal');
          const el = document.createElement('span');
          el.textContent = ch;
          el.style.cssText = `position:absolute;left:${x}px;top:${y}px;font-size:10px;line-height:1;color:var(--accent);pointer-events:none;user-select:none;opacity:0;`;
          this.c.appendChild(el);
          this.p.push({ el, ox: x, oy: y, ch, state: 'normal', t: [] });
        }
      }
    }

    this._entrance();
  }

  _rnd(pool) {
    const s = this.pool[pool];
    return s[~~(Math.random() * s.length)];
  }

  _clr(p) {
    p.t.forEach(x => { clearTimeout(x); clearInterval(x); });
    p.t = [];
  }

  /* glitched loadup */
  _entrance() {
    this.p.forEach(p => {
      const d = ~~(Math.random() * 560);
      const t = setTimeout(() => {
        p.el.style.opacity = '1';
        let n = 3 + ~~(Math.random() * 4);
        const tick = setInterval(() => {
          p.el.textContent = this._rnd('normal');
          if (--n <= 0) {
            clearInterval(tick);
            p.el.textContent = p.ch;
            p.el.style.transition = 'color .22s ease';
            this.live = true;
          }
        }, 55);
        p.t.push(tick);
      }, d);
      p.t.push(t);
    });
    setTimeout(() => this._idleTick(), 1300);
  }

  /* cron-job for char flickering lmao */
  _idleTick() {
    setInterval(() => {
      if (!this.live) return;
      const n = ~~(this.p.length * 0.022);
      for (let i = 0; i < n; i++) {
        const p = this.p[~~(Math.random() * this.p.length)];
        if (p.state !== 'normal') continue;
        p.el.textContent = this._rnd('normal');
        setTimeout(() => { if (p.state === 'normal') p.el.textContent = p.ch; }, 85);
      }
    }, 130);
  }

  /* LambdaMorpher */
  _morph(p, dir) {
    if (!this.live) return;
    this._clr(p);

    const goLambda = dir === 'lambda' && p.state !== 'lambda';
    const goNormal = dir === 'normal' && p.state !== 'normal';
    if (!goLambda && !goNormal) return;

    p.state = dir === 'lambda' ? 'toLambda' : 'toNormal';
    const target = dir === 'lambda' ? this.λ : p.ch;
    const col    = dir === 'lambda' ? 'var(--accent2)' : 'var(--accent)';
    let step = 0;
    const STEPS = 5;

    const tick = setInterval(() => {
      if (step < STEPS - 1) {
        p.el.textContent = this._rnd('braille');
        p.el.style.color = 'var(--accent-dim)';
      } else {
        p.el.textContent = target;
        p.el.style.color = col;
        p.state = dir;
        clearInterval(tick);
      }
      step++;
    }, 40);
    p.t.push(tick);
  }

  /* mouse */
  listen() {
    const RADIUS = 74;
    let near = new Set();

    const move = (cx, cy) => {
      const r    = this.c.getBoundingClientRect();
      const mx   = cx - r.left;
      const my   = cy - r.top;
      const now  = new Set();

      this.p.forEach((p, i) => {
        if (Math.hypot(p.ox - mx, p.oy - my) < RADIUS) {
          now.add(i);
          if (!near.has(i)) {
            const delay = ~~(Math.random() * 65);
            p.t.push(setTimeout(() => this._morph(p, 'lambda'), delay));
          }
        }
      });

      near.forEach(i => {
        if (!now.has(i)) {
          const p = this.p[i];
          p.t.push(setTimeout(() => this._morph(p, 'normal'), ~~(Math.random() * 110)));
        }
      });

      near = now;
    };

    this.c.addEventListener('mousemove', e => move(e.clientX, e.clientY));
    this.c.addEventListener('touchmove', e => {
      e.preventDefault();
      move(e.touches[0].clientX, e.touches[0].clientY);
    }, { passive: false });

    this.c.addEventListener('mouseleave', () => {
      this.p.forEach((p, i) => {
        p.t.push(setTimeout(() => this._morph(p, 'normal'), i * 1.2 + ~~(Math.random() * 80)));
      });
      near = new Set();
    });

    let rz;
    window.addEventListener('resize', () => {
      clearTimeout(rz);
      rz = setTimeout(() => { this.p.forEach(p => this._clr(p)); this.build(); }, 280);
    });
  }
}

/* prioritize font,then loadup */
document.fonts.ready.then(() => {
  const wrap = document.getElementById('morph-wrap');
  if (wrap) new ASCIIMorph(wrap, 'helyz');
});
