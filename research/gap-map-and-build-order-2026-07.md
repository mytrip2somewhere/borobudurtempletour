# Phase 1.5 / 1.6 — Gap Map, Topic Priority, Build Order
Borobudur Temple Tour · 2026-07-14 · feeds Phase 2 (architecture)

Inputs: `keyword-fanout-analysis-2026-07.md`, `competitor-audit-2026-07.md`,
`compliance-verification-2026-07.md`, `site.config.md`.

**Gap map note:** the site has ZERO existing pages, so every row below is a `gap`. The useful
axis is not covered/gap but **which demand universe a page serves**, because this research
found the two barely overlap.

---

## THE ORGANISING PRINCIPLE

Two demand universes, proven with real data, requiring different pages judged by different
metrics:

| | **Track A — Google money** | **Track B — AI citation** |
|---|---|---|
| Demand | `borobudur tours` 1,000/mo KD 4; ticket cluster 590/mo KD 2-7 | `can girls wear shorts in indonesia` 245-611/mo AI; `what is indonesia famous for` 1,454/mo AI |
| AI volume | ~0 (`borobudur tour` LLM sweep = **zero items**) | 20x-to-infinite vs Google |
| Google volume | high, commercial | ~0 (often no keyword data at all) |
| Job | affiliate clicks | be the cited answer |
| **Judge by** | **rankings + affiliate CTR** | **AI citations. NOT Google rankings.** |

Track B pages will look like failures on a Google-rankings dashboard. That is expected and is
not a reason to kill them. Conversely Track A pages will never earn AI citations. Do not blend
the two scorecards.

---

## TIER 1 — MONEY PAGES (build first)

| # | Page | Target | Vol | KD | Why |
|---|---|---|---|---|---|
| 1 | `/tours/` hub | **borobudur tours** | 1,000 | **4** | **The single best target found.** Commercial intent, KD 4, same volume as the EMD term at a quarter the difficulty. Sorted by booking volume per Phase 1.0. |
| 2 | `/` homepage | borobudur temple tour | 1,000 | 17 | The EMD term. Brand anchor. |
| 3 | `/tours/<slug>` x3 | per-tour | – | – | One per real affiliate link. Full itinerary stated honestly (all three are Yogyakarta-departing combos incl. Prambanan). |
| 4 | `/compare/` | which tour is best | – | – | Routes intent across the three. |

**Binding constraints on these pages:**
- Sunrise wording follows `site.config.md` > TOURS: viewpoint (Punthuk Setumbu) named at EVERY
  mention; official temple-sunrise product mentioned briefly and factually.
- **No "climb up guarantee" scarcity framing.** The 1,200/day cap it rests on is unverified and
  looks stale (operator reported 3,000-4,000 Monday climbers, Jul 2025). Rivals all use it. We
  do not. This is a differentiator, not a limitation.
- Every price is REPORTED, not VERIFIED (Goers booking engine blocked all access). Confirm in
  the live booking flow before any figure ships, or omit the figure and link out.

---

## TIER 2 — HIGH-VALUE GUIDES (Google + AI Overview, both winnable)

| # | Page | Target | Vol | KD | AIO? | Why |
|---|---|---|---|---|---|---|
| 5 | `/guides/borobudur-tickets-and-prices/` | borobudur ticket(s) | 590 | **2-7** | ✅ "How much does it cost to go to the Borobudur Temple?" | **Highest-value guide on the site.** Cost is the dominant unmet intent: it recurs in the transactional cluster, an AIO question, AND related searches (price/cost/tickets/official website). **Competitor gap: rivals charge USD 95-136 against a ~USD 62 official ticket and never break it out.** An honest ticket-vs-service breakdown is defensible and nobody publishes it. |
| 6 | `/guides/climbing-borobudur/` | borobudur climb access | – | – | – | Verified ground nobody owns: two ticket types, guide + Upanat sandals included, open every day. **Kills the fake scarcity claim with sourced fact.** |
| 7 | `/guides/borobudur-sunrise/` | borobudur sunrise tour | 70 | **7** | – | Two EMD rivals own this angle. Our edge: precision about hill vs temple, which `borobudursunrise.net` never states (it never mentions Punthuk Setumbu at all). |
| 8 | `/guides/best-time-to-visit-borobudur/` | best time | – | – | ✅ "What is the best time to go to Borobudur?" | Also absorbs `is it rainy season in indonesia now?` (90 AI). Pairs with the real Jul-Sep seasonality finding. |
| 9 | `/guides/getting-to-borobudur-from-yogyakarta/` | borobudur from yogyakarta | – | 15 | – | Absorbs `what is the closest city to borobudur?` (40 AI). **Rare term with BOTH Google and AI demand**, and it matches the Yogyakarta-departure reality of all three tours. |
| 10 | `/guides/how-long-at-borobudur/` | how long | – | – | ✅ "How long do you need to see Borobudur?" | AIO-triggered. Cheap to answer well. |

