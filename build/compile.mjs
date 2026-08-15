#!/usr/bin/env node
/* Phase 8.2 — light include/compile step. Not a framework: it stitches
   layouts/ + components/ into plain static HTML via {{ include }} tokens
   and per-page meta/schema/content slots. Outputs clean-URL folders. */

import { readFile, writeFile, mkdir, readdir, copyFile, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, join, relative, extname, basename } from "node:path";
import { fileURLToPath } from "node:url";
import { marked } from "marked";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SRC = join(ROOT, "src");
const PAGES = join(SRC, "pages");
const LAYOUTS = join(SRC, "layouts");
const PUBLIC = join(SRC, "public");
const DATA = join(SRC, "data");
const CONTENT = join(SRC, "content");
const DIST = join(ROOT, "dist");

// ---- SITE IDENTITY (mirrors site.config.md; the only per-site block in this file) ----
const SITE = "https://borobudurtempletour.org";
const SITE_NAME = "Borobudur Temple Tour";
// From site.config.md > AUTHOR (confirmed by Oleg 2026-07-14).
const AUTHOR_NAME = "Dewi Lestari";
const AUTHOR_ROLE = "Borobudur temple tour guide since 2022";
const AUTHOR_THUMB_KEY = "author_thumb";
const AREA_SERVED = "Borobudur, Central Java, Indonesia";

// Indexing safety: default to noindex so the unfinished/placeholder site is not
// indexed. Flip on at launch with SITE_INDEXABLE=true npm run build.
const ROBOTS = process.env.SITE_INDEXABLE === "true"
  ? "index,follow,max-image-preview:large"
  : "noindex,nofollow";

// Tour affiliate links (single source of truth for blog "book now" CTAs).
// Mirrors the affiliate URLs on the tour pages / site.config.md > TOURS (intake 2026-07-14).
// Slugs match the Phase 2 architecture (research/architecture-2026-07.md).
const TOURS = {
  "borobudur-sunrise-climb-prambanan": { platform: "GetYourGuide", url: "https://www.getyourguide.com/yogyakarta-l349/yogyakarta-borobudur-climbup-guarantee-and-prambanan-tour-t516797/?partner_id=MME1WGW&utm_medium=online_publisher" },
  "borobudur-sunrise-merapi-prambanan": { platform: "Viator", url: "https://www.viator.com/tours/Yogyakarta/Borobudur-Sunrise-Merapi-Volcano-lava-tour-and-Prambanan-Full-Day-Tour/d22560-214335P1?pid=P00062370&mcid=42383&medium=link" },
  "borobudur-climb-prambanan-day-tour": { platform: "Viator", url: "https://www.viator.com/tours/Yogyakarta/Budha-Voyage/d22560-214335P5?pid=P00062370&mcid=42383&medium=link" },
};

// Secondary experience tours (extra-monetization pass, Grok-verified 2026-07-25;
// research/grok/2026-07-25-secondary-tours-verify.json). Higher-reviewed platform wins.
// Content references {{ tour_url:<slug> }}; never paste raw affiliate URLs in articles.
const SECONDARY_TOURS = {
  "prambanan-sunset-tour": "https://www.getyourguide.com/yogyakarta-l349/yogyakarta-prambanan-temple-sunset-tour-t138848/?partner_id=MME1WGW&utm_medium=online_publisher",   // GYG 4.8 / 93 (Viator alt had 6)
  "ramayana-ballet-prambanan": "https://www.getyourguide.com/yogyakarta-l349/sunset-at-prambanan-including-ticket-ramayana-ballet-show-t573785/?partner_id=MME1WGW&utm_medium=online_publisher", // GYG 4.9 / 89 (Viator 42)
  "yogyakarta-batik-class": "https://www.viator.com/tours/Yogyakarta/Batik-Master-Class-with-Full-Process/d22560-189399P8?pid=P00062370&mcid=42383&medium=link",           // Viator 5.0 / 107 (GYG 88)
  "angkor-wat-day-tour": "https://www.viator.com/tours/Siem-Reap/Full-Day-Angkor-Wat-Sunrise-Small-Group-Tour/d5480-68746P15?pid=P00062370&mcid=42383&medium=link",        // Viator 5.0 / 13,297 (GYG 742)
  "komodo-day-tour": "https://www.getyourguide.com/labuan-bajo-l106237/labuan-bajo-a-day-tour-of-komodo-island-with-6-destinations-t599722/?partner_id=MME1WGW&utm_medium=online_publisher", // GYG 4.8 / 1,630 (Viator 333)
};
function resolveTourTokens(html) {
  return html
    .replace(/(?:<p>\s*)?\{\{\s*tour_picks:([a-z0-9,-]+)\s*\}\}(?:\s*<\/p>)?/g,
      (m, slugs) => renderTourPicks(slugs.split(",")))
    .replace(/\{\{\s*tour_url:([a-z0-9-]+)\s*\}\}/g, (m, slug) =>
      SECONDARY_TOURS[slug] ? SECONDARY_TOURS[slug] : (TOURS[slug] ? TOURS[slug].url : m));
}

