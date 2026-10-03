const $=s=>document.querySelector(s),$$=s=>document.querySelectorAll(s);
const S=JSON.parse(localStorage.getItem('sp11')||'{}');S.history=S.history||[];S.stock=S.stock||['Riz','Pâtes','Thon','Courgettes','Œufs','Lait','Bananes','Framboises','Poulet','Steak','Maïs','Haricots verts','Lentilles','Petits pois','Pois chiches','Feta','Pesto','Ratatouille'];S.shop=S.shop||[{n:'Riz',q:2,u:'kg',p:3.2,d:0},{n:'Pâtes',q:1,u:'kg',p:1.5,d:0},{n:'Poulet',q:1.5,u:'kg',p:13.5,d:0},{n:'Œufs',q:24,u:'unité',p:6.5,d:0}];S.week=S.week||['Plyométrie + détente','Basket performance','Match · 20h30','Force utile','Course cardio','Basket performance','Mobilité active'];S.off=S.off||[];S.weights=S.weights||[];S.eat=S.eat||{};const STOCK_ALL=S.stock.concat(['Tomates','Carottes','Brocoli','Crème fraîche','Huile d’olive','Flocons d’avoine','Wraps','Gnocchis','Pommes de terre','Fromage blanc']).filter((x,i,a)=>a.indexOf(x)===i);const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c]);S.extra=S.extra||{};S.jumps=S.jumps||[];S.logs=S.logs||{};S.fav=S.fav||{};S.prices=S.prices||{};S.start=S.start||dk();S.friends=S.friends||{};S.bf=S.bf||['Finition','Dribbles'];S.rp=S.rp||{};S.runs=S.runs||[];S.sp=S.sp||0;S.snz=S.snz||{};S.done=S.done||[];S.water=S.water||{};S.sleep=S.sleep||{};S.naps=S.naps||{};S.sore=S.sore||[];S.media=S.media||{};S.myrec=S.myrec||[];
const FUTURE_GEAR=['Ballon de basket','Sac à dos lesté','Tapis','Corde à sauter','Élastiques','Rouleau de massage','Gourde','Mini-haies','Échelle de rythme','Disques de glisse','Medecine-ball 3–5 kg','Box de pliométrie basse','Poids de chevilles','Poignées de pompes','Barre de traction de porte','Bande élastique forte','Chronomètre d’entraînement'];
S.gear=S.gear||FUTURE_GEAR.map(n=>({n,have:false}));FUTURE_GEAR.forEach(n=>{if(!S.gear.some(x=>x.n===n))S.gear.push({n,have:false})});
S.batch=S.batch||{};S.groups=S.groups||{};S.friendRequests=S.friendRequests||[];S.socialTab=S.socialTab||'friends';S.shopSel=S.shopSel||{};S.pantry=S.pantry||STOCK_ALL.filter(x=>!S.off.includes(x)).map(n=>({n,q:'',u:'g'}));function save(){localStorage.setItem('sp11',JSON.stringify(S));try{alerts();refreshQuick()}catch(e){}}
const W={basket:{t:'Basket performance',m:'55 min · Premier pas',e:[['Échauffement appuis','5 min','Monte progressivement.','🏀',30],['Départ 1 appui','5 × 4 / côté','Premier pas maximal.','⚡',20],['Cross → accélération','4 × 20 s','Change de rythme après le dribble.','🏀',30],['Finition main faible','4 × 6','Attaque le cercle avec contrôle.','🏀',35],['Détente verticale','5 × 3','Impulsion maximale comme pour le dunk.','🚀',40]]},run:{t:'Course cardio',m:'40 min · Cardio',e:[['Échauffement','8 min','Allure progressive.','🏃',480],['Fractionné','8 × 45 s','Rapide mais contrôlé.','❤️',45],['Retour au calme','8 min','Ralentis progressivement.','🏃',480]]},force:{t:'Force utile',m:'50 min · Force',e:[['Échauffement','5 min','Trot léger, rotations hanches et épaules.','🏃',300],['Squat avec sac','4 × 8','Descente contrôlée, remontée dynamique.','💪',40],['Fentes arrière','3 × 8/côté','Genou stable.','💪',40],['Pompes','4 × 8–12','Corps gainé.','💪',45],['Hip thrust canapé','4 × 10','Verrouille les hanches.','💪',45],['Gainage','3 × 40 s','Tronc solide.','🧱',40]]},plyo:{t:'Plyométrie + détente',m:'45 min · Explosivité',e:[['Échauffement','5 min','Corde ou trot léger, chevilles et hanches.','🏃',300],['Pogos','3 × 20','Contacts courts et réactifs.','🚀',30],['Squat jump','4 × 6','Explose vers le haut.','🚀',30],['Lateral bounds','3 × 6/côté','Pousse latéralement et stabilise.','↔️',35],['Saut approche','5 × 3','Travaille l’impulsion du dunk.','🏀',45]]},mobility:{t:'Mobilité active',m:'30 min · Mobilité',e:[['Cheville genou-au-mur','3 × 8/côté','Talon au sol.','🦶',30],['90/90 hanches','3 × 8','Contrôle la rotation.','🧘',30],['Cossack squat','3 × 6/côté','Amplitude progressive.','🧘',35],['Dead bug','3 × 8/côté','Tronc stable.','🧱',35]]}};
const PO={E:[14,78,24,80,50,82,24,52,30,54,60,60,76,62,64,58,80,60],F:[14,78,24,80,50,82,24,52,10,80,60,60,76,62,78,76,94,82],P:[14,56,24,60,62,66,30,84,34,84,76,74,90,84,78,75,92,84],K:[14,54,24,58,62,60,30,84,34,84,76,70,90,84,78,71,92,84],S:[50,15,50,25,50,55,42,45,58,45,47,72,45,90,53,72,55,90],Q:[52,32,50,42,40,64,66,46,70,48,62,66,50,90,64,67,54,90],J:[50,8,50,18,50,46,44,4,56,4,48,64,46,78,52,64,54,78],L:[50,18,50,28,50,56,42,48,58,48,72,66,74,90,34,76,16,88],U:[14,44,24,48,60,62,26,86,28,86,74,74,88,86,76,75,90,86],D:[14,70,24,72,60,78,26,86,28,86,74,82,88,86,76,83,90,86],B:[15,74,25,78,48,85,30,86,34,86,60,68,66,88,62,68,68,88],C:[15,74,25,78,52,62,30,86,34,86,62,64,66,88,64,64,68,88],R:[50,16,50,26,48,54,38,38,62,52,64,66,56,88,42,70,34,86],T:[50,16,50,26,52,54,62,52,38,38,42,66,50,86,62,72,72,84]},LN=[[1,2],[1,3],[1,4],[2,5],[5,6],[2,7],[7,8]];
const INFO={basket:['Ballon de basket, terrain ou cour, chaussures de salle','Travailler le premier pas, le dribble et la finition près du cercle'],run:['Chaussures de running, chrono ou montre','Cardio : fractionné court puis retour au calme'],force:['Sac à dos lesté (livres, bouteilles), canapé stable, tapis','Force des jambes, des hanches et du tronc utile au basket'],plyo:['Aucun matériel, sol non glissant, chaussures amorties','Détente, réactivité et appuis : saute à fond mais reste frais'],mobility:['Tapis et un mur','Chevilles et hanches libres, récupération active']};
const X={'Échauffement appuis':['RT','Petits pas chassés, talons-fesses et montées de genoux, sur place puis en avançant.'],'Départ 1 appui':['SL','Un pied devant, buste penché, pousse fort et pars sur 3 pas explosifs.'],'Cross → accélération':['RT','Dribble cross-over, puis accélère 3 pas en gardant le ballon bas.'],'Finition main faible':['RJ','Attaque le cercle, dernier appui puis lay-up de la main faible.'],'Détente verticale':['QJ','Descends vite en quart de squat, saute le plus haut possible, bras vers le cercle.'],'Échauffement':['RT','Trot léger, rotations de hanches, d’épaules et de chevilles.'],'Fractionné':['RT','45 s rapide mais contrôlé, puis trot lent pour récupérer, et on recommence.'],'Retour au calme':['RT','Marche ou trot très lent, respiration profonde.'],'Squat avec sac':['SQ','Sac sur la poitrine ou dans le dos, dos droit, cuisses parallèles au sol.'],'Fentes arrière':['SL','Recule un pied, genou arrière près du sol, genou avant au-dessus de la cheville.'],'Pompes':['UD','Mains sous les épaules, corps gainé, poitrine près du sol (genoux au sol si besoin).'],'Hip thrust canapé':['BC','Haut du dos sur le canapé, pieds au sol, monte les hanches et serre les fessiers.'],'Gainage':['PK','Corps droit de la tête aux talons, ventre serré, respire calmement.'],'Pogos':['SJ','Petits sauts sur l’avant du pied, jambes quasi tendues, contacts très courts.'],'Squat jump':['QJ','Descends en squat, explose vers le haut, réceptionne souple et silencieux.'],'Lateral bounds':['LS','Saute de côté d’une jambe sur l’autre, stabilise 1 s avant de repartir.'],'Saut approche':['RJ','2-3 pas d’élan, impulsion, bras vers le haut comme pour le dunk.'],'Cheville genou-au-mur':['SL','Pied à 10 cm du mur, pousse le genou vers le mur sans décoller le talon.'],'90/90 hanches':['QS','Assis, jambes à 90°, bascule les genoux d’un côté puis de l’autre, dos long.'],'Cossack squat':['QL','Jambes écartées, descends sur une jambe, l’autre reste tendue.'],'Dead bug':['EF','Sur le dos, bras et jambes en l’air, étends bras et jambe opposés sans cambrer.']};
const MS={q:[[3,.1,.9,13],[5,.1,.9,13]],c:[[4,.1,.85,10],[6,.1,.85,10]],a:[[0,.4,.95,15]],p:[[0,0,.5,16]],b:[[1,0,1,9],[2,0,1,9]],g:[['c',2,10]]},MU={q:'quadriceps',c:'mollets',a:'abdos',b:'bras',g:'fessiers',p:'pectoraux / épaules'},XM={'Échauffement appuis':'qc','Départ 1 appui':'qgc','Cross → accélération':'qcg','Finition main faible':'qgc','Détente verticale':'qgc','Échauffement':'qc','Fractionné':'qcg','Retour au calme':'qc','Squat avec sac':'qga','Fentes arrière':'qg','Pompes':'pba','Hip thrust canapé':'ga','Gainage':'ap','Pogos':'c','Squat jump':'qgc','Lateral bounds':'qgc','Saut approche':'qgc','Cheville genou-au-mur':'c','90/90 hanches':'g','Cossack squat':'qg','Dead bug':'a'},mu=n=>[...XM[n]].map(l=>MU[l]).join(', ');let fid=0;
const SEG=(k,a,b,w,c)=>`<line data-k="${k}" data-f="${a},${b}" stroke="${c}" stroke-width="${w}"/>`;
function fig(p,h,m){let id='gl'+(fid++),sk='#e2b48f',sh='#2b3350',tp='#3f6df0',hl=[...(m||'')].flatMap(x=>MS[x]||[]).map(z=>z[0]=='c'?`<circle data-pt="${z[1]}" r="${z[2]}"/>`:SEG(z[0],z[1],z[2],z[3],'#ff4d2a')).join('');return `<svg class="fg" data-p="${p}" viewBox="0 0 100 100" height="${h}"><defs><filter id="${id}" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="2.5"/></filter></defs><line x1="5" y1="91" x2="95" y2="91" stroke="#382d30" stroke-width="2"/><g stroke-linecap="round">${[4,6].map(k=>SEG(k,0,1,8,sk)).join('')}${[3,5].map(k=>SEG(k,0,1,12,sk)+SEG(k,0,.6,14,sh)).join('')}${[4,6].map(k=>SEG(k,.86,1,9,'#f2f2f2')).join('')}${SEG(0,0,1,16,tp)}${SEG(0,.8,1,17,sh)}${[1,2].map(k=>SEG(k,0,1,7,sk)+SEG(k,0,.3,9,tp)).join('')}</g><circle data-pt="0" r="7.5" fill="${sk}"/><g class="mus" filter="url(#${id})" stroke-linecap="round" fill="#ff4d2a">${hl}</g></svg>`}
function frame(ts){let t=(1-Math.cos(ts/450))/2;$$('svg.fg').forEach(f=>{let A=PO[f.dataset.p[0]],B=PO[f.dataset.p[1]],q=A.map((v,i)=>v+(B[i]-v)*t);f.querySelectorAll('[data-k]').forEach(e=>{let l=LN[e.dataset.k],r=(e.dataset.f||'0,1').split(',').map(Number),ax=q[2*l[0]],ay=q[2*l[0]+1],bx=q[2*l[1]],by=q[2*l[1]+1];e.setAttribute('x1',ax+(bx-ax)*r[0]);e.setAttribute('y1',ay+(by-ay)*r[0]);e.setAttribute('x2',ax+(bx-ax)*r[1]);e.setAttribute('y2',ay+(by-ay)*r[1])});f.querySelectorAll('[data-pt]').forEach(e=>{let i=e.dataset.pt;e.setAttribute('cx',q[2*i]);e.setAttribute('cy',q[2*i+1])})});requestAnimationFrame(frame)}frame(0);
const NX=`Corde à sauter|SJ|c|Petits sauts réguliers, poignets qui tournent, atterris sur l’avant du pied.
Saut groupé|QJ|qgc|Saute et ramène les genoux vers la poitrine, réception souple.
Saut en longueur|LJ|qgc|Court élan, saute loin, réceptionne sur deux pieds et stabilise 1 s.
Skipping explosif|RT|qc|Genoux hauts, pas rapides et dynamiques, bras coordonnés.
Saut en fente|LJ|qg|Pars en fente, saute, change de jambe en l’air et réceptionne en fente.
Bonds alternés|RT|qgc|Grandes foulées bondissantes, pousse fort à chaque appui.
Saut sur marche|QJ|qg|Face à une marche stable, saute dessus à deux pieds et redescends en marchant.
Squat bulgare|SL|qg|Pied arrière sur le canapé, descends droit, genou avant stable.
Soulevé de terre roumain|SQ|g|Jambes presque tendues, bascule le bassin en arrière, dos plat, sac contre les cuisses.
Gainage latéral|PK|a|Sur un avant-bras, corps aligné, hanches hautes.
Pompes pieds surélevés|UD|pba|Pieds sur le canapé, corps gainé, poitrine vers le sol.
Pont fessier 1 jambe|BC|g|Une jambe tendue, monte le bassin avec l’autre, hanches à niveau.
Step-up sur chaise|SL|qg|Monte sur une chaise stable en poussant avec la jambe du dessus, redescends contrôlé.
Fente profonde + rotation|LS|g|Fente basse, tourne le buste vers la jambe avant, respire.
Chat-vache|UD|a|À quatre pattes, arrondis puis creuse le dos lentement.
Étirement fléchisseurs de hanche|LS|q|Genou au sol, bassin vers l’avant, buste droit.
Pigeon|QS|g|Jambe avant pliée devant toi, bassin vers le sol, respire.
Cercles de chevilles|SL|c|Dessine de grands cercles avec le pied, dans les deux sens.
Tirs 3 points|QJ|qgb|Pieds alignés, coudes sous le ballon, extension complète, poignet relâché.
Tirs mi-distance|QJ|qgb|Équilibre, genoux fléchis, un seul mouvement vers le haut.
Lancers francs|SQ|qb|Même routine à chaque tir : respire, dribble, flexion, tir.
Tirs après dribble|RJ|qgb|Dribble, appui, tir : épaules face au panier.
Dribble main faible|RT|b|Dribble bas et contrôlé de la main faible, tête haute.
Dribble entre les jambes|RT|bq|Passe le ballon entre les jambes en marchant puis en courant.
Dribble tête haute|RT|bc|Dribble en regardant un point fixe plutôt que le ballon.
Passes sur cibles|SL|b|Passe vers 2 cibles (mur) en alternant, sans regarder avant le dernier moment.
Lecture 3 options|RT|c|Imagine 3 positions, choisis tir, passe ou pénétration en moins de 2 s.
Lay-up main forte|RJ|qgc|Dernier appui, genou haut, monte le ballon et dépose-le doucement.
Eurostep|LS|qg|Premier pas d’un côté, deuxième de l’autre, finis après le contournement.
Finition avec contact|RJ|qgp|Épaule dans un coussin ou un partenaire, finis malgré la pression.`;NX.split('\n').forEach(l=>{let a=l.split('|');X[a[0]]=[a[1],a[3]];XM[a[0]]=a[2]});
const FAM={rope:['','plus vite, appuis courts','alterne 30 s sur 1 jambe'],jump:['','pause 1 s à la réception','réception sur 1 jambe, 2 s'],squat:['','descente en 3 s','pause 2 s en bas, sac plus lourd'],push:['','descente en 3 s','pieds surélevés ou mains décalées'],hip:['','pause 2 s en haut','sur 1 jambe ou sac plus lourd'],core:['','+10 s','bras ou jambe levé'],mob:['','tenue 5 s','plus d’amplitude, sans forcer'],shoot:['5 tirs par spot, 3 spots','après un dribble','après un sprint (fatigue)'],drib:['','plus vite, tête haute','sous pression, défenseur imaginaire'],fin:['','avec contact (épaule)','changement de rythme + feinte']};
const PLYO=[['Pogos','rope',3,12,25],['Corde à sauter','rope',3,40,40,'s'],['Squat jump','jump',3,6,25],['Saut groupé','jump',3,6,25],['Saut en longueur','jump',3,5,25],['Lateral bounds','jump',3,6,30,'c'],['Skipping explosif','rope',3,20,20,'s'],['Saut en fente','jump',3,8,30],['Bonds alternés','jump',3,10,25],['Saut approche','jump',4,4,25],['Détente verticale','jump',4,5,25],['Saut sur marche','jump',3,6,25]];
const FORCE=[['Squat avec sac','squat',4,10,40],['Fentes arrière','squat',3,8,40,'c'],['Pompes','push',4,10,35],['Hip thrust canapé','hip',4,12,35],['Gainage','core',3,30,30,'s'],['Cossack squat','squat',3,6,40,'c'],['Squat bulgare','squat',3,8,40,'c'],['Soulevé de terre roumain','hip',4,10,40],['Gainage latéral','core',3,25,25,'s'],['Pompes pieds surélevés','push',3,8,35],['Pont fessier 1 jambe','hip',3,10,35,'c'],['Step-up sur chaise','squat',3,10,40,'c']];
const MOB=[['Cheville genou-au-mur','mob',2,10,30,'c'],['90/90 hanches','mob',2,8,40,'c'],['Cossack squat','mob',2,6,40,'c'],['Dead bug','core',3,8,40,'c'],['Fente profonde + rotation','mob',2,6,40,'c'],['Chat-vache','mob',2,10,40],['Étirement fléchisseurs de hanche','mob',2,30,30,'s'],['Pigeon','mob',2,40,40,'s'],['Cercles de chevilles','mob',2,12,25,'c']];
const BF={'3 points':[['Tirs 3 points','shoot',4,8,50],['Tirs après dribble','shoot',3,6,50]],'Mi-distance':[['Tirs mi-distance','shoot',4,8,50],['Tirs après dribble','shoot',3,6,50]],'Lancers francs':[['Lancers francs','shoot',4,10,45]],'Dribbles':[['Dribble main faible','drib',3,40,40,'s'],['Dribble entre les jambes','drib',3,40,40,'s'],['Cross → accélération','drib',4,6,35],['Dribble tête haute','drib',3,40,40,'s']],'Vision de jeu':[['Passes sur cibles','drib',3,12,45],['Lecture 3 options','drib',4,6,40],['Dribble tête haute','drib',3,40,40,'s']],'Finition':[['Lay-up main forte','fin',4,6,40],['Finition main faible','fin',4,6,40],['Eurostep','fin',3,6,40,'c'],['Finition avec contact','fin',3,6,40],['Départ 1 appui','fin',4,5,35,'c']]};
function WK(){return Math.max(0,Math.floor((new Date(dk()+'T12:00:00')-new Date(S.start+'T12:00:00'))/6048e5))}
function lv(w){return {t:Math.min(2,Math.floor(w/4)),xs:Math.min(2,Math.floor(w/4)),xr:Math.min(4,Math.floor(w/2)),dl:w>0&&w%4==3}}
function adapt(){let h=S.history.slice(-3);if(h.length<2)return 0;let d=h.reduce((s,x)=>s+x.d,0)/h.length,f=h.reduce((s,x)=>s+x.f,0)/h.length;return d>=4||f>=4?-1:d<=2&&f<=2.5?1:0}
function pick(p,n,w){return Array.from({length:Math.min(n,p.length)},(_,i)=>p[(w*n+i)%p.length])}
function mk(p,w){let L=lv(w),u=p[5]||'',sets=L.dl?Math.max(2,p[2]-1):Math.max(2,p[2]+Math.max(0,L.xs+LD().L)-(LD().L<=-2?1:0)),r=p[3]+(L.dl?0:(u=='s'?5:1)*L.xr);return [p[0],sets+' × '+r+(u=='s'?' s':u=='c'?' / côté':''),FAM[p[1]][L.t],'',u=='s'?r:p[4]]}
function build(t){let w=WK(),WU=['Échauffement','5 min','','',300];if(t=='plyo')return [WU].concat(pick(avoid(PLYO),4,w).map(p=>mk(p,w)));if(t=='force')return [WU].concat(pick(avoid(FORCE),4,w).map(p=>mk(p,w)));if(t=='mobility')return pick(MOB,5,w).map(p=>mk(p,w));if(t=='basket'){let sel=S.bf.length?S.bf:Object.keys(BF),n=sel.length<=2?2:1,seen={},out=[['Échauffement appuis','5 min','','',300]];sel.forEach(k=>pick(BF[k],n,w).forEach(p=>{if(!seen[p[0]]){seen[p[0]]=1;out.push(mk(p,w))}}));return out}return W[t].e}
function progLine(){let w=WK(),L=lv(w),a=adapt();return `<p><b>Programme :</b> semaine ${w+1} · niveau ${L.t+1}/3${L.dl?' · semaine allégée':''}${LD().L<0?' · allégé : '+LD().why.join(', '):a>0?' · charge augmentée (séances faciles)':''}</p>`}
function focusHTML(){return `<p><b>Choisis ce que tu travailles (touche pour cocher)</b></p>${Object.keys(BF).map(k=>`<div class="frow ${S.bf.includes(k)?'on':''}" onclick="togFocus('${k}')"><span>${FD[k][0]}</span><div><b>${FD[k][1]}</b><small>${FD[k][2]}</small></div><i>${S.bf.includes(k)?'✅':'⬜'}</i></div>`).join('')}<small>${S.bf.length?S.bf.length+' axe(s) sélectionné(s)':'Aucun axe : tous seront travaillés'}</small>`}
function togFocus(k){let i=S.bf.indexOf(k);i<0?S.bf.push(k):S.bf.splice(i,1);W.basket.e=build('basket');save();showEx()}
const PD={poul:23,thon:25,'œufs':12.5,stea:21,feta:14,from:8,lait:3.4,floc:13,whey:80,lent:9,pois:7,riz:7,'pâte':12,gnoc:4,pomm:2,bana:1.1,carr:.9,cour:1.2,toma:.9,broc:2.8,hari:2,rata:1.5,pest:5,'maïs':3.3,wrap:8,fram:1.2,'crèm':2.5},UG={'œuf':55,ban:120,wra:60};
const FD={'3 points':['🎯','Tirs à 3 points','Tirer derrière l’arc, en rythme'],'Mi-distance':['🏀','Tirs mi-distance','Tirs à 4-5 m, après arrêt ou dribble'],'Lancers francs':['🧘','Lancers francs','Routine et régularité sur la ligne'],'Dribbles':['⛹️','Dribbles','Contrôle, main faible, changements de direction'],'Vision de jeu':['👀','Vision de jeu','Tête haute, lecture et passes'],'Finition':['💥','Finition','Lay-up, contact, finir près du cercle']};
const MZ={q:['qu','ad'],c:['mo','ti'],a:['ab','ob','lo'],b:['bi','tc','av'],g:['fe'],p:['pe','de']};
const NM={tr:'Trapèzes',de:'Épaules',pe:'Pectoraux',bi:'Biceps',tc:'Triceps',av:'Avant-bras',ab:'Abdominaux',ob:'Obliques',ad:'Adducteurs',qu:'Quadriceps',ge:'Genoux',ti:'Tibias / jambes',pi:'Pieds / chevilles',da:'Dorsaux',lo:'Lombaires',fe:'Fessiers',is:'Ischio-jambiers',mo:'Mollets'},AL={tr:'ep',de:'ep',pe:'to',bi:'br',tc:'br',av:'br',ab:'to',ob:'to',ad:'qu',ge:'qu',ti:'mo',pi:'mo',lo:'da'};
const BZ={face:{tr:'<path d="M60 36L70 40L66 47L60 45Z"/>',de:'<ellipse cx="88" cy="53" rx="10" ry="8"/>',pe:'<ellipse cx="72" cy="62" rx="12" ry="9"/>',bi:'<ellipse cx="98" cy="76" rx="5.5" ry="13"/>',av:'<ellipse cx="102" cy="104" rx="5" ry="15"/>',ab:'<rect x="60" y="73" width="14" height="36" rx="5"/>',ob:'<ellipse cx="82" cy="90" rx="5" ry="16"/>',ad:'<ellipse cx="64" cy="142" rx="4" ry="20"/>',qu:'<ellipse cx="75" cy="145" rx="11" ry="26"/>',ge:'<ellipse cx="73" cy="180" rx="7" ry="6"/>',ti:'<ellipse cx="73" cy="208" rx="6" ry="21"/>',pi:'<ellipse cx="74" cy="242" rx="8" ry="5"/>'},dos:{tr:'<path d="M60 36L82 46L72 62L60 66Z"/>',de:'<ellipse cx="88" cy="53" rx="10" ry="8"/>',da:'<path d="M60 68L82 62L80 96L60 104Z"/>',lo:'<rect x="60" y="100" width="18" height="14" rx="4"/>',tc:'<ellipse cx="98" cy="76" rx="5.5" ry="13"/>',av:'<ellipse cx="102" cy="104" rx="5" ry="15"/>',fe:'<ellipse cx="73" cy="127" rx="12" ry="11"/>',is:'<ellipse cx="73" cy="158" rx="10" ry="22"/>',mo:'<ellipse cx="73" cy="206" rx="8" ry="22"/>',pi:'<ellipse cx="74" cy="242" rx="8" ry="5"/>'}};
$('#fw').innerHTML=Object.values(W).map(x=>`<option>${x.t}</option>`).join('');let type='plyo',ei=0,remain=30,intv=null;
function openWorkout(t){if(t==='run'){openRun();return}type=t;W[t].e=build(t);$('#fw').value=W[t].t;ei=-1;$('#workout').classList.add('open');showEx()}function closeWorkout(){$('#workout').classList.remove('open');pauseTimer()}
function showEx(){let w=W[type],br=ei<0;$('#brief').style.display=br?'':'none';$('#player').style.display=br?'none':'';if(br){$('#wn').textContent=w.t;$('#brief').innerHTML=progLine()+(type==='basket'?focusHTML():'')+`<p><b>Objectif :</b> ${INFO[type][1]}</p><p><b>Matériel :</b> ${INFO[type][0]}</p>`+w.e.map(e=>`<div class="bx">${fig(X[e[0]][0],56,XM[e[0]])}<div><b>${e[0]}</b> <em>${e[1]}</em>${e[2]?'<small style="color:#ffc857">⬆ '+e[2]+'</small>':''}<small>${X[e[0]][1]}</small><small>💪 ${mu(e[0])}</small>${SIDE[e[0]]?'<small>↔ Chaque série se fait des deux côtés : gauche puis droite</small>':''}</div></div>`).join('')+`<button class="mainbtn full" style="margin-top:12px" onclick="ei=0;showEx()">Démarrer la séance</button>`;return}let e=w.e[ei];$('#wn').textContent=e[0];$('#wc').textContent=e[1];$('#wnote').textContent=e[2]+' '+X[e[0]][1]+' 💪 '+mu(e[0])+(SIDE[e[0]]?' ↔ Chaque série : '+SIDE[e[0]][0]+' puis '+SIDE[e[0]][1]+'.':'');$('#demoIcon').innerHTML='<div style="display:flex;align-items:center;justify-content:center;gap:4px">'+(S.media[e[0]]?mediaHTML(S.media[e[0]]):fig(X[e[0]][0],170,XM[e[0]]))+mannPair(e[0])+'</div><small><a onclick="setMedia()">🎞 Mettre un GIF / une vidéo (lien)</a></small>';remain=e[4];si=1;ph='work';label();clock();renderLog()}
function clock(){$('#timer').textContent=String(Math.floor(remain/60)).padStart(2,'0')+':'+String(remain%60).padStart(2,'0')}function startTimer(){if(intv)return;actx();intv=setInterval(()=>{if(remain>0){remain--;clock();tickFx()}else phaseEnd()},1000)}function pauseTimer(){clearInterval(intv);intv=null}function nextExercise(){pauseTimer();ei=(ei+1)%W[type].e.length;showEx()}
$$('nav button').forEach(b=>b.onclick=()=>{$$('.page').forEach(p=>p.classList.remove('active'));$('#'+b.dataset.page).classList.add('active');$$('nav button').forEach(x=>x.classList.remove('active'));b.classList.add('active');$('#title').textContent={sport:'Aujourd’hui',food:'Alimentation',plan:'Planning',health:'Santé',progress:'Progression',social:'Amis & groupes'}[b.dataset.page];if(b.dataset.page==='progress'){drawChart();drawW();drawCurve()}if(b.dataset.page==='social')socialTab(S.socialTab||'friends',document.getElementById('st'+({friends:'Friends',groups:'Groups',requests:'Requests'}[S.socialTab||'friends'])))});
function renderWeek(){$('#week').innerHTML=['Lun','Mar','Mer','Jeu','Ven','Sam','Dim'].map((d,i)=>`<div class="day ${i==TD()?'today':''}"><b>${d}</b><span>${ico(S.week[i])}</span><small>${S.week[i]}</small></div>`).join('');setToday();sugg()}renderWeek();
function openSchedule(){$('#schedule').classList.add('open');$('#scheduleBox').innerHTML=['Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi','Dimanche'].map((d,i)=>`<div class="scheduleline"><b>${d}</b><select data-i="${i}">${Object.values(W).map(x=>`<option ${S.week[i]===x.t?'selected':''}>${x.t}</option>`).join('')}${i==0?'<option>Entraînement club · 19h30–21h30</option>':''}${i==2?'<option>Match · 20h30</option>':''}</select></div>`).join('');$$('#scheduleBox select').forEach(x=>x.onchange=()=>{S.week[x.dataset.i]=x.value;save();renderWeek()})}function closeSchedule(){$('#schedule').classList.remove('open')}
const meals=[['Petit-déjeuner','Porridge banane + lait + whey',620,[['Flocons d’avoine','80 g','Glucides','énergie durable'],['Lait','300 ml','Protéines + glucides','calcium'],['Banane','120 g','Glucides','énergie + potassium'],['Whey','25 g','Protéines','atteindre l’objectif protéique']]],['Déjeuner','Riz, poulet & courgettes',760,[['Riz cru','120 g','Glucides','carburant'],['Poulet','180 g','Protéines','construction musculaire'],['Courgettes','200 g','Fibres','micronutriments'],['Huile d’olive','10 g','Lipides','énergie + acides gras']]],['Collation','Fromage blanc, framboises & avoine',410,[['Fromage blanc','250 g','Protéines','récupération'],['Framboises','150 g','Fibres','micronutriments'],['Avoine','40 g','Glucides','énergie'],['Miel','15 g','Glucides','énergie rapide']]],['Dîner','Pâtes, steak & tomate',780,[['Pâtes crues','120 g','Glucides','reconstituer les réserves'],['Steak 5%','150 g','Protéines + lipides','force + muscle'],['Tomate','200 g','Fibres','micronutriments'],['Huile d’olive','10 g','Lipides','densité énergétique']]]];
let ft='meals',ri=0,rs=1;const TABS=['meals','recipes','stock','batch','shop'],PLAN=meals.reduce((a,m)=>a+m[2],0),mt=(a,b)=>a.toLowerCase().slice(0,4)===b.toLowerCase().slice(0,4);
const RC=[
['Riz thon courgettes','15 min',560,['Cuis le riz 10 à 12 min dans 2 fois son volume d’eau salée.','Coupe les courgettes en dés et fais-les revenir 6 min à feu moyen avec l’huile.','Ajoute le thon égoutté, poivre, et sers sur le riz.'],[['Riz',100,'g'],['Thon',140,'g'],['Courgettes',200,'g'],['Huile d’olive',10,'g']]],
['Pâtes poulet pesto','18 min',720,['Cuis les pâtes 9 à 11 min à l’eau bouillante salée.','Coupe le poulet en dés et saisis-le 8 min à feu moyen-vif, jusqu’à cuisson à cœur.','Égoutte les pâtes, mélange avec le poulet et le pesto.'],[['Pâtes',120,'g'],['Poulet',160,'g'],['Pesto',20,'g']]],
['Pommes de terre, œufs & haricots','25 min',650,['Coupe les pommes de terre en cubes et cuis-les 15 min à l’eau bouillante.','Ajoute les haricots verts pour les 8 dernières minutes.','Cuis les œufs à la poêle (3 min) ou durs (9 min) et sers ensemble.'],[['Pommes de terre',350,'g'],['Œufs',3,'unité'],['Haricots verts',200,'g']]],
['Lentilles, riz & œufs','20 min',640,['Cuis le riz 10 à 12 min.','Réchauffe les lentilles cuites 5 min avec sel et épices.','Cuis les œufs au plat 3 min et pose-les sur le riz et les lentilles.'],[['Lentilles',200,'g'],['Riz',80,'g'],['Œufs',2,'unité']]],
['Wrap thon maïs tomate','10 min',520,['Égoutte le thon et le maïs, coupe la tomate en dés.','Mélange avec un peu de fromage blanc.','Garnis les wraps, roule-les et fais dorer 1 min par côté à la poêle.'],[['Wraps',2,'unité'],['Thon',120,'g'],['Maïs',80,'g'],['Tomates',120,'g']]],
['Riz bœuf petits pois','20 min',700,['Cuis le riz 10 à 12 min.','Saisis le steak 2 à 3 min par côté à feu vif, repose 2 min puis tranche.','Réchauffe les petits pois 5 min et assemble.'],[['Riz',110,'g'],['Steak',150,'g'],['Petits pois',150,'g']]],
['Gnocchis steak pesto rosso','15 min',740,['Plonge les gnocchis dans l’eau bouillante : ils sont cuits quand ils remontent (2-3 min).','Saisis le steak 2 à 3 min par côté, repose 2 min et coupe.','Mélange gnocchis, steak et pesto rosso.'],[['Gnocchis',300,'g'],['Steak',150,'g'],['Pesto',25,'g']]],
['Ratatouille, riz & œufs','15 min',600,['Cuis le riz 10 à 12 min.','Chauffe la ratatouille 5 min à feu moyen.','Cuis les œufs au plat 3 min et pose-les dessus.'],[['Ratatouille',250,'g'],['Riz',100,'g'],['Œufs',3,'unité']]],
['Omelette feta courgettes','15 min',520,['Fais revenir les courgettes en rondelles 5 min.','Bats les œufs, verse-les dans la poêle et ajoute la feta émiettée.','Cuis 4 à 5 min à feu doux, plie et sers.'],[['Œufs',4,'unité'],['Courgettes',150,'g'],['Feta',50,'g'],['Huile d’olive',5,'g']]],
['Pancakes banane avoine','15 min',480,['Écrase la banane, mélange avec les œufs, l’avoine et le lait.','Laisse reposer 5 min.','Cuis 2 min par face à feu moyen dans une poêle huilée.'],[['Bananes',1,'unité'],['Flocons d’avoine',80,'g'],['Œufs',2,'unité'],['Lait',100,'ml']]],
['Bowl pois chiches poulet','20 min',620,['Cuis le riz 10 à 12 min.','Saisis le poulet en dés 8 min, ajoute les pois chiches égouttés 3 min.','Sers sur le riz avec la tomate en dés et un filet d’huile.'],[['Pois chiches',200,'g'],['Poulet',150,'g'],['Tomates',120,'g'],['Riz',60,'g']]],
['Pâtes thon tomate','15 min',650,['Cuis les pâtes 9 à 11 min.','Fais revenir la tomate en dés 5 min avec l’huile, ajoute le thon.','Mélange aux pâtes égouttées, poivre.'],[['Pâtes',120,'g'],['Thon',120,'g'],['Tomates',200,'g'],['Huile d’olive',10,'g']]]];
const BT=[['Riz, poulet & légumes',4,700,[['Riz cru',480,'g'],['Poulet',720,'g'],['Courgettes',400,'g'],['Carottes',400,'g'],['Huile d’olive',40,'g']],['Cuis le riz 10 à 12 min puis rince-le à l’eau froide pour qu’il ne colle pas.','Coupe le poulet en dés et saisis-le 8 à 10 min à feu moyen-vif avec 20 g d’huile.','Fais revenir courgettes et carottes en dés 10 min avec le reste de l’huile.','Répartis en 4 boîtes (120 g de riz cru, 180 g de poulet, 200 g de légumes par portion), laisse refroidir, frigo 4 jours max.']],
['Pâtes, thon & tomates',5,640,[['Pâtes crues',600,'g'],['Thon',700,'g'],['Tomates',1000,'g'],['Huile d’olive',30,'g']],['Cuis les pâtes 1 min de moins que le temps indiqué (al dente).','Fais revenir les tomates en dés 10 min avec l’huile pour obtenir une sauce.','Mélange avec le thon égoutté et les pâtes, répartis en 5 boîtes, frigo 3 jours max.']]];
RC.push(
['Bowl thon, riz & maïs','12 min',590,['Cuis le riz puis laisse-le tiédir.','Mélange le thon égoutté avec le maïs, les courgettes et un filet d’huile.','Ajoute le riz, poivre et citron si tu en as.'],[['Riz',100,'g'],['Thon',120,'g'],['Maïs',80,'g'],['Courgettes',150,'g'],['Huile d’olive',10,'g']]],
['Pâtes thon, courgette & pesto','18 min',650,['Cuis les pâtes.','Fais revenir la courgette en dés 6 à 8 min.','Ajoute le thon égoutté et le pesto hors du feu, puis mélange avec les pâtes.'],[['Pâtes',120,'g'],['Thon',120,'g'],['Courgettes',180,'g'],['Pesto',25,'g']]],
['Riz sauté œufs & légumes','15 min',610,['Cuis le riz puis égoutte-le.','Fais revenir les carottes et petits pois 5 min.','Ajoute le riz puis les œufs battus et mélange jusqu’à cuisson complète.'],[['Riz',100,'g'],['Œufs',2,'unité'],['Carottes',80,'g'],['Petits pois',80,'g'],['Huile d’olive',10,'g']]],
['Wrap poulet, maïs & fromage frais','10 min',620,['Émince le poulet déjà cuit.','Garnis les wraps avec poulet, maïs, courgette crue et fromage frais.','Roule et passe 2 min à la poêle si tu veux les griller.'],[['Wraps',2,'unité'],['Poulet',150,'g'],['Maïs',60,'g'],['Courgettes',80,'g'],['Fromage blanc',60,'g']]],
['Lentilles, thon & feta','8 min',560,['Égoutte les lentilles et le thon.','Ajoute tomates, feta et huile d’olive.','Mélange, assaisonne et sers froid ou légèrement tiédi.'],[['Lentilles',180,'g'],['Thon',120,'g'],['Tomates',150,'g'],['Feta',50,'g'],['Huile d’olive',10,'g']]],
['Gnocchis pesto, steak & courgette','15 min',760,['Fais dorer les gnocchis 5 à 7 min à la poêle.','Saisis le steak puis tranche-le.','Ajoute courgette et pesto, mélange 3 min et sers avec le steak.'],[['Gnocchis',250,'g'],['Steak',150,'g'],['Courgettes',150,'g'],['Pesto',25,'g']]]);
RC.push(['Poulet curry riz','25 min',680,['Cuis le riz 10 à 12 min.','Saisis le poulet en dés 8 min, ajoute les carottes râpées et le curry, 2 min.','Baisse le feu, ajoute la crème fraîche 3 min et sers sur le riz.'],[['Poulet',160,'g'],['Riz',100,'g'],['Carottes',100,'g'],['Crème fraîche',40,'g'],['Curry',5,'g']]],
['Steak, pommes de terre & haricots','30 min',720,['Coupe les pommes de terre en quartiers, huile, four 200 °C pendant 25 min.','Cuis les haricots verts 8 min à l’eau bouillante.','Saisis le steak 2 à 3 min par côté et repose 2 min.'],[['Steak',150,'g'],['Pommes de terre',300,'g'],['Haricots verts',150,'g'],['Huile d’olive',10,'g']]],
['Thon, pois chiches & tomates','10 min',480,['Égoutte et rince les pois chiches, égoutte le thon.','Coupe les tomates en dés.','Mélange avec l’huile, sel, poivre, et sers frais.'],[['Thon',120,'g'],['Pois chiches',150,'g'],['Tomates',150,'g'],['Huile d’olive',10,'g']]],
['Pâtes crème poulet brocoli','20 min',750,['Cuis les pâtes 9 à 11 min, ajoute le brocoli en fleurettes les 4 dernières minutes.','Saisis le poulet en dés 8 min.','Ajoute la crème fraîche 2 min, mélange aux pâtes égouttées.'],[['Pâtes',120,'g'],['Poulet',150,'g'],['Brocoli',150,'g'],['Crème fraîche',50,'g']]],
['Porridge banane whey','8 min',520,['Chauffe le lait et l’avoine 4 à 5 min en remuant.','Hors du feu, ajoute la whey et mélange vite.','Coupe la banane dessus.'],[['Flocons d’avoine',80,'g'],['Lait',300,'ml'],['Bananes',1,'unité'],['Whey',25,'g']]],
['Fromage blanc, framboises & avoine','3 min',410,['Mets le fromage blanc dans un bol.','Ajoute framboises, avoine et miel.','Mélange et mange.'],[['Fromage blanc',250,'g'],['Framboises',150,'g'],['Flocons d’avoine',40,'g'],['Miel',15,'g']]],
['Riz cantonais maison','20 min',640,['Cuis le riz 10 à 12 min et laisse-le refroidir.','Fais revenir les carottes en dés 5 min, ajoute le riz et les petits pois 3 min.','Pousse sur le côté, brouille les œufs 2 min et mélange.'],[['Riz',100,'g'],['Œufs',2,'unité'],['Petits pois',80,'g'],['Carottes',80,'g'],['Huile d’olive',10,'g']]],
['Chili lentilles bœuf','30 min',700,['Fais revenir le steak haché 5 min en l’émiettant.','Ajoute les tomates en dés, 10 min à feu moyen.','Ajoute lentilles cuites et maïs, 8 min, assaisonne.'],[['Steak',150,'g'],['Lentilles',120,'g'],['Tomates',200,'g'],['Maïs',50,'g']]],
['Gratin gnocchis feta','25 min',680,['Cuis les gnocchis 3 min dans l’eau bouillante, égoutte.','Mélange avec tomates en dés, crème fraîche et feta émiettée.','Four 200 °C pendant 10 min jusqu’à légère coloration.'],[['Gnocchis',300,'g'],['Feta',60,'g'],['Tomates',150,'g'],['Crème fraîche',30,'g']]],
['Omelette pommes de terre','20 min',560,['Coupe les pommes de terre en fines rondelles, fais-les cuire 10 min dans l’huile à feu moyen.','Bats les œufs, verse sur les pommes de terre.','Cuis 5 min à feu doux, retourne 2 min et sers.'],[['Œufs',3,'unité'],['Pommes de terre',200,'g'],['Huile d’olive',10,'g']]]);
BT.push(['Chili lentilles & bœuf',4,650,[['Steak',600,'g'],['Lentilles',600,'g'],['Tomates',800,'g'],['Maïs',200,'g'],['Huile d’olive',20,'g']],['Fais revenir le steak haché 6 min avec l’huile en l’émiettant.','Ajoute les tomates en dés, laisse mijoter 15 min.','Ajoute lentilles cuites et maïs, 8 min de plus, assaisonne.','Répartis en 4 boîtes, laisse refroidir, frigo 4 jours max.']],['Riz, steak & petits pois',4,720,[['Riz cru',440,'g'],['Steak',600,'g'],['Petits pois',600,'g']],['Cuis le riz 10 à 12 min, rince-le à l’eau froide.','Saisis les steaks 2 à 3 min par côté, repose, tranche.','Réchauffe les petits pois 5 min.','Répartis en 4 boîtes (110 g de riz cru, 150 g de steak, 150 g de petits pois), frigo 3 jours max.']]);const SH=[4,3,4,3];
(S.myrec||[]).forEach(r=>RC.push(r));let rq='',rstock=false,rfav=false;
function have(n){return S.pantry.some(p=>mt(p.n,n)&&p.q!==0)}
function sb(ing){return `<small>${ing.filter(x=>have(x[0])).length}/${ing.length} en stock</small>`}
function rf(){foodTab(ft,$$('.tabs button')[TABS.indexOf(ft)])}
function eat(i){let a=S.eat[dk()]=S.eat[dk()]||[],p=a.indexOf(i);p<0?a.push(i):a.splice(p,1);save();rf()}
function eatenKcal(d){d=d||dk();return (S.eat[d]||[]).reduce((s,i)=>s+Math.round(meals[i][2]*F()),0)+(S.extra[d]||[]).reduce((s,e)=>s+e.k,0)}
function logX(n,k,p){(S.extra[dk()]=S.extra[dk()]||[]).push({n,k,p:Math.round(p||0)});save()}
function addX(a){a=a||'x';let n=$('#'+a+'n').value.trim(),k=+$('#'+a+'k').value,p=+$('#'+a+'p').value;if(!n||!k)return alert('Renseigne le nom et les kcal');logX(n,k,p);rf()}
function pantryAdd(n,q,u,e){let p=S.pantry.find(x=>mt(x.n,n));if(p){p.q=(+p.q||0)+q;if(e&&(!p.e||e<p.e))p.e=e}else S.pantry.push({n,q,u,e:e||''})}
function pantryUse(n,q){let p=S.pantry.find(x=>mt(x.n,n)&&x.q!=='');if(p)p.q=Math.max(0,p.q-q)}
function addStock(){let n=$('#sn').value.trim(),q=+$('#sq').value;if(!n||!q)return alert('Renseigne l’aliment et la quantité');pantryAdd(n,q,$('#su').value,$('#sd').value);save();rf()}
function buy(i){let x=S.shop[i];x.d=!x.d;let k=x.u=='kg'||x.u=='L'?1000:1,u=x.u=='kg'?'g':x.u=='L'?'ml':x.u;x.d?pantryAdd(x.n,x.q*k,u,x.e):pantryUse(x.n,x.q*k);save();renderShop()}
function openRecipe(i,s){ri=i;rs=s||1;let r=RC[i];$('#rn').textContent=r[0];$('#rbody').innerHTML=`<small>⏱ ${r[1]} · ≈${r[2]*rs} kcal · ≈${Math.round(recProt(r)*rs)} g de protéines</small>${expNote(r)}<div class="twobtn" style="margin:10px 0"><button onclick="openRecipe(${i},${Math.max(1,rs-1)})">− portion</button><button onclick="openRecipe(${i},${rs+1})">+ portion</button></div><h3>${rs} portion${rs>1?'s':''}</h3><div class="ingredients">${r[4].map(x=>`<div class="ingredient"><span>${have(x[0])?'✓':'✗'} ${x[0]}</span><b>${x[1]*rs} ${x[2]}</b></div>`).join('')}</div><h3 style="margin-top:14px">Préparation</h3><ol>${r[3].map(t=>`<li>${t}</li>`).join('')}</ol><button class="next" onclick="missing()">🛒 Ajouter les manquants aux courses</button><button class="mainbtn full" style="margin-top:7px" onclick="ate()">J’ai mangé ça</button>${r[5]?`<button class="next" onclick="window.open(RC[${i}][5],'_blank')">🔗 Ouvrir la recette en ligne</button>`:''}${S.myrec.includes(r)?`<button class="next" onclick="delRec(${i})">Supprimer cette recette</button>`:''}`;$('#recipe').classList.add('open')}
function missing(){let n=0;RC[ri][4].forEach(x=>{if(!have(x[0])&&!S.shop.some(y=>mt(y.n,x[0])&&!y.d)){S.shop.push({n:x[0],q:x[1]*rs,u:x[2],p:S.prices[x[0]]||0,d:0});n++}});save();renderShop();alert(n?n+' produit(s) ajouté(s) aux courses':'Tu as déjà tout !')}
function ate(){let r=RC[ri];logX(r[0]+(rs>1?' ×'+rs:''),r[2]*rs,recProt(r)*rs);r[4].forEach(x=>pantryUse(x[0],x[1]*rs));$('#recipe').classList.remove('open');rf()}
function cookB(i){let b=BT[i];S.batch[i]=(S.batch[i]||0)+b[1];(S.bdate=S.bdate||{})[i]=dk();b[3].forEach(x=>pantryUse(x[0],x[1]));save();rf()}
async function importBatchLink(){let url=$('#blk').value.trim();if(!url)return alert('Colle un lien');$('#bstatus').innerHTML='<p>Analyse du lien…</p>';let r=await fetchRecipeLink(url);if(!r){$('#bstatus').innerHTML='<p>Impossible de lire automatiquement cette page. Essaie une recette avec données structurées.</p>';return}let portions=Math.max(1,+$('#bport').value||4),kcal=+$('#bkcal').value||r.kcal||0,protein=+$('#bprot').value||r.protein||0;BT.push([r.name,portions,Math.round(kcal),r.ingredients,r.steps,r.url,protein]);S.batch[BT.length-1]=0;save();$('#addbatch').classList.remove('open');rf();alert('Batch ajouté : '+r.name+' · '+portions+' portions · '+(kcal||'?')+' kcal · '+(protein||'?')+' g protéines/portion')}
function batchHTML(){return `<button class="mainbtn full" style="margin-bottom:10px" onclick="$('#addbatch').classList.add('open')">＋ Ajouter un batch depuis un lien</button>`+BT.map((b,i)=>{let rem=S.batch[i]||0,d=S.bdate&&S.bdate[i],exp='';if(rem>0&&d){let e=new Date(d+'T12:00:00');e.setDate(e.getDate()+(SH[i]||4));exp=`<p>${ld(e)<dk()?'⚠️ Dépassé depuis le ':'🗓 À manger avant le '}${e.toLocaleDateString('fr-FR')}</p>`}else if(!rem)exp='<p>Appuie sur « Préparé » après avoir cuisiné pour remplir le frigo.</p>';return `<div class="batch"><h3>🍱 ${b[0]}</h3><p>🧊 Reste <b>${rem}</b> portion(s) · ≈${b[2]} kcal · ≈${Math.round(b[6]||bp(i))} g protéines/portion</p>${b[5]?`<button class="next" onclick="window.open(${JSON.stringify(b[5])},'_blank')">🔗 Voir la recette source</button>`:''}<div class="bar"><span style="width:${Math.min(100,rem/b[1]*100)}%"></span></div>${exp}<div class="ingredients">${b[3].map(x=>`<div class="ingredient"><span>${x[0]}</span><b>${x[1]} ${x[2]} <small>· reste ≈${Math.round(x[1]*rem/b[1])}</small></b></div>`).join('')}</div><ol>${b[4].map(t=>`<li>${t}</li>`).join('')}</ol><div class="twobtn"><button onclick="eatB(${i})">Manger 1 portion</button><button class="mainbtn" onclick="cookB(${i})">Préparé ✓ (+${b[1]})</button></div></div>`}).join('')}
function eatB(i){if(!S.batch[i])return alert('Plus de portion au frigo');S.batch[i]--;logX('Batch · '+BT[i][0],BT[i][2],bp(i));rf()}
function mealsHTML(){let ex=S.extra[dk()]||[];return expBanner()+hydroHTML()+ktForm()+meals.map((m,i)=>`<div class="meal"><div class="mealhead"><div><small>${m[0]}</small><h4>${m[1]}</h4></div><b>${Math.round(m[2]*F())} kcal · ${Math.round(mealProt(m))} g prot</b></div><button class="mainbtn" style="margin-top:8px;padding:8px 12px" onclick="eat(${i})">${(S.eat[dk()]||[]).includes(i)?'✓ Mangé':'Marquer mangé'}</button><div class="ingredients">${m[3].map(x=>`<div class="ingredient"><span>${x[0]}</span><b>${scq(x[1])}</b></div>`).join('')}</div><div class="why">${m[3].map(x=>`<div><b>${x[2]}</b><small>${x[3]}</small></div>`).join('')}</div></div>`).join('')+`<div class="meal"><h3>➕ Mangé hors plan</h3>${ex.map((e,i)=>`<div class="ingredient" style="margin:6px 0"><span>${esc(e.n)}</span><b>${e.k} kcal${e.p?' · '+e.p+' g':''} <a onclick="S.extra[dk()].splice(${i},1);save();rf()">✕</a></b></div>`).join('')}<div class="form" style="grid-template-columns:2fr 1fr 1fr auto"><input id="xn" placeholder="Ex : kebab"><input id="xk" type="number" placeholder="kcal"><input id="xp" type="number" placeholder="prot. g"><button class="mainbtn" onclick="addX()">+</button></div></div>`}
function stockHTML(){return expBanner()+`<div class="stock"><h3>☑️ Mon stock</h3><p>Quantités et dates de péremption. Les quantités baissent quand tu cuisines et augmentent quand tu coches un achat.</p>${S.pantry.map((x,i)=>{let d=x.e?dd(x.e):null;return `<div style="padding:8px 0;border-bottom:1px solid #342a2d"><div class="ingredient"><b>${esc(x.n)}</b><a onclick="S.pantry.splice(${i},1);save();rf()">✕</a></div><div style="display:flex;gap:6px;align-items:center;flex-wrap:wrap"><input class="qin" type="number" value="${x.q}" onchange="S.pantry[${i}].q=this.value===''?'':+this.value;save()"> <small>${x.u}</small> <small>seuil</small><input class="qin" style="width:60px" placeholder="auto" value="${x.m??''}" onchange="S.pantry[${i}].m=this.value===''?null:+this.value;save()"> <input class="qin" style="width:140px" type="date" value="${x.e||''}" onchange="S.pantry[${i}].e=this.value;save();rf()">${d===null?'':`<small style="color:${d<0?'#ff6b6b':d<=4?'#ff9b78':'#a99da0'}">${d<0?'périmé':d==0?'aujourd’hui':'dans '+d+' j'}</small>`}</div></div>`}).join('')}<div class="form" style="grid-template-columns:1.4fr .8fr .7fr"><input id="sn" placeholder="Aliment"><input id="sq" type="number" placeholder="Qté"><select id="su"><option>g</option><option>ml</option><option>unité</option></select></div><div class="form" style="grid-template-columns:1fr auto"><input id="sd" type="date"><button class="mainbtn" onclick="addStock()">+ Ajouter</button></div></div>`}
function foodTab(t,el){ft=t;$$('.tabs button').forEach(x=>x.classList.remove('sel'));el&&el.classList.add('sel');$('#foodBox').style.display=t==='shop'?'none':'';$('#shopBox').style.display=t==='shop'?'':'none';let b=$('#foodBox');if(t==='meals')b.innerHTML=mealsHTML();else if(t==='recipes'){b.innerHTML=expBanner()+`<div class="form" style="grid-template-columns:2fr 1fr 1fr"><input id="rq" placeholder="Rechercher…" oninput="rq=this.value;recList()" value="${esc(rq)}"><button class="${rstock?'mainbtn':'next'}" style="margin:0" onclick="rstock=!rstock;rf()">En stock</button><button class="${rfav?'mainbtn':'next'}" style="margin:0" onclick="rfav=!rfav;rf()">★ Favoris</button></div><button class="mainbtn full" style="margin-bottom:10px" onclick="$('#addrec').classList.add('open')">＋ Ajouter une recette (manuelle ou lien)</button><div id="rlist"></div>`;recList()}else if(t==='stock')b.innerHTML=stockHTML();else if(t==='batch')b.innerHTML=batchHTML();else{renderShop();renderPrev()}$('#kcal').innerHTML=eatenKcal()+'<br><small>/ '+(S.kt||PLAN)+' kcal</small>'}
foodTab('meals',$('.tabs button'));
function addProduct(){let n=$('#pn').value,q=+$('#pq').value,u=$('#pu').value,p=+$('#pp').value||0;if(!n||!q)return alert('Renseigne le produit et la quantité');S.shop.push({n,q,u,p,d:0});save();renderShop();$('#pn').value='';$('#pq').value='';$('#pp').value=''}function renderShop(){let spent=S.shop.filter(x=>x.d).reduce((a,x)=>a+x.p,0);$('#spent').textContent=spent.toFixed(2)+' €';$('#planned').textContent='Objectif : 150 € · liste complète : '+S.shop.reduce((a,x)=>a+x.p,0).toFixed(2)+' €';$('#budgetBar').style.width=Math.min(100,spent/150*100)+'%';$('#shopList').innerHTML=S.shop.map((x,i)=>`<div class="historyitem"><div class="historytop"><b>${esc(x.n)}</b>${x.rt?`<small style="color:#ff9b78"> · reste ${x.rt}</small>`:''}<b>${x.q} ${x.u}</b></div><div class="chips"><input class="qin" type="number" step=".01" value="${x.p}" onchange="S.shop[${i}].p=+this.value;S.prices[S.shop[${i}].n]=+this.value;save();renderShop()"> € <input class="qin" style="width:135px" type="date" value="${x.e||''}" onchange="S.shop[${i}].e=this.value;save()"><button onclick="buy(${i})"> ${x.d?'✓ acheté':'□ à acheter'} </button><button onclick="delShop(${i})">🗑</button></div></div>`).join('')}renderShop();
['difficulty','fatigue','energy','legs','speed'].forEach(id=>$('#'+id).oninput=()=>$('#'+id[0]+'out').textContent=$('#'+id).value+'/5');let rating=3;$$('#ratings button').forEach((b,i)=>b.onclick=()=>{rating=i+1;$$('#ratings button').forEach(x=>x.classList.remove('chosen'));b.classList.add('chosen')});
function saveFeedback(){S.history.push({date:new Date().toLocaleDateString('fr-FR'),iso:dk(),workout:$('#fw').value,d:+$('#difficulty').value,f:+$('#fatigue').value,e:+$('#energy').value,l:+$('#legs').value,x:+$('#speed').value,r:rating,n:$('#note').value});save();renderHistory();drawChart();$('#saved').textContent='Enregistré';$('#note').value='';['difficulty','fatigue','energy','legs','speed'].forEach(id=>{$('#'+id).value=3;$('#'+id).oninput()});rating=3;$$('#ratings button').forEach((x,i)=>x.classList.toggle('chosen',i==2));goals()}
function renderHistory(){if(!S.history.length){$('#history').innerHTML='<div class="historyitem"><p>Ta première séance apparaîtra ici après enregistrement.</p></div>';return}$('#history').innerHTML=S.history.slice().reverse().map(h=>`<div class="historyitem"><div class="historytop"><b>${esc(h.workout)}</b><span class="historyscore">${h.r}/5</span></div><div class="chips"><span>${h.date}</span><span>Difficulté ${h.d}/5</span><span>Fatigue ${h.f}/5</span><span>Énergie ${h.e}/5</span><span>Explosivité ${h.x}/5</span></div>${h.n?'<p>“'+esc(h.n)+'”</p>':''}</div>`).join('')}renderHistory();
function drawChart(){let c=$('#chart'),ctx=c.getContext('2d'),w=c.clientWidth,h=210,d=devicePixelRatio||1;c.width=w*d;c.height=h*d;ctx.scale(d,d);ctx.clearRect(0,0,w,h);ctx.strokeStyle='#382d30';for(let y=25;y<h-25;y+=40){ctx.beginPath();ctx.moveTo(8,y);ctx.lineTo(w-8,y);ctx.stroke()}let a=S.history.length?S.history.map(x=>45+x.e*7-x.f*3+x.x*4):[];if(!a.length){ctx.fillStyle='#a99da0';ctx.font='12px Arial';ctx.fillText('Enregistre une séance pour voir ta courbe',12,h/2);return}let pts=a.map((v,i)=>[12+(w-24)*(a.length==1?.5:i/(a.length-1)),h-25-(h-50)*Math.min(95,v)/100]);ctx.strokeStyle='#ff6545';ctx.lineWidth=3;ctx.beginPath();pts.forEach((p,i)=>i?ctx.lineTo(...p):ctx.moveTo(...p));ctx.stroke();ctx.fillStyle='#ffc857';pts.forEach(p=>{ctx.beginPath();ctx.arc(...p,4,0,7);ctx.fill()})}drawChart();
function TD(){return (new Date().getDay()+6)%7}
function dk(){return ld(new Date())}
function ld(d){return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')}
function ico(t){t=t||'';return t.includes('Course')?'🏃':t.includes('Force')?'💪':t.includes('Plyo')?'🚀':t.includes('Mobil')?'🧘':'🏀'}
function setToday(){let t=S.week[TD()],k=Object.keys(W).find(k=>W[k].t===t),b=$('.hero .mainbtn');$('#today').textContent=t;if(k){let w=W[k];w.e=build(k);$('#todayMeta').textContent=w.m;$('#todayDesc').innerHTML=w.e.map(e=>e[0]).join(' · ')+'<br>🎒 '+INFO[k][0];$('#heroFig').innerHTML=fig(X[w.e[1][0]][0],80,XM[w.e[1][0]]);b.style.display='';b.onclick=()=>openWorkout(k)}else{$('#todayMeta').textContent='Club / match';$('#todayDesc').textContent='Pas de séance maison : garde de l’énergie.';$('#heroFig').innerHTML='';b.style.display='none'}}
function addWeight(){let v=+$('#wkg').value;if(!v)return;S.weights.push({date:dk(),kg:v});save();$('#wkg').value='';goals()}
function wk(d){d=typeof d==='string'?new Date(d+'T12:00:00'):new Date(d);d.setHours(12,0,0,0);d.setDate(d.getDate()-((d.getDay()+6)%7));return ld(d)}
function hdate(h){if(h.iso)return h.iso;let p=h.date.split('/');return p[2]+'-'+p[1]+'-'+p[0]}
function planned(){return S.week.filter(t=>Object.values(W).some(w=>w.t===t)).length}
function sessDates(){let s={};S.history.forEach(h=>s[hdate(h)]=1);S.done.forEach(d=>s[d.iso]=1);return Object.keys(s)}
function weekCounts(){let c={};sessDates().forEach(d=>{let w=wk(d);c[w]=(c[w]||0)+1});return c}
function stats(){let pl=planned()||1,c=weekCounts(),cur=wk(new Date()),n=c[cur]||0;$('#wkn').textContent=n+'/'+pl;$('#wkbar').style.width=Math.min(100,n/pl*100)+'%';let d=new Date(cur+'T12:00:00'),s=n>=pl?1:0;for(let i=0;i<60;i++){d.setDate(d.getDate()-7);if((c[wk(d)]||0)>=pl)s++;else break}$('#stk').textContent=s}
function drawW(){let c=$('#wchart'),w=c.clientWidth;if(!w)return;let ctx=c.getContext('2d'),h=120,d=devicePixelRatio||1;c.width=w*d;c.height=h*d;ctx.scale(d,d);ctx.clearRect(0,0,w,h);let a=S.weights.map(x=>x.kg);if(a.length<2){ctx.fillStyle='#a99da0';ctx.font='12px Arial';ctx.fillText('Ajoute au moins 2 pesées pour voir la courbe',8,60);return}let lo=Math.min(...a)-1,hi=Math.max(...a)+1,pts=a.map((v,i)=>[12+(w-24)*i/(a.length-1),h-15-(h-30)*(v-lo)/(hi-lo)]);ctx.strokeStyle='#ff6545';ctx.lineWidth=3;ctx.beginPath();pts.forEach((p,i)=>i?ctx.lineTo(...p):ctx.moveTo(...p));ctx.stroke();ctx.fillStyle='#ffc857';pts.forEach(p=>{ctx.beginPath();ctx.arc(p[0],p[1],3.5,0,7);ctx.fill()})}
function addJump(){let v=+$('#jcm').value,t=+$('#jt').value;if(t)S.jt=t;if(v)S.jumps.push({date:dk(),cm:v});save();$('#jcm').value='';goals()}
function goals(){let h=S.history.slice(-5);if(h.length){let a=Math.round(h.reduce((s,x)=>s+x.x,0)/h.length*20);$('#xpct').textContent=a+'%';$('#xbar').style.width=a+'%'}let w=S.weights;if(w.length){let s=w[0].kg,c=w[w.length-1].kg,p=s>=60?100:Math.max(0,Math.min(100,Math.round((c-s)/(60-s)*100)));$('#mpct').textContent=p+'%';$('#mbar').style.width=p+'%';$('#wlast').textContent=c+' kg · départ '+s+' kg'}let j=S.jumps;$('#jt').value=S.jt||'';if(j.length){let f=j[0].cm,l=j[j.length-1].cm,days=Math.round((new Date(dk()+'T12:00:00')-new Date(j[j.length-1].date+'T12:00:00'))/864e5);$('#jlast').textContent=l+' cm · départ '+f+' cm'+(days>=21?' · retest conseillé':'');if(S.jt){let p=S.jt<=f?100:Math.max(0,Math.min(100,Math.round((l-f)/(S.jt-f)*100)));$('#dpct').textContent=p+'%';$('#dbar').style.width=p+'%'}}if(!(j.length&&S.jt)){$('#dpct').textContent='—';$('#dbar').style.width='0%'}stats();drawW();let r=S.history.slice(-3);sugg();renderLifts();renderBadges()}
function exportData(){let a=document.createElement('a');a.href=URL.createObjectURL(new Blob([JSON.stringify(S)],{type:'application/json'}));a.download='swish-'+dk()+'.json';a.click()}
$('#imp').onchange=e=>{let f=e.target.files[0];if(!f)return;f.text().then(t=>{JSON.parse(t);localStorage.setItem('sp11',t);location.reload()}).catch(()=>alert('Fichier invalide'))};
setToday();foodTab('meals',$('.tabs button'));goals();
if('serviceWorker' in navigator)navigator.serviceWorker.register('sw.js');

var si=1,ph='work';
function nSets(e){let m=/^(\d+)\s*×/.exec(e[1]);return m?+m[1]:1}
function restOf(){let b=['plyo','force','basket'].includes(type)?60:30;return Math.max(30,b-5*Math.floor(WK()/2))}
function label(){let e=W[type].e[ei],s=SIDE[e[0]],w=ph==='work';$('#phase').textContent=w?'Série '+si+'/'+nSets(e)+(s?' · '+s[remain<=Math.floor(e[4]/2)?1:0]+' ↔':''):'Repos · prochaine série '+(si+1)+'/'+nSets(e)}
function phaseEnd(){pauseTimer();navigator.vibrate&&navigator.vibrate([200,100,200]);let e=W[type].e[ei];if(ph==='work'&&si<nSets(e)){ph='rest';remain=restOf();label();clock();beep(520,.3);startTimer()}else if(ph==='rest'){si++;ph='work';remain=e[4];label();clock();beep(1200,.6);startTimer()}else if(ei<W[type].e.length-1){nextExercise();beep(1200,.6);startTimer()}else{beep(1000,.2);setTimeout(()=>beep(1300,.4),250);finishSession()}}
function addSet(){let k=+$('#lkg').value||0,r=+$('#lrp').value;if(!r)return;let n=W[type].e[ei][0];(S.logs[n]=S.logs[n]||[]).push({d:dk(),kg:k,r});save();$('#lrp').value='';renderLog();renderLifts()}
function renderLog(){let n=W[type].e[ei][0],a=S.logs[n]||[],l=a[a.length-1];$('#llast').textContent=l?'Dernière série : '+l.kg+' kg × '+l.r+' ('+l.d+')':'Aucune série notée pour cet exercice';$('#lkg').value=l?l.kg:''}
function renderLifts(){let ks=Object.keys(S.logs),sc=x=>(x.kg||1)*x.r;$('#lifts').innerHTML=ks.length?ks.map(n=>{let a=S.logs[n],f=a[0],b=a.reduce((m,x)=>sc(x)>sc(m)?x:m,a[0]),p=Math.round((sc(b)/sc(f)-1)*100);return `<div class="ingredient" style="margin:6px 0"><span>${esc(n)}</span><b>record ${b.kg} kg × ${b.r}${p>0?' · +'+p+'%':''}</b></div>`}).join(''):'<small>Note tes séries pendant les séances pour suivre ta progression.</small>'}
function F(){return S.kt?S.kt/PLAN:1}
function scq(s){let f=F();return f==1?s:s.replace(/\d+/,n=>Math.round(n*f/5)*5||n)}
function ktForm(){return `<div class="form" style="grid-template-columns:2fr 1fr"><input id="kt" type="number" placeholder="Objectif kcal / jour (plan : ${PLAN})" value="${S.kt||''}"><button class="mainbtn" onclick="setKt()">Ajuster</button></div><small>Les quantités du plan sont recalculées proportionnellement.</small><p>💪 Protéines : <b>${eatenProt()}</b> / ${ptarget()} g (≈1,6 g/kg, estimation)</p>`}
function setKt(){let v=+$('#kt').value;if(v&&(v<1500||v>5000))return alert('Choisis un objectif entre 1500 et 5000 kcal');S.kt=v||0;save();rf()}
function dd(e){return Math.round((new Date(e+'T12:00:00')-new Date(dk()+'T12:00:00'))/864e5)}
function expiring(){return S.pantry.filter(p=>p.e&&p.q!==0).map(p=>({n:p.n,d:dd(p.e)})).filter(o=>o.d>=0&&o.d<=4).sort((a,b)=>a.d-b.d)}
function expBanner(){return lowBanner()+expBanner0()}function expBanner0(){let ex=expiring(),old=S.pantry.filter(p=>p.e&&p.q!==0&&dd(p.e)<0);return (ex.length?`<div class="meal" style="border-color:#ff9b30"><b>⏰ À consommer vite</b><p>${ex.map(e=>e.n+' ('+(e.d?'dans '+e.d+' j':'aujourd’hui')+')').join(', ')}. Pourquoi cette alerte : la date de péremption que tu as saisie approche, donc les recettes qui utilisent ces aliments passent en premier pour éviter le gaspillage.</p></div>`:'')+(old.length?`<div class="meal" style="border-color:#d44"><b>⚠️ Date dépassée</b><p>${old.map(o=>o.n).join(', ')} : vérifie l’aspect et l’odeur, et jette en cas de doute.</p></div>`:'')}
function expNote(r){let h=r[4].map(x=>expiring().find(e=>mt(e.n,x[0]))).filter(Boolean);return h.length?`<p style="color:#ff9b78">⏰ Recommandée : utilise ${h.map(e=>e.n).join(', ')} qui périme bientôt.</p>`:''}
function fav(i){let n=RC[i][0];S.fav[n]?delete S.fav[n]:S.fav[n]=1;save();recList()}
function recList(){let q=rq.toLowerCase(),ex=expiring(),L=RC.map((r,i)=>{let hit=r[4].map(x=>ex.find(e=>mt(e.n,x[0]))).filter(Boolean);return {r,i,hit,sc:hit.reduce((s,e)=>s+5-e.d,0),n:r[4].filter(x=>have(x[0])).length/(r[4].length||1)}}).filter(o=>(!q||(o.r[0]+o.r[4].map(x=>x[0]).join()).toLowerCase().includes(q))&&(!rstock||o.n==1)&&(!rfav||S.fav[o.r[0]])).sort((a,b)=>b.sc-a.sc||(S.fav[b.r[0]]?1:0)-(S.fav[a.r[0]]?1:0)||b.n-a.n);$('#rlist').innerHTML=L.map(o=>`<div class="recipe rbtn" onclick="openRecipe(${o.i})"><div style="display:flex;justify-content:space-between"><h4>${o.r[5]?'🔗 ':S.myrec.includes(o.r)?'🧑‍🍳 ':''}${o.r[0]}</h4><a onclick="event.stopPropagation();fav(${o.i})">${S.fav[o.r[0]]?'★':'☆'}</a></div>${o.hit.length?`<small style="color:#ff9b78">⏰ Utilise ${o.hit.map(e=>e.n+' ('+(e.d?e.d+' j':'aujourd’hui')+')').join(', ')}</small><br>`:''}${sb(o.r[4])} <small>${o.r[1]} · ≈${o.r[2]} kcal · ${Math.round(recProt(o.r))} g prot</small></div>`).join('')||'<p>Aucune recette trouvée.</p>'}
function suggest(){let _l=LD();if(_l.L<=-2&&/Plyo|Force/.test(S.week[TD()]))return 'Séance allégée automatiquement ('+_l.why.join(', ')+') : écoute ton corps ou remplace par la Mobilité.';let t=S.week[TD()],n=S.week[(TD()+1)%7],r=S.history.slice(-3);if(/Match|club/i.test(t))return 'Match ou club aujourd’hui : garde tes jambes fraîches, pas de séance maison.';if(r.length==3&&r.every(x=>x.f>=4))return 'Fatigue élevée (4/5 ou plus sur tes 3 dernières séances) : remplace par Mobilité active ou réduis les séries de moitié.';if(/Match/i.test(n)&&/Plyo|Force|Course/.test(t))return 'Match demain : allège cette séance (moitié des séries) pour arriver frais.';if(S.sore.some(x=>x.d==dk()&&['qu','mo','is','fe'].includes(x.k))&&/Plyo|Force/.test(t))return 'Crampes ou courbatures aux jambes notées aujourd’hui : fais Mobilité active ou allège les sauts.';return ''}
function sugg(){let s=suggest();$('#reco').style.display=s?'':'none';$('#recot').textContent=s}
renderLifts();sugg();

var AC,pd=7,bv='face',bz='',bt='crampe';
const SIDE={'Fentes arrière':['jambe gauche','jambe droite'],'Cossack squat':['jambe gauche','jambe droite'],'Lateral bounds':['saut vers la gauche','saut vers la droite'],'Cheville genou-au-mur':['cheville gauche','cheville droite'],'Départ 1 appui':['appui gauche','appui droit'],'Finition main faible':['main gauche','main droite'],'Dead bug':['bras droit + jambe gauche','bras gauche + jambe droite'],'90/90 hanches':['côté gauche','côté droit'],'Étirement fléchisseurs de hanche':['jambe gauche','jambe droite'],'Pigeon':['jambe gauche devant','jambe droite devant'],'Fente profonde + rotation':['jambe gauche devant','jambe droite devant'],'Cercles de chevilles':['cheville gauche','cheville droite'],'Squat bulgare':['jambe gauche','jambe droite'],'Pont fessier 1 jambe':['jambe gauche','jambe droite'],'Step-up sur chaise':['jambe gauche','jambe droite'],'Eurostep':['pas à gauche','pas à droite']};
function actx(){try{AC=AC||new (window.AudioContext||window.webkitAudioContext)();AC.resume()}catch(e){}}
function beep(f,d){try{let o=AC.createOscillator(),g=AC.createGain();o.frequency.value=f;g.gain.value=.25;o.connect(g);g.connect(AC.destination);o.start();o.stop(AC.currentTime+d)}catch(e){}}
function tickFx(){let e=W[type].e[ei];if(ph==='rest'&&remain>0&&remain<=5)beep(remain==1?1100:880,.12);if(ph==='work'&&SIDE[e[0]]&&remain==Math.floor(e[4]/2)){beep(660,.4);navigator.vibrate&&navigator.vibrate(300);label()}}
function mediaHTML(u){return /\.(mp4|webm)(\?|$)/i.test(u)?`<video src="${esc(u)}" autoplay loop muted playsinline height="190"></video>`:`<img src="${esc(u)}" height="190" style="max-width:100%">`}
function setMedia(){let n=W[type].e[ei][0],u=prompt('Lien d’un GIF, d’une image ou d’une vidéo (.mp4/.webm) pour « '+n+' ». Vide = schéma par défaut',S.media[n]||'');if(u===null)return;u.trim()?S.media[n]=u.trim():delete S.media[n];save();showEx()}
function finishSession(){let pl=planned()||1,b=weekCounts()[wk(new Date())]||0;S.done.push({iso:dk(),t:W[type].t});save();let a=weekCounts()[wk(new Date())]||0;stats();let bar=$('#donebar');bar.style.width=Math.min(100,b/pl*100)+'%';$('#donet').textContent=W[type].t+' terminée ! Séance '+a+'/'+pl+' cette semaine.';$('#donep').textContent=Math.round(Math.min(100,a/pl*100))+'% de ta semaine · série : '+$('#stk').textContent+' sem.';$('#confetti').innerHTML=Array.from({length:36},(_,i)=>`<span class="cf" style="left:${Math.random()*100}%;animation-delay:${Math.random()*.8}s">${['🎉','🏀','⭐','🔥','💪'][i%5]}</span>`).join('');$('#done').classList.add('open');setTimeout(()=>bar.style.width=Math.min(100,a/pl*100)+'%',300)}
function parseIng(t){return t.split('\n').map(l=>l.trim()).filter(Boolean).map(l=>{let m=/^(.+?)\s+(\d+(?:[.,]\d+)?)\s*(kg|g|ml|l|cl|unités?|u)?$/i.exec(l);if(!m)return [l,0,'g'];let q=parseFloat(m[2].replace(',','.')),u=(m[3]||'unité').toLowerCase();if(u=='kg'){q*=1000;u='g'}if(u=='l'){q*=1000;u='ml'}if(u=='cl'){q*=10;u='ml'}if(/^u/.test(u))u='unité';return [m[1],q,u]})}
function parseDuration(v){let s=String(v||''),m=s.match(/(\d+)\s*h(?:\s*(\d+)\s*m)?/i),n=s.match(/(\d+)\s*(?:min|minutes?)/i);return m?(+m[1]*60+(+m[2]||0))+' min':n?n[1]+' min':'—'}
function numNutrition(v){let m=String(v||'').replace(',','.').match(/[\d.]+/);return m?+m[0]:0}
function parseRecipePage(text,baseUrl){let doc=new DOMParser().parseFromString(text,'text/html'),objs=[];[...doc.querySelectorAll('script[type="application/ld+json"]')].forEach(s=>{try{let j=JSON.parse(s.textContent);(Array.isArray(j)?j:[j]).forEach(x=>{if(x&&x['@graph'])objs.push(...x['@graph']);else if(x)objs.push(x)})}catch(e){}});let r=objs.find(x=>x['@type']==='Recipe'||(Array.isArray(x['@type'])&&x['@type'].includes('Recipe')));if(!r)return null;let ing=(r.recipeIngredient||[]).map(x=>String(x).trim()).map(x=>{let m=x.match(/^(.*?)(?:\s+)(\d+(?:[.,]\d+)?)\s*(kg|g|ml|l|cl|unités?|u)?$/i);if(!m)return [x,0,'g'];let q=numNutrition(m[2]),u=(m[3]||'unité').toLowerCase();if(u==='kg'){q*=1000;u='g'}if(u==='l'){q*=1000;u='ml'}if(u==='cl'){q*=10;u='ml'}if(/^u/.test(u))u='unité';return [m[1],q,u]});let nut=r.nutrition||{};return {name:r.name||'Recette importée',time:parseDuration(r.totalTime||r.cookTime||r.prepTime),kcal:numNutrition(nut.calories),protein:numNutrition(nut.proteinContent),ingredients:ing,steps:Array.isArray(r.recipeInstructions)?r.recipeInstructions.map(x=>typeof x==='string'?x:(x.text||'')).filter(Boolean):[],url:baseUrl||r.url||''}}
async function fetchRecipeLink(url){try{new URL(url);for(let target of [url,'https://r.jina.ai/'+url]){try{let res=await fetch(target,{mode:'cors'});if(res.ok){let r=parseRecipePage(await res.text(),url);if(r)return r}}catch(e){}}}catch(e){}return null}
async function importRecipeLink(){let url=$('#rlk').value.trim();if(!url)return alert('Colle un lien de recette');let btn=$('#addrec .mainbtn');btn.disabled=true;btn.textContent='Analyse…';let r=await fetchRecipeLink(url);btn.disabled=false;btn.textContent='Enregistrer';if(!r){alert('La page ne fournit pas de données recette lisibles automatiquement. Tu peux compléter les champs manuellement.');return}$('#rnm').value=r.name;$('#rtm').value=r.time;$('#rkc').value=r.kcal||'';$('#rpk').value=r.protein||'';$('#rin').value=r.ingredients.map(x=>x[0]+(x[1]?(' '+x[1]+' '+x[2]):'')).join('\n');$('#rst').value=r.steps.join('\n');alert('Recette analysée. Vérifie les quantités avant de l’enregistrer.')}
function saveRecipe(){let n=$('#rnm').value.trim();if(!n)return alert('Donne un nom à la recette');let r=[n,$('#rtm').value||'—',+$('#rkc').value||0,$('#rst').value.split('\n').map(s=>s.trim()).filter(Boolean),parseIng($('#rin').value),$('#rlk').value.trim(),+$('#rpk').value||0];S.myrec.push(r);RC.push(r);save();$('#addrec').classList.remove('open');['rnm','rtm','rkc','rst','rin','rlk'].forEach(i=>$('#'+i).value='');rf()}
function delRec(i){let r=RC[i];S.myrec=S.myrec.filter(x=>x!==r);RC.splice(i,1);save();$('#recipe').classList.remove('open');rf()}
function ring(p,a,b,c){p=Math.max(0,Math.min(1,p||0));let r=36,L=2*Math.PI*r;return `<svg width="96" height="96" viewBox="0 0 96 96"><circle cx="48" cy="48" r="${r}" fill="none" stroke="#2b2326" stroke-width="9"/><circle cx="48" cy="48" r="${r}" fill="none" stroke="${c}" stroke-width="9" stroke-linecap="round" stroke-dasharray="${L*p} ${L}" transform="rotate(-90 48 48)"/><text x="48" y="48" text-anchor="middle" fill="#fff" font-size="14" font-weight="800">${a}</text><text x="48" y="62" text-anchor="middle" fill="#a99da0" font-size="9">${b}</text></svg>`}
function fmtH(h){return Math.floor(h)+' h '+String(Math.round((h%1)*60)).padStart(2,'0')}
function wsum(){return (S.water[dk()]||[]).reduce((a,b)=>a+b,0)}
function wtarget(){return S.wt||2500}
function addWater(ml){if(!ml)return;(S.water[dk()]=S.water[dk()]||[]).push(ml);save();rf()}
function undoWater(){(S.water[dk()]||[]).pop();save();rf()}
function setWt(){let v=parseFloat(String(prompt('Objectif d’eau par jour (en litres)',wtarget()/1000)).replace(',','.'));if(v>=1&&v<=6){S.wt=Math.round(v*1000);save();rf()}}
function hydroHTML(){let w=wsum(),t=wtarget();return `<div class="meal" style="display:flex;gap:12px;align-items:center">${ring(w/t,(w/1000).toFixed(2)+' L','/ '+(t/1000).toFixed(1)+' L','#4aa8ff')}<div style="flex:1"><b>💧 Hydratation</b><div class="twobtn" style="margin-top:6px"><button onclick="addWater(250)">+250 ml</button><button onclick="addWater(500)">+500 ml</button></div><small><a onclick="undoWater()">annuler</a> · <a onclick="setWt()">objectif</a></small></div></div>`}
function alerts(){let el=$('#alerts');if(!el)return;homebar();lowSync();let lo=lowItems(),h=new Date().getHours(),a=lo.length?['🛒 Stock bas : '+lo.map(x=>x.n+' ('+x.q+' '+x.u+')').join(', ')+' → ajouté à ta liste de courses.']:[],T=[10,14,18,22],d=S.eat[dk()]||[],miss=meals.map((m,i)=>i).filter(i=>h>=T[i]&&!d.includes(i));if(miss.length)a.push('🍽 Pas encore marqué : '+miss.map(i=>meals[i][0]).join(', ')+'. Mange-le, ou ajoute un repas pour atteindre tes '+(S.kt||PLAN)+' kcal.');let rem=(S.kt||PLAN)-eatenKcal();if(h>=18&&rem>300){let s=RC.filter(r=>r[2]&&r[2]<=rem+100).sort((x,y)=>y[2]-x[2]).slice(0,2);a.push('Il te reste ≈'+rem+' kcal à manger. Idées : '+s.map(r=>`<a onclick="openRecipe(${RC.indexOf(r)})">${r[0]}</a>`).join(' · '))}let w=wsum(),ex=wtarget()*Math.max(0,Math.min(1,(h-7)/15));if(h>=11&&w<ex*.6)a.push('💧 Tu as bu '+(w/1000).toFixed(1)+' L, il en faudrait ≈'+(ex/1000).toFixed(1)+' L à cette heure. Bois un grand verre !');bedAlert(a);restAlert(a);snap();let sl=S.sleep[dk()];if(sl&&sl.h<7)a.push('😴 Nuit courte ('+fmtH(sl.h)+') : séance plus légère aujourd’hui et couche-toi plus tôt ce soir.');a.forEach(notifyOnce);el.innerHTML=a.map(x=>`<div class="meal" style="border-color:#ff9b30;margin-bottom:8px"><small style="color:#ffd9c9;font-size:12px">${x}</small></div>`).join('')}
function bedtime(w,t){let p=w.split(':').map(Number),x=((p[0]*60+p[1]-t*60)%1440+1440)%1440;return String(Math.floor(x/60)).padStart(2,'0')+':'+String(x%60).padStart(2,'0')}
function saveSleep(a,b){let bt=$('#'+a).value,wt=$('#'+b).value;if(!bt||!wt)return;let p=bt.split(':').map(Number),q=wt.split(':').map(Number),d=(q[0]*60+q[1])-(p[0]*60+p[1]);if(d<=0)d+=1440;S.sleep[dk()]={b:bt,w:wt,h:d/60};save();if($('#sleepm'))$('#sleepm').classList.remove('open');sleepUI()}
function saveNap(){let bt=$('#napb').value,wt=$('#napw').value;if(!bt||!wt)return;let p=bt.split(':').map(Number),q=wt.split(':').map(Number),d=(q[0]*60+q[1])-(p[0]*60+p[1]);if(d<=0)d+=1440;S.naps[dk()]=S.naps[dk()]||[];S.naps[dk()].push({b:bt,w:wt,h:d/60});save();sleepUI()}
function napHours(d){return (S.naps[d]||[]).reduce((a,n)=>a+n.h,0)}
function totalSleep(d){return (S.sleep[d]?.h||0)+napHours(d)}
function sleepUI(){let s=S.sleep[dk()],t=8,ks=Array.from(new Set(Object.keys(S.sleep).concat(Object.keys(S.naps)))).sort().slice(-7),debt=ks.reduce((a,k)=>a+(t-totalSleep(k)),0);let th=totalSleep(dk());
$('#slring').innerHTML=ring(th/t,th?fmtH(th):'—','/ '+t+' h','#9b8cff');
$('#slh').textContent=th?(th>=t+1.5?'Beaucoup dormi':th>=t-.5?'Bien dormi ✅':th>=t-1.5?'Un peu court : dors plus':'Nuit trop courte ⚠️ : dors plus'):'Pas encore noté';
$('#slt').textContent=s?'Nuit '+fmtH(s.h)+' · sieste '+fmtH(napHours(dk()))+' · total '+fmtH(th)+'. '+(debt>1?'Dette récente : '+fmtH(debt)+'.':'Heure de coucher idéale : '+bedtime(s.w,t)+'.'):'Ajoute ta nuit et, si besoin, une sieste.';
$('#slhist').innerHTML=ks.map(k=>{let h=totalSleep(k);return `<div style="display:inline-block;width:13%;text-align:center"><div style="height:60px;display:flex;align-items:flex-end"><div style="width:70%;margin:auto;height:${Math.min(100,h/10*100)}%;background:${h>=t-.5?'#9b8cff':'#ff9b78'};border-radius:5px"></div></div><small>${k.slice(8)}<br>${fmtH(h)}</small></div>`}).join('');
if($('#naphist'))$('#naphist').innerHTML=(S.naps[dk()]||[]).map((n,i)=>`<div class="ingredient"><span>😴 ${n.b} → ${n.w}</span><b>${fmtH(n.h)} <a onclick="S.naps[dk()].splice(${i},1);save();sleepUI()">✕</a></b></div>`).join('')||'<small>Aucune sieste ajoutée aujourd’hui.</small>'}
const ZV={face:[['ep','<circle cx="30" cy="52" r="10"/><circle cx="90" cy="52" r="10"/>'],['br','<rect x="12" y="62" width="14" height="52" rx="7"/><rect x="94" y="62" width="14" height="52" rx="7"/>'],['to','<rect x="38" y="48" width="44" height="64" rx="14"/>'],['qu','<rect x="38" y="118" width="20" height="62" rx="10"/><rect x="62" y="118" width="20" height="62" rx="10"/>'],['mo','<rect x="38" y="184" width="18" height="46" rx="9"/><rect x="64" y="184" width="18" height="46" rx="9"/>']],dos:[['ep','<circle cx="30" cy="52" r="10"/><circle cx="90" cy="52" r="10"/>'],['da','<rect x="40" y="48" width="40" height="62" rx="14"/>'],['fe','<ellipse cx="60" cy="122" rx="24" ry="14"/>'],['is','<rect x="38" y="138" width="20" height="44" rx="10"/><rect x="62" y="138" width="20" height="44" rx="10"/>'],['mo','<rect x="38" y="184" width="18" height="46" rx="9"/><rect x="64" y="184" width="18" height="46" rx="9"/>']]};
const ADV={ep:['Épaules','Étire le bras en travers de la poitrine 30 s et respire lentement.','Cercles d’épaules lents, mobilité légère, douche chaude.','Cercles d’épaules ×15 puis étirement pectoraux au mur 30 s.'],br:['Bras','Ouvre et ferme la main, étire le bras tendu paume vers l’avant 30 s.','Étirement biceps / triceps 30 s et mouvements légers.','Étirement du bras tendu contre un mur, 30 s par côté.'],to:['Torse / abdos','Respire profondément, étire en cambrant doucement (cobra) 20 s.','Marche, respiration abdominale, cobra 30 s.','Chat-vache ×10 lentement.'],qu:['Quadriceps','Étire debout (talon vers la fesse) 30 s puis marche doucement.','Vélo ou marche 10-15 min, étirement 30 s, massage doux.','Squat sans charge ×15 puis fente basse tenue 30 s.'],mo:['Mollets','Tire les orteils vers toi, étire le mollet contre un mur 30 s, masse doucement.','Étirement mollet au mur 30 s ×2, marche, auto-massage.','Cheville genou-au-mur ×10 par côté.'],da:['Dos','Position de l’enfant 30-60 s, respiration lente.','Chat-vache ×10, rotation douce du buste, bouge régulièrement si tu restes assis.','Position de l’enfant puis cobra, 30 s chacun.'],fe:['Fessiers','Étire en figure 4 ou pigeon 30 s.','Pont fessier léger ×12 et figure 4 de 30 s par côté.','Pont fessier ×12 sans charge.'],is:['Ischio-jambiers','Étire la jambe tendue sur une chaise 30 s, sans forcer.','Étirement 30 s par côté + marche, mobilité des hanches.','Étirement ischios jambe tendue ×2 de 30 s par côté.']};
function mann(v,hl,h,click){let z=BZ[v],mir='<g transform="translate(120 0) scale(-1 1)">';return `<svg viewBox="0 0 120 250" height="${h}"><g fill="#4a4044"><circle cx="60" cy="20" r="12"/><rect x="54" y="28" width="12" height="12"/><rect x="36" y="38" width="48" height="84" rx="16"/><rect x="88" y="46" width="18" height="76" rx="9"/><rect x="14" y="46" width="18" height="76" rx="9"/><rect x="62" y="118" width="26" height="124" rx="12"/><rect x="32" y="118" width="26" height="124" rx="12"/></g>${Object.keys(z).map(k=>`<g class="${hl.includes(k)?'hz':'mz'}" ${click?`onclick="pickZone('${k}','${v}')"`:''}>${z[k]}${mir}${z[k]}</g></g>`).join('')}</svg>`}
function mannPair(n){let hl=[...(XM[n]||'')].flatMap(l=>MZ[l]||[]);return mann('face',hl,130)+mann('dos',hl,130)}
function pickZone(k,v){bz=k;bv=v;renderBody()}
function renderBody(){$('#bodymap').innerHTML=`<div class="twobtn"><button class="${bv=='face'?'mainbtn':''}" onclick="bv='face';renderBody()">Face</button><button class="${bv=='dos'?'mainbtn':''}" onclick="bv='dos';renderBody()">Dos</button></div><div style="text-align:center;margin:8px 0">${mann(bv,[bz],300,true)}</div><p style="text-align:center"><b>${bz?NM[bz]:'Touche une zone du corps'}</b></p>`+(bz?`<div class="twobtn"><button class="${bt=='crampe'?'mainbtn':''}" onclick="bt='crampe';renderBody()">Crampe</button><button class="${bt=='courbature'?'mainbtn':''}" onclick="bt='courbature';renderBody()">Courbature</button></div><button class="next" onclick="logSore()">Enregistrer cette douleur</button>`+advHTML():'')}
function advHTML(){let a=ADV[AL[bz]||bz];if(!a)return '';return `<div class="meal"><h4>${NM[bz]||a[0]} · ${bt}</h4><p>${bt=='crampe'?a[1]:a[2]}</p><p><b>Exercice :</b> ${a[3]}</p><p>${bt=='crampe'?'💧 Bois de l’eau (avec un peu de sel ou une boisson minérale) et applique de la chaleur 5-10 min.':'🚿 Douche chaude, marche légère, sommeil et protéines suffisantes. Un bain froid (10–15 °C, 10 min) est possible après une séance très intense, mais évite-le après la force car il peut freiner les progrès.'}</p><small>Si la douleur est vive, avec gonflement, dure plus de 3 jours ou si les crampes sont fréquentes : demande un avis médical.</small></div>`}
function logSore(){if(!bz)return;S.sore.push({d:dk(),k:bz,t:bt});save();sugg();alert('Douleur enregistrée')}
function renderGear(){let g=S.gear,row=(x,i)=>`<div class="ingredient" style="margin:6px 0"><span>${esc(x.n)}</span><b><a onclick="S.gear[${i}].have=!S.gear[${i}].have;save();renderGear()">${x.have?'✅ J’ai':'🛒 À acheter'}</a><a onclick="S.gear.splice(${i},1);save();renderGear()">✕</a></b></div>`;$('#gear').innerHTML='<small>Équipements que j’ai</small>'+(g.map((x,i)=>x.have?row(x,i):'').join('')||'<p>Aucun pour l’instant</p>')+'<small>À acheter</small>'+(g.map((x,i)=>x.have?'':row(x,i)).join('')||'<p>Rien à acheter</p>')}
function addGear(){let n=$('#gn').value.trim();if(!n)return;S.gear.push({n,have:false});$('#gn').value='';save();renderGear()}
const PRICE_HINTS={Riz:3.2,Pâtes:1.5,Poulet:13.5,Œufs:6.5,Thon:4,Courgettes:2.5,Carottes:2,Tomates:3,Haricots:3,Lentilles:2,Maïs:2,Steak:12,'Huile d’olive':7,Lait:1.2,'Flocons d’avoine':2.5,Bananes:2,Framboises:4,'Fromage blanc':3,Crème:2.5,Brocoli:2.5};
function estimateCost(o){let p=S.prices[o.n]||Object.entries(PRICE_HINTS).find(([k])=>mt(k,o.n))?.[1]||2;let standard=o.u==='unité'?6:1000;return Math.max(0,Math.ceil((o.need||0)/standard)*p)}
function needs(days){let f=F(),m={};meals.forEach(ml=>ml[3].forEach(x=>{let r=/([\d.,]+)\s*(kg|g|ml|l|cl)?/i.exec(x[1]);if(!r)return;let q=parseFloat(r[1].replace(',','.'))*f*days,u=(r[2]||'unité').toLowerCase();if(u=='kg'){q*=1000;u='g'}if(u=='l'){q*=1000;u='ml'}if(u=='cl'){q*=10;u='ml'}let k=Object.keys(m).find(a=>mt(a,x[0]))||x[0];m[k]=m[k]||{q:0,u};m[k].q+=q}));return Object.keys(m).map(n=>{let o=m[n],p=S.pantry.find(s=>mt(s.n,n)),have=p&&+p.q>0&&p.u==o.u?+p.q:0,need=Math.max(0,Math.round(o.q-have));return {n,q:Math.round(o.q),u:o.u,need,cost:estimateCost({n,u:o.u,need})}})}
function toggleNeed(n){S.shopSel[n]=!S.shopSel[n];renderPrev()}
function addNeeds(selectedOnly=false){let list=needs(pd).filter(o=>o.need&&(selectedOnly?S.shopSel[o.n]!==false:true));let n=0;list.filter(o=>!S.shop.some(y=>mt(y.n,o.n)&&!y.d)).forEach(o=>{S.shop.push({n:o.n,q:o.need,u:o.u,p:o.cost||S.prices[o.n]||0,d:0});n++});save();renderShop();renderPrev();alert(n+' produit(s) ajouté(s) à la liste')}
function renderPrev(){let ns=needs(pd),sel=ns.filter(o=>o.need&&(S.shopSel[o.n]!==false)),budget=sel.reduce((a,o)=>a+o.cost,0);$('#prev').innerHTML=`<div class="add"><div class="head" style="margin-top:0"><h3>📋 Prévisionnel repas</h3><small>pour ${pd} jours</small></div><div class="twobtn"><button class="${pd==3?'mainbtn':''}" onclick="pd=3;renderPrev()">3 jours</button><button class="${pd==7?'mainbtn':''}" onclick="pd=7;renderPrev()">7 jours</button></div><div class="meal"><b>💶 Budget estimé : ${budget.toFixed(2)} €</b><p>Estimation indicative. Les prix réels peuvent être modifiés dans « Courses ».</p></div>${ns.map(o=>`<div class="ingredient" style="margin:6px 0"><span>${o.need?`<input type="checkbox" ${S.shopSel[o.n]!==false?'checked':''} onchange="toggleNeed(${JSON.stringify(o.n)})"> 🛒`:'✓'} ${o.n}</span><b>${o.need?o.need+' '+o.u+' · ≈'+o.cost.toFixed(2)+' €':'en stock'}<small> · besoin ${o.q} ${o.u}</small></b></div>`).join('')}<div class="twobtn"><button class="mainbtn" onclick="addNeeds(true)">Acheter la sélection</button><button onclick="addNeeds(false)">Toute la liste</button></div></div>`}
if(!S.sleep[dk()]&&new Date().getHours()>=4&&new Date().getHours()<14)setTimeout(()=>$('#sleepm').classList.add('open'),700);

function lowMin(x){return x.m!=null&&x.m!==''?+x.m:x.u=='unité'?2:x.u=='ml'?200:150}
function lowItems(){return S.pantry.filter(x=>x.q!==''&&x.q!=null&&+x.q<=lowMin(x))}
function lowSync(){let n=0,bq={g:500,ml:1000,'unité':6};lowItems().forEach(x=>{if(S.snz[x.n]==dk()||S.shop.some(y=>mt(y.n,x.n)&&!y.d))return;S.shop.push({n:x.n,q:bq[x.u]||500,u:x.u,p:S.prices[x.n]||0,d:0,rt:x.q+' '+x.u});n++});if(n){localStorage.setItem('sp11',JSON.stringify(S));if($('#shopList'))renderShop()}return n}
function lowBanner(){let l=lowItems();return l.length?`<div class="meal" style="border-color:#ff9b30"><b>🛒 Stock bas</b><p>${l.map(x=>x.n+' (reste '+x.q+' '+x.u+')').join(', ')}. Ajouté automatiquement à ta liste de courses, avec la quantité qu’il te reste.</p></div>`:''}
function delShop(i){let x=S.shop[i];if(x.rt)S.snz[x.n]=dk();S.shop.splice(i,1);save();renderShop()}
var rt='frac',cr={on:false,t0:0,acc:0,laps:[],res:''},ctimer;
function fmt(s){s=Math.round(s);let h=Math.floor(s/3600),m=Math.floor(s%3600/60),x=s%60;return (h?h+':'+String(m).padStart(2,'0'):m)+':'+String(x).padStart(2,'0')}
function pt(t){let p=String(t).split(':').map(Number);if(!p.length||p.some(isNaN))return 0;return p.length==3?p[0]*3600+p[1]*60+p[2]:p.length==2?p[0]*60+p[1]:p[0]}
function elapsed(){return cr.acc+(cr.on?(Date.now()-cr.t0)/1000:0)}
function crTick(){let e=$('#crt');if(e)e.textContent=fmt(elapsed())}
function crStart(){if(cr.on)return;actx();cr.on=true;cr.t0=Date.now();ctimer=setInterval(crTick,200)}
function crStop(){if(!cr.on)return;cr.acc=elapsed();cr.on=false;clearInterval(ctimer);crTick()}
function crToggle(){cr.on?crStop():crStart();runTab(rt)}
function crReset(){crStop();cr={on:false,t0:0,acc:0,laps:[],res:''};runTab(rt)}
function crBtns(){return `<div class="twobtn"><button class="mainbtn" onclick="crToggle()">${cr.on?'Pause':cr.acc?'Reprendre':'Démarrer'}</button><button onclick="crLap()">${rt=='frac'?'Segment terminé':'Km passé'}</button></div><button class="next" onclick="crReset()">Réinitialiser</button><div class="twobtn"><button onclick="gpsToggle()">${gps!==null?'📍 GPS actif':'📍 Activer le GPS'}</button><button onclick="$('#gpxf').click()">📥 Import GPX/TCX (Garmin)</button></div><div id="crd">${gps!==null?(gd/1000).toFixed(2)+' km':''}</div>`}
function fracPlan(){let w=WK(),n=Math.min(8,3+Math.floor(w/2)),r=Math.max(300,500-50*Math.floor(w/3)),a=[];for(let i=1;i<=n;i++){a.push(['Sprint '+i,500]);if(i<n)a.push(['Trot '+i,r])}return a}
function tgtOf(km){let p=S.rp[km];if(!p)return 0;let w=Math.floor((new Date(dk()+'T12:00:00')-new Date(p.start+'T12:00:00'))/6048e5),f=Math.min(1,(w+1)/p.weeks);return p.t0-(p.t0-p.goal)*f}
function openRun(){runTab(rt);$('#runm').classList.add('open')}
function runTab(t){rt=t;$('#runbody').innerHTML=runHTML()}
function runHTML(){let top=cr.res?`<div class="meal">${cr.res}</div>`:'';if(rt=='frac'){let p=fracPlan(),k=cr.laps.length,c=p[k],n=p.filter(x=>x[0][0]=='S').length;return top+`<p>Semaine ${WK()+1} : <b>${n} × ${p[0][1]} m</b> rapide, trot de ${p[1][1]} m entre chaque. Cible d’un sprint : <input class="qin" id="sp" placeholder="2:10" value="${S.sp?fmt(S.sp):''}" onchange="S.sp=pt(this.value);save()"></p><div class="timer" id="crt">${fmt(elapsed())}</div><h3>${c?c[0]+' · '+c[1]+' m':'Terminé 🎉'}</h3>`+crBtns()+p.map((x,i)=>`<div class="ingredient" style="margin:4px 0"><span>${i<k?'✓':i==k?'▶':'·'} ${x[0]} ${x[1]} m</span><b>${i<k?fmt(cr.laps[i])+(x[0][0]=='S'&&S.sp?` <small style="color:${cr.laps[i]<=S.sp?'#6fe28a':'#ff9b78'}">${cr.laps[i]<=S.sp?'-':'+'}${fmt(Math.abs(cr.laps[i]-S.sp))}</small>`:''):''}</b></div>`).join('')}let km=rt=='r5'?5:10,p=S.rp[km];if(!p)return top+`<p>Programme dégressif ${km} km : ton temps cible baisse chaque semaine jusqu’à ton objectif.</p><div class="form" style="grid-template-columns:1fr"><input id="rc0" placeholder="Ton temps actuel (ex : ${km==5?'30:00':'1:05:00'})"><input id="rcg" placeholder="Temps objectif (ex : ${km==5?'25:00':'55:00'})"><input id="rcw" type="number" placeholder="En combien de semaines ?"></div><button class="mainbtn full" style="margin-top:8px" onclick="setRp(${km})">Créer mon programme</button>`;let tg=tgtOf(km),hist=S.runs.filter(r=>r.km==km).slice(-5).reverse();return top+`<p>Objectif final <b>${fmt(p.goal)}</b> · cette semaine : <b>${fmt(tg)}</b> (${fmt(tg/km)}/km)</p><div class="timer" id="crt">${fmt(elapsed())}</div>`+crBtns()+`<button class="mainbtn full" style="margin-top:8px" onclick="crFinish()">Terminer la course</button>`+cr.laps.map((l,i)=>`<div class="ingredient"><span>Km ${i+1}</span><b>${fmt(l)}</b></div>`).join('')+(hist.length?'<h3>Dernières courses</h3>'+hist.map(r=>`<div class="ingredient"><span>${r.iso}</span><b>${fmt(r.sec)} <small>${r.tg?(r.sec<=r.tg?'-':'+')+fmt(Math.abs(r.sec-r.tg)):''}</small></b></div>`).join(''):'')+`<button class="next" onclick="delete S.rp[${km}];save();runTab(rt)">Modifier mon programme</button>`}
function setRp(km){let a=pt($('#rc0').value),g=pt($('#rcg').value),w=+$('#rcw').value;if(!a||!g||!w)return alert('Renseigne les 3 champs (ex : 30:00, 25:00, 8)');S.rp[km]={t0:a,goal:g,weeks:w,start:dk()};save();runTab(rt)}
function crLap(){if(!cr.on)return;let e=elapsed(),prev=cr.laps.reduce((a,l)=>a+l,0);cr.laps.push(e-prev);beep(900,.2);if(rt=='frac'&&cr.laps.length>=fracPlan().length){crStop();S.done.push({iso:dk(),t:'Course cardio'});save();let sp=cr.laps.filter((l,i)=>i%2==0);cr.res='<b>Fractionné terminé 🎉</b><br>Sprints : '+sp.map(fmt).join(' · ')+(S.sp?'<br>Moyenne '+fmt(sp.reduce((a,b)=>a+b,0)/sp.length)+' pour une cible de '+fmt(S.sp):'')}runTab(rt)}
function analyse(km,t,tg){if(!tg)return '<b>'+fmt(t)+'</b>';let d=t-tg,pc=d/tg*100,s=`<b>${fmt(t)}</b> pour ${km} km (${fmt(t/km)}/km) · cible ${fmt(tg)}<br>`;s+=d<=0?`✅ Objectif de la semaine atteint avec ${fmt(-d)} d’avance (${fmt(-d/km)}/km). Garde le plan.`:`⏱ Écart : +${fmt(d)} (${pc.toFixed(1)} %), soit +${fmt(d/km)} par km. `+(pc<=3?'Très proche : refais une sortie à allure régulière.':pc<=8?'À rattraper : ajoute une séance de fractionné cette semaine.':'Écart important : refais la cible de la semaine précédente avant de repartir plus vite.');if(cr.laps.length>1&&cr.laps[0]<t/cr.laps.length*.92)s+='<br>Départ trop rapide : ton 1er km est plus rapide que ta moyenne, pars plus calmement.';return s}
function crFinish(){crStop();if(gps!==null){navigator.geolocation.clearWatch(gps);gps=null}let km=rt=='r5'?5:10,t=elapsed();if(t<30)return alert('Lance le chrono pendant ta course');let tg=tgtOf(km);S.runs.push({iso:dk(),km,sec:Math.round(t),tg:Math.round(tg)});S.done.push({iso:dk(),t:'Course cardio'});save();cr.res=analyse(km,t,tg);runTab(rt)}

var qT='',gps=null,gd=0,gl=null,wl=null;
function pdn(n){let k=n.toLowerCase().slice(0,4);return PD[k]??PD[k.slice(0,3)]??0}
function prot(n,q,u){return (u=='unité'?q*(UG[n.toLowerCase().slice(0,3)]||100):q)*pdn(n)/100}
function mealProt(m){let f=F(),s=0;m[3].forEach(x=>{let r=/([\d.,]+)\s*(kg|g|ml|l|cl)?/i.exec(x[1]);if(!r)return;let q=parseFloat(r[1].replace(',','.')),u=(r[2]||'unité').toLowerCase();if(u=='kg'||u=='l')q*=1000;if(u=='cl')q*=10;s+=prot(x[0],q,u=='unité'?'unité':'g')*f});return s}
function recProt(r){return +r[6]||r[4].reduce((s,x)=>s+prot(x[0],x[1],x[2]),0)}
function bp(i){let b=BT[i];return b[3].reduce((s,x)=>s+prot(x[0],x[1],x[2]),0)/b[1]}
function eatenProt(d){d=d||dk();return Math.round((S.eat[d]||[]).reduce((s,i)=>s+mealProt(meals[i]),0)+(S.extra[d]||[]).reduce((s,e)=>s+(e.p||0),0))}
function ptarget(){return S.pt||Math.round(1.6*(S.weights.length?S.weights[S.weights.length-1].kg:60))}
function soreL(){let y=ld(new Date(Date.now()-864e5)),m={qu:'q',ad:'q',ge:'q',mo:'c',ti:'c',pi:'c',fe:'g',is:'g',ab:'a',ob:'a',lo:'a',pe:'p',de:'p',tr:'p',ep:'p',bi:'b',tc:'b',av:'b',br:'b',to:'a',da:'a'};return [...new Set(S.sore.filter(x=>x.d==dk()||x.d==y).map(x=>m[x.k]||'').join('').split(''))].filter(Boolean)}
function LD(){let t=TD(),pv=S.week[(t+6)%7]||'',td=S.week[t]||'',L=0,why=[],a=adapt(),sl=S.sleep[dk()];if(/Match|club/i.test(pv)){L--;why.push('match/club hier')}if(/Match|club/i.test(td)){L--;why.push('match/club aujourd’hui')}if(sl&&sl.h<6.5){L--;why.push('nuit courte')}if(a<0){L--;why.push('fatigue élevée')}if(soreL().length){L--;why.push('douleurs récentes')}if(a>0&&L==0)L=1;return {L:Math.max(-2,L),why}}
function avoid(p){let s=soreL(),f=p.filter(x=>!(XM[x[0]]||'').split('').some(c=>s.includes(c)));return f.length>=4?f:p}
function ringI(p,ic,c){p=Math.max(0,Math.min(1,p||0));let r=34,L=2*Math.PI*r;return `<svg width="84" height="84" viewBox="0 0 84 84"><circle cx="42" cy="42" r="${r}" fill="none" stroke="#2b2326" stroke-width="8"/><circle cx="42" cy="42" r="${r}" fill="none" stroke="${c}" stroke-width="8" stroke-linecap="round" stroke-dasharray="${L*p} ${L}" transform="rotate(-90 42 42)"/><text x="42" y="52" text-anchor="middle" font-size="28">${ic}</text></svg>`}
function homebar(){let el=$('#homebar');if(!el)return;let w=wsum(),wt=wtarget(),kt=S.kt||PLAN,k=eatenKcal(),sl=S.sleep[dk()];el.innerHTML=`<div style="display:flex;justify-content:space-around;margin-bottom:12px">${[['water',w/wt,'💧',(w/1000).toFixed(1)+' / '+(wt/1000).toFixed(1)+' L','#4aa8ff'],['food',k/kt,'🍽️',k+' / '+kt+' kcal<br>'+eatenProt()+' g prot','#ffb347'],['sleep',sl?sl.h/8:0,'🛏️',sl?fmtH(sl.h)+' / 8 h':'à noter','#9b8cff']].map(r=>`<div onclick="openQuick('${r[0]}')" style="text-align:center;cursor:pointer">${ringI(r[1],r[2],r[4])}<br><small>${r[3]}</small></div>`).join('')}</div>`+instBar()}
function openQuick(t){qT=t;let b=$('#qbody');if(t=='water'){$('#qs').textContent='HYDRATATION';$('#qt').textContent='Combien as-tu bu ?';b.innerHTML=hydroHTML()+`<div class="form" style="grid-template-columns:2fr 1fr"><input id="wml" type="number" placeholder="Autre quantité (ml)"><button class="mainbtn" onclick="addWater(+$('#wml').value)">+</button></div><small>Aujourd’hui : ${(wsum()/1000).toFixed(2)} L sur ${(wtarget()/1000).toFixed(1)} L.</small>`}else if(t=='food'){$('#qs').textContent='ALIMENTATION';$('#qt').textContent='Ce que tu as mangé';b.innerHTML=`<p><b>${eatenKcal()}</b> / ${S.kt||PLAN} kcal · <b>${eatenProt()}</b> / ${ptarget()} g de protéines</p>`+meals.map((m,i)=>{let on=(S.eat[dk()]||[]).includes(i);return `<div class="ingredient" style="margin:8px 0"><span>${m[0]} · ${m[1]}</span><button class="${on?'mainbtn':''}" onclick="eat(${i})">${on?'✓ Mangé':'Marquer'}</button></div>`}).join('')+(S.extra[dk()]||[]).map((e,i)=>`<div class="ingredient" style="margin:6px 0"><span>${esc(e.n)}</span><b>${e.k} kcal${e.p?' · '+e.p+' g':''} <a onclick="S.extra[dk()].splice(${i},1);save()">✕</a></b></div>`).join('')+`<h3 style="margin-top:12px">➕ Autre repas</h3><div class="form" style="grid-template-columns:2fr 1fr 1fr auto"><input id="qn" placeholder="Nom"><input id="qk" type="number" placeholder="kcal"><input id="qp" type="number" placeholder="prot. g"><button class="mainbtn" onclick="addX('q')">+</button></div>`}else{let s=S.sleep[dk()];$('#qs').textContent='SOMMEIL';$('#qt').textContent='Ma nuit';b.innerHTML=`<div class="form" style="grid-template-columns:1fr 1fr"><label>Endormi<input id="sb3" type="time" value="${s?s.b:'22:30'}"></label><label>Réveil<input id="sw3" type="time" value="${s?s.w:'06:30'}"></label></div><button class="mainbtn full" style="margin-top:10px" onclick="saveSleep('sb3','sw3')">Enregistrer</button><p>${s?'Nuit : <b>'+fmtH(s.h)+'</b> ('+s.b+' → '+s.w+')':'Pas encore noté aujourd’hui'}</p>`}$('#quick').classList.add('open')}
function refreshQuick(){if($('#quick').classList.contains('open'))openQuick(qT)}
function bedAlert(a){let k=Object.keys(S.sleep).sort().pop();if(!k)return;let w=S.sleep[k].w,bd=bedtime(w,8),p=bd.split(':').map(Number),n=new Date(),d=p[0]*60+p[1]-(n.getHours()*60+n.getMinutes());if(d<-720)d+=1440;if(d>-30&&d<=60)a.push('🛏 '+(d>0?'Dans '+d+' min':'Maintenant')+' : heure idéale de coucher ('+bd+') pour dormir 8 h avant ton réveil de '+w+'. Pose le téléphone et prépare-toi.')}
function notify(t,b){try{if(window.Notification&&Notification.permission==='granted'){navigator.serviceWorker&&navigator.serviceWorker.ready?navigator.serviceWorker.ready.then(r=>r.showNotification(t,{body:b,icon:'icon-192.png',tag:t})):new Notification(t,{body:b})}}catch(e){}}
function notifyOnce(x){let k=x.replace(/<[^>]*>/g,'').slice(0,60),d=dk();S.ntf=S.ntf||{};if(S.ntf[k]==d)return;S.ntf[k]=d;localStorage.setItem('sp11',JSON.stringify(S));notify('Swish',x.replace(/<[^>]*>/g,''))}
function askNotif(){if(!window.Notification)return alert('Notifications non supportées sur ce navigateur');Notification.requestPermission().then(p=>alert(p=='granted'?'Notifications activées (elles arrivent quand l’app est ouverte ou récemment ouverte)':'Notifications refusées'))}
function snap(){try{let k='sp11_bk_'+dk();if(!localStorage.getItem(k)){localStorage.setItem(k,JSON.stringify(S));Object.keys(localStorage).filter(x=>x.startsWith('sp11_bk_')).sort().slice(0,-7).forEach(x=>localStorage.removeItem(x))}navigator.storage&&navigator.storage.persist&&navigator.storage.persist()}catch(e){}}
function restoreBk(k){if(confirm('Restaurer la sauvegarde du '+k.slice(8)+' ? Les données actuelles seront remplacées.')){localStorage.setItem('sp11',localStorage.getItem(k));location.reload()}}
function socialTab(t,el){S.socialTab=t;$$('#social .tabs button').forEach(x=>x.classList.remove('sel'));if(el)el.classList.add('sel');let box=$('#socialBox');if(!box)return;
if(t==='friends'){box.innerHTML='<div class="add"><div class="head"><h3>👤 Mon profil</h3><small>'+Object.keys(S.friends).length+' ami(s)</small></div>'+friendsHTML()+'</div>';return}
if(t==='groups'){let names=Object.keys(S.friends),pick=names.map(n=>'<label class="ingredient"><span>'+esc(n)+'</span><input type="checkbox" class="gfriend" value="'+esc(n)+'"></label>').join('')||'<small>Ajoute d’abord des amis avec leur code.</small>';let groups=Object.entries(S.groups).map(([k,g])=>'<div class="add"><div class="head"><h3>🏀 '+esc(g.name)+'</h3><small>'+g.members.length+' membre(s)</small></div>'+g.members.map(n=>{let f=S.friends[n];return '<div class="ingredient"><span>'+esc(n)+'</span><b>'+(f?f.s+'/'+(f.p||'?')+' séances · série '+f.k:'profil local')+'</b></div>'}).join('')+'<button class="next" onclick="deleteGroup('+JSON.stringify(k)+')">Supprimer</button></div>').join('');box.innerHTML='<div class="add"><div class="head"><h3>👥 Créer un groupe</h3><small>Choisis les amis à suivre ensemble</small></div><div class="form" style="grid-template-columns:1fr"><input id="gname" placeholder="Nom du groupe"></div><div class="ingredients">'+pick+'</div><button class="mainbtn full" onclick="createGroup()">Créer le groupe</button></div>'+groups;return}
box.innerHTML='<div class="add"><div class="head"><h3>📨 Demandes</h3><small>Ajouts reçus par code</small></div>'+(S.friendRequests.length?S.friendRequests.map((r,i)=>'<div class="ingredient"><span>'+esc(r.n)+'</span><b><button onclick="acceptFriendRequest('+i+')">Accepter</button> <button onclick="S.friendRequests.splice('+i+',1);save();socialTab("requests",document.getElementById("stRequests"))">Refuser</button></b></div>').join(''):'<p>Aucune demande en attente.</p>')+'</div>'}

function createGroup(){let n=($('#gname')?.value||'').trim();if(!n)return alert('Donne un nom au groupe');let members=[...document.querySelectorAll('.gfriend:checked')].map(x=>x.value);if(!members.length)return alert('Sélectionne au moins un ami');S.groups[n]={name:n,members};save();socialTab('groups',document.getElementById('stGroups'))}
function deleteGroup(n){delete S.groups[n];save();socialTab('groups',document.getElementById('stGroups'))}
function acceptFriendRequest(i){let r=S.friendRequests[i];if(r){S.friends[r.n]=r;S.friendRequests.splice(i,1);save();socialTab('friends',document.getElementById('stFriends'))}}
function myCard(){return {n:S.me||'Moi',d:dk(),s:weekCounts()[wk(new Date())]||0,p:planned(),k:+($('#stk')&&$('#stk').textContent)||0,b:badges().filter(x=>x[2]).length,r:restInfo().n}}
function setMe(){let n=prompt('Ton nom ou pseudo',S.me||'');if(n){S.me=n.trim();save();renderSettings()}}
function shareCode(){if(!S.me)setMe();let c=btoa(unescape(encodeURIComponent(JSON.stringify(myCard()))));if(navigator.share)navigator.share({title:'Mon profil Swish',text:c}).catch(()=>{});else if(navigator.clipboard){navigator.clipboard.writeText(c);alert('Code copié : envoie-le à ton ami')}else prompt('Copie ce code',c)}
function addFriend(){let c=prompt('Colle le code de ton ami');if(!c)return;try{let o=JSON.parse(decodeURIComponent(escape(atob(c.trim()))));if(!o.n)throw 0;if(o.requestFor&&S.me&&o.requestFor===S.me){S.friendRequests.push(o);save();alert('Demande reçue de '+o.n);socialTab('requests',document.getElementById('stRequests'));return}S.friends[o.n]=o;save();renderSettings();if($('#social')?.classList.contains('active'))socialTab('friends',document.getElementById('stFriends'))}catch(e){alert('Code invalide')}}
function sendFriendRequest(){if(!S.me)setMe();let target=prompt('Pseudo exact de la personne à ajouter');if(!target)return;let c=btoa(unescape(encodeURIComponent(JSON.stringify({...myCard(),requestFor:target}))));if(navigator.share)navigator.share({title:'Demande Swish',text:c}).catch(()=>{});else if(navigator.clipboard){navigator.clipboard.writeText(c);alert('Demande copiée : envoie-la à la personne')}else prompt('Copie cette demande',c)}
function friendsHTML(){let me=myCard(),all=[me].concat(Object.values(S.friends)).sort((a,b)=>b.s/(b.p||1)-a.s/(a.p||1)||b.k-a.k);return `<div class="twobtn"><button onclick="setMe()">Mon nom : ${esc(S.me||'à définir')}</button><button onclick="shareCode()">Partager mon profil</button></div><button class="next" onclick="addFriend()">＋ Ajouter un ami (code)</button><button class="next" onclick="sendFriendRequest()">📨 Envoyer une demande</button>`+(all.length>1?'<h4>Classement du groupe</h4>'+all.map((f,i)=>`<div class="ingredient" style="margin:6px 0"><span>${i+1}. ${esc(f.n)}${f===me?' (moi)':''}</span><b>${f.s}/${f.p||'?'} séances · série ${f.k} · ${f.b} badges${f.r>=3?' · ⚠️ '+f.r+' j sans séance':''}${f===me?'':' <small>'+f.d+'</small>'}</b></div>`).join('')+'<small>Le profil d’un ami se met à jour quand il t’envoie un nouveau code.</small>':'<small>Échange ton code avec un ami pour comparer vos semaines.</small>')}
function openSettings(){renderSettings();$('#settings').classList.add('open')}
function renderSettings(){let bk=Object.keys(localStorage).filter(x=>x.startsWith('sp11_bk_')).sort().reverse();$('#setx').innerHTML=`<h3 style="margin-top:14px">Application</h3>${installHTML()}<h3 style="margin-top:14px">Thème</h3><div class="twobtn" style="grid-template-columns:repeat(3,1fr)">${[['auto','Auto'],['dark','Sombre'],['light','Clair']].map(t=>`<button class="${(S.theme||'auto')==t[0]?'mainbtn':''}" onclick="setTheme('${t[0]}')">${t[1]}</button>`).join('')}</div><h3 style="margin-top:14px">Sauvegarde automatique</h3><small>Une copie par jour (7 derniers jours) sur cet appareil. Exporte aussi un fichier de temps en temps.</small>${bk.map(k=>`<div class="ingredient" style="margin:6px 0"><span>${k.slice(8)}</span><a onclick="restoreBk('${k}')">Restaurer</a></div>`).join('')}<h3 style="margin-top:14px">Notifications</h3><button class="next" onclick="askNotif()">Activer les notifications</button><h3 style="margin-top:14px">Profil &amp; amis</h3>`+friendsHTML()}
function badges(){let st=+($('#stk')&&$('#stk').textContent)||0,r5=S.runs.some(r=>r.km==5&&r.tg&&r.sec<=r.tg),n=S.done.length,jm=S.jumps.length>1&&S.jumps[S.jumps.length-1].cm>S.jumps[0].cm,sl=Array.from(new Set(Object.keys(S.sleep).concat(Object.keys(S.naps)))).filter(k=>totalSleep(k)>=7.5).length,hy=Object.keys(S.water).filter(k=>S.water[k].reduce((a,b)=>a+b,0)>=wtarget()*.9).length;return [['🥇','Première séance',n>=1],['🔟','10 séances',n>=10],['🔥','4 semaines complètes d’affilée',st>=4],['🏃','Premier 5 km sous la cible',r5],['🚀','Détente améliorée',jm],['😴','7 bonnes nuits (≥ 7 h 30)',sl>=7],['💧','7 jours d’hydratation',hy>=7],['⚖️','+2 kg depuis le départ',S.weights.length>1&&S.weights[S.weights.length-1].kg-S.weights[0].kg>=2]]}
function renderBadges(){let el=$('#badges');if(!el)return;let j=S.jumps.length?Math.max(...S.jumps.map(x=>x.cm)):0,r=k=>{let a=S.runs.filter(x=>x.km==k).map(x=>x.sec);return a.length?fmt(Math.min(...a)):'—'};el.innerHTML=`<div class="ingredient"><span>🚀 Record de détente</span><b>${j?j+' cm':'—'}</b></div><div class="ingredient"><span>🏃 Meilleur 5 km</span><b>${r(5)}</b></div><div class="ingredient"><span>🏃 Meilleur 10 km</span><b>${r(10)}</b></div><div class="chips" style="margin-top:10px">${badges().map(x=>`<span style="opacity:${x[2]?1:.35}">${x[0]} ${x[1]}${x[2]?' ✓':''}</span>`).join('')}</div>`}
function drawCurve(){let c=$('#pcurve');if(!c||!c.clientWidth)return;let w=c.clientWidth,h=170,d=devicePixelRatio||1;c.width=w*d;c.height=h*d;let x=c.getContext('2d');x.scale(d,d);x.clearRect(0,0,w,h);let cl=v=>Math.max(0,Math.min(100,v)),sw=S.weights.length>1?S.weights.map(p=>[p.date,cl((p.kg-S.weights[0].kg)/(60-S.weights[0].kg||1)*100)]):[],sj=S.jt&&S.jumps.length>1?S.jumps.map(p=>[p.date,cl((p.cm-S.jumps[0].cm)/(S.jt-S.jumps[0].cm||1)*100)]):[],sr=S.rp[5]?S.runs.filter(r=>r.km==5).map(r=>[r.iso,cl((S.rp[5].t0-r.sec)/(S.rp[5].t0-S.rp[5].goal||1)*100)]):[],all=[[sw,'#ffc857','Poids'],[sj,'#ff6545','Détente'],[sr,'#4aa8ff','5 km']],ds=all.flatMap(a=>a[0].map(p=>Date.parse(p[0])));if(!ds.length){x.fillStyle='#a99da0';x.font='12px Arial';x.fillText('Ajoute poids, détente et courses pour voir ta courbe',8,h/2);$('#pleg').textContent='';return}let lo=Math.min(...ds),hi=Math.max(...ds);x.strokeStyle='#382d30';x.beginPath();x.moveTo(10,h-20);x.lineTo(w-10,h-20);x.stroke();all.forEach(a=>{if(!a[0].length)return;x.strokeStyle=a[1];x.lineWidth=3;x.beginPath();a[0].forEach((p,i)=>{let X=10+(w-20)*((Date.parse(p[0])-lo)/(hi-lo||1)),Y=h-20-(h-35)*p[1]/100;i?x.lineTo(X,Y):x.moveTo(X,Y)});x.stroke()});$('#pleg').innerHTML=all.map(a=>`<span style="color:${a[1]}">● ${a[2]}</span>`).join(' · ')+' · en % de l’objectif'}
function lastDays(n){return Array.from({length:n},(_,i)=>ld(new Date(Date.now()-(n-1-i)*864e5)))}
function recapHTML(){let ds=lastDays(7),pl=planned()||1,done=sessDates().filter(d=>ds.includes(d)).length,sl=ds.map(d=>S.sleep[d]).filter(Boolean),avs=sl.length?sl.reduce((a,x)=>a+x.h,0)/sl.length:0,wd=ds.filter(d=>(S.water[d]||[]).reduce((a,b)=>a+b,0)>=wtarget()*.9).length,kt=S.kt||PLAN,kd=ds.filter(d=>eatenKcal(d)>0),ka=kd.length?kd.reduce((a,d)=>a+eatenKcal(d),0)/kd.length:0,pa=kd.length?kd.reduce((a,d)=>a+eatenProt(d),0)/kd.length:0,hh=S.history.filter(x=>ds.includes(hdate(x))),fa=hh.length?hh.reduce((a,x)=>a+x.f,0)/hh.length:0,P=[],G=[];done>=pl?G.push('Séances : '+done+'/'+pl+', objectif tenu.'):P.push('Séances : '+done+' sur '+pl+' prévues. '+(pl-done)+' manquée(s) : sans régularité, pas de progrès.');if(sl.length<5)P.push('Sommeil : seulement '+sl.length+' nuit(s) notée(s) sur 7, je ne peux pas évaluer ta récupération. Note-la chaque matin.');if(sl.length&&avs<7.5)P.push('Sommeil moyen : '+fmtH(avs)+' pour un objectif de 8 h. C’est ton premier frein à la progression.');else if(sl.length>=5)G.push('Sommeil moyen : '+fmtH(avs)+'.');if(wd<5)P.push('Hydratation : objectif atteint '+wd+' jour(s) sur 7. Insuffisant.');else G.push('Hydratation : objectif atteint '+wd+' jours sur 7.');if(kd.length<5)P.push('Alimentation : repas suivis '+kd.length+' jour(s) sur 7, tes calories réelles sont inconnues.');else if(ka<kt*.9)P.push('Calories : '+Math.round(ka)+' kcal en moyenne pour '+kt+' visées. Tu manges trop peu pour ton objectif.');else if(ka>kt*1.1)P.push('Calories : '+Math.round(ka)+' kcal en moyenne pour '+kt+' visées. Tu dépasses.');else G.push('Calories : '+Math.round(ka)+' kcal en moyenne, dans la cible.');if(kd.length>=3&&pa<ptarget()*.85)P.push('Protéines : '+Math.round(pa)+' g par jour pour '+ptarget()+' g visés (estimation).');if(fa>=4)P.push('Fatigue moyenne '+fa.toFixed(1)+'/5 : tu accumules, allège ou dors plus.');let w=S.weights.filter(x=>ds.includes(x.date));if(w.length>1)G.push('Poids : '+(w[w.length-1].kg-w[0].kg>=0?'+':'')+(w[w.length-1].kg-w[0].kg).toFixed(1)+' kg sur la semaine.');return (P.length?`<div class="meal" style="border-color:#ff9b30"><b>À améliorer, sans filtre</b>${P.map(x=>'<p>• '+x+'</p>').join('')}</div><p><b>Priorité n°1 cette semaine :</b> ${P[0]}</p>`:'<p>Rien de critique cette semaine, mais ne te relâche pas.</p>')+(G.length?`<div class="meal"><b>Ce qui va</b>${G.map(x=>'<p>• '+x+'</p>').join('')}</div>`:'')}
function checkRecap(){let d=new Date().getDay();if(d!==0&&d!==1)return;let key=d==0?dk():ld(new Date(Date.now()-864e5));if(S.recapSeen==key)return;S.recapKey=key;$('#recapbody').innerHTML=recapHTML();$('#recap').classList.add('open')}
function closeRecap(){S.recapSeen=S.recapKey;save();$('#recap').classList.remove('open')}
function hav(a,b){let t=x=>x*Math.PI/180,dl=t(b.lat-a.lat),dn=t(b.lon-a.lon),h=Math.sin(dl/2)**2+Math.cos(t(a.lat))*Math.cos(t(b.lat))*Math.sin(dn/2)**2;return 2*6371000*Math.asin(Math.sqrt(h))}
function gpsToggle(){if(gps!==null){navigator.geolocation.clearWatch(gps);gps=null;runTab(rt);return}if(!navigator.geolocation)return alert('GPS indisponible');gd=0;gl=null;gps=navigator.geolocation.watchPosition(gpsPos,()=>alert('Autorise la localisation pour utiliser le GPS'),{enableHighAccuracy:true,maximumAge:1000});try{navigator.wakeLock&&navigator.wakeLock.request('screen').then(l=>wl=l)}catch(e){}runTab(rt)}
function gpsPos(p){if(p.coords.accuracy>25)return;let q={lat:p.coords.latitude,lon:p.coords.longitude};if(gl&&cr.on){let d=hav(gl,q);if(d<2)return;gd+=d}gl=q;let e=$('#crd');if(e)e.textContent=(gd/1000).toFixed(2)+' km';if(!cr.on)return;if(rt=='frac'){let pl=fracPlan(),k=cr.laps.length;if(k<pl.length&&gd>=pl.slice(0,k+1).reduce((s,x)=>s+x[1],0))crLap()}else{let km=rt=='r5'?5:10;if(gd>=km*1000)crFinish();else if(gd>=(cr.laps.length+1)*1000)crLap()}}
function parseTrack(t){let d=new DOMParser().parseFromString(t,'text/xml'),n=[...d.getElementsByTagName('trkpt'),...d.getElementsByTagName('Trackpoint')],pts=[];n.forEach(e=>{let g=x=>{let s=e.getElementsByTagName(x)[0];return s?s.textContent:null},la=e.getAttribute('lat')??g('LatitudeDegrees'),lo=e.getAttribute('lon')??g('LongitudeDegrees'),tm=Date.parse(g('time')||g('Time'));if(la!=null&&lo!=null&&tm)pts.push({lat:+la,lon:+lo,t:tm/1000})});let cum=0;return pts.map((p,i)=>{if(i)cum+=hav(pts[i-1],p);return {d:cum,t:p.t-pts[0].t}})}
function timeAt(a,m){for(let i=1;i<a.length;i++)if(a[i].d>=m){let f=(m-a[i-1].d)/(a[i].d-a[i-1].d||1);return a[i-1].t+f*(a[i].t-a[i-1].t)}return null}
function importRun(f){f.text().then(t=>{let a=parseTrack(t);if(a.length<10)return alert('Fichier non reconnu (GPX ou TCX attendu)');crReset();if(rt=='frac'){let pl=fracPlan(),acc=0,prev=0,L=[];for(let s of pl){acc+=s[1];let tt=timeAt(a,acc);if(tt==null)break;L.push(tt-prev);prev=tt}cr.laps=L;if(L.length<pl.length)alert('La trace ne couvre que '+L.length+'/'+pl.length+' segments');S.done.push({iso:dk(),t:'Course cardio'});save();let sp=L.filter((l,i)=>i%2==0);cr.res='<b>Import Garmin : fractionné</b><br>Sprints : '+sp.map(fmt).join(' · ')+(S.sp&&sp.length?'<br>Moyenne '+fmt(sp.reduce((x,y)=>x+y,0)/sp.length)+' pour une cible de '+fmt(S.sp):'')}else{let km=rt=='r5'?5:10,tt=timeAt(a,km*1000);if(tt==null)return alert('La trace fait moins de '+km+' km ('+(a[a.length-1].d/1000).toFixed(2)+' km)');cr.laps=Array.from({length:km},(_,i)=>timeAt(a,(i+1)*1000)-(i?timeAt(a,i*1000):0));let tg=tgtOf(km);S.runs.push({iso:dk(),km,sec:Math.round(tt),tg:Math.round(tg)});S.done.push({iso:dk(),t:'Course cardio'});save();cr.res=analyse(km,tt,tg)}runTab(rt)})}
$('#gpxf').onchange=e=>{if(e.target.files[0])importRun(e.target.files[0]);e.target.value=''};
sleepUI();renderBody();renderGear();alerts();setInterval(alerts,60000);setTimeout(checkRecap,1500);

var dip=null;
function restInfo(){let ds=sessDates(),n=0;while(n<60&&!ds.includes(ld(new Date(Date.now()-n*864e5))))n++;let c=0,i=n;while(c<60&&ds.includes(ld(new Date(Date.now()-i*864e5)))){c++;i++}return {n:ds.length?n:0,c}}
function restAlert(a){let r=restInfo(),g=Object.keys(S.friends).length>0;if(r.n>=3)a.push('⏸ '+r.n+' jours sans séance. Trop de repos casse la progression : fais au moins la Mobilité aujourd’hui.'+(g?' <a onclick="tellGroup()">Prévenir mon groupe</a>':''));if(r.c>=5&&r.n<=1)a.push('🔥 '+r.c+' jours d’entraînement d’affilée sans repos : prends un vrai jour off pour récupérer.'+(g?' <a onclick="tellGroup()">Prévenir mon groupe</a>':''))}
function tellGroup(){let r=restInfo(),t='Swish : '+(S.me||'Je')+' – '+(r.n>=3?r.n+' jours sans séance. Motivez-moi ! 💪':r.c+' jours d’entraînement d’affilée, je vais me reposer.');if(navigator.share)navigator.share({text:t}).catch(()=>{});else if(navigator.clipboard){navigator.clipboard.writeText(t);alert('Message copié : colle-le dans ton groupe')}else prompt('Copie ce message',t)}
function applyTheme(){try{let t=S.theme||'auto',l=t=='light'||(t=='auto'&&window.matchMedia&&matchMedia('(prefers-color-scheme: light)').matches);document.documentElement.classList.toggle('light',!!l)}catch(e){}}
function setTheme(t){S.theme=t;save();applyTheme();renderSettings()}
function isStandalone(){return !!((window.matchMedia&&matchMedia('(display-mode: standalone)').matches)||navigator.standalone)}
function installHTML(){return isStandalone()?'<small>✅ Swish est installée sur ton écran d’accueil.</small>':'<button class="mainbtn full" onclick="installApp()">📲 Installer Swish</button>'}
function instBar(){return isStandalone()||S.noinst?'':'<div class="meal" style="display:flex;justify-content:space-between;align-items:center;gap:8px"><small>📲 Installe Swish sur ton écran d’accueil</small><span><button class="mainbtn" onclick="installApp()">Installer</button> <a onclick="S.noinst=1;save()">✕</a></span></div>'}
function installApp(){if(dip){dip.prompt();dip.userChoice.then(()=>{dip=null;homebar()})}else alert(/iphone|ipad|ipod/i.test(navigator.userAgent)?'Sur iPhone : dans Safari, touche le bouton Partager (carré avec une flèche), puis « Sur l’écran d’accueil ».':'Ouvre le menu du navigateur (⋮) puis « Installer l’application » ou « Ajouter à l’écran d’accueil ».')}
try{window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();dip=e;homebar()});window.addEventListener('appinstalled',()=>{dip=null;homebar()});matchMedia('(prefers-color-scheme: light)').addEventListener('change',applyTheme)}catch(e){}
applyTheme();homebar();

