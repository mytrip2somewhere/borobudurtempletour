import {load} from 'cheerio';
import {products} from './products.mjs';
const valid=new Set(Object.values(products).map(p=>p.url));
export function validate(html,plan){
 const $=load(html),fail=m=>{throw Error(`${plan.slug}: ${m}`)};
 if($('#stickyCta').length)fail('legacy sticky');
 const end=$('[data-end-booking]'); if(end.length!==1||$('.cro-booking').length!==1)fail('single end module');
 const all=$('main *').toArray(),endIndex=all.indexOf(end[0]),editorial=all.filter(e=>$(e).is('[data-editorial-end],[data-editorial-heading],.cro-editorial')||$(e).parents('.prose').length);
 if(editorial.some(e=>all.indexOf(e)>endIndex))fail('editorial after end booking');
 if(!end.find('#cro-selector').length||end.find('a').length!==1)fail('single final action');
 if($('.cro-summary').find('a').length!==1)fail('linkless booking summary');
 if($('.cro-summary #cro-selector').length)fail('opening selector');
 for(const h of plan.headings){if($(`[data-editorial-heading="${h.id}"]`).length!==1||$(`[data-coverage="${h.id}"]`).length!==1)fail('heading coverage '+h.id);}
 if(!$('.cro-image-card img').length)fail('missing image card');
 if(!$('.cro-gyg').length||!$('.cro-schedule').length)fail('two provider widgets');
 $('.cro a').each((_,a)=>{if(!valid.has($(a).attr('href')))fail('unreviewed affiliate destination');if(!$(a).text().trim())fail('empty action');});
 $('.cro-context').each((_,e)=>{const n=$(e);if(n.attr('data-product')!=='none'&&!n.find('a').length)fail('inert contextual action');if(n.next('.cro-provider-widget').attr('data-product')===n.attr('data-product'))fail('adjacent duplicate widget');if(n.hasClass('cro-image-card')&&!n.find('img').attr('src'))fail('missing card image');});
 $('.cro button').each((_,e)=>{if(!['jump','reset','dismiss','close-exit'].includes($(e).attr('data-action')))fail('inert button');if($(e).attr('data-action')==='jump'&&!$('#'+$(e).attr('data-target')).length)fail('missing jump target');});
 $('.cro-gyg').each((_,e)=>{if($(e).attr('data-gyg-partner-id')!=='MME1WGW')fail('GYG attribution');});
 if(!$('.cro-float').length||!$('.cro-exit').length)fail('missing overlays');
 const tones=$('.cro-context').map((_,e)=>$(e).attr('data-tone')).get().filter(x=>x!=='factual');if(tones.some((t,i)=>t!==(i%2?'urgency':'curiosity')))fail('tone alternation');
 return true;
}