// Tour-picks conversion grid (depth-cro layer, ported from niagarafallsboattours.org 2026-08-15).
// {{ tour_picks:slug,slug,slug }} renders a 3-card grid: image + chips + title + verified proof
// + reassurance + sponsored CTA. Every anchor is rel="sponsored". Ratings/reviews are the real
// listing figures (Grok-verified 2026-07-25); cards emit direct image paths so the grid resolves
// after the image pass. No heading above the grid, no per-block disclaimer (footer FTC covers it).
const PICKS = {
  // ---- main featured tours (uploaded card images, resolved+encoded paths) ----
  "sunrise-climb-prambanan": { url: TOURS["borobudur-sunrise-climb-prambanan"].url, platform: "GetYourGuide", title: "Borobudur Sunrise Climb & Prambanan from Yogyakarta", rating: 4.9, reviews: 1723, c1: "Setumbu sunrise + climb", c2: "From Yogyakarta", cancel: "Free cancellation up to 24 hours; reserve now, pay later", img: "/images/uploaded/photo%20from%20borobudur%20temple%20sunrise%20tour.png" },
  "merapi-full-day": { url: TOURS["borobudur-sunrise-merapi-prambanan"].url, platform: "Viator", title: "Borobudur Sunrise, Merapi Volcano & Prambanan Full Day", rating: 4.9, reviews: 1095, c1: "12-hour full day", c2: "Jeep + two temples", cancel: "Free cancellation up to 24 hours; reserve now, pay later", img: "/images/uploaded/photo%20from%20borobudur%20temple%20tour%20%28Borobudur%20Sunrise%20from%20setumbu%20Hill%29.jpg" },
  "climb-day-tour": { url: TOURS["borobudur-climb-prambanan-day-tour"].url, platform: "Viator", title: "Borobudur Climb & Prambanan Day Tour, no dawn start", rating: 4.9, reviews: 674, c1: "No 3am alarm", c2: "About 8 hours", cancel: "Free cancellation up to 24 hours; reserve now, pay later", img: "/images/uploaded/photo%20from%20borobudur%20sunset%20tour.jpg" },
  // ---- secondary experiences (reuse existing 3.4c photos as card images) ----
  "prambanan-sunset": { url: SECONDARY_TOURS["prambanan-sunset-tour"], platform: "GetYourGuide", title: "Prambanan Temple Sunset Tour from Yogyakarta", rating: 4.8, reviews: 93, c1: "Late afternoon", c2: "Prambanan only", cancel: "Free cancellation up to 24 hours on GetYourGuide", img: "/images/generated/photos/is-prambanan-hindu-or-buddhist-hero.jpg" },
  "ramayana-ballet": { url: SECONDARY_TOURS["ramayana-ballet-prambanan"], platform: "GetYourGuide", title: "Ramayana Ballet at Prambanan, evening performance", rating: 4.9, reviews: 89, c1: "Evening show", c2: "Open-air stage", cancel: "Free cancellation up to 24 hours on GetYourGuide", img: "/images/generated/photos/is-prambanan-hindu-or-buddhist-should-you-visit-both-or-pick-one.jpg" },
  "batik-class": { url: SECONDARY_TOURS["yogyakarta-batik-class"], platform: "Viator", title: "Batik Master Class in Yogyakarta, full process", rating: 5.0, reviews: 107, c1: "Hands-on workshop", c2: "Half day", cancel: "Free cancellation up to 24 hours on Viator", img: "/images/generated/photos/is-yogyakarta-worth-visiting-is-yogyakarta-worth-visiting.jpg" },
  "angkor-day": { url: SECONDARY_TOURS["angkor-wat-day-tour"], platform: "Viator", title: "Angkor Wat Full-Day Small-Group Tour from Siem Reap", rating: 5.0, reviews: 13297, c1: "Siem Reap, Cambodia", c2: "Full day", cancel: "Free cancellation up to 24 hours on Viator", img: "/images/generated/photos/borobudur-or-angkor-wat-which-to-visit-hero.jpg" },
  "komodo-day": { url: SECONDARY_TOURS["komodo-day-tour"], platform: "GetYourGuide", title: "Komodo Island Day Tour from Labuan Bajo, 6 stops", rating: 4.8, reviews: 1630, c1: "Labuan Bajo, Flores", c2: "Speedboat day", cancel: "Free cancellation up to 24 hours on GetYourGuide", img: "/images/generated/photos/where-to-go-instead-of-bali-is-komodo-or-flores-a-good-bali-alternative.jpg" },
};
function renderTourPicks(slugs) {
  const cards = slugs.map((slug) => {
    const t = PICKS[slug];
    if (!t) throw new Error(`unknown tour slug in {{ tour_picks }}: ${slug}`);
    const proof = t.rating != null && t.reviews != null
      ? `<p class="tp-proof"><span class="gold">&#9733; ${t.rating}</span> &middot; ${t.reviews.toLocaleString("en-US")} ${t.platform} reviews</p>`
      : `<p class="tp-proof tp-proof-none">On ${t.platform}; we only show ratings read off the live listing</p>`;
    return `    <article class="tp-card">
      <a class="tp-media" href="${t.url}" rel="sponsored noopener" target="_blank" tabindex="-1" aria-hidden="true">
        <img src="${t.img}" alt="${esc(t.title)}" width="600" height="450" loading="lazy">
      </a>
      <div class="tp-body">
        <p class="tp-chips"><span class="pc-chip">${esc(t.c1)}</span> <span class="pc-chip">${esc(t.c2)}</span></p>
        <p class="tp-title"><a href="${t.url}" rel="sponsored noopener" target="_blank">${esc(t.title)}</a></p>
${proof}
        <p class="tp-reassure">${esc(t.cancel)}</p>
        <a class="btn btn-primary" href="${t.url}" rel="sponsored noopener" target="_blank">Check dates &amp; prices &rarr;</a>
      </div>
    </article>`;
  }).join("\n");
  return `<aside class="tour-picks">
  <div class="tp-grid">
${cards}
  </div>
</aside>`;
}

