# Competitor Content Audit — "borobudur temple tour" (US/en)

**Date:** 2026-07-14
**Phase:** 1.4
**Method:** WebFetch against live pages; Grok `/v1/responses` live web search where WebFetch was blocked (403); DataForSEO `serp_organic_live_advanced` for real ranking URLs.

## Method notes & honesty caveats

- **Word counts are estimates**, produced by the fetch model, not measured token/word counts. Treat as order-of-magnitude only (thin / medium / long-form).
- **Audley Travel returned HTTP 403** to WebFetch. Its section below is sourced from Grok live-search reading the page, not from my own direct fetch. Flagged inline.
- **snoezelsontheroad.com did NOT appear in the live organic top-12** when I re-pulled the SERP today (see below). The brief listed it at #8; I could not reproduce that. Audited anyway.
- Grok's first answer on Borobudur rules **cited borobudursunrise.net and borobudursunrise.com as sources** — i.e. it was partly circular, quoting the competitors back at me. I therefore re-verified every load-bearing fact against the official InJourney ticketing platform directly. Only the officially-confirmed facts are asserted below.

## Live SERP re-pull (DataForSEO, US/en, today)

Organic positions as actually returned:

| rank_absolute | domain | URL |
|---|---|---|
| 2 | getyourguide.com | /borobudur-l88720/ |
| 4 | borobudursunrise.com | / |
| 5 | tripadvisor.com | Attractions-g790291-Activities-c42-… |
| 7 | come2indonesia.com | /tour/borobudur-prambanan-tour/ |
| 9 | en.wikipedia.org | /wiki/Borobudur |
| 11 | borobudursunrise.net | / |
| 12 | audleytravel.com | /us/indonesia/places-to-go/java/borobudur |

Ranks differ from the brief's list (which was clean 1–8); the brief's ranks were likely rank_group, and the SERP interleaves commercial units. **snoezelsontheroad.com is absent from this pull.**

---

## GROUND TRUTH: what the official source actually says

Established from `ticket.injourneydestination.id` (fetched directly) plus corroborated news. This is the yardstick for judging every competitor claim below.

- **Borobudur Sunrise ticket exists and is real.** Official page confirms: **IDR 1,000,000 international / IDR 750,000 domestic**, **start 04.00 WIB daily**, **limited to 100 people per day**. Inclusions quoted verbatim: *"Wristband Ticket, Flashlight, Upanat (special temple sandals), Professional guide, Breakfast at Manohara Restaurant"*.
- **On-temple sunrise reopened 17 July 2025** after being suspended since 2020 (pandemic). The pre-2020 Manohara sunrise program was discontinued and did not resume in its old form; the InJourney ticket is its successor.
- **Notable gap in the official source itself:** the official sunrise page **does not explicitly state whether you climb the structure or stay on the grounds**, and **does not state where the sunrise is viewed from**. The inclusion of **Upanat sandals** — mandatory only for structure access — is strong circumstantial evidence of structure access, but the official page never says so plainly. *This ambiguity at the source is why every competitor is vague here. It is the single best content opening in this audit.*
- **Separate product:** "Picnic Breakfast Dagi Abhinaya" — sunrise **from Dagi Hill**, 06.00–10.00 WIB, starting at Borobudur Cultural Center. Distinct from on-temple sunrise. **No price listed officially.**
- **Ground vs Structure ticket prices are NOT published on the official landing page** — they appear only during booking flow. Third-party figures circulate (IDR 375,000 vs 412,500 for ground; 455,000 for structure) and **conflict with each other**. I could not confirm either from the official source. Do not repeat a ground-ticket price without verifying it in the booking flow.
- **Punthuk Setumbu** is a separate, cheap, non-official attraction (foreigner fee reported IDR 50,000–100,000; unverified officially).

---

## 1. borobudursunrise.com — PRIORITY EMD RIVAL

