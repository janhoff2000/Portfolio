import type { ReactNode } from 'react'
import { CONTACT } from '../data/contact'
import { useLang } from '../i18n'

export type LegalPage = 'impressum' | 'privacy'

export const LEGAL_PATHS: Record<LegalPage, string> = { impressum: '/impressum', privacy: '/datenschutz' }

export function legalPageFor(pathname: string): LegalPage | null {
  const path = pathname.replace(/\/+$/, '').toLowerCase()
  if (path === LEGAL_PATHS.impressum) return 'impressum'
  if (path === LEGAL_PATHS.privacy) return 'privacy'
  return null
}

// Shows a field, or a marked gap so a missing detail can't go live unnoticed.
function Field({ value, missing }: { value: string; missing: string }) {
  return value ? <>{value}</> : <mark className="legal-missing">{missing}</mark>
}

function Address() {
  const { lang } = useLang()
  const de = lang === 'de'
  return (
    <address>
      {CONTACT.name}<br />
      <Field value={CONTACT.street} missing={de ? 'Straße und Hausnummer fehlen' : 'Street and number missing'} /><br />
      <Field value={CONTACT.city} missing={de ? 'PLZ und Ort fehlen' : 'Postcode and city missing'} /><br />
      {de ? 'Deutschland' : 'Germany'}
    </address>
  )
}

function Mail() {
  return <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
}

function Phone() {
  const { lang } = useLang()
  return CONTACT.phone
    ? <a href={`tel:${CONTACT.phone}`}>{CONTACT.phoneDisplay || CONTACT.phone}</a>
    : <Field value="" missing={lang === 'de' ? 'Telefonnummer fehlt' : 'Phone number missing'} />
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2>{title}</h2>
      {children}
    </section>
  )
}

function Impressum() {
  const { lang } = useLang()
  if (lang === 'de') {
    return (
      <>
        <h1 id="legal-title">Impressum</h1>
        <p>Angaben gemäß § 5 DDG</p>
        <Address />
        <Section title="Kontakt">
          <p>E-Mail: <Mail /><br />Telefon: <Phone /></p>
        </Section>
      </>
    )
  }
  return (
    <>
      <h1 id="legal-title">Impressum</h1>
      <p>Legal notice under § 5 of the German Digital Services Act (DDG). The <GermanVersion /> is the one that counts.</p>
      <Address />
      <Section title="Contact">
        <p>Email: <Mail /><br />Phone: <Phone /></p>
      </Section>
    </>
  )
}