// Hotel affiliate links (Travelpayouts marker 453147). Values are either TP-minted
// tpk.ro short links (preferred, Oleg mints them) or the CJ Expedia deeplink fallback
// (marker rides in sid=<slug>-453147). Content references {{ hotel_url:<slug> }}.
// TP-minted expedia.tpk.ro short links (Oleg generated 2026-07-25 through the Travelpayouts
// link tool -> attribution to marker 453147 is guaranteed by construction). Source Expedia
// URLs: research/grok/2026-07-25-hotel-listings-verify.json.
const HOTELS = {
  "manohara-borobudur": "https://expedia.tpk.ro/jgpcw85Z",
  "plataran-borobudur": "https://expedia.tpk.ro/dGLRptET",
  "phoenix-yogyakarta": "https://expedia.tpk.ro/wPLfBKxN",
  "hyatt-regency-yogyakarta": "https://expedia.tpk.ro/rT8GhyzV",
  "adhisthana-yogyakarta": "https://expedia.tpk.ro/oXTNasyU",
};
function resolveHotelTokens(html) {
  return html.replace(/\{\{\s*hotel_url:([a-z0-9-]+)\s*\}\}/g, (m, slug) =>
    HOTELS[slug] ? HOTELS[slug] : m);
}

// Static maps (Phase 3.5). Each entry renders to /images/generated/<file> at build time
// IF a Google Static Maps key is present (env GOOGLE_MAPS_STATIC_KEY). Without a key the
// build skips them and the flagged placeholder stays. Coordinates match the JSON-LD geo.
// EMPTY BY DEFAULT: Phase 3.5 makes maps embed-only, so most sites need nothing here.
// Add entries only if a static map is genuinely required, and use REAL coordinates for
// this destination (Cambridge shipped with Tokyo coords copied from an example — do not
// repeat that: verify every center against a primary source).
const MAPS = {};

async function renderStaticMaps() {
  const key = process.env.GOOGLE_MAPS_STATIC_KEY;
  if (!key) {
    console.log("  maps: skipped (set GOOGLE_MAPS_STATIC_KEY to render real route maps)");
    return;
  }
  const dir = join(DIST, "images", "generated");
  await mkdir(dir, { recursive: true });
  for (const [file, m] of Object.entries(MAPS)) {
    const url =
      `https://maps.googleapis.com/maps/api/staticmap?center=${m.center}` +
      `&zoom=${m.zoom}&size=640x360&scale=2&maptype=roadmap` +
      `&markers=color:0xd2342b%7C${m.center}&key=${key}`;
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const buf = Buffer.from(await res.arrayBuffer());
      await writeFile(join(dir, file), buf);
      console.log(`  maps: rendered ${file} (${m.label})`);
    } catch (e) {
      console.log(`  maps: FAILED ${file} (${e.message}) — placeholder kept`);
    }
  }
}

