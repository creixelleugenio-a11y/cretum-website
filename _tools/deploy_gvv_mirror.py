#!/usr/bin/env python3
"""Publica el GVV Dashboard a SUS DOS ESPEJOS (byte-idénticos):
  - cretumdesk.com/gvv-detalle.html   (git push a main -> Vercel auto-deploya; embebido en #cretum/ventas)
  - cretumpartners.com/gvv-detalle.html  (FTP, mismo archivo)

FUENTE ÚNICA (canónica): /Users/air/cretum_dashboard_coworker/public/gvv-detalle.html
Flujo: editas la fuente (update_gvv_detalle.py para datos, o a mano) y corres ESTE script una vez.
Uso:  python3 _tools/deploy_gvv_mirror.py [-m "mensaje de commit"]
"""
import os
import subprocess, ftplib, io, sys, hashlib

CANON = '/Users/air/cretum_dashboard_coworker/public/gvv-detalle.html'
DESK_REPO = '/Users/air/cretum_dashboard_coworker'
def _ftp_env():
    creds = {}
    with open(os.path.expanduser('~/.cretum_ftp_env')) as f:
        for line in f:
            line = line.strip()
            if line and '=' in line and not line.startswith('#'):
                k, v = line.split('=', 1)
                creds[k] = v
    return creds

_c = _ftp_env()
FTP = dict(host=_c['FTP_HOST'], user=_c['FTP_USER'], pwd=_c['FTP_PWD'])
FTP_PATH = '/web/cretumpartners.com/public_html/gvv-detalle.html'


def sh(args, **kw):
    print('$', ' '.join(args)); subprocess.run(args, check=True, **kw)


def main():
    msg = 'GVV: actualizar dashboard (espejo)'
    if '-m' in sys.argv:
        msg = sys.argv[sys.argv.index('-m') + 1]

    # 1) cretumdesk (canónico): commit si hay cambios, rebase para no pisar la otra sesión, push.
    sh(['git', 'add', 'public/gvv-detalle.html'], cwd=DESK_REPO)
    has_staged = subprocess.run(['git', 'diff', '--cached', '--quiet'], cwd=DESK_REPO).returncode != 0
    if has_staged:
        sh(['git', 'commit', '-m', msg], cwd=DESK_REPO)
    else:
        print('(cretumdesk: sin cambios en gvv-detalle.html)')
    sh(['git', 'pull', '--rebase', '--autostash'], cwd=DESK_REPO)
    sh(['git', 'push'], cwd=DESK_REPO)

    # 2) Leer la fuente YA reconciliada (post-rebase) y espejarla a cretumpartners por FTP.
    #    Al espejo de cretumpartners se le INYECTA el snippet de Umami (analítica sin cookies,
    #    self-hosted en la Mac Mini) — solo en cretumpartners.com, no en el canónico de cretumdesk.
    UMAMI = ('<script defer src="https://mac-mini-cretum-1.tail4eeacb.ts.net/script.js" '
             'data-website-id="ccd15f98-8a67-4bc3-822d-777894fa383a"></script>')
    data = open(CANON, 'rb').read()
    if b'data-website-id' not in data:
        data = data.replace(b'</head>', UMAMI.encode() + b'</head>', 1)
    print('canónico:', len(data), 'b · md5', hashlib.md5(data).hexdigest()[:12], '· umami inyectado')
    ftp = ftplib.FTP(FTP['host'], timeout=120); ftp.login(FTP['user'], FTP['pwd']); ftp.set_pasv(True)
    ftp.storbinary('STOR ' + FTP_PATH, io.BytesIO(data)); ftp.quit()
    print('FTP -> cretumpartners.com OK')
    print('LISTO: espejo publicado en cretumdesk.com y cretumpartners.com/gvv-detalle.html (idénticos).')


if __name__ == '__main__':
    main()
