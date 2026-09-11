from pathlib import Path
import re,sys,html
for name in sys.argv[1:]:
 p=next(Path('src/content').rglob(name+'.md')); s=p.read_text(); s=re.sub(r'<svg\b[\s\S]*?</svg>','[Original SVG infographic retained]',s); s=re.sub(r'<[^>]+>',' ',s); s=html.unescape(s); s=re.sub(r'\n[ \t]*\n(?:[ \t]*\n)+','\n\n',s); print('\nFILE: '+str(p)+'\n'+s)
