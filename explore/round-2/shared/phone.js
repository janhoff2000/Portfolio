// Interactive MyReciPal prototype: real Simulator captures with tap targets placed
// over the app's own controls. Coordinates are iOS points on a 402 pt wide screen.
(function () {
  const W = 402;
  const recipes = {
    g: 'Crispy Gochujang Chicken', u: 'Miso Butter Mushroom Udon', o: 'Baked Feta Orzo',
    t: 'Smash Burger Tacos', s: 'Shakshuka with Feta', p: 'Lemon Ricotta Pancakes'
  };
  const card = (y, r) => ({ x: 17, y, w: 368, h: 240, go: 'r-' + r + '-ing', label: recipes[r] });
  const screens = {
    home: { img: 'home', tab: 'cookbook', root: true, hot: [
      { x: 17, y: 267, w: 175, h: 205, go: 'slow', label: 'Slow Sundays collection' },
      { x: 210, y: 267, w: 175, h: 205, go: 'week', label: 'Weeknight dinners collection' },
      { x: 201, y: 222, w: 185, h: 32, go: 'list', mode: 'swap', label: 'Recipes' } ] },
    list: { img: 'list', tab: 'cookbook', root: true, hot: [
      { x: 17, y: 222, w: 184, h: 32, go: 'home', mode: 'swap', label: 'Collections' },
      card(267, 'g'), card(529, 'u'), card(791, 'o'), card(1053, 't'), card(1315, 's'), card(1577, 'p') ] },
    slow: { img: 'slow', tab: 'cookbook', back: true, hot: [ card(175, 's'), card(437, 'p') ] },
    week: { img: 'week', tab: 'cookbook', back: true, hot: [ card(175, 'g'), card(437, 'u'), card(699, 'o'), card(961, 't') ] },
    shop: { img: 'shop', tab: 'shopping', root: true, hot: [] }
  };
  Object.keys(recipes).forEach((r) => {
    ['ing', 'ins'].forEach((part) => {
      screens['r-' + r + '-' + part] = { img: r + '-' + part, tab: 'cookbook', back: true, detail: r, part, hot: [
        { x: 16, y: 556, w: 185, h: 38, go: 'r-' + r + '-ing', mode: 'toggle', label: 'Ingredients' },
        { x: 201, y: 556, w: 185, h: 38, go: 'r-' + r + '-ins', mode: 'toggle', label: 'Instructions' } ] };
    });
  });

  function px(v) { return `calc(${v} * var(--u))`; }

  class Phone {
    constructor(root, opts) {
      this.root = root; this.base = opts.base; this.lang = opts.lang || 'en'; this.onChange = opts.onChange || null;
      this.reduce = opts.reduceMotion || matchMedia('(prefers-reduced-motion: reduce)').matches;
      this.stacks = { cookbook: [], shopping: [] }; this.tab = 'cookbook';
      root.classList.add('mrp');
      root.innerHTML = '';
      this.view = document.createElement('div'); this.view.className = 'mrp-view'; root.appendChild(this.view);
      const sb = document.createElement('img'); sb.className = 'mrp-status'; sb.alt = ''; sb.src = this.base + 'statusbar.png'; root.appendChild(sb);
      this.tabbar = document.createElement('div'); this.tabbar.className = 'mrp-tabbar'; root.appendChild(this.tabbar);
      this.tabImg = document.createElement('img'); this.tabImg.alt = ''; this.tabbar.appendChild(this.tabImg);
      [['cookbook', 66, 95, 'Cookbook'], ['shopping', 161, 85, 'Shopping'], ['settings', 246, 90, 'Settings']].forEach(([t, x, w, l]) => {
        const b = document.createElement('button'); b.type = 'button'; b.className = 'mrp-hot'; b.setAttribute('aria-label', l);
        Object.assign(b.style, { left: px(x), top: px(24), width: px(w), height: px(60) });
        b.addEventListener('click', () => this.switchTab(t)); this.tabbar.appendChild(b);
      });
      this.toast = document.createElement('div'); this.toast.className = 'mrp-toast'; this.toast.setAttribute('role', 'status'); root.appendChild(this.toast);
      this.ro = new ResizeObserver(() => root.style.setProperty('--u', root.clientWidth / W + 'px'));
      this.ro.observe(root);
      root.style.setProperty('--u', root.clientWidth / W + 'px');
      this.open('home', 'cookbook', false);
      this.updateTab();
    }
    make(id) {
      const s = screens[id];
      const el = document.createElement('div'); el.className = 'mrp-screen'; el.dataset.id = id; el.tabIndex = 0;
      el.setAttribute('aria-label', 'MyReciPal screen');
      const inner = document.createElement('div'); inner.className = 'mrp-inner';
      const img = document.createElement('img'); img.src = this.base + s.img + '.webp'; img.alt = ''; img.draggable = false;
      inner.appendChild(img);
      this.addHot(inner, s);
      if (s.back) {
        const b = document.createElement('button'); b.type = 'button'; b.className = 'mrp-hot'; b.setAttribute('aria-label', 'Back');
        Object.assign(b.style, { left: px(10), top: px(60), width: px(46), height: px(46) });
        b.addEventListener('click', () => this.back()); inner.appendChild(b);
      }
      el.appendChild(inner);
      return el;
    }
    addHot(inner, s) {
      inner.querySelectorAll('.mrp-hot.page').forEach((n) => n.remove());
      s.hot.forEach((h) => {
        const b = document.createElement('button'); b.type = 'button'; b.className = 'mrp-hot page'; b.setAttribute('aria-label', h.label);
        Object.assign(b.style, { left: px(h.x), top: px(h.y), width: px(h.w), height: px(h.h) });
        b.addEventListener('click', () => this.go(h));
        inner.appendChild(b);
      });
    }
    get stack() { return this.stacks[this.tab]; }
    current() { const top = this.stack[this.stack.length - 1]; return top ? top.dataset.id : null; }
    notify() { if (this.onChange) this.onChange({ tab: this.tab, id: this.current() }); }
    // Jump to a screen path, e.g. goTo('cookbook', ['list', 'r-g-ing']) or goTo('shopping', ['shop']).
    goTo(tab, ids) {
      const same = this.tab === tab && this.stack.length === ids.length && this.stack.every((e, i) => e.dataset.id === ids[i]);
      if (same) return;
      this.stack.forEach((e) => (e.hidden = true));
      this.tab = tab;
      this.stacks[tab].forEach((e) => e.remove()); this.stacks[tab] = [];
      ids.forEach((id, i) => {
        const el = this.make(id); this.view.appendChild(el); this.stacks[tab].push(el);
        if (i < ids.length - 1) el.classList.add('under');
      });
      // let the last screen slide in when there is a screen beneath it
      const last = this.stack[this.stack.length - 1];
      if (ids.length > 1 && !this.reduce) { last.classList.add('enter'); const prev = this.stack[this.stack.length - 2]; prev.classList.remove('under'); requestAnimationFrame(() => requestAnimationFrame(() => { last.classList.remove('enter'); prev.classList.add('under'); })); }
      this.updateTab(); this.notify();
    }
    go(h) {
      if (h.mode === 'toggle') {
        const top = this.stack[this.stack.length - 1]; if (top.dataset.id === h.go) return;
        const s = screens[h.go]; top.dataset.id = h.go;
        top.querySelector('.mrp-inner > img').src = this.base + s.img + '.webp';
        this.notify(); return;
      }
      if (h.mode === 'swap') {
        const top = this.stack.pop(); const el = this.make(h.go); this.view.appendChild(el); this.stack.push(el); top.remove(); this.notify(); return;
      }
      this.push(h.go); this.notify();
    }
    open(id, tab, animate) { const el = this.make(id); this.view.appendChild(el); this.stacks[tab].push(el); }
    push(id) {
      const prev = this.stack[this.stack.length - 1];
      const el = this.make(id); el.classList.add('enter'); this.view.appendChild(el); this.stack.push(el);
      if (this.reduce) { el.classList.remove('enter'); prev.classList.add('under'); return; }
      requestAnimationFrame(() => requestAnimationFrame(() => { el.classList.remove('enter'); prev.classList.add('under'); }));
    }
    back() {
      if (this.stack.length < 2) return;
      const top = this.stack.pop(); const prev = this.stack[this.stack.length - 1];
      prev.classList.remove('under');
      if (this.reduce) { top.remove(); return; }
      top.classList.add('enter'); top.addEventListener('transitionend', () => top.remove(), { once: true });
      setTimeout(() => top.remove(), 600);
      this.notify();
    }
    switchTab(t) {
      if (t === 'settings') { this.say(this.lang === 'de' ? 'Einstellungen sind nicht Teil dieser Demo.' : 'Settings are not part of this demo.'); return; }
      if (t === this.tab) { // tap the active tab: back to its root
        while (this.stack.length > 1) this.stack.pop().remove();
        this.stack[0].classList.remove('under'); this.stack[0].scrollTo({ top: 0, behavior: this.reduce ? 'auto' : 'smooth' }); this.notify(); return;
      }
      this.stack.forEach((e) => (e.hidden = true));
      this.tab = t;
      if (!this.stack.length) this.open(t === 'shopping' ? 'shop' : 'home', t, false);
      this.stack.forEach((e) => (e.hidden = false));
      this.updateTab(); this.notify();
    }
    updateTab() { this.tabImg.src = this.base + (this.tab === 'shopping' ? 'tabbar-shopping.png' : 'tabbar-cookbook.png'); }
    say(text) {
      this.toast.textContent = text; this.toast.classList.add('on');
      clearTimeout(this._t); this._t = setTimeout(() => this.toast.classList.remove('on'), 1800);
    }
    reset() { ['cookbook', 'shopping'].forEach((t) => { this.stacks[t].forEach((e) => e.remove()); this.stacks[t] = []; }); this.tab = 'cookbook'; this.open('home', 'cookbook'); this.updateTab(); }
  }
  window.MyReciPalPhone = Phone;
})();