// Image slots edited by content managers via Sveltia (src/data/images.json).
// Templates reference them as {{ img:KEY }} so an uploaded file of any name
// resolves correctly without editing code.
async function loadImages() {
  // images.json is grouped by page; each slot is { src, alt } (managers edit both in
  // the CMS). Flatten to src + alt maps so {{ img:KEY }} -> src and {{ alt:KEY }} -> alt.
  // Older shapes (plain path string, or flat slots) are still accepted.
  const src = {}, alt = {};
  function ingest(obj) {
    for (const [key, v] of Object.entries(obj)) {
      if (v && typeof v === "object" && (typeof v.src === "string" || typeof v.alt === "string")) {
        src[key] = v.src || ""; alt[key] = v.alt || "";
      } else if (v && typeof v === "object" && !Array.isArray(v)) {
        ingest(v); // a page group
      } else {
        src[key] = v; alt[key] = "";
      }
    }
  }
  try { ingest(JSON.parse(await readFile(join(DATA, "images.json"), "utf8"))); } catch {}
  return { src, alt };
}
function resolveImageTokens(html, images) {
  return html
    .replace(/\{\{\s*img:([a-z0-9_]+)\s*\}\}/g, (m, key) =>
      key in images.src ? images.src[key] : m)
    .replace(/\{\{\s*alt:([a-z0-9_]+)\s*\}\}/g, (m, key) =>
      key in images.alt ? String(images.alt[key]).replace(/"/g, "&quot;") : m);
}

// recursively resolve {{ include "components/x.html" }} against src/
async function resolveIncludes(html, depth = 0) {
  if (depth > 10) throw new Error("include depth exceeded (cycle?)");
  const re = /\{\{\s*include\s+"([^"]+)"\s*\}\}/g;
  let out = html, m, changed = false;
  const parts = [];
  let last = 0;
  while ((m = re.exec(html))) {
    parts.push(html.slice(last, m.index));
    const inc = await readFile(join(SRC, m[1]), "utf8");
    parts.push(inc);
    last = m.index + m[0].length;
    changed = true;
  }
  parts.push(html.slice(last));
  out = parts.join("");
  return changed ? resolveIncludes(out, depth + 1) : out;
}

function parseMeta(raw) {
  const meta = {};
  const m = raw.match(/<!--meta([\s\S]*?)-->/);
  if (m) {
    for (const line of m[1].split("\n")) {
      const i = line.indexOf(":");
      if (i > -1) {
        const k = line.slice(0, i).trim();
        const v = line.slice(i + 1).trim();
        if (k) meta[k] = v;
      }
    }
  }
  return meta;
}

function extractSchema(raw) {
  const m = raw.match(/<script type="application\/ld\+json">[\s\S]*?<\/script>/);
  return m ? m[0] : "";
}

function extractBody(raw) {
  const i = raw.indexOf("<!--content-->");
  return i > -1 ? raw.slice(i + "<!--content-->".length) : raw;
}

function fillTokens(layout, map) {
  return layout.replace(/\{\{\s*([a-z_]+)\s*\}\}/g, (full, key) =>
    key in map ? map[key] : ""
  );
}

async function walk(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else out.push(p);
  }
  return out;
}

async function copyDir(from, to) {
  if (!existsSync(from)) return;
  for (const e of await readdir(from, { withFileTypes: true })) {
    const s = join(from, e.name), d = join(to, e.name);
    if (e.isDirectory()) { await mkdir(d, { recursive: true }); await copyDir(s, d); }
    else { await mkdir(dirname(d), { recursive: true }); await copyFile(s, d); }
  }
}

// page path -> clean-URL output (Phase 2: /tours/<slug>/)
function outPath(pageFile) {
  const rel = relative(PAGES, pageFile).replace(/\\/g, "/");
  // An index.html (root or nested) maps straight to its folder's index.html,
  // never to <folder>/index/index.html.
  if (rel === "index.html" || rel.endsWith("/index.html")) return join(DIST, rel);
  const noExt = rel.replace(/\.html$/, "");
  return join(DIST, noExt, "index.html");
}

// ---- Blog (Markdown) support ----
function parseFrontmatter(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) return { data: {}, body: raw };
  const data = {};
  for (const line of m[1].split("\n")) {
    const i = line.indexOf(":");
    if (i < 0) continue;
    const k = line.slice(0, i).trim();
    let v = line.slice(i + 1).trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'")))
      v = v.slice(1, -1);
    if (k) data[k] = v;
  }
  return { data, body: m[2] };
}

const esc = (s = "") =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

async function buildHtml(layout, images, map, content) {
  const page = fillTokens(layout, { title: SITE_NAME, description: "", canonical: "", og_image: "", og_type: "article", preload: "", schema: "", robots: ROBOTS, ...map, content });
  let resolved = await resolveIncludes(page);
  return resolveHotelTokens(resolveTourTokens(resolveImageTokens(resolved, images)));
}