**URL:** https://borobudursunrise.com/ (organic #4 — the highest-ranking true content rival)

### Structure (homepage, headings verbatim)

**H1:** `BOROBUDUR SUNRISE TOUR`

**H2s in order:**
- `Welcome to Borobudursunrise.com`
- `Book Now`
- `Featured Trip`
- `Additional Trip`
- `Borobudur Temple: A Journey Through Time and Culture`
- `Experience the Beauty and Culture of Borobudur with Our Tour Packages`
- `The Ultimate Tourist Destination`
- `Frequently Asked Question`
- `Contact us`
- `Visitor`
- `Recent Post`
- `Payment`

**H3s:** `[Yogyakarta Tour]`, `[Bromo Ijen Trip]`, `[Jomblang Cave]`, `[Local Experience]` — note the square brackets appear to be literal template artifacts.

### Depth
Estimated ~3,200–3,900 words including nav/footer/FAQ. **Medium.** Homepage is a product-grid + boilerplate hybrid, not a genuine long-form guide.

### E-E-A-T
- **No named author. No byline. No individual identified anywhere.** Company-attributed only.
- Operator identity present: **CV. NEXVENTURA**, Aster Street No 5, Srimulyo, Triharjo, Sleman, Yogyakarta 55514. Phone +62 811-1110-2600.
- **No license/NIB number** on the homepage (contrast .net, which publishes one).
- Trust signals: embedded TripAdvisor reviews (5-star, dated Feb 2026), UNESCO framing, generic "expert guides" claims.

### Booking model
Direct booking links per tour. No GYG/Viator/WhatsApp surfaced on the homepage. Payment section present.

### Practical facts published
- Start 3:30–4:00 AM; sunrise "Between 5:00 -6:00 depending on the season"
- **Two sunrise options offered: "At The Temple" and "Via Puthuk Setumbu Hill"** (their spelling — "Puthuk", missing the `n` in Punthuk)
- Pricing $90–$170; sunrise-only from **$90 (Punthuk Setumbu)** and **$110 (At The Temple)**
- Dress: comfortable clothes/shoes, light jacket, "modest clothing out of respect"
- "Bringing Food is prohibited when enter Borobudur temple"
- "there is a limit to the number of visitors allowed to witness the sunrise" — **quota acknowledged but number never given on the homepage**
- 2,672 relief panels, 504 Buddha statues
- Copyright © 2026

### Strengths
- **Correctly distinguishes temple sunrise from Punthuk Setumbu, and sells both as separate products.** This is the one rival that does not blur the distinction at product level.
- Their blog post `/best-spots-for-a-borobudur-sunrise-punthuk-setumbu-vs-the-temple/` is genuinely good and factually current — H1: `Best Spots for a Borobudur Sunrise: Punthuk Setumbu vs. The Temple`; H2s: `Sunrise at the Temple`, `Punthuk Setumbu`, `Comparison at a Glance`, `Option A: Punthuk Setumbu & Prambanan Tour`, `Option B: Merapi, Borobudur Climb Up & Prambanan`, `Which One Should You Choose?`, `Planning Your Trip with Borobudur Sunrise`, `Frequently Asked Questions (FAQ)`. It correctly quotes **IDR 1,000,000**, states *"Quotas are extremely tight and tickets sell out weeks in advance"*, gives entry ~4:30 AM / light ~5:15 AM, and Punthuk Setumbu at IDR 50,000–100,000 + 15-min hike. **~1,950 words. This is the strongest single competitor asset I found in this audit.**

