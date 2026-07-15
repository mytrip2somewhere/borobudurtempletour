# Phase 2 — Information Architecture
Borobudur Temple Tour · 2026-07-14 · from `02-architecture.md` + the Phase 1 gap map.

---

## 2.1 CLUSTERS

Four clusters, each with a hub and spokes.

1. **Tours (money)** — hub `/tours/`, spokes = 3 tour pages + `/compare/`
2. **Practical (Track A: Google demand)** — hub `/guides/`, spokes = tickets, climbing, sunrise,
   getting there, best time, how long
3. **Understanding Borobudur (Track B: AI citation)** — hub `/guides/`, spokes = what to wear,
   worth visiting, vs Angkor Wat, why abandoned, 7 wonders
4. **Trust** — `/about/`, `/contact/`, `/disclosure/`, `/privacy/`, `/sitemap/`,
   `/ai-learn-about-us/`, `/faq/`, `/blog/`

Tracks A and B share the `/guides/` hub deliberately: splitting them into separate sections
would surface an internal metric distinction to users, who do not care. The distinction governs
**how we judge** the pages, not where they live.

---

## 2.2 URL MAP (one primary keyword per page — the anti-cannibalization lever)

| URL | Type | Primary keyword | Vol | KD |
|---|---|---|---|---|
| `/` | homepage hub | borobudur temple tour | 1,000 | 17 |
| `/tours/` | category hub | **borobudur tours** | 1,000 | **4** |
| `/tours/borobudur-sunrise-climb-prambanan/` | money | (listing 1, GYG) | – | – |
| `/tours/borobudur-sunrise-merapi-prambanan/` | money | (listing 2, Viator) | – | – |
| `/tours/borobudur-climb-prambanan-day-tour/` | money | (listing 3, Viator) | – | – |
| `/compare/` | comparison | which borobudur tour is best | – | – |
| `/guides/` | guides hub | borobudur guides (navigational) | – | – |
| `/guides/borobudur-tickets-and-prices/` | guide | **borobudur ticket** | 590 | **2** |
| `/guides/climbing-borobudur/` | guide | borobudur climb access | – | – |
| `/guides/borobudur-sunrise/` | guide | **borobudur sunrise tour** | 70 | **7** |
| `/guides/borobudur-from-yogyakarta/` | guide | borobudur from yogyakarta | – | 15 |
| `/guides/best-time-to-visit-borobudur/` | guide | best time to visit borobudur | – | – |
| `/guides/how-long-at-borobudur/` | AEO | how long do you need at borobudur | – | – |
| `/guides/what-to-wear-at-borobudur/` | **AEO flagship** | borobudur dress code | 10 | – |
| `/guides/is-borobudur-worth-visiting/` | AEO | is borobudur worth visiting | 10 | – |
| `/guides/borobudur-vs-angkor-wat/` | AEO | borobudur vs angkor wat | – | – |
| `/guides/why-was-borobudur-abandoned/` | AEO | why was borobudur abandoned | – | – |
| `/guides/borobudur-seven-wonders/` | AEO | is borobudur one of the 7 wonders | – | – |
| `/about/` · `/contact/` · `/faq/` · `/blog/` · `/disclosure/` · `/privacy/` · `/sitemap/` · `/ai-learn-about-us/` | trust/structural | – | – | – |

### Slug decisions worth recording
- **`/tours/` targets `borobudur tours` (KD 4), NOT the EMD term.** The homepage takes
  `borobudur temple tour` (KD 17). This is the single most important targeting decision on the
  site: it puts the commercial money term on the easiest-to-rank page and keeps the two off each
  other. If both chased the EMD phrase they would cannibalise.