function blogPostInner(d, bodyHtml) {
  const hero = d.hero
    ? `\n  <figure class="blog-hero">
    <!-- IMAGE: uploaded by content manager via Sveltia. -->
    <img src="${esc(d.hero)}" alt="${esc(d.hero_alt || d.title)}" width="1280" height="720" fetchpriority="high">
  </figure>`
    : "";
  const cta = d.related_tour
    ? (() => {
        const t = TOURS[d.related_tour];
        const book = t
          ? `<a class="btn btn-primary" href="${t.url}" rel="sponsored noopener" target="_blank">Check live availability &amp; prices on ${t.platform} &rarr;</a>`
          : "";
        const details = `<a class="btn btn-ghost" href="/tours/${esc(d.related_tour)}/">See full tour details</a>`;
        const disc = t
          ? `\n    <p class="small" style="margin:.7rem 0 0">Affiliate link: if you book through it we may earn a commission at no extra cost to you. <a href="/disclosure/">How this works</a>.</p>`
          : "";
        const reassure = t
          ? `\n    <p class="small" style="margin:.7rem 0 0">Free cancellation up to 24 hours before, and you can reserve now and pay later on ${t.platform}, so booking early costs nothing. It takes about 2 minutes.</p>`
          : "";
        return `\n  <aside class="blog-cta">
    <h2>${esc(d.related_tour_heading || "See this tour for yourself")}</h2>
    <p>${esc(d.related_tour_blurb || "Check live dates and prices on the operator's official listing.")}</p>
    <p class="blog-cta-btns">${book} ${details}</p>${reassure}${disc}
  </aside>`;
      })()
    : "";
  return `
  <div class="wrap">
    <nav class="crumbs" aria-label="Breadcrumb">
      <a href="/">Home</a> / <a href="/blog/">Blog</a> / <span aria-current="page">${esc(d.title)}</span>
    </nav>
  </div>

  <article class="wrap-narrow blog-post" style="padding-top:var(--s5)">
    <header>
      <p class="eyebrow" style="font-family:var(--display); text-transform:uppercase; letter-spacing:.12em; color:var(--brand-deep); font-weight:700">${esc(d.date || "")}</p>
      <h1>${esc(d.title)}</h1>
      ${d.description ? `<p class="lede">${esc(d.description)}</p>` : ""}
      <div class="author-hook">
        <img src="{{ img:${AUTHOR_THUMB_KEY} }}" alt="{{ alt:${AUTHOR_THUMB_KEY} }}" width="38" height="38">
        <span>By <a href="/about/"><strong>${esc(d.author || AUTHOR_NAME)}</strong></a>, ${esc(AUTHOR_ROLE)}</span>
      </div>
    </header>
${hero}
    <div class="prose">
${bodyHtml}
    </div>
${cta}
    <p class="small" style="margin-top:var(--s5)"><a href="/blog/">&larr; All posts</a></p>
  </article>`;
}

function blogPostSchema(d, canonical) {
  const graph = [
    { "@type": "TravelAgency", "@id": `${SITE}/#agency`, name: SITE_NAME, url: `${SITE}/`, areaServed: AREA_SERVED },
    { "@type": "Person", "@id": `${SITE}/about/#author`, name: AUTHOR_NAME, jobTitle: AUTHOR_ROLE, worksFor: { "@id": `${SITE}/#agency` } },
    {
      "@type": "BlogPosting",
      headline: d.title,
      description: d.description || "",
      ...(d.hero ? { image: `${SITE}${d.hero}` } : {}),
      ...(d.date ? { datePublished: d.date, dateModified: d.date } : {}),
      author: { "@id": `${SITE}/about/#author` },
      publisher: { "@id": `${SITE}/#agency` },
      mainEntityOfPage: canonical,
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE}/blog/` },
        { "@type": "ListItem", position: 3, name: d.title },
      ],
    },
  ];
  return `<script type="application/ld+json">\n${JSON.stringify({ "@context": "https://schema.org", "@graph": graph }, null, 2)}\n</script>`;
}

function blogHubInner(posts) {
  const cards = posts.length
    ? posts.map((p) => `      <article class="rcard">
        ${p.hero ? `<div class="rc-media"><img src="${esc(p.hero)}" alt="${esc(p.hero_alt || p.title)}" width="600" height="450" loading="lazy"></div>` : ""}
        <div class="rc-body">
          <p class="small mb-0">${esc(p.date || "")}</p>
          <h3 class="mt-0 mb-0"><a href="/blog/${p.slug}/">${esc(p.title)}</a></h3>
          <p class="small mb-0">${esc(p.description || "")}</p>
        </div>
      </article>`).join("\n")
    : `      <p>Posts are on the way. In the meantime, see the <a href="/tours/">tours</a>.</p>`;
  return `
  <div class="wrap">
    <nav class="crumbs" aria-label="Breadcrumb">
      <a href="/">Home</a> / <span aria-current="page">Blog</span>
    </nav>
  </div>

  <section class="wrap" style="padding-top:var(--s6)">
    <p class="eyebrow" style="font-family:var(--display); text-transform:uppercase; letter-spacing:.12em; color:var(--brand-deep); font-weight:700">${esc(SITE_NAME)}</p>
    <h1>The blog</h1>
    <!-- NOTE FOR OLEG: replace placeholder data before publishing (Phase 6 writes the real hub lede) -->
  </section>

  <section class="section wrap">
    <div class="cards-3">
${cards}
    </div>
  </section>`;
}

function blogHubSchema(posts) {
  const graph = [
    { "@type": "WebSite", "@id": `${SITE}/#website`, url: `${SITE}/`, name: SITE_NAME },
    {
      "@type": "Blog",
      "@id": `${SITE}/blog/#blog`,
      name: `${SITE_NAME} blog`,
      url: `${SITE}/blog/`,
      isPartOf: { "@id": `${SITE}/#website` },
      blogPost: posts.map((p) => ({ "@type": "BlogPosting", headline: p.title, url: `${SITE}/blog/${p.slug}/`, ...(p.date ? { datePublished: p.date } : {}) })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
        { "@type": "ListItem", position: 2, name: "Blog" },
      ],
    },
  ];
  return `<script type="application/ld+json">\n${JSON.stringify({ "@context": "https://schema.org", "@graph": graph }, null, 2)}\n</script>`;
}

