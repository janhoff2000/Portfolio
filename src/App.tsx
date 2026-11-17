import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { LangContext, initialLang, strings, useLang, type Lang } from './i18n'
import { Icon, type IconName } from './components/icons'
import { Phone } from './components/Phone'
import { ReviewRadarPanel } from './components/ReviewRadarPanel'
import { Timeline } from './components/Timeline'

const EMAIL = 'me@jandavidhoffmann.com'
const LINKEDIN = 'https://www.linkedin.com/in/jan-hoffmann-1a473022a'

function Nav() {
  const { t, lang, setLang } = useLang()
  return (
    <header className="nav">
      <div className="container nav-row">
        <a className="nav-name" href="#top">Jan Hoffmann</a>
        <nav className="nav-links" aria-label="Sections">
          <a href="#myrecipal">{t.navMrp}</a>
          <a href="#reviewradar">{t.navRr}</a>
          <a href="#web">{t.navWeb}</a>
          <a href="#experience">{t.navExp}</a>
          <a href="#contact">{t.navContact}</a>
        </nav>
        <div className="lang" role="group" aria-label={t.langLabel}>
          {(['en', 'de'] as Lang[]).map((l) => (
            <button key={l} type="button" aria-pressed={lang === l} onClick={() => setLang(l)}>{l.toUpperCase()}</button>
          ))}
        </div>
      </div>
    </header>
  )
}

function Hero() {
  const { t } = useLang()
  return (
    <section className="hero container" id="top" aria-labelledby="hero-title">
      <div className="portrait" data-slot="portrait" data-alt="Head-and-shoulders photo of Jan, facing the camera">
        <img src="/images/portrait/jan.webp" width={480} height={480} alt={t.portraitAlt} />
      </div>
      <h1 id="hero-title">{t.heroTitle}</h1>
      <p className="hero-sentence">{t.heroSentence}</p>
      <div className="actions">
        <a className="btn primary" href={`mailto:${EMAIL}`}>{t.mail}</a>
        <a className="btn quiet" href={LINKEDIN}>{t.linkedin}</a>
      </div>
    </section>
  )
}

function AppId({ icon, name, status }: { icon: string; name: string; status: string }) {
  return (
    <div className="app-id">
      <img src={icon} width={240} height={240} alt="" />
      <div>
        <strong>{name}</strong>
        <span>{status}</span>
      </div>
    </div>
  )
}

function Tiles({ items, icons }: { items: [string, string][]; icons: IconName[] }) {
  return (
    <ul className="tiles">
      {items.map(([title, line], i) => (
        <li key={title}>
          <Icon name={icons[i]} />
          <strong>{title}</strong>
          <span>{line}</span>
        </li>
      ))}
    </ul>
  )
}

function Chips({ items }: { items: string[] }) {
  return <ul className="chips" aria-label="Stack">{items.map((c) => <li key={c}>{c}</li>)}</ul>
}

function Project({ id, tone, alt, head, children, aside }: { id: string; tone: 'mrp' | 'rr'; alt?: boolean; head: ReactNode; children: ReactNode; aside: ReactNode }) {
  return (
    <section className={`project tone-${tone}${alt ? ' alt' : ''}`} id={id} aria-labelledby={`${id}-title`}>
      <div className="container project-grid">
        <div className="project-head">{head}</div>
        <div className="project-aside">{aside}</div>
        <div className="project-body">{children}</div>
      </div>
    </section>
  )
}

function Page() {
  const { t } = useLang()
  return (
    <>
      <Nav />
      <main>
        <Hero />

        <Project id="myrecipal" tone="mrp" alt aside={<Phone />} head={<>
          <AppId icon="/images/icons/myrecipal.webp" name="MyReciPal" status={t.mrpStatus} />
          <h2 id="myrecipal-title">{t.mrpTitle}</h2>
          <p className="lede">{t.mrpLede}</p>
        </>}>
          <Tiles items={t.mrpTiles} icons={['offline', 'sync', 'spark', 'cloud', 'share']} />
          <Chips items={['SwiftUI', 'SwiftData', 'Foundation Models', 'Laravel', 'PostgreSQL']} />
          <a className="btn primary" href="https://testflight.apple.com/join/MbgnEzdk">{t.mrpBeta}</a>
        </Project>

        <Project id="reviewradar" tone="rr" aside={<ReviewRadarPanel />} head={<>
          <AppId icon="/images/icons/reviewradar.webp" name="ReviewRadar" status={t.rrStatus} />
          <h2 id="reviewradar-title">{t.rrTitle}</h2>
          <p className="lede">{t.rrLede}</p>
        </>}>
          <Tiles items={t.rrTiles} icons={['people', 'doc', 'bell']} />
          <Chips items={['Swift', 'SwiftUI', 'Foundation Models', 'GitHub API', 'Bitbucket API', 'Jira API']} />
          <a className="btn primary" href="https://testflight.apple.com/join/aDbNgHKU">{t.rrBeta}</a>
        </Project>

        <section className="web alt" id="web" aria-labelledby="web-title">
          <div className="container web-grid">
            <div className="web-head">
              <p className="web-status">Café Piedra Lipe, {t.webStatus.toLowerCase()}</p>
              <h2 id="web-title">{t.webTitle}</h2>
              <p className="lede">{t.webLede}</p>
              <a className="btn primary" href="https://cafepiedralipe.co" target="_blank" rel="noopener">{t.webVisit}</a>
            </div>
            <div className="web-shots">
              <img className="web-mac" src="/images/piedralipe/macbook.webp" width={1600} height={981} alt={t.webAltDesktop} loading="lazy" />
              <img className="web-iphone" src="/images/piedralipe/iphone.webp" width={600} height={1237} alt={t.webAltPhone} loading="lazy" />
            </div>
          </div>
        </section>

        <section className="experience" id="experience" aria-labelledby="exp-title">
          <div className="container exp-grid">
            <div className="exp-head">
              <h2 id="exp-title">{t.expTitle}</h2>
              <p className="lede">{t.expLede}</p>
            </div>
            <Timeline />
          </div>
        </section>

        <section className="contact alt" id="contact" aria-labelledby="contact-title">
          <div className="container contact-inner">
            <h2 id="contact-title">{t.contactTitle}</h2>
            <p className="lede">{t.contactSentence}</p>
            <div className="actions">
              <a className="btn primary" href={`mailto:${EMAIL}`}>{t.mail}</a>
              <a className="btn quiet" href={LINKEDIN}>{t.linkedin}</a>
            </div>
            <p className="contact-address"><a href={`mailto:${EMAIL}`}>{EMAIL}</a></p>
          </div>
        </section>
      </main>
      <footer className="footer">
        <div className="container">
          <p>© 2026 Jan Hoffmann</p>
          <p data-credits>{t.credits}</p>
        </div>
      </footer>
    </>
  )
}

export default function App() {
  const [lang, setLangState] = useState<Lang>(initialLang)
  const value = useMemo(() => ({
    lang,
    t: strings[lang],
    setLang: (l: Lang) => {
      setLangState(l)
      try { localStorage.setItem('lang', l) } catch { /* storage blocked */ }
    },
  }), [lang])

  useEffect(() => {
    document.documentElement.lang = lang
    document.title = strings[lang].metaTitle
    document.querySelector('meta[name="description"]')?.setAttribute('content', strings[lang].metaDescription)
  }, [lang])

  return (
    <LangContext.Provider value={value}>
      <Page />
    </LangContext.Provider>
  )
}