function Privacy() {
  const { lang } = useLang()
  if (lang === 'de') {
    return (
      <>
        <h1 id="legal-title">Datenschutz</h1>
        <p>Stand: November 2026</p>

        <Section title="Kurz gesagt">
          <p>Diese Seite setzt keine Cookies, nutzt kein Tracking und keine Analyse-Tools und lädt keine Inhalte von anderen Anbietern nach. Personenbezogene Daten fallen nur an, wenn die Seite ausgeliefert wird und wenn Sie mich kontaktieren.</p>
        </Section>

        <Section title="Verantwortlich">
          <Address />
          <p>E-Mail: <Mail /></p>
        </Section>

        <Section title="Hosting">
          <p>Die Seite wird über Cloudflare ausgeliefert (Cloudflare, Inc., 101 Townsend St., San Francisco, CA 94107, USA). Beim Aufruf verarbeitet Cloudflare technisch notwendige Verbindungsdaten, etwa Ihre IP-Adresse, Datum und Uhrzeit, die aufgerufene Adresse sowie Angaben zu Browser und Betriebssystem. Das dient dazu, die Seite auszuliefern und vor Angriffen zu schützen.</p>
          <p>Rechtsgrundlage ist mein berechtigtes Interesse an einer sicheren und erreichbaren Website (Art. 6 Abs. 1 lit. f DSGVO). Cloudflare verarbeitet die Daten in meinem Auftrag (Art. 28 DSGVO) und kann sie auch in den USA verarbeiten. Cloudflare ist nach dem EU-US Data Privacy Framework zertifiziert, für das ein Angemessenheitsbeschluss der EU-Kommission besteht (Art. 45 DSGVO). Ich selbst werte diese Daten nicht aus und speichere sie nicht.</p>
        </Section>

        <Section title="Kontakt per E-Mail oder Telefon">
          <p>Wenn Sie mir schreiben oder mich anrufen, verarbeite ich Ihre Angaben, um Ihnen zu antworten. Geht es um eine Stelle oder ein Projekt, ist die Rechtsgrundlage Art. 6 Abs. 1 lit. b DSGVO, sonst mein berechtigtes Interesse, Anfragen zu beantworten (Art. 6 Abs. 1 lit. f DSGVO). E-Mails speichert mein E-Mail-Anbieter in meinem Auftrag. Ich lösche Ihre Nachrichten, sobald ich sie nicht mehr brauche, es sei denn, gesetzliche Aufbewahrungspflichten stehen dem entgegen.</p>
        </Section>

        <Section title="Spracheinstellung">
          <p>Wenn Sie die Sprache wechseln, speichert die Seite Ihre Wahl („de“ oder „en“) im Speicher Ihres Browsers (localStorage), damit sie beim nächsten Besuch erhalten bleibt. Der Wert verlässt Ihr Gerät nicht. Diese Speicherung ist für die von Ihnen gewünschte Funktion unbedingt erforderlich und braucht daher keine Einwilligung (§ 25 Abs. 2 Nr. 2 TDDDG). Sie können den Wert jederzeit in Ihrem Browser löschen.</p>
        </Section>

        <Section title="Links zu anderen Seiten">
          <p>Die Links zu LinkedIn, GitHub, TestFlight und cafepiedralipe.co übertragen erst dann Daten an diese Anbieter, wenn Sie sie anklicken. Ab dann gelten deren Datenschutzhinweise.</p>
        </Section>

        <Section title="Ihre Rechte">
          <p>Sie haben das Recht auf Auskunft (Art. 15 DSGVO), Berichtigung (Art. 16), Löschung (Art. 17), Einschränkung der Verarbeitung (Art. 18), Datenübertragbarkeit (Art. 20) und Widerspruch gegen Verarbeitungen, die auf berechtigten Interessen beruhen (Art. 21). Eine E-Mail an mich genügt.</p>
          <p>Außerdem können Sie sich bei einer Datenschutz-Aufsichtsbehörde beschweren (Art. 77 DSGVO), etwa bei der für mich zuständigen: Landesbeauftragte für Datenschutz und Informationsfreiheit Nordrhein-Westfalen, <a href="https://www.ldi.nrw.de" target="_blank" rel="noopener">ldi.nrw.de</a>.</p>
          <p>Sie müssen mir keine Daten geben, um diese Seite zu nutzen. Eine automatisierte Entscheidungsfindung oder Profilbildung findet nicht statt.</p>
        </Section>
      </>
    )
  }
  return (
    <>
      <h1 id="legal-title">Privacy</h1>
      <p>Last updated November 2026. The <GermanVersion /> is the one that counts.</p>

      <Section title="In short">
        <p>This site sets no cookies, uses no tracking or analytics and loads nothing from other providers. Personal data is only processed when the site is delivered to you and when you contact me.</p>
      </Section>

      <Section title="Who is responsible">
        <Address />
        <p>Email: <Mail /></p>
      </Section>

      <Section title="Hosting">
        <p>The site is delivered by Cloudflare (Cloudflare, Inc., 101 Townsend St., San Francisco, CA 94107, USA). When you open it, Cloudflare processes the connection data needed to do so, such as your IP address, date and time, the requested address and details about your browser and operating system. This is used to deliver the site and protect it from attacks.</p>
        <p>The legal basis is my legitimate interest in a secure, reachable website (Art. 6(1)(f) GDPR). Cloudflare processes the data on my behalf (Art. 28 GDPR) and may do so in the USA. Cloudflare is certified under the EU-US Data Privacy Framework, which the European Commission has found adequate (Art. 45 GDPR). I don't analyse or store this data myself.</p>
      </Section>

      <Section title="Contact by email or phone">
        <p>If you write to me or call me, I use what you send me to reply. If it is about a job or a project, the legal basis is Art. 6(1)(b) GDPR; otherwise it is my legitimate interest in answering (Art. 6(1)(f) GDPR). My email provider stores emails on my behalf. I delete your messages once I no longer need them, unless the law requires me to keep them.</p>
      </Section>

      <Section title="Language setting">
        <p>When you switch the language, the site stores your choice (“de” or “en”) in your browser’s storage (localStorage) so it stays the same on your next visit. The value never leaves your device. It is strictly necessary for a feature you asked for, so it needs no consent (§ 25(2) no. 2 TDDDG). You can delete it in your browser at any time.</p>
      </Section>

      <Section title="Links to other sites">
        <p>The links to LinkedIn, GitHub, TestFlight and cafepiedralipe.co only send data to those providers once you click them. From then on, their privacy policies apply.</p>
      </Section>

      <Section title="Your rights">
        <p>You have the right to access (Art. 15 GDPR), rectification (Art. 16), erasure (Art. 17), restriction of processing (Art. 18), data portability (Art. 20) and to object to processing based on legitimate interests (Art. 21). An email to me is enough.</p>
        <p>You can also complain to a data protection authority (Art. 77 GDPR), for example the one responsible for me: Landesbeauftragte für Datenschutz und Informationsfreiheit Nordrhein-Westfalen, <a href="https://www.ldi.nrw.de" target="_blank" rel="noopener">ldi.nrw.de</a>.</p>
        <p>You don’t have to give me any data to use this site. There is no automated decision-making or profiling.</p>
      </Section>
    </>
  )
}

// The English pages point to the German text, which is the binding one.
function GermanVersion() {
  const { setLang } = useLang()
  return <button type="button" className="link-btn" onClick={() => setLang('de')}>German version</button>
}

export function Legal({ page }: { page: LegalPage }) {
  const { t } = useLang()
  return (
    <section className="legal container" aria-labelledby="legal-title">
      <a className="legal-back" href="/">{t.legalBack}</a>
      {page === 'impressum' ? <Impressum /> : <Privacy />}
    </section>
  )
}