// ---- Guides (Markdown, CMS-editable like blog; Phase 6.5c) ----
// FAQPage schema is PARSED from the body's <details><summary> accordion, so the visible
// Q&A and the JSON-LD stay in sync no matter who edits the page (Phase 4.5 requirement).
function faqFromBody(html) {
  const out = [];
  const re = /<details>\s*<summary>([\s\S]*?)<\/summary>([\s\S]*?)<\/details>/g;
  let m;
  while ((m = re.exec(html))) {
    const q = m[1].replace(/<[^>]+>/g, "").trim();
    const a = m[2].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    if (q && a) out.push({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } });
  }
  return out;
}

function guideSchema(d, canonical, bodyHtml) {
  const graph = [
    { "@type": "TravelAgency", "@id": `${SITE}/#agency`, name: SITE_NAME, url: `${SITE}/`, areaServed: AREA_SERVED },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
        { "@type": "ListItem", position: 2, name: "Guides", item: `${SITE}/guides/` },
        { "@type": "ListItem", position: 3, name: d.title },
      ],
    },
  ];
  const faqs = faqFromBody(bodyHtml);
  if (faqs.length) graph.push({ "@type": "FAQPage", mainEntity: faqs });
  return `<script type="application/ld+json">\n${JSON.stringify({ "@context": "https://schema.org", "@graph": graph }, null, 2)}\n</script>`;
}

function guideInner(d, bodyHtml) {
  const hero = d.hero
    ? `
    <div class="hero-media">
      <!-- IMAGE: uploaded by content manager via Sveltia. -->
      <img src="${esc(d.hero)}" alt="${esc(d.hero_alt || d.title)}" width="1280" height="720" fetchpriority="high">
    </div>`
    : "";
  const header = d.hero
    ? `
  <header class="hero wrap">
    <div>
      <p class="eyebrow">${esc(d.eyebrow || "Guides")}</p>
      <h1>${esc(d.title)}</h1>
      <p class="lede">${esc(d.lede || d.description || "")}</p>
      <div class="author-hook">
        <img src="{{ img:${AUTHOR_THUMB_KEY} }}" alt="{{ alt:${AUTHOR_THUMB_KEY} }}" width="38" height="38">
        <span>Written with <a href="/about/"><strong>${esc(AUTHOR_NAME)}</strong></a>, ${esc(AUTHOR_ROLE)}</span>
      </div>
    </div>${hero}
  </header>`
    : `
  <section class="wrap" style="padding-top:var(--s5)">
    <p class="eyebrow" style="font-family:var(--display); text-transform:uppercase; letter-spacing:.12em; color:var(--brand-deep); font-weight:700">${esc(d.eyebrow || "Guides")}</p>
    <h1>${esc(d.title)}</h1>
    <p class="lede" style="max-width:62ch">${esc(d.lede || d.description || "")}</p>
    <div class="author-hook" style="display:flex; align-items:center; gap:.6rem; font-size:var(--step--1); color:var(--ink-soft); margin:var(--s3) 0">
      <img src="{{ img:${AUTHOR_THUMB_KEY} }}" alt="{{ alt:${AUTHOR_THUMB_KEY} }}" width="38" height="38" style="border-radius:50%; object-fit:cover; border:2px solid var(--line)">
      <span>Written with <a href="/about/"><strong>${esc(AUTHOR_NAME)}</strong></a>, ${esc(AUTHOR_ROLE)}</span>
    </div>
  </section>`;
  const qa = d.quick_answer
    ? `
  <div class="wrap">
    <div class="quick-answer">
      <p class="qa-label">${esc(d.quick_answer_label || "Short answer")}</p>
      <p>${d.quick_answer}</p>
    </div>
  </div>`
    : "";
  const t = TOURS[d.related_tour];
  const cta = `
  <section class="wrap" style="padding-bottom:var(--s6)">
    <div class="cta-banner">
      <h2>${esc(d.cta_heading || "Ready to see it for yourself?")}</h2>
      <p>${esc(d.cta_blurb || "Every tour we list includes the climb, with hotel pickup from Yogyakarta.")}</p>
      <p><a class="btn btn-primary" href="${t ? t.url : "/tours/"}"${t ? ' rel="sponsored noopener" target="_blank"' : ""}>${t ? `Check live availability &amp; prices on ${t.platform} &rarr;` : "Compare Borobudur tours"}</a></p>
      <p class="small" style="margin:.7rem 0 0; color:#ffe">Every tour here has free cancellation up to 24 hours before, and lets you reserve now and pay later, so booking early costs nothing.</p>
    </div>
  </section>`;
  return `
  <div class="wrap">
    <nav class="crumbs" aria-label="Breadcrumb">
      <a href="/">Home</a> / <a href="/guides/">Guides</a> / <span aria-current="page">${esc(d.title)}</span>
    </nav>
  </div>
${header}
${qa}

  <section class="section wrap-narrow prose">
${bodyHtml}
  </section>
${cta}`;
}

