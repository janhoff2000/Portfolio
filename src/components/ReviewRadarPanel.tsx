import { useState } from 'react'
import { useLang } from '../i18n'

type Scope = 'mine' | 'reviews'
type Look = 'light' | 'dark'

export function ReviewRadarPanel() {
  const { t } = useLang()
  const [scope, setScope] = useState<Scope>('mine')
  const [look, setLook] = useState<Look>('light')

  return (
    <div className="panel-wrap">
      <div className="panel">
        <img src={`/images/reviewradar/rr-${scope}-${look}.webp`} width={800} height={1228} alt={t.rrAlt} />
        <button type="button" className="panel-hot" style={{ left: '3%' }} aria-label={t.rrMine} aria-pressed={scope === 'mine'} onClick={() => setScope('mine')} />
        <button type="button" className="panel-hot" style={{ left: '50%' }} aria-label={t.rrReviews} aria-pressed={scope === 'reviews'} onClick={() => setScope('reviews')} />
      </div>
      <div className="seg" role="group" aria-label={t.appearance}>
        <button type="button" aria-pressed={look === 'light'} onClick={() => setLook('light')}>{t.light}</button>
        <button type="button" aria-pressed={look === 'dark'} onClick={() => setLook('dark')}>{t.dark}</button>
      </div>
      <p className="hint">{t.rrHint}</p>
    </div>
  )
}