/* Swish — corrections et design */

function randTag(){const a="ABCDEFGHJKLMNPQRSTUVWXYZ23456789";let s="";for(let i=0;i<6;i++)s+=a[Math.floor(Math.random()*a.length)];return s}
function slugName(n){return (n||"sport").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/[^a-z0-9]+/g,"").slice(0,12)||"sport"}
function ensureId(){if(!S.tag)S.tag=randTag();if(S.me)S.handle="@"+slugName(S.me)+"-"+S.tag;return S.handle||""}
function appUrl(){return location.href.split("#")[0]}
function encCard(o){return btoa(unescape(encodeURIComponent(JSON.stringify(o))))}
function decCard(c){return JSON.parse(decodeURIComponent(escape(atob(String(c).replace(/\s/g,"")))))}
function friendPayload(){ensureId();save();return {...myCard(),handle:S.handle,tag:S.tag}}
function friendLink(){return appUrl()+"#ami="+encodeURIComponent(encCard(friendPayload()))}
function shareApp(){
  const url=appUrl();
  const text="Swish — entraînement, repas, hydratation et progrès. Ouvre le lien puis ajoute-le à l’écran d’accueil : "+url;
  if(navigator.share)navigator.share({title:"Swish",text,url}).catch(()=>{});
  else if(navigator.clipboard)navigator.clipboard.writeText(url).then(()=>alert("Lien copié. Envoie-le : tes amis ouvrent Swish et l’ajoutent à l’écran d’accueil."));
  else prompt("Copie ce lien",url);
}
function shareFriendLink(){
  if(!S.me){setMe();if(!S.me)return}
  const url=friendLink();
  const text="Ajoute-moi sur Swish ("+S.handle+") : "+url;
  if(navigator.share)navigator.share({title:"Ajoute-moi sur Swish",text,url}).catch(()=>{});
  else if(navigator.clipboard)navigator.clipboard.writeText(url).then(()=>alert("Lien d’ami copié. La personne est ajoutée dès qu’elle l’ouvre."));
  else prompt("Copie ce lien",url);
}
function copyHandle(){
  if(!S.me){setMe();if(!S.me)return}
  const id=ensureId();save();
  if(navigator.clipboard)navigator.clipboard.writeText(id).then(()=>alert("Identifiant copié : "+id));
  else prompt("Ton identifiant",id);
}
function consumeFriendLink(){
  const m=(location.hash||"").match(/ami=([^&]+)/);
  if(!m)return;
  try{
    const o=decCard(decodeURIComponent(m[1]));
    if(o&&o.n&&o.handle!==S.handle){S.friends[o.n]=o;save();alert(o.n+" ("+(o.handle||"ami")+") a été ajouté.");}
    history.replaceState(null,"",location.pathname+location.search);
  }catch(e){console.warn(e)}
}
function addFriend(){
  let c=prompt("Colle le lien d’ami ou le code");
  if(!c)return;
  c=c.trim();
  const hash=c.match(/ami=([^&\s]+)/);
  if(hash)c=decodeURIComponent(hash[1]);
  if(c.startsWith("@")&&c.indexOf(".")<0){alert("L’identifiant @ sert à reconnaître la personne. Pour l’ajouter, colle son lien d’ami.");return}
  try{
    const o=decCard(c);
    if(!o.n)throw 0;
    S.friends[o.n]=o;save();
    alert(o.n+" ajouté.");
    refreshSocial();
  }catch(e){alert("Lien ou code invalide")}
}
function sendFriendRequest(){shareFriendLink()}
function refreshSocial(){
  if($("#social")&&$("#social").classList.contains("active"))socialTab("friends",document.getElementById("stFriends"));
  if($("#settings")&&$("#settings").classList.contains("open"))renderSettings();
}
function setMe(){
  const n=prompt("Choisis ton pseudo",S.me||"");
  if(!n)return;
  S.me=n.trim();
  if(!S.tag)S.tag=randTag();
  S.handle="@"+slugName(S.me)+"-"+S.tag;
  save();
  refreshSocial();
}
function friendsHTML(){
  const id=S.me?ensureId():"@pseudo-CODE";
  const me=myCard();
  const all=[me].concat(Object.values(S.friends)).sort((a,b)=>b.s/(b.p||1)-a.s/(a.p||1)||b.k-a.k);
  return `<div class="meal"><b>Envoyer Swish</b><p>Tes amis ouvrent le lien, puis l’ajoutent à l’écran d’accueil. Pas besoin d’un store.</p><button class="mainbtn full" onclick="shareApp()">Partager l’application</button></div>
  <div class="meal"><b>Ton identifiant</b><p>Tu choisis le pseudo. Swish ajoute un @ et un code unique.</p><div class="idchip">${esc(id)}</div>
  <div class="twobtn" style="margin-top:10px"><button class="pick face ${S.me?"on":""}" onclick="setMe()">${S.me?"Pseudo : "+esc(S.me):"Choisir mon pseudo"}</button><button class="pick" onclick="copyHandle()">Copier le @</button></div>
  <button class="mainbtn full" style="margin-top:8px" onclick="shareFriendLink()">Lien qui m’ajoute directement</button>
  <button class="next" onclick="addFriend()">Coller le lien d’un ami</button></div>`
  +(all.length>1?"<h4>Classement</h4>"+all.map((f,i)=>`<div class="ingredient"><span>${i+1}. ${esc(f.n)}${f===me?" (moi)":""}${f.handle?" · "+esc(f.handle):""}</span><b>${f.s}/${f.p||"?"} séances</b></div>`).join(""):"<small>Envoie ton lien : la personne est ajoutée dès qu’elle l’ouvre.</small>");
}

