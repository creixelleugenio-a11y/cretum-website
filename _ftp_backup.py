#!/usr/bin/env python3
"""Recursive FTP backup of /web/cretumpartners.com/public_html → local."""
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
LOCAL_ROOT=os.environ.get('FTP_BACKUP_DIR') or os.path.expanduser(time.strftime('~/backups/cretumpartners_ftp_%Y%m%d'))

def connect():
    ftp = ftplib.FTP(HOST, timeout=120)
    ftp.login(USER, PWD)
    ftp.set_pasv(True)
    return ftp

def is_dir(ftp, path):
    cur = ftp.pwd()
    try:
        ftp.cwd(path)
        ftp.cwd(cur)
        return True
    except ftplib.error_perm:
        return False

def list_entries(ftp, path):
    entries = []
    def parse(line):
        parts = line.split(maxsplit=8)
        if len(parts) < 9: return
        perms, name = parts[0], parts[8]
        if name in ('.', '..'): return
        is_d = perms.startswith('d')
        entries.append((name, is_d, perms, int(parts[4]) if parts[4].isdigit() else 0))
    ftp.cwd(path)
    ftp.retrlines('LIST', parse)
    return entries

def walk_download(ftp, remote_path, local_path):
    os.makedirs(local_path, exist_ok=True)
    try:
        entries = list_entries(ftp, remote_path)
    except Exception as e:
        print(f'! list fail {remote_path}: {e}', flush=True)
        return 0
    total = 0
    for name, is_d, perms, size in entries:
        rpath = remote_path.rstrip('/') + '/' + name
        lpath = os.path.join(local_path, name)
        if is_d:
            total += walk_download(ftp, rpath, lpath)
        else:
            try:
                with open(lpath, 'wb') as f:
                    ftp.retrbinary(f'RETR {rpath}', f.write)
                total += 1
                print(f'+ {rpath} ({size} bytes)', flush=True)
            except Exception as e:
                print(f'! {rpath}: {e}', flush=True)
    return total

if __name__ == '__main__':
    t0 = time.time()
    ftp = connect()
    print(f'Connected. Starting backup of {REMOTE_ROOT} → {LOCAL_ROOT}', flush=True)
    n = walk_download(ftp, REMOTE_ROOT, LOCAL_ROOT)
    ftp.quit()
    print(f'\nDone. {n} files in {time.time()-t0:.1f}s', flush=True)
