const workboxBuild = require('workbox-build');
const path = require('path');

const build = async () => {
  // This will copy files from dist into a service worker precache manifest
  const swSrc = path.join(__dirname, 'sw-template.js');
  const swDest = path.join(__dirname, 'dist', 'sw.js');

  const result = await workboxBuild.injectManifest({
    swSrc,
    swDest,
    globDirectory: path.join(__dirname, 'dist'),
    globPatterns: ['**/*.{html,js,css,png,jpg,json}'],
  });

  console.log('Injected manifest into sw.js, size:', result.size, 'files:', result.count);
};

build().catch(err => { console.error(err); process.exit(1); });
