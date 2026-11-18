# Portfolio: where things stand (2026-11-17)

## Facts from the user
- Language: German and English, with a toggle and browser-language detection.
- Motion: not sure yet. The explore round will show none, subtle and expressive.
- Contact: email and LinkedIn only, no phone number.
- Projects: MyReciPal, ReviewRadar, cafepiedralipe.co. Both apps are work in progress and in TestFlight.
- TestFlight links:
  - ReviewRadar: https://testflight.apple.com/join/aDbNgHKU
  - MyReciPal: https://testflight.apple.com/join/MbgnEzdk (the CV still shows the old VNSEe6TA)
- myrecipal.com is not live yet.
- Portrait: the three HEICs in Downloads are travel photos (striped shirt). The studio headshot (navy sweater) was only pasted into the chat and is not on disk; ask the user for the file. The night-balcony photo (IMG_1630), cropped so only Jan is in it, went to fal and produced public/images/portrait/portrait-navy and portrait-wall. These are AI edits of his real face, so he should check the likeness.

## Done
- ReviewRadar panel captures: public/images/reviewradar/ (My PRs and Reviews, light and dark), from the app's preview sample data. The snapshot mode lives in a scratch copy only; the patch is in reviewradar-snapshot-patch.swift.
- MyReciPal screens captured: public/images/myrecipal/ (recipes, collections, collection-detail, detail, instructions, shopping), with demo.* creator handles.
- cafepiedralipe.co captured: public/images/piedralipe/.
- MyReciPal sample data: myrecipal-demo-data/ holds 6 recipes, 4 creators and 2 collections in recipes.json, plus fal food photos and illustrated avatars.

## Next
1. Round 1 is open at explore/round-1/index.html (serve the Portfolio folder: python3 -m http.server 8765 --bind 127.0.0.1). Waiting for the user's reaction.
2. Open questions for the user: du or Sie for German; MyReciPal start date (git says July 2025, CV says 2026); fal portrait or the studio headshot (send it as a file); likeness check on the fal portraits.
3. After the pick: log the reactions in ~/.claude/skills/site/taste-profile.md, write DESIGN.md and tokens.css, then build the full site with Hallmark custom in the Vite/React project.

## Round 2 brief (2026-11-17)
- The user wants a clean look that fits an iOS developer who is also full stack. The app showcases should be interactive, so it feels like using the app on the website.
- Bezels: Apple publishes official ones at developer.apple.com/design/resources (Product Bezels). Bezel-iPhone-18.dmg is 137 MB, Bezel-iPhone-17.dmg 253 MB, Bezel-MacBook-Air-M5.dmg 44 MB. Downloading waits for the user's yes.
- Apple's rules (App Store Marketing Guidelines, Product Images): use the bezels as they are, with no tilt, crop, shadow, animation or flip, and nothing on top. Use the latest-generation device. The screen must show the app as it runs. A generic device must not copy Apple-only details. So the bezel stays still while the screen inside is interactive, and the round-1 tilted phone fan and CSS phone frame are out.
- The iPhone 18 Pro simulator is available, so recapture MyReciPal on it to match the latest bezel.

## Round 2 state (2026-11-17)
- Interactive MyReciPal prototype: explore/round-2/shared/phone.js and phone.css, using images in public/images/myrecipal/proto/. These are iPhone 18 Pro Simulator captures, stitched into full-length scrollable screens, with tap areas over the app's controls: collections, recipe list, six recipes with ingredients and instructions, shopping list, tab bar and back.
- Bezel: Apple Design Resources license accepted at the user's request (2026-11-17). iPhone 18 Pro Silver (direction A) and Black (direction B) are in public/images/bezel/, with the screen opening at 72,69 sized 1206x2622, exactly the capture size. No shadow or entrance motion on the device, as Apple's rules require.
- Found while capturing: deep-linking from one recipe straight to another keeps the previous recipe's servings count (udon showed 3 servings and scaled quantities). Probably an app bug worth a look.
- Experience timeline (2026-11-17): shared/timeline.js and timeline.css, data taken from career-ops/cv.md. It has Work, Project and Education filters, and "Show more" on long entries. It is in both directions: A as its own section, B as the Experience card. LinkedIn couldn't be read because it shows a sign-in wall without an account. MyReciPal shows as "ongoing" until the start date is confirmed.
- Round 3 (2026-11-17): the user prefers light direction A, but wasn't sure about the left side of the project sections. explore/round-3 compares two new left sides on A: "tour" (a list of screens that drives the phone and panel and stays in sync, with tech details folded) and "tiles" (feature cards with icons, plus stack chips). Both add the real app icons (public/images/icons/), taken from the built apps. phone.js now has goTo(tab, path) and an onChange callback.

## Built (2026-11-17)
- The full site is in the Vite/React app (src/). DESIGN.md and src/tokens.css hold the locked system. Run it with `bun run dev`, deploy with `bun run deploy` (Wrangler).
- Checks: sloplint 0 FAIL (2 dismissed on record), copy-lint 0 FAIL, Impeccable clean at 1440 and 390. A fresh-context finish review gave "fix"; all 8 findings were addressed (the timeline is work and education only, the project tiles match, the demo comes first on phones, the hero names Münster).
- Still open: the studio headshot file, du or Sie, the MyReciPal start date, whether hokmajewelry.com should appear, a CV PDF, and a recapture of the creator handles if real ones are wanted.
- Café section (2026-11-17): the MacBook frame the user sent (screen at 217,144 sized 1566x1028, notch reaching y=184) and the iPhone 18 Pro bezel, composited with fresh captures of cafepiedralipe.co (desktop 1440x908 @2x, mobile 402x812 @3x, white status bar). The two sit side by side at real relative scale with no overlap or shadow. On phones only the iPhone shows, at 210px wide, to keep devices at least 200px tall.
- The portrait is now an unedited crop of IMG_1630 (public/images/portrait/jan.webp). The AI portraits are parked in explore/originals/ai-portraits; never use them.
- Café iPhone (2026-11-18): recaptured in the iPhone 18 Pro Simulator with real Safari (status bar 9:41, full battery), masked with the bezel's own screen shape so the corners match. The MyReciPal demo's corner radius is now 16.5%/7.6%, measured from the bezel.
- Portrait (2026-11-18): a real crop of the user's suit photo (explore/source-photos/suit-original.jpg), cropped to Jan only. No AI.
