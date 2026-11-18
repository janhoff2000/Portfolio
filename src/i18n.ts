import { createContext, useContext } from 'react'

export type Lang = 'en' | 'de'

const en = {
  metaTitle: 'Jan Hoffmann, junior iOS and full-stack developer',
  metaDescription: 'Jan Hoffmann, iOS and full-stack developer, open to remote roles. Try MyReciPal and ReviewRadar right on the page.',
  navMrp: 'MyReciPal',
  navRr: 'ReviewRadar',
  navWeb: 'Web',
  navExp: 'Experience',
  navContact: 'Contact',
  langLabel: 'Language',

  heroTitle: 'Junior iOS and full‑stack developer.',
  heroSentence: "I work on CHECK24's hotel comparison app, used by millions. These two are mine.",
  mail: 'Email me',
  linkedin: 'LinkedIn',
  portraitAlt: 'Jan Hoffmann',

  mrpStatus: 'iPhone, iOS 26+, beta on TestFlight',
  mrpTitle: 'Recipes from TikTok, ready to cook.',
  mrpLede: 'Saves recipes from posts and websites, then builds the shopping list.',
  mrpTiles: [
    ['Offline first', 'Seven SwiftData schema versions, migrated in place.'],
    ['Two-way sync', 'Laravel and PostgreSQL, conflicts settled by version.'],
    ['On-device import', 'Foundation Models, server fallback.'],
    ['Background import', 'An LLM extracts the recipe; a push says when the recipe is ready.'],
    ['Share Extension', 'Save straight from social media or any website.'],
  ] as [string, string][],
  mrpLimit: "If the steps only live in the video, it won't invent them.",
  mrpBeta: 'Join the MyReciPal beta',
  phoneHint: 'Tap, scroll, go back.',
  phoneLabel: 'MyReciPal, interactive',
  settingsToast: 'Settings are not part of this demo.',

  rrStatus: 'Mac menu bar, macOS 26.6+, beta on TestFlight',
  rrTitle: 'The pull requests waiting on me, in the menu bar.',
  rrLede: 'GitHub, Bitbucket and Jira in one panel: ready to merge or needs work.',
  rrTiles: [
    ['Reviewer suggestions', 'From local git history and open review load.'],
    ['Ticket summaries', "Written on the Mac by Apple's on-device model."],
    ['Notifications', 'For new review requests and PRs ready to merge.'],
  ] as [string, string][],
  rrLimit: 'macOS 26.6+. The panel shows the app’s sample data.',
  rrBeta: 'Join the ReviewRadar beta',
  rrHint: 'Switch My PRs and Reviews.',
  rrMine: 'My PRs',
  rrReviews: 'Reviews',
  light: 'Light',
  dark: 'Dark',
  appearance: 'Appearance',
  rrAlt: 'ReviewRadar panel with sample pull requests',

  webStatus: 'Website, live',
  webTitle: 'A website for a Colombian coffee brand.',
  webLede: 'I designed and built cafepiedralipe.co: the look, the layout and the UX.',
  webVisit: 'Visit cafepiedralipe.co',
  webAltDesktop: 'cafepiedralipe.co on a MacBook: coffee cherries and the headline Exotic Coffee, Single Origin',
  webAltPhone: 'cafepiedralipe.co on an iPhone',

  expTitle: 'Three years at CHECK24.',
  expLede: 'From apprentice to iOS to full stack in three years.',

  contactTitle: 'Open to junior roles in iOS or full stack, ideally remote.',
  contactSentence: 'At home in European time zones, and happy to overlap with a team anywhere in the world. English or German.',
  contactSetupLabel: 'How I like to work',
  contactSetup: ['Full remote preferred', 'European time zones', 'Worldwide teams welcome'],
  github: 'GitHub',
  impressum: 'Impressum',
  privacy: 'Privacy',
  legalBack: '← Back to the portfolio',
  credits: 'Recipes, creators and food photos in the MyReciPal screens are samples. The food photos and the creator avatars were generated with fal.ai. Device images: Apple.',
}

export type Strings = typeof en

