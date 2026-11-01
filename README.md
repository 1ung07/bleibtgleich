# bleibtgleich React project

React Router serves the site pages and 15 project details. Home, work, archive, and contact have their own JSX pages; every project detail route uses the shared `src/pages/Project.jsx` template. Project titles, descriptions, services, gallery images, card covers, and awards are stored in `src/data.js`. Animation hooks use namespaced `anim-*` classes instead of `data-*` attributes. Each animation and interaction is separated into a focused source file in `src/animations/`; `sourceMotion.js` loads them in their shared runtime scope to preserve their existing behavior. The asset-sync script excludes the old animation bundle and syncs required files into `public/media`. CSS lives in stylesheets, while the original Webflow stylesheet, interaction dependencies, and local media preserve the typography, spacing, gallery composition, menu, and footer.

Shared navigation, grid backdrop, preloader, and project footer JSX live in `src/components/`. React owns route selection; the original page animation module supplies the source reveals and menu effects. Analytics and remote cursor tracking are omitted.

## Run locally

```powershell
npm install
npm run dev
```

The development and build commands copy required images, styles, fonts, and interaction assets from `../html_project/assets` into `public/media`. The source export must remain alongside this project for asset syncing and page regeneration.

## Routes

- `/` — home
- `/work` — work listing
- `/archive` — archive
- `/contact` — contact
- `/works/<project>` — project detail page using the shared template and data
- `/work/<project>` — alternate URL for the same project detail page

## Build

```powershell
npm run build
npm run preview
```

The original page structure and design system are represented as JSX, while React Router handles page navigation. The source HTML is only used as the input to the one-time/explicit generation command.
# bleibtgleich