function mann(v,hl,h,click){
  const face=v!=="dos";
  const zones=face?{
    tr:'<ellipse cx="60" cy="54" rx="16" ry="6"/>',
    de:'<ellipse cx="34" cy="64" rx="9" ry="7"/><ellipse cx="86" cy="64" rx="9" ry="7"/>',
    pe:'<ellipse cx="60" cy="80" rx="14" ry="10"/>',
    bi:'<ellipse cx="28" cy="88" rx="6" ry="12"/><ellipse cx="92" cy="88" rx="6" ry="12"/>',
    av:'<ellipse cx="24" cy="112" rx="5.5" ry="11"/><ellipse cx="96" cy="112" rx="5.5" ry="11"/>',
    ab:'<ellipse cx="60" cy="104" rx="9" ry="11"/>',
    ob:'<ellipse cx="46" cy="104" rx="5" ry="11"/><ellipse cx="74" cy="104" rx="5" ry="11"/>',
    ad:'<ellipse cx="53" cy="134" rx="5" ry="10"/><ellipse cx="67" cy="134" rx="5" ry="10"/>',
    qu:'<ellipse cx="48" cy="158" rx="8" ry="16"/><ellipse cx="72" cy="158" rx="8" ry="16"/>',
    ge:'<ellipse cx="47" cy="178" rx="5" ry="5"/><ellipse cx="73" cy="178" rx="5" ry="5"/>',
    ti:'<ellipse cx="46" cy="202" rx="5.5" ry="14"/><ellipse cx="74" cy="202" rx="5.5" ry="14"/>',
    pi:'<ellipse cx="44" cy="230" rx="8" ry="5"/><ellipse cx="76" cy="230" rx="8" ry="5"/>'
  }:{
    tr:'<ellipse cx="60" cy="54" rx="16" ry="6"/>',
    de:'<ellipse cx="34" cy="64" rx="9" ry="7"/><ellipse cx="86" cy="64" rx="9" ry="7"/>',
    da:'<path d="M46 70 Q60 76 74 70 L76 104 Q60 110 44 104 Z"/>',
    lo:'<ellipse cx="60" cy="114" rx="12" ry="7"/>',
    tc:'<ellipse cx="28" cy="88" rx="6" ry="12"/><ellipse cx="92" cy="88" rx="6" ry="12"/>',
    av:'<ellipse cx="24" cy="112" rx="5.5" ry="11"/><ellipse cx="96" cy="112" rx="5.5" ry="11"/>',
    fe:'<ellipse cx="48" cy="134" rx="10" ry="9"/><ellipse cx="72" cy="134" rx="10" ry="9"/>',
    is:'<ellipse cx="48" cy="164" rx="8" ry="16"/><ellipse cx="72" cy="164" rx="8" ry="16"/>',
    mo:'<ellipse cx="46" cy="204" rx="5.5" ry="14"/><ellipse cx="74" cy="204" rx="5.5" ry="14"/>',
    pi:'<ellipse cx="44" cy="230" rx="8" ry="5"/><ellipse cx="76" cy="230" rx="8" ry="5"/>'
  };
  const gid="sk"+Math.random().toString(36).slice(2,7);
  const head=face?`
    <path d="M42 20 Q60 6 78 20 Q80 14 60 11 Q40 14 42 20" fill="#2b211c"/>
    <ellipse cx="46" cy="33" rx="3" ry="4" fill="#e7b892"/>
    <ellipse cx="74" cy="33" rx="3" ry="4" fill="#e7b892"/>
    <path d="M47 27 Q52 25 56 27.5" stroke="#4a342c" fill="none" stroke-width="1.1" stroke-linecap="round"/>
    <path d="M64 27.5 Q68 25 73 27" stroke="#4a342c" fill="none" stroke-width="1.1" stroke-linecap="round"/>
    <ellipse cx="51.5" cy="32.5" rx="2.3" ry="2.7" fill="#1b140f"/>
    <ellipse cx="68.5" cy="32.5" rx="2.3" ry="2.7" fill="#1b140f"/>
    <circle cx="52.2" cy="31.6" r=".7" fill="#fff"/>
    <circle cx="69.2" cy="31.6" r=".7" fill="#fff"/>
    <path d="M60 35 L58.2 39.2 Q60 40.8 61.8 39.2 Z" fill="#c48972"/>
    <path d="M53 43.2 Q60 47 67 43.2" stroke="#a45a55" fill="none" stroke-width="1.3" stroke-linecap="round"/>
  `:`<path d="M42 16 Q60 8 78 16 Q80 34 74 42 Q60 46 46 42 Q40 34 42 16" fill="#2b211c"/><path d="M60 70 L60 112" stroke="#b07d58" stroke-width="1.4"/>`;
  const base=`<defs><linearGradient id="${gid}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f3c9a6"/><stop offset="1" stop-color="#d7a07a"/></linearGradient></defs>
    <ellipse cx="60" cy="236" rx="28" ry="5" fill="#000" opacity=".15"/>
    <path d="M46 124 C40 158 40 188 38 214 C37 226 34 236 32 244 L50 246 C52 226 54 196 56 158 Z" fill="url(#${gid})"/>
    <path d="M74 124 C80 158 80 188 82 214 C83 226 86 236 88 244 L70 246 C68 226 66 196 64 158 Z" fill="url(#${gid})"/>
    <path d="M40 116 Q60 128 80 116 L86 146 Q60 156 34 146 Z" fill="${face?"#3b6cf0":"#243054"}"/>
    <path d="M38 54 Q30 78 34 112 Q60 124 86 112 Q90 78 82 54 Q60 46 38 54Z" fill="url(#${gid})" stroke="#8a624c" stroke-width=".6"/>
    <path d="M36 58 Q24 78 22 108 Q28 112 32 100 Q34 82 40 66 Z" fill="url(#${gid})"/>
    <path d="M84 58 Q96 78 98 108 Q92 112 88 100 Q86 82 80 66 Z" fill="url(#${gid})"/>
    <ellipse cx="60" cy="32" rx="16" ry="18" fill="url(#${gid})" stroke="#8a624c" stroke-width=".6"/>
    <rect x="54" y="46" width="12" height="12" rx="4" fill="url(#${gid})"/>${head}`;
  const hot=Object.keys(zones).map(k=>`<g class="${(hl||[]).includes(k)?"hz":"mz"}" ${click?`onclick="pickZone('${k}','${v}')"`:""}>${zones[k]}</g>`).join("");
  return `<svg viewBox="0 0 120 250" height="${h}" role="img" aria-label="${face?"Mannequin de face":"Mannequin de dos"}">${base}${hot}</svg>`;
}
function renderBody(){
  const faceOn=bv==="face", dosOn=bv==="dos", crOn=bt==="crampe", cbOn=bt==="courbature";
  $("#bodymap").innerHTML=`<p class="hint">Choisis la vue, puis touche une zone. Le bouton actif change de couleur.</p>
  <div class="twobtn">
    <button class="pick face ${faceOn?"on":""}" onclick="bv='face';renderBody()">Face</button>
    <button class="pick dos ${dosOn?"on":""}" onclick="bv='dos';renderBody()">Dos</button>
  </div>
  <div class="mannwrap">${mann(bv,[bz],280,true)}<div class="facebadge ${faceOn?"":"dos"}">${faceOn?"Vue de face — le visage est vers toi":"Vue de dos — nuque, sans visage"}</div></div>
  <p class="zoneName"><b>${bz?(NM[bz]||bz):"Touche une zone du corps"}</b></p>`
  +(bz?`<div class="twobtn">
    <button class="pick crampe ${crOn?"on":""}" onclick="bt='crampe';renderBody()">Crampe</button>
    <button class="pick courb ${cbOn?"on":""}" onclick="bt='courbature';renderBody()">Courbature</button>
  </div><button class="next" onclick="logSore()">Enregistrer cette douleur</button>`+advHTML():"");
}

