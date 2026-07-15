# 08-build-deploy.md — Phase 8: Build & Infrastructure

Generic. Read site specifics from `site.config.md`. Global rules live in root `CLAUDE.md`.

## PURPOSE
Scaffold the deployable repo: single-source-of-truth partials, Sveltia CMS (images + blog) with
Cloudflare OAuth, dual-source image optimization, Cloudflare Pages auto-deploy. Consistent
with decisions in Phases 2–7.

## 8.1 REPOSITORY TOPOLOGY
```text
├── .github/workflows/
│   └── deploy.yml                 # CI build + deploy
├── src/
│   ├── components/                # Phase 4 atomic block partials
│   │   ├── hero.html
│   │   ├── quick-answer.html
│   │   ├── product-card.html
│   │   ├── comparison-table.html
│   │   ├── faq-accordion.html
│   │   ├── map-embed.html           # interactive Google Maps iframe (Phase 3.5, embed-only)
│   │   ├── author-bio.html
│   │   ├── footer.html            # incl. social icons (site.config.md > SOCIAL LINKS)
│   │   └── ... (full Phase 4 library)
│   ├── layouts/
│   │   ├── base.html              # global shell: header, footer, GA + GSC/Bing verify, CSS tokens, schema slot
│   │   └── aeo-landing.html       # lean layout for single-question AEO pages
│   ├── pages/                     # page source files (call partials via includes)
│   ├── content/                   # ALL editorial content (manager-editable, 6.5c)
│   │   ├── blog/                  # markdown blog posts (Sveltia-editable, 8.3)
│   │   └── guides/                # markdown guides (Sveltia-editable, 8.3; hub auto-builds)
│   ├── data/
│   │   └── images.json           # {src,alt} per image slot (Sveltia-editable, 8.3)
│   └── public/
│       ├── assets/                # compiled CSS, system fonts, icons
│       └── images/
│           ├── uploaded/          # Sveltia media library (Oleg's photos)
│           └── generated/         # logo, favicon, infographics (Claude's SVGs)
├── admin/
│   ├── index.html                 # Sveltia CMS
│   └── config.yml                 # images + blog collections (8.3)
├── functions/                     # Cloudflare edge functions (if needed)
├── llms.txt
├── robots.txt
├── sitemap.xml
├── wrangler.toml                  # Cloudflare + OAuth worker config
├── CLAUDE.md                      # root router
├── site.config.md                 # per-site config
└── .claude/                       # phase files (00–08)
```
Tour/money-page data lives in page partials authored by Claude Code (NOT CMS-editable —
prices, ratings, affiliate links and schema stay under code control). Editorial content
(blog posts AND guides) lives as markdown under `/src/content/` and IS content-manager
editable via Sveltia (8.3, 6.5c); guide FAQ schema is derived from the body at build time
so editing cannot desync it. `src/pages/` is structural/money pages only.

## 8.2 SINGLE-SOURCE-OF-TRUTH PARTIAL COMPILATION
A light compile step stitches pages from `layouts/` + `components/` via single-line include
tokens (e.g. `{{ include "components/product-card.html" }}`). No component HTML copy-pasted
across files. `base.html` owns global elements: semantic header, footer (incl. social +
disclosure), the GA4 gtag.js snippet (site.config.md > ANALYTICS), the Google Search Console
+ Bing verification `<meta>` tags (site.config.md > VERIFICATION; identical on every page),
CSS tokens, the schema injection slot (Phase 5). Ask Oleg for all three values before launch
(Phase 5.4); the GA ID is per-site, the two verification metas are static per-site. Output is plain static HTML (preserves the Phase 5 zero-heavy-dependency
posture). This is a compiler, not a framework or CMS-rendered site.

## 8.3 SVELTIA CMS, IMAGES + BLOG (no money-page text)
Sveltia at `/admin`. Two collection groups for content managers:
- **Site images**: a `{ src, alt }` object per image slot, GROUPED BY PAGE (homepage, tours,
  guides, author) so a manager can find "which image is where"; both the photo AND a
  required keyword-relevant alt are editable (backed by `src/data/images.json`).
- **Blog**: a folder collection over `/src/content/blog/` — markdown body + frontmatter
  (title, description, hero image + hero alt, related_tour). New posts auto-appear in the
  blog hub + sitemap on build.
Still OFF-LIMITS in the CMS: price/rating/affiliate/schema/date text on money pages (those
stay in code; changing that reopens the raw-HTML choice, not a silent config tweak).
Cloudflare OAuth worker deployed for the GitHub authorization-code login (not PATs), so
managers "sign in with GitHub."