function guidesHubInner(guides) {
  const group = (name) => guides.filter((g) => (g.group || "planning") === name)
    .map((g) => `      <article class="rcard">
        <div class="rc-body">
          ${g.tag ? `<p class="pc-tag">${esc(g.tag)}</p>` : ""}
          <h3 class="mt-0"><a href="/guides/${g.slug}/">${esc(g.short_title || g.title)}</a></h3>
          <p class="small">${esc(g.card_blurb || g.description || "")}</p>
        </div>
      </article>`).join("\n");
  return `
  <div class="wrap">
    <nav class="crumbs" aria-label="Breadcrumb">
      <a href="/">Home</a> / <span aria-current="page">Guides</span>
    </nav>
  </div>

  <section class="wrap" style="padding-top:var(--s5)">
    <p class="eyebrow" style="font-family:var(--display); text-transform:uppercase; letter-spacing:.12em; color:var(--brand-deep); font-weight:700">Borobudur guides</p>
    <h1>Everything worth knowing before you go</h1>
    <p class="lede" style="max-width:60ch">Straight answers on the things visitors actually ask about Borobudur, checked against the official operator rather than repeated from other blogs.</p>
  </section>

  <section class="section wrap">
    <h2>Planning the visit</h2>
    <div class="cards-3">
${group("planning")}
    </div>

    <h2>Questions people ask</h2>
    <div class="cards-3">
${group("questions")}
    </div>
    <p style="margin-top:var(--s4)"><a href="/tours/">Or compare the guided tours &rarr;</a></p>
  </section>`;
}

