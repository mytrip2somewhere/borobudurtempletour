# site.config.md — Per-Site Configuration

This is the ONLY file you edit to launch a new site. The pipeline (CLAUDE.md +
`.claude/` phase files) reads every site-specific value from here and otherwise
stays generic.

STATUS: DRAFT — awaiting Oleg's confirmation. Started from `site.config.template.md`
(blank), NOT from Cambridge's filled config, so no old values leak through.
Fields marked **[ASK OLEG]** are unknown and must not be guessed. Fields marked
**[PROPOSED]** were derived from the domain and need a yes/no from Oleg.

---

## IDENTITY
- Site name: Borobudur Temple Tour **[PROPOSED — derived from the domain; say the word and
  I'll rename it everywhere]**
- Domain: borobudurtempletour.org
- Exact-match domain (EMD): yes **[PROPOSED — the domain matches the head term]**
- Primary keyword (the head term the domain owns): Borobudur temple tour **[PROPOSED —
  Phase 1 research confirms or corrects this against real search volume]**
- Location / destination focus: Borobudur, Magelang Regency, Central Java, Indonesia.
  **[CONFIRMED by Oleg 2026-07-14: BOROBUDUR CORE + COMBO TERMS.]**

  This supersedes an earlier "Borobudur only" answer, which was given before the real tour
  inventory was known. All three tours turned out to be Yogyakarta-departing combos that
  include Prambanan (see TOURS), so a strict Borobudur-only scope would have targeted a
  product that is not actually sold. The resolution:

  - **Editorial core = Borobudur.** The temple, its tickets, quotas, upper-level climb, and
    sunrise viewpoints. This is where the site's depth and Dewi's expertise live.
  - **EMD + primary keyword stay "borobudur temple tour."** The domain keeps matching the
    head term; Phase 0 EMD positioning is intact.
  - **Keyword scope ALSO covers the combo and departure reality:** "borobudur prambanan
    tour", "yogyakarta borobudur tour", "borobudur sunrise tour", Merapi combo terms. These
    describe the real inventory and carry real intent.
  - **Money pages describe the FULL itinerary honestly.** A 12-hour Borobudur + Merapi +
    Prambanan tour is never presented as a Borobudur-only tour. The site is an independent
    guide to Borobudur that sends bookings to tours which include Borobudur.
  - Prambanan/Merapi/Mendut get only as much coverage as the tours require. They are not
    given standalone guide pages; that would drift the site off its EMD.

## MODEL
- Affiliate links to GetYourGuide / Viator for a real operator Oleg sends traffic to and helps with SEO.
- **[CONFIRMED by Oleg 2026-07-15]: the three featured tours are DEWI LESTARI'S OWN tours.**
  She is an official Borobudur guide; the tours are her inventory, listed on GetYourGuide and
  Viator, and the site exists to grow her sales through those platforms. Site copy must never
  describe the tours as coming from "different operators" or disclaim a relationship with her.
  Honest framing everywhere: "these are Dewi's tours, listed on GYG/Viator; booking through our
  links pays us a disclosed commission." The site is still NOT the temple's operator and NOT
  the ticketing authority, and says so.
- Named author / expert byline: Dewi Lestari (see AUTHOR)
- Primary KPI: affiliate clicks / bookings to GetYourGuide and Viator

## AUTHOR (must be a real person)
Supplied by Oleg 2026-07-14. Per root CLAUDE.md, Oleg's real input is a trusted source, so
these credentials are taken as verified and are not re-litigated.

- Name: Dewi Lestari
- Role (honest): OFFICIAL Borobudur temple guide and cultural heritage specialist, based in
  the Yogyakarta region of Central Java, Indonesia. Guiding Borobudur since 2022. The three
  featured tours are her own (confirmed by Oleg 2026-07-15).
- Real credentials / firsthand experience:
  - Local Javanese guide with knowledge of Borobudur's history, Buddhist heritage, relief
    panels, and architecture.
  - Professional guided tours of Borobudur since 2022.
  - Has served over 1,000 international travellers.
  - Specialises in educational, culturally respectful guiding; often guides sunrise visits.
- Bio (clean, rules-compliant): **REWRITTEN 2026-07-14.** Every fact below comes from Oleg's
  supplied bio. What changed is only the wording: removed "ensures" (banned), the marketing
  register ("magical and serene", "lasting memories", "smooth and engaging delivery"), and the
  templated "Whether guests join X or Y" closer. No claim was added.

  > Dewi Lestari has been guiding visitors around Borobudur since 2022. She is Javanese, lives
  > in the Yogyakarta region, and has walked more than a thousand international travellers
  > through the temple's relief panels and up onto its terraces.
  >
  > Her focus is the thing most visitors miss. Borobudur is not just the silhouette in the
  > photographs. It is a Mahayana Buddhist monument whose walls carry a narrative you can
  > actually follow, panel by panel, if someone shows you where to look. Dewi explains the
  > carvings, the architecture, and what the place means to the people who live around it.
  >
  > She guides sunrise visits and daytime ones. She works with couples, families, and small
  > groups, and she is careful about the fact that Borobudur is a sacred site rather than a
  > backdrop.

  **NOT YET APPROVED — needs two things before it ships:**
  1. **Oleg or Dewi to confirm the wording is fair.** It is her name on it.
  2. **A real photo of Dewi** (see Photo path). No byline image, no `/about/` page until then.

  DRAFTING NOTE: the phrase "more than a thousand international travellers" restates Oleg's
  "served over 1,000 international travellers" and is tied to her BOROBUDUR guiding, per the
  authority boundary below. Do not restate it as covering the full combo itinerary.
- Photo path: **[ASK OLEG]** — a real photo of Dewi is required for the author slots
  (`author_thumb`, `author_portrait`). Never AI-generated (root rule: people are uploaded,
  never generated). No byline photo ships until this exists.
- Verification line basis: the official Borobudur conservation/ticketing authority for entry,
  quota and climb rules; the operator's own GYG/Viator listings for tour facts. Confirmed in
  Phase 1, not assumed.

> **AUTHORITY BOUNDARY.** **[CONFIRMED by Oleg 2026-07-14: Dewi guides the FULL itinerary]**,
> so first-person experiential framing is licensed across Borobudur, its sunrise viewpoints,
> Prambanan, Candi Mendut, and the Merapi jeep tour. Oleg's input is a trusted source under
> root CLAUDE.md, so this is treated as verified.
>
> Two limits still hold, because they are not what Oleg confirmed:
> - Her supplied credentials describe BOROBUDUR depth (history, Buddhist heritage, relief
>   panels, architecture). They do not claim equivalent scholarly depth on Prambanan's Hindu
>   context or Merapi's geology. She can say she guides those; the site should not invent
>   specialist authority for her there.
> - "Since 2022" and "1,000+ travellers" attach to her Borobudur guiding as supplied. Do not
>   restate them as though they cover the full combo itinerary unless Oleg confirms that too.

## TOURS
The definitive set, supplied by Oleg 2026-07-14. Figures below were pulled from the live
listings via Grok web_search on 2026-07-14 and are the operator's/platform's own, attributed
to GYG/Viator, never claimed as this site's data. Sorted by review count as the booking-volume
proxy. Re-verify prices before launch: they are dynamic and two are unconfirmed.

**1. GetYourGuide — "Yogyakarta: Borobudur Sunrise Climb & Prambanan with Pickup"**
- https://www.getyourguide.com/yogyakarta-l349/yogyakarta-borobudur-climbup-guarantee-and-prambanan-tour-t516797/?partner_id=MME1WGW&utm_medium=online_publisher
- 4.9 / 1,682 reviews. From $25 (a $19 pp option was also shown). Duration not confirmed.
- Departs Yogyakarta (hotel pickup). Visits: Borobudur (climb-up access), Setumbu Hill, Prambanan.

**2. Viator — "Borobudur Sunrise from Setumbu Hill, Merapi Volcano & Prambanan Full Day Tour"**
- https://www.viator.com/tours/Yogyakarta/Borobudur-Sunrise-Merapi-Volcano-lava-tour-and-Prambanan-Full-Day-Tour/d22560-214335P1?pid=P00062370&mcid=42383&medium=link
- 4.9 / ~1,095 reviews. Price not confirmed. ~12 hours.
- Departs Yogyakarta (hotel pickup). Visits: Punthuk Setumbu (sunrise), Borobudur (climb to top),
  Merapi Volcano (jeep tour), Prambanan.

**3. Viator — "Borobudur Temple Climb To The Top & Prambanan Temple - 1 day tour"**
- https://www.viator.com/tours/Yogyakarta/Budha-Voyage/d22560-214335P5?pid=P00062370&mcid=42383&medium=link
- 4.9 / 672 reviews. Price not confirmed. ~8 hours.
- Departs Yogyakarta (hotel pickup). Visits: Borobudur (climb to top), Candi Mendut /
  Mendut Monastery, Prambanan.
- NOTE: the URL slug says "Budha-Voyage" but the real listing title is the one above. Use the
  real title on-page, never the slug.

### ⚠️ SUNRISE — CORRECTED 2026-07-14 AFTER VERIFICATION. READ BEFORE WRITING ANY SUNRISE COPY.

An earlier draft of this file said "any copy implying sunrise from the monument itself would be
false." **That was wrong and is retracted.** Verification against InJourney found the opposite:

- **Temple-top sunrise officially EXISTS.** InJourney sells a "Borobudur Sunrise" product:
  IDR 1,000,000 international / 750,000 domestic, 04:00 WIB, **capped at 100 people/day**,
  including Upanat sandals, a guide, and breakfast at Manohara (the historic Manohara sunrise
  product survives inside this official package). Temple sunrise was restricted for a period and
  reopened; stale third-party sources still say it is gone.
- **Our three tours do NOT include it.** They deliver sunrise from **Punthuk Setumbu**, a hill
  roughly 2.5 km away with a distant view OF the temple.

**The honesty problem this creates.** Listing 1 is titled "Borobudur Sunrise Climb & Prambanan"
and listing 2 "Borobudur Sunrise from setumbu Hill". A page that says "Borobudur sunrise tour"
without qualification would sell a hill viewpoint under a name that a real, official, on-site
product legitimately owns. A reader would reasonably expect to watch sunrise FROM the monument
and would not get that.

**Binding rules for every sunrise page. [DECIDED by Oleg 2026-07-14: DISCLOSE, BUT KEEP IT
MINIMAL.]** Meet the honesty rule precisely; do not build the comparison into a feature.
1. **Always state the viewpoint explicitly**, every time, no exceptions: sunrise **from Punthuk
   Setumbu hill, looking toward Borobudur**, not from the temple structure. This is the
   non-negotiable part. An unqualified "Borobudur sunrise tour" is not permitted.
2. **Mention the official temple-top product briefly and factually** where sunrise is discussed
   (a sentence, not a section): it exists, it is separate, we do not sell it. Enough that no
   reader is misled about what they are buying. No comparison table, no dedicated page, no
   sustained argument for a product we earn nothing on.
3. Never imply our tours grant sunrise access to the monument.
4. Rule 1 is a floor and cannot be traded away for conversion. Rule 2 is deliberately scoped
   down; that is Oleg's call and is a legitimate reading of the disclosure duty, since the
   viewpoint is named plainly at every mention.
5. Commercial gap (premium official product we do not carry) is being raised with the operator
   separately, not solved in copy.

## IMAGERY (AI photography, 3.4c)
- **APPROVED by Oleg 2026-07-21:** apply the exoticcarrentallasvegas/Tokyo AI-photography
  standard to this site: every blog post and guide gets a unique AI-generated featured hero
  plus one image after each content H2 (FAQ sections skipped), produced ONLY via the 3.4c
  pipeline (newest gpt-image-* model + mandatory AI-detector critique loop + EXIF GPS geotag
  with the real coordinates of the scene depicted). Homepage and tour pages keep uploaded
  photos; Dewi's author photo stays real-only (none shipped yet, see AUTHOR).
- Site-specific prompt guards (from the sunrise honesty rules above): a "sunrise" scene is
  ALWAYS the view from Punthuk Setumbu hill looking toward a distant Borobudur across the
  misted plain, never people watching dawn from the monument terraces; no recognizable
  faces; no text, signage, or logos anywhere; respectful framing of a sacred site (no one
  standing on stupas, no drone-impossible angles presented as ground photos).

## CRO / CONVERSION LAYER (Phase 9, applied 2026-07-21)
- Reassurance verified live via Grok on 2026-07-21 for ALL THREE listings (record:
  `research/grok/2026-07-21-cro-reassurance-verify.json`): free cancellation up to 24 hours
  AND "reserve now, pay later" shown on the GYG flagship and both Viator listings. Both may
  be printed. No persistent demand badge on any listing (a transient "Booked 2 times today"
  on listing 3 is not printable); NO scarcity/urgency claims ship until a durable verified
  source exists.
- Review counts refreshed in the same pass: flagship GYG 4.9 / 1,723; Viator Merapi 4.9 /
  1,095; Viator day tour 4.9 / 674 (combined 3,492).
- Sticky-bar button wording (destination-neutral per the skill): "Book a Borobudur tour ->",
  linking the flagship GYG sunrise-climb listing.

## COMPLIANCE MODULE
- Status: **ON [CONFIRMED by Oleg]**
- Items to research (verified, each with source + "last verified" date). The list below is a
  set of RESEARCH PROMPTS, not facts. Every one is UNVERIFIED until Phase 1 confirms it
  against an official primary source (the conservation/ticketing authority) or Grok live
  search. Nothing here reaches a page before that, and the last-verified date is tracked
  behind the scenes, never stamped in visible copy:
  - Temple entry vs. upper-level climb: separate tickets, price, daily visitor quota
  - Whether an official guide must accompany upper-level climbs
  - Mandatory footwear (upali sandals) on the monument
  - Sunrise access: whether it runs, from where, and where it is legitimately sold
  - UNESCO / conservation-authority conduct rules and dress code
  - Child, age, and accessibility limits
  - Domestic vs. foreign-visitor pricing tiers
- These rules change often and are widely mis-stated by third-party blogs. That volatility is
  the reason the module is ON, and the reason each item needs a dated source rather than a
  once-and-done check.

### VERIFICATION RESULTS (2026-07-14). Full record: `research/compliance-verification-2026-07.md`

**VERIFIED against InJourney (official) — usable on-page:**
- Two ticket types exist: **Grounds/Pelataran** and **Structure climb/Naik Struktur**.
- The structure ticket **includes a guide and Upanat sandals**.
- **Upanat sandals are mandatory**: "All visitors are still required to wear upanat" (Mardijono
  Nugroho, Director, PT Taman Wisata Borobudur).
- **Open every day.** Structure 08:30–17:00; Ground 06:30–16:30. Monday restrictions ended in
  the third week of July 2025. Both earlier sources were wrong: Google's "closes 4:30 PM" is the
  *grounds* closing time misapplied site-wide, and the blog's "Tue–Sun 08:30–15:30" is stale.
- Official **Borobudur Sunrise** product exists (see the TOURS sunrise block above).

**NOT VERIFIED — must not be stated as fact:**
- **No daily climb quota could be found on any official page.** The widely repeated "1,200/day"
  behind competitors' "climb up guarantee" marketing is unconfirmed and looks stale: the
  operator's own 22 Jul 2025 statement reports Monday trial numbers of **3,000–4,000 climbers**
  and proposals of 5,000–10,000 under study. **Do not repeat the 1,200 figure or the scarcity
  framing.** (Distinct from the sunrise product's 100/day cap, which IS official.)
- **No official dress code exists**, in English or Indonesian, across InJourney's sites and
  Instagram. The commonly cited "shoulders/knees covered + free sarong" traces to
  `borobudurtickets.net`, a **competitor affiliate** — not a source we treat as authoritative.
  Only *event* rules are official (e.g. white clothing for Waisak).
- Age and accessibility limits on the climb: not found.
- **Foreign grounds-only price: do not publish.** Not merely missing but contradicted — news
  reports 400k/240k while the official page states grounds are "Only For Domestic Tourist".

### PRICES — RE-VERIFIED 2026-07-14 (2nd Grok pass, official ticketing site reached)

The official ticketing site **`ticket.injourneydestination.id`** was reached this time. Supersedes
the earlier "all prices REPORTED" note.

**VERIFIED — publishable (source: `ticket.injourneydestination.id`):**
| Item | Price | Note |
|---|---|---|
| Structure climb (Naik Struktur), **domestic** | **IDR 150,000** | **Overturns Google's KG figure of 120,000, which is STALE.** |
| Official **Borobudur Sunrise**, international | **IDR 1,000,000** | ~USD 62 |
| Official **Borobudur Sunrise**, domestic | **IDR 750,000** | cap 100/day, 04:00 WIB |

**VERIFIED inclusions — quoted verbatim, contradiction now RESOLVED:**
- **Structure climb:** "Access temple's structure - Wristband Ticket - Upanat (special temple
  sandals) as souvenir - Tour Guide". **No breakfast.**
- **Sunrise:** "Wristband Ticket - Flashlight - Upanat (special temple sandals) - Professional
  guide - Breakfast at Manohara Restaurant".
  (Earlier conflict explained: one source read Upanat-as-souvenir as a separate "souvenir" item.
  Manohara breakfast belongs to the Sunrise product only.)

**VERIFIED NEGATIVE FACT — commercially important:**
- **Foreigners cannot buy a grounds-only ticket.** The official page states the Borobudur Temple
  Ground (06:30–16:30 WIB) is "**Only For Domestic Tourist**". This resolves the earlier
  contradiction: the news figures of 400k/240k for foreign grounds entry are wrong or obsolete.
  A foreign visitor's options are the structure-climb ticket or the Sunrise/Sunset products.

**STILL NOT FOUND — must not be published:**
- **Foreign structure-climb price.** The official site shows no foreign/domestic split for the
  climb and gates real pricing behind a booking flow. Google's KG says 455,000 — but KG's
  domestic figure (120,000) is now PROVEN STALE against the official 150,000, so **treat the
  455,000 as untrusted**. Do not publish it.
- Domestic/foreign **child** prices for the climb: no child split shown.
- No "last updated" date is shown on any official price page.

**Why this matters for content (a real opening):** the official operator does **not** publish a
clear foreign price list, and gates it behind a booking flow. That vacuum is precisely why "How
much does it cost to go to the Borobudur Temple?" is an AI Overview question and why the ticket
cluster is KD 2. Our tickets page wins by explaining the *structure* honestly (two ticket types,
grounds is domestic-only, what each includes verbatim, sunrise at IDR 1,000,000) and stating
plainly that foreign climb pricing must be confirmed in the booking flow. That is more useful
and more honest than the invented figures rivals publish.

**Markup story, now verified:** rivals sell temple sunrise at **USD 95–136** against an official
**IDR 1,000,000 (~USD 62)** ticket. That gap is real and sourced.

**Access failures, recorded honestly:** UNESCO (whc.unesco.org) returned 403 to both curl and
WebFetch, readable only via Grok. InJourney's own Fact Sheet and Brochure links are 404. Grok
over-claimed: it labelled news-sourced figures "CONFIRMED" and accepted a competitor affiliate
as a dress-code source. Its confidence was downgraded throughout, and should be in future runs.

## REAL-USER-LANGUAGE SOURCES (for Phase 1.2 forum mining)
- Subreddits: **[PROPOSED]** r/indonesia, r/TravelSEA, r/solotravel, r/JogjaCity
- Forums: **[PROPOSED]** TripAdvisor Borobudur/Yogyakarta forums, Lonely Planet Thorn Tree
- (Confirm or replace. Phase 1.2 mines these for real visitor language.)

## SOCIAL LINKS (footer icons: Instagram, TikTok, Facebook, YouTube)
For each platform, use the real account URL if you have one. If not, use the
platform-search fallback pointing at the brand name, which can be swapped for a real
account later by editing this file.
- Instagram: **[ASK OLEG]** — search fallback currently shipped
- TikTok: **[ASK OLEG]** — search fallback currently shipped
- Facebook: **[ASK OLEG]** — search fallback currently shipped
- YouTube: **[ASK OLEG]** — search fallback currently shipped

## FTC DISCLOSURE
- Placement: footer, sitewide
- Disclosure text: **[PROPOSED]** carried over from the template's approved wording (it is
  model-generic, not Cambridge-specific): "Some links on this site are affiliate links to
  GetYourGuide and Viator. If you book through them we may earn a commission at no extra cost
  to you. We only link to the real tours described here. Prices and ratings shown are the
  operator's own current listing figures; check the live listing for today's price."