function setWU(u){S.wu=u;save();const v=$("#wqty");const keep=v?v.value:"";rf();const n=$("#wqty");if(n&&keep)n.value=keep}
function addWaterCustom(){
  const q=parseFloat(String(($("#wqty")&&$("#wqty").value)||"").replace(",","."));
  if(!q||q<=0)return alert("Indique une quantité");
  const u=S.wu||"ml";
  const ml=u==="L"?Math.round(q*1000):Math.round(q);
  if(ml<10||ml>5000)return alert("Entre 10 ml et 5 L");
  addWater(ml);
}
function hydroHTML(){
  const w=wsum(),t=wtarget(),u=S.wu||"ml";
  return `<div class="meal"><div class="hydrotop">${ring(w/t,(w/1000).toFixed(2)+" L","/ "+(t/1000).toFixed(1)+" L","#4aa8ff")}<div><b>Hydratation</b><p>${w} ml aujourd’hui</p></div></div>
  <div class="form hydroform"><input id="wqty" inputmode="decimal" type="number" min="0" step="0.01" placeholder="Quantité" value="${u==="L"?"0.25":"250"}"><div class="unitog"><button type="button" class="${u==="ml"?"on":""}" onclick="setWU('ml')">ml</button><button type="button" class="${u==="L"?"on":""}" onclick="setWU('L')">L</button></div><button class="mainbtn" onclick="addWaterCustom()">Ajouter</button></div>
  <div class="twobtn"><button onclick="addWater(250)">+250 ml</button><button onclick="addWater(500)">+500 ml</button></div>
  <small><a onclick="undoWater()">Annuler le dernier</a> · <a onclick="setWt()">Objectif</a></small></div>`;
}

