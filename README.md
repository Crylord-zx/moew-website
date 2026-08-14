# Meow Webpages

A small template gallery: pick a design, customize your own text/photos, get a
private shareable link. Two logical halves, two very different audiences:

| | Public site | Admin panel |
|---|---|---|
| Who | The public, anyone with the link | You, logged in with a password |
| Edits master templates? | Never | Yes |
| Requires login? | No (nothing to log into) | **Yes — every route** |

There are two ways to run them, depending on where you're deploying:

### Option A — one deployment, `server.js` (recommended for PaaS hosts like Hostinger)

Most app-hosting platforms give each deployment its own isolated
filesystem. If you deploy the public site and admin panel as two separate
deployments, an edit saved in the admin panel lands on *that deployment's
disk* — the public site is a different instance and never sees it.

`server.js` runs both in **one process on one shared filesystem**, so an
admin save is visible on the public site instantly. It picks which one
answers each request by hostname: anything starting with `admin.` (e.g.
`admin.yourdomain.com`) gets the admin panel; everything else gets the
public site.

```
node set-admin-password.js youruser yourpassword   # one-time setup
npm start                                          # -> node server.js, one port
```
Point your main domain **and** an `admin.<yourdomain>` subdomain at the
same deployment. Optionally set `ADMIN_HOST=admin.yourdomain.com` as an
env var if you want an exact match instead of the "starts with `admin.`"
default.

**No subdomain, or don't want the admin panel reachable at an obvious
`admin.` address at all?** Set an `ADMIN_UNLOCK_PATH` environment
variable to a secret path only you know, e.g.
`ADMIN_UNLOCK_PATH=/enter-something-only-you-would-type` — **pick your
own value in your host's environment variable settings, never hardcode
it in code or commit it**. Visiting that exact path once sets a
long-lived cookie flagging your browser as admin; from then on your
browser sees the admin panel at the normal `/` and every other path on
your main domain, while everyone else keeps seeing the public site at
those same paths. Your real username/password login still fully gates
actual access underneath this — the cookie only decides which app
renders for you, it's not itself a way in.

### Option B — two separate processes, `site-server.js` + `admin-server.js`

Better for a VPS where you're already running things as genuinely separate
services (or just for local dev — running two servers locally is easy to
open two browser tabs against).

```
node set-admin-password.js youruser yourpassword   # one-time setup
npm run site                                       # public site  -> http://localhost:8800
npm run admin                                      # admin panel  -> http://localhost:8899
```
**Only use this for a host where both processes share the same disk**
(a single VPS, for example). On a PaaS where each deployment is isolated,
use Option A instead — otherwise admin edits won't show up publicly.

No dependencies to install — every mode uses only Node's built-in modules.
Requires Node 18+.

## Admin panel login

`admin-server.js` requires a username + password before anything else in
it is reachable — every page and every API route redirects to `/login`
(or returns 401 for API calls) until you sign in.

**Set your password** (do this before your first deploy, and again
whenever you want to change it):
```
node set-admin-password.js youruser yourpassword
```
This writes `admin-auth.json` — a random salt plus a `scrypt` hash of the
password, never the plaintext. That file is gitignored; don't commit it,
and don't lose it (there's no "forgot password" flow — just run the
script again with a new password to overwrite it).

Password rules enforced by the script: at least 8 characters. Pick
something a lot longer than that in practice — this panel can rewrite any
of your live templates.

