# Borobudur Compliance Fact Verification — July 2026

**Last verified: 2026-07-14** (applies to every item unless noted)

**Method.** Primary source attempted first by direct fetch: the official operator site (InJourney Destination / PT Taman Wisata Candi). Secondary: Grok live web search (xAI Agent Tools API, `grok-4-fast` + `web_search`). UNESCO was attempted directly and was **unreachable** (see below).

**Confidence key**
- **VERIFIED** — confirmed from an official/primary operator source, quoted verbatim.
- **REPORTED** — only from secondary sources (news/blogs/OTAs/affiliates). Not official.
- **NOT VERIFIED** — could not be confirmed. Treated as unknown, not as false.

---

## Summary table

| # | Item | Finding (short) | Confidence |
|---|------|-----------------|------------|
| 1a | Two ticket types exist (Pelataran/courtyard vs structure climb) | Yes — confirmed verbatim on official site | **VERIFIED** |
| 1b | Domestic prices + foreign structure prices | Match the Google KG figures, but only via a Dec-2025 news table | **REPORTED** |
| 1c | Foreign grounds-only price | Conflict: news says IDR 400k/240k; official site says grounds are "Only For Domestic Tourist" | **NOT VERIFIED** |
| 2 | Daily quota on structure climb | No official quota found. The widely-cited "1,200/day" is unconfirmed and likely outdated | **NOT VERIFIED** |
| 3 | Guide mandatory to climb | Tour Guide is officially **included** in the structure ticket | **VERIFIED** (bundled); "mandatory" = REPORTED |
| 4 | Upanat sandals required | Yes — required, provided free with ticket, kept as souvenir | **VERIFIED** |
| 5 | Sunrise from the temple | **Officially available** — "Borobudur Sunrise", IDR 1,000,000 / 750,000, 100 people/day | **VERIFIED** |
| 6 | Opening hours / Monday closure | Open **every day**. Structure 08:30–17:00; Ground 06:30–16:30. No Monday closure | **VERIFIED** |
| 7 | Dress code | **No official general dress code found anywhere.** Only event-specific rules | **NOT VERIFIED** |
| 8 | Age / accessibility limits on climb | No official minimum age or accessibility policy found | **NOT VERIFIED** |

---

## 1. Ticket structure and prices

### 1a. Are there two separate ticket types? — VERIFIED

**Finding.** Yes. Quoted verbatim from the official ticket site:

> "Entrance tickets to Borobudur. Choose 2 types of tickets: the courtyard ticket to enter the area around Borobudur, and the temple ticket, which allows you to climb the temple."

The structure ticket is officially named **"Borobudur Temple Upper Area Ticket"**. Its official inclusions, verbatim:

> "Price Includes — Access temple's structure / Wristband Ticket / Upanat (special temple sandals) as souvenir / Tour Guide"

**Source URL.** https://ticket.injourneydestination.id/en/borobudur-temple/ (mirrored identically at https://ticket.borobudurpark.com/en/borobudur-temple/)
**Confidence.** VERIFIED · **Last verified:** 2026-07-14

### 1b. Prices — REPORTED only (NOT on any official page)