const FOODS=[
 {n:"pâtes cuites",k:131,p:5,a:["pates","spaghetti","penne","nouilles","tagliatelle","macaroni","coquillettes"]},
 {n:"riz cuit",k:130,p:2.7,a:["riz"]},
 {n:"quinoa cuit",k:120,p:4.4,a:["quinoa"]},
 {n:"semoule cuite",k:112,p:3.8,a:["semoule","couscous"]},
 {n:"pomme de terre",k:77,p:2,a:["pomme de terre","pommes de terre","patate","patates"]},
 {n:"patate douce",k:86,p:1.6,a:["patate douce","patates douces"]},
 {n:"pain",k:265,p:9,a:["pain","baguette","tartine"]},
 {n:"flocons d’avoine",k:367,p:14,a:["avoine","flocons","porridge"]},
 {n:"poulet",k:165,p:31,a:["poulet","blanc de poulet","filet de poulet","escalope de poulet"]},
 {n:"dinde",k:157,p:29,a:["dinde","escalope de dinde"]},
 {n:"bœuf",k:187,p:26,a:["boeuf","steak","bavette"]},
 {n:"steak haché 5%",k:137,p:26,a:["steak hache","viande hachee"]},
 {n:"jambon",k:115,p:21,a:["jambon"]},
 {n:"saumon",k:208,p:20,a:["saumon"]},
 {n:"thon",k:132,p:29,a:["thon"]},
 {n:"poisson blanc",k:82,p:18,a:["cabillaud","colin","poisson"]},
 {n:"œuf",k:155,p:13,a:["oeuf","oeufs"],each:60},
 {n:"légumes",k:35,p:2,a:["legume","legumes"]},
 {n:"brocoli",k:34,p:2.8,a:["brocoli"]},
 {n:"haricots verts",k:31,p:1.8,a:["haricot vert","haricots verts"]},
 {n:"courgette",k:17,p:1.2,a:["courgette","courgettes"]},
 {n:"carotte",k:41,p:0.9,a:["carotte","carottes"]},
 {n:"tomate",k:18,p:0.9,a:["tomate","tomates"]},
 {n:"salade",k:15,p:1.2,a:["salade","laitue"]},
 {n:"épinards",k:23,p:2.9,a:["epinard","epinards"]},
 {n:"avocat",k:160,p:2,a:["avocat"]},
 {n:"banane",k:89,p:1.1,a:["banane","bananes"],each:120},
 {n:"pomme",k:52,p:0.3,a:["pomme","pommes"],each:150},
 {n:"fromage blanc",k:63,p:7,a:["fromage blanc"]},
 {n:"skyr",k:97,p:10,a:["skyr","yaourt grec"]},
 {n:"yaourt",k:61,p:3.5,a:["yaourt"]},
 {n:"lait",k:46,p:3.3,a:["lait"]},
 {n:"fromage",k:380,p:29,a:["emmental","fromage"]},
 {n:"huile",k:884,p:0,a:["huile"]},
 {n:"beurre",k:717,p:0.7,a:["beurre"]},
 {n:"lentilles cuites",k:116,p:9,a:["lentille","lentilles"]},
 {n:"pois chiches",k:164,p:9,a:["pois chiche","pois chiches"]},
 {n:"chocolat",k:546,p:5,a:["chocolat"]}
];
function normFood(s){return String(s||"").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9 ]+/g," ").replace(/\s+/g," ").trim()}
function matchFood(name){
  const n=normFood(name).replace(/^(de |d |des |du |la |le |les |un |une )/g,"").trim();
  if(!n)return null;
  let best=null,score=0;
  FOODS.forEach(f=>f.a.forEach(a=>{
    const al=normFood(a);
    const hit=n===al||n.startsWith(al+" ")||n.endsWith(" "+al)||(" "+n+" ").includes(" "+al+" ");
    if(!hit)return;
    const sc=al.length+(n===al?30:0);
    if(sc>score){score=sc;best=f}
  }));
  return best;
}
function parseMealText(raw){
  const src=String(raw||"").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"");
  const parts=src.split(/\s*(?:,|;|\+|\/|\bet\b|\bavec\b|\bpuis\b)\s*|\s+(?=\d+(?:[.,]\d+)?\s*(?:kg|g|ml|cl|l)\b)/).map(s=>s.trim()).filter(Boolean);
  const items=[];
  parts.forEach(ch=>{
    const m=ch.match(/(\d+(?:[.,]\d+)?)\s*(kg|g|ml|cl|l|litre|litres)?\s*(?:de |d )?(.*)/);
    if(!m)return;
    const q=parseFloat(m[1].replace(",","."))||0;
    const u=(m[2]||"").toLowerCase();
    const food=matchFood(m[3]||"");
    if(!food||!q)return;
    let grams=q;
    if(u==="kg")grams=q*1000;
    else if(u==="l"||u==="litre"||u==="litres")grams=q*1000;
    else if(u==="cl")grams=q*10;
    else if(u==="ml")grams=q;
    else if(!u&&food.each)grams=q*food.each;
    items.push({n:food.n,q:Math.round(grams),u:(u==="ml"||u==="cl"||u==="l"||u.startsWith("litre"))?"ml":"g",k:food.k*grams/100,p:food.p*grams/100,label:(m[2]?m[1]+" "+m[2]:m[1]+(food.each?" pièce(s)":" g"))+" "+food.n});
  });
  return {items,kcal:items.reduce((a,x)=>a+x.k,0),prot:items.reduce((a,x)=>a+x.p,0)};
}
function previewMeal(){
  const box=$("#mealPrev"); if(!box)return;
  const raw=($("#mealFree")&&$("#mealFree").value||"").trim();
  if(!raw){box.innerHTML="<small>Exemple : 120g de pâtes, 200g de poulet et 300g de légumes</small>";return}
  const r=parseMealText(raw);
  if(!r.items.length){box.innerHTML="<small>Écris un poids devant chaque aliment, par exemple 120g de pâtes.</small>";return}
  box.innerHTML='<div class="breakdown">'+r.items.map(x=>`<div><span>${esc(x.label)}</span><b>${Math.round(x.k)} kcal · ${Math.round(x.p)} g</b></div>`).join("")+'</div><p class="totalK">Total : '+Math.round(r.kcal)+' kcal · '+Math.round(r.prot)+' g de protéines</p><small>Estimation pour 100 g. Pâtes et riz comptés cuits.</small>';
}
function addComposedMeal(){
  const raw=($("#mealFree")&&$("#mealFree").value||"").trim();
  if(!raw)return alert("Décris le repas avec les poids.");
  const r=parseMealText(raw);
  if(!r.items.length)return alert("Aucun aliment reconnu. Exemple : 120g de pâtes, 200g de poulet et 300g de légumes");
  logX(raw,Math.round(r.kcal),Math.round(r.prot));
  rf();
}
function mealsHTML(){
  const ex=S.extra[dk()]||[];
  return expBanner()+hydroHTML()+ktForm()+
  `<div class="meal mealbox"><h3>Composer le repas</h3><p>Un seul texte, avec les poids. Swish calcule tout d’un coup.</p><textarea id="mealFree" placeholder="120g de pâtes, 200g de poulet et 300g de légumes" oninput="previewMeal()"></textarea><div id="mealPrev"><small>Exemple : 120g de pâtes, 200g de poulet et 300g de légumes</small></div><button class="mainbtn full" onclick="addComposedMeal()">Calculer et compter ce repas</button></div>`+
  meals.map((m,i)=>`<div class="meal"><div class="mealhead"><div><small>${m[0]}</small><h4>${m[1]}</h4></div><b>${Math.round(m[2]*F())} kcal · ${Math.round(mealProt(m))} g prot</b></div><button class="mainbtn" onclick="eat(${i})">${(S.eat[dk()]||[]).includes(i)?"Mangé":"Marquer mangé"}</button><div class="ingredients">${m[3].map(x=>`<div class="ingredient"><span>${x[0]}</span><b>${scq(x[1])}</b></div>`).join("")}</div></div>`).join("")+
  `<div class="meal"><h3>Déjà compté aujourd’hui</h3>${ex.length?ex.map((e,i)=>`<div class="ingredient"><span>${esc(e.n)}</span><b>${e.k} kcal${e.p?" · "+e.p+" g":""} <a onclick="S.extra[dk()].splice(${i},1);save();rf()">Retirer</a></b></div>`).join(""):"<small>Rien pour le moment.</small>"}</div>`;
}
function renderShop(){
  const spent=S.shop.filter(x=>x.d).reduce((a,x)=>a+x.p,0);
  const total=S.shop.reduce((a,x)=>a+x.p,0);
  const left=S.shop.filter(x=>!x.d);
  $("#spent").textContent=spent.toFixed(2)+" €";
  $("#planned").textContent=left.length+" article"+(left.length>1?"s":"")+" à prendre · "+total.toFixed(2)+" € au total";
  $("#budgetBar").style.width=Math.min(100,spent/150*100)+"%";
  if(!S.shop.length){$("#shopList").innerHTML='<div class="shopcard"><div class="what">Liste vide</div><div class="qtyline">Ajoute un produit, ou le prévisionnel au-dessus.</div></div>';return}
  const card=o=>{const x=o.x,i=o.i;return `<article class="shopcard ${x.d?"done":""}"><div class="what">${esc(x.n)}</div><div class="qtyline">${esc(x.q)} ${esc(x.u)} à prendre</div><div class="meta"><span class="pill">${x.p?Number(x.p).toFixed(2)+" €":"Prix à remplir"}</span>${x.e?`<span class="pill">DLC ${esc(x.e)}</span>`:""}</div><div class="meta"><input class="qin" type="number" step=".01" value="${x.p}" aria-label="Prix de ${esc(x.n)}" onchange="S.shop[${i}].p=+this.value;S.prices[S.shop[${i}].n]=+this.value;save();renderShop()"><input class="qin" type="date" value="${x.e||""}" aria-label="Date" onchange="S.shop[${i}].e=this.value;save()"></div><div class="rowbtns"><button class="buybtn ${x.d?"ok":"todo"}" onclick="buy(${i})">${x.d?"Acheté":"Marquer acheté"}</button><button class="del" aria-label="Supprimer ${esc(x.n)}" onclick="delShop(${i})">✕</button></div></article>`};
  const pending=S.shop.map((x,i)=>({x,i})).filter(o=>!o.x.d);
  const done=S.shop.map((x,i)=>({x,i})).filter(o=>o.x.d);
  $("#shopList").innerHTML=(pending.length?`<div class="head"><h3>À acheter</h3><small>${pending.length}</small></div>`+pending.map(card).join(""):"")+ (done.length?`<div class="head"><h3>Déjà pris</h3><small>${done.length}</small></div>`+done.map(card).join(""):"");
}
function renderPrev(){
  const ns=needs(pd),budget=ns.filter(o=>o.need&&S.shopSel[o.n]!==false).reduce((a,o)=>a+o.cost,0);
  $("#prev").innerHTML=`<div class="add"><div class="head" style="margin-top:0"><h3>À prévoir</h3><small>${pd} jours</small></div>
  <div class="twobtn"><button class="pick face ${pd==3?"on":""}" onclick="pd=3;renderPrev()">3 jours</button><button class="pick face ${pd==7?"on":""}" onclick="pd=7;renderPrev()">7 jours</button></div>
  <p class="hint">Sélection : environ ${budget.toFixed(2)} €. Chaque ligne dit l’aliment et la quantité.</p>
  ${ns.map(o=>`<label class="needcard"><input type="checkbox" ${o.need&&S.shopSel[o.n]!==false?"checked":""} ${o.need?"":"disabled"} onchange="toggleNeed(${JSON.stringify(o.n)})"><div><b>${esc(o.n)}</b><small>${o.need?("Acheter "+o.need+" "+o.u+" · besoin "+o.q+" "+o.u+" · ≈"+o.cost.toFixed(2)+" €"):"Déjà en stock · besoin "+o.q+" "+o.u}</small></div></label>`).join("")}
  <div class="twobtn"><button class="mainbtn" onclick="addNeeds(true)">Ajouter la sélection</button><button onclick="addNeeds(false)">Tout ajouter</button></div></div>`;
}
function applyTheme(){
  try{
    const t=S.theme||"auto";
    const l=t==="light"||(t==="auto"&&window.matchMedia&&matchMedia("(prefers-color-scheme: light)").matches);
    document.documentElement.classList.toggle("light",!!l);
    const m=document.querySelector('meta[name="theme-color"]');
    if(m)m.content=l?"#f6f1ea":"#12100f";
  }catch(e){}
}
consumeFriendLink();
if($("#bodymap"))renderBody();

