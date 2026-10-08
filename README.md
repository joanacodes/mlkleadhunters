# MLK Leadhunters — site (Hugo, EN + FR)

The main Lead Hunters site, in the Lumière direction: graphite and ice, one blue, orange only in small details, Instrument Sans, your real reeded-glass photos.

## Run it locally

    hugo server          # http://localhost:1313 (needs Hugo extended ≥ 0.147)

## Deploy to GitHub Pages

1. Push this folder to the `mlkleadhunters` repository (branch `main`).
2. Repository → Settings → Pages → Source: **GitHub Actions**. The workflow in `.github/workflows/hugo.yml` builds and publishes on every push to `main`. It always builds for `baseURL` in `hugo.toml` (`https://mlkleadhunters.com/`), so canonical links, the sitemap and share links always name the official domain.
3. The official site is **`mlkleadhunters.com`**, entered in Settings → Pages → **Custom domain** (with GitHub Actions, GitHub ignores the `static/CNAME` file, which is kept only as a reminder). At your registrar, redirect `mlkleadhunters.co.uk` → `https://mlkleadhunters.com/` (301, keeping the path, so old links such as `/how-we-work.html` still reach their redirect) and `mlkleadhunters.fr` → `https://mlkleadhunters.com/fr/` (301). GitHub Pages serves one domain per repository, so the regional domains redirect to it; the English pages speak to the UK, the French pages to France.

## Emails

Set in `hugo.toml` (`email` per language): English pages show `hello@mlkleadhunters.co.uk`, French pages `contact@mlkleadhunters.fr`, and the legal notice lists `hello@mlkleadhunters.com` as the main address. The contact form posts to the address of the page's language. Create the three mailboxes (or aliases to one inbox) before launch.

## Colour in the text

- In front matter headings, wrap a phrase in `<span class='hl'>…</span>` (blue) or `<span class='hl--o'>…</span>` (orange). Use `heading:` for pages, `hero_title:` and the `*_title:` fields on the home page.
- In articles, `**bold**` renders blue and `==marked==` renders orange. One or two per article is plenty.
- Icons: set `icon: name` in the front matter of a page, a service, a step or an offer. Available: target, server, pen, inbox, calendar, bolt, shield, chart, list, chat, mail, globe, phone, clock, send, book, spark, user, search, flag, star, scale, layers. Blog cards pick their icon from the first tag.

## Behaviours (assets/js/main.js)

- **Preloader**: "MLK" and "Leadhunters" from the start, with the target, mail and handshake icons playing between them; once the last icon has played, the "/" takes their place and the logo "MLK / Leadhunters" holds for about a second. About 3 s, once per browser session, skipped for reduced motion.
- **Hero highlight**: the highlighted words of the home headline (`<span class='hl'>` in `hero_title`) stay white on a blue highlight that slides in from left to right once the hero appears.
- **Sticky glass header**: dark glass over the hero, light glass over the body; the switch happens on scroll.
- **Bottom dock (phones)**: Contact + Book a call slide up once the hero (or the page head) has scrolled away; hidden on the contact page.
- **Counters**: any element with `data-count` counts up when it enters the view.
- **Language prompt**: compares the browser language with the page language and offers the other version once; the choice (or a dismissal) is remembered in localStorage.
- **Page transition**: a 180 ms fade on internal links; nothing on external links, mailto or modifier clicks.

## Links and anchors

- **Book a call**: every booking button (header, menu, dock, hero, offers, blog, the closing band) goes to the form on the contact page: `/contact/#book-a-call`, `/fr/contact/#reserver-un-appel`. The anchor names are in `i18n/*.toml` (`anchor_book`); the link is built in `layouts/partials/book-url.html`. To use Calendly instead, put the full link in `bookingUrl` in `hugo.toml`.
- **Contact / Write to us** links go to the top of the contact page.
- **Project cards** open the project page on its review: `#review`, `#avis` (`anchor_review`). The full review is the second section of each project page.
- **Old addresses** from the previous site: `/how-we-work.html` → the How it works section of the home page (`/#how`; its old `#targeting`, `#copywriting`, `#deliverability` and `#reporting` sections go to the matching service), see `static/how-we-work.html`; `/mentions-legales.html` → `/legal/` (alias in `content/en/legal.md`); the old home anchors `/#contact` → the booking form, `/#pricing` → `#offers`, `/#work` → `#projects` (script at the end of `layouts/index.html`).

## Metadata (search engines and link previews)

Built in `layouts/partials/head.html`, in English and French:

- `<title>`: `seo_title` from the front matter + " — MLK Leadhunters" (the home page's `seo_title` is the full title). Without `seo_title`, the page title is used.
- Meta description: `description` from the front matter (every page has one), else `summary`, else the `lead`.
- Canonical URL, `hreflang` links between the English and French versions (+ `x-default` → English), robots (`noindex` on the thank-you pages, which are also left out of the sitemap).
- Open Graph and Twitter cards for link previews, with a 1200×630 image cropped from the page's photo (`image:` in the front matter, else the hero photo); `article:` dates and tags on blog posts.
- Structured data (schema.org JSON-LD): Organization, WebSite, WebPage, breadcrumbs, BlogPosting on articles, Service on service pages, Article on projects.
- Favicons (`static/favicon.ico`, `favicon.svg`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png`) and `site.webmanifest`; `robots.txt` points to the sitemap.

After launch, add the site to Google Search Console and Bing Webmaster Tools and submit `https://mlkleadhunters.com/sitemap.xml`.

## Structure

- `content/en/…` and `content/fr/…` — same file names on both sides; that is how the FR/EN switch links the two versions.
- `content/*/blog/` — one Markdown file per article. Copy any existing one to add a new article; keep the same file name in both languages.
- `content/*/projects/` — one file per project; `results` and `review` live in the front matter.
- `content/*/offers.md` — the two offers (Set Up, Set Up + Outreach / Pilotage), text only, no prices.
- `layouts/` — templates. `assets/css/main.css` is the whole design; `assets/js/main.js` the animations and the menu.
- `static/images/` — the photos. `hugo.toml` — languages, menus, email, booking URL.

## Before going live

- [ ] **Project figures**: replace the `[—]` values in `content/*/projects/pilotech.md` and `eden-corporate-mobility.md` with the real numbers. Until then the Results block is hidden: any figure still in brackets is left off the page.
- [ ] **Form**: the contact form posts to formsubmit.co with a table template, no captcha page (honeypot only), a required consent checkbox, and redirects to `/thanks/` (or `/fr/thanks/`). The first submission from each language sends an activation email to the form's address (hello@mlkleadhunters.co.uk in English, contact@mlkleadhunters.fr in French); click it once. Or swap the `action` in `layouts/_default/contact.html` for Formspree or any other endpoint.
- [ ] **Legal notice**: complete the company name, legal form, registration number and address in `content/*/legal.md`.
- [ ] **Stats on the home page** (25 k / 31 % / 94 %) are the ones from the current site: confirm they still hold, in `content/*/_index.md`.
- [ ] **Web Studio** and the accountants site are separate: this site links to neither. Add links in `layouts/partials/footer.html` when they are live.