**Important.** **No official page publishes any ticket price.** Prices exist only inside the booking flow, which runs on the Goers platform (`goersapp.com/venues/Candi-Borobudur--ndh9u8` for the structure, `.../Candi-Borobudur-Pelataran--8zxkmz` for the grounds). Both are behind Cloudflare and returned **HTTP 403** to every access method tried (curl with browser UA, WebFetch, and Grok's own crawler). So no price below is officially verified.

The best secondary source found is a Metro TV News price table (published **29 December 2025**), which attributes pricing to TWC/InJourney but cites no official statement:

| Category | Domestic | Foreign |
|---|---|---|
| Courtyard/Pelataran — Adult (10+ yrs) | IDR 50,000 | IDR 400,000 |
| Courtyard/Pelataran — Child (3–10 yrs) | IDR 25,000 | IDR 240,000 |
| Climb Structure — Adult | IDR 120,000 | IDR 455,000 |
| Climb Structure — Child | IDR 75,000 | IDR 305,000 |

**Against the figures we already held (Google KG):** Structure Foreign Adult 455,000 ✅ matches · Structure Foreign Child 305,000 ✅ matches · Naik Struktur Domestik Dewasa 120,000 ✅ · Domestik Anak 75,000 ✅ · Pelataran Domestik Dewasa 50,000 ✅ · Pelataran Domestik Anak 25,000 ✅. **All six pre-existing figures are corroborated by this one secondary table — but by only that one table, not by the operator.**

The same article also states domestic visitors must show original KTP/KITAS/KITAP to get the domestic rate.

**Source URL.** https://www.metrotvnews.com/read/KYVCeYpL-liburan-tahun-baru-ke-borobudur-cek-harga-tiket-masuk-terbarunya (29 Dec 2025)
**Confidence.** REPORTED (single secondary source; no official corroboration) · **Last verified:** 2026-07-14

### 1c. The missing foreign grounds-only price — NOT VERIFIED (active conflict)

**Finding.** This is the item we set out to find, and it is **contradicted**, not resolved:

- The Dec-2025 news table lists a **foreign courtyard ticket at IDR 400,000 (adult) / 240,000 (child)**.
- But the **official ticket page states the opposite**, verbatim:
  > "Borobudur Temple Ground: 06.30 - 16.30 WIB **(Only For Domestic Tourist)**"

  This restriction appears on both official ticket pages that mention the grounds.

Both cannot be true. Either the grounds ticket is domestic-only (and the news table is wrong or stale), or a foreign grounds ticket exists at 400k and the official site's note refers only to those specific early hours. Note also the oddity that makes the news figure look suspect: a foreign courtyard ticket at 400,000 would be only 55,000 less than the full structure ticket at 455,000 — an implausibly small gap for a much lesser product, which is weak circumstantial evidence against the 400k figure.

**Do not publish a foreign grounds-only price on the site until this is resolved.**

**Source URLs.** https://ticket.injourneydestination.id/en/borobudur-temple/ · https://ticket.injourneydestination.id/en/borobudur-temple-ground/ · https://www.metrotvnews.com/read/KYVCeYpL-liburan-tahun-baru-ke-borobudur-cek-harga-tiket-masuk-terbarunya
**Confidence.** NOT VERIFIED · **Last verified:** 2026-07-14

---

## 2. Daily visitor quota on the structure climb — NOT VERIFIED

**Finding.** **No official daily quota could be found**, and the evidence suggests the number competitors market against is stale.

- The official ticket page describes the structure ticket and its 08:30–17:00 window but **states no quota and no session limit**.
- An **official InJourney news item (22 July 2025)** quotes **Mardijono Nugroho, Director of PT Taman Wisata Borobudur**:
  > "There are no longer any restrictions on the day, tourists are allowed to climb to the top of the temple every day."

  The same item reports that Monday trial numbers reached **"3.000 to 4.000 people"**, and that the Magelang Regent has proposed **5,000–10,000 visitors daily**, still under study. It sets **no quota figure**.
- Secondary sources (multiple 2025–2026 travel blogs) consistently repeat **1,200 climbers/day, in ~8 timed sessions of ~150**, with a licensed guide per group. **None trace this to a current official statement.**

**Assessment.** The 1,200/day figure is REPORTED-only and is hard to reconcile with the operator's own report of 3,000–4,000 climbers on trial Mondays. It appears to be an outdated number that the travel web keeps recycling. A cap may well still exist in some form — we simply cannot confirm any number.

**Source URLs.** https://injourneydestination.id/en/2025/07/22/naik-candi-borobudur-bisa-tiap-hari/ (22 Jul 2025) · https://ticket.injourneydestination.id/en/borobudur-temple/
**Confidence.** NOT VERIFIED (no official number exists to cite) · **Last verified:** 2026-07-14

---

## 3. Is an official guide mandatory to climb? — VERIFIED (as bundled)

**Finding.** The official structure ticket **includes a Tour Guide** in the price, verbatim: "Price Includes — Access temple's structure / Wristband Ticket / Upanat (special temple sandals) as souvenir / **Tour Guide**". The official sunrise ticket likewise includes a "Professional guide".

**Nuance worth keeping.** What is officially verified is that a guide is **bundled into every structure ticket** — i.e. in practice you will be accompanied. The stronger claim that unguided climbing is *prohibited by rule* is asserted by secondary sources but is **not stated on any official page**. For site copy, "every structure ticket includes a guide" is the defensible phrasing; "a guide is mandatory" is an inference.

**Source URL.** https://ticket.injourneydestination.id/en/borobudur-temple/
**Confidence.** VERIFIED that the guide is included; REPORTED that it is compulsory · **Last verified:** 2026-07-14

---

## 4. Upanat / upali sandals — VERIFIED

**Finding.** Required, and **provided free with the ticket, kept as a souvenir**.

- Official ticket page, verbatim: "**Upanat (special temple sandals) as souvenir**" listed under "Price Includes".
- Official InJourney news (22 July 2025), verbatim: "**All visitors are still required to wear upanat, or special footwear, to protect the temple's structure from wear and tear.**"
- Upanat are also included in the official Borobudur Sunrise package.

Visitors do **not** need to buy or bring them. They are issued with the structure ticket.

**Source URLs.** https://ticket.injourneydestination.id/en/borobudur-temple/ · https://injourneydestination.id/en/2025/07/22/naik-candi-borobudur-bisa-tiap-hari/
**Confidence.** VERIFIED · **Last verified:** 2026-07-14

---

## 5. Sunrise access — VERIFIED (and it contradicts our working assumption)

**Finding.** **Sunrise at Borobudur temple itself IS officially available and on sale.** The operator sells a dedicated product, "**Borobudur Sunrise**". Quoted verbatim from the official page:

> "Enjoy the sunrise experience at Borobudur at a special price of **IDR 1,000,000 per person for International Tourists** and **IDR 750,000 per person for Domestic Tourists** (**Limited to only 100 people per day**)."

> "Price Includes — Wristband Ticket / Flashlight / Upanat (special temple sandals) / Professional guide / **Breakfast at Manohara Restaurant**"

Further official details, verbatim:
- **Starting Point: "Borobudur Temple"**; **Starting Time: 04.00 WIB**; schedule "Every day, 04.00 WIB".
- "The calm moments **before the site opens to the public** make the experience even more serene."
- Marketing text: "the first rays of sunlight touch the majestic stupas of Borobudur."

**On Manohara.** The historic Manohara sunrise product is not dead — **Manohara survives as the breakfast venue inside the official InJourney sunrise package**. Some TripAdvisor reviews claim the standalone "Manohara Sunrise" tour is "no longer available"; the branded standalone product appears to have been absorbed into the official InJourney offering. The *standalone* Manohara product's status is REPORTED/unclear; the *official* sunrise product is VERIFIED.

**One honest caveat.** The official page confirms the sunrise experience is **at the temple** and includes **Upanat** (which are only needed to walk on the stone structure) plus a guide — strongly implying structure access. But the page **never explicitly says you stand on the upper terraces at sunrise**. That last inch is inference, not verified text.

**Punthuk Setumbu** is a separate, third-party hill viewpoint outside the InJourney system — it is *a* way to see sunrise *over* Borobudur from a distance, not sunrise *at* Borobudur.

**⚠️ Site implication.** Our tours sell "Borobudur sunrise" while the itinerary delivers **Punthuk Setumbu hill**. Since an official on-site sunrise product demonstrably exists, describing a hill-viewpoint tour as "Borobudur sunrise" without a prominent, unambiguous statement that it is viewed **from a hill 2.5 km away, not from the monument**, is a live mis-selling risk. See "Actions" below.

**Source URL.** https://ticket.injourneydestination.id/en/borobudur-sunrise/
**Confidence.** VERIFIED (official product, price, quota, inclusions) · **Last verified:** 2026-07-14

---

## 6. Opening hours and the Monday question — VERIFIED (both claims in the conflict are wrong)

**Finding.** Official hours, verbatim from the official ticket page:

> "**Every day** — Borobudur Temple **Structure: 08.30 - 17.00 WIB** — Borobudur Temple **Ground: 06.30 - 16.30 WIB** (Only For Domestic Tourist)"

The structure ticket's stated **Starting Time is 08.30 WIB**. The official destination page also carries the banner "**Kini Buka Setiap Hari**" ("Now Open Every Day") regarding temple ascents.

**Resolving the conflict — neither source was right:**

- **Google KG's "Closes 4:30 PM" is half-right and misleading.** 16:30 is the **Ground** closing time. The **Structure closes at 17:00**. Google is quoting the grounds hours as if they were the site's hours.
- **The June-2025 blog ("Tue–Sun, 08:30–15:30", implying Monday closure) is wrong on both counts.** The 15:30 closing matches nothing official, and the **Monday closure no longer exists**. Officially, per InJourney (22 July 2025), quoting Director Mardijono Nugroho: *"There are no longer any restrictions on the day, tourists are allowed to climb to the top of the temple every day."* Monday restrictions **did** exist before the third week of July 2025 (Mondays were at times limited to students), which is why stale sources still repeat it.
- One secondary source (Metro TV, Dec 2025) still hedges that access "may close on designated maintenance days like Mondays" — this is **contradicted by the official operator statement** and should be disregarded.

**Minor unresolved detail.** The two official ticket pages disagree slightly on the grounds opening time: `/borobudur-temple/` says **06.30**, `/borobudur-temple-ground/` says **06.00**. Both say 16:30 close. Low impact; use 06:30 (the more frequently stated).

**Source URLs.** https://ticket.injourneydestination.id/en/borobudur-temple/ · https://injourneydestination.id/en/2025/07/22/naik-candi-borobudur-bisa-tiap-hari/ · https://injourneydestination.id/destinations/borobudur/
**Confidence.** VERIFIED · **Last verified:** 2026-07-14

---

## 7. Dress code and conduct rules — NOT VERIFIED

**This is the highest-demand item ("can girls wear shorts in indonesia?", 570 AI search volume) and it is the one I could not verify. Reporting that plainly rather than filling the gap.**

**Finding.** **No official general dress code or *tata tertib pengunjung* (visitor rules) for Borobudur could be located** — searched in both English and Indonesian, across `borobudur.injourneydestination.id`, `injourneydestination.id`, `borobudurpark.com`, the official ticket portal, and official InJourney/TWC Instagram. The official ticket pages list inclusions, hours and arrival advice, but **say nothing about clothing**.

What exists, and its true status:

- **Event-specific rules only (official).** Official TWC/@borobudurpark Instagram posts impose dress rules for *specific events* (e.g. Waisak/Lebaran): "pakaian yang sopan tertutup serta wajib berwarna putih" (modest covered clothing, must be white) and "Dress code putih untuk naik Monumen." **These are event rules, not the everyday visitor dress code**, and must not be generalised.
- **The "shoulders/knees + free sarong" claim is affiliate-sourced, not official.** Grok's support for it traces to `borobudurtickets.net/visitor-guide/` — a **ticket-reseller/affiliate site, i.e. a competitor, not an authority**. It claims modest dress is enforced at the climb checkpoint and free sarongs are provided. **I could not corroborate this from any official source and am not treating it as reliable.**
- **UNESCO: unreachable + no rules found.** https://whc.unesco.org/en/list/592/ returned **HTTP 403** to both curl and WebFetch, so I could not read it directly. Grok, which did reach it, reports the page covers management/preservation/visitor pressure but publishes **no visitor dress code or conduct rules**. Consistent with UNESCO's role — it does not set visitor dress rules for sites.
- **Historical sarong reports** (2011–2013 news about cloth distribution) exist but are old and unconfirmed for 2026.

**Assessment.** For the everyday visitor the honest answer is: **Borobudur has no publicly documented dress code.** It is a Buddhist monument operated as a state-run tourism park, **not an active Balinese Hindu temple** — the strict mandatory sarong-and-sash regime people associate with Bali is a *Balinese temple* rule and there is no evidence the operator imposes an equivalent at Borobudur. Modest dress is widely advised as etiquette. But "shoulders and knees must be covered at Borobudur" and "a sarong is provided" are **not verified** and must not be stated as rules on our site.

**Source URLs.** https://ticket.injourneydestination.id/en/borobudur-temple/ (no dress content) · https://whc.unesco.org/en/list/592/ (403, unread) · https://www.instagram.com/p/CsYfWqeSu0N/ (event-specific, official) · https://borobudurtickets.net/visitor-guide/ (affiliate, unreliable)
**Confidence.** NOT VERIFIED · **Last verified:** 2026-07-14

---

## 8. Child/age limits and accessibility on the structure climb — NOT VERIFIED

**Finding.** **No official minimum age and no official accessibility policy for the structure climb could be found.**

- **Age.** No official minimum age or under-10 prohibition appears on any official page. The only age-related figures are **pricing tiers from the Dec-2025 news table (REPORTED)**: child = **3–10 years**, adult = **10+**. These are fare bands, **not** a climbing age restriction — do not present them as one. Whether a separate minimum climbing age exists is unknown.
- **Accessibility.** No official statement. Secondary sources report the climb uses steep, narrow original Sailendra-era staircases (risers ~20–30 cm) with limited handrails and no ramps or lifts, making the upper structure **not wheelchair accessible**; ground-level areas are partially accessible with assistance. This is physically plausible and consistent across sources but is **operator-unconfirmed**.

**Source URLs.** https://www.metrotvnews.com/read/KYVCeYpL-liburan-tahun-baru-ke-borobudur-cek-harga-tiket-masuk-terbarunya (fare bands) · https://www.iwheeltravel.com/en/borobudur-prambanan-merapi-java-handicap-wheelchair-disability/ (accessibility, secondary) · https://borobudurtickets.net/visitor-guide/ (affiliate)
**Confidence.** NOT VERIFIED · **Last verified:** 2026-07-14

---

## Source reachability notes (for the next person who runs this)

| Source | Status |
|---|---|
| `borobudur.injourneydestination.id` (root) | **301 → `injourneydestination.id/destinations/borobudur/`.** The subdomain still works for some subpaths. |
| `ticket.injourneydestination.id/en/*` | ✅ **Best primary source.** Static, curl-readable. Mirrored at `ticket.borobudurpark.com`. |
| `goersapp.com` (actual booking engine, holds all prices) | ❌ **403 Cloudflare** to curl, WebFetch and Grok. **This is the single blocker on price verification.** |
| `whc.unesco.org/en/list/592/` | ❌ **403** to curl and WebFetch. Read only indirectly via Grok. |
| Official "Fact Sheet" / "Brochure" footer links | ❌ **404 — broken on the operator's own site.** (`injourneydestination.id/en/factsheet/`, `/en/brochure-page-2/`) |
| `borobudurpark.com/en/temple/borobudur/` | ❌ 404 |
| Grok live search (`/v1/responses` + `web_search`) | ✅ Worked. **Caveat: it labelled news-sourced figures "CONFIRMED" and leaned on an affiliate site for the dress code — its confidence labels were not trustworthy and were downgraded here.** |

---

## OPEN QUESTIONS / COULD NOT VERIFY

1. **Foreign grounds-only (Pelataran) price — and whether it exists at all.** Direct conflict: Dec-2025 news says IDR 400,000 adult / 240,000 child; the official site says the grounds are "Only For Domestic Tourist". *To confirm:* complete a real booking on `goersapp.com/venues/Candi-Borobudur-Pelataran--8zxkmz` from a browser (bypassing Cloudflare) with tourist type = foreign, or call the official call center **+62 811 2688 000** / email **info@injourneydestination.id**.
2. **All ticket prices, officially.** Every figure we hold rests on one Dec-2025 news table. No official page publishes prices. *To confirm:* browser session through the Goers booking flow, screenshot the price grid per tourist type; or call the call center.
3. **Whether any daily quota on the structure climb exists, and its number.** The marketed "1,200/day" is unconfirmed and sits badly against the operator's own 3,000–4,000 Monday trial figure. *To confirm:* ask InJourney directly; watch for the outcome of the "ideal balance" study referenced on 22 Jul 2025.
4. **Whether a guide is compulsory or merely bundled.** Bundling is verified; prohibition of unguided climbing is not. *To confirm:* operator statement.
5. **Whether the official Sunrise product actually puts you on the upper terraces** (vs. viewing the stupas from the base at dawn). Upanat inclusion strongly implies structure access but no official text says so. *To confirm:* operator, or a dated first-hand trip report.
6. **Everyday dress code — the biggest open item.** No official rule found in English or Indonesian. The "shoulders/knees + free sarong" story comes from a competitor affiliate site. *To confirm:* operator statement or an on-site photo of the posted *tata tertib* signage; UNESCO will not answer this.
7. **Minimum climbing age**, if any, distinct from the 3–10 child fare band. *To confirm:* operator.
8. **Official accessibility policy** for wheelchair users/elderly on the structure. *To confirm:* operator.
9. **Grounds opening time: 06:00 or 06:30?** The operator's own two pages disagree. Low impact.
10. **Standalone "Manohara Sunrise" product status** — appears absorbed into the official InJourney sunrise package; some TripAdvisor reviews say it is discontinued. Unconfirmed either way.

---

## Actions this forces on the site

1. **Sunrise copy is the urgent one.** An official on-site sunrise product exists (IDR 1,000,000 foreign, 100 pax/day). If our "Borobudur sunrise" tour actually delivers Punthuk Setumbu, the page must say plainly that sunrise is viewed **from a hill ~2.5 km away, not from the monument** — and ideally name the official on-site alternative. Selling a hill tour under the unqualified phrase "Borobudur sunrise" is a mis-selling exposure.
2. **Publish no dress-code rules.** Until verified, do not assert "shoulders and knees must be covered" or "a sarong is provided". For the high-volume shorts question, the defensible answer is that Borobudur publishes no official dress code, it is not an active Balinese temple, and modest dress is advisory etiquette — with the note that event days (e.g. Waisak) do impose real rules.
3. **Fix hours everywhere.** Structure 08:30–17:00, Ground 06:30–16:30, **open every day**. Remove any Monday-closure claim and any "closes 4:30 PM" as the site-wide closing time.
4. **Drop or heavily caveat "climb up guarantee"/1,200-per-day framing.** No official quota is confirmed; the 1,200 figure looks stale.
5. **Label prices as indicative.** No official price source exists; mark them "indicative, verify at booking" and date them. Do not publish a foreign grounds-only price at all yet.
6. **Do lead with guide + Upanat.** Both are officially verified as included in the structure ticket — genuine, checkable selling points.