/* Swish — historique, eau, rayons, sauvegarde */
function soreMap(){
  const map={};
  const now=new Date(dk()+"T12:00:00");
  (S.sore||[]).forEach(s=>{
    if(!s||!s.k||!s.d)return;
    const days=Math.round((now-new Date(s.d+"T12:00:00"))/864e5);
    if(days<0||days>14)return;
    const level=days<=3?"recent":"old";
    if(!map[s.k]||level==="recent")map[s.k]={level,t:s.t,d:s.d,days};
  });
  return map;
}
function soreListHTML(){
  const rows=(S.sore||[]).filter(s=>{
    const days=Math.round((new Date(dk()+"T12:00:00")-new Date(s.d+"T12:00:00"))/864e5);
    return days>=0&&days<=14;
  }).slice().reverse();
  if(!rows.length)return "<small>Aucune douleur sur les 14 derniers jours.</small>";
  return rows.slice(0,8).map(s=>{
    const days=Math.round((new Date(dk()+"T12:00:00")-new Date(s.d+"T12:00:00"))/864e5);
    const when=days===0?"aujourd’hui":days===1?"hier":"il y a "+days+" j";
    return `<div class="ingredient"><span>${esc(NM[s.k]||s.k)} · ${esc(s.t||"")}</span><b>${when}</b></div>`;
  }).join("");
}
function mann(v,hl,h,click){
  const face=v!=="dos";
  const hist=soreMap();
  const zones=face?{
    tr:'<ellipse cx="60" cy="54" rx="16" ry="6"/>',
    de:'<ellipse cx="34" cy="64" rx="9" ry="7"/><ellipse cx="86" cy="64" rx="9" ry="7"/>',
    pe:'<ellipse cx="60" cy="80" rx="14" ry="10"/>',
    bi:'<ellipse cx="28" cy="88" rx="6" ry="12"/><ellipse cx="92" cy="88" rx="6" ry="12"/>',
    av:'<ellipse cx="24" cy="112" rx="5.5" ry="11"/><ellipse cx="96" cy="112" rx="5.5" ry="11"/>',
    ab:'<ellipse cx="60" cy="104" rx="9" ry="11"/>',
    ob:'<ellipse cx="46" cy="104" rx="5" ry="11"/><ellipse cx="74" cy="104" rx="5" ry="11"/>',
    ad:'<ellipse cx="53" cy="134" rx="5" ry="10"/><ellipse cx="67" cy="134" rx="5" ry="10"/>',
    qu:'<ellipse cx="48" cy="158" rx="8" ry="16"/><ellipse cx="72" cy="158" rx="8" ry="16"/>',
    ge:'<ellipse cx="47" cy="178" rx="5" ry="5"/><ellipse cx="73" cy="178" rx="5" ry="5"/>',
    ti:'<ellipse cx="46" cy="202" rx="5.5" ry="14"/><ellipse cx="74" cy="202" rx="5.5" ry="14"/>',
    pi:'<ellipse cx="44" cy="230" rx="8" ry="5"/><ellipse cx="76" cy="230" rx="8" ry="5"/>'
  }:{
    tr:'<ellipse cx="60" cy="54" rx="16" ry="6"/>',
    de:'<ellipse cx="34" cy="64" rx="9" ry="7"/><ellipse cx="86" cy="64" rx="9" ry="7"/>',
    da:'<path d="M46 70 Q60 76 74 70 L76 104 Q60 110 44 104 Z"/>',
    lo:'<ellipse cx="60" cy="114" rx="12" ry="7"/>',
    tc:'<ellipse cx="28" cy="88" rx="6" ry="12"/><ellipse cx="92" cy="88" rx="6" ry="12"/>',
    av:'<ellipse cx="24" cy="112" rx="5.5" ry="11"/><ellipse cx="96" cy="112" rx="5.5" ry="11"/>',
    fe:'<ellipse cx="48" cy="134" rx="10" ry="9"/><ellipse cx="72" cy="134" rx="10" ry="9"/>',
    is:'<ellipse cx="48" cy="164" rx="8" ry="16"/><ellipse cx="72" cy="164" rx="8" ry="16"/>',
    mo:'<ellipse cx="46" cy="204" rx="5.5" ry="14"/><ellipse cx="74" cy="204" rx="5.5" ry="14"/>',
    pi:'<ellipse cx="44" cy="230" rx="8" ry="5"/><ellipse cx="76" cy="230" rx="8" ry="5"/>'
  };
  const gid="sk"+Math.random().toString(36).slice(2,7);
  const head=face?`<path d="M42 20 Q60 6 78 20 Q80 14 60 11 Q40 14 42 20" fill="#2b211c"/><ellipse cx="46" cy="33" rx="3" ry="4" fill="#e7b892"/><ellipse cx="74" cy="33" rx="3" ry="4" fill="#e7b892"/><path d="M47 27 Q52 25 56 27.5" stroke="#4a342c" fill="none" stroke-width="1.1" stroke-linecap="round"/><path d="M64 27.5 Q68 25 73 27" stroke="#4a342c" fill="none" stroke-width="1.1" stroke-linecap="round"/><ellipse cx="51.5" cy="32.5" rx="2.3" ry="2.7" fill="#1b140f"/><ellipse cx="68.5" cy="32.5" rx="2.3" ry="2.7" fill="#1b140f"/><circle cx="52.2" cy="31.6" r=".7" fill="#fff"/><circle cx="69.2" cy="31.6" r=".7" fill="#fff"/><path d="M60 35 L58.2 39.2 Q60 40.8 61.8 39.2 Z" fill="#c48972"/><path d="M53 43.2 Q60 47 67 43.2" stroke="#a45a55" fill="none" stroke-width="1.3" stroke-linecap="round"/>`:`<path d="M42 16 Q60 8 78 16 Q80 34 74 42 Q60 46 46 42 Q40 34 42 16" fill="#2b211c"/><path d="M60 70 L60 112" stroke="#b07d58" stroke-width="1.4"/>`;
  const base=`<defs><linearGradient id="${gid}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f3c9a6"/><stop offset="1" stop-color="#d7a07a"/></linearGradient></defs>
    <ellipse cx="60" cy="236" rx="28" ry="5" fill="#000" opacity=".15"/>
    <path d="M46 124 C40 158 40 188 38 214 C37 226 34 236 32 244 L50 246 C52 226 54 196 56 158 Z" fill="url(#${gid})"/>
    <path d="M74 124 C80 158 80 188 82 214 C83 226 86 236 88 244 L70 246 C68 226 66 196 64 158 Z" fill="url(#${gid})"/>
    <path d="M40 116 Q60 128 80 116 L86 146 Q60 156 34 146 Z" fill="${face?"#3b6cf0":"#243054"}"/>
    <path d="M38 54 Q30 78 34 112 Q60 124 86 112 Q90 78 82 54 Q60 46 38 54Z" fill="url(#${gid})" stroke="#8a624c" stroke-width=".6"/>
    <path d="M36 58 Q24 78 22 108 Q28 112 32 100 Q34 82 40 66 Z" fill="url(#${gid})"/>
    <path d="M84 58 Q96 78 98 108 Q92 112 88 100 Q86 82 80 66 Z" fill="url(#${gid})"/>
    <ellipse cx="60" cy="32" rx="16" ry="18" fill="url(#${gid})" stroke="#8a624c" stroke-width=".6"/>
    <rect x="54" y="46" width="12" height="12" rx="4" fill="url(#${gid})"/>${head}`;
  const hot=Object.keys(zones).map(k=>{
    const on=(hl||[]).includes(k);
    const cls=on?"hz":(hist[k]?hist[k].level:"mz");
    return `<g class="${cls}" ${click?`onclick="pickZone('${k}','${v}')"`:""}>${zones[k]}</g>`;
  }).join("");
  return `<svg viewBox="0 0 120 250" height="${h}" role="img" aria-label="${face?"Mannequin de face":"Mannequin de dos"}">${base}${hot}</svg>`;
}
function renderBody(){
  const faceOn=bv==="face", dosOn=bv==="dos", crOn=bt==="crampe", cbOn=bt==="courbature";
  $("#bodymap").innerHTML=`<p class="hint">Rouge : douleur des 3 derniers jours. Orange : les 14 derniers jours.</p>
  <div class="twobtn">
    <button class="pick face ${faceOn?"on":""}" onclick="bv='face';renderBody()">Face</button>
    <button class="pick dos ${dosOn?"on":""}" onclick="bv='dos';renderBody()">Dos</button>
  </div>
  <div class="mannwrap">${mann(bv,[bz],280,true)}<div class="facebadge ${faceOn?"":"dos"}">${faceOn?"Vue de face — le visage est vers toi":"Vue de dos — nuque, sans visage"}</div></div>
  <p class="zoneName"><b>${bz?(NM[bz]||bz):"Touche une zone du corps"}</b></p>`
  +(bz?`<div class="twobtn">
    <button class="pick crampe ${crOn?"on":""}" onclick="bt='crampe';renderBody()">Crampe</button>
    <button class="pick courb ${cbOn?"on":""}" onclick="bt='courbature';renderBody()">Courbature</button>
  </div><button class="next" onclick="logSore()">Enregistrer cette douleur</button>`+advHTML():"")
  +`<div class="meal"><b>14 derniers jours</b>${soreListHTML()}</div>`+waterRemindHTML();
}
function waterLeft(){return Math.max(0,wtarget()-wsum())}
function waterRemindHTML(){
  const left=waterLeft(), h=new Date().getHours();
  if(left<50)return `<div class="meal waterok"><b>Hydratation</b><p>Objectif atteint. ${wsum()} ml aujourd’hui.</p></div>`;
  const msg=h>=16?`Il te reste ${(left/1000).toFixed(1)} L avant ce soir.`:`Encore ${(left/1000).toFixed(1)} L pour l’objectif.`;
  return `<div class="meal waterwarn"><b>Rappel d’eau</b><p>${msg}</p><button class="mainbtn" onclick="addWater(250);if($('#bodymap'))renderBody()">+250 ml</button></div>`;
}
function aisleOf(n){
  const s=normFood(n);
  const rules=[["Fruits et légumes",/pomme|banane|tomate|salade|legume|brocoli|carotte|courgette|avocat|epinard|poivron|fraise|fruit|pdt|patate/],["Frais",/lait|yaourt|fromage|oeuf|poulet|dinde|boeuf|porc|jambon|saumon|thon|poisson|crevette|viande|skyr|beurre|yaourt/],["Surgelés",/surgel|glace|pizza/],["Boissons",/eau|jus|soda|boisson/],["Épicerie",/pate|riz|quinoa|semoule|pain|avoine|huile|lentille|pois|chocolat|miel|conserve|farine|sucre|thon/],["Maison",/lessive|savon|papier|essuie|shampoing|gel douche/]];
  for(const [a,re] of rules)if(re.test(s))return a;
  return "Autre";
}
function renderShop(){
  const spent=S.shop.filter(x=>x.d).reduce((a,x)=>a+x.p,0);
  const total=S.shop.reduce((a,x)=>a+x.p,0);
  const left=S.shop.filter(x=>!x.d);
  $("#spent").textContent=spent.toFixed(2)+" €";
  $("#planned").textContent=left.length+" article"+(left.length>1?"s":"")+" à prendre · "+total.toFixed(2)+" € au total";
  $("#budgetBar").style.width=Math.min(100,spent/150*100)+"%";
  if(!S.shop.length){$("#shopList").innerHTML='<div class="shopcard"><div class="what">Liste vide</div><div class="qtyline">Ajoute un produit, ou le prévisionnel au-dessus.</div></div>';return}
  const card=o=>{const x=o.x,i=o.i;return `<article class="shopcard ${x.d?"done":""}" data-aisle="${esc(aisleOf(x.n))}"><div class="what">${esc(x.n)}</div><div class="qtyline">${esc(x.q)} ${esc(x.u)} à prendre</div><div class="meta"><span class="pill">${esc(aisleOf(x.n))}</span><span class="pill">${x.p?Number(x.p).toFixed(2)+" €":"Prix à remplir"}</span>${x.e?`<span class="pill">DLC ${esc(x.e)}</span>`:""}</div><div class="meta"><input class="qin" type="number" step=".01" value="${x.p}" aria-label="Prix de ${esc(x.n)}" onchange="S.shop[${i}].p=+this.value;S.prices[S.shop[${i}].n]=+this.value;save();renderShop()"><input class="qin" type="date" value="${x.e||""}" aria-label="Date" onchange="S.shop[${i}].e=this.value;save()"></div><div class="rowbtns"><button class="buybtn ${x.d?"ok":"todo"}" onclick="buy(${i})">${x.d?"Acheté":"Marquer acheté"}</button><button class="del" aria-label="Supprimer ${esc(x.n)}" onclick="delShop(${i})">✕</button></div></article>`};
  const order=["Fruits et légumes","Frais","Épicerie","Surgelés","Boissons","Maison","Autre"];
  const group=rows=>{
    const by={};
    rows.forEach(o=>{(by[aisleOf(o.x.n)]=by[aisleOf(o.x.n)]||[]).push(o)});
    return order.filter(a=>by[a]).map(a=>`<div class="head"><h3>${a}</h3><small>${by[a].length}</small></div>`+by[a].map(card).join("")).join("");
  };
  const pending=S.shop.map((x,i)=>({x,i})).filter(o=>!o.x.d);
  const done=S.shop.map((x,i)=>({x,i})).filter(o=>o.x.d);
  $("#shopList").innerHTML=(pending.length?`<div class="head"><h3>À acheter</h3><small>${pending.length}</small></div>`+group(pending):"")+(done.length?`<div class="head"><h3>Déjà pris</h3><small>${done.length}</small></div>`+group(done):"");
}
function exportSwish(){
  const blob=new Blob([JSON.stringify(S,null,2)],{type:"application/json"});
  const a=document.createElement("a");
  a.href=URL.createObjectURL(blob);
  a.download="swish-sauvegarde.json";
  a.click();
  setTimeout(()=>URL.revokeObjectURL(a.href),1000);
}
function importSwish(input){
  const f=input.files&&input.files[0];
  if(!f)return;
  const r=new FileReader();
  r.onload=()=>{
    try{
      const o=JSON.parse(r.result);
      if(!o||typeof o!=="object"||Array.isArray(o))throw 0;
      if(!confirm("Remplacer les données de cet appareil par ce fichier ?"))return;
      localStorage.setItem("sp11",JSON.stringify(o));
      location.reload();
    }catch(e){alert("Fichier illisible. Il faut une sauvegarde Swish.")}
  };
  r.readAsText(f);
}
(function(){
  const base=renderSettings;
  renderSettings=function(){
    base();
    const box=$("#setx");
    if(!box||box.querySelector("#backupBox"))return;
    box.insertAdjacentHTML("beforeend",`<h3 style="margin-top:14px">Fichier de sauvegarde</h3><p>Un fichier JSON pour changer de téléphone. Les copies automatiques restent sur cet appareil.</p><div id="backupBox" class="twobtn"><button class="mainbtn" onclick="exportSwish()">Exporter</button><button class="next" onclick="document.getElementById('importf').click()">Importer</button></div><input id="importf" type="file" accept="application/json,.json" style="display:none" onchange="importSwish(this)">`);
  };
  const baseAlerts=alerts;
  alerts=function(){
    baseAlerts();
    const el=$("#alerts"); if(!el)return;
    const left=waterLeft(), h=new Date().getHours();
    if(h>=16&&left>=200){
      const msg="Il te reste "+(left/1000).toFixed(1)+" L pour l’objectif du jour.";
      el.insertAdjacentHTML("afterbegin",`<div class="meal waterwarn"><small>💧 ${msg}</small></div>`);
      notifyOnce(msg);
    }
  };
})();
if($("#bodymap"))renderBody();

