# Design: Jan Hoffmann portfolio

The locked system. Every Hallmark run reads this first and pages share it. Change it on purpose; the file is the rule.

## System
- Genre: modern-minimal
- Shape of the first page: a centred introduction, then one section per app with the working app on the right (an interactive iPhone, the ReviewRadar panel), then the experience timeline and contact
- Theme: custom (vibe: "Apple product page for an app developer")
- Axes: light/system-sans/cool · posture: quiet, the product is the picture
- Picked in explore rounds 1 to 3 (explore/round-3, "tiles"): light over dark, feature tiles over a fact list

## Tokens
`src/tokens.css` is the source of truth. The roles:
```css
:root {
  --color-paper: oklch(0.988 0.002 286);  --color-paper-2: oklch(0.965 0.003 286);  --color-paper-3: oklch(1 0 0);
  --color-ink: oklch(0.235 0.004 286);  --color-ink-2: oklch(0.53 0.008 286);  --color-muted: oklch(0.62 0.006 286);  --color-rule: oklch(0.86 0.006 286);
  --color-accent: oklch(0.55 0.17 255);  --color-accent-ink: oklch(1 0 0);  --color-mrp: oklch(0.56 0.16 40);  --color-focus: oklch(0.55 0.17 255);
  --font-display: -apple-system, "SF Pro Display", system-ui;  --font-body: -apple-system, "SF Pro Text", system-ui;
  --radius-tile: 18px;  --radius-pill: 999px;  --rule-hair: 1px;  --shadow-tile: 0 0 0 1px rgb(0 0 0 / 0.06);
}
```
The system font is the choice: SF Pro on Apple devices, which is where an iOS developer's work is read. Each app keeps its own colour: MyReciPal orange, ReviewRadar blue.

## Components
- Project section: app icon, name and status line; a short headline (at most 15ch); one sentence; feature tiles (white, 18px radius, icon, bold title, one line); stack chips; one limit; the TestFlight button.
- Device: Apple's iPhone 18 Pro bezel (Silver), used as provided: no shadow, tilt, crop or animation. Only the screen inside moves.
- Timeline: one line, newest first, with work, projects and education, and Work/Projects/Education filters.

## Controls
- Primary: solid fill (ink, or the app's colour) · pill · 44px tall
- Secondary: text link in the accent colour with a "›" after it · same height

## Motion
- Character: calm. The hero enters once. The iPhone pushes screens like iOS (0.42s). The ReviewRadar panel switches instantly. Under reduced motion everything ends at once.

## Language
- English and German, written separately. The browser language decides, a toggle overrides, and the choice is remembered. German avoids direct address until du or Sie is decided.

## Exports
`src/tokens.css` in this project.