CMS COMPLETENESS RULES (learned launching Borobudur, 2026-07 — the admin shipped as a 3-slot
scaffold shell and stayed frozen while the site grew to 14 slots):
- THREE collections minimum: Site images, Guides, Blog. Guides and blog are BOTH markdown
  folder collections (`src/content/guides/`, `src/content/blog/`) with the same
  markdown-body editing model — see Phase 6.5c. `src/pages/` HTML is never used for
  editorial content.
- EVERY `{{ img:KEY }}` slot a page uses must be exposed in admin/config.yml in the same
  commit that adds the slot. The compiler carries a CMS COVERAGE GUARD that cross-checks
  images.json keys against config.yml and warns on the gap — keep it in every site's build.
- One image slot PER PAGE HERO: never share `home_hero` (or any slot) across several pages,
  or one upload changes them all and pages cannot be photographed individually. Each page's
  og:image uses its own hero slot.
- Media upload folders must EXIST IN GIT: git does not track empty directories, so each
  collection's `media_folder` needs a `.gitkeep` committed, or in-editor image inserts have
  no destination and fail silently.
- One GitHub repo PER SITE, always: Sveltia commits content into the repo it points at, and
  that repo's push triggers that site's deploy. Sharing a repo mixes content and deploys.
- Every hardcoded string in the compiler's rendered output (CTA headings, empty-state copy)
  must be config-driven or site-neutral: a "Ready to drive it yourself?" CTA from the
  go-kart site shipped on all 12 Borobudur posts because it was hardcoded in compile.mjs.

REUSING THE OAUTH WORKER ACROSS SITES (learned launching Borobudur; CORRECTED after the
dashboard path failed three times): one `sveltia-cms-auth` worker serves EVERY pipeline site
and gates callers by domain via its `ALLOWED_DOMAINS` binding. Critical facts:
- **It is a SECRET (`secret_text`), not a plain variable.** Secrets are write-only in the
  dashboard — you cannot see the current value, and dashboard edits repeatedly failed to
  reach the running worker. Do NOT send Oleg to the dashboard for this.
- **The reliable path is the API**, with an Account > Workers Scripts > Edit token
  (`CLOUDFLARE_WORKERS_API_TOKEN` in `.env`; the Pages token cannot touch Workers):
  `PATCH /accounts/{id}/workers/scripts/sveltia-cms-auth/settings` with multipart
  `settings=` JSON: the new `ALLOWED_DOMAINS` as `secret_text`, PLUS
  `{"type":"inherit","name":"GITHUB_CLIENT_ID"}` and same for `GITHUB_CLIENT_SECRET` —
  `inherit` preserves the OAuth secrets you cannot read. VERIFY the bindings survived with a
  follow-up GET; the PATCH response echoes only what you sent.
- **Infer the current allowlist by PROBING before writing** (you cannot read a secret):
  `curl -s -o /dev/null -w "%{http_code}" "https://<worker>/auth?provider=github&site_id=<domain>"`
  — 302 = allowed, 200 = blocked. The worker serves MULTIPLE sites (probe every known site's
  domain); an overwrite that drops one breaks that site's CMS.
- **List explicit hostnames** — apex, www, and the site's `<project>.pages.dev` preview.
  Wildcards work (`*` -> `.+` regex) but `*.pages.dev` would let ANY Pages site use your
  GitHub OAuth app; prefer explicit. Empty/missing ALLOWED_DOMAINS = allow everything.
- After writing, verify with the same probe: existing sites still 302, new domains 302, a
  nonsense domain still 200. The GitHub OAuth app itself needs no per-site change.
- Sveltia CACHES `config.yml` in the browser: after any CMS config change, hard-refresh
  /admin (Cmd+Shift+R) before concluding a change didn't work.

## 8.4 IMAGE OPTIMIZATION PIPELINE (both sources)
Both sources run through optimization: uploaded photography AND generated assets (logo,
favicon, infographics; maps are interactive embeds, not images). Target WebP/AVIF with fixed
dimension specs (feeds Phase 3 aspect-ratio wrappers and CLS protection), delivered over
Cloudflare's edge CDN. In the current build this conversion is handled at Cloudflare's edge
(Polish / Image Resizing) rather than a compile step; add a build-time optimizer only if a
site needs it.
`loading="lazy"` on below-the-fold media ONLY. The hero / LCP image is eager-loaded and
preloaded, never lazy-loaded (protects LCP).

## 8.5 MODULAR CLAUDE.md SYSTEM
Root `CLAUDE.md` router + `.claude/` files (00–08) + `site.config.md`, with the router's
task-trigger table so Claude Code loads only what each task needs. This is the modular
answer to keeping any single file from getting too big.

