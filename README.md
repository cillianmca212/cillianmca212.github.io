# Cillian McArdle — personal portfolio

A single-page static site. No build step, no framework, no dependencies to
install. Open `index.html` in a browser and it works.

Built for the AERO62520 Robotic Systems Design Project CPD coursework.

---

## Files

```
index.html                  the whole page
css/style.css               all styling
css/fonts.css               @font-face declarations
js/main.js                  menu, scroll reveals, nav highlighting
fonts/                      self-hosted WOFF2 files (SIL OFL 1.1)
fonts/licenses/             full licence texts for the three typefaces
images/                     four photographs
files/Cillian_McArdle_CV.pdf
```

Everything is relative-path linked, so the site works from any folder or
subdirectory — no configuration needed.

---

## Publishing it

The coursework needs a public weblink that stays online for three weeks after
submission. Any of these work; **Netlify Drop is the fastest** if you just want
a link in under a minute.

### Option A — Netlify Drop (no account needed to start, ~1 minute)

1. Zip the contents of this folder, or keep the folder as-is.
2. Go to <https://app.netlify.com/drop>.
3. Drag the **folder** onto the page.
4. You get a URL like `https://random-name-123.netlify.app` immediately.
5. Create a free account when prompted so the site stays up permanently and you
   can rename it to something like `cillian-mcardle.netlify.app`.

### Option B — GitHub Pages (~5 minutes)

1. Create a new **public** repository named `<your-username>.github.io`.
2. Upload every file and folder from here into the root of that repository —
   `index.html` must sit at the top level, not inside a subfolder.
3. Go to **Settings → Pages**.
4. Under *Build and deployment*, set **Source** to `Deploy from a branch`, pick
   the `main` branch and the `/ (root)` folder, then **Save**.
5. Wait 1–2 minutes. The site appears at `https://<your-username>.github.io`.

### Option C — Cloudflare Pages

1. Sign in at <https://pages.cloudflare.com> and choose *Upload assets*.
2. Upload this folder, give the project a name, and deploy.

Whichever you use, **open the published URL and click every link** before you
submit. A link that works locally but 404s on the host is almost always a
capitalisation mismatch in a filename.

---

## Updating it later

Everything you are likely to change is plain text in `index.html`.

| What to change | Where |
|---|---|
| Bio, objectives, any wording | the relevant `<section>` in `index.html` |
| LinkedIn URL | search `index.html` for `linkedin.com` — 3 places |
| CV | replace `files/Cillian_McArdle_CV.pdf`, keep the same filename |
| Email / phone | the `#contact` section |
| Add a project | copy a whole `<article class="project">` block and edit it |
| Colours | the `:root` block at the top of `css/style.css` |

### Filling in a placeholder link

Unfinished links are marked so they announce themselves rather than silently
going nowhere. They look like this:

```html
<a class="lnk lnk--muted" href="#" data-placeholder>Dissertation report <span>add link</span></a>
```

To activate one: put the real URL in `href`, delete `data-placeholder`, delete
the `<span>` note, and change `lnk--muted` to `lnk`:

```html
<a class="lnk" href="https://example.com/dissertation.pdf" target="_blank" rel="noopener">Dissertation report</a>
```

If you would rather host a report alongside the site, drop the PDF into
`files/` and point the `href` at `files/your-report.pdf`.

### Adding a video

Project sections are set up for images. For a video, replace the `<img>` inside
a `<figure class="project__figure">` with:

```html
<video controls preload="metadata" poster="images/your-poster.jpg" style="width:100%">
  <source src="files/your-video.mp4" type="video/mp4">
  Your browser does not support embedded video.
</video>
```

Keep the `<figcaption>` — every visual on the page has one, and the brief asks
for context on graphical elements.

---

## Notes on how it is built

- **Responsive** at three breakpoints: 1080px, 900px (layout stacks, mobile menu
  appears) and 560px. Tested at 1440, 834 and 390px wide.
- **Accessibility.** Skip link, visible keyboard focus rings, descriptive `alt`
  text on all four images, a logical `h1→h2→h3→h4` outline, and all text at
  WCAG AA contrast or better.
- **Motion** respects `prefers-reduced-motion`. If a visitor has reduced motion
  turned on, or JavaScript is disabled, everything is immediately visible —
  the reveal effect can never leave content hidden. There is also a 2.5-second
  failsafe so archival screenshot tools capture the full page.
- **Fonts are self-hosted**, so there are no third-party requests, nothing to
  break if Google Fonts is blocked, and the page renders identically offline.
- **No tracking, no analytics, no cookies.**
- Total page weight is roughly 0.9 MB, most of it photographs.

---

## Credits

Photographs are Cillian McArdle's own. The hypersonic airframe figure
(`images/hypersonic-airframe.svg`) is an original drawing made for this page and
is indicative only — it does not depict the INVICTUS vehicle. Typefaces are
Archivo (Omnibus-Type), Source Serif 4 (Adobe) and IBM Plex Mono (IBM), all under
the SIL Open Font License 1.1 — licence texts are in `fonts/licenses/`. No
third-party images, icons, video or illustration are used anywhere on the page.

Built with Claude (Claude Opus 5) by Anthropic.