### GAPS
- **No author on any page, including the good blog post.** No byline, no date on the comparison article — so its accuracy is unattributable and unverifiable to a reader.
- **The good facts are buried in a blog post, not on the money page.** The homepage never states the 100/day quota number, never states IDR 1,000,000, never explains the ground-vs-structure ticket. All the authority lives one click away from where the ranking and the buying happen.
- **Homepage never resolves the key ambiguity**: does "At The Temple" sunrise mean climbing the structure? It sells the product without describing the access.
- No last-updated markers anywhere. Copyright 2026 is the only recency signal.
- Template artifacts visible (`[Yogyakarta Tour]` bracket text) — sloppiness signal.
- No license number, unlike .net.
- Thin/boilerplate prose in the "Journey Through Time and Culture" / "Ultimate Tourist Destination" sections — generic encyclopedic filler.
- Misspells "Punthuk" as "Puthuk" in product naming.

---

## 2. borobudursunrise.net — PRIORITY EMD RIVAL

**URL:** https://borobudursunrise.net/ (organic #11)

### Structure (homepage, headings verbatim)

**H1:** `BOROBUDUR SUNRISE TOURS`

**H2s in order:**
- `CALL US TODAY`
- `Borobudur Sunrise Special Offers`
- `Mystical Morning: Sunrise at Borobudur Temple`
- `Private Car Hire with Professional Guide`
- `BOROBUDUR SUNSET SERENITY – DISCOVER JAVA'S TIMELESS BEAUTY`
- `Tour Package`
- `Contact Us`
- `Promo`
- `Info Tour`
- `Hotel`
- `Lates News`  *(sic — typo for "Latest News", live on the page)*
- `Rent Car`
- `Statistic`

### Depth
Estimated ~5,500 words. **Long-form by volume, but it is an operator catalogue** — pricing tables, itineraries, car-hire rate cards — not editorial depth.

### E-E-A-T
- **No named author. No individual identified.**
- Strongest *corporate* identity of any rival: **PT. BOROBUDUR DESTINASI UTAMA**, **NIB/license 0312250068342**, Jl. Temulawak RT01/RW04 No 40 Nologaten, Caturtunggal, Depok, Sleman, Yogyakarta 55281. Landline +62-274-485672.
- Payment rails named: Bank Mandiri, Wise, Credit Card (iPay88).
- **Publishes a real licence number — this is a genuine trust asset we should match or beat.**

### Booking model
**WhatsApp-first** (+628112640967, button links), plus phone, email, Telegram, Line. No GYG/Viator. No web booking form.

### Practical facts published — this is their strength
- Tour code `SUNRISE TC – 2025-201`
- **Sunrise location stated explicitly and, per official ground truth, CORRECTLY:** *"Enjoy sunrise at the top of Borobudur Temple"*, *"ascend to the summit of the world's largest Buddhist monument"*, itinerary line **"04:30–05:00: Walk to Borobudur (9th level)"**
- **Quota stated: "Limited to 100 visitors per day"** — matches the official InJourney figure exactly
- Full itinerary 03:00–11:00 (~8 hrs), incl. Pawon & Mendut, breakfast at Witarka Restaurant
- Tiered pricing, 2026 early season: 1 pax IDR 1,900,000 / USD 136; 2 pax 1,400,000 / 104; 3 pax 1,350,000 / 100; 4+ 1,300,000 / 95. Children 3–10: IDR 900,000 / USD 75; 0–2 free
- Sunset tour `SUNSET – 25-702` with own itinerary + rate table (1 pax USD 110 → 3+ USD 86)
- Camera policy quoted: *"Mobile phone or regular camera with kit lens is allowed. Professional cameras with telephoto lenses and tripods are not permitted."*
- Best season *"May – October"*; *"The experience will continue as planned even in rainy or cloudy weather"*
- Car hire rate card by guide language (English/Japanese USD 85→50; Mandarin USD 135→100, etc.)
- **"Updated Date: 30 April 2026"** — the only rival publishing an explicit last-updated date

### Strengths
- **The most factually accurate rival on the sunrise question.** Says "top of the temple", "9th level", "100 per day" — all consistent with the official ticket. They are not blurring anything.
- Only rival with an explicit **last-updated date** (30 April 2026) and a **published licence number**.
- Deepest operational specificity: tour codes, per-pax tiers, camera rules, child pricing.

