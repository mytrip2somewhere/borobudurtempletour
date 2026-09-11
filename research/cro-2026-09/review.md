# Borobudur Article CRO Review

Scope: 23 English articles, comprising 12 blog posts and 11 guides, 183 original editorial headings. The 14 other sitemap URLs are excluded and byte-identical to the current production baseline. No translations were found. Baseline source: 11d20b029c20222c46f884bdd6685f687d4413d3. The portfolio folder was stale, so the release was assembled from a fresh production checkout.

## Pass 1: Editorial And Decision Quality

Read the original article packets and product evidence, then authored the section plans in build/cro/copy.mjs. Checked the new copy against the actual section text rather than selecting by heading keywords. Existing Java tours serve the climb, paired-temple, transfer and dawn intents. Targeted provider discovery expanded the shortlist for Javanese tasting, hands-on batik, palace/market touring, Angkor, Komodo, Lombok snorkeling and a North Sumatra forest outing. Product registry records exact identity, attributed URL, duration, pickup/base, English-language evidence, inclusions, extras, age bands and uncertainties. Source API responses are retained locally but excluded from public build output and git.

Corrections made:

- Replaced generic repetitive mid-page/end cards and the old global sticky within these articles.
- Distinguished Setumbu hill sunrise, normal daytime climb and the separate Viator VIP temple-sunrise variant. The latter requires selection of TG3 and operator confirmation at least two days ahead.
- Removed claims that no linked tour offers temple sunrise.
- Reconciled Mendut temple promises with the current monastery substitution during renovation.
- Corrected two illustrative schedules that put the normal climb before 08:30, including the subsequent terrace/descent timings.
- Replaced categorical weather/refund claims with booking-term and safety qualifications.
- Corrected the claim that a Komodo visit necessarily needs a multi-day boat trip.
- Explicitly distinguished GYG all-inclusive admission bundles from transport-only options, and Viator TG4 half-day variants from the product's full-day headline.
- Preserved independent ticket/transport explanations and original authoritative links. No paid ceremony access, accessible climb, beach holiday or archival research was invented to fill an unsuitable section.
- Kept images editorial and labeled generated imagery as illustrative; selected source section images are relocated into contextual cards without introducing fabricated operator photography.

Detailed source edits: editorial-corrections.json plus git diff. Full source content remains editable markdown. Per-heading copy and action destinations: locked-plans.json.

## Pass 2: Rendered Experience And Conversion Path

Corrections made after the initial rendered build:

- Nested H3s in the ticket-inclusions section initially put the parent pitch after its children, breaking reading-order alternation. Moved the parent coverage immediately before its nested subsections while retaining its answer first. Added the normal-build tone check.
- A final omission audit found three endings with different variants of the same Viator product. Aligned their initial recommendation with the article’s authored closing choice, then consolidated them too.
- Consolidated the last same-product recommendation with the final Viator module, after all editorial/FAQ content. Removed the neighboring duplicate closing CTA.
- Limited native GYG calendars to one mid-article placement per page; other relevant GYG references remain concise contextual actions.
- Collapsed the attributed native-widget fallback beneath the provider calendar to avoid two visible authored booking actions.
- Preserved the existing main landmark ID so the original skip link continues to work.
- Kept native frames mounted within hidden containers: removing them during no-match had prevented reset from restoring their date controls. Reset behavior is covered by simulations.
- Removed an existing unrendered markdown class token from article prose.

Observed browser checks before the Mac became locked:

- All 23 routes loaded at actual 390 × 844 and 1280 × 800 widths. No page-level horizontal overflow; one contextual image card per page; heading/coverage counts matched; initial recommendation visible; one final booking link; old sticky absent.
- Screenshots reviewed blog opening, guide opening, the dense ticket guide, history guide, native GYG calendar and mobile end module.
- Mobile comparison button scrolled to the final module with the heading clear of navigation. Opened controls, selected a three-hour no-match, confirmed stale end links removed, reset and entered a travel date.
- Native GYG frame rendered its real product, date buttons and attributed booking URLs with partner_id=MME1WGW. Its provider-controlled recruitment footer is the exact approved exception. Provider branding was retained. Cross-frame date-button activation was unavailable through the exposed locator method; do not claim it passed.
- Desktop sticky appeared in plain editorial after 30%, disappeared beside native booking controls and reappeared after those controls left view. Dismissed it, reloaded the article, and observed the dismissal retained.

Deterministic tests: 391 negative build regressions, 1,437 DOM/handler simulation assertions over all articles at desktop/mobile widths, and server API whitelist/redaction/cache/failure tests. Simulations cover page positions, no-match, eligible changes, published ages, time, endpoint, language, seasonal ranking, reset, calculator arithmetic, jump/focus, dialog guards, Escape handler, once-per-session exit and continuous cross-article storage. Geometry, dialog APIs and provider responses are mocked in those tests; this is not evidence of physical pointer exit or native keyboard focus containment.

Limitations: actual pointer departure, cross-frame date activation and remaining native keyboard/mobile interactions are unverified. The Mac became locked during browser QA; no new access was requested. Viator server-secret provisioning was rejected by automatic approval review and explicit approval was requested. Until that approval is supplied, the API returns a tested 503 fallback with a working attributed booking link, and the second working provider-widget requirement remains blocked rather than passed. The source integration is complete and can be activated by the approved server-side secret.

No measured conversion lift or booking/revenue result is claimed. Existing GA4 remains intact; placement, article, product and variant fields enrich the existing affiliate_click event without duplicating it. Impression, selector, no-match, date and cost events use the same gtag integration and do not collect entered ages or quoted amounts.

## Release Gate

Available structural, editorial and simulated-behavior checks passed. Provider-secret and unavailable physical-interaction limitations above remain explicit. Rollback deployment ID is saved in cloudflare-before.json. Release/live results are recorded separately after deployment. This record does not label the blocked Viator provider integration complete.

## Published Result

GitHub Actions run 34553370493 completed successfully for source commit 26caefbc7b9e9d8a69ae6f719519577ae316a5ee. Cloudflare deployment: f887e585-4094-4694-910c-317a2fb04dfc. All 23 public article routes returned 200, passed the structural/affiliate/end-order gate and retained indexability plus the existing GA4 identifier. The two published client assets exactly matched their reviewed local bytes. The invalid-product API request returned 400, while the valid product returned the expected 503 missing-secret fallback. No key was uploaded. The pending approval remains required to activate Viator schedules.

Live verification used HTTP and parsed delivered HTML. Physical live browser checks could not continue after the Mac lock; this limitation is not reported as a passed browser test. All available pre-release browser observations and the simulated checks are described above. Final omission audit confirms that provider-secret activation is the remaining functional blocker; actual pointer/frame/keyboard interactions listed above remain unverified methods.
