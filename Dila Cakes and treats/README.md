# Dila Cakes & Treats — Website

A complete, responsive website for **Dila Cakes & Treats**, based in Nzega, Tabora, Tanzania. Built with plain HTML5, CSS3 and vanilla JavaScript — no frameworks, no build step, no backend.

## Folder structure

```
Dila Cakes and treats/
│
├── index.html                 ← the whole site (one page, section by section)
│
├── css/
│   └── style.css              ← all styling, brand colors, responsive rules
│
├── js/
│   └── script.js              ← mobile menu, gallery lightbox, form, animations
│
├── images/
│   ├── logo/                  ← (not currently used by index.html — see note below)
│   ├── founder/
│   │   └── founder.jpeg       ← Gudila Gerald's photo (About Us section)
│   ├── cakes/
│   │   └── cake2.jpeg … cake15.jpeg   ← 13 real cake photos, used in Cakes card + Gallery
│   ├── treats/                ← empty — see "Adding the Treats photo" below
│   ├── chicken/
│   │   ├── dfc1.jpg           ← DFC photo (offer card, DFC feature section, Gallery)
│   │   └── dfc2.webp          ← DFC photo (DFC feature section, Gallery)
│   └── other/                 ← empty, reserved for any future business photos
│
├── dilalogo.jpeg               ← logo file, referenced directly by the nav bar & favicon
├── founderphoto.jpeg           ← original founder photo upload (copy also lives in images/founder/)
├── treats.jpg                  ← NOT used on the site (see note below)
│
└── README.md                  ← this file
```

**Note on the logo path:** the nav bar and browser-tab icon (favicon) reference `dilalogo.jpeg` directly from the project root, rather than the `images/logo/` folder. Both work fine — just be aware the logo has two copies (root file + `images/logo/logo.jpeg`). If you replace the logo later, update `dilalogo.jpeg` at the root, or edit the two `src="dilalogo.jpeg"` / `href="dilalogo.jpeg"` references near the top of `index.html` to point wherever you keep the new file.

**Note on `treats.jpg`:** this file has a visible "© Sally's Baking Addiction" watermark — it's a copyrighted photo from another baking blog, not an actual photo of Dila's own treats. It has **not** been used anywhere on the site. The Treats section instead shows an elegant "Treats photos coming soon" placeholder until a real photo of Dila's own treats is available.

## How placeholders work (and how to add missing photos later)

Two sections currently don't have real photos yet: **Treats**. Instead of a broken image or a fake stock photo, they show a soft, on-brand "photos coming soon" tile.

To make a real photo appear automatically — no code changes needed:

1. Drop a photo into `images/treats/`.
2. Name it exactly `treat1.jpg` (matching the filename already referenced in `index.html`).
3. Refresh the page — the real photo replaces the placeholder automatically, in both the "What We Offer" card and the Gallery.

If you'd rather use a different filename, search `index.html` for `treat1.jpg` and update the `src="..."` to match your new filename.

## Brand colors

The color palette was taken directly from the official Dila Cakes & Treats logo (rose pink + lavender purple, on soft cream, with deep plum text). A separate warm amber/terracotta accent is used only for the DFC (Dila Fried Chicken) section, to give it its own "signature dish" identity. All colors are defined once as CSS variables at the top of `css/style.css` under `:root { ... }` — change a color there and it updates everywhere it's used.

## WhatsApp integration

Every "Order," "Inquire," "Chat," or "Order DFC" button links to `https://wa.me/255741425452` with a pre-filled message (URL-encoded), e.g.:

```
https://wa.me/255741425452?text=Hello%20Dila%20Cakes%20%26%20Treats!%20I%20would%20like%20to%20make%20an%20order.
```

Tapping it opens WhatsApp (app on mobile, WhatsApp Web on desktop) with that message ready to send — no typing required for the customer.

The **inquiry form** at the bottom of the Contact section works the same way: it does not send an email or hit a server (there is no backend). When submitted, JavaScript (`js/script.js`) builds a message from the name, phone, interest, and message fields, then opens WhatsApp with everything pre-filled for the customer to review and send.

## Instagram & Email links

- Instagram buttons/icons link to `https://www.instagram.com/dilacakesandtreats/`.
- Email buttons/icons use `mailto:gudilagerald6@gmail.com`, which opens the visitor's default email app.

## Running the site locally in VS Code

No build step or server is required — but opening `index.html` directly via `file://` will block the JavaScript `fetch`-like image-loading checks in some browsers, so a local server is recommended:

- **Easiest:** install the "Live Server" extension in VS Code, right-click `index.html`, and choose **"Open with Live Server."**
- **Alternative:** just double-click `index.html` — it will work in most browsers, though a local server is more reliable for testing.

## Editing content later

- **Text:** open `index.html` and edit the text between tags directly — it's organized into clearly commented sections (`<!-- ============ HERO ============ -->`, etc.) matching the site's sections top to bottom.
- **Colors:** edit the CSS variables at the top of `css/style.css`.
- **Photos:** add files to the matching `images/` subfolder and update the `src="..."` path in `index.html` if the filename differs.
- **WhatsApp number:** if it ever changes, search `index.html` for `255741425452` and replace every occurrence (it appears in every WhatsApp button/link).

## Uploading to GitHub

```bash
git init
git add .
git commit -m "Dila Cakes & Treats website"
git branch -M main
git remote add origin <your-empty-GitHub-repo-URL>
git push -u origin main
```

For **GitHub Pages**: in the repo's Settings → Pages, set the source to the `main` branch, root folder. The site will be live at `https://<username>.github.io/<repo-name>/`.

## Deploying to Cloudflare Pages

1. Push the project to GitHub (above).
2. In the Cloudflare dashboard, go to **Workers & Pages → Create → Pages → Connect to Git**, and select the repository.
3. Build settings: leave the build command **empty** and set the output directory to `/` (this is a static site with no build step).
4. Deploy — Cloudflare will give you a live `*.pages.dev` URL, with a custom domain optional afterward.

Netlify works the same way (drag-and-drop the folder, or connect the GitHub repo, with an empty build command and `/` as the publish directory).
