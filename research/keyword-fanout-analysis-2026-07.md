# Keyword + AI Fan-out Research — Borobudur Temple Tour
Source record. Phase 1 (`01-research-pipeline.md`) + `/keyword-fanout` skill.
Run date: 2026-07-14. Market: United States / en (primary). Seed: `borobudur temple tour`.

**STATUS: IN PROGRESS — not a final topic list.** The skill's completeness gate is not yet
satisfied (LLM target-matrix sweep not run; no dry sweep confirmed). Do not build from this
until it is finished. Every figure below came from a DataForSEO response; nothing is invented.

---

## 1. EXPANSION (dataforseo_labs_google_keyword_suggestions)

### Seasonality correction (important — read before judging the market)
The seed `borobudur temple tour` reports `search_volume_trend.yearly: -84`, which looks like a
collapsing market. It is not. The head term `borobudur` is **stable to growing** across the
same 12 months:

| 2025-06 | 07 | 08 | 09 | 10 | 11 | 12 | 2026-01 | 02 | 03 | 04 | 05 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 8,100 | 9,900 | 9,900 | 14,800 | 12,100 | 12,100 | 9,900 | 9,900 | 9,900 | 12,100 | 12,100 | 12,100 |

The -84% is the seed's Jul/Aug peak (2,400) measured against its Jun trough (390): **northern-
hemisphere summer seasonality on a low-volume long-tail**, not decline. Plan content and launch
timing around a **Jul–Sep peak**.

### The money cluster (commercial / transactional intent)
| Volume | KD | Intent | Keyword |
|---|---|---|---|
| 1,000 | **4** | commercial | **borobudur tours** |
| 1,000 | 4 | informational | borobudur tour |
| 1,000 | 17 | informational | **borobudur temple tour** (the EMD term) |
| 590 | **2** | transactional | borobudur ticket |
| 590 | 3 | transactional | borobudur temple ticket |
| 590 | 5 | transactional | borobudur temple tickets |
| 590 | 7 | transactional | borobudur tickets |
| 590 | – | transactional | borobudur tiket (Indonesian spelling) |
| 320 | 17 | commercial | hotel in borobudur |
| 70 | **7** | commercial | **borobudur sunrise tour** |

**Finding: `borobudur tours` is KD 4 at 1,000/mo with commercial intent.** That is a softer
target than the EMD term itself (KD 17) at identical volume. The ticket cluster is KD 2–7 and
transactional. These are the winnable money terms.

### The entity cluster
`borobudur` = 12,100/mo, KD 20. A large synonym set (`borobudur temple`, `borobudur indonesia`,
`borobudur temple yogyakarta`, ~35 variants) all sits at 6,600/mo, KD 9–33, all informational.
`borobudur temple magelang` is KD 9 — the softest entry to that cluster.

### Question cluster (AEO candidates)
| Volume | KD | Keyword |
|---|---|---|
| 260 | 13–37 | `where is candi borobudur` / `where is borobudur located` / `where is borobudur temple` (7 variants) |
| 90 | 16–21 | `what is borobudur` / `what is borobudur temple` / `what is candi borobudur` |

### Combo-terms reality check (affects the confirmed scope)
The combo expansion was approved to match real inventory. In **US/en the combo volume is thin**:
`borobudur temple tour from yogyakarta` = 10/mo; `borobudur and prambanan temple tour` = 10/mo;
`borobudur temple and prambanan temple tour` = 10/mo. The scope call still stands on honesty
grounds (all three tours ARE combos), but **it should not be justified by US search volume**.
TO DO: re-run expansion for Australia / United Kingdom / Indonesia before concluding the combo
terms are low-value globally. US may simply be the wrong market for this destination.

---

## 2. GOOGLE AI OVERVIEW FAN-OUT (serp_organic_live_advanced, PAA click depth 2)

