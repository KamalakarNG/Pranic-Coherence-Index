Pranic Field Dashboard — Enhanced PWA (Workbox)

This project is a Vite + React Progressive Web App with Workbox integration.
The build script runs `vite build` and then uses Workbox `injectManifest` to
create a production-ready `sw.js` with a precache manifest.

How to run (dev):
1. npm install
2. npm run dev
3. Open http://localhost:5173 and use 'Add to Home screen' when available.

How to build (production, includes workbox precache):
1. npm install
2. npm run build
   - This runs `vite build` which outputs into `dist/`.
   - Then `node build-sw.js` injects the precache manifest into `dist/sw.js`.
3. Serve the `dist/` folder over HTTPS to test installability and SW behavior.

Notes:
- Place icons in /icons (icon-192.png, icon-512.png) before building for proper manifest.
- The `sw-template.js` uses workbox strategies: NetworkFirst for navigation, StaleWhileRevalidate for assets, CacheFirst for images.
- You can tune caching strategies in `sw-template.js`.
- For CI, ensure Node version >= 18 and include `npm ci` before `npm run build`.

