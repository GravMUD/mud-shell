# Discussion starters (manual fallback)

If `scripts/seed-mud-shell-discussions.ps1` fails, paste these into
[Discussions](https://github.com/GravMUD/mud-shell/discussions) by hand.

---

## Announcements — MUD Shell v0.1 — MIT headless frontend

**MUD Shell** is live in repo: SvelteKit + Konsta, optional Village pack, MIT forever on the framework.

### What's shipped
- `starters/gravmud-headless` — feed, members, profile, login CTA
- Community API via Mambers `/members/api` (gravfans backend)
- Static build for cPanel (`adapter-static` + SPA fallback)

### Links
- Headless demo: https://app.gravfans.live/feed
- Classic village: https://gravfans.live/members/damo
- Marketing: https://getmudshell.com
- Mambers plugin: https://github.com/GravMUD/grav-plugin-mambers

### Quick start
```bash
git clone https://github.com/GravMUD/mud-shell.git
cd mud-shell/starters/gravmud-headless
npm install && npm run dev
```

Groundswell not fork. >8)

---

## General — Headless vs classic GravMUD — which lane?

| Lane | When |
|------|------|
| **Classic** | Twig theme + Mambers JS on same domain. gravfans.live today. |
| **Headless** | `app.yoursite.com` SvelteKit shell, Grav/Mambers as API brain. |

Same flat files. Same Mambers data. Different browser face.

Cookie login across subdomains (`.yoursite.com`) is v0.2 — public feed works now without auth.

---

## Ideas — Roadmap poll (react with emoji)

Reply with 👍 on what you want next:

1. npm packages (`@gravmud/shell`, `@gravmud/shell-village`)
2. `@gravmud/adapter-grav` — Grav API pages in shell
3. Directus adapter stub
4. PWA install prompt + offline shell
5. Composer / reactions in Village pack (needs session auth)

No block builder. Ever. :D