---

## TIER 3 — AEO / CITATION PAGES (Track B — judge on citations, NOT rankings)

| # | Page | Target | AI vol | Google | Why |
|---|---|---|---|---|---|
| 11 | **`/guides/what-to-wear-at-borobudur/`** | dress code | **245-611 + 396** | ~0 | **FLAGSHIP AEO PAGE.** Largest AI cluster in the dataset, growing ~76x YoY. **Every rival states an invented rule**; the "shoulders/knees + free sarong" claim traces to a competitor affiliate. Verification found **no official dress code exists**. The honest answer (Borobudur publishes no dress code; it is not an active Balinese temple; Upanat sandals ARE mandatory and provided; modesty is etiquette, not regulation) is unpublished by anyone and is exactly what the biggest AI question asks. **Must be framed as "no official rule", never as a rule.** |
| 12 | `is borobudur worth visiting` | AIO | 5 | 10 | ✅ AIO-triggered. Dewi's first-person guiding voice is the differentiator; no rival has a named author. |
| 13 | `borobudur vs angkor wat` | AIO | – | – | ✅ AIO-triggered ("Which is bigger, Borobudur or Angkor Wat?"). Natural comparison page. |
| 14 | `why was borobudur abandoned` | history | **79** (growing) | ~0 | Pure Track B. Currently answered only by Wikipedia/Britannica. |
| 15 | `is borobudur one of the 7 wonders` | fact | 33 | ~0 | **Fact trap** — Borobudur is NOT a New7Wonders winner. Precision from a primary source is the whole value. |
| 16 | `/ai-learn-about-us/` + `llms.txt` | Phase 7 | – | – | AEO infrastructure. |

---

## TIER 4 — TRUST / STRUCTURAL
`/about/` (Dewi — **no rival has a named author with credentials; this is the E-E-A-T edge, but
it only converts when attached to first-hand facts nobody else publishes**), `/blog/`,
`/contact/`, `/disclosure/`, `/privacy/`, `/sitemap/`, `/faq/` (everything below AEO threshold).

---

## DELIBERATELY NOT BUILDING

- **Combo keyword pages** (`borobudur and prambanan tour` etc.). ~10/mo in EVERY market tested.
  The combo scope is an honesty requirement for tour-page copy, not a keyword target.
- **`what is indonesia famous for`** despite being the biggest single AI signal (1,454/mo, KD 4).
  It is off-EMD topical drift for a Borobudur site, has no commercial intent, and would put us
  head-to-head with Wikipedia/Britannica on an encyclopedic question. **Flagged as a real
  tension, not an oversight:** the largest AI cluster is one we are choosing to skip on scope
  grounds. Revisit only if the site earns citation authority first.
- **Standalone Prambanan/Merapi/Mendut guides.** Out of scope per site.config; would drift the EMD.
- **Any page resting on the 1,200/day quota, the foreign grounds price, or an invented dress code.**

---

## BUILD ORDER

1. **Tickets & prices guide (#5)** — KD 2, AIO-triggered, biggest competitor gap. Softest, highest-value entry.
2. **Tours hub (#1)** — KD 4, the money term.
3. **Three tour pages (#3)** + **compare (#4)** — the affiliate surface.
4. **Homepage (#2)** — needs the tours to exist first.
5. **Climbing (#6)** + **Sunrise (#7)** — verified ground, kills rival scarcity framing.
6. **What to wear (#11)** — flagship AEO. Ships as soon as the "no official rule" framing is settled.
7. **Best time (#8)**, **Getting there (#9)**, **How long (#10)**.
8. Remaining AEO (#12-15), then About/blog/legal, then `/ai-learn-about-us/` + `llms.txt` (Phase 7).

Rationale: lead with the KD-2 cost cluster because it is simultaneously the easiest to rank, an
AI Overview question, the dominant unmet intent, and the clearest place rivals are exploitable.

---

## OPEN DEPENDENCIES (block specific pages, not the build)
- **Prices** REPORTED not VERIFIED -> blocks exact figures on #5 and tour pages.
- **Official sunrise inclusions** contradictory (Grok: breakfast+souvenir; compliance: Upanat+guide+breakfast at Manohara) -> blocks an inclusions list on #7.
- **Dewi's photo** missing -> blocks the author byline image sitewide (never AI-generated).
- **Dewi's bio** needs a house-rules rewrite (uses "ensures", banned) -> blocks `/about/`.
- **Operator brief** unsent -> may change sunrise inventory and the dress-code practical answer.
- **GitHub repo name** unset -> blocks Sveltia CMS.
- **Palette/type** still inherited placeholders -> blocks design sign-off (Phase 3 anti-template rule).