### GAPS
- **Copyright year reads 2015** while content is dated April 2026 — a stale, conflicting recency signal in the footer.
- **`Lates News` typo live in an H2.** Alongside the 2015 copyright, this reads as a neglected template.
- **No named author, no human face.** Corporate-only. A licence number proves the company is real; it does not prove anyone there knows the temple.
- **Never explains the ticket structure to the buyer.** Charges **USD 95–136 pp** while the official sunrise ticket is **IDR 1,000,000 (~USD 62)** — a legitimate markup for private transport + guide + breakfast, but they never break out what the ticket costs vs what the service costs. **No rival does this. Buyers cannot tell what they are paying for.**
- Never mentions **Upanat sandals** despite selling structure access where they are mandatory.
- Never mentions **Punthuk Setumbu** at all — no comparison content, no acknowledgement the alternative exists. Cedes that entire query cluster.
- No ground-vs-structure ticket explanation.
- Weather claim *"will continue as planned even in rainy or cloudy weather"* is an operational policy presented where a buyer might want an honest expectation-setting discussion of wet-season sunrise odds. No such discussion exists.
- Email is a **gmail.com address** (`borobudursunrise.net@gmail.com`) despite owning the domain — weak professionalism signal next to the licence number.

---

## 3. come2indonesia.com — SECONDARY

