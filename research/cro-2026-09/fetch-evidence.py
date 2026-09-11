from pathlib import Path
import json,re,urllib.request,concurrent.futures,sys
out=Path(__file__).parent
k=re.search(r'^VIATOR_API_KEY\s*=\s*[\"\']?([^\"\'\n]+)',Path('/Users/oleg/.codex/credentials/viator.env').read_text(),re.M)[1].strip()
def request(item):
 code,resource=item
 try:
  r=urllib.request.urlopen(urllib.request.Request('https://api.viator.com/partner/'+resource+code,headers={'exp-api-key':k,'Accept':'application/json;version=2.0','Accept-Language':'en-US'}),timeout=30); d=json.load(r); (out/(code+'-'+resource.split('/')[0]+'.json')).write_text(json.dumps(d,indent=2)); return [code,resource,r.status,list(d)[:8]]
 except Exception as e: return [code,resource,type(e).__name__,str(e)]
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
 for r in pool.map(request,[(c,r) for c in (sys.argv[1:] or ['214335P5','214335P1']) for r in ['products/','availability/schedules/']]): print(r)
