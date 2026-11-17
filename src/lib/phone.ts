// Interactive MyReciPal prototype: real Simulator captures (iPhone 18 Pro) with tap
// targets placed over the app's own controls. Coordinates are iOS points on a
// 402 pt wide screen; the images are 2x (804 px wide).

const W = 402

type Hot = { x: number; y: number; w: number; h: number; go: string; mode?: 'swap' | 'toggle'; label: string }
type Screen = { img: string; tab: Tab; back?: boolean; hot: Hot[] }
type Tab = 'cookbook' | 'shopping'

const recipes: Record<string, string> = {
  g: 'Crispy Gochujang Chicken',
  u: 'Miso Butter Mushroom Udon',
  o: 'Baked Feta Orzo',
  t: 'Smash Burger Tacos',
  s: 'Shakshuka with Feta',
  p: 'Lemon Ricotta Pancakes',
}

const card = (y: number, r: string): Hot => ({ x: 17, y, w: 368, h: 240, go: `r-${r}-ing`, label: recipes[r] })

const screens: Record<string, Screen> = {
  home: {
    img: 'home', tab: 'cookbook', hot: [
      { x: 17, y: 267, w: 175, h: 205, go: 'slow', label: 'Slow Sundays collection' },
      { x: 210, y: 267, w: 175, h: 205, go: 'week', label: 'Weeknight dinners collection' },
      { x: 201, y: 222, w: 185, h: 32, go: 'list', mode: 'swap', label: 'Recipes' },
    ],
  },
  list: {
    img: 'list', tab: 'cookbook', hot: [
      { x: 17, y: 222, w: 184, h: 32, go: 'home', mode: 'swap', label: 'Collections' },
      card(267, 'g'), card(529, 'u'), card(791, 'o'), card(1053, 't'), card(1315, 's'), card(1577, 'p'),
    ],
  },
  slow: { img: 'slow', tab: 'cookbook', back: true, hot: [card(175, 's'), card(437, 'p')] },
  week: { img: 'week', tab: 'cookbook', back: true, hot: [card(175, 'g'), card(437, 'u'), card(699, 'o'), card(961, 't')] },
  shop: { img: 'shop', tab: 'shopping', hot: [] },
}
for (const r of Object.keys(recipes)) {
  for (const part of ['ing', 'ins']) {
    screens[`r-${r}-${part}`] = {
      img: `${r}-${part}`, tab: 'cookbook', back: true, hot: [
        { x: 16, y: 556, w: 185, h: 38, go: `r-${r}-ing`, mode: 'toggle', label: 'Ingredients' },
        { x: 201, y: 556, w: 185, h: 38, go: `r-${r}-ins`, mode: 'toggle', label: 'Instructions' },
      ],
    }
  }
}

const px = (v: number) => `calc(${v} * var(--u))`

export type PhoneOptions = { base: string; label: string; toast: () => string }

export class MyReciPalPhone {
  private root: HTMLElement
  private base: string
  private toastText: () => string
  private reduce: boolean
  private stacks: Record<Tab, HTMLElement[]> = { cookbook: [], shopping: [] }
  private tab: Tab = 'cookbook'
  private view: HTMLElement
  private tabImg: HTMLImageElement
  private toast: HTMLElement
  private ro: ResizeObserver
  private toastTimer = 0

  constructor(root: HTMLElement, opts: PhoneOptions) {
    this.root = root
    this.base = opts.base
    this.toastText = opts.toast
    this.reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    root.classList.add('mrp')
    root.replaceChildren()
    root.setAttribute('role', 'group')
    root.setAttribute('aria-label', opts.label)

    this.view = document.createElement('div')
    this.view.className = 'mrp-view'
    root.appendChild(this.view)

    const status = document.createElement('img')
    status.className = 'mrp-status'
    status.alt = ''
    status.src = `${this.base}statusbar.png`
    root.appendChild(status)

    const tabbar = document.createElement('div')
    tabbar.className = 'mrp-tabbar'
    root.appendChild(tabbar)
    this.tabImg = document.createElement('img')
    this.tabImg.alt = ''
    tabbar.appendChild(this.tabImg)
    const tabs: [Tab | 'settings', number, number, string][] = [
      ['cookbook', 66, 95, 'Cookbook'], ['shopping', 161, 85, 'Shopping'], ['settings', 246, 90, 'Settings'],
    ]
    for (const [t, x, w, label] of tabs) {
      const b = this.button(label, x, 24, w, 60)
      b.addEventListener('click', () => this.switchTab(t))
      tabbar.appendChild(b)
    }

    this.toast = document.createElement('div')
    this.toast.className = 'mrp-toast'
    this.toast.setAttribute('role', 'status')
    root.appendChild(this.toast)

    const size = () => root.style.setProperty('--u', `${root.clientWidth / W}px`)
    this.ro = new ResizeObserver(size)
    this.ro.observe(root)
    size()

    this.open('home', 'cookbook')
    this.updateTab()
  }

