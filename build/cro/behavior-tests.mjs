import fs from 'node:fs';import assert from 'node:assert/strict';import {JSDOM} from 'jsdom';
const plans=JSON.parse(fs.readFileSync('research/cro-2026-09/locked-plans.json'));const script=fs.readFileSync('src/public/assets/cro/article.js','utf8');let checks=0;
const storage=new Map();
function setup(p,shared=new Map(),width=1280){let pos=0,competing=false;const html=fs.readFileSync(`dist/${p.category}/${p.slug}/index.html`,'utf8');const dom=new JSDOM(html,{url:`https://borobudurtempletour.org/${p.category}/${p.slug}/`,runScripts:'outside-only',pretendToBeVisual:true});const w=dom.window,d=w.document;
 Object.defineProperty(w,'innerWidth',{value:width,writable:true});Object.defineProperty(w,'innerHeight',{value:800});Object.defineProperty(w,'sessionStorage',{value:{getItem:k=>shared.get(k)||null,setItem:(k,v)=>shared.set(k,v)}});
 w.HTMLElement.prototype.getBoundingClientRect=function(){if(this.matches('[data-cro-article]'))return {top:-pos,height:10800,width:750,bottom:10800-pos};if(competing&&this.matches('.cro-current > a'))return {top:200,bottom:250,height:50,width:250};return {top:12000,bottom:12050,height:50,width:250}};
 w.HTMLElement.prototype.scrollIntoView=function(){this.dataset.jumped='true'};
 w.HTMLDialogElement.prototype.showModal=function(){this.open=true};w.HTMLDialogElement.prototype.close=function(){this.open=false};
 w.fetch=async()=>({ok:true,json:async()=>({items:[{option:'TG1',start:'2020-01-01',end:null,days:['SATURDAY'],times:['07:00']} ]})});
 w.eval(script);const float=d.querySelector('.cro-float'),dialog=d.querySelector('dialog');
 const scroll=n=>{pos=n;w.dispatchEvent(new w.Event('scroll'));};
 const change=(name,value)=>{const input=d.querySelector(`#cro-selector [name="${name}"]`);input.value=value;input.dispatchEvent(new w.Event('change',{bubbles:true}));};
 const test=(v,label)=>{assert.ok(v,`${p.slug} ${label}`);checks++};
 return {w,d,test,float,dialog,scroll,change,setCompeting:v=>{competing=v;w.dispatchEvent(new w.Event('scroll'))}};
}
for(const p of plans){for(const width of [1280,390]){const x=setup(p,new Map(),width),{w,d,test,float,dialog,scroll,change}=x;
 test(!d.querySelector('.cro-current').hidden,'initial recommendation');scroll(2999);test(float.hidden,'below30');scroll(3001);test(!float.hidden,'above30');scroll(5500);test(!float.hidden,'middle');x.setCompeting(true);test(float.hidden,'CTA suppression');x.setCompeting(false);test(!float.hidden,'CTA restoration');scroll(10);test(float.hidden,'return top');scroll(4000);
 change('hours','3');test(d.querySelector('.cro-current').hidden||Number(JSON.parse(d.querySelector('#cro-config').textContent).products[d.querySelector('.cro-current').dataset.product].hours)<=3,'duration hard constraint');
 change('mobility','stepfree');test(d.querySelector('.cro-current').hidden,'no match');test(float.hidden,'no match overlay');test(!d.querySelector('.cro-current a[href]'),'no stale end URL');
 change('mobility','');change('hours','5');change('experience','half');test(d.querySelector('.cro-current-name').textContent==='Borobudur-Only Private Half Day','eligible restores half');test(d.querySelector('.cro-float a').dataset.product==='half','overlay identity');
 change('ages','35,1');test(d.querySelector('.cro-current').hidden,'underage');change('ages','35,8');test(!d.querySelector('.cro-current').hidden,'age valid');change('endpoint','other');test(d.querySelector('.cro-current').hidden,'endpoint');change('endpoint','Yogyakarta');change('language','other');test(d.querySelector('.cro-current').hidden,'language');change('language','');
 d.querySelector('form').reset();await new Promise(r=>w.setTimeout(r,1));test(d.querySelector('.cro-current').dataset.product===p.primary,'reset');test(!d.querySelector('.cro-provider-widget').hidden,'reset native widget');
 d.querySelector('[data-action=jump]').click();test(d.querySelector('#cro-booking').dataset.jumped==='true','jump');test(d.activeElement.id==='cro-booking','jump focus');
 const inputs=[...d.querySelectorAll('.cro-cost input')];[2,100,160].forEach((v,i)=>inputs[i].value=v);inputs[2].dispatchEvent(new w.Event('input'));test(d.querySelector('output').textContent.includes('30.00 per person'),'calculator');
 w.document.dispatchEvent(new w.MouseEvent('mouseout',{clientY:0,relatedTarget:d.body}));test(!dialog.open,'internal pointer no exit');
 w.document.dispatchEvent(new w.MouseEvent('mouseout',{clientY:0,relatedTarget:null}));test(dialog.open===(width>=768),'desktop exit only');if(dialog.open){test(float.hidden,'dialog suppress');dialog.dispatchEvent(new w.Event('cancel',{cancelable:true}));test(!dialog.open,'escape handler');w.document.dispatchEvent(new w.MouseEvent('mouseout',{clientY:0,relatedTarget:null}));test(!dialog.open,'once session');}
 d.querySelector('[data-action=dismiss]').click();scroll(5000);test(float.hidden,'dismiss persists');w.close();
 }
 // Test every eligible product branch and restrictions independently of physical UI.
 const x=setup(p),{d,change,test,w}=x;for(const id of p.choices){change('experience',id);test(d.querySelector('.cro-current').dataset.product===id,'choice '+id);test(d.querySelector('.cro-current>a').dataset.product===id,'link '+id);}
 change('experience','diy');test(d.querySelector('.cro-current').hidden,'DIY no paid fallback');
 if(p.selector&&d.querySelector('[name=month]')){change('experience','');change('month','12');test(!['vip','gyg','merapi'].includes(d.querySelector('.cro-current').dataset.product),'wet ranks day');}
 w.close();
}
const a=plans[0],b=plans[1];let x=setup(a,storage);x.scroll(4000);x.d.querySelector('[data-action=dismiss]').click();x.w.document.dispatchEvent(new x.w.MouseEvent('mouseout',{clientY:0,relatedTarget:null}));x.w.close();x=setup(a,storage);x.scroll(4000);x.test(x.float.hidden,'reload dismissal');x.w.close();x=setup(b,storage);x.scroll(4000);x.test(!x.float.hidden,'other article eligible');x.w.document.dispatchEvent(new x.w.MouseEvent('mouseout',{clientY:0,relatedTarget:null}));x.test(!x.dialog.open,'exit global session across articles');x.w.close();x=setup(a,storage);x.scroll(4000);x.test(x.float.hidden,'return A stays dismissed');x.w.close();
fs.writeFileSync('research/cro-2026-09/behavior-tests.json',JSON.stringify({method:'jsdom DOM and handler simulations; geometry, provider response and dialog APIs mocked',articles:23,viewports:[1280,390],assertions:checks,result:'passed',at:new Date().toISOString()},null,2));console.log(`${checks} behavioral simulation assertions passed`);
