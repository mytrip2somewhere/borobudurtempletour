const allowed=new Set(['214335P5','214335P1','110844P2','211441P10','189399P8','68746P15','163572P26']);
export async function onRequestGet({request,env}){
 const product=new URL(request.url).searchParams.get('product');
 const headers={'Content-Type':'application/json','Cache-Control':'public, max-age=900, s-maxage=900','X-Content-Type-Options':'nosniff'};
 if(!allowed.has(product))return new Response(JSON.stringify({error:'Unknown product'}),{status:400,headers});
 if(!env.VIATOR_API_KEY)return new Response(JSON.stringify({error:'Schedule temporarily unavailable'}),{status:503,headers:{...headers,'Cache-Control':'no-store'}});
 try{
  const response=await fetch(`https://api.viator.com/partner/availability/schedules/${product}`,{headers:{'exp-api-key':env.VIATOR_API_KEY,Accept:'application/json;version=2.0','Accept-Language':'en-US'},signal:AbortSignal.timeout(15000)});
  if(!response.ok)throw Error('Provider response');
  const data=await response.json();
  const items=(data.bookableItems||[]).flatMap(b=>(b.seasons||[]).flatMap(s=>(s.pricingRecords||[]).map(r=>({option:b.productOptionCode||'',start:s.startDate,end:s.endDate||null,days:r.daysOfWeek||[],times:(r.timedEntries||[]).map(t=>t.startTime).filter(Boolean)}))));
  return new Response(JSON.stringify({product,checkedAt:new Date().toISOString(),type:'published_schedule',items}),{headers});
 }catch{return new Response(JSON.stringify({error:'Schedule temporarily unavailable'}),{status:502,headers:{...headers,'Cache-Control':'no-store'}});}
}