- **Tour slugs describe the real itinerary**, not the marketing title. Listing 3's slug is
  `borobudur-climb-prambanan-day-tour`, never `budha-voyage` (the platform's own slug), because
  the slug should say what the tour is.
- **No slug says "borobudur sunrise tour" for a tour page.** That phrase belongs to
  `/guides/borobudur-sunrise/`, which explains the hill-vs-temple distinction. A money page
  claiming it would breach the sunrise rule in `site.config.md`.
- No dates, no IDs, lowercase, hyphenated, all clean-URL folders (`outPath()` in the compiler
  emits `/slug/index.html`).

---

## 2.3 INTERNAL LINKING

### Vertical
`/` → `/tours/` → each tour page → back up via breadcrumb.
`/` → `/guides/` → each guide → back up.
Equity flows to `/tours/` (KD 4, the money hub) and the three tour pages.

### Horizontal sibling bridges (from real Phase 1 intent)
| From | To | Why (real intent, not invention) |
|---|---|---|
| tickets ↔ climbing | both | "how much" and "can I climb" are the same decision |
| tickets ↔ sunrise | both | sunrise is the IDR 1,000,000 premium tier of the same price question |
| sunrise ↔ best time | both | sunrise is a time-of-day answer |
| from-yogyakarta ↔ how long | both | trip-planning pair; all tours depart Yogyakarta |
| what to wear ↔ climbing | both | Upanat sandals are the physical link between them |
| worth visiting ↔ vs angkor wat | both | both are "should I bother" questions |
| why abandoned ↔ 7 wonders | both | history/status pair |
| each tour ↔ `/compare/` | both | cross-shopping |

### Contextual in-content links (highest weight)
Woven into prose at the phrase naming the destination. Counts per `02-architecture.md`: 2–4 on
short pages, 5–9 on substantial ones. Every guide links: the relevant hub, the most relevant
tour page, `/compare/`, and 2–3 siblings.

**NO "Related reading" end-dumps.** Explicit rule in `02-architecture.md` §2.3.

Worked example (`/guides/borobudur-tickets-and-prices/`):
> ...the grounds ticket is [domestic-only](/guides/climbing-borobudur/), so as a foreign visitor
> your entry is the structure-climb ticket, which already includes [a guide and the Upanat
> sandals](/guides/what-to-wear-at-borobudur/) you must wear on the monument. If you want the
> [04:00 sunrise slot](/guides/borobudur-sunrise/), that is a separate IDR 1,000,000 product...
> Most [tours from Yogyakarta](/tours/) bundle the ticket into their price.

### Anchor text
- Exact-match (`borobudur temple tour`) **only** to `/`, sparingly. EMD means brand ≈ keyword, so
  lean navigational/partial.
- To `/tours/`: vary across "all three tours", "the tours Dewi guides", "compare the tours",
  "our booking hub". Never the same phrase repeatedly.
- Never self-link; never stuff.

---

## 2.4 NAVIGATION (mobile-first)
Header: **Tours · Guides · Compare · FAQ · About** + a `Book a tour` button → `/tours/`.
(The scaffold's nav already matches; only the Blog link placement needs review once posts exist.)
Thumb-reachable, no hover dropdowns, ARIA on the toggle (already in `base.html`).

## 2.5 FOOTER
Per §2.6: About/author, Blog, Contact, FAQ, HTML sitemap, AI-learn-about-us, Disclosure,
Privacy + a compact tours set + `mailto:` + social (search fallbacks until real accounts).
**Contact page is email-only** — no third-party form. That is the approved default; do not add
Web3Forms/Formspree unless Oleg asks.

## 2.6 BREADCRUMBS
Every page below `/`. `Home / Guides / Borobudur tickets and prices`. Feeds BreadcrumbList.

## 2.7 SCHEMA PLACEMENT (feeds Phase 5)
| Page | Schema |
|---|---|
| `/` | Organization/TravelAgency (logo + description, knowledge-panel anchor) + WebSite + ItemList of tours |
| `/tours/` | ItemList → each Product/TouristTrip + Offer + AggregateRating |
| tour pages | Product + Offer + AggregateRating (**only real GYG/Viator figures, attributed**) + TouristAttraction in Itinerary w/ GeoCoordinates |
| `/about/` | Person (Dewi) + worksFor org |
| `/faq/` + genuine Q&A blocks | FAQPage |
| all below `/` | BreadcrumbList |

**Schema honesty gate:** AggregateRating ships ONLY with the real listing figures recorded in
`site.config.md` (4.9/1,682 · 4.9/~1,095 · 4.9/672), attributed to GYG/Viator. Never the site's
own rating. Never an invented review count.

## 2.8 CANONICAL
Self-referencing on every indexable page. The three tour pages are near-duplicates in shape but
each gets distinct primary content and a self-canonical. `/compare/` must add real value (a
verdict by visitor type), not restate the tour pages.

## 2.9 CRAWL HYGIENE
3-click depth from `/`. Every page has ≥1 internal inbound link. Orphan check after build.
XML sitemap auto-generates from canonicals (already wired in `build/compile.mjs`).
HTML `/sitemap/` grouped by cluster, linked from footer and `/ai-learn-about-us/`.

---

## 2.10 DELIVERABLE NOTES / OPEN
- `/blog/` hub auto-builds from `src/content/blog/*.md` (compiler handles it); no posts yet.
- The compiler's `TOURS` map must be filled with the three real affiliate links before blog CTAs
  work. Currently `{}` by design.
- Homepage cannot be finalised before the three tour pages exist (it lists them).
- `/about/` blocked on Dewi's photo + her sign-off on the rewritten bio.
