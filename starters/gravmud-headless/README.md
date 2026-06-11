# gravmud-headless — MUD Shell starter

Headless GravMUD client for **gravfans.live**. SvelteKit + Konsta UI + Mambers Community API.

## Quick start

```bash
cd packages/mud-shell/starters/gravmud-headless
cp .env.example .env
npm install
npm run dev
```

Open http://localhost:5173 — dev server proxies `/members/api` to gravfans.

## Screens (v0.1)

| Route | API |
|-------|-----|
| `/feed` | `GET /members/api/feed` |
| `/members` | `GET /members/api/members` |
| `/profile/[user]` | `GET /members/api/profile/{user}` + activity |
| `/me` | `GET /members/api/whoami` + login CTA |

## Build (static / cPanel / DirectAdmin)

```bash
npm run build
```

Upload `build/` to docroot (e.g. `app.gravfans.live`).

Uses `adapter-static` with SPA fallback (`index.html`).

## Env

| Variable | Default |
|----------|---------|
| `PUBLIC_GRAV_ORIGIN` | `https://gravfans.live` |
| `PUBLIC_APP_TITLE` | `MUD Shell · gravfans` |

## Package split (later)

Code lives in `src/lib/shell` and `src/lib/village` — destined for `@gravmud/shell` and `@gravmud/shell-village` packages.