## 8.6 CLOUDFLARE PAGES DEPLOY
Deploy via **GitHub Actions** (`.github/workflows/deploy.yml` using
`cloudflare/wrangler-action`) on push to main, NOT the Cloudflare git-connect build flow.
Rationale (learned on this site): the dashboard git-connect path created a Worker that ran
wrangler with a scoped token and failed auth (error 10000); a GitHub Actions workflow with
`CLOUDFLARE_API_TOKEN` + `CLOUDFLARE_ACCOUNT_ID` secrets is the reliable path. The workflow
runs the compile (8.2) and `wrangler pages deploy dist`. Sveltia commits (images or blog)
trigger the same workflow, so content changes go live without a human build. The PAT used to
push the workflow file itself needs the `workflow` scope. Custom domain + HTTPS.

FIRST-DEPLOY GOTCHA (learned launching Cambridge): `wrangler pages deploy` does NOT
auto-create the Pages project in CI. A first run against a non-existent project fails with
`Project not found [code: 8000007]`. Fix baked into the template: an idempotent step BEFORE
the deploy that runs `npx wrangler@3 pages project create <project> --production-branch=main
|| true` (needs `CLOUDFLARE_API_TOKEN` + `CLOUDFLARE_ACCOUNT_ID` env). It no-ops once the
project exists. Alternative one-off: create the project via the API
(`POST /accounts/{id}/pages/projects` with `{"name","production_branch":"main"}`) or in the
dashboard. The `--project-name` must match across the create step and the deploy command.

PRE-LAUNCH INDEXING: ship `npm run build` (defaults to `noindex,nofollow`) while images are
placeholders and the domain/GA/verification are not wired. At launch, flip the workflow to
`SITE_INDEXABLE=true npm run build`. The `.pages.dev` preview URL stays noindex regardless,
which is what you want before the custom domain is live.

CUSTOM DOMAIN (learned launching Cambridge): attach the domain to the project via the Pages
API (`POST /accounts/{id}/pages/projects/<project>/domains` with `{"name":"<domain>"}`) for
apex AND www. If the zone is on Cloudflare DNS, Pages then needs the DNS records: apex and
www both as proxied `CNAME -> <project>.pages.dev` (Cloudflare flattens the apex CNAME, so
MX/SPF email records keep working — do NOT delete them). A Pages-scoped token CANNOT edit DNS
(needs a separate Zone > DNS > Edit token). On a registrar-imported zone (e.g. Namecheap),
delete the parking A record and the parking `www` CNAME first. SSL auto-issues in a few mins
once the records exist; poll the domains endpoint until status=active.

NO pages.dev REDIRECT VIA _redirects: Cloudflare Pages `_redirects` matches on PATH ONLY and
ignores the hostname in an absolute "from", so a cross-host `https://<proj>.pages.dev/* ->
https://<domain>/:splat` rule never fires. Do NOT ship it. The canonical tags on every page
(pointing at the custom domain) are the correct, sufficient way to stop the preview host from
being indexed separately. A hard 301 would require a Pages Function/`_worker.js` (not worth
the added risk to a live site).

SEARCH-ENGINE VERIFICATION tokens are NOT all per-site. GSC `google-site-verification` is
UNIQUE per property (per domain) - each site needs its own token, OR verify with no token via
the "Google Analytics" method once the GA4 tag is live. Bing `msvalidate.01` is ACCOUNT-level
- the same value verifies every site in your Bing account (or "Import from GSC"). So in the
pipeline, Bing's token is genuinely reusable across sites; GSC's is not.

NOTE on AI-bot access: Cloudflare can inject a managed "AI Crawl Control" block ABOVE the
repo `robots.txt` (Disallow GPTBot/ClaudeBot/Google-Extended + Content-Signal ai-train=no).
If the goal is AI-search visibility, the repo robots.txt alone is NOT enough — turn that
feature OFF in the dashboard (Security > Bots > AI Crawl Control). It cannot be removed from
the repo.
Long-cache headers for static design files (fonts, icons, CSS). Performance target is the
Phase 5 CWV gate (LCP < 2.5s, CLS < 0.1, INP < 200ms), not a separate response-time figure.

## 8.6b INDEXING GATE (noindex until launch)
Pages default to `noindex,nofollow` so an unfinished/placeholder site never gets indexed.
The compiler flips to `index,follow,max-image-preview:large` only when `SITE_INDEXABLE=true`
is set at build time. AT LAUNCH, set that env in the CI build step (e.g.
`- run: SITE_INDEXABLE=true npm run build` in the deploy workflow), NOT in the compiler
default, so local/dev builds stay safely noindex. After the first indexable deploy: confirm
the live `<meta name="robots">` reads `index,follow`, then verify ownership in Google Search
Console + Bing and submit the sitemap (Phase 5.4 verification tags must already be in place).

