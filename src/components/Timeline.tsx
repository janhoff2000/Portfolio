import { useState } from 'react'
import { timeline, type Entry, type Kind } from '../data/timeline'
import { useLang, type Lang } from '../i18n'

const ui = {
  en: { all: 'All', work: 'Work', project: 'Projects', edu: 'Education', today: 'today', ongoing: 'ongoing', beta: 'Beta', now: 'Current', more: 'Show details', less: 'Hide details', filter: 'Filter', kinds: { work: 'Work', project: 'Project', edu: 'Education' } },
  de: { all: 'Alles', work: 'Arbeit', project: 'Projekte', edu: 'Ausbildung', today: 'heute', ongoing: 'laufend', beta: 'Beta', now: 'Aktuell', more: 'Details zeigen', less: 'Details ausblenden', filter: 'Filter', kinds: { work: 'Arbeit', project: 'Projekt', edu: 'Ausbildung' } },
}
const months = {
  en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  de: ['Jan.', 'Feb.', 'März', 'Apr.', 'Mai', 'Juni', 'Juli', 'Aug.', 'Sep.', 'Okt.', 'Nov.', 'Dez.'],
}

const fmt = (d: string, l: Lang) => {
  const [y, m] = d.split('-')
  return m ? `${months[l][Number(m) - 1]} ${y}` : y
}
const range = (e: Entry, l: Lang) => {
  const u = ui[l]
  if (!e.from) return u.ongoing
  if (!e.to && e.kind === 'project') return `${fmt(e.from, l)}, ${u.ongoing}`
  return `${fmt(e.from, l)} – ${e.to ? fmt(e.to, l) : u.today}`
}
const yearOf = (e: Entry) => (e.from ? e.from.slice(0, 4) : '2026')

type Filter = 'all' | Kind

export function Timeline() {
  const { lang } = useLang()
  const u = ui[lang]
  const [filter, setFilter] = useState<Filter>('all')
  const [open, setOpen] = useState<Set<number>>(new Set())

  const toggle = (i: number) => setOpen((s) => {
    const n = new Set(s)
    if (n.has(i)) n.delete(i)
    else n.add(i)
    return n
  })

  return (
    <div className="tl-wrap">
      <div className="tl-chips" role="group" aria-label={u.filter}>
        {(['all', 'work', 'edu'] as Filter[]).map((f) => (
          <button key={f} type="button" className="tl-chip" aria-pressed={filter === f} onClick={() => setFilter(f)}>{u[f]}</button>
        ))}
      </div>
      <ol className="tl">
        {timeline.map((e, i) => ({ e, i })).filter(({ e }) => filter === 'all' || e.kind === filter).map(({ e, i }, k, shown) => {
          const c = e[lang]
          const y = yearOf(e)
          const showYear = k === 0 || yearOf(shown[k - 1].e) !== y
          const many = c.points.length > 0
          const isOpen = open.has(i)
          const points = isOpen ? c.points : []
          return (
            <li key={i} className={`tl-item k-${e.kind}`}>
              <div className="tl-year" aria-hidden={!showYear}>{showYear ? y : ''}</div>
              <div className="tl-node" aria-hidden="true" />
              <article className="tl-body">
                <p className="tl-meta">
                  <span className="tl-kind">{u.kinds[e.kind]}</span>
                  <span>{range(e, lang)}</span>
                  {e.current && <span className="tl-badge">{u.now}</span>}
                  {e.beta && <span className="tl-badge beta">{u.beta}</span>}
                </p>
                <h3 className="tl-title">
                  {e.link ? <a href={e.link} {...(e.external ? { target: '_blank', rel: 'noopener' } : {})}>{c.title}</a> : c.title}
                </h3>
                <p className="tl-org">{c.org}</p>
                {points.length > 0 && <ul className="tl-points">{points.map((p) => <li key={p}>{p}</li>)}</ul>}
                {many && <button type="button" className="tl-more" aria-expanded={isOpen} onClick={() => toggle(i)}>{isOpen ? u.less : u.more}</button>}
                {e.tags && <ul className="tl-tags">{e.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>}
              </article>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
