#!/usr/bin/env python3
"""Actualiza public/gvv-detalle.html con un Excel nuevo de tickers GVV.
Uso: python3 _tools/update_gvv_detalle.py "/ruta/Actualización Tickers GVV ....xlsx"
Solo reemplaza __G.D (snapshot del portafolio); deja intacto el resto (TRACK histórico, etc.).
Ver memoria gvv_dashboard_update.md para detalles.
"""
import json, sys, os
sys.path.insert(0, os.path.dirname(__file__))
from gvv_gen import build  # build(excel_path) -> __G.D nuevo (holdings+options+agregaciones)

HTML = os.path.join(os.path.dirname(__file__), '..', 'public', 'gvv-detalle.html')

def _balanced(s, start_token):
    i = s.find(start_token); j = s.find('{', i)
    depth=0;k=j;instr=False;esc=False
    while k<len(s):
        c=s[k]
        if instr:
            if esc:esc=False
            elif c=='\\':esc=True
            elif c=='"':instr=False
        else:
            if c=='"':instr=True
            elif c=='{':depth+=1
            elif c=='}':
                depth-=1
                if depth==0:break
        k+=1
    return j,k

def main(xlsx):
    newD = build(xlsx)
    lines = open(HTML).read().split('\n')
    inner = json.loads(lines[192])           # línea 193: HTML standalone codificado como JSON string
    j,k = _balanced(inner, '__G.D = {')
    new_inner = inner[:j] + json.dumps(newD, ensure_ascii=False, separators=(',',':')) + inner[k+1:]
    lines[192] = json.dumps(new_inner, ensure_ascii=True).replace('/', '\\u002f')  # GOTCHA: escapar / como /
    open(HTML,'w').write('\n'.join(lines))
    print(f"OK. total ${newD['total']:,.0f} | {newD['n_lines']} holdings | {newD['opt_n']} opciones")
    print("Ahora: npm run build && python3 _ftp_deploy.py")

if __name__=='__main__':
    main(sys.argv[1])