  destroy() {
    this.ro.disconnect()
    window.clearTimeout(this.toastTimer)
    this.root.replaceChildren()
  }

  private button(label: string, x: number, y: number, w: number, h: number, page = false) {
    const b = document.createElement('button')
    b.type = 'button'
    b.className = page ? 'mrp-hot page' : 'mrp-hot'
    b.setAttribute('aria-label', label)
    Object.assign(b.style, { left: px(x), top: px(y), width: px(w), height: px(h) })
    return b
  }

  private make(id: string) {
    const s = screens[id]
    const el = document.createElement('div')
    el.className = 'mrp-screen'
    el.dataset.id = id
    el.tabIndex = 0
    const inner = document.createElement('div')
    inner.className = 'mrp-inner'
    const img = document.createElement('img')
    img.src = `${this.base}${s.img}.webp`
    img.alt = ''
    img.draggable = false
    img.decoding = 'async'
    inner.appendChild(img)
    for (const h of s.hot) {
      const b = this.button(h.label, h.x, h.y, h.w, h.h, true)
      b.addEventListener('click', () => this.go(h))
      inner.appendChild(b)
    }
    if (s.back) {
      const b = this.button('Back', 10, 60, 46, 46)
      b.addEventListener('click', () => this.back())
      inner.appendChild(b)
    }
    el.appendChild(inner)
    return el
  }

  private get stack() {
    return this.stacks[this.tab]
  }

  private go(h: Hot) {
    const top = this.stack[this.stack.length - 1]
    if (h.mode === 'toggle') {
      if (top.dataset.id === h.go) return
      top.dataset.id = h.go
      const img = top.querySelector<HTMLImageElement>('.mrp-inner > img')
      if (img) img.src = `${this.base}${screens[h.go].img}.webp`
      return
    }
    if (h.mode === 'swap') {
      this.stack.pop()
      const el = this.make(h.go)
      this.view.appendChild(el)
      this.stack.push(el)
      top.remove()
      return
    }
    this.push(h.go)
  }

  private open(id: string, tab: Tab) {
    const el = this.make(id)
    this.view.appendChild(el)
    this.stacks[tab].push(el)
  }

  private push(id: string) {
    const prev = this.stack[this.stack.length - 1]
    const el = this.make(id)
    el.classList.add('enter')
    this.view.appendChild(el)
    this.stack.push(el)
    if (this.reduce) {
      el.classList.remove('enter')
      prev.classList.add('under')
      return
    }
    requestAnimationFrame(() => requestAnimationFrame(() => {
      el.classList.remove('enter')
      prev.classList.add('under')
    }))
  }

  private back() {
    if (this.stack.length < 2) return
    const top = this.stack.pop()!
    this.stack[this.stack.length - 1].classList.remove('under')
    if (this.reduce) {
      top.remove()
      return
    }
    top.classList.add('enter')
    top.addEventListener('transitionend', () => top.remove(), { once: true })
    window.setTimeout(() => top.remove(), 600)
  }

  private switchTab(t: Tab | 'settings') {
    if (t === 'settings') {
      this.say(this.toastText())
      return
    }
    if (t === this.tab) {
      while (this.stack.length > 1) this.stack.pop()!.remove()
      this.stack[0].classList.remove('under')
      this.stack[0].scrollTo({ top: 0, behavior: this.reduce ? 'auto' : 'smooth' })
      return
    }
    for (const e of this.stack) e.hidden = true
    this.tab = t
    if (!this.stack.length) this.open(t === 'shopping' ? 'shop' : 'home', t)
    for (const e of this.stack) e.hidden = false
    this.updateTab()
  }

  private updateTab() {
    this.tabImg.src = `${this.base}${this.tab === 'shopping' ? 'tabbar-shopping.png' : 'tabbar-cookbook.png'}`
  }

  private say(text: string) {
    this.toast.textContent = text
    this.toast.classList.add('on')
    window.clearTimeout(this.toastTimer)
    this.toastTimer = window.setTimeout(() => this.toast.classList.remove('on'), 1800)
  }
}