### Questions Google answers with an AI Overview — own each verbatim
Confirmed via `expanded_element[].asynchronous_ai_overview == true`:
1. **How long do you need to see Borobudur?**
2. **Is it worth it to go to the Borobudur Temple?**
3. **How much does it cost to go to the Borobudur Temple?**
4. **What is the best time to go to Borobudur?**
5. **Which is bigger, Borobudur or Angkor Wat?**

Non-AIO PAA (classic snippet, currently owned by `iwannatravel.com.sg`):
6. Is it better to go to Borobudur in the morning or afternoon?

Note #5: the Angkor Wat comparison is a genuine AIO-triggered question and a natural
comparison page. #3 pairs directly with the KD-2 ticket cluster.

### related_searches
`Borobudur temple tour tickets` · `packages` · `price` · `itinerary` · `reviews` · `cost` ·
`Borobudur ticket official website` · `Borobudur tour from Yogyakarta`

Price/cost/tickets recur across PAA, related searches, AND the transactional keyword cluster.
**Cost is the dominant unmet intent on this SERP.**

---

## 3. SERP SHAPE & COMPETITORS (`borobudur temple tour`, US/en)

SERP is **heavily commercial**: a 20-item `commercial_units` block (GYG, Viator, Tripadvisor,
Agoda) sits above everything, plus knowledge_graph, PAA-with-AIO, video carousel, images.

| Rank | Domain | Note |
|---|---|---|
| 1 | getyourguide.com | `/borobudur-l88720/` — 4.8, 10,979 reviews |
| 2 | **borobudursunrise.com** | **EMD competitor, sunrise-focused** |
| 3 | tripadvisor.com | "THE 10 BEST Borobudur Tours & Excursions (2026)" |
| 4 | come2indonesia.com | operator, combo tour page |
| 5 | en.wikipedia.org | entity page |
| 6 | **borobudursunrise.net** | **second EMD competitor** |
| 7 | audleytravel.com | tailor-made, high authority |
| 8 | snoezelsontheroad.com | blog, ranks on practical detail |

**Two EMD competitors already own the sunrise angle** (`borobudursunrise.com` / `.net`). Since
two of our three tours are sunrise products, these are the head-to-head rivals. Audit them in 1.4.

Organic rank 1 is GYG itself — the same platform we send affiliate traffic to. Beating GYG for
the money term is unrealistic; the winnable route is the **AIO/PAA answer layer + the KD 2–7
ticket/cost cluster**, then routing that intent to the affiliate links.

---

## 4. OFFICIAL TICKET PRICES — PRIMARY SOURCE FOUND (feeds COMPLIANCE)

Google's knowledge_graph for Borobudur Temple links the **official site:
`borobudur.injourneydestination.id`** (InJourney Destination, the state operator). That is the
primary source the compliance module needs. Its product list, as surfaced in the KG:

| Ticket | Price (IDR) |
|---|---|
| Borobudur Temple **Structure** Ticket — Foreign Adult | 455,000 |
| Borobudur Temple **Structure** Ticket — Foreign Child | 305,000 |
| Tiket **Naik Struktur** Candi Borobudur — Domestik Dewasa | 120,000 |
| Tiket **Naik Struktur** Candi Borobudur — Domestik Anak | 75,000 |
| Tiket **Pelataran** (grounds) Candi Borobudur — Domestik Dewasa | 50,000 |
| Tiket **Pelataran** (grounds) Candi Borobudur — Domestik Anak | 25,000 |
| Borobudur Temple **Ground** — Adult / Child Foreign Ticket | not shown in KG |

This **confirms two compliance items** from `site.config.md` as real, not assumed:
- **Grounds vs. structure-climb are separate tickets** (Pelataran vs. Naik Struktur).
- **Domestic and foreign pricing tiers exist**, and the gap is large (climb: 120k domestic vs
  455k foreign).