**URL:** https://come2indonesia.com/tour/borobudur-prambanan-tour/ (organic #7)
*(Note: the brief described this as a "combo tour page" — confirmed. My first guess at the URL, `/borobudur-tour/`, 404'd; the real ranking URL came from the SERP pull.)*

### Structure (headings verbatim)
**H1:** `Borobudur & Prambanan: Java's Iconic Temple Journey`

**H2/H3s:**
- `Discover Java's most iconic temples in a single day`
- `Itinerary - Borobudur & Prambanan: Java's Iconic Temple Journey`
- `DAILY TOUR: BOROBUDUR & PRAMBANAN: JAVA'S ICONIC TEMPLE JOURNEY`
- `Photos - …` / `Price Includes` / `Price Excludes` / `Map - …` / `FAQ` / `Related Tours` / `Contact`

### Depth
Estimated ~2,400 words. **Medium, and it is a product template** — itinerary + includes/excludes + map, minimal editorial.

### E-E-A-T
- **No named author. No byline. No address. No licence number.** Weakest identity of the operators audited.
- Company: Come2Indonesia. WhatsApp +62 813-2909-0700, info@come2indonesia.com.

### Booking model
Website enquiry form + WhatsApp + email. No GYG/Viator.

### Practical facts
- Tour code C2I-JAVA17; 1 Day; difficulty "Easy"; Yogyakarta hotel pickup; 1–1.5 hr drive
- **No price listed on the page at all**
- Includes transport, entrance fees, English-speaking guide
- `"Prambanan Temple, and Keraton are CLOSED every MONDAY"`
- Best months April–October, peak July–August
- **No dress code stated**

### GAPS
- **Not a sunrise product and says nothing about sunrise** — no sunrise angle whatsoever. Ranks at #7 on "borobudur temple tour" purely on combo-tour intent.
- **No price.** Pure enquiry-capture.
- No ticket prices, no quota, no climb rules, no Upanat, no dress code, no opening hours for Borobudur itself.
- No author, no address, no licence — thinnest E-E-A-T of the three operators.
- No dates, no last-updated marker.
- The Monday-closure line covers Prambanan/Keraton; **Borobudur's own Monday status is not addressed** (third-party sources conflict on whether Borobudur still closes Mondays — see Gaps section).

---

## 4. snoezelsontheroad.com — SECONDARY (independent blog)

**URL:** https://www.snoezelsontheroad.com/en/indonesia/visiting-borobudur-and-prambanan-temples/
**Did not appear in my live organic top-12 pull today.** Audited per brief regardless.

### Structure (headings verbatim)
**H1:** `Visiting Borobudur and Prambanan temples: complete travel guide (2026)`

**H2/H3s:**
- `What are Borobudur and Prambanan`
- `Where are the temples Borobudur and Prambanan located`
- `Borobudur and Prambanan visits in one day`
- `Organized day tour` / `Private tour with your own driver` / `Public transportation` / `Driving a scooter yourself`
- `Visiting Borobudur: rules & tips` → `1) Arrange your ticket online`, `2) Borobudur opening hours`
- `Visiting Prambanan: rules & tips` → `1) Arrange your ticket online`, `2) Opening hours of Prambanan`, `3) Which temples to visit in Prambanan`
- `Where to stay for Borobudur and Prambanan`
- `Tips for visiting Borobudur and Prambanan`

### Depth
Estimated ~2,100 words. **Medium.** Genuinely practical, well-organised, transport-options-first — this is why it ranks (or ranked).

### E-E-A-T
- **No byline on the article.** Footer bio identifies **"Iris & Gert", two Belgian travel photographers** — real people, first-person travel experience, but **no byline on the post and no Borobudur-specific credential.**
- **Published: 23 June 2025.** H1 claims "(2026)" — **the title says 2026 but the publish date is June 2025.** No visible update date to justify the 2026 claim.

### Monetization
**Affiliate** — GetYourGuide, Booking.com, Skyscanner links, plus Buy Me A Coffee. This is the closest model to ours.

### Practical facts
- Ground Ticket `IDR 375,000 (~ €20)`; Structure Ticket `IDR 455,000 (~ €25)`; Prambanan `IDR 400,000 (~€22)` — **it is the only rival that publishes the ground-vs-structure distinction with prices**
- Borobudur gardens `6:30 am and 5:30 pm`; temple structure `Tuesday to Sunday between 08:30 and 15:30`; `Mondays, the temple is closed for maintenance`
- Climb: guided only, mandatory special slippers, **1,200/day, max 150 per hourly slot**, 1-hour climb with 10 min at top
- Dress code: `cover your knees and shoulders`

### THE STALE FACT — verified
> *"Note that some tours do advertise a sunrise at Borobudur. However, this sunrise is not at Borobudur itself but from a nearby hill and, according to many, not worth the effort."*

**This is wrong as of July 2026, and I can date exactly why.** The article published **23 June 2025**. On-temple sunrise officially reopened via the InJourney Borobudur Sunrise ticket on **17 July 2025** — roughly three weeks *after* publication. The claim was defensible when written and has been false for ~12 months. The page still carries **"(2026)" in its H1**, actively asserting currency it does not have.

**This is the single most exploitable factual error in the entire competitive set:** a well-ranked, well-structured, affiliate-model guide — our closest analogue — telling readers the exact product we sell does not exist.

### Other GAPS
- Ground ticket `IDR 375,000` conflicts with the 412,500 figure circulating elsewhere. **I could not confirm either officially** (prices aren't on the official landing page). One of them is stale. Worth resolving in the booking flow.
- Says slippers are mandatory but **never names Upanat**.
- No mention of the 100/day sunrise quota or IDR 1,000,000 sunrise ticket (consistent with its pre-reopening publish date).
- No byline on the article itself.
- Monday-closure claim needs verification — it may itself be stale (see below).

---

## 5. audleytravel.com — SECONDARY

**URL:** https://www.audleytravel.com/us/indonesia/places-to-go/java/borobudur (organic #12)
**⚠️ WebFetch returned HTTP 403. Everything below is via Grok live search reading the page, not my own fetch. Lower confidence than other sections.**

### Structure (headings as reported)
**H1:** `Visit Borobudur, Indonesia`
Sections: `History of Borobudur`, `Suggested itineraries featuring Borobudur`, `Map of Borobudur`, `Places near Borobudur`, `Photos of Borobudur`, `Our expert guides to exploring Borobudur`, `Speak to a certified Indonesia specialist…`, `Why travel with Audley?`

### E-E-A-T
- Page states: *"Written by our specialists from their own experiences of visiting Borobudur…"*
- Names **three specialists with titles**: **Matthew** (Southeast Asia, Alaska & Maldives Specialist), **Jack** (Southeast Asia Specialist), **Zachary** (Indonesia & Thailand Specialist).
- **First names only. No surnames, no bios, no credentials beyond a job title.** This is *persona* E-E-A-T, not verifiable authorship. Backed by heavy brand authority.

### Booking model
Tailor-made only. Phone (617-223-4155), "REQUEST A QUOTE", "Make an inquiry". No direct purchase; itineraries are inspiration only.

### Practical facts
**Essentially none.** Per Grok: no ticket prices, no opening hours, no climb quota rules, no dress code. On sunrise: **no guidance at all** — four photo captions read *"Sunrise at Borobudur"* with no explanation of where, how, or whether it is bookable.

### GAPS
- **Ranks on brand authority while publishing near-zero practical detail.** Wide open on every factual query.
- Uses "Sunrise at Borobudur" imagery **without ever explaining the sunrise access rules** — arguably the most misleading treatment in the set, precisely because it says nothing while showing the pictures.
- No surnames, no verifiable individual expertise.
- No prices, hours, quotas, dress code, Upanat, or ticket types.

---

## 6–8. Platforms (one line each, per brief)

- **getyourguide.com** (`/borobudur-l88720/`, organic #2; 4.8 / 10,979 reviews): a marketplace location hub — filterable product cards, aggregate ratings, no editorial guide content; also occupies the paid "Sponsored tickets & tours" commercial unit above organic (products from $15/$16/$25).
- **tripadvisor.com** (organic #5): listicle-format UGC aggregator, "THE 10 BEST Borobudur Tours & Excursions (2026)" — ranked operator cards driven by review volume, no first-party facts.
- **en.wikipedia.org** (organic #9): encyclopedic history/architecture reference — zero visitor-practical content (no tickets, hours, or booking), serves informational intent only.

---

# GAPS WE CAN WIN

Synthesised across all audited rivals. Ordered by opportunity size.

### 1. Nobody answers the question the official source itself dodges: *what does "sunrise at Borobudur" actually get you?*
The official InJourney page sells the sunrise ticket **without stating whether you climb the structure or stay on the grounds, and without saying where you watch the sunrise from.** Because the source is vague, every rival is vague or silent:
- `.net` asserts "top of the temple / 9th level" (correct, but asserted without evidence)
- `.com` sells "At The Temple" without describing the access
- Audley shows sunrise photos and explains nothing
- Snoezels says on-temple sunrise **doesn't exist**
- come2indonesia never mentions sunrise

**The winning asset:** one page that states plainly — sunrise access is the **InJourney Borobudur Sunrise ticket, IDR 1,000,000 international / IDR 750,000 domestic, 04.00 WIB start, 100 people/day**, and that the **Upanat sandals + guide in the inclusions are what tell you it is structure access**, since the official page never spells it out. Show the reasoning. Nobody has done this. Our named guide can state it from having walked it.

### 2. A verifiably false claim on our closest analogue, with a datable window
snoezelsontheroad — affiliate model, our exact format — states *"this sunrise is not at Borobudur itself but from a nearby hill."* Published **23 June 2025**; on-temple sunrise reopened **17 July 2025**. Wrong for ~12 months, still carrying **"(2026)" in its H1**. Target its entire query set. Its ground-vs-structure ticket table (its main asset) can be beaten simply by being current.

### 3. The three-way sunrise distinction that nobody draws cleanly
There are **three** different "Borobudur sunrise" products and no competitor lays out all three:
1. **On-temple sunrise** — official InJourney ticket, IDR 1,000,000, 100/day, 04.00
2. **Punthuk Setumbu** — separate private hill, ~IDR 50,000–100,000, 15-min hike, view *of* the temple from ~3km away
3. **Picnic Breakfast Dagi Abhinaya** — official, **Dagi Hill**, 06.00–10.00, from Borobudur Cultural Center — **no price published anywhere, and not one competitor mentions it**

`.com`'s blog covers (1) vs (2) well — but it is the only rival that does, has no author or date, and buries it away from its money page. **Nobody covers (3). Dagi Abhinaya is an uncontested official product.**

### 4. Nobody breaks out ticket cost vs service cost
`.net` charges USD 95–136 pp; the official ticket is ~USD 62. `.com` charges $110 "At The Temple". Neither tells the buyer what the ticket costs vs what the transport/guide/breakfast costs. come2indonesia publishes **no price at all**. Audley publishes nothing. **An honest cost breakdown — "the ticket is IDR 1,000,000; here is what a tour adds on top" — is unoccupied territory and builds exactly the trust an affiliate site needs.**

### 5. The named-author gap is real, and it is our single cleanest edge
**Not one rival has a named individual author with credentials.**
- `.com` — no author, anywhere, including on its best content
- `.net` — no author (but does publish licence NIB 0312250068342)
- come2indonesia — no author, no address, no licence
- snoezels — "Iris & Gert", Belgian photographers, real people with real travel experience, **but no byline on the post and no Borobudur-specific credential**
- Audley — first names + job titles only (Matthew, Jack, Zachary); no surnames, no bios

**Dewi Lestari — full name, real person, guiding at Borobudur since 2022 — is strictly more than any rival offers.** The bar here is on the floor. Author box, photo, surname, guiding history, ideally licence number, byline + last-updated on every page. Caveat: an author box alone is not a ranking mechanism — it converts to advantage only when attached to first-hand facts nobody else publishes (gaps 1, 3, 4), which is exactly what a working guide can supply.

### 6. Recency signals are weak-to-broken across the board
- `.net` — **copyright 2015** in the footer beside content dated 30 April 2026; `Lates News` typo live in an H2
- `.com` — copyright 2026 only; **no last-updated date on any page**, including its good comparison article
- come2indonesia — no dates at all
- snoezels — **H1 claims "(2026)", published June 2025**, no update marker
- Audley — no dates reported

**Only `.net` publishes an explicit last-updated date.** Visible `dateModified` + a real byline on every page beats the entire field on trust signalling, cheaply.

### 7. Facts to nail down before publishing (do NOT copy rivals here)
- **Ground ticket price is genuinely unresolved.** snoezels says **IDR 375,000**; other sources say **412,500**; structure ticket reported **455,000**. **The official landing page publishes no prices** — they surface only in the booking flow. One of these is stale. **Verify in the live booking flow before publishing any figure.**
- **Monday closure is unverified and possibly stale.** snoezels says `Mondays, the temple is closed for maintenance`; other sources suggest it is now open daily. come2indonesia's Monday note covers only Prambanan/Keraton. **Verify.**
- **Dagi Abhinaya has no published price.** First site to publish it accurately owns the term.
- **Upanat sandals**: mandatory for structure access since ~2022. snoezels says "special slippers" without naming them; `.net` never mentions them at all despite selling structure access. **Naming them correctly is a small, cheap first-hand-knowledge signal.**

### 8. Query clusters cleanly ceded
- **`.net` never mentions Punthuk Setumbu** — no comparison content at all
- **Nobody mentions Dagi Abhinaya**
- **Nobody discusses wet-season sunrise odds honestly** — `.net` says only *"will continue as planned even in rainy or cloudy weather"*, which sets no expectations
- **Nobody covers sunrise ticket booking mechanics** — `.com`'s blog says only that quotas "sell out weeks in advance"; nobody explains how far ahead to book, or what to do when sold out
