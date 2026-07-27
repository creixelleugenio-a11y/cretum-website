#!/usr/bin/env python3
"""Borra contenido remoto y sube dist/ + .htaccess via FTP."""
import ftplib, os, sys, time, posixpath

def _ftp_env():
    creds = {}
    p = os.path.expanduser('~/.cretum_ftp_env')
    with open(p) as f:
        for line in f:
            line = line.strip()
            if line and '=' in line and not line.startswith('#'):
                k, v = line.split('=', 1)
                creds[k] = v
    return creds['FTP_HOST'], creds['FTP_USER'], creds['FTP_PWD']

HOST, USER, PWD = _ftp_env()
REMOTE_ROOT='/web/cretumpartners.com/public_html'
LOCAL_ROOT=os.path.expanduser('~/cretum_website/dist')

def connect():
    ftp = ftplib.FTP(HOST, timeout=180)
    ftp.login(USER, PWD)
    ftp.set_pasv(True)
    return ftp

def list_entries(ftp, path):
    entries = []
    def parse(line):
        parts = line.split(maxsplit=8)
        if len(parts) < 9: return
        perms, name = parts[0], parts[8]
        if name in ('.', '..'): return
        entries.append((name, perms.startswith('d')))
    ftp.cwd(path)
    ftp.retrlines('LIST', parse)
    return entries

def remove_recursive(ftp, path):
    """Borra todo dentro de path, dejando path mismo."""
    try:
        entries = list_entries(ftp, path)
    except Exception as e:
        print(f'! list {path}: {e}', flush=True)
        return 0
    n = 0
    for name, is_d in entries:
        rpath = posixpath.join(path, name)
        if is_d:
            n += remove_recursive(ftp, rpath)
            try:
                ftp.rmd(rpath)
                print(f'- DIR {rpath}', flush=True)
            except Exception as e:
                print(f'! rmd {rpath}: {e}', flush=True)
        else:
            try:
                ftp.delete(rpath)
                n += 1
                print(f'- {rpath}', flush=True)
            except Exception as e:
                print(f'! del {rpath}: {e}', flush=True)
    return n

def ensure_dir(ftp, path):
    try:
        ftp.cwd(path)
        return
    except ftplib.error_perm:
        pass
    parent = posixpath.dirname(path)
    if parent and parent != path:
        ensure_dir(ftp, parent)
    try:
        ftp.mkd(path)
        print(f'+ DIR {path}', flush=True)
    except ftplib.error_perm as e:
        if not str(e).startswith('550'):
            raise

def upload_recursive(ftp, local_dir, remote_dir):
    ensure_dir(ftp, remote_dir)
    n = 0
    for entry in sorted(os.listdir(local_dir)):
        lpath = os.path.join(local_dir, entry)
        rpath = posixpath.join(remote_dir, entry)
        if os.path.isdir(lpath):
            n += upload_recursive(ftp, lpath, rpath)
        else:
            size = os.path.getsize(lpath)
            try:
                with open(lpath, 'rb') as f:
                    ftp.storbinary(f'STOR {rpath}', f)
                n += 1
                print(f'+ {rpath} ({size}b)', flush=True)
            except Exception as e:
                print(f'! upload {rpath}: {e}', flush=True)
    return n

CANON_GVV = os.path.expanduser('~/cretum_dashboard_coworker/public/gvv-detalle.html')

def sync_gvv_canonical():
    """El gvv-detalle.html canonico vive en el repo del dashboard (cretumdesk).
    Copiarlo a dist/ antes de subir evita que un deploy del sitio haga rollback
    del factsheet GVV vigente en cretumpartners.com."""
    dst = os.path.join(LOCAL_ROOT, 'gvv-detalle.html')
    if not os.path.exists(CANON_GVV):
        sys.exit(f'ABORT: no existe el canonico {CANON_GVV} — no despliego para no pisar el GVV vigente')
    import shutil
    shutil.copy2(CANON_GVV, dst)
    print(f'gvv-detalle.html <- canonico ({os.path.getsize(dst):,} bytes)', flush=True)

if __name__ == '__main__':
    t0 = time.time()
    ftp = connect()
    print(f'Connected. Cleaning {REMOTE_ROOT}', flush=True)
    deleted = remove_recursive(ftp, REMOTE_ROOT)
    print(f'\nDeleted {deleted} files in {time.time()-t0:.1f}s', flush=True)

    t1 = time.time()
    print(f'\nUploading {LOCAL_ROOT} -> {REMOTE_ROOT}', flush=True)
    sync_gvv_canonical()
    uploaded = upload_recursive(ftp, LOCAL_ROOT, REMOTE_ROOT)
    print(f'\nUploaded {uploaded} files in {time.time()-t1:.1f}s', flush=True)

    ftp.quit()
    print(f'\nDONE total {time.time()-t0:.1f}s', flush=True)