STILL UNVERIFIED — do not publish until confirmed against the official site directly:
- Foreign **grounds-only** price (KG showed the product, not the figure).
- Daily visitor **quota** on the structure climb.
- Whether a guide is **mandatory** for the climb; the upali sandal requirement.
- **Opening hours conflict:** the KG says "Closes 4:30 PM"; a Jun-2025 blog
  (snoezelsontheroad.com) says "Tuesday to Sunday, 08:30–15:30". Two sources disagree, and
  neither is the official site. Resolve before any page states hours.
- Current status of **temple-top sunrise** access (site.config flags that our tours sell
  sunrise from Punthuk Setumbu hill, NOT the monument).

Competitor titles repeatedly sell a "**climb up guarantee**" (GYG, Tripadvisor, Viator, and our
own tour #1). That phrasing only has value if climb access is genuinely capped, which supports
the quota item being real — but it is **operator marketing language, not a verified fact**.
Confirm the quota against InJourney before the site repeats it.

---

## 5. OTHER REAL FIGURES CAPTURED
- Borobudur Temple Google reviews: **4.7 / 103,797** (`google_reviews` element).
- GetYourGuide Borobudur destination page: **4.8 / 10,979** (`third_party_reviews`).
- KG entity facts: 9th-century Mahayana Buddhist temple, Magelang Regency, near Muntilan, NW of
  Yogyakarta; construction started 778 AD; opened 825 AD; height 115 ft.
  (Wikipedia-sourced via KG. Re-verify before use; KG is not a primary source.)

---


---

## 7. MARKET COMPARISON (kw_data_google_ads_search_volume, same keyword set)

| Keyword | US | Australia | UK |
|---|---|---|---|
| `borobudur` | **12,100** | 3,600 | 2,900 |
| `borobudur tours` | **1,000** (KD 4) | 140 | 20 |
| `borobudur temple tour` | **1,000** (KD 17) | 140 | 20 |
| `borobudur ticket` | 590 | 140 | 70 |
| `borobudur sunrise tour` | 70 | 30 | 20 |
| `borobudur and prambanan tour` | 10 | 10 | 10 |
| `borobudur tour from yogyakarta` | 10 | 10 | 10 |

**VERDICT: the US IS the right primary market.** My earlier suspicion (that thin US combo volume
meant the wrong market) is DISPROVEN. US leads every term. Keep US/en primary.

**The combo terms are ~10/mo in EVERY market.** This is now definitive: the combo scope
expansion yields no meaningful search volume anywhere. It stands ONLY on honesty grounds (all
three tours genuinely are combos, so pages must describe them truthfully). Do not build pages
targeting combo keywords; do describe the combo itinerary accurately on the tour pages.

**Australia is a real secondary market with INVERTED seasonality.** `borobudur tours` in AU ran
40 (Sep 2025) -> 320 (Jun 2026), rising while the US fell. AU is southern-hemisphere; their
Indonesia travel peaks mid-year. Useful: AU demand partially fills the US off-season trough.

---

## 8. LLM / AI-SEARCH LAYER (ai_opt_llm_ment_search) — MODULE IS ENABLED

Confirmed live: `AI_OPTIMIZATION` returns real ChatGPT + Google data. This is true LLM data,
not the AIO proxy.

### THE BIGGEST AI CLUSTER IS ADJACENT, NOT EXACT (exactly as the skill predicts)
Sweeping `borobudur` (word_match) over ChatGPT returns almost no questions containing the
product keyword. The demand is in the surrounding conversation, where Borobudur is the ANSWER:

| AI search volume | ChatGPT question |
|---|---|
| **570** | **can girls wear shorts in indonesia?** |
| 112 | what is indonesia mainly known for? |
| 111 | what is indonesia famous for? |
| 102 | **why was borobudur abandoned?** |
| 99 | what is indonesia mostly known for? |
| 72 | why is yogyakarta so famous? |
| 55 | what is java in indonesia famous for? |
| 52 | what are the best parts of indonesia to visit? |
| 46 | which is the top 1 temple in the world? |
| 45 | what is the most visited place in indonesia? |
| **41** | **what is the closest city to borobudur?** |
| 39 | what is the number 1 tourist attraction in indonesia? |
| 39 | which is the most famous buddhist temple? |
| **38** | **where to go instead of bali in indonesia?** |
| 34 | how many days in indonesia is enough? |
| 34 | what's so special about borobudur? |
| **33** | **is borobudur still in 7 wonders of the world?** |
| 33 | is yogyakarta good for tourists? |

Standouts:
- **`can girls wear shorts in indonesia?` (570)** is 5x the next question and is a **DRESS CODE**
  query. Dress code is already a COMPLIANCE item in site.config.md. The single largest AI demand
  signal in the dataset lines up with a compliance item we must verify anyway. High-value AEO page.
- **`what is the closest city to borobudur?` (41)** routes straight to the Yogyakarta-departure
  reality of all three tours. Rare case where an AI question matches the inventory exactly.
- **`is borobudur still in 7 wonders of the world?` (33)** is a FACT TRAP. Borobudur is not a
  New7Wonders winner. Answer precisely from a primary source or not at all.
- **`where to go instead of bali in indonesia?` (38)** — the classic adjacency: the product is
  the answer to a question that never names it.

### VOLUME-SORT TRAP CONFIRMED
The `google` platform sweep sorted by `ai_search_volume desc` returns junk at the top
(`superior superior` 14,800, `bakong` 22,200, `buddha temple` 49,500) — homonyms and stray
tokens, not Borobudur intent. Exactly the trap the skill documents. All figures above were
**grep-filtered for relevance**, never taken from top-N.

### WHO OWNS THE AI CITATIONS (Google AIO `sources`, borobudur queries)
| Citations | Domain |
|---|---|
| 126 | youtube.com |
| 112 | en.wikipedia.org |
| 38 | britannica.com |
| 23 | ebsco.com |
| 18 | tripadvisor.com |
| 12 | khanacademy.org |
| 10 | reddit.com |
| 8 | en.wikivoyage.org |
| 7 | **whc.unesco.org** |
| 7 | jonistravelling.com |
| 6 | nationalgeographic.com |
| 5 | misadventuresmag.com |

**No tour operator or affiliate site owns AI citations for Borobudur.** The space is
encyclopedic (Wikipedia/Britannica/Khan Academy) plus YouTube. Two independent travel blogs
(`jonistravelling.com`, `misadventuresmag.com`) DO get cited, which proves a non-encyclopedic
site can earn citations here. That is the AEO opening: practical, verified visitor questions
(cost, dress code, climb access, how long) that encyclopedias do not answer well.

`whc.unesco.org` appearing in AI citations also confirms UNESCO as a usable primary source for
the conservation/conduct compliance items.

### Own domain in `sources`?
`borobudurtempletour.org` = **0 citations** across both sweeps. Expected: the site is unlaunched.
This is the pre-launch baseline to measure against.

### Note on data shape
The `chat_gpt` platform response carries no `sources` field (fields: ai_search_volume, answer,
first_response_at, language_code, last_response_at, location_code, model_name, monthly_searches,
platform, question). Citation analysis above is therefore **Google-AIO only**. Do not claim
ChatGPT citation data we do not have.


---

## 9. THE CENTRAL FINDING: GOOGLE AND AI DEMAND BARELY OVERLAP

Measured with `ai_optimization_keyword_data_search_volume` (real AI search volume) against
`kw_data_google_ads_search_volume` (real Google volume), same market (US/en), same day.

| Keyword | Google/mo | AI/mo | Read |
|---|---|---|---|
| `borobudur tours` | **1,000** (KD 4) | ~4 | **Google-native money term** |
| `borobudur temple tour` | **1,000** (KD 17) | ~3 | Google-native (the EMD) |
| `borobudur ticket` | **590** (KD 2) | 2 | Google-native, transactional |
| `borobudur sunrise tour` | 70 (KD 7) | *no data* | Google-only |
| `borobudur` | 12,100 (KD 20) | 741 | both |
| `borobudur temple` | 6,600 | 157 | both |
| `is borobudur worth visiting` | 10 | 5 | tiny both |
| `borobudur dress code` | 10 | – | tiny |
| `what is indonesia famous for` | **70** (KD 4) | **1,454** | **AI-NATIVE — 20x more AI than Google** |
| `can girls wear shorts in indonesia` | **no data** | **245** (peaked 611 Apr-26) | **AI-NATIVE — invisible to Google** |
| `why was borobudur abandoned` | **no data** | **79** | **AI-NATIVE** |
| `what is the closest city to borobudur` | **no data** | **40** | **AI-NATIVE** |
| `how long do you need to see borobudur` | no data | – | AIO-triggered, no keyword volume |

### Two separate demand universes, two separate strategies
- **Google = commercial.** People type `borobudur tours` (1,000/mo, KD 4) and `borobudur
  ticket` (590/mo, KD 2) into Google. This is where affiliate conversion happens. AI volume on
  these terms is **effectively zero** — a `borobudur tour` partial_match LLM sweep returned
  **ZERO items**. Nobody asks an LLM for a Borobudur tour.
- **AI = adjacent and informational.** People ask ChatGPT `what is indonesia famous for`
  (1,454/mo AI vs 70/mo Google) and `can girls wear shorts in indonesia` (245/mo AI, **no
  measurable Google volume at all**). Borobudur is the ANSWER to these, never the query.

**Implication for the build.** These need different pages with different jobs, and neither
substitutes for the other:
1. **Money pages** target the Google commercial cluster (`borobudur tours` KD 4, ticket cluster
   KD 2-7). They carry the affiliate links. They will earn ~no AI citations, and that is fine.
2. **AEO/citation pages** target the AI-native adjacent questions. They will earn ~no Google
   traffic (there is no Google volume to earn), so **do not judge them by Google rankings**.
   Their job is being the cited answer inside ChatGPT/AIO. Judge them on citations.
Scoring pages by blended "search volume" alone would kill category 2 before it starts, because
its Google volume is literally zero. That is the trap this table exists to prevent.

### The dress-code cluster is the standout AI opportunity
- `can girls wear shorts in indonesia`: **245/mo AI, spiking** — 8 (Jul 2025) -> 611 (Apr 2026).
  Roughly 76x year-over-year growth.
- `can i wear green in indonesia`: 396 AI volume (from the `yogyakarta` sweep).
- Combined, Indonesian dress questions are the **largest AI cluster in this entire dataset**.
- It is also already a **COMPLIANCE item** in site.config.md, so it must be verified anyway.
- It has **near-zero Google volume**, so no competitor doing classic keyword research will
  target it. Encyclopedias (Wikipedia/Britannica) do not answer "can I wear shorts". This is a
  real, defensible, unclaimed opening — but ONLY if the dress-code facts come back verified.

### Keyword difficulty (bulk_keyword_difficulty, US/en)
| KD | Keyword |
|---|---|
| **2** | borobudur ticket |
| **4** | borobudur tours |
| **4** | what is indonesia famous for |
| 7 | borobudur tickets |
| 7 | borobudur sunrise tour |
| 9 | borobudur temple magelang |
| 15 | borobudur from yogyakarta |
| 17 | borobudur temple tour (the EMD term) |
| *no KD returned* | borobudur dress code, borobudur opening hours, borobudur temple price, borobudur climb tickets, borobudur vs angkor wat, is borobudur worth visiting, how long do you need to see borobudur |

"No KD returned" means DataForSEO has no difficulty score, which generally tracks with
negligible/zero Google volume. Consistent with the AI-native reading above: these questions
barely exist on Google.

---

## 10. LLM TARGET-MATRIX SWEEP LOG (completeness gate #1-#3)

| # | Row | Type | Platform | Questions | NEW vs cumulative |
|---|---|---|---|---|---|
| 1 | `borobudur` (word_match) | entity | chat_gpt | 100 (capped) | 100 (baseline) |
| 2 | `borobudur` (word_match) | entity | google | 100 (capped) | — (junk-heavy, see volume-sort trap) |
| 3 | `yogyakarta` (word_match) | place | chat_gpt | 100 (capped) | **73** |
| 4 | `prambanan` (word_match) | landmark | chat_gpt | 100 (capped) | **54** |
| 5 | `borobudur tour` (partial_match) | **exact product** | chat_gpt | **0** | **0 — genuinely empty** |

Cumulative unique questions: **227**.

**Gate #3 (dry sweep) is NOT satisfied, and here is the honest reason.** Every broad row returns
exactly 100 items because `limit: 100` caps it, so broad rows will always yield "new" questions
and can never go dry by construction. Rows 3 and 4 also drifted off-topic (the `yogyakarta` row
surfaced `can a us citizen live in indonesia?`, `can you retire in indonesia?`, `what caused the
garuda indonesia flight 421 crash?` — expat/safety/news noise, not temple-visit intent).

What IS established:
- The **exact product row is definitively dry** (0 items, not capped) — that is a real, complete
  answer, not a sampling artifact.
- The **relevant clusters have stabilized**: dress code, Indonesia-identity, Borobudur history,
  Bali-alternative, safety/season, Yogyakarta. Rows 3-4 added volume but no new *relevant theme*.

REMAINING to fully satisfy the gate: re-run rows with a higher `limit` (or paginate via `offset`)
so caps stop masking dryness, and sweep the untouched adjacency rows (`things to do yogyakarta`,
`best temples in asia`, `bali`, `punthuk setumbu`, `candi mendut`, `merapi`) on BOTH platforms.
Until then, treat the topic list as strong-but-provisional.

### New relevant questions from rows 3-4
| AI vol | Question | Row |
|---|---|---|
| 396 | can i wear green in indonesia? | yogyakarta |
| 126 | is it safe to go to indonesia right now? | yogyakarta |
| 99 | which is better, bali or indonesia? | yogyakarta |
| 90 | is it rainy season in indonesia now? | yogyakarta |
| 21 | is prambanan hindu or buddhist? | prambanan |
| 18 | what is special about prambanan temple? | prambanan |
| 15 | where to stay when visiting yogyakarta? | prambanan |


---

## 6. COMPLETENESS GATE — NOT YET PASSED
Per the skill, these must be answered before a topic list ships:
1. **Target-matrix rows swept:** none yet (LLM layer not run). ✗
2. **Both platforms (chat_gpt + google) per row:** not run. ✗
3. **Last sweep dry?** N/A — no sweeps run. ✗
4. **Own domain in `sources`?** Not checked. Site is unlaunched, so expect absent. ✗
5. **Google vs AI volume divergence:** not measured. ✗

## NEXT STEPS
- [ ] LLM target-matrix sweep (`ai_opt_llm_ment_search`), both platforms, loop until dry.
      Matrix rows: `borobudur temple tour` (exact) / `borobudur`, `candi borobudur` (entity) /
      `prambanan`, `merapi`, `punthuk setumbu`, `mendut` (landmarks) / `yogyakarta`, `java`,
      `indonesia temples` (place) / `things to do yogyakarta`, `is indonesia worth visiting`,
      `best temples in asia` (adjacency — expect the biggest cluster here, per skill notes).
- [ ] `ai_optimization_keyword_data_search_volume` on the priority set; compare vs Google volume.
- [ ] Re-run expansion for **Australia / UK / Indonesia** — US combo volume is thin and US may
      not be this destination's real English market.
- [ ] `bulk_keyword_difficulty` on ~15 priority heads.
- [ ] 1.2 forum mining (Grok, since Reddit blocks scraping).
- [ ] 1.3/1.4 competitor audit — prioritize `borobudursunrise.com` and `.net`.
- [ ] Compliance verification against `borobudur.injourneydestination.id` (7 items).
