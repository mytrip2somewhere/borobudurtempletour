(() => {
 'use strict';
 const config=JSON.parse(document.getElementById('cro-config').textContent),products=config.products;
 const q=(s,r=document)=>r.querySelector(s),qa=(s,r=document)=>[...r.querySelectorAll(s)];
 const form=q('#cro-selector'),end=q('#cro-booking'),current=q('.cro-current'),float=q('.cro-float'),dialog=q('.cro-exit'),article=q('[data-cro-article]');
 let selected=config.primary,engaged=false,previousFocus=null,request=0,explicit=false;
 const key='boro-cro-dismiss:'+config.article,exitKey='boro-cro-exit:v1';
 const stored=k=>{try{return sessionStorage.getItem(k)}catch{return null}},save=k=>{try{sessionStorage.setItem(k,'1')}catch{}};
 const event=(name,extra={})=>{if(typeof window.gtag==='function')window.gtag('event',name,{cro_article:config.article,cro_product:selected||'',cro_variant:'article-v1',...extra});};
 function fit(p,values){
  if(values.experience==='diy'||values.mobility==='stepfree'||values.language==='other')return false;
  if(values.experience&&values.experience!==p.id)return false;
  if(values.hours&&p.hours>Number(values.hours))return false;
  if(values.endpoint&&values.endpoint!==p.endpoint)return false;
  if(values.ages.trim()){
   if(!/^\s*\d{1,3}(\s*,\s*\d{1,3})*\s*$/.test(values.ages))return false;
   const ages=values.ages.split(',').map(Number);
   if(!p.ages||!ages.every(a=>p.ages.some(([lo,hi])=>a>=lo&&a<=hi))||!ages.some(a=>a>=18))return false;
  }
  return true;
 }
 function syncSurfaces(values){
  qa('.cro-context,.cro-summary').forEach(el=>{
   const id=el.dataset.product||config.primary;
   const compatible=!explicit||id==='none'||(products[id]&&fit(products[id],values));
   el.hidden=!compatible;
   qa('a',el).forEach(a=>{if(!a.dataset.originalHref)a.dataset.originalHref=a.href;if(compatible)a.setAttribute('href',a.dataset.originalHref);else a.removeAttribute('href');});
   // Keep native frames mounted inside hidden containers so reset restores their date controls.
  });
  qa('[data-alternative]').forEach(el=>el.hidden=explicit&&!fit(products[el.dataset.alternative],values));
 }
 function select(){
  const values=Object.fromEntries(new FormData(form));explicit=Object.values(values).some(v=>v.trim());
  let candidates=config.choices.map(id=>products[id]).filter(p=>fit(p,values));
  if(config.seasonal&&values.month&&!values.experience&&[1,2,3,4,11,12].includes(Number(values.month)))candidates.sort((a,b)=>Number(['hill','temple','volcano'].includes(a.experience))-Number(['hill','temple','volcano'].includes(b.experience)));
  selected=candidates[0]?.id||null;
  syncSurfaces(values);current.hidden=!selected;q('.cro-no-match').hidden=!!selected;
  if(!selected){
   q('.cro-no-match').textContent=values.experience==='diy'?'No paid tour selected. Keep the independent plan in the article; reset the filters whenever you want to compare tours.':'No verified match for all these choices. Check the time, starting base and published age bands, or reset the filters. Step-free access and other guide languages are not verified for this shortlist.';
   qa('a',current).forEach(a=>a.removeAttribute('href'));qa('.cro-float a,.cro-exit a').forEach(a=>a.removeAttribute('href'));
   request++;q('.cro-final-provider').replaceChildren();if(dialog.open)closeExit();event('cro_no_match');
  }else{
   const p=products[selected];
   current.dataset.product=selected;q('.cro-current-name').textContent=p.name;
   q('.cro-current-pitch').textContent=`Have your travel date in mind? ${p.benefit} Check the exact option before arranging the rest of your stay.`;
   q('.cro-current-facts').textContent=p.facts;q('.cro-current-restriction').textContent=p.restriction;
   q('.cro-general').textContent=explicit?'Matches the supplied filters; confirm remaining participant and operator requirements.':'Initial editorial recommendation, not a personalized eligibility check.';
   qa('.cro-current > a,.cro-float a,.cro-exit a').forEach(a=>{a.href=p.url;a.dataset.product=selected;a.textContent=`Check Your Date For ${p.name}`;});
   q('.cro-float p').textContent=`Set your ${p.endpoint} outing before arranging the rest.`;
   q('.cro-exit-pitch').textContent=`${p.benefit} Check the exact option before completing your plans.`;
   renderSchedule(p);
   if(explicit)event('cro_selector_complete');
  }
  event('cro_selection',{cro_state:explicit?'filtered':'initial'});updateFloat();
 }
 function renderSchedule(p){
  const box=q('.cro-final-provider');request++;
  if(p.provider!=='Viator'){
   box.innerHTML='<p>Date and party selection for this option continue on GetYourGuide using the booking button below.</p>';return;
  }
  box.innerHTML='<div class="cro-schedule"><label for="date-end">Your Travel Date <input id="date-end" class="cro-date" type="date"></label><p class="cro-schedule-status" role="status">Choose a date to see Viator’s scheduled departures. Availability and final price are confirmed on Viator.</p></div>';
  const date=q('input',box),status=q('[role="status"]',box);date.min=new Date().toISOString().slice(0,10);
  date.addEventListener('change',async()=>{
   const version=++request;if(!date.value)return;
   if(date.value<date.min){status.textContent='Choose today or a future date.';return;}
   if(p.id==='vip'&&(Date.parse(date.value+'T00:00:00Z')-Date.parse(date.min+'T00:00:00Z'))/86400000<2){status.textContent='This VIP option asks for at least two days’ notice and operator confirmation before booking. Choose a later date or another experience.';return;}
   status.textContent='Checking Viator’s published schedule…';
   try{
    const r=await fetch(`/api/tour-schedule?product=${encodeURIComponent(p.code)}`);if(!r.ok)throw Error('Schedule unavailable');const data=await r.json();if(version!==request)return;
    const weekday=['SUNDAY','MONDAY','TUESDAY','WEDNESDAY','THURSDAY','FRIDAY','SATURDAY'][new Date(date.value+'T12:00:00Z').getUTCDay()];
    const options=data.items.filter(x=>(!p.option||x.option===p.option)&&x.start<=date.value&&(!x.end||x.end>=date.value)&&x.days.includes(weekday));
    const times=[...new Set(options.flatMap(x=>x.times))].sort();
    status.textContent=options.length?`Scheduled ${times.length?'departure times: '+times.join(', '):'on this weekday'}. These are schedule entries, not confirmed availability. Select ${p.option||'your preferred option'} and ${date.value} on Viator; final price and spaces are confirmed there.`:'No published schedule entry for this option and date. Try another date or check the provider for updated options. This does not establish that the entire tour is sold out.';
    event('cro_date_check',{cro_state:options.length?'scheduled':'no_schedule'});
   }catch{if(version===request)status.textContent='The schedule could not be loaded. Use the attributed booking button below to choose your date and confirm availability on Viator.';}
  });
 }
 form.addEventListener('change',select);form.addEventListener('input',e=>{if(e.target.name==='ages')select();});
 form.addEventListener('reset',()=>setTimeout(select,0));
 q('[data-action="jump"]').addEventListener('click',()=>{end.scrollIntoView({behavior:'smooth',block:'start'});end.focus({preventScroll:true});});
 function visible(el){if(!el||el.closest('[hidden]'))return false;const r=el.getBoundingClientRect();return r.bottom>80&&r.top<innerHeight-30&&r.width>0&&r.height>0;}
 function updateFloat(){
  const r=article.getBoundingClientRect(),progress=Math.max(0,-r.top)/Math.max(1,r.height-innerHeight);
  if(progress>=.30)engaged=true;
  const competing=qa('.cro-context a,.cro-gyg iframe,.cro-current > a,.cro-date').some(visible);
  float.hidden=!(progress>=.30&&selected&&!stored(key)&&!dialog.open&&!competing);
 }
 addEventListener('scroll',updateFloat,{passive:true});addEventListener('resize',updateFloat);
 q('[data-action="dismiss"]').addEventListener('click',()=>{save(key);updateFloat();});
 function closeExit(){dialog.close();if(previousFocus?.isConnected)previousFocus.focus({preventScroll:true});updateFloat();}
 q('[data-action="close-exit"]').addEventListener('click',closeExit);dialog.addEventListener('cancel',e=>{e.preventDefault();closeExit();});
 document.addEventListener('mouseout',e=>{
  if(e.relatedTarget!==null||e.clientY>0||innerWidth<768||!engaged||!selected||stored(exitKey)||dialog.open)return;
  previousFocus=document.activeElement;save(exitKey);dialog.showModal();q('[data-action="close-exit"]').focus();float.hidden=true;event('cro_impression',{cro_placement:'exit'});
 });
 dialog.addEventListener('keydown',e=>{if(e.key!=='Tab')return;const items=qa('a[href],button',dialog),first=items[0],last=items.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}});
 qa('.cro-cost input').forEach(input=>input.addEventListener('input',()=>{
  const [people,diy,tour]=qa('.cro-cost input').map(x=>x.value===''?NaN:Number(x.value)),out=q('.cro-cost-result');
  if(!Number.isInteger(people)||people<1||people>100||!Number.isFinite(diy)||!Number.isFinite(tour)||diy<0||tour<0){out.textContent='Enter a valid party size and both totals in the same currency.';return;}
  const diff=tour-diy;out.textContent=`Tour ${diff>=0?'costs':'costs less by'} ${Math.abs(diff).toFixed(2)}${diff>=0?' more':''} for the party (${(Math.abs(diff)/people).toFixed(2)} per person). Independent: ${(diy/people).toFixed(2)} per person; tour: ${(tour/people).toFixed(2)}. Compare included transport, admission and guidance before deciding.`;event('cro_cost_compare');
 }));
 if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){event('cro_impression',{cro_placement:e.target.dataset.placement});observer.unobserve(e.target);}}),{threshold:.5});qa('.cro-context,.cro-summary,.cro-booking').forEach(e=>observer.observe(e));}
 // Native provider fallback remains usable if scripts or third-party frames fail.
 renderSchedule(products[selected]);updateFloat();
})();
