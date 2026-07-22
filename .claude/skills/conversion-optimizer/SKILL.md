---
name: conversion-optimizer
description: Evidence-based conversion pass for pipeline affiliate sites - CTA system, sticky mobile bar, social-proof pairing, honest urgency, GA4 click tracking. Use when Oleg asks to maximize affiliate clicks / conversion rate, add CTAs, or run a CRO pass on any pipeline site.
---

# Conversion Optimizer (affiliate click-outs to Viator/GYG)

Goal: maximize clicks on the affiliate link WITHOUT dark patterns, invented urgency, or
carpet-bombing buttons. Built 2026-07-20 from a researched evidence base (regulator docs,
peer-reviewed persuasion research, named A/B tests) + the vaticanskiptheline.com funnel
teardown + Oleg's direct preferences. The single conversion is a click to the operator's
listing, so every tactic optimizes: land on any page -> 1-2 scrolls -> big button -> Viator.

## THE EVIDENCE-RANKED PLAYBOOK (apply top-down)
1. **One primary product, CTA repeated 3-4x per long page** (after hero/intro, after the key
   decision section, at the end). More placements = made-for-affiliate smell; fewer = missed
   prompt. Vatican reference site uses ~6 on a money page; editorial pages stay at 3-4.
2. **Reassurance microcopy under every money button** - the single biggest lever for a
   $300 impulse buy, and it is Viator's own verified offer: "Reserve now, pay later" +
   "Free cancellation up to 24 hours". Verify per product before printing (Grok the listing).
3. **Buttons, not text links, for the money click.** Text links stay as secondary in-prose
   reinforcement, bolded.
