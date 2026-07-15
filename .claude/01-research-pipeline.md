# 01-research-pipeline.md — Phase 1: Research & Content Mapping

Generic. Read site specifics from `site.config.md`. Global rules live in root `CLAUDE.md`.

## PURPOSE
Turn a destination/experience into a prioritized, intent-mapped page list, grounded in
real search demand, real user language, and verified facts. Output feeds Phase 2.

## DISCOVERY API
DataForSEO (single vendor: keyword volume + SERP + PAA + autocomplete + related
searches), via the DataForSEO MCP server. Use the standard queue tier (batch research,
not real-time). Cost-control defaults: standard queue only, no live mode unless flagged,
no unnecessary parameter multipliers.

MCP MODULES: the server reads `ENABLED_MODULES` (in `~/.claude.json` > mcpServers >
dataforseo > env). Keep `SERP,KEYWORDS_DATA,DATAFORSEO_LABS,AI_OPTIMIZATION`. The
`AI_OPTIMIZATION` module is what exposes the LLM Mentions + AI keyword-search-volume +
ChatGPT/Google-AI-Overview fan-out tools (see 1.1b). Adding a module requires a Claude
restart to reload the server. If AI tools return "access denied", the DataForSEO plan
needs the AI Optimization add-on enabled in the dashboard.

PAYLOAD GOTCHA: Labs/SERP responses are huge (per-keyword monthly arrays) and overflow
the tool result. They auto-save to a file; process with `jq` on disk and pull only
compact `volume<TAB>keyword` rows into context. Never try to read the raw dump.

## 1.0 REQUIRED INPUTS (pause and ask Oleg before researching)
- Primary keyword + any secondary keywords (or confirm a seed list).
- The tour links to feature: Oleg sends GYG/Viator links (with affiliate params) from
  `site.config.md` > TOURS. These are the definitive set. Nothing added that Oleg didn't
  send; nothing invented. Pull name, price, rating, booking volume from each. Confirm the
  assembled list back to Oleg. Stats stay attributed to their real source.
- Confirm whether the compliance module is ON (see `site.config.md` > COMPLIANCE MODULE).
Once tours are in, sort by booking volume (not "Best Seller" tags, not price). That order
feeds tour pages and category/comparison rankings.

## 1.1 KEYWORD & DEMAND RESEARCH (DataForSEO)
Pull: search volume, trends over time (seasonality), PAA nodes, autocomplete, related
searches. Expand seeds into long-tail. Bucket every keyword by intent: transactional,
comparison, informational, navigational. Apply the EMD note from Phase 0.

## 1.1b AI SEARCH / LLM FAN-OUT LAYER (DataForSEO AI Optimization)
Modern searchers ask ChatGPT and read Google AI Overviews, which "fan out" one question
into many sub-queries. Capture that layer so pages answer what LLMs actually retrieve:
- Google AI Overview fan-out (works today, any plan): run `serp_organic_live_advanced`
  on the seed with `people_also_ask_click_depth`. PAA items carrying
  `asynchronous_ai_overview: true` are the questions Google answers with an AI Overview —
  own each one verbatim as an H2/FAQ. Also mine `people_also_search` + `related_searches`.
- True LLM layer (needs `AI_OPTIMIZATION`): ChatGPT + Google-AIO fan-out queries, LLM
  mention volume, and AI keyword search volume. ChatGPT fan-out data is US/English only.
- Prioritize topics by blending: real Google search volume x fan-out presence (AIO/LLM) x
  keyword difficulty (winnability, via `bulk_keyword_difficulty`) x affiliate intent x
  gap-vs-existing-content. Save the source record under `research/`.
This whole flow is packaged as the `/keyword-fanout` skill (`.claude/skills/keyword-fanout`).

## 1.1c SOURCE RELIABILITY RULES (learned launching Borobudur, 2026-07)
Hard-won calibration of the research tools. These override optimism:
- **Grok over-claims.** It labels news-sourced figures "CONFIRMED" and will return a
  COMPETITOR AFFILIATE'S numbers as fact (it served us a rival's stale daily quota, an
  unpublished foreign price, and child prices traced to a competitor domain). Demand source
  URLs per claim; treat its labels as leads. Downgrade to REPORTED anything not from an
  official/primary page, and filter every returned figure against the site's verified fact
  sheet before use. Keep raw responses under `research/grok/`.
