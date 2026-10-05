# MLK Leadhunters — site (Hugo, EN + FR)

The main Lead Hunters site, in the Lumière direction: graphite and ice, one blue, orange only in small details, Instrument Sans, your real reeded-glass photos.

## Run it locally

    hugo server          # http://localhost:1313 (needs Hugo extended ≥ 0.147)

## Deploy to GitHub Pages

1. Push this folder to the `mlkleadhunters` repository (branch `main`).
2. Repository → Settings → Pages → Source: **GitHub Actions**. The workflow in `.github/workflows/hugo.yml` builds and publishes on every push.
3. `static/CNAME` says `mlkleadhunters.com`: that is the site. At your registrar, redirect `mlkleadhunters.co.uk` → `https://mlkleadhunters.com/` (301) and `mlkleadhunters.fr` → `https://mlkleadhunters.com/fr/` (301). GitHub Pages serves one domain per repository, so the regional domains redirect to it; the English pages speak to the UK, the French pages to France.

## Emails

Set in `hugo.toml`: English pages show `hello@mlkleadhunters.co.uk`, French pages `hello@mlkleadhunters.fr`, and the legal notice lists `hello@mlkleadhunters.com` as the main address. The contact form posts to the address of the page's language. Create the three mailboxes (or aliases to one inbox) before launch.

## Colour in the text

- In front matter headings, wrap a phrase in `<span class='hl'>…</span>` (blue) or `<span class='hl--o'>…</span>` (orange). Use `heading:` for pages, `hero_title:` and the `*_title:` fields on the home page.
- In articles, `**bold**` renders blue and `==marked==` renders orange. One or two per article is plenty.
- Icons: set `icon: name` in the front matter of a page, a service, a step or an offer. Available: target, server, pen, inbox, calendar, bolt, shield, chart, list, chat, mail, globe, phone, clock, send, book, spark, user, search, flag, star, scale, layers. Blog cards pick their icon from the first tag.

## Behaviours (assets/js/main.js)

- **Preloader**: MLK → target, mail, handshake → the slash turns → Leadhunters, 1.3 s, once per browser session, skipped for reduced motion.
- **Sticky glass header**: dark glass over the hero, light glass over the body; the switch happens on scroll.
- **Bottom dock (phones)**: Contact + Book a call slide up once the hero (or the page head) has scrolled away; hidden on the contact page.
- **Counters**: any element with `data-count` counts up when it enters the view.
- **Language prompt**: compares the browser language with the page language and offers the other version once; the choice (or a dismissal) is remembered in localStorage.
- **Page transition**: a 180 ms fade on internal links; nothing on external links, mailto or modifier clicks.

## Structure

- `content/en/…` and `content/fr/…` — same file names on both sides; that is how the FR/EN switch links the two versions.
- `content/*/blog/` — one Markdown file per article. Copy any existing one to add a new article; keep the same file name in both languages.
- `content/*/projects/` — one file per project; `results` and `review` live in the front matter.
- `content/*/offers.md` — the two offers (Set Up, Set Up + Outreach / Pilotage), text only, no prices.
- `layouts/` — templates. `assets/css/main.css` is the whole design; `assets/js/main.js` the animations and the menu.
- `static/images/` — the photos. `hugo.toml` — languages, menus, email, booking URL.

## Before going live

- [ ] **Project figures**: replace the `[—]` values in `content/*/projects/pilotech.md` and `eden-corporate-mobility.md` with the real numbers, and delete the sentence "The figures in brackets…".
- [ ] **Reviews**: the two quotes are drafts written to be confirmed by Pilotech and Eden Corporate Mobility. Replace the text, the author and the role with what the clients approve, then remove the `status:` line.
- [ ] **Booking**: set `bookingUrl` in `hugo.toml` to your Calendly / YouCanBookMe link (today every "Book a call" button goes to /contact/).
- [ ] **Form**: the contact form posts to formsubmit.co with a table template, no captcha page (honeypot only), a required consent checkbox, and redirects to `/thanks/` (or `/fr/thanks/`). The first submission from each language sends an activation email to that language's address (hello@mlkleadhunters.co.uk / .fr); click it once. Or swap the `action` in `layouts/_default/contact.html` for Formspree or any other endpoint.
- [ ] **Legal notice**: complete the company name, legal form, registration number and address in `content/*/legal.md`.
- [ ] **Stats on the home page** (25 k / 31 % / 94 %) are the ones from the current site: confirm they still hold, in `content/*/_index.md`.
- [ ] **Web Studio** and the accountants site are separate: this site links to neither. Add links in `layouts/partials/footer.html` when they are live.
