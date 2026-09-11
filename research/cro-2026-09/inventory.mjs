import fs from 'node:fs'; import crypto from 'node:crypto'; import {load} from 'cheerio'; import {marked} from 'marked';
const dir='research/cro-2026-09'; const manifest=[]; const hash=x=>crypto.createHash('sha256').update(x).digest('hex');
for(const category of ['blog','guides']) for(const file of fs.readdirSync('src/content/'+category).filter(x=>x.endsWith('.md')).sort()){
 const source=`src/content/${category}/${file}`,raw=fs.readFileSync(source,'utf8'),slug=file.slice(0,-3),url=`https://borobudurtempletour.org/${category}/${slug}/`;
 const body=raw.replace(/^---\n[\s\S]*?\n---\n/,''),$=load(marked.parse(body));
 const original=load(fs.readFileSync(`dist/${category}/${slug}/index.html`,'utf8'));
 const surfaces=[]; original('main .cta-mid, main .tour-picks, main .blog-cta, main .cta-banner, #stickyCta').each((i,e)=>surfaces.push({id:`surface-${i}`,locator:e.attribs.id?'#'+e.attribs.id:'.'+e.attribs.class.split(' ')[0],text:original(e).text().trim(),links:original(e).find('a').map((_,a)=>original(a).attr('href')).get(),disposition:'REPLACE',reason:'Replace repeated promotion with section-specific or single final booking module; sticky replaced'}));
 $('#cta-mid, .cta-mid').remove(); const headings=$('h2,h3,h4,h5,h6').map((i,h)=>({id:`section-${i+1}`,level:Number(h.name[1]),heading:$(h).text(),text:$(h).nextUntil('h2,h3,h4,h5,h6').text().replace(/\s+/g,' ').trim()})).get();
 const record={source,category,slug,url,sourceHash:hash(raw),outputHash:hash(original.html()),status:'pending',originalIntro:body.split(/^## /m)[0],headings,surfaces,oldLinks:original('main a').map((_,a)=>({label:original(a).text(),href:original(a).attr('href')})).get()};
 fs.writeFileSync(`${dir}/${category}-${slug}-packet.json`,JSON.stringify(record,null,2)); manifest.push(record);
}
fs.writeFileSync(`${dir}/manifest.json`,JSON.stringify(manifest,null,2));
fs.writeFileSync(`${dir}/excluded.json`,JSON.stringify({reason:'Outside English article/guide scope',urls:fs.readFileSync('dist/sitemap.xml','utf8').match(/<loc>(.*?)<\/loc>/g).map(x=>x.slice(5,-6)).filter(x=>!manifest.some(m=>m.url===x)),translations:[],templates:['blog','guide with hero','guide without hero'],baseline:'11d20b029c20222c46f884bdd6685f687d4413d3'},null,2));
console.log(manifest.map(m=>m.category+'/'+m.slug+' '+m.headings.length).join('\n'));