- **Google Knowledge Graph goes stale.** Its price panel for Borobudur was provably out of
  date against the operator's own ticketing page (old domestic price). Never publish a KG
  figure without confirming it on the primary source; once one KG figure is proven stale,
  distrust its siblings.
- **VERIFIED vs REPORTED price discipline.** If an operator shows a price only inside a
  booking flow, DO NOT print third-party figures for it. Write "shown in the booking flow"
  and explain the vacuum — that honesty is itself differentiating content, and the invented
  figures rivals print become something to debunk.
- **HTTP status literacy.** 403 from UNESCO/Britannica-class sites is bot-blocking, not a
  dead link (they load in browsers; Grok can read them). A 000/timeout can be self-inflicted
  rate-limiting from a tight curl loop — retry spaced with a browser User-Agent before
  declaring a link dead. Only 404s from the canonical host mean gone.
- **Seasonality trap.** A long-tail seed's `yearly` trend can read as market collapse (ours
  showed -84%) when it is peak-vs-trough seasonality. Always pull the HEAD term's 12-month
  series before concluding anything about demand direction; plan launch timing around the
  real peak.
- **Two demand universes.** Google demand (commercial: "X tours", "X tickets") and AI/LLM
  demand (adjacent: "what is <country> famous for", dress-code questions) barely overlap —
  the exact product term can return ZERO LLM questions while adjacent questions carry 100x
  the volume. Plan two page tracks and judge them by different metrics (see 07).

## 1.2 REAL-USER-LANGUAGE LAYER (manual + forums)
Add human texture the API misses: manual PAA branching, and forum/community mining
(sources in `site.config.md` > REAL-USER-LANGUAGE SOURCES, e.g. relevant subreddits and
Tripadvisor). Capture exact tourist phrasing (the words they actually use) and the
genuine pain points, which become high-value AEO pages. If you can't access relevant subreddits, 
Because of scraping restrictions - ask Oleg for Grok API. Grok can access them.

## 1.3 SERP ANALYSIS (per priority keyword)
Analyze the live SERP: rewarded format (listicle/guide/comparison/video/local pack/AI
overview), depth and word count of what ranks, SERP features present and how to win them,
and confirmed commercial vs informational intent.

## 1.4 COMPETITOR CONTENT AUDIT (top 10 per primary keyword)
Audit structure/outline, depth, E-E-A-T signals, affiliate density and placement, and
gaps (unanswered questions, missed angles, outdated facts, thin sections). Goal: know
what to match and where to beat them.

## 1.5 CONTENT GAP & TOPIC CLUSTERING
Combine the above into a hub-and-spoke content map: main guide (hub), comparison pages,
single-question AEO pages (high-value only), FAQ hub (everything below threshold),
supporting guides. AEO threshold detailed in `07-aeo-llm.md`.

## 1.6 PAGE PRIORITIZATION
Score each proposed page by intent strength, commercial value, search volume/demand, and
competitive difficulty. Produce a build order (money + winnable pages first).

## 1.7 COMPLIANCE & FACTUAL RESEARCH (per-site module)
Only if `site.config.md` > COMPLIANCE MODULE is ON. Research the items listed there,
verified against current official sources, never from memory. Every fact carries a source
and a "last verified" date. Never invent or placeholder compliance facts (root rule).
If the module is OFF, skip this step entirely.

## 1.7b VERIFIED-SOURCE WHITELIST (for in-article external links)
While researching, build a reusable whitelist of authoritative external sources for
outbound linking (used by Phase 6.6). Format: theme → exact URL, each confirmed live and
genuinely supporting the claim it will back. Prefer official/primary sources (government,
police, regulators, standards bodies, the operator's own listing), then reputable press and
encyclopedic references. This list is the ONLY pool article writers (and any delegated
subagents) may pull external links from; never link a URL that is not on it. Re-verify a URL
before reusing it on a new article.

## 1.8 DELIVERABLES (handoff to Phase 2)
Intent-bucketed keyword list (volume, trends, PAA, autocomplete, related); real-user
glossary; SERP summary per keyword; competitor audit notes; prioritized hub-and-spoke
content map with build order; tour list sorted by booking volume; verified compliance
sheet with sources/dates (if module ON); verified-source whitelist for external links (1.7b).
