import fs from 'node:fs';
import {load} from 'cheerio';
import {products} from './products.mjs';
import {copy} from './copy.mjs';
import {validate} from './validate.mjs';
const manifest=JSON.parse(fs.readFileSync('research/cro-2026-09/manifest.json'));
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const title=s=>s.replace(/\b[a-z]/g,c=>c.toUpperCase());
const link=(id,label,placement)=>`<a class="cro-action" data-product="${id}" data-placement="${placement}" href="${esc(products[id].url)}" target="_blank" rel="sponsored noopener">${esc(label)}</a>`;
const gyg=p=>`<div class="cro-gyg" data-gyg-href="https://widget.getyourguide.com/default/availability.frame" data-gyg-tour-id="${p.code}" data-gyg-locale-code="en-US" data-gyg-currency="USD" data-gyg-widget="availability" data-gyg-variant="horizontal" data-gyg-partner-id="MME1WGW"></div>`;
const schedule=(id,placement)=>`<div class="cro-schedule" data-schedule="${id}"><label for="date-${placement}">Your Travel Date <input id="date-${placement}" class="cro-date" type="date"></label><p class="cro-schedule-status" role="status">Choose a date to see Viator’s scheduled departures. Availability and final price are confirmed on Viator.</p></div>`;
const primaryFor=m=> /sunrise/.test(m.slug)?'vip':/kids|climbing|how-long|wear|shorts|history|abandoned|wonders|worth-visiting/.test(m.slug)&& !/yogyakarta/.test(m.slug)?'half':'day';
const seasonal=m=>/rain|best-time|sunrise|wear/.test(m.slug);
function controls(plan){
 const ids=plan.choices;
 return `<details class="cro-support"><summary>Adjust The Plan, Compare Options & Costs</summary><p class="cro-help">Optional filters change the recommendation. Blank answers keep the general editorial choice. No personal details are saved.</p>
 <form id="cro-selector"><div class="cro-fields">
 <label>Experience <select name="experience"><option value="">Choose An Experience</option>${ids.map(id=>`<option value="${id}">${esc(products[id].name)}</option>`).join('')}<option value="diy">Independent / No Tour</option></select></label>
 <label>Total Time Available <select name="hours"><option value="">Not Decided</option><option value="3">Up To 3 Hours</option><option value="5">Up To 5 Hours</option><option value="8">Up To 8 Hours</option><option value="12">Up To 12 Hours</option><option value="48">Two Full Days</option></select></label>
 <label>Starting Base <select name="endpoint"><option value="">Not Decided</option>${[...new Set(ids.map(id=>products[id].endpoint))].map(x=>`<option>${esc(x)}</option>`).join('')}<option value="other">Elsewhere / Airport Transfer Needed</option></select></label>
 ${seasonal(plan)?`<label>Travel Month <select name="month"><option value="">Not Decided</option>${['January','February','March','April','May','June','July','August','September','October','November','December'].map((s,i)=>`<option value="${i+1}">${s}</option>`).join('')}</select></label>`:''}
 <label>Walking & Stairs <select name="mobility"><option value="">Not Specified</option><option value="walking">Unassisted Walking & Stairs</option><option value="stepfree">Step-Free Route Required</option></select></label>
 <label>Party Ages (Optional, Comma-Separated)<input name="ages" inputmode="numeric" placeholder="For example: 35, 12" autocomplete="off"><small>Use every participant’s age to check published bands.</small></label>
 <label>Guide Language <select name="language"><option value="">Not Specified</option><option value="English">English</option><option value="other">Another Language Required</option></select></label>
 </div><button type="reset" data-action="reset">Reset To The Editorial Choice</button></form>
 <div class="cro-alternatives"><p><strong>What Changes Between The Options</strong></p><ul>${ids.map(id=>`<li data-alternative="${id}"><strong>${esc(products[id].name)}</strong>: ${esc(products[id].facts)} ${esc(products[id].restriction)}</li>`).join('')}</ul></div>
 <div class="cro-cost"><p><strong>Compare Your Own Quotes</strong></p><p>Enter total party costs in the same currency, including matching tickets, transport and extras. This compares your figures, not live prices.</p><div class="cro-fields"><label>People<input name="people" type="number" min="1" max="100" step="1"></label><label>Independent Total<input name="diyTotal" type="number" min="0" step="0.01"></label><label>Tour Total<input name="tourTotal" type="number" min="0" step="0.01"></label></div><output class="cro-cost-result">Add your three figures to compare totals and cost per person.</output></div></details>`;
}
const plans=[];
for(const m of manifest){
 const path=`dist/${m.category}/${m.slug}/index.html`, $=load(fs.readFileSync(path,'utf8'));
 const prose=$('main .prose').first();
 if(prose.length!==1)throw Error('Missing prose '+path);
 // Only known, entirely commercial wrappers; the original editorial remains outside them.
 $('#cta-mid, .tour-picks, .blog-cta, .cta-banner, #stickyCta').remove();
 $('body').addClass('cro-page'); $('main').attr('data-cro-article','true');
 const raw=copy[m.slug];if(!raw||raw.length!==m.headings.length)throw Error('Plan mismatch '+m.slug);
 const primary=primaryFor(m);const choices=[...new Set([primary,'half','day',...raw.map(x=>x.split('|')[0]).filter(x=>x!=='none')])];
 const plan={...m,primary,choices,slug:m.slug,sections:[],status:'planned',selector:{time:'hours including local travel',ages:'all supplied ages must fall within published bands; gaps are unknown',endpoint:'exact base only',language:'English only verified',mobility:'no step-free shortlist',month:'wet season ranks daytime only when no explicit experience chosen'},oldSurfaces:m.surfaces};
 const nodes=prose.find('h2,h3,h4,h5,h6').toArray();
 if(nodes.length!==m.headings.length)throw Error(`Original headings changed: ${m.slug} ${nodes.length}/${m.headings.length}`);
 let commercial=0,cardUsed=false,gygUsed=false;
 for(let i=0;i<nodes.length;i++){
  const h=$(nodes[i]),inv=m.headings[i];if(h.text().trim().toLowerCase()!==inv.heading.trim().toLowerCase())throw Error('Heading order '+m.slug+' '+h.text());
  const [id,hook,benefit]=raw[i].split('|'),tone=id==='none'?'factual':commercial++%2===0?'curiosity':'urgency';
  const label=id==='none'?hook:hook.replace(/^(Check|Discover|Explore)/,tone==='curiosity'?'Discover':'Check');
  const oldId=h.attr('id');h.attr('id',oldId||inv.id).attr('data-editorial-heading',inv.id);if(h[0].name==='h2')h.text(title(h.text()));
  let body=h.nextUntil('h2,h3,h4,h5,h6');
  const section=$('<section class="cro-editorial"></section>').attr('data-section',inv.id);
  h.before(section); section.append(h);section.append(body);
  const isWidget=!gygUsed&&(id==='gyg'||id==='gygangkor');if(isWidget)gygUsed=true;
  const card=!cardUsed&&!isWidget&&id!=='none'&&['day','half','vip','merapi'].includes(id);
  let img=''; if(card){let image=section.find('img').first();if(!image.length)image=$('main img').filter((_,e)=>!$(e).attr('src').includes('author')).first(); const src=image.attr('src');if(!src)throw Error('Image missing '+m.slug);const imageAlt=image.attr('alt')||'Editorial view of the Java temple experience';if(image.parents().toArray().includes(section[0]))image.remove();img=`<figure><img src="${esc(src)}" alt="${esc(imageAlt)}" width="600" height="400" loading="lazy"><figcaption>${src.includes('generated')?'Editorial Illustration':'Editorial Photograph'}; not an operator tour photograph.</figcaption></figure>`;cardUsed=true;}
  const surface=`<aside class="cro cro-context ${card?'cro-image-card':''} ${isWidget?'cro-provider-widget':''}" data-product="${id}" data-tone="${tone}" data-coverage="${inv.id}" data-placement="${inv.id}">${img}<div><p class="cro-kicker">${id==='none'?'Planning Note':isWidget?'Compare Dates With GetYourGuide':'A Way To Experience This'}</p><p class="cro-pitch">${esc(benefit)}.</p>${id==='none'?'':isWidget?`${gyg(products[id])}<details class="cro-fallback"><summary>Open The Booking Page Instead</summary>${link(id,label,inv.id)}</details><p class="cro-facts">${esc(products[id].restriction)}</p>`:link(id,label,inv.id)+(id==='half'?'<p class="cro-facts">Select “Borobudur Only Half Day Tour” (TG4) on Viator.</p>':id==='vip'?'<p class="cro-facts">Select “VIP SUNRISE ON THE TOP TEMPLE” (TG3); operator confirmation at least two days ahead.</p>':'')}</div></aside>`;
  if(section.find('h2,h3,h4,h5,h6').length>1){const firstNested=section.find('h3,h4,h5,h6').first();firstNested.before(surface);}else section.append(surface);
  plan.sections.push({...inv,product:id,tone,copy:benefit,label,reason:`Section discusses ${inv.heading}. Selected experience: ${benefit}. Evidence: ${id==='none'?'No verified service for this specific request':products[id].source}`,position:'end',locator:`[data-coverage="${inv.id}"]`,type:id==='none'?'no-match':isWidget?'native GYG widget':card?'contextual image card':'text pitch',image:card?load(img)('img').attr('src'):null,destination:id==='none'?null:products[id].url});
 }
 // The intro and FAQ remain editorial; the comparison appears after the entire prose.
 prose.append('<span data-editorial-end="true" aria-hidden="true"></span>');
 const last=plan.sections.at(-1);const consolidate=last.product===primary;if(consolidate){$(`[data-coverage="${last.id}"]`).remove();last.locator='#cro-booking';last.position='after final editorial and FAQ';last.type='consolidated closing Viator widget';}
 const p=products[primary];
 const bridge=`<aside class="cro cro-summary" data-placement="intro"><p><strong>Booking Choice:</strong> ${esc(p.benefit)} ${link(primary,`Discover ${p.name}`,'intro')}</p><p class="cro-help">General editorial choice. ${p.hours} hours including the local outing. Confirm the selected option, date and participant requirements.</p><button type="button" data-action="jump" data-target="cro-booking">Compare The Plan At The End</button></aside>`;
 prose.find('.cro-editorial').first().before(bridge);
 const end=`<section id="cro-booking" class="cro cro-booking" data-end-booking="true" ${consolidate?`data-coverage="${last.id}"`:""} tabindex="-1" data-tone="urgency" data-placement="end"><p class="cro-kicker">Your Next Step</p><h2>Make The Day Fit Your Trip</h2><p class="cro-general">Initial editorial recommendation, not a personalized eligibility check.</p><div class="cro-current" data-product="${primary}"><h3 class="cro-current-name">${esc(p.name)}</h3><p class="cro-current-pitch">Have your travel date in mind? ${esc(p.benefit)} Check the exact option before arranging the rest of your stay.</p><p class="cro-current-facts">${esc(p.facts)}</p><p class="cro-current-restriction">${esc(p.restriction)}</p><div class="cro-final-provider">${schedule(primary,'end')}</div>${link(primary,`Check Your Date For ${p.name}`,'end')}</div><p class="cro-no-match" role="status" hidden></p>${controls(plan)}<p class="cro-disclosure">Affiliate links: we may earn a commission if you book, at no extra cost to you. Provider terms, itinerary and final availability apply.</p></section>`;
 prose.after(end);
 $('body').append(`<aside class="cro cro-float" hidden aria-label="Tour booking reminder" data-tone="urgency"><button type="button" class="cro-close" data-action="dismiss" aria-label="Dismiss booking reminder">×</button><p>Set your temple day before arranging the rest.</p>${link(primary,`Check Your Date For ${p.name}`,'floating')}</aside><dialog class="cro cro-exit" aria-labelledby="cro-exit-title" data-tone="urgency"><button type="button" data-action="close-exit" class="cro-close" aria-label="Close booking reminder">×</button><h2 id="cro-exit-title">Have A Travel Date In Mind?</h2><p class="cro-exit-pitch">${esc(p.benefit)} Check the exact option before completing your plans.</p>${link(primary,`Check Your Date For ${p.name}`,'exit')}</dialog>`);
 $('head').append('<link rel="stylesheet" href="/assets/cro/article.css?v=20260911"><script async defer src="https://widget.getyourguide.com/dist/pa.umd.production.min.js" data-gyg-partner-id="MME1WGW"></script>');
 $('body').append(`<script type="application/json" id="cro-config">${JSON.stringify({article:m.category+'/'+m.slug,primary,choices,seasonal:seasonal(m),products:Object.fromEntries(choices.map(id=>[id,products[id]]))}).replace(/</g,'\\u003c')}</script><script src="/assets/cro/article.js?v=20260911" defer></script>`);
 // Enrich the existing analytics handler without emitting a second click event.
 let html=$.html().replace('link_text: (a.textContent',"cro_placement: a.dataset.placement || '', cro_product: a.dataset.product || '', cro_article: location.pathname, cro_variant: 'article-v1',\n          link_text: (a.textContent");
 validate(html,plan);fs.writeFileSync(path,html);plan.status='rendered';plans.push(plan);
}
fs.writeFileSync('research/cro-2026-09/locked-plans.json',JSON.stringify(plans,null,2));
fs.writeFileSync('research/cro-2026-09/product-registry.json',JSON.stringify(products,null,2));
console.log(`CRO rendered and validated: ${plans.length} articles, ${plans.reduce((n,p)=>n+p.sections.length,0)} sections`);