## ANALYTICS
- Google Analytics 4 measurement ID: G-G4EY7H0LVC (supplied by Oleg 2026-07-16, unique to
  this site)

## VERIFICATION (search-engine ownership; placed in base layout <head>, same on every page)
- Google Search Console (google-site-verification content):
  iz6NpKqVqRx7pMxqz4h9nlLl50MSCV0OT2ZClIMhGgE (supplied 2026-07-16)
- Bing Webmaster Tools (msvalidate.01 content): EB425C374ABF63F3582C19891DDD900A
  (account-level token, same across Oleg's sites per Phase 8.6; supplied 2026-07-16)
- LAUNCHED: SITE_INDEXABLE=true set in deploy.yml on 2026-07-16. Prices re-verified against
  ticket.injourneydestination.id the same day (150k domestic climb / 1M-750k sunrise, 100/day
  cap / grounds domestic-only / hours unchanged); record in research/grok/ + transcript.

## CLOUDFLARE / REPO (infrastructure identity)
- Cloudflare Pages project name: `borobudur-temple-tour` **[PROPOSED — new, distinct from
  Cambridge's `punting-tours-cambridge`]**
- GitHub repo (`admin/config.yml` > backend.repo): **[ASK OLEG]** — placeholder `OWNER/REPO-PENDING`
- Sveltia OAuth worker: reusing `sveltia-cms-auth.mytrip2somewhere.workers.dev`
  **[ASK OLEG — confirm its GitHub OAuth app is allowed to access the new repo]**
- Cloudflare account + API tokens: reused from `.env` (same account across pipeline sites)

## SITE-SPECIFIC NOTES
- Indexing: site builds `noindex,nofollow` on every page until the deploy workflow is flipped
  to `SITE_INDEXABLE=true` at launch (Phase 8.6b).
- Design: the Phase 3 CSS currently carries Cambridge's palette and type pairing as a
  placeholder. Phase 3.1's anti-template rule requires a distinct palette for this site
  before launch.