/* Schémas anatomiques, drive, recettes stock, agenda */
const ZFACE={
  tr:[38,18,24,7],de:[18,24,16,8],pe:[38,27,24,9],bi:[12,30,14,12],av:[10,42,12,10],
  ab:[40,36,20,12],ob:[30,36,10,12],ad:[40,50,20,8],qu:[28,54,18,14],ge:[30,68,14,6],
  ti:[32,74,14,12],pi:[30,88,16,6]
};
const ZDOS={
  tr:[36,16,28,7],de:[16,22,16,8],da:[34,26,32,14],lo:[38,42,24,8],tc:[12,30,14,12],
  av:[10,42,12,10],fe:[30,48,18,10],is:[30,58,16,14],mo:[32,74,14,12],pi:[30,88,16,6]
};
function zoneBtn(k,box,on,hist){
  const cls=on?"zonelit hz":hist&&hist[k]?("zonelit "+hist[k].level):"zonelit";
  return `<button class="${cls}" style="left:${box[0]}%;top:${box[1]}%;width:${box[2]}%;height:${box[3]}%" onclick="pickZone('${k}',bv)" aria-label="${NM[k]||k}"></button>`;
}
function mann(v,hl,h,click){
  const face=v!=="dos";
  const hist=soreMap();
  const map=face?ZFACE:ZDOS;
  const src=face?"anat-face.jpg":"anat-dos.jpg";
  const hot=Object.keys(map).map(k=>zoneBtn(k,map[k],(hl||[]).includes(k),hist)).join("");
  return `<div class="anat" style="height:${h}px"><img src="${src}" alt="${face?"Anatomie de face":"Anatomie de dos"}">${hot}</div>`;
}
function fig(p,h,m){
  const name=p||"mouvement";
  const muscles=(m&&typeof mu==="function")?"":"";
  return `<div class="demofig" style="min-height:${h}px"><img src="anat-face.jpg" alt=""><span>Zone travaillée</span></div>`;
}
function demoFig(name){
  const key=(XM[name]||"q")[0];
  const label=mu(name);
  const box={q:[30,52,40,18],c:[32,70,36,16],a:[36,34,28,14],b:[12,28,18,16],g:[30,46,40,12],p:[36,26,28,10]}[key]||[34,34,32,16];
  const q=encodeURIComponent(name+" exercice démonstration");
  return `<div class="demofig"><img src="anat-face.jpg" alt="Schéma ${esc(name)}"><i style="left:${box[0]}%;top:${box[1]}%;width:${box[2]}%;height:${box[3]}%"></i><b>${esc(label)}</b><a href="https://www.youtube.com/results?search_query=${q}" target="_blank" rel="noopener">Vidéo de démo</a></div>`;
}
(function(){
  const baseShow=showEx;
  showEx=function(){
    baseShow();
    document.querySelectorAll("#brief .bx, #player .bx").forEach(bx=>{
      const b=bx.querySelector("b");
      if(!b||bx.querySelector(".demofig"))return;
      const old=bx.querySelector("svg");
      if(old)old.remove();
      bx.insertAdjacentHTML("afterbegin", demoFig(b.textContent.trim()));
    });
  };
})();
function renderBody(){
  const faceOn=bv==="face", dosOn=bv==="dos", crOn=bt==="crampe", cbOn=bt==="courbature";
  $("#bodymap").innerHTML=`<p class="hint">Planche anatomique. La zone en surbrillance est celle travaillée, douloureuse, ou touchée.</p>
  <div class="twobtn">
    <button class="pick face ${faceOn?"on":""}" onclick="bv='face';renderBody()">Face</button>
    <button class="pick dos ${dosOn?"on":""}" onclick="bv='dos';renderBody()">Dos</button>
  </div>
  <div class="mannwrap">${mann(bv,[bz],420,true)}<div class="facebadge ${faceOn?"":"dos"}">${faceOn?"Face — visage vers toi":"Dos — nuque, sans visage"}</div></div>
  <p class="zoneName"><b>${bz?(NM[bz]||bz):"Touche un muscle"}</b></p>`
  +(bz?`<div class="twobtn">
    <button class="pick crampe ${crOn?"on":""}" onclick="bt='crampe';renderBody()">Crampe</button>
    <button class="pick courb ${cbOn?"on":""}" onclick="bt='courbature';renderBody()">Courbature</button>
  </div><button class="next" onclick="logSore()">Enregistrer cette douleur</button>`+advHTML():"")
  +`<div class="meal"><b>14 derniers jours</b>${soreListHTML()}</div>`+waterRemindHTML();
}
function driveMap(){return {
  carrefour:{n:"Carrefour Drive",u:q=>"https://www.carrefour.fr/s?q="+encodeURIComponent(q)},
  leclerc:{n:"E.Leclerc",u:q=>"https://www.e.leclerc/recherche?q="+encodeURIComponent(q)},
  auchan:{n:"Auchan Drive",u:q=>"https://www.auchan.fr/recherche?text="+encodeURIComponent(q)},
  intermarche:{n:"Intermarché",u:q=>"https://www.intermarche.com/rechercheproduits/"+encodeURIComponent(q)}
};};
function missingFoods(){
  const names=[];
  (S.shop||[]).filter(x=>!x.d).forEach(x=>names.push(x.n+" · "+x.q+" "+x.u));
  lowItems().forEach(x=>{if(!names.some(n=>n.toLowerCase().includes(String(x.n).toLowerCase())))names.push(x.n)});
  return names;
}
function driveHTML(){
  const d=S.drive||"carrefour";
  const miss=missingFoods();
  return `<div class="meal"><b>Drive</b><p>Ouvre la recherche de chaque aliment manquant dans ton enseigne. Le panier se remplit sur leur site, pas depuis Swish.</p>
  <div class="tabs">${Object.entries(driveMap()).map(([k,v])=>`<button class="${d===k?"sel":""}" onclick="S.drive='${k}';save();renderShop()">${v.n}</button>`).join("")}</div>
  ${miss.length?miss.map(n=>`<div class="ingredient"><span>${esc(n.split(" · ")[0])}</span><a target="_blank" rel="noopener" href="${driveMap()[d].u(n.split(" · ")[0])}">Chercher</a></div>`).join("")+"<button class=\"mainbtn full\" onclick=\"openDriveAll()\">Ouvrir les recherches manquantes</button>":"<small>Rien à commander : le stock couvre la liste.</small>"}</div>`;
}
function openDriveAll(){
  const d=driveMap()[S.drive||"carrefour"];
  const names=[...new Set(missingFoods().map(n=>n.split(" · ")[0]))].slice(0,6);
  if(!names.length)return alert("Aucun aliment manquant");
  names.forEach(n=>window.open(d.u(n),"_blank"));
}
function stockRecipes(){
  return RC.map((r,i)=>({r,i})).filter(o=>o.r[4]&&o.r[4].length&&o.r[4].every(x=>have(x[0])));
}
function inventFromStock(){
  const p=S.pantry.filter(x=>x.q&&x.q!=="0");
  if(p.length<2)return null;
  const names=p.map(x=>x.n);
  const prot=names.find(n=>/poulet|oeuf|œuf|thon|saumon|viande|jambon|skyr|fromage/i.test(n))||names[0];
  const carb=names.find(n=>/p[aâ]te|riz|pain|avoine|semoule|pomme de terre/i.test(n))||names[1];
  const veg=names.find(n=>/légume|legume|brocoli|courgette|salade|tomate|carotte/i.test(n));
  const ing=[[prot,150,"g"],[carb,120,"g"]];
  if(veg)ing.push([veg,200,"g"]);
  return ["Assiette du stock", "15 min", 0, ["Sors les aliments déjà en stock.","Pèse les portions.","Cuisson simple : poêle ou casserole, sans ajout inutile."], ing];
}
function showStockMeals(){
  const ok=stockRecipes();
  const box=$("#foodBox");
  if(!box)return;
  if(!ok.length){
    const made=inventFromStock();
    if(!made){box.insertAdjacentHTML("afterbegin",'<div class="meal"><b>Aucune recette en stock</b><p>Ajoute au moins deux aliments dans Mon stock.</p></div>');return}
    const kcal=made[4].reduce((s,x)=>{const f=matchFood(x[0]);return s+(f?f.k*x[1]/100:80)},0);
    box.insertAdjacentHTML("afterbegin",`<div class="meal"><b>Aucune recette complète en stock</b><p>Swish en propose une avec ce que tu as.</p><h4>${esc(made[0])}</h4><p>≈ ${Math.round(kcal)} kcal</p><div class="ingredients">${made[4].map(x=>`<div class="ingredient"><span>${esc(x[0])}</span><b>${x[1]} ${x[2]}</b></div>`).join("")}</div><ol>${made[3].map(t=>`<li>${esc(t)}</li>`).join("")}</ol><button class="mainbtn" onclick="logX('${esc(made[0])}',${Math.round(kcal)},30);rf()">Compter cette assiette</button></div>`);
    return;
  }
  box.insertAdjacentHTML("afterbegin",`<div class="meal"><b>Recettes possibles avec le stock</b>${ok.map(o=>`<button class="next" onclick="openRecipe(${o.i})">${esc(o.r[0])}</button>`).join("")}</div>`);
}
function mealsHTML(){
  const ex=S.extra[dk()]||[];
  return expBanner()+hydroHTML()+ktForm()+
  `<div class="meal mealbox"><h3>Composer le repas</h3><p>Un seul texte, avec les poids. Swish calcule tout d’un coup.</p><textarea id="mealFree" placeholder="120g de pâtes, 200g de poulet et 300g de légumes" oninput="previewMeal()"></textarea><div id="mealPrev"><small>Exemple : 120g de pâtes, 200g de poulet et 300g de légumes</small></div><button class="mainbtn full" onclick="addComposedMeal()">Calculer et compter ce repas</button><button class="next" onclick="showStockMeals()">Recettes avec mon stock</button></div>`+
  meals.map((m,i)=>`<div class="meal"><div class="mealhead"><div><small>${m[0]}</small><h4>${m[1]}</h4></div><b>${Math.round(m[2]*F())} kcal · ${Math.round(mealProt(m))} g prot</b></div><button class="mainbtn" onclick="eat(${i})">${(S.eat[dk()]||[]).includes(i)?"Mangé":"Marquer mangé"}</button><div class="ingredients">${m[3].map(x=>`<div class="ingredient"><span>${x[0]}</span><b>${scq(x[1])}</b></div>`).join("")}</div></div>`).join("")+
  `<div class="meal"><h3>Déjà compté aujourd’hui</h3>${ex.length?ex.map((e,i)=>`<div class="ingredient"><span>${esc(e.n)}</span><b>${e.k} kcal${e.p?" · "+e.p+" g":""} <a onclick="S.extra[dk()].splice(${i},1);save();rf()">Retirer</a></b></div>`).join(""):"<small>Rien pour le moment.</small>"}</div>`;
}
function renderShop(){
  const spent=S.shop.filter(x=>x.d).reduce((a,x)=>a+x.p,0);
  const total=S.shop.reduce((a,x)=>a+x.p,0);
  const left=S.shop.filter(x=>!x.d);
  $("#spent").textContent=spent.toFixed(2)+" €";
  $("#planned").textContent=left.length+" article"+(left.length>1?"s":"")+" à prendre · "+total.toFixed(2)+" € au total";
  $("#budgetBar").style.width=Math.min(100,spent/150*100)+"%";
  const card=o=>{const x=o.x,i=o.i;return `<article class="shopcard ${x.d?"done":""}"><div class="what">${esc(x.n)}</div><div class="qtyline">${esc(x.q)} ${esc(x.u)} à prendre</div><div class="meta"><span class="pill">${esc(aisleOf(x.n))}</span><span class="pill">${x.p?Number(x.p).toFixed(2)+" €":"Prix à remplir"}</span></div><div class="rowbtns"><button class="buybtn ${x.d?"ok":"todo"}" onclick="buy(${i})">${x.d?"Acheté":"Marquer acheté"}</button><button class="del" onclick="delShop(${i})">✕</button></div></article>`};
  const order=["Fruits et légumes","Frais","Épicerie","Surgelés","Boissons","Maison","Autre"];
  const group=rows=>{const by={};rows.forEach(o=>{(by[aisleOf(o.x.n)]=by[aisleOf(o.x.n)]||[]).push(o)});return order.filter(a=>by[a]).map(a=>`<div class="head"><h3>${a}</h3><small>${by[a].length}</small></div>`+by[a].map(card).join("")).join("")};
  const pending=S.shop.map((x,i)=>({x,i})).filter(o=>!o.x.d);
  const done=S.shop.map((x,i)=>({x,i})).filter(o=>o.x.d);
  $("#shopList").innerHTML=driveHTML()+(pending.length?`<div class="head"><h3>À acheter</h3><small>${pending.length}</small></div>`+group(pending):'<div class="shopcard"><div class="what">Liste vide</div><div class="qtyline">Le drive ci-dessus prend aussi le stock bas.</div></div>')+(done.length?`<div class="head"><h3>Déjà pris</h3><small>${done.length}</small></div>`+group(done):"");
}
function addMin(t,m){const p=t.split(":").map(Number);const x=p[0]*60+p[1]+m;return String(Math.floor((x%1440)/60)).padStart(2,"0")+":"+String(x%60).padStart(2,"0")}
function trainWhen(){
  const end=S.workEnd||"17:30";
  const before=S.trainWhen==="avant";
  return before?{s:addMin(S.workStart||"08:30",-75),e:addMin(S.workStart||"08:30",-15)}:{s:addMin(end,45),e:addMin(end,105)};
}
function workHTML(){
  const days=["Lun","Mar","Mer","Jeu","Ven","Sam","Dim"];
  S.workDays=S.workDays||[1,1,1,1,1,0,0];
  const slot=trainWhen();
  return `<div class="meal" id="workbox"><b>Travail et séance</b><p>Swish place la séance avant ou après le travail, puis l’ajoute à l’agenda chaque semaine.</p>
  <div class="form" style="grid-template-columns:1fr 1fr"><label>Début<input id="wstart" type="time" value="${S.workStart||"08:30"}"></label><label>Fin<input id="wend" type="time" value="${S.workEnd||"17:30"}"></label></div>
  <div class="twobtn"><button class="pick ${(S.trainWhen||"apres")==="apres"?"on face":""}" onclick="S.trainWhen='apres';save();paintWork()">Après le travail</button><button class="pick ${S.trainWhen==="avant"?"on face":""}" onclick="S.trainWhen='avant';save();paintWork()">Avant le travail</button></div>
  <div class="daypicks">${days.map((d,i)=>`<button class="pick ${S.workDays[i]?"on":""}" onclick="S.workDays[${i}]=S.workDays[${i}]?0:1;save();paintWork()">${d}</button>`).join("")}</div>
  <p>Séance proposée : ${slot.s}–${slot.e}, les jours travaillés.</p>
  <button class="mainbtn full" onclick="saveWork()">Enregistrer ces horaires</button>
  <button class="next" onclick="addTrainCalendar()">Ajouter à l’agenda, chaque semaine</button></div>`;
}
function paintWork(){const p=$("#plan");if(!p)return;const old=$("#workbox");if(old)old.outerHTML=workHTML();else p.insertAdjacentHTML("afterbegin",workHTML())}
function saveWork(){
  S.workStart=$("#wstart").value||"08:30";
  S.workEnd=$("#wend").value||"17:30";
  save();paintWork();
}
function addTrainCalendar(){
  saveWork();
  const slot=trainWhen();
  const by=["MO","TU","WE","TH","FR","SA","SU"].filter((d,i)=>S.workDays[i]);
  if(!by.length)return alert("Choisis au moins un jour travaillé");
  const title="Séance Swish";
  const details="Séance planifiée autour de tes horaires de travail.";
  const start=slot.s.replace(":","");
  const end=slot.e.replace(":","");
  const g=`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&details=${encodeURIComponent(details)}&dates=20261005T${start}00/20261005T${end}00&recur=${encodeURIComponent("RRULE:FREQ=WEEKLY;BYDAY="+by.join(","))}`;
  const ics=`BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nSUMMARY:${title}\nDTSTART:20261005T${start}00\nDTEND:20261005T${end}00\nRRULE:FREQ=WEEKLY;BYDAY=${by.join(",")}\nDESCRIPTION:${details}\nEND:VEVENT\nEND:VCALENDAR`;
  const a=document.createElement("a");
  a.href=URL.createObjectURL(new Blob([ics],{type:"text/calendar"}));
  a.download="swish-seance.ics";
  a.click();
  window.open(g,"_blank");
}
paintWork();
if($("#bodymap"))renderBody();

/* Correctifs séance, santé, courses, kcal, coucher, rappel */
function editKcal(){
  const cur=S.kt||PLAN;
  const v=parseFloat(String(prompt("Objectif de calories par jour", cur)).replace(",","."));
  if(!v)return;
  if(v<1500||v>5000)return alert("Choisis entre 1500 et 5000 kcal");
  S.kt=Math.round(v);save();rf();
}
function saveWake(){
  const w=$("#wakeNext")&&$("#wakeNext").value;
  if(!w)return alert("Indique l’heure de réveil de demain");
  S.wakeNext=w;save();
  const bed=bedtime(w,8);
  const el=$("#bedadvice");
  if(el)el.innerHTML="Pour 8 h de sommeil et un réveil à <b>"+w+"</b>, couche-toi vers <b>"+bed+"</b>.";
}
function fig(p,h){
  return `<svg class="pose" viewBox="0 0 80 110" height="${h||72}" aria-hidden="true"><ellipse cx="40" cy="16" rx="9" ry="10" fill="#e7b892"/><circle cx="37" cy="15" r="1.2" fill="#1b140f"/><circle cx="43" cy="15" r="1.2" fill="#1b140f"/><path d="M36 19 Q40 21 44 19" stroke="#a45a55" fill="none"/><path d="M32 28 Q40 34 48 28 L50 58 Q40 64 30 58 Z" fill="#f0c7a8"/><path d="M32 32 L22 52" stroke="#e2b48f" stroke-width="5" stroke-linecap="round"/><path d="M48 32 L58 48" stroke="#e2b48f" stroke-width="5" stroke-linecap="round"/><path d="M36 58 L32 92" stroke="#3b6cf0" stroke-width="6" stroke-linecap="round"/><path d="M44 58 L50 92" stroke="#3b6cf0" stroke-width="6" stroke-linecap="round"/><ellipse cx="46" cy="42" rx="8" ry="6" fill="#ff4d2a" opacity=".85"/></svg>`;
}
function mann(v,hl,h,click){
  const face=v!=="dos";
  const hist=typeof soreMap==="function"?soreMap():{};
  const zones=face?{
    tr:'<ellipse cx="60" cy="54" rx="16" ry="6"/>',
    de:'<ellipse cx="34" cy="64" rx="9" ry="7"/><ellipse cx="86" cy="64" rx="9" ry="7"/>',
    pe:'<ellipse cx="60" cy="80" rx="14" ry="10"/>',
    bi:'<ellipse cx="28" cy="88" rx="6" ry="12"/><ellipse cx="92" cy="88" rx="6" ry="12"/>',
    av:'<ellipse cx="24" cy="112" rx="5.5" ry="11"/><ellipse cx="96" cy="112" rx="5.5" ry="11"/>',
    ab:'<ellipse cx="60" cy="104" rx="9" ry="11"/>',
    ob:'<ellipse cx="46" cy="104" rx="5" ry="11"/><ellipse cx="74" cy="104" rx="5" ry="11"/>',
    ad:'<ellipse cx="53" cy="134" rx="5" ry="10"/><ellipse cx="67" cy="134" rx="5" ry="10"/>',
    qu:'<ellipse cx="48" cy="158" rx="8" ry="16"/><ellipse cx="72" cy="158" rx="8" ry="16"/>',
    ge:'<ellipse cx="47" cy="178" rx="5" ry="5"/><ellipse cx="73" cy="178" rx="5" ry="5"/>',
    ti:'<ellipse cx="46" cy="202" rx="5.5" ry="14"/><ellipse cx="74" cy="202" rx="5.5" ry="14"/>',
    pi:'<ellipse cx="44" cy="230" rx="8" ry="5"/><ellipse cx="76" cy="230" rx="8" ry="5"/>'
  }:{
    tr:'<ellipse cx="60" cy="54" rx="16" ry="6"/>',
    de:'<ellipse cx="34" cy="64" rx="9" ry="7"/><ellipse cx="86" cy="64" rx="9" ry="7"/>',
    da:'<path d="M46 70 Q60 76 74 70 L76 104 Q60 110 44 104 Z"/>',
    lo:'<ellipse cx="60" cy="114" rx="12" ry="7"/>',
    tc:'<ellipse cx="28" cy="88" rx="6" ry="12"/><ellipse cx="92" cy="88" rx="6" ry="12"/>',
    av:'<ellipse cx="24" cy="112" rx="5.5" ry="11"/><ellipse cx="96" cy="112" rx="5.5" ry="11"/>',
    fe:'<ellipse cx="48" cy="134" rx="10" ry="9"/><ellipse cx="72" cy="134" rx="10" ry="9"/>',
    is:'<ellipse cx="48" cy="164" rx="8" ry="16"/><ellipse cx="72" cy="164" rx="8" ry="16"/>',
    mo:'<ellipse cx="46" cy="204" rx="5.5" ry="14"/><ellipse cx="74" cy="204" rx="5.5" ry="14"/>',
    pi:'<ellipse cx="44" cy="230" rx="8" ry="5"/><ellipse cx="76" cy="230" rx="8" ry="5"/>'
  };
  const gid="sk"+Math.random().toString(36).slice(2,7);
  const head=face?`<path d="M42 20 Q60 6 78 20 Q80 14 60 11 Q40 14 42 20" fill="#2b211c"/><ellipse cx="46" cy="33" rx="3" ry="4" fill="#e7b892"/><ellipse cx="74" cy="33" rx="3" ry="4" fill="#e7b892"/><ellipse cx="51.5" cy="32.5" rx="2.3" ry="2.7" fill="#1b140f"/><ellipse cx="68.5" cy="32.5" rx="2.3" ry="2.7" fill="#1b140f"/><circle cx="52.2" cy="31.6" r=".7" fill="#fff"/><circle cx="69.2" cy="31.6" r=".7" fill="#fff"/><path d="M60 35 L58.2 39.2 Q60 40.8 61.8 39.2 Z" fill="#c48972"/><path d="M53 43.2 Q60 47 67 43.2" stroke="#a45a55" fill="none" stroke-width="1.3" stroke-linecap="round"/>`:`<path d="M42 16 Q60 8 78 16 Q80 34 74 42 Q60 46 46 42 Q40 34 42 16" fill="#2b211c"/><path d="M60 70 L60 112" stroke="#b07d58" stroke-width="1.4"/>`;
  const base=`<defs><linearGradient id="${gid}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f3c9a6"/><stop offset="1" stop-color="#d7a07a"/></linearGradient></defs>
    <path d="M46 124 C40 158 40 188 38 214 C37 226 34 236 32 244 L50 246 C52 226 54 196 56 158 Z" fill="url(#${gid})"/>
    <path d="M74 124 C80 158 80 188 82 214 C83 226 86 236 88 244 L70 246 C68 226 66 196 64 158 Z" fill="url(#${gid})"/>
    <path d="M40 116 Q60 128 80 116 L86 146 Q60 156 34 146 Z" fill="${face?"#3b6cf0":"#243054"}"/>
    <path d="M38 54 Q30 78 34 112 Q60 124 86 112 Q90 78 82 54 Q60 46 38 54Z" fill="url(#${gid})" stroke="#8a624c" stroke-width=".6"/>
    <path d="M36 58 Q24 78 22 108 Q28 112 32 100 Q34 82 40 66 Z" fill="url(#${gid})"/>
    <path d="M84 58 Q96 78 98 108 Q92 112 88 100 Q86 82 80 66 Z" fill="url(#${gid})"/>
    <ellipse cx="60" cy="32" rx="16" ry="18" fill="url(#${gid})" stroke="#8a624c" stroke-width=".6"/>
    <rect x="54" y="46" width="12" height="12" rx="4" fill="url(#${gid})"/>${head}`;
  const hot=Object.keys(zones).map(k=>{
    const on=(hl||[]).includes(k);
    const cls=on?"hz":(hist[k]?hist[k].level:"mz");
    return `<g class="${cls}" ${click?`onclick="pickZone('${k}','${v}')"`:""}>${zones[k]}</g>`;
  }).join("");
  return `<svg class="bodyfig" viewBox="0 0 120 250" height="${h}" role="img" aria-label="${face?"Mannequin de face":"Mannequin de dos"}">${base}${hot}</svg>`;
}
function renderBody(){
  const faceOn=bv==="face", dosOn=bv==="dos", crOn=bt==="crampe", cbOn=bt==="courbature";
  const box=$("#bodymap"); if(!box)return;
  box.innerHTML=`<p class="hint">Touche un muscle. Rouge : 3 derniers jours. Orange : jusqu’à 14 jours.</p>
  <div class="twobtn">
    <button class="pick face ${faceOn?"on":""}" onclick="bv='face';renderBody()">Face</button>
    <button class="pick dos ${dosOn?"on":""}" onclick="bv='dos';renderBody()">Dos</button>
  </div>
  <div class="mannwrap">${mann(bv,[bz],300,true)}<div class="facebadge ${faceOn?"":"dos"}">${faceOn?"Face — le visage est vers toi":"Dos — nuque, sans visage"}</div></div>
  <p class="zoneName"><b>${bz?(NM[bz]||bz):"Touche une zone"}</b></p>`
  +(bz?`<div class="twobtn"><button class="pick crampe ${crOn?"on":""}" onclick="bt='crampe';renderBody()">Crampe</button><button class="pick courb ${cbOn?"on":""}" onclick="bt='courbature';renderBody()">Courbature</button></div><button class="next" onclick="logSore()">Enregistrer cette douleur</button>`+advHTML():"")
  +`<div class="meal"><b>Suivi des douleurs</b>${soreListHTML()}</div>`;
}
function mealsHTML(){
  const ex=S.extra[dk()]||[];
  return expBanner()+hydroHTML()+`<p>💪 Protéines : <b>${eatenProt()}</b> / ${ptarget()} g. Touche le rond des calories pour changer l’objectif.</p>`+
  `<div class="meal mealbox"><h3>Composer le repas</h3><p>Un seul texte, avec les poids.</p><textarea id="mealFree" placeholder="120g de pâtes, 200g de poulet et 300g de légumes" oninput="previewMeal()"></textarea><div id="mealPrev"><small>Exemple : 120g de pâtes, 200g de poulet et 300g de légumes</small></div><button class="mainbtn full" onclick="addComposedMeal()">Calculer et compter ce repas</button><button class="next" onclick="showStockMeals()">Recettes avec mon stock</button></div>`+
  meals.map((m,i)=>`<div class="meal"><div class="mealhead"><div><small>${m[0]}</small><h4>${m[1]}</h4></div><b>${Math.round(m[2]*F())} kcal · ${Math.round(mealProt(m))} g prot</b></div><button class="mainbtn" onclick="eat(${i})">${(S.eat[dk()]||[]).includes(i)?"Mangé":"Marquer mangé"}</button><div class="ingredients">${m[3].map(x=>`<div class="ingredient"><span>${x[0]}</span><b>${scq(x[1])}</b></div>`).join("")}</div></div>`).join("")+
  `<div class="meal"><h3>Déjà compté aujourd’hui</h3>${ex.length?ex.map((e,i)=>`<div class="ingredient"><span>${esc(e.n)}</span><b>${e.k} kcal${e.p?" · "+e.p+" g":""} <a onclick="S.extra[dk()].splice(${i},1);save();rf()">Retirer</a></b></div>`).join(""):"<small>Rien pour le moment.</small>"}</div>`;
}
function aisleOf(n){
  const s=normFood(n);
  const rules=[["Fruits et légumes",/pomme|banane|tomate|salade|legume|brocoli|carotte|courgette|avocat|epinard|poivron|fraise|fruit|patate|pomme de terre|oignon|concombre|poivron/],["Frais",/lait|yaourt|fromage|oeuf|poulet|dinde|boeuf|porc|jambon|saumon|thon|poisson|crevette|viande|skyr|beurre|yaourt|steak/],["Boulangerie",/pain|baguette|tartine/],["Surgelés",/surgel|glace|pizza/],["Boissons",/eau|jus|soda|boisson/],["Épicerie",/pate|riz|quinoa|semoule|avoine|huile|lentille|pois|chocolat|miel|conserve|farine|sucre|cafe|the/],["Maison",/lessive|savon|papier|essuie|shampoing|gel douche/]];
  for(const [a,re] of rules)if(re.test(s))return a;
  return "Autre";
}
function renderShop(){
  const spent=S.shop.filter(x=>x.d).reduce((a,x)=>a+(+x.p||0),0);
  const total=S.shop.reduce((a,x)=>a+(+x.p||0),0);
  const left=S.shop.filter(x=>!x.d);
  if($("#spent"))$("#spent").textContent=spent.toFixed(2)+" €";
  if($("#planned"))$("#planned").textContent=left.length+" article"+(left.length>1?"s":"")+" à prendre · "+total.toFixed(2)+" €";
  if($("#budgetBar"))$("#budgetBar").style.width=Math.min(100,spent/150*100)+"%";
  const card=o=>{const x=o.x,i=o.i;return `<article class="shopcard ${x.d?"done":""}"><div class="what">${esc(x.n)}</div><div class="qtyline">${esc(x.q)} ${esc(x.u)}</div><div class="meta"><span class="pill">${esc(aisleOf(x.n))}</span><span class="pill">${x.p?Number(x.p).toFixed(2)+" €":"Prix"}</span></div><div class="rowbtns"><button class="buybtn ${x.d?"ok":"todo"}" onclick="buy(${i})">${x.d?"Acheté":"Marquer acheté"}</button><button class="del" onclick="delShop(${i})">✕</button></div></article>`};
  const order=["Fruits et légumes","Frais","Boulangerie","Épicerie","Surgelés","Boissons","Maison","Autre"];
  const group=rows=>{const by={};rows.forEach(o=>{(by[aisleOf(o.x.n)]=by[aisleOf(o.x.n)]||[]).push(o)});return order.filter(a=>by[a]).map(a=>`<div class="aislehead">${a}</div>`+by[a].sort((p,q)=>p.x.n.localeCompare(q.x.n,"fr")).map(card).join("")).join("")};
  const pending=S.shop.map((x,i)=>({x,i})).filter(o=>!o.x.d);
  const done=S.shop.map((x,i)=>({x,i})).filter(o=>o.x.d);
  if($("#shopList"))$("#shopList").innerHTML=(typeof driveHTML==="function"?driveHTML():"")+(pending.length?group(pending):'<div class="shopcard"><div class="what">Rien à acheter</div></div>')+(done.length?`<div class="head"><h3>Déjà pris</h3></div>`+group(done):"");
  if(typeof renderPrev==="function"&&$("#prev")){
    renderPrev();
    const prev=$("#prev");
    if(prev&&!prev.querySelector("details")){
      prev.innerHTML=`<details class="fold"><summary>À prévoir pour les repas</summary>${prev.innerHTML}</details>`;
    }
  }
}
function sessionStartText(){
  if(typeof trainWhen!=="function")return "";
  const slot=trainWhen();
  const days=S.workDays||[1,1,1,1,1,0,0];
  const today=(new Date().getDay()+6)%7;
  if(!days[today])return "Pas de séance calée aujourd’hui";
  return "Départ "+slot.s;
}
function paintWork(){
  const p=$("#plan"); if(!p)return;
  const old=$("#workbox");
  const html=workHTML().replace("Séance proposée :","Départ séance :");
  if(old)old.outerHTML=html; else p.insertAdjacentHTML("afterbegin",html);
  const slot=trainWhen();
  const note=p.querySelector(".hero p");
  if(note)note.textContent="Départ aujourd’hui : "+slot.s+" · rappel "+(S.remindMin||30)+" min avant.";
}
function checkSessionRemind(){
  const days=S.workDays||[1,1,1,1,1,0,0];
  const today=(new Date().getDay()+6)%7;
  if(!days[today]||typeof trainWhen!=="function")return;
  const slot=trainWhen();
  const now=new Date();
  const [h,m]=slot.s.split(":").map(Number);
  const start=new Date(now); start.setHours(h,m,0,0);
  const lead=(+S.remindMin||30)*60000;
  const diff=start-now;
  if(diff>0&&diff<=lead)notifyOnce("Séance à "+slot.s+". Prépare-toi.");
}
function setRemind(){
  const v=parseInt(prompt("Rappel combien de minutes avant la séance ?", S.remindMin||30),10);
  if(!v||v<5||v>180)return alert("Entre 5 et 180 minutes");
  S.remindMin=v;save();paintWork();if($("#settings")&&$("#settings").classList.contains("open"))renderSettings();
}
(function(){
  const base=renderSettings;
  renderSettings=function(){
    base();
    const box=$("#setx");
    if(!box||box.querySelector("#remindBox"))return;
    box.insertAdjacentHTML("beforeend",`<h3 style="margin-top:14px">Rappel de séance</h3><p id="remindBox">Notification ${(S.remindMin||30)} min avant le départ.</p><button class="next" onclick="setRemind()">Choisir le délai</button>`);
  };
  const baseSet=setToday;
  setToday=function(){
    baseSet();
    const b=document.querySelector("#sport .hero .mainbtn");
    if(b){b.textContent="Commencer la séance";b.style.display="";}
    const meta=$("#todayMeta");
    if(meta)meta.textContent=(meta.textContent||"")+" · "+sessionStartText();
  };
})();
if($("#wakeNext")&&S.wakeNext){$("#wakeNext").value=S.wakeNext;saveWake()}
if($("#bodymap"))renderBody();
if(typeof renderGear==="function")renderGear();
if(typeof renderShop==="function"&&$("#shopList"))renderShop();
setInterval(checkSessionRemind,60000);
checkSessionRemind();
setToday();