## 8.6c NEW-SITE IDENTITY RESET CHECKLIST (learned launching Borobudur, 2026-07)
The engine is generic ONLY if every identity-bearing location is reset. Cambridge->Borobudur
missed several and each leaked. When cloning the pipeline, reset ALL of these, then run the
verification greps at the bottom:

Code + config:
- `build/compile.mjs` identity block: SITE, SITE_NAME, AUTHOR_NAME, AUTHOR_ROLE, AREA_SERVED;
  `TOURS = {}` until intake; `MAPS = {}` (Cambridge shipped TOKYO coordinates labelled as
  Cambridge — always real, source-checked coords); no leftover CTA/copy strings (see 8.3).
- `src/layouts/base.html`: GA4 snippet COMMENTED OUT (new property per site, never reuse an
  ID — it pollutes both); GSC meta commented (unique per domain); Bing meta commented
  (account-level, reusable, but added deliberately); og:site_name.
- `src/components/nav.html` + `footer.html`: brand wordmark, contact mailto, social links
  (search-fallback pattern), tours column emptied until intake.
- `src/public/robots.txt` sitemap URL; `llms.txt` reduced to a flagged shell (Phase 7 writes
  the real one after research); `src/data/images.json` -> flagged placeholders only.
- `admin/config.yml`: repo, collections' tour selects, image slots (minimal shell is fine at
  scaffold time BUT the coverage guard must be wired so it cannot silently rot).
- `wrangler.toml` name, `package.json`/`package-lock.json` name, `.github/workflows/deploy.yml`
  project name and NO `SITE_INDEXABLE=true` (noindex until launch), `.env` header comment.
- `src/public/assets/css/styles.css`: palette + type are per-site identity (3.1/3.2); the
  layout/component rules are the engine. New favicon.svg + logo.svg (generated, simple mark).
- Fresh site.config.md from the BLANK template, never from another site's filled config.

Infra per site:
- New GitHub repo (one per site, 8.3) + Actions secrets CLOUDFLARE_API_TOKEN / ACCOUNT_ID
  (encrypt via the repo public key). New Cloudflare Pages project name. OAuth worker
  ALLOWED_DOMAINS += new domains via the API (see 8.6 note — it is a secret). DNS token must
  be scoped "All zones" or it cannot see a newly added zone (editing a token's scope keeps
  its secret unchanged). Custom domains: attach apex+www to the Pages project, then proxied
  CNAMEs -> <project>.pages.dev.

Verification (run ALL, on src AND dist):
- `grep -ri "<old site name/domain/brand>" src/ dist/` -> only intentional lesson-notes in
  .claude/ may remain; ZERO hits in anything that ships.
- grep for the old site's GA id / GSC token / Bing token / affiliate partner ids.
- Em-dash + banned-vocab sweep of dist INCLUDING non-HTML shipped files (05).
- Every page noindex; orphan check; exactly one H1 per page; CMS coverage guard clean.
- On ANY content refactor (HTML->markdown etc.): diff rendered word counts and block counts
  (tables/infogain/infographic/FAQ) before vs after — markdown's 4-space-indent code-block
  trap once silently escaped every HTML block into visible source text (6.5c).
- Do not trust success flags: verify the OUTPUT (a build that "succeeds" can render escaped
  garbage; an API PATCH that returns success can echo only part of the state — GET it back).

## 8.7 DELIVERABLES (handoff to Phase 9 QA)
Repo scaffolded to topology; working include-compile build with the full Phase 4 block
library as partials; Sveltia CMS (images + blog) at /admin + deployed Cloudflare OAuth worker
(wrangler.toml, config.yml); dual-source image optimization with correct hero/lazy rule;
analytics + GSC/Bing verification in the head (5.4) and the noindex-until-launch gate (8.6b);
modular CLAUDE.md router + sub-files; Cloudflare Pages auto-deploy verified, domain live.

## NOTE ON LATER PHASES
Phase 9 (pre-launch QA), Phase 10/11 (launch + indexing: flip the indexing gate on (8.6b),
verify ownership in Google Search Console + Bing and submit the sitemap; GA + verification
tags are already in the head from Phase 5.4), and Phase 12 (post-launch growth) were left
as-is in planning. Add them as separate files when you reach them, following the same generic
+ config-driven pattern.
