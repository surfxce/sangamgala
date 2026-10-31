# Sangam Gala

A lightweight, animated presentation website based on the supplied 12-page Sangam Gala proposal. The PDF artwork is preserved as optimised images, keeping its exact typography, botanical illustrations, colours and layout. Segmented entrances add motion without changing the original design.

## Preview

Run `python3 -m http.server 4173 --directory dist` and open http://localhost:4173.

No dependencies or build step. Deploy `dist/` to any static web host.

## Controls

Scroll, use the arrow buttons, or use arrow keys / Page Up / Page Down. Home and End jump to the first and last slides. Chapters opens direct navigation. Read slide provides selectable, accessible text, particularly useful on phones. Motion can be disabled, and the site respects reduced-motion system settings.

## Editing

Slide artwork lives in `dist/assets/`; headings and accessible transcripts are in `dist/slides.js`. Styling is in `dist/style.css`, behaviour in `dist/app.js`. This is an event proposal, so no ticket checkout or unconfirmed date/venue is invented.