async function main() {
  const layout = await readFile(join(LAYOUTS, "base.html"), "utf8");
  const images = await loadImages();
  const pageFiles = (await walk(PAGES)).filter((f) => extname(f) === ".html");

  let built = 0;
  const canonicals = [];
  for (const pf of pageFiles) {
    const raw = await readFile(pf, "utf8");
    const meta = parseMeta(raw);
    const schema = extractSchema(raw);
    const body = await resolveIncludes(extractBody(raw));
    const page = fillTokens(layout, {
      title: meta.title || SITE_NAME,
      description: meta.description || "",
      canonical: meta.canonical || "",
      og_image: meta.og_image || "",
      og_type: meta.og_type || "article",
      preload: meta.preload || "",
      robots: ROBOTS,
      schema,
      content: body,
    });
    let resolved = await resolveIncludes(page); // resolve includes inside the layout too
    resolved = resolveHotelTokens(resolveTourTokens(resolveImageTokens(resolved, images))); // image slots + tour + hotel affiliate URLs
    const out = outPath(pf);
    await mkdir(dirname(out), { recursive: true });
    await writeFile(out, resolved, "utf8");
    if (meta.canonical) canonicals.push(meta.canonical);
    built++;
    console.log("  built", relative(ROOT, out));
  }

  // ---- Guides: render Markdown guides + auto-build the /guides/ hub (Phase 6.5c) ----
  const guidesDir = join(CONTENT, "guides");
  const guides = [];
  if (existsSync(guidesDir)) {
    const gFiles = (await readdir(guidesDir)).filter((f) => f.endsWith(".md")).sort();
    for (const file of gFiles) {
      const raw = await readFile(join(guidesDir, file), "utf8");
      const { data, body } = parseFrontmatter(raw);
      if (String(data.draft).toLowerCase() === "true") { console.log("  skipped (draft)", "guides/" + file); continue; }
      const slug = data.slug || basename(file, ".md");
      const canonical = `${SITE}/guides/${slug}/`;
      const bodyHtml = await resolveIncludes(marked.parse(body));
      const html = await buildHtml(layout, images, {
        title: data.title ? `${data.title} | ${SITE_NAME}` : SITE_NAME,
        description: data.description || "",
        canonical,
        og_image: data.og_image || (data.hero ? `${SITE}${data.hero}` : ""),
        preload: data.hero ? `<link rel="preload" as="image" href="${data.hero}">` : "",
        schema: guideSchema(data, canonical, bodyHtml),
      }, guideInner(data, bodyHtml));
      const out = join(DIST, "guides", slug, "index.html");
      await mkdir(dirname(out), { recursive: true });
      await writeFile(out, html, "utf8");
      canonicals.push(canonical);
      guides.push({ slug, ...data });
      built++;
      console.log("  built", relative(ROOT, out));
    }
    guides.sort((a, b) => Number(a.order || 99) - Number(b.order || 99));
    const canonical = `${SITE}/guides/`;
    const html = await buildHtml(layout, images, {
      title: `Borobudur Visitor Guides: Tickets, Climbing, Sunrise & More | ${SITE_NAME}`,
      description: "Practical, verified guides to visiting Borobudur: what tickets really cost, how the climb works, where the sunrise is actually watched from, and when to go.",
      canonical,
      og_image: `${SITE}{{ img:home_hero }}`,
      schema: `<script type="application/ld+json">\n${JSON.stringify({ "@context": "https://schema.org", "@graph": [
        { "@type": "TravelAgency", "@id": `${SITE}/#agency`, name: SITE_NAME, url: `${SITE}/`, areaServed: AREA_SERVED },
        { "@type": "BreadcrumbList", itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
          { "@type": "ListItem", position: 2, name: "Guides" },
        ] },
      ] }, null, 2)}\n</script>`,
    }, guidesHubInner(guides));
    const out = join(DIST, "guides", "index.html");
    await mkdir(dirname(out), { recursive: true });
    await writeFile(out, html, "utf8");
    canonicals.push(canonical);
    built++;
    console.log("  built", relative(ROOT, out), `(${guides.length} guides)`);
  }

  // ---- Blog: render Markdown posts + auto-build the /blog/ hub ----
  const blogDir = join(CONTENT, "blog");
  const posts = [];
  if (existsSync(blogDir)) {
    const mdFiles = (await readdir(blogDir)).filter((f) => f.endsWith(".md")).sort();
    for (const file of mdFiles) {
      const raw = await readFile(join(blogDir, file), "utf8");
      const { data, body } = parseFrontmatter(raw);
      if (String(data.draft).toLowerCase() === "true") { console.log("  skipped (draft)", "blog/" + file); continue; }
      const slug = data.slug || basename(file, ".md");
      const canonical = `${SITE}/blog/${slug}/`;
      const bodyHtml = marked.parse(body);
      const content = blogPostInner(data, bodyHtml);
      const html = await buildHtml(layout, images, {
        title: data.title ? `${data.title} | ${SITE_NAME}` : SITE_NAME,
        description: data.description || "",
        canonical,
        og_image: data.hero ? `${SITE}${data.hero}` : "",
        preload: data.hero ? `<link rel="preload" as="image" href="${data.hero}">` : "",
        schema: blogPostSchema(data, canonical),
      }, content);
      const out = join(DIST, "blog", slug, "index.html");
      await mkdir(dirname(out), { recursive: true });
      await writeFile(out, html, "utf8");
      canonicals.push(canonical);
      posts.push({ slug, title: data.title || slug, description: data.description || "", date: data.date || "", hero: data.hero || "", hero_alt: data.hero_alt || "" });
      built++;
      console.log("  built", relative(ROOT, out));
    }
  }
  // newest first by date string (ISO sorts correctly)
  posts.sort((a, b) => (b.date || "").localeCompare(a.date || ""));
  {
    const canonical = `${SITE}/blog/`;
    const html = await buildHtml(layout, images, {
      title: `Blog | ${SITE_NAME}`, // NOTE FOR OLEG: Phase 5 sets the real keyword-led hub title
      description: "", // NOTE FOR OLEG: Phase 5 sets the real hub meta description
      canonical,
      og_image: `${SITE}{{ img:home_hero }}`,
      schema: blogHubSchema(posts),
    }, blogHubInner(posts));
    const out = join(DIST, "blog", "index.html");
    await mkdir(dirname(out), { recursive: true });
    await writeFile(out, html, "utf8");
    canonicals.push(canonical);
    built++;
    console.log("  built", relative(ROOT, out), `(${posts.length} posts)`);
  }

  // copy everything under src/public/ to dist root (assets, images, robots.txt, llms.txt, ...)
  await copyDir(PUBLIC, DIST);

  // copy the Sveltia CMS admin (repo-root /admin) to dist/admin so it is served at /admin
  await copyDir(join(ROOT, "admin"), join(DIST, "admin"));

  // CMS COVERAGE GUARD (learned the hard way): every {{ img:KEY }} slot a page uses must be
  // editable in admin/config.yml, or content managers silently cannot change that photo.
  // Warns rather than fails, so a page can be built before its slot is wired.
  try {
    const cfg = await readFile(join(ROOT, "admin", "config.yml"), "utf8");
    const declared = new Set([...cfg.matchAll(/^\s+- name: ([a-z0-9_]+)\s*$/gm)].map((m) => m[1]));
    const missing = [...new Set(Object.keys(images.src))].filter((k) => !declared.has(k));
    if (missing.length) {
      console.log(`  ⚠ CMS: ${missing.length} image slot(s) not editable in admin/config.yml: ${missing.join(", ")}`);
    } else {
      console.log(`  cms: all ${Object.keys(images.src).length} image slots are editable in /admin`);
    }
  } catch { /* no config.yml, skip */ }

  // render real static route maps if a key is configured (else keep placeholders)
  await renderStaticMaps();

  // auto-generate sitemap.xml from page canonicals (Phase 2.8)
  const urls = [...new Set(canonicals)].sort();
  const sitemap =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls.map((u) => `  <url><loc>${u}</loc></url>`).join("\n") +
    `\n</urlset>\n`;
  await writeFile(join(DIST, "sitemap.xml"), sitemap, "utf8");
  console.log(`  built dist/sitemap.xml (${urls.length} urls)`);

  console.log(`\n✓ compiled ${built} page(s) to dist/`);
}

main().catch((e) => { console.error("✗ build failed:", e.message); process.exit(1); });