const de: Strings = {
  metaTitle: 'Jan Hoffmann, Junior iOS- und Full-Stack-Entwickler',
  metaDescription: 'Jan Hoffmann, iOS- und Full-Stack-Entwickler, offen für Remote-Stellen. MyReciPal und ReviewRadar direkt auf der Seite ausprobieren.',
  navMrp: 'MyReciPal',
  navRr: 'ReviewRadar',
  navWeb: 'Web',
  navExp: 'Erfahrung',
  navContact: 'Kontakt',
  langLabel: 'Sprache',

  heroTitle: 'Junior iOS- und Full‑Stack‑Entwickler.',
  heroSentence: 'Ich arbeite an der Hotelvergleichs-App von CHECK24 mit Millionen Nutzern. Diese zwei sind meine.',
  mail: 'E-Mail schreiben',
  linkedin: 'LinkedIn',
  portraitAlt: 'Jan Hoffmann',

  mrpStatus: 'iPhone, iOS 26+, Beta in TestFlight',
  mrpTitle: 'Rezepte von TikTok, bereit zum Kochen.',
  mrpLede: 'Speichert Rezepte aus Posts und von Websites und erstellt die Einkaufsliste.',
  mrpTiles: [
    ['Offline zuerst', 'Sieben SwiftData-Schemaversionen, direkt migriert.'],
    ['Sync in beide Richtungen', 'Laravel und PostgreSQL, Konflikte löst die Version.'],
    ['Import auf dem Gerät', 'Foundation Models, Server als Fallback.'],
    ['Import im Hintergrund', 'Ein LLM extrahiert das Rezept; eine Mitteilung meldet das fertige Rezept.'],
    ['Share Extension', 'Direkt aus sozialen Medien oder von jeder Website speichern.'],
  ],
  mrpLimit: 'Stehen die Schritte nur im Video, erfindet die App keine.',
  mrpBeta: 'MyReciPal-Beta beitreten',
  phoneHint: 'Tippen, scrollen, zurück.',
  phoneLabel: 'MyReciPal, interaktiv',
  settingsToast: 'Einstellungen sind nicht Teil dieser Demo.',

  rrStatus: 'Mac-Menüleiste, macOS 26.6+, Beta in TestFlight',
  rrTitle: 'Die Pull Requests, die auf mich warten, in der Menüleiste.',
  rrLede: 'GitHub, Bitbucket und Jira in einem Panel: bereit zum Mergen oder braucht Arbeit.',
  rrTiles: [
    ['Reviewer-Vorschläge', 'Aus der lokalen Git-Historie und der Review-Last.'],
    ['Ticket-Zusammenfassungen', 'Auf dem Mac geschrieben, von Apples On-Device-Modell.'],
    ['Mitteilungen', 'Bei neuen Review-Anfragen und PRs, die gemergt werden können.'],
  ],
  rrLimit: 'macOS 26.6+. Das Panel zeigt die Beispieldaten der App.',
  rrBeta: 'ReviewRadar-Beta beitreten',
  rrHint: '„My PRs“ und „Reviews“ wechseln.',
  rrMine: 'Meine PRs',
  rrReviews: 'Reviews',
  light: 'Hell',
  dark: 'Dunkel',
  appearance: 'Darstellung',
  rrAlt: 'ReviewRadar-Panel mit Beispiel-Pull-Requests',

  webStatus: 'Website, live',
  webTitle: 'Eine Website für eine kolumbianische Kaffeemarke.',
  webLede: 'cafepiedralipe.co habe ich gestaltet und gebaut: Look, Layout und UX.',
  webVisit: 'cafepiedralipe.co besuchen',
  webAltDesktop: 'cafepiedralipe.co auf einem MacBook: Kaffeekirschen und die Überschrift Exotic Coffee, Single Origin',
  webAltPhone: 'cafepiedralipe.co auf einem iPhone',

  expTitle: 'Drei Jahre bei CHECK24.',
  expLede: 'Vom Azubi über iOS bis Full Stack in drei Jahren.',

  contactTitle: 'Offen für Junior-Stellen in iOS oder Full Stack, am liebsten remote.',
  contactSentence: 'Zu Hause in europäischen Zeitzonen und gern im Takt mit einem Team irgendwo auf der Welt. Auf Deutsch oder Englisch.',
  contactSetupLabel: 'So arbeite ich am liebsten',
  contactSetup: ['Komplett remote bevorzugt', 'Europäische Zeitzonen', 'Teams weltweit willkommen'],
  github: 'GitHub',
  impressum: 'Impressum',
  privacy: 'Datenschutz',
  legalBack: '← Zurück zum Portfolio',
  credits: 'Rezepte, Creator und Food-Fotos in den MyReciPal-Screens sind Beispiele. Food-Fotos und Creator-Avatare wurden mit fal.ai erzeugt. Gerätebilder: Apple.',
}

export const strings: Record<Lang, Strings> = { en, de }

export function initialLang(): Lang {
  try {
    const saved = localStorage.getItem('lang')
    if (saved === 'en' || saved === 'de') return saved
  } catch {
    // storage blocked: fall back to the browser language
  }
  const langs = navigator.languages?.length ? navigator.languages : [navigator.language]
  return langs.some((l) => /^de\b/i.test(l)) ? 'de' : 'en'
}

export const LangContext = createContext<{ lang: Lang; t: Strings; setLang: (l: Lang) => void }>({
  lang: 'en',
  t: en,
  setLang: () => {},
})

export const useLang = () => useContext(LangContext)
