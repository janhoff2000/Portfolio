import type React from 'react'
import { useEffect, useRef, useState } from 'react'
import { useLang } from '../i18n'
import { TryHint } from './TryHint'
import { onceInView } from '../lib/onceInView'

type Scope = 'mine' | 'reviews'
type Look = 'light' | 'dark'

export function ReviewRadarPanel() {
  const { t } = useLang()
  const [scope, setScope] = useState<Scope>('mine')
  const [look, setLook] = useState<Look>('light')
  const [pressing, setPressing] = useState<Scope | null>(null)
  const [cursor, setCursor] = useState<{ x: number; y: number; on: boolean; down: boolean; ms: number }>({ x: 0.78, y: 0.82, on: false, down: false, ms: 0 })
  const panel = useRef<HTMLDivElement>(null)

  // Once, the first time the panel is on screen: press Reviews, then My PRs again.
  // Any touch on the panel ends it; with reduced motion it never runs.
  useEffect(() => {
    const el = panel.current
    if (!el || matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let stopped = false
    const timers: number[] = []
    const stop = () => { stopped = true; timers.forEach((id) => window.clearTimeout(id)); setPressing(null); setCursor((c) => ({ ...c, on: false, down: false })) }
    const at = (ms: number, fn: () => void) => timers.push(window.setTimeout(() => { if (!stopped) fn() }, ms))
    const events = ['pointerdown', 'wheel', 'touchstart', 'keydown'] as const
    events.forEach((type) => el.addEventListener(type, stop, { capture: true, passive: true }))
    const move = (x: number, y: number, ms = 650) => setCursor((c) => ({ ...c, x, y, ms }))
    const unobserve = onceInView(el, () => {
      at(500, () => setCursor((c) => ({ ...c, on: true, ms: 0 })))
      at(800, () => move(0.735, 0.106))
      at(1550, () => { setCursor((c) => ({ ...c, down: true, ms: 120 })); setPressing('reviews') })
      at(1750, () => { setCursor((c) => ({ ...c, down: false, ms: 120 })); setPressing(null); setScope('reviews') })
      at(3500, () => move(0.265, 0.106))
      at(4250, () => { setCursor((c) => ({ ...c, down: true, ms: 120 })); setPressing('mine') })
      at(4450, () => { setCursor((c) => ({ ...c, down: false, ms: 120 })); setPressing(null); setScope('mine') })
      at(5100, () => setCursor((c) => ({ ...c, on: false })))
    })
    return () => {
      unobserve()
      stop()
      events.forEach((type) => el.removeEventListener(type, stop, { capture: true }))
    }
  }, [])

  const hot = (s: Scope) => `panel-hot${pressing === s ? ' pressing' : ''}`

  return (
    <div className="panel-wrap">
      <TryHint>{t.rrHint}</TryHint>
      <div className="panel" ref={panel}>
        <img src={`/images/reviewradar/rr-${scope}-${look}.webp`} width={800} height={1228} alt={t.rrAlt} />
        <button type="button" className={hot('mine')} style={{ left: '3%' }} aria-label={t.rrMine} aria-pressed={scope === 'mine'} onClick={() => setScope('mine')} />
        <button type="button" className={hot('reviews')} style={{ left: '50%' }} aria-label={t.rrReviews} aria-pressed={scope === 'reviews'} onClick={() => setScope('reviews')} />
        <svg
          className={`rr-cursor${cursor.on ? ' on' : ''}${cursor.down ? ' down' : ''}`}
          style={{ '--cx': cursor.x, '--cy': cursor.y, transitionDuration: `${cursor.ms}ms, 200ms` } as React.CSSProperties}
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M5 3l14 9.2-6.3 1.3 3.9 6.6-2.5 1.4-3.9-6.6L5.5 19z" />
        </svg>
      </div>
      <div className="seg" role="group" aria-label={t.appearance}>
        <button type="button" aria-pressed={look === 'light'} onClick={() => setLook('light')}>{t.light}</button>
        <button type="button" aria-pressed={look === 'dark'} onClick={() => setLook('dark')}>{t.dark}</button>
      </div>
    </div>
  )
}
