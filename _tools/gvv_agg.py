import json
def aggregate(holdings):
    H=holdings
    total=sum(h['value'] for h in H); total_pl=sum(h['pl'] for h in H); cost=total-total_pl
    def grp(key):
        g={}
        for h in H:
            k=h[key]
            if k is None or str(k).lower() in ('nan','none',''): continue
            d=g.setdefault(k,{'value':0,'count':0,'pl':0})
            d['value']+=h['value']; d['count']+=1; d['pl']+=h['pl']
        out=[{'label':k,'value':d['value'],'pct':d['value']/total*100,'count':d['count'],'pl':d['pl'],'plpct':(d['pl']/(d['value']-d['pl'])*100 if (d['value']-d['pl']) else 0)} for k,d in g.items()]
        return sorted(out,key=lambda x:-x['value'])
    priv=[h for h in H if h['ac']=='Private Equity']
    cashH=[h for h in H if h['ac']=='Cash']
    pub=[h for h in H if h['ac'] not in ('Private Equity','Cash')]
    cg={}
    for h in H:
        d=cg.setdefault(h['company'],{'h':h,'value':0,'pl':0})
        d['value']+=h['value']; d['pl']+=h['pl']
    top=sorted(cg.values(),key=lambda d:-d['value'])[:10]
    pg={}
    for h in priv:
        d=pg.setdefault(h['company'],{'ticker':h['ticker'],'value':0,'pl':0})
        d['value']+=h['value']; d['pl']+=h['pl']
    privates=sorted([{'company':c,'ticker':d['ticker'],'value':d['value'],'pct':d['value']/total*100,'plpct':(d['pl']/(d['value']-d['pl'])*100 if (d['value']-d['pl']) else 0)} for c,d in pg.items()],key=lambda x:-x['value'])
    return {
        'total':total,'total_pl':total_pl,'cost':cost,'agg_pct':total_pl/cost*100,
        'n_lines':len(H),'n_companies':len(set(h['company'] for h in H)),
        'n_pub':len(set(h['ticker'] for h in pub)),'n_priv':len(set(h['company'] for h in priv)),
        'n_strat':len(set(h['strat'] for h in H)),
        'pub_v':sum(h['value'] for h in pub),'priv_v':sum(h['value'] for h in priv),'cash_v':sum(h['value'] for h in cashH),
        'asset_class':grp('ac'),'strategy':grp('strat'),'geography':grp('region'),'sector':grp('sector'),
        'top10':[{'company':d['h']['company'],'ticker':d['h']['ticker'],'sector':d['h']['sector'],'region':d['h']['region'],'strat':d['h']['strat'],'ac':d['h']['ac'],'value':d['value'],'pct':d['value']/total*100,'plpct':(d['pl']/(d['value']-d['pl'])*100 if (d['value']-d['pl']) else 0)} for d in top],
        'privates':privates,'priv_total':sum(h['value'] for h in priv),
    }
if __name__=='__main__':
    D=json.load(open('/tmp/gvv_D.json'))
    A=aggregate(D['holdings'])
    def cmp(key):
        a,b=A.get(key),D.get(key)
        if isinstance(a,(int,float)): ok=abs(a-b)<0.01; return ok
        if isinstance(a,list):
            if len(a)!=len(b): return f"LEN {len(a)}!={len(b)}"
            for x,y in zip(a,b):
                for k in x:
                    if isinstance(x[k],(int,float)):
                        if abs(x[k]-y.get(k,0))>0.01: return f"DIFF {key} {x.get('label',x.get('ticker'))} {k}: {x[k]} vs {y.get(k)}"
                    elif x[k]!=y.get(k): return f"DIFF {key} {k}: {x[k]} vs {y.get(k)}"
            return True
        return a==b
    allok=True
    for key in A:
        r=cmp(key)
        if r is not True: allok=False; print("✗",key,r)
        else: print("✓",key)
    print("\n"+("TODO EXACTO ✓" if allok else "HAY DIFERENCIAS"))
