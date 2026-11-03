# Sangam Gala

A responsive, web-native event proposal inspired by the original Sangam Gala pitch: gold typography, botanical artwork, an atmospheric hero, and accessible HTML content.

## Run locally

`python3 -m http.server 4173`

Open http://localhost:4173. No dependencies or build step. GitHub Pages serves the website directly from `main` → `/ (root)`. The root `index.html` is the entry point; `CNAME` retains the custom domain.

## Features

- Vision / execution navigation; execution opens with Marketing, Creative, Socials or Operations, Events.
- Marketing campaign timeline with a whole-season weekly map, week details, post/ticket filters, animated artwork previews and historical society comparisons.
- All 11 Sangam milestones target 21 November 2027. ISC/SLA dates are projected from 2026 onto the same month/day in 2027 and clearly labelled. Approximate SLA dates remain an approximate window.
- Six original marketing graphics are preserved. The save-the-date and reveal previews flag their outdated 22 November date.
- Fonts, colours and details design-system tabs with annotated wordmark and supplied references.
- Other creative assets: 16 categories with a scroll-aware submenu, seven supplied artwork/reference previews and spaces for upcoming designs. The submenu stays beside the work on desktop and becomes a horizontal strip on mobile.
- Static planning list; venue outreach marked in progress. Status updates are maintained in the source.
- Multilingual Sangam lettering sweeps in from the left and resolves to the wordmark.

- Fullscreen black society chooser, followed by six personalised introductions and a scroll prompt.
- Slide-inspired executive profile with an arch, botanical background, dark gradient and structured details.

- Supplied Sangam logo in the header, hero and footer.
- Responsive story, cause shortlist, evening timeline, auction and collaboration sections.
- Nine original inspiration photos with previous/next controls, direct selection, arrow keys and touch swipes.
- Subtle canvas glitter and scroll reveals; motion toggle and system reduced-motion support.
- Executive Experience Auction wording, illustrative service perk and proposed participation safeguards. No claim of university approval.
- Footer link to the unchanged original 12-page pitch PDF (approximately 41 MB).

## Edit

Content: `index.html`. Design: `style.css`. Gallery and navigation: `app.js`. Campaign data: `campaign-data.mjs`; timeline interactions: `campaign.js`; timeline styles: `campaign.css`; creative collection styles: `creative.css`. Artwork and original pitch: `assets/`.

The site is a proposal. The planning date is 21 November 2027; venue, beneficiary, final auction lots and university review remain to be confirmed. There is no ticket checkout or live bidding.
