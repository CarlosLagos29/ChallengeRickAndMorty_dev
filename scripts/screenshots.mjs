import { existsSync } from 'node:fs';
import { mkdir } from 'node:fs/promises';
import puppeteer from 'puppeteer-core';
import { preview } from 'vite';

const OUTPUT_DIR = 'docs';
const CHROME_CANDIDATES = [
  process.env.CHROME_PATH,
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
];

const SHOTS = [
  {
    file: 'screenshot-desktop.webp',
    path: '/',
    viewport: { width: 1280, height: 800 },
    ready: () =>
      document.querySelectorAll('main a img').length > 0 &&
      [...document.querySelectorAll('main a img')].slice(0, 10).every((img) => img.complete),
  },
  {
    file: 'screenshot-mobile.webp',
    path: '/?character=1',
    viewport: { width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
    ready: () => document.querySelector('dialog img')?.complete === true,
  },
];

const executablePath = CHROME_CANDIDATES.find((path) => path && existsSync(path));
if (!executablePath) {
  console.error('Chrome not found. Set CHROME_PATH to your Chrome or Chromium executable.');
  process.exit(1);
}

await mkdir(OUTPUT_DIR, { recursive: true });
const server = await preview({ preview: { port: 4173, strictPort: true }, logLevel: 'silent' });
const baseUrl = server.resolvedUrls.local[0].replace(/\/$/, '');
const browser = await puppeteer.launch({ executablePath });

try {
  for (const shot of SHOTS) {
    const page = await browser.newPage();
    await page.setViewport(shot.viewport);
    await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
    await page.goto(baseUrl + shot.path, { waitUntil: 'networkidle0' });
    await page.waitForFunction(shot.ready, { timeout: 20_000 });
    await page.screenshot({ path: `${OUTPUT_DIR}/${shot.file}`, type: 'webp', quality: 85 });
    console.log(`Saved ${OUTPUT_DIR}/${shot.file}`);
    await page.close();
  }
} finally {
  await browser.close();
  await new Promise((resolve) => server.httpServer.close(resolve));
}
