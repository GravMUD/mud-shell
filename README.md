# MUD Shell

**Marketing:** [getmudshell.com](https://getmudshell.com) · **Dev docs:** [mudshell.dev](https://mudshell.dev) · **Headless demo:** [app.gravfans.live](https://app.gravfans.live/feed)

Mobile-first headless frontend for any CMS. **SvelteKit + Konsta UI.** Optional **MUD Shell Village** pack for members, feed, and fan-site chrome.

> *Skins not forks. Village optional. Groundswell not Grav.*

**License:** MIT · **Author:** [FutureVision Labs](https://futurevision.host) · Team DC

---

## Two products

| Package | What it is |
|---------|------------|
| **`@gravmud/shell`** (core) | Konsta app chrome, layouts, theme tokens, content adapter interface. No village. No Grav imports. |
| **`@gravmud/shell-village`** (optional) | Feed, profiles, directory. HTTP-only to a Community API (Mambers today). |

```
Any headless CMS  →  MUD Shell (adapters)  →  optional Village pack  →  /members/api
```

---

## v0.1 — what's in this repo

Monorepo workspace (packages extract to npm later):

```
packages/mud-shell/
  LICENSE
  starters/gravmud-headless/    SvelteKit app → gravfans headless demo
    src/lib/shell/              future @gravmud/shell
    src/lib/village/            future @gravmud/shell-village
```

**Live screens** (gravmud-headless starter):

| Route | API |
|-------|-----|
| `/feed` | `GET /members/api/feed` |
| `/members` | `GET /members/api/members` |
| `/profile/[user]` | profile + activity |
| `/me` | whoami + login CTA |

Backend for the demo: [gravfans.live](https://gravfans.live) (Grav 2 + [Mambers](https://github.com/GravMUD/grav-plugin-mambers)).

---

## Quick start

```bash
git clone https://github.com/GravMUD/mud-shell.git
cd mud-shell/starters/gravmud-headless
cp .env.example .env
npm install
npm run dev
```

Open http://localhost:5173 — dev server proxies `/members/api` to gravfans.

### Production build

```bash
# from GRAV-MUD monorepo root (if you have it):
./scripts/build-gravfans-app.ps1
# → deploy/gravfans-app.zip for cPanel / static host
```

Or manually:

```bash
cd starters/gravmud-headless
PUBLIC_GRAV_ORIGIN=https://gravfans.live npm run build
# upload build/ to docroot (SPA — .htaccess included)
```

---

## Stack

| Layer | Choice | Why |
|-------|--------|-----|
| Framework | SvelteKit 5 | Same family as Grav Admin2 |
| Mobile chrome | Konsta UI | Tabs, safe areas, sheets |
| Deploy | `adapter-static` | cPanel-friendly, no Node in prod |
| Community API | `/members/api/*` | Mambers public JSON (avoids brittle `/api/v1` on some hosts) |

---

## Deployment modes

| Mode | Description |
|------|-------------|
| **Classic GravMUD** | Twig + plugin JS on gravfans.live (no Shell required) |
| **Headless GravMUD** | Grav backend + MUD Shell on `app.yoursite.com` |
| **Any headless CMS** | Shell + your adapter; Village pack only if you want community |

---

## Env

| Variable | Default |
|----------|---------|
| `PUBLIC_GRAV_ORIGIN` | `https://gravfans.live` |
| `PUBLIC_APP_TITLE` | `MUD Shell · gravfans` |

---

## Services (not included in MIT)

Framework is free. [FutureVision](https://futurevision.host) offers headless launch, custom Konsta themes, adapter wiring, and deploy hand-holding — see [getmudshell.com/#services](https://getmudshell.com/#services).

---

## Roadmap

- [ ] Extract `@gravmud/shell` and `@gravmud/shell-village` to npm
- [ ] `@gravmud/adapter-grav` — Grav API pages
- [ ] Session cookie auth on same parent domain
- [ ] `starters/default` — shell only, mock adapter
- [ ] PWA / Capacitor wrap

Planning docs in [GravMUD/GRAV-MUD](https://github.com/GravMUD/GRAV-MUD): `Docs/MUD-SHELL-VILLAGE.md`, `Docs/MUD-SHELL-GRAVMUD.md`.

---

## Community

- [Discussions](https://github.com/GravMUD/mud-shell/discussions) — Q&A, ideas, show your deploy
- [Issues](https://github.com/GravMUD/mud-shell/issues) — bugs and features

Homage to [Grav CMS](https://getgrav.org) — not official Grav branding.
