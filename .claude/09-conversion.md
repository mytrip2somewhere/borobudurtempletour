# 09-conversion.md — Phase 9: Conversion (built-in, not retrofitted)

Generic. Read site specifics from `site.config.md`. Global rules live in root `CLAUDE.md`.
Full evidence base, avoid-list and gotchas: the `conversion-optimizer` skill
(`.claude/skills/conversion-optimizer/SKILL.md`). This file is the BUILD-TIME contract:
every page and article ships with its conversion layer from day one.

## PURPOSE
The primary KPI is affiliate clicks. On the first pipeline site this system was retrofitted
after launch; on every new site it is part of Phases 3-8, so nothing needs a second pass.

## 9.1 WHEN IT RUNS (woven into earlier phases, in this order)
- Phase 3 (design system): style the conversion components with the site's own palette:
  `.btn-xl`, `.cta-proof`, `.cta-box` (centered, top accent border, full-width button on
  mobile), `.sticky-cta` (mobile bottom bar + desktop floating pill; full-width bar on
  `body.article` pages). Include the `.prose a.btn-*` color overrides (invisible-button
  trap) and `.prose table` mobile containment FROM THE START.
- Phase 4 (blocks): the block library includes the CTA set below; the homepage map places a
  CTA after every major decision block (product tiers, requirements, location) plus the
  final reassurance banner. Money-page hero gets the value-led XL button.
- Phase 6 (content): every article template carries: one mid-article `{{ cta_box }}` after
  the main recommendation/comparison section, ONE bolded in-text affiliate link beside the
  matching internal tour link, and the centrally-rendered closing CTA with reassurance +
  honest urgency. This goes into the WRITER PROMPTS, not applied after.
- Phase 8 (scaffold): compile.mjs ships with the `{{ cta_box }}` token, `body_class`
  plumbing, sticky-bar markup in the base layout, and the GA4 `affiliate_click` delegated
  listener. These are compiler contracts (8.6e), present before the first page is written.

## 9.2 THE STANDARD CTA SET (wording per Oleg, 2026-07-20; adapt product nouns per site)
- Hero (value-led, XL): "Book Your <Experience> - From $<price> ->" + the ONE full proof
  line (rating x count x recommend% x free cancellation). The hero is the only place the
  full proof line appears.
- Standard buttons: "Check Live Availability & Prices on <Platform> ->".
- Sticky bar: destination-neutral short verb phrase (e.g. "Book Exotic Car ->") + compact
  proof (star rating + review count + from-price). Appears after first-screen scroll.
- Mid-article box: heading question + 2-minute/pay-later reassurance sentence + standard
  button. No proof clutter.
- Closing banner/CTA: reassurance (pay later, free cancellation) + honest urgency line.

## 9.3 CADENCE RULE
3-4 purposeful placements per long page: early (hero/after intro), mid (after the key
decision content), end (peak-end reassurance banner) + the sticky bar. Never carpet-bomb.

## 9.4 HONESTY GATES (before any urgency/reassurance line ships)
Verify on the LIVE listing via Grok: pay-later offer, cancellation terms, demand badge
(print a badge claim ONLY if the platform currently shows one). Operator's published
book-early advice and the named author's firsthand observations are quotable, attributed.
Never counters, timers, or strikethrough prices. Full avoid-list in the skill.

## 9.5 MEASUREMENT (ships with the scaffold)
GA4 `affiliate_click` (link_url, link_text, page_path) is the KPI feed. After launch,
judge every conversion tweak by clicks-per-session in GA4, one change at a time.

## 9.6 DELIVERABLES
Conversion components styled in the site palette; CTAs placed per 9.2/9.3 on every built
page; writer prompts carrying the article contract; verified reassurance/urgency lines on
file (research/grok/); GA4 event tracking live; a mobile screenshot check of a mid-article
button (the invisible-button trap check) before launch.
