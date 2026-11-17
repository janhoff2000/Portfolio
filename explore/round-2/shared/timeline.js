// Experience timeline, from career-ops/cv.md. Newest first.
(function () {
  const items = [
    { kind: 'project', from: '2026-11', to: null, status: 'beta',
      en: { title: 'ReviewRadar', org: 'Own project, Mac menu bar app', points: ['Shows the pull requests waiting on me across GitHub, Bitbucket and Jira.', 'Suggests reviewers from local git history; summarises tickets with Apple\'s on-device model.'] },
      de: { title: 'ReviewRadar', org: 'Eigenes Projekt, Menüleisten-App für den Mac', points: ['Zeigt die Pull Requests, die auf mich warten, aus GitHub, Bitbucket und Jira.', 'Schlägt Reviewer aus der lokalen Git-Historie vor und fasst Tickets mit Apples On-Device-Modell zusammen.'] },
      tags: ['Swift', 'SwiftUI', 'Foundation Models'], link: '#reviewradar' },
    { kind: 'work', from: '2026-06', to: null, current: true,
      en: { title: 'Junior Software Developer, Full Stack', org: 'CHECK24 Hotel, Münster', points: [
        'Moved from iOS to full stack three months before the launch of the rewritten hotel comparison, on a team of about 26. Live since October 2026, with higher conversion.',
        'Built a widget that lets users resume a booking they dropped out of, and sent the dropout data to the legacy booking system to trigger reminders.',
        'Added basket polling that recovers bookings after a connection drop, so users no longer see false failure messages.',
        'Built a search mask with personal suggestions, connected to the existing free-text hotel search.',
        'Built instant page transitions and a native shimmer, so the web app feels native inside the iOS and Android apps, WebView startup included.',
        'Still responsible for native changes on iOS and Android: WebViews and the app bridge.'] },
      de: { title: 'Junior Software Developer, Full Stack', org: 'CHECK24 Hotel, Münster', points: [
        'Drei Monate vor dem Launch des neu gebauten Hotelvergleichs von iOS ins Full-Stack-Team gewechselt, rund 26 Leute. Live seit Oktober 2026, mit höherer Conversion.',
        'Ein Widget gebaut, mit dem Nutzer eine abgebrochene Buchung fortsetzen, und die Abbruchdaten ans alte Buchungssystem geschickt, das daraufhin erinnert.',
        'Basket-Polling eingebaut, das Buchungen nach einem Verbindungsabbruch rettet, statt eine falsche Fehlermeldung zu zeigen.',
        'Eine Suchmaske mit persönlichen Vorschlägen gebaut, angebunden an die bestehende Freitext-Hotelsuche.',
        'Sofortige Seitenwechsel und einen nativen Shimmer gebaut, damit sich die Web-App in den iOS- und Android-Apps nativ anfühlt, inklusive WebView-Start.',
        'Weiter zuständig für native Anpassungen unter iOS und Android: WebViews und die App-Bridge.'] },
      tags: ['React', 'TypeScript', 'Go', 'Grafana', 'WebViews'] },
    { kind: 'project', from: '2026', to: null,
      en: { title: 'Café Piedra Lipe', org: 'Website for a Colombian coffee brand', points: ['Designed and built cafepiedralipe.co: look, layout and UX.'] },
      de: { title: 'Café Piedra Lipe', org: 'Website für eine kolumbianische Kaffeemarke', points: ['cafepiedralipe.co gestaltet und gebaut: Look, Layout und UX.'] },
      tags: ['Web design'], link: 'https://cafepiedralipe.co', external: true },
    { kind: 'project', from: null, to: null, status: 'beta', ongoing: true,
      en: { title: 'MyReciPal', org: 'Own project, iPhone app', points: ['Saves recipes from TikTok, Instagram and websites into a library with a one-tap shopping list.', 'SwiftUI and SwiftData, a Laravel API with two-way sync to PostgreSQL, a Share Extension and AI recipe import.'] },
      de: { title: 'MyReciPal', org: 'Eigenes Projekt, iPhone-App', points: ['Speichert Rezepte von TikTok, Instagram und Websites in einer Sammlung, die Einkaufsliste ist einen Tipp entfernt.', 'SwiftUI und SwiftData, eine Laravel-API mit Sync in beide Richtungen zu PostgreSQL, eine Share Extension und KI-Rezeptimport.'] },
      tags: ['SwiftUI', 'SwiftData', 'Laravel', 'PostgreSQL'], link: '#myrecipal' },
    { kind: 'work', from: '2025-07', to: '2026-05',
      en: { title: 'Junior Software Developer, iOS', org: 'CHECK24 Hotel, Münster', points: [
        'Built and improved features for a large-scale iOS app used by millions.',
        'Made the app more stable through debugging and Sentry monitoring.',
        'Designed data contracts and feature logic across iOS and the PHP app middleware.',
        'Built LLM command workflows that cut ticket drafting time and made specifications clearer.'] },
      de: { title: 'Junior Software Developer, iOS', org: 'CHECK24 Hotel, Münster', points: [
        'Features für eine große iOS-App mit Millionen Nutzern gebaut und verbessert.',
        'Die App durch Debugging und Sentry-Monitoring stabiler gemacht.',
        'Datenverträge und Feature-Logik zwischen iOS und der PHP-Middleware entworfen.',
        'LLM-Workflows gebaut, mit denen Tickets schneller geschrieben und Spezifikationen klarer werden.'] },
      tags: ['Swift', 'SwiftUI', 'UIKit', 'PHP', 'Sentry'] },
    { kind: 'work', from: '2023-08', to: '2025-06',
      en: { title: 'Apprentice, Software Development', org: 'CHECK24 Hotel, Münster', points: [
        'Final IHK project: an Express Checkout across iOS and middleware, from concept to documentation.',
        'Built a reusable inactivity layer used across several parts of the app.',
        'Improved stability and UX through small features and steady bug fixing.'] },
      de: { title: 'Auszubildender, Anwendungsentwicklung', org: 'CHECK24 Hotel, Münster', points: [
        'IHK-Abschlussprojekt: ein Express Checkout für iOS und Middleware, vom Konzept bis zur Dokumentation.',
        'Eine wiederverwendbare Inaktivitäts-Ebene gebaut, die in mehreren Bereichen der App läuft.',
        'Stabilität und UX mit kleinen Features und laufenden Bugfixes verbessert.'] },
      tags: ['Swift', 'iOS', 'PHP'] },
    { kind: 'edu', from: '2023', to: '2025',
      en: { title: 'Certified Application Developer (Fachinformatiker, IHK)', org: 'Ludwig Erhard Berufskolleg, Münster', points: [] },
      de: { title: 'Fachinformatiker für Anwendungsentwicklung (IHK)', org: 'Ludwig-Erhard-Berufskolleg, Münster', points: [] } },
    { kind: 'edu', from: '2020', to: '2023',
      en: { title: 'Computer Science, no degree', org: 'FH Münster', points: [] },
      de: { title: 'Informatik, ohne Abschluss', org: 'FH Münster', points: [] } },
    { kind: 'edu', from: '2019', to: '2020',
      en: { title: 'Language year abroad', org: 'EF Language School, Vancouver', points: [] },
      de: { title: 'Sprachjahr im Ausland', org: 'EF Language School, Vancouver', points: [] } },
    { kind: 'edu', from: '2011', to: '2019',
      en: { title: 'Abitur', org: 'St. Ursula Gymnasium', points: [] },
      de: { title: 'Abitur', org: 'St.-Ursula-Gymnasium', points: [] } }
  ];

  const ui = {
    en: { all: 'All', work: 'Work', project: 'Projects', edu: 'Education', today: 'today', ongoing: 'ongoing', beta: 'Beta', now: 'Current',
      more: 'Show more', less: 'Show less', kinds: { work: 'Work', project: 'Project', edu: 'Education' }, open: 'Open' },
    de: { all: 'Alles', work: 'Arbeit', project: 'Projekte', edu: 'Ausbildung', today: 'heute', ongoing: 'laufend', beta: 'Beta', now: 'Aktuell',
      more: 'Mehr zeigen', less: 'Weniger zeigen', kinds: { work: 'Arbeit', project: 'Projekt', edu: 'Ausbildung' }, open: 'Öffnen' }
  };
  const months = { en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], de: ['Jan.', 'Feb.', 'März', 'Apr.', 'Mai', 'Juni', 'Juli', 'Aug.', 'Sep.', 'Okt.', 'Nov.', 'Dez.'] };
  const fmt = (d, l) => { if (!d) return ''; const [y, m] = d.split('-'); return m ? `${months[l][+m - 1]} ${y}` : y; };
  const range = (it, l) => {
    if (it.ongoing && !it.from) return ui[l].ongoing;
    const a = fmt(it.from, l); const b = it.to ? fmt(it.to, l) : ui[l].today;
    if (!it.to && it.kind === 'project' && it.from && it.from.length === 7) return `${a}, ${ui[l].ongoing}`;
    return `${a} – ${b}`;
  };
  const yearOf = (it) => (it.from ? it.from.slice(0, 4) : (it.ongoing ? '2026' : ''));
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  class Timeline {
    constructor(root, lang) { this.root = root; this.filter = 'all'; this.open = new Set(['1']); this.lang = lang || 'en'; this.render(); }
    setLang(l) { this.lang = l; this.render(); }
    render() {
      const l = this.lang, t = ui[l];
      const chips = ['all', 'work', 'project', 'edu'].map((k) => `<button type="button" class="tl-chip" data-f="${k}" aria-pressed="${this.filter === k}">${t[k]}</button>`).join('');
      let lastYear = null;
      const rows = items.map((it, i) => {
        if (this.filter !== 'all' && it.kind !== this.filter) return '';
        const c = it[l]; const y = yearOf(it); const showYear = y !== lastYear; lastYear = y;
        const id = String(i); const many = c.points.length > 2; const isOpen = this.open.has(id);
        const pts = c.points.length ? `<ul class="tl-points">${c.points.map((p, j) => `<li${many && !isOpen && j >= 2 ? ' hidden' : ''}>${esc(p)}</li>`).join('')}</ul>` : '';
        const tags = it.tags ? `<ul class="tl-tags" aria-label="Stack">${it.tags.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>` : '';
        const badge = it.current ? `<span class="tl-badge now">${t.now}</span>` : it.status === 'beta' ? `<span class="tl-badge beta">${t.beta}</span>` : '';
        const more = many ? `<button type="button" class="tl-more" data-id="${id}" aria-expanded="${isOpen}">${isOpen ? t.less : t.more}</button>` : '';
        const title = it.link ? `<a href="${it.link}"${it.external ? ' target="_blank" rel="noopener"' : ''}>${esc(c.title)}</a>` : esc(c.title);
        return `<li class="tl-item k-${it.kind}">
          <div class="tl-year" aria-hidden="${!showYear}">${showYear ? y : ''}</div>
          <div class="tl-node" aria-hidden="true"></div>
          <article class="tl-body">
            <p class="tl-meta"><span class="tl-kind">${t.kinds[it.kind]}</span><span class="tl-when">${range(it, l)}</span>${badge}</p>
            <h4 class="tl-title">${title}</h4>
            <p class="tl-org">${esc(c.org)}</p>
            ${pts}${more}${tags}
          </article>
        </li>`;
      }).join('');
      this.root.innerHTML = `<div class="tl-chips" role="group" aria-label="Filter">${chips}</div><ol class="tl">${rows}</ol>`;
      this.root.querySelectorAll('.tl-chip').forEach((b) => b.addEventListener('click', () => { this.filter = b.dataset.f; this.render(); }));
      this.root.querySelectorAll('.tl-more').forEach((b) => b.addEventListener('click', () => { const id = b.dataset.id; this.open.has(id) ? this.open.delete(id) : this.open.add(id); this.render(); this.root.querySelector(`.tl-more[data-id="${id}"]`)?.focus(); }));
    }
  }
  window.ExperienceTimeline = Timeline;
})();