4. **Real rating + review count adjacent to CTAs** (`.cta-proof` line: "4.9 across 2,970+
   Viator reviews"). Peer-reviewed sweet spot is 4.2-4.7+ with visible counts >100 - use the
   real figure, attributed. This is Moore's "pragmatist evidence" in practice.
5. **Sticky bottom bar (mobile) / floating pill (desktop)**: price-from + rating + ONE
   button, appears only after scrolling past the first screen, `position:fixed` overlay
   (zero CLS), thin (<15% viewport), Google-interstitial-safe. Named tests: +8-25% mobile.
   Oleg's wording: the sticky button says "Book Exotic Car ->" (destination-neutral), NOT
   "on Viator".
6. **First CTA early, strongest CTA after the persuasion content** (peak-end: end every page
   on reassurance + button, never trailing into link clutter).
7. **Specific outcome copy**: "Book Your Track Drive - From $299 ->" / "Check Live
   Availability & Prices on Viator ->". Value + action beats "Learn more"/"Book now".
8. **Honest price anchoring**: real cross-category comparators only ("an F1 GA weekend is
   $809; driving yourself is $299"). NEVER fake strikethrough reference prices.
9. **Honest urgency ONLY from verified sources**: the platform's own badge if present (check
   live - do not assume), the operator's own published book-early advice, or the named
   author's firsthand observation attributed as such. Formula that converts without fear:
   real scarcity fact + free-cancellation dissolver ("Popular cars go first on busy
   weekends; free cancellation means reserving early costs nothing").
10. **Cognitive fluency at the decision moment**: short words on buttons, one idea per line
    in product boxes, describe booking as easy because it is ("2 minutes on Viator").
11. **Fogg B=MAT as the diagnostic**: traffic arrives motivated; work on Ability (friction,
    clarity, pay-later) and Prompt (placement) before amplifying desire.
12. **Whole-product page** (the one Moore transfer that matters): every pre-purchase doubt
    answered on-page (license? age? insurance? weather? deposit?) - an unanswered question
    is an abandoned click. Moore's positioning formula disciplines hero copy: "For [person]
    who [need], this is [category] that [payoff], unlike [alternative that costs more/does
    less]." The chasm/adoption-lifecycle model itself does NOT apply to impulse leisure.

## NEVER (regulator triggers + editorial trust-killers)
- Invented counters/timers ("3 people viewing", countdowns) - FTC dark-patterns report, UK
  CMA enforcement against Booking.com et al. We have no live inventory; any counter is a lie.
- Fake reference prices/strikethroughs; "X booked today" without a platform source.
- Mobile popups/overlays (Google interstitial demotion) - the thin sticky bar is the
  compliant substitute; it must never cover content or shift layout.
- Scarcity badges the platform does not currently show (verify each time; the Vegas listing
  had NO "likely to sell out" badge when checked, so we did not print one).
- CTA saturation and identical repeated buttons; scrubbed-perfect reviews (a lightly mixed
  verbatim review near a CTA outperforms polish).

## IMPLEMENTATION KIT (as built on exoticcarrentallasvegas.org)
- CSS: `.btn-xl` (hero/primary), `.cta-proof` (proof microline under buttons), `.cta-box`
  (mid-article conversion box), `.sticky-cta` (fixed bottom bar mobile / floating pill
  desktop, `.visible` toggled at scrollY>600, safe-area-inset padding, aria-label).
- base layout: sticky bar markup with `{{ tour_url:<slug> }}` + tiny JS (scroll reveal +
  GA4 outbound tracking: delegated click listener on `a[href*="viator.com"], a[href*=
  "getyourguide.com"]` firing `gtag('event','affiliate_click',{link_url,page_path,link_text})`
  - conversion measurement is what makes every future test readable).
- compile.mjs: `{{ cta_box }}` token -> the styled mid-article box (button + proof +
  reassurance) so content files carry one token, not pasted HTML; blog/guide closing CTAs
  carry proof + reassurance + honest-urgency lines centrally.
- Content: mid-article `{{ cta_box }}` after the main recommendation/comparison section;
  existing in-text affiliate anchors bolded; first internal tour-page link in each article
  gets an adjacent bold "check live prices" affiliate link (internal SEO link stays).
- Homepage order (Vatican-informed): hero(+CTA+proof) -> trust strip -> quick answer
  (audience filter) + immediate CTA -> product card -> decision sections each followed by a
  CTA (car tiers, requirements, location) -> testimonials -> final "Ready to book?" banner
  with reassurance + honest urgency + proof.
- Approved CTA wording set (Oleg, 2026-07-20): "Check Live Availability & Prices on Viator
  ->" (standard), "Book Your Track Drive - From $299 ->" (hero/value variant), "Book Exotic
  Car ->" (sticky bar only). Availability-widget JS keeps the check-availability framing.

## HARD-WON IMPLEMENTATION GOTCHAS (from the first rollout, 2026-07-20)
- **THE INVISIBLE BUTTON TRAP:** buttons inside article bodies sit under `.prose`, and
  `.prose a {color:accent}` (0,1,1) OUT-SPECIFIES `.btn-primary` (0,1,0) - the button
  renders accent-on-accent with INVISIBLE text. Every site MUST ship
  `.prose a.btn-primary, .prose a.btn-primary:hover { color:<btn text> }` (+ btn-brand/
  btn-ghost variants). Screenshot-verify a mid-article button on mobile before declaring done.
- **Verify string-replace patches actually matched:** a python `str.replace` that misses
  prints no error; the first attempt at the fix above silently never landed. Always grep the
  BUILT output for the new rule (count>0) after patching.
- **Proof-line restraint (Oleg's call after seeing v1):** the full proof line (rating +
  count + recommend% + cancellation) appears ONLY under the hero CTA; the sticky bar carries
  the compact form (star rating + count + from-price); all other CTAs stay clean, with
  reassurance living in adjacent prose. Stacking proof under every button reads congested.
- **Sticky bar on article pages:** desktop gets the full-width bottom bar too (not the
  floating pill) via a `body.article` class set by the compiler for blog/guide renders.
- **`.prose table` needs the same mobile scroll containment as data tables**
  (`display:block; overflow-x:auto` under 640px) or a wide table widens the page.
- **Mid-article box:** centered text, roomy padding, top accent border, full-width button on
  mobile, an `id` (e.g. cta-mid) so it can be deep-linked and screenshot-verified.

## MEASUREMENT
GA4 `affiliate_click` events are the KPI. Read them per page_path to find weak pages; test
one change at a time (wording, placement) and compare click-through per session. Do not
declare a tactic working without the event data.