Once a password is set, `admin-server.js` is safe to run with `HOST`
listening on all interfaces (that's the default now) and expose on a real
domain, same as the public site — see the deploy steps below. Sessions
last 7 days, use `HttpOnly` + `SameSite=Strict` cookies, and login is
rate-limited (8 attempts per IP per 15 minutes) to slow down brute-force
guessing.

If you'd rather not expose it publicly at all even with a password, you
can still set `HOST=127.0.0.1` and reach it only via an SSH tunnel — see
the bottom of this file.

## Deploying for real

`site-server.js` (the public gallery) has never needed authentication and
was always meant to be public. `admin-server.js` can now be deployed
publicly too, as long as you've set a real password first with
`set-admin-password.js` — every route is gated behind login. If you skip
that step, the panel refuses to serve anything useful and logs a warning
on startup.

### 1. Pick a host

Any host that can run a long-lived Node process works: a VPS (DigitalOcean,
Linode, Hetzner...), Railway, Render, Fly.io, Hostinger, or your own server.
This app is a single Node process with no database and no build step — copy
the `extracted-templates` folder up and run it.

**On a PaaS with per-deployment isolated filesystems (Hostinger, Railway,
Render, etc.)**: deploy once, Entry file `server.js` (Option A above), and
point both your main domain and an `admin.` subdomain at that one
deployment. Deploying `site-server.js` and `admin-server.js` as two
separate deployments there means admin edits won't appear on the public
site — see the Option A/B explanation above for why.

### 2. Environment variables

- `PORT` — what port to listen on (most platforms set this for you)
- `HOST` — optional; omit to listen on all interfaces (the normal case)

### 3. Run it with a process manager

Don't run `node site-server.js` directly in production — if it ever crashes
(it's hardened against that, but still), nothing brings it back. Use `pm2`
or a systemd service.

**pm2:**
```
npm install -g pm2
pm2 start site-server.js --name meow-webpages
pm2 save
pm2 startup   # follow the printed instructions to survive reboots
```

**systemd** (`/etc/systemd/system/meow-webpages.service`):
```ini
[Unit]
Description=Meow Webpages site
After=network.target

[Service]
Type=simple
WorkingDirectory=/path/to/extracted-templates
ExecStart=/usr/bin/node site-server.js
Restart=on-failure
Environment=PORT=8800

[Install]
WantedBy=multi-user.target
```
Then: `sudo systemctl enable --now meow-webpages`

### 4. Put a real domain + HTTPS in front of it

Run nginx (or Caddy, which does HTTPS automatically) in front of the Node
process and point your domain at it. Example nginx site config:

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://127.0.0.1:8800;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```
Then get a free cert with `certbot --nginx -d yourdomain.com`.

### 5. Disk space

Every "Create my page" and photo upload writes a small file to
`site/generated/` or `site/uploads/`. There's no automatic cleanup or size
cap — for a low-traffic personal site this is a non-issue, but if this ever
gets real public traffic, keep an eye on disk usage (`du -sh site/generated
site/uploads`) or add a cron job to prune old files.

## Running the admin panel on the server

Now that login is required, the normal setup is to just deploy it like
the public site:

```
node set-admin-password.js youruser yourpassword
pm2 start admin-server.js --name meow-webpages-admin
pm2 save
```

Put it on its own subdomain behind nginx + HTTPS (same pattern as step 4
above, just proxying to `127.0.0.1:8899` instead of `8800`), and you can
log into `https://admin.yourdomain.com` from any browser, any device. The
password + session cookie + rate limiting are what keep it safe to expose
this way — don't skip setting a real password.

**If you'd rather not expose it publicly at all**, even with a password,
set `HOST=127.0.0.1` when starting `admin-server.js` and reach it only
through an SSH tunnel instead:
```
ssh -L 8899:localhost:8899 you@yourserver.com
```
then open `http://localhost:8899` locally. This adds an extra layer (you'd
need both the SSH tunnel *and* the password) at the cost of needing the
tunnel open every time.

## What's already handled

- Gzip compression for HTML/CSS/JS
- Long-cache headers for content-hashed assets, no-cache for pages that can
  change
- Streamed file serving (not loaded fully into memory) with HTTP Range
  support, so audio players can seek
- Won't take the whole site down on a single bad request — errors are
  caught and logged instead of crashing the process
- Graceful shutdown on SIGTERM/SIGINT (so restarts/deploys don't kill
  requests mid-flight)
