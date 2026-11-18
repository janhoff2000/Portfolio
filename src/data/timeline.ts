// From career-ops/cv.md. Newest first.
export type Kind = 'work' | 'project' | 'edu'
type Text = { title: string; org: string; points: string[] }
export type Entry = {
  kind: Kind
  from: string | null
  to: string | null
  current?: boolean
  beta?: boolean
  link?: string
  external?: boolean
  tags?: string[]
  en: Text
  de: Text
}

export const timeline: Entry[] = [
  {
    kind: 'work', from: '2026-06', to: null, current: true, tags: ['React', 'TypeScript', 'Go', 'Grafana', 'WebViews', 'Jenkins', 'Jira', 'Kanban'],
    en: {
      title: 'Junior Software Developer, Full Stack', org: 'CHECK24 Hotel, Münster', points: [
        'Moved from iOS to full stack three months before the launch of the rewritten hotel comparison, on a team of about 26. Live since October 2026, with higher conversion.',
        'Built a widget that lets users resume a booking they dropped out of, and sent the dropout data to the legacy booking system to trigger reminders.',
        'Added basket polling that recovers bookings after a connection drop, so users no longer see false failure messages.',
        'Built a search mask with personal suggestions, connected to the existing free-text hotel search.',
        'Built instant page transitions and a native shimmer, so the web app feels native inside the iOS and Android apps, WebView startup included.',
        'Still responsible for native changes on iOS and Android: WebViews and the app bridge.',
      ],
    },
    de: {
      title: 'Junior Software Developer, Full Stack', org: 'CHECK24 Hotel, Münster', points: [
        'Drei Monate vor dem Launch des neu gebauten Hotelvergleichs von iOS ins Full-Stack-Team gewechselt, rund 26 Leute. Live seit Oktober 2026, mit höherer Conversion.',
        'Ein Widget gebaut, mit dem Nutzer eine abgebrochene Buchung fortsetzen, und die Abbruchdaten ans alte Buchungssystem geschickt, das daraufhin erinnert.',
        'Basket-Polling eingebaut, das Buchungen nach einem Verbindungsabbruch rettet, statt eine falsche Fehlermeldung zu zeigen.',
        'Eine Suchmaske mit persönlichen Vorschlägen gebaut, angebunden an die bestehende Freitext-Hotelsuche.',
        'Sofortige Seitenwechsel und einen nativen Shimmer gebaut, damit sich die Web-App in den iOS- und Android-Apps nativ anfühlt, inklusive WebView-Start.',
        'Weiter zuständig für native Anpassungen unter iOS und Android: WebViews und die App-Bridge.',
      ],
    },
  },
  {
    kind: 'work', from: '2025-07', to: '2026-05', tags: ['Swift', 'SwiftUI', 'UIKit', 'PHP', 'Sentry', 'Jenkins', 'Jira', 'Kanban'],
    en: {
      title: 'Junior Software Developer, iOS', org: 'CHECK24 Hotel, Münster', points: [
        'Built and improved features for a large-scale iOS app used by millions.',
        'Made the app more stable through debugging and Sentry monitoring.',
        'Designed data contracts and feature logic across iOS and the PHP app middleware.',
        'Built LLM command workflows that cut ticket drafting time and made specifications clearer.',
      ],
    },
    de: {
      title: 'Junior Software Developer, iOS', org: 'CHECK24 Hotel, Münster', points: [
        'Features für eine große iOS-App mit Millionen Nutzern gebaut und verbessert.',
        'Die App durch Debugging und Sentry-Monitoring stabiler gemacht.',
        'Datenverträge und Feature-Logik zwischen iOS und der PHP-Middleware entworfen.',
        'LLM-Workflows gebaut, mit denen Tickets schneller geschrieben und Spezifikationen klarer werden.',
      ],
    },
  },
  {
    kind: 'work', from: '2023-08', to: '2025-06', tags: ['Swift', 'iOS', 'PHP', 'Jenkins', 'Jira', 'Kanban'],
    en: {
      title: 'Apprentice, Software Development', org: 'CHECK24 Hotel, Münster', points: [
        'Final IHK project: an Express Checkout across iOS and middleware, from concept to documentation.',
        'Built a reusable inactivity layer used across several parts of the app.',
        'Improved stability and UX through small features and continuous bug fixing.',
      ],
    },
    de: {
      title: 'Auszubildender, Anwendungsentwicklung', org: 'CHECK24 Hotel, Münster', points: [
        'IHK-Abschlussprojekt: ein Express Checkout für iOS und Middleware, vom Konzept bis zur Dokumentation.',
        'Eine wiederverwendbare Inaktivitäts-Ebene gebaut, die in mehreren Bereichen der App läuft.',
        'Stabilität und UX mit kleinen Features und laufenden Bugfixes verbessert.',
      ],
    },
  },
  {
    kind: 'edu', from: '2023', to: '2025', tags: ['Java'],
    en: { title: 'Certified Application Developer (Fachinformatiker, IHK)', org: 'Ludwig Erhard Berufskolleg, Münster', points: [] },
    de: { title: 'Fachinformatiker für Anwendungsentwicklung (IHK)', org: 'Ludwig-Erhard-Berufskolleg, Münster', points: [] },
  },
  {
    kind: 'edu', from: '2020', to: '2023', tags: ['Java', 'C', 'Python'],
    en: { title: 'Computer Science, no degree', org: 'FH Münster', points: [] },
    de: { title: 'Informatik, ohne Abschluss', org: 'FH Münster', points: [] },
  },
  {
    kind: 'edu', from: '2019', to: '2020',
    en: { title: 'Language year abroad', org: 'EF Language School, Vancouver', points: [] },
    de: { title: 'Sprachjahr im Ausland', org: 'EF Language School, Vancouver', points: [] },
  },
  {
    kind: 'edu', from: '2011', to: '2019',
    en: { title: 'Abitur', org: 'St. Ursula Gymnasium', points: [] },
    de: { title: 'Abitur', org: 'St.-Ursula-Gymnasium', points: [] },
  },
]
