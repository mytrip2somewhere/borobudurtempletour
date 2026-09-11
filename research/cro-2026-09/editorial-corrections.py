import pathlib,json
changes=[]
replacements={
 'including the ones we send bookings to, ':'',
 'including the ones we feature, ':'',
 'We do not sell that one, and any page that lets you confuse the two is doing it on purpose.':'The VIP temple-sunrise option linked here is separate from the Setumbu hill outing; select the exact variant before booking.',
 'No operator refunds weather, including mine.':'Cloud alone does not establish a refund entitlement; check the cancellation and weather terms of your selected booking.',
 'No operator refunds weather,':'Weather refunds depend on the booking terms,',
 'and nobody will give you your money back for the difference. That is standard across the industry':'and a disappointing view does not itself establish a refund. Check the terms for the selected booking; that distinction',
 'in any weather':'subject to weather-related safety decisions',
 'What changes in the rain is comfort and visibility, not access.':'Rain chiefly changes comfort and visibility; severe conditions can also interrupt access.',
 'Access to the monument | None. Open every day, climb runs 08:30 to 17:00':'Access to the monument | Usually open; severe conditions can interrupt the published 08:30 to 17:00 climb schedule',
 'Candi Mendut and its seated Buddha added':'a Mendut monastery stop during the temple renovation',
 'Candi Mendut with its famous seated Buddha':'Mendut monastery while the temple is under renovation',
 'Candi Mendut added':'Mendut monastery substituted during temple renovation',
 'Adds Candi Mendut.':'Includes a Mendut monastery substitute during temple renovation.',
 'adds Candi Mendut.':'includes a Mendut monastery substitute during temple renovation.',
 'a stop at Candi Mendut on the way':'a stop at Mendut monastery while the temple is under renovation',
 'a Candi Mendut stop':'a Mendut monastery stop during temple renovation',
 'stops at Candi Mendut':'uses Mendut monastery during the temple renovation',
 'plus multi-day boat trips':'plus an island boat outing, available as a day trip or a multi-day cruise',
 'then multi-day boats':'then a day boat trip or multi-day cruise',
 'then boats, multi-day':'then day boats or multi-day cruises',
 '| ~07:00 | The climb itself':'| 08:30 or later | The climb itself',
 '| 07:00 | Guided climb':'| 08:30 or later | Guided climb',
 'with transport and tickets handled throughout':'with transport and the inclusions of the selected ticket bundle arranged together',
 'All three tours we list include the climb and Prambanan;':'Choose the full two-temple, admission-inclusive variant: the listings also sell shorter or transport-only options;',
 '{: .small}':'',
}
for cat in ['blog','guides']:
 for p in pathlib.Path('src/content',cat).glob('*.md'):
  s=p.read_text();old=s
  for a,b in replacements.items():
   if a in s:s=s.replace(a,b);changes.append({'source':str(p),'before':a,'after':b,'reason':'Pass 1: reconcile itinerary, weather terms or rendering with current provider evidence'})
  if s!=old:p.write_text(s)
pathlib.Path('research/cro-2026-09/editorial-corrections.json').write_text(json.dumps(changes,indent=2))