/* Anatomie visible, séance cliquable, coucher, courses */
function anatCard(src, alt){
  return `<img class="anat-thumb" src="${src}" alt="${esc(alt)}">`;
}
function fig(){return anatCard("anat-face.jpg","Muscle travaillé")}
function demoFig(name){
  const q=encodeURIComponent(name+" exercice démonstration");
  return `<div class="anat-demo"><img src="anat-face.jpg" alt="Anatomie ${esc(name)}"><b>${esc(typeof mu==="function"?mu(name):name)}</b><a href="https://www.youtube.com/results?search_query=${q}" target="_blank" rel="noopener">Vidéo</a></div>`;
}
function zoneLayer(face){
  const map=face?{tr:[38,16,24,6],de:[16,22,18,8],pe:[38,28,24,8],bi:[10,32,14,12],av:[8,44,12,10],ab:[40,36,20,10],ob:[30,36,10,10],qu:[28,52,18,14],ge:[30,66,14,5],ti:[32,72,14,10],pi:[30,86,16,6]}:{tr:[36,15,28,6],de:[14,22,16,8],da:[34,28,32,12],lo:[38,42,24,7],tc:[10,32,14,12],fe:[30,48,18,9],is:[30,58,16,12],mo:[32,72,14,10],pi:[30,86,16,6]};
  const hist=typeof soreMap==="function"?soreMap():{};
  return Object.keys(map).map(k=>{
    const b=map[k];
    const on=bz===k;
    const cls=on?"zonelit hz":hist[k]?("zonelit "+hist[k].level):"zonelit";
    return `<button class="${cls}" style="left:${b[0]}%;top:${b[1]}%;width:${b[2]}%;height:${b[3]}%" onclick="pickZone('${k}','${face?"face":"dos"}')" aria-label="${NM[k]||k}"></button>`;
  }).join("");
}
function renderBody(){
  const box=$("#bodymap"); if(!box)return;
  const face=bv!=="dos";
  box.innerHTML=`<p class="hint">Schéma anatomique. Touche le muscle : il passe en surbrillance.</p>
  <div class="twobtn"><button class="pick face ${face?"on":""}" onclick="bv='face';renderBody()">Face</button><button class="pick dos ${!face?"on":""}" onclick="bv='dos';renderBody()">Dos</button></div>
  <div class="anat"><img src="${face?"anat-face.jpg":"anat-dos.jpg"}" alt="${face?"Anatomie de face":"Anatomie de dos"}">${zoneLayer(face)}</div>
  <p class="zoneName"><b>${bz?(NM[bz]||bz):"Touche une zone"}</b></p>
  <div class="twobtn"><button class="pick crampe ${bt==="crampe"?"on":""}" onclick="bt='crampe';renderBody()">Crampe</button><button class="pick courb ${bt==="courbature"?"on":""}" onclick="bt='courbature';renderBody()">Courbature</button></div>
  ${bz?`<button class="next" onclick="logSore()">Enregistrer cette douleur</button>`+(typeof advHTML==="function"?advHTML():""):"<small>Choisis Face ou Dos, puis un muscle.</small>"}
  <div class="meal"><b>Suivi des douleurs</b>${typeof soreListHTML==="function"?soreListHTML():""}</div>`;
}
function saveWake(){
  const w=$("#wakeNext")&&$("#wakeNext").value;
  if(!w)return;
  S.wakeNext=w;save();
  const bed=bedtime(w,8);
  S.bedTarget=bed;save();
  const el=$("#bedadvice");
  if(el)el.innerHTML="Réveil demain à <b>"+w+"</b>. Couche-toi vers <b>"+bed+"</b>. Une notification part 1 h avant.";
}
function checkBedRemind(){
  if(!S.bedTarget)return;
  const [h,m]=S.bedTarget.split(":").map(Number);
  const now=new Date();
  const bed=new Date(now); bed.setHours(h,m,0,0);
  if(bed<now)bed.setDate(bed.getDate()+1);
  const diff=bed-now;
  if(diff>0&&diff<=3600000)notifyOnce("Dans 1 h, heure idéale de coucher : "+S.bedTarget+".");
}
function renderShop(){
  if(!$("#shopList"))return;
  const spent=S.shop.filter(x=>x.d).reduce((a,x)=>a+(+x.p||0),0);
  const total=S.shop.reduce((a,x)=>a+(+x.p||0),0);
  if($("#spent"))$("#spent").textContent=spent.toFixed(2)+" €";
  if($("#planned"))$("#planned").textContent=S.shop.filter(x=>!x.d).length+" à prendre · liste "+total.toFixed(2)+" €";
  if($("#budgetBar"))$("#budgetBar").style.width=Math.min(100,spent/150*100)+"%";
  const card=o=>{const x=o.x,i=o.i;return `<article class="shopcard ${x.d?"done":""}"><div class="what">${esc(x.n)}</div><div class="qtyline">${esc(x.q)} ${esc(x.u)} · ${esc(aisleOf(x.n))}</div><div class="meta"><input class="qin" type="number" step=".01" value="${x.p||0}" aria-label="Prix" onchange="S.shop[${i}].p=+this.value;S.prices[S.shop[${i}].n]=+this.value;save();renderShop()"><input class="qin" type="date" value="${x.e||""}" aria-label="Date" onchange="S.shop[${i}].e=this.value;save()"></div><div class="rowbtns"><button class="buybtn ${x.d?"ok":"todo"}" onclick="buy(${i})">${x.d?"Acheté":"Marquer acheté"}</button><button class="del" onclick="delShop(${i})">✕</button></div></article>`};
  const order=["Fruits et légumes","Frais","Boulangerie","Épicerie","Surgelés","Boissons","Maison","Autre"];
  const group=rows=>{const by={};rows.forEach(o=>{(by[aisleOf(o.x.n)]=by[aisleOf(o.x.n)]||[]).push(o)});return order.filter(a=>by[a]).map(a=>`<div class="aislehead">${a} · ${by[a].length}</div>`+by[a].sort((p,q)=>String(p.x.n).localeCompare(q.x.n,"fr")).map(card).join("")).join("")};
  const pending=S.shop.map((x,i)=>({x,i})).filter(o=>!o.x.d);
  const done=S.shop.map((x,i)=>({x,i})).filter(o=>o.x.d);
  $("#shopList").innerHTML=(typeof driveHTML==="function"?driveHTML():"")+(pending.length?group(pending):"<div class=\"shopcard\"><div class=\"what\">Liste vide</div><div class=\"qtyline\">Ajoute un produit ci-dessus, ou ouvre À prévoir.</div></div>")+(done.length?`<div class="head"><h3>Déjà acheté</h3></div>`+group(done):"");
  
}
(function(){
  const base=setToday;
  setToday=function(){
    base();
    const fig=$("#heroFig");
    if(fig)fig.innerHTML='<img class="anat-thumb" src="anat-face.jpg" alt="Schéma anatomique de la séance">';
    const b=document.querySelector("#sport .hero .mainbtn");
    if(b){b.textContent="Commencer la séance";b.style.display="";b.style.position="relative";b.style.zIndex="3";}
  };
})();
setInterval(checkBedRemind,60000);
checkBedRemind();
if($("#bodymap"))renderBody();
setToday();

function fillForecast(){
  if(!$("#prev")||typeof needs!=="function")return;
  const ns=needs(pd);
  const budget=ns.filter(o=>o.need&&S.shopSel[o.n]!==false).reduce((a,o)=>a+o.cost,0);
  $("#prev").innerHTML='<details class="fold" open><summary>À prévoir pour les repas · '+budget.toFixed(2)+' €</summary>'
    +'<div class="twobtn"><button class="pick face '+(pd==3?"on":"")+'" onclick="pd=3;fillForecast()">3 jours</button><button class="pick face '+(pd==7?"on":"")+'" onclick="pd=7;fillForecast()">7 jours</button></div>'
    +ns.map(o=>'<label class="needcard"><input type="checkbox" '+(o.need&&S.shopSel[o.n]!==false?"checked":"")+' '+(o.need?"":"disabled")+' onchange="toggleNeed('+JSON.stringify(o.n)+');fillForecast()"><div><b>'+esc(o.n)+'</b><small>'+(o.need?("Acheter "+o.need+" "+o.u+" · besoin "+o.q+" "+o.u+" · ≈"+o.cost.toFixed(2)+" €"):"Déjà en stock")+'</small></div></label>').join("")
    +'<div class="twobtn"><button class="mainbtn" onclick="addNeeds(true);renderShop();fillForecast()">Ajouter la sélection</button><button onclick="addNeeds(false);renderShop();fillForecast()">Toute la liste</button></div></details>';
}
fillForecast();
renderBody();

/* Affichage des ajouts, sans appel trop tot */
function muscleBox(name){
  const key=(typeof XM!=="undefined"&&XM[name]||"q")[0];
  const box={q:[30,52,40,16],c:[32,70,36,14],a:[36,34,28,12],b:[12,30,16,14],g:[30,46,40,10],p:[36,26,28,9]}[key]||[34,36,32,14];
  return box;
}
function anatomyDemo(name, src){
  const b=muscleBox(name||"");
  const q=encodeURIComponent((name||"exercice")+" demonstration musculation");
  return `<div class="anat-demo"><img src="${src||"anat-face.jpg"}" alt="Anatomie"><i style="left:${b[0]}%;top:${b[1]}%;width:${b[2]}%;height:${b[3]}%"></i>${name?`<b>${esc(typeof mu==="function"?mu(name):name)}</b><a href="https://www.youtube.com/results?search_query=${q}" target="_blank" rel="noopener">Video de demo</a>`:""}</div>`;
}
function paintSession(){
  const fig=$("#heroFig");
  if(fig)fig.innerHTML=anatomyDemo("", "anat-face.jpg");
  const b=document.querySelector("#sport .hero .startbtn, #sport .hero .mainbtn");
  if(!b)return;
  b.textContent="Commencer la seance";
  b.style.display="";
  b.style.position="relative";
  b.style.zIndex="5";
  const t=S.week&&S.week[(new Date().getDay()+6)%7];
  const k=t&&Object.keys(W).find(x=>W[x].t===t);
  b.onclick=()=>openWorkout(k||"plyo");
}
function paintCramps(){
  const box=$("#bodymap"); if(!box)return;
  const face=bv!=="dos";
  const hist=typeof soreMap==="function"?soreMap():{};
  const map=face?{tr:[38,16,24,6],de:[16,22,18,8],pe:[38,28,24,8],bi:[10,32,14,12],av:[8,44,12,10],ab:[40,36,20,10],ob:[30,36,10,10],qu:[28,52,18,14],ge:[30,66,14,5],ti:[32,72,14,10],pi:[30,86,16,6]}:{tr:[36,15,28,6],de:[14,22,16,8],da:[34,28,32,12],lo:[38,42,24,7],tc:[10,32,14,12],fe:[30,48,18,9],is:[30,58,16,12],mo:[32,72,14,10],pi:[30,86,16,6]};
  const zones=Object.keys(map).map(k=>{const b=map[k];const cls=bz===k?"zonelit hz":hist[k]?("zonelit "+hist[k].level):"zonelit";return `<button class="${cls}" style="left:${b[0]}%;top:${b[1]}%;width:${b[2]}%;height:${b[3]}%" onclick="pickZone('${k}','${face?"face":"dos"}')" aria-label="${NM[k]||k}"></button>`}).join("");
  box.innerHTML=`<p class="hint">Planche anatomique. La zone touchee passe en rouge.</p>
  <div class="twobtn"><button class="pick face ${face?"on":""}" onclick="bv='face';paintCramps()">Face</button><button class="pick dos ${!face?"on":""}" onclick="bv='dos';paintCramps()">Dos</button></div>
  <div class="anat"><img src="${face?"anat-face.jpg":"anat-dos.jpg"}" alt="${face?"Face":"Dos"}">${zones}</div>
  <p class="zoneName"><b>${bz?(NM[bz]||bz):"Touche un muscle"}</b></p>
  <div class="twobtn"><button class="pick crampe ${bt==="crampe"?"on":""}" onclick="bt='crampe';paintCramps()">Crampe</button><button class="pick courb ${bt==="courbature"?"on":""}" onclick="bt='courbature';paintCramps()">Courbature</button></div>
  ${bz?`<button class="next" onclick="logSore();paintCramps()">Enregistrer cette douleur</button>`+(typeof advHTML==="function"?advHTML():""):""}
  <div class="meal"><b>Suivi des douleurs, 14 jours</b>${typeof soreListHTML==="function"?soreListHTML():""}</div>`;
}
function paintGear(){ if(typeof renderGear==="function")renderGear(); }
function paintShopFull(){
  if(typeof renderShop==="function")renderShop();
  if(typeof fillForecast==="function")fillForecast();
  const add=document.querySelector("#shopBox .add");
  if(add)add.style.display="";
}
(function(){
  const baseShow=showEx;
  showEx=function(){
    baseShow();
    const name=ei>=0&&W[type]&&W[type].e[ei]&&W[type].e[ei][0];
    const icon=$("#demoIcon");
    if(icon)icon.innerHTML=anatomyDemo(name||W[type].t, "anat-face.jpg");
    document.querySelectorAll("#brief .bx").forEach(bx=>{
      const b=bx.querySelector("b");
      if(!b||bx.querySelector(".anat-demo"))return;
      bx.insertAdjacentHTML("afterbegin", anatomyDemo(b.textContent.trim(),"anat-face.jpg"));
    });
  };
  const baseFood=foodTab;
  foodTab=function(t,el){
    baseFood(t,el);
    if(t==="shop")paintShopFull();
    if(t==="meals"){
      const box=$("#foodBox");
      if(box&&!box.querySelector("#stockBtn")){
        const b=document.createElement("button");
        b.id="stockBtn"; b.className="mainbtn full"; b.textContent="Recettes possibles avec mon stock";
        b.onclick=showStockMeals;
        box.prepend(b);
      }
    }
  };
})();
paintSession();
paintCramps();
paintGear();
if(typeof paintWork==="function")paintWork();
/* Swish 2.2 — séances, plan, courses, santé, progrès */
S.place=S.place||"maison";
S.gear=S.gear||[{n:"Tapis",have:false,kg:""},{n:"Élastique",have:false,kg:""},{n:"Ballon",have:true,kg:""},{n:"Haltères",have:false,kg:"8"},{n:"Kettlebell",have:false,kg:"12"},{n:"Banc",have:false,kg:""}];
const YT={
 "Squat jump":"https://www.youtube.com/results?search_query=squat+jump+exercice+d%C3%A9monstration",
 "Fentes arrière":"https://www.youtube.com/results?search_query=reverse+lunge+d%C3%A9monstration",
 "Pompes":"https://www.youtube.com/results?search_query=pompes+d%C3%A9monstration+musculation",
 "Dribble":"https://www.youtube.com/results?search_query=dribble+basket+exercice+d%C3%A9monstration",
 "Tir":"https://www.youtube.com/results?search_query=lancer+franc+basket+d%C3%A9monstration"
};
function ytFor(name){return YT[name]||("https://www.youtube.com/results?search_query="+encodeURIComponent(name+" exercice démonstration basket"));}
function hasGear(word){return S.gear.some(g=>g.have&&g.n.toLowerCase().includes(word));}
function placeNote(){return S.place==="salle"?"Salle : machines et charges dispo.":"Maison : poids du corps"+(hasGear("halt")?" + haltères":"")+(hasGear("élast")||hasGear("elast")?" + élastique":"")+".";}
function similarHint(list){
  const jumps=list.filter(e=>/jump|saut|détente|detente/i.test(e[0]));
  if(jumps.length>2)return "Plusieurs sauts se suivent. Garde le plus explosif et remplace un autre par un appui ou un gainage : trop de sauts semblables fatiguent les genoux sans ajouter de geste.";
  return "";
}
function startToday(){
  const t=S.week[(new Date().getDay()+6)%7];
  const k=Object.keys(W).find(x=>W[x].t===t)||"plyo";
  if(/club|match/i.test(t)){alert("Aujourd’hui c’est "+t+". Lance plutôt l’échauffement mobilité.");openWorkout("mobility");return;}
  openWorkout(k);
}
function openPicker(){
  const box=$("#pickerBox");
  const keys=Object.keys(W);
  box.innerHTML=`<p>Maison ou salle change les exercices proposés.</p><div class="twobtn"><button class="pick ${S.place==="maison"?"on face":""}" onclick="S.place='maison';save();openPicker()">Maison</button><button class="pick ${S.place==="salle"?"on face":""}" onclick="S.place='salle';save();openPicker()">Salle</button></div>`
  +keys.map(k=>`<button class="next" onclick="chooseSession('${k}')">${W[k].t}<small>${S.place==="salle"?"avec charges":"sans matériel lourd"}</small></button>`).join("")
  +`<button class="mainbtn full" onclick="buildOwn()">Créer ma séance</button>`;
  $("#picker").classList.add("open");
}
function closePicker(){$("#picker").classList.remove("open")}
function chooseSession(k){
  const i=(new Date().getDay()+6)%7;
  S.week[i]=W[k].t;save();closePicker();setToday();paintHome();if(typeof renderWeek==="function")renderWeek();
}
function buildOwn(){
  const names=["Squat","Fentes","Pompes","Gainage","Tir en mouvement","Dribble main faible","Montées de genoux"];
  const picked=names.filter((_,i)=>i<4);
  const hint=similarHint(picked.map(n=>[n]));
  alert("Séance perso : "+picked.join(", ")+". "+placeNote()+(hint?" "+hint:""));
  S.week[(new Date().getDay()+6)%7]="Force utile";save();closePicker();setToday();
}
function paintHome(){
  const fig=$("#heroFig");
  if(fig)fig.innerHTML='<img class="anat-clean" src="anat-face.png" alt="Anatomie">';
  const done=(S.done||[]).some(x=>x.iso===dk());
  const card=$("#todayCard"), box=$("#doneHome");
  if(card)card.style.display=done?"none":"";
  if(box)box.style.display=done?"":"none";
  if(done&&$("#doneHomeTxt"))$("#doneHomeTxt").textContent="La séance est retirée de l’accueil. Les badges sont dans Progrès.";
  const b=$("#startBtn");
  if(b){b.textContent="Démarrer la séance";b.onclick=startToday;}
}
function togglePause(){
  const btn=$("#pauseBtn");
  if(intv){pauseTimer();if(btn)btn.textContent="Reprendre";}
  else{startTimer();if(btn)btn.textContent="Pause";}
}
function gearPage(){
  const box=$("#gearBox"); if(!box)return;
  const row=(g,i)=>`<article class="shopcard"><div class="what">${esc(g.n)}${g.kg?" · "+esc(g.kg)+" kg":""}</div><div class="qtyline">${g.have?"Acheté, utilisable en séance":"À acheter pour les prochaines séances"}</div><div class="form"><input placeholder="Poids ou tension" value="${esc(g.kg||"")}" onchange="S.gear[${i}].kg=this.value;save();gearPage()"><button class="buybtn ${g.have?"ok":"todo"}" onclick="S.gear[${i}].have=!S.gear[${i}].have;save();gearPage()">${g.have?"Je l’ai":"À acheter"}</button></div></article>`;
  box.innerHTML=`<div class="add"><div class="form"><input id="gn2" placeholder="Nom"><input id="gk" placeholder="Poids kg ou tension"><button class="mainbtn" onclick="addGear2()">Ajouter</button></div></div>`
  +`<div class="head"><h3>À acheter</h3></div>`+S.gear.map((g,i)=>g.have?"":row(g,i)).join("")
  +`<div class="head"><h3>Déjà acheté</h3></div>`+S.gear.map((g,i)=>g.have?row(g,i):"").join("");
}
function addGear2(){const n=$("#gn2").value.trim();if(!n)return;S.gear.push({n,have:false,kg:$("#gk").value});save();gearPage();}
function sleepChart(){
  const host=$("#slhist"); if(!host||host.querySelector("canvas"))return;
  const c=document.createElement("canvas");c.width=320;c.height=120;host.prepend(c);
  const ctx=c.getContext("2d");
  const keys=Object.keys(S.sleep||{}).sort().slice(-7);
  ctx.fillStyle="#1b120f";ctx.fillRect(0,0,320,120);
  ctx.strokeStyle="#3a2a24";for(let i=0;i<4;i++){ctx.beginPath();ctx.moveTo(0,20+i*25);ctx.lineTo(320,20+i*25);ctx.stroke();}
  ctx.strokeStyle="#ff8a5b";ctx.beginPath();
  keys.forEach((k,i)=>{const h=(S.sleep[k]&&S.sleep[k].h)||0;const x=20+i*42,y=100-h*10;i?ctx.lineTo(x,y):ctx.moveTo(x,y);});
  ctx.stroke();
}
function shopAdded(){
  const list=$("#shopList"); if(!list)return;
  if(!S.shop.length)return;
  const last=S.shop[S.shop.length-1];
  if(!list.querySelector(".justadd"))list.insertAdjacentHTML("afterbegin",`<div class="shopcard justadd"><div class="what">Ajouté : ${esc(last.n)}</div><div class="qtyline">${esc(last.q)} ${esc(last.u)} · ${esc(typeof aisleOf==="function"?aisleOf(last.n):"Rayon")}</div></div>`);
}
function importDrive(){
  const raw=prompt("Colle une ligne du panier Intermarché : produit, quantité, prix, date\nExemple : Poulet, 1.2 kg, 8.40, 2026-10-06");
  if(!raw)return;
  const p=raw.split(",").map(s=>s.trim());
  if(p.length<2)return alert("Il faut au moins le produit et la quantité");
  S.pantry.push({n:p[0],q:parseFloat(p[1])||1,u:(p[1].match(/[a-zA-Z]+/)||["kg"])[0],p:parseFloat(p[2])||0,d:p[3]||""});
  save();alert(p[0]+" est entré dans le stock.");
}
function pastCalendar(){
  const host=$("#progress"); if(!host||host.querySelector("#pastCal"))return;
  const days=["Lun","Mar","Mer","Jeu","Ven","Sam","Dim"];
  const items=(S.done||[]).slice(-21);
  host.insertAdjacentHTML("beforeend",`<div class="add" id="pastCal"><div class="head"><h3>Séances passées</h3></div><div class="twobtn"><button class="pick on" onclick="filterPast('all',this)">Tout</button><button class="pick" onclick="filterPast('Basket',this)">Basket</button><button class="pick" onclick="filterPast('Force',this)">Force</button><button class="pick" onclick="filterPast('Course',this)">Course</button></div><div id="pastGrid" class="week"></div><canvas id="progChart" width="320" height="140"></canvas></div>`);
  window.filterPast=function(kind,el){
    $$("#pastCal .pick").forEach(b=>b.classList.remove("on")); if(el)el.classList.add("on");
    const rows=items.filter(x=>kind==="all"||x.t.includes(kind));
    $("#pastGrid").innerHTML=rows.map(x=>`<div class="day"><b>${x.iso.slice(5)}</b><small>${esc(x.t)}</small></div>`).join("")||"<p>Aucune séance de ce type.</p>";
  };
  filterPast("all");
  const c=$("#progChart"),ctx=c.getContext("2d");
  ctx.fillStyle="#1b120f";ctx.fillRect(0,0,320,140);
  ctx.strokeStyle="#3a2a24";for(let i=0;i<5;i++){ctx.beginPath();ctx.moveTo(0,20+i*24);ctx.lineTo(320,20+i*24);ctx.stroke();}
  ctx.strokeStyle="#ff8a5b";ctx.beginPath();items.forEach((x,i)=>{const y=110-i*4;i?ctx.lineTo(20+i*18,y):ctx.moveTo(20,y);});ctx.stroke();
}
function musclePick(k){
  bz=k;bv=bv||"face";
  paintCramps();
}
function paintCramps(){
  const box=$("#bodymap"); if(!box)return;
  const face=bv!=="dos";
  const muscles=face?[["pe","Pectoraux"],["ab","Abdominaux"],["qu","Quadriceps"],["bi","Biceps"],["de","Deltoïdes"],["mo","Mollets"]]:[["da","Dorsaux"],["fe","Fessiers"],["is","Ischios"],["tr","Trapèzes"],["lo","Lombaires"]];
  box.innerHTML=`<div class="anat nobg"><img src="${face?"anat-face.png":"anat-dos.png"}" alt="Anatomie"></div>
  <div class="twobtn"><button class="pick ${face?"on face":""}" onclick="bv='face';paintCramps()">Face</button><button class="pick ${!face?"on dos":""}" onclick="bv='dos';paintCramps()">Dos</button></div>
  <p>Choisis le muscle, pas une zone vague.</p>
  <div class="daypicks">${muscles.map(([k,n])=>`<button class="pick ${bz===k?"on":""}" onclick="musclePick('${k}')">${n}</button>`).join("")}</div>
  <p class="zoneName"><b>${bz?(NM[bz]||bz):"Aucun muscle"}</b></p>
  <div class="twobtn"><button class="pick crampe ${bt==="crampe"?"on":""}" onclick="bt='crampe';paintCramps()">Crampe</button><button class="pick courb ${bt==="courbature"?"on":""}" onclick="bt='courbature';paintCramps()">Courbature</button></div>
  ${bz?`<button class="next" onclick="logSore();paintCramps()">Enregistrer</button>`:""}
  <div class="meal"><b>Suivi</b>${typeof soreListHTML==="function"?soreListHTML():""}</div>`;
}
(function(){
  const baseFinish=finishSession;
  finishSession=function(){
    baseFinish();
    S.badges=S.badges||[];
    if(!S.badges.includes("Première séance"))S.badges.push("Première séance");
    if((S.done||[]).length>=3&&!S.badges.includes("3 séances"))S.badges.push("3 séances");
    save();
    const host=$("#donep");
    if(host)host.insertAdjacentHTML("beforeend",`<p>Badges : ${S.badges.map(b=>`<a onclick="go('progress')">${b}</a>`).join(" · ")}</p>`);
    paintHome();
  };
  const baseShow=showEx;
  showEx=function(){
    baseShow();
    const e=ei>=0&&W[type]&&W[type].e[ei];
    const name=e&&e[0];
    if($("#demoIcon")&&name)$("#demoIcon").innerHTML=`<div class="anat nobg"><img src="anat-face.png" alt=""><b>${esc(name)}</b><a target="_blank" href="${ytFor(name)}">Vidéo de cet exercice</a></div><p>${placeNote()}</p>`;
    const load=document.querySelector("#player input, #fw");
    if(e&&!/squat|fente|développé|developpe|halt/i.test(name||"")){
      $$("#player .form").forEach(f=>{if(/charge|kg/i.test(f.innerText))f.style.display="none";});
    }
  };
  const baseAdd=addProduct;
  addProduct=function(){baseAdd();shopAdded();};
  const baseFood=foodTab;
  foodTab=function(t,el){baseFood(t,el);if(t==="meals"){const h=document.querySelector("#foodBox .hydro, #foodBox h3");}$$("#foodBox .mealbox");const water=[...document.querySelectorAll("#foodBox .meal")].find(n=>/hydrat/i.test(n.innerText));if(water&&t==="meals")water.remove();};
})();
function go(page){const b=[...document.querySelectorAll("nav button")].find(x=>x.dataset.page===page);if(b)b.click();}
paintHome();gearPage();paintCramps();sleepChart();pastCalendar();
const planBox=$("#workbox");if(planBox&&S.workStart)planBox.open=false;
if($("#shopBox")&&!$("#itmb")){$("#shopBox").insertAdjacentHTML("afterbegin","<button id=\"itmb\" class=\"next\" onclick=\"importDrive()\">Panier Intermarché validé : entrer le stock</button>");}


function progTab(name,el){
  ["tests","past","curves","badges"].forEach(k=>{const n=$("#prog"+k[0].toUpperCase()+k.slice(1)); if(n)n.style.display=k===name?"":"none";});
  $$("#progTabs button").forEach(b=>b.classList.remove("sel")); if(el)el.classList.add("sel");
  if(name==="past")renderPast();
  if(name==="curves")drawCurves();
  if(name==="badges")renderBadges();
}
function calMode(m,el){S.calMode=m;save();$$("#progPast .pick").forEach(b=>b.classList.remove("on")); if(el)el.classList.add("on"); renderPast();}
function filterPast(kind,el){S.pastKind=kind; $$("#progPast .twobtn:last-child .pick, #progPast .twobtn .pick").forEach(()=>{}); if(el){el.parentElement.querySelectorAll(".pick").forEach(b=>b.classList.remove("on")); el.classList.add("on");} renderPast();}
function renderPast(){
  const grid=$("#pastGrid"); if(!grid)return;
  const kind=S.pastKind||"all";
  const rows=(S.done||[]).filter(x=>kind==="all"||(x.t||"").includes(kind));
  grid.innerHTML=rows.length?rows.map(x=>`<div class="day"><b>${x.iso.slice(5)}</b><small>${esc(x.t)}</small></div>`).join(""):"<p>Aucune séance pour ce filtre.</p>";
}
function drawCurves(){
  const c=$("#progChart"); if(!c)return; const ctx=c.getContext("2d");
  ctx.fillStyle="#241611"; ctx.fillRect(0,0,c.width,c.height);
  ctx.strokeStyle="#5a3b32"; ctx.lineWidth=1;
  for(let i=1;i<5;i++){ctx.beginPath();ctx.moveTo(0,i*32);ctx.lineTo(320,i*32);ctx.stroke();}
  ctx.strokeStyle="#ff8a5b"; ctx.lineWidth=3; ctx.beginPath();
  const pts=(S.done||[]).slice(-8);
  pts.forEach((x,i)=>{const y=130-Math.min(100,(i+1)*12); i?ctx.lineTo(30+i*36,y):ctx.moveTo(30,y);});
  ctx.stroke();
}
function renderBadges(){
  S.badges=S.badges||[];
  const box=$("#badgeList"); if(!box)return;
  box.innerHTML=(S.badges.length?S.badges:["Aucun badge pour l’instant"]).map(b=>`<div class="shopcard"><div class="what">${esc(b)}</div></div>`).join("");
}
let testLeft=0, testInt;
function startTest(){testLeft=10; clearInterval(testInt); testInt=setInterval(()=>{testLeft--; $("#testTimer").textContent=testLeft>0?("Départ dans "+testLeft+" s"):"C’est parti, mesure le saut."; if(testLeft<=0)clearInterval(testInt);},1000);}
function savePlanHours(){S.workStart=$("#wstart").value; S.workEnd=$("#wend").value; save(); $("#planNote").textContent="Horaires enregistrés. La séance se place après "+S.workEnd+"."; }
function drawSleep(){
  const c=$("#sleepChart"); if(!c)return; const ctx=c.getContext("2d");
  ctx.fillStyle="#241611"; ctx.fillRect(0,0,c.width,c.height);
  ctx.strokeStyle="#5a3b32"; for(let i=1;i<4;i++){ctx.beginPath();ctx.moveTo(0,i*35);ctx.lineTo(320,i*35);ctx.stroke();}
  const keys=Object.keys(S.sleep||{}).sort().slice(-7);
  ctx.strokeStyle="#9b8cff"; ctx.lineWidth=3; ctx.beginPath();
  keys.forEach((k,i)=>{const h=(S.sleep[k]&&S.sleep[k].h)||0; const x=24+i*42,y=120-h*12; i?ctx.lineTo(x,y):ctx.moveTo(x,y);});
  ctx.stroke();
}
drawSleep(); renderPast();
