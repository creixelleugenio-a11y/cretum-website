"""Deploy ADITIVO (sin borrar) del sitio a cretumpartners: sube dist/ sobre lo
existente, index.html AL FINAL (nunca apunta a un bundle que no exista todavia).
No toca gvv-detalle.html ni docs/ (los manejan otros robots). Luego, opcional,
el gvv-data.js lo sube el generador. Seguro: en ningun momento el sitio se rompe."""
import os, ftplib, io, sys, time

def env():
    c = {}
    for line in open(os.path.expanduser("~/.cretum_ftp_env")):
        line = line.strip()
        if "=" in line and not line.startswith("#"):
            k, v = line.split("=", 1); c[k.strip()] = v.strip()
    return c

C = env()
ROOT = "/web/cretumpartners.com/public_html"
LOCAL = os.path.expanduser("~/cretum_website/dist")

def connect():
    f = ftplib.FTP(C["FTP_HOST"], timeout=180); f.login(C["FTP_USER"], C["FTP_PWD"]); f.set_pasv(True); return f

def ensure_dir(ftp, path):
    parts = path.strip("/").split("/"); cur = ""
    for p in parts:
        cur += "/" + p
        try: ftp.mkd(cur)
        except Exception: pass

def upload_file(ftp, local, remote):
    ensure_dir(ftp, os.path.dirname(remote))
    with open(local, "rb") as fh:
        ftp.storbinary("STOR " + remote, fh)

def main():
    ftp = connect()
    # 1) todos los archivos MENOS index.html
    files = []
    for dp, _, fns in os.walk(LOCAL):
        for fn in fns:
            lp = os.path.join(dp, fn)
            rel = os.path.relpath(lp, LOCAL).replace(os.sep, "/")
            files.append((lp, rel))
    # archivos que POSEE EL ROBOT de la Mini (no del build): jamas subirlos/pisarlos
    ROBOT_OWNED = ("gvv-detalle.html", "gvv-data.js")
    files = [f for f in files if os.path.basename(f[1]) not in ROBOT_OWNED]
    non_index = [f for f in files if f[1] != "index.html"]
    idx = [f for f in files if f[1] == "index.html"]
    t0 = time.time()
    for i, (lp, rel) in enumerate(non_index, 1):
        upload_file(ftp, lp, ROOT + "/" + rel)
    print(f"subidos {len(non_index)} archivos (assets) en {time.time()-t0:.1f}s", flush=True)
    # 2) index.html AL FINAL (activa el bundle nuevo)
    for lp, rel in idx:
        upload_file(ftp, lp, ROOT + "/" + rel)
    print("index.html subido (activa el bundle nuevo)", flush=True)
    ftp.quit()
    print("DEPLOY ADITIVO OK — nada borrado")

if __name__ == "__main__":
    main()
