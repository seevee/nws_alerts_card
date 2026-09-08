#!/usr/bin/env node
// Photographs the card's visual editor inside a real Home Assistant.
//
// The card figures come from stub harnesses (scripts/screenshot-*.html) because
// a card needs two HA elements faked. The editor is nine HA widgets deep and its
// whole point is looking like HA, so a stub would be a fake, not a figure. This
// drives the dev HA's own dashboard instead: logs the frontend in with a
// long-lived token, opens the testing dashboard in edit mode, fires the same
// `ll-edit-card` event the wrapper's edit button fires, and clips the editor
// out of the dialog.
//
// It cannot run in the Pages workflow (no HA there), so its output is tracked:
// img/editor-adaptive.svg + img/editor-light.webp are the exceptions in
// .gitignore next to the storefront figures, and encode-adaptive-svgs.sh skips
// the pair when the PNGs are missing. Refresh by hand when the editor changes.
//
// Run:  HA_TOKEN=<long-lived token> npm run screenshot:editor
//       then: bash scripts/encode-adaptive-svgs.sh
// Out:  img/editor-light.png, img/editor-dark.png
//
// Env:  HA_TOKEN      required, a long-lived access token for an admin user
//       HA_URL        default http://localhost:8123
//       HA_DASHBOARD  default dashboard-testing/0 (a storage-mode sections view)
//       CAPTURE_THEMES=light,dark   subset of themes (default: both)
//       PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH   override managed Chromium

'use strict';

const { chromium } = require('playwright');
const { mkdirSync } = require('fs');
const { resolve } = require('path');

const ROOT = resolve(__dirname, '..');
const OUT_DIR = resolve(ROOT, 'img');

const HA_URL = (process.env.HA_URL || 'http://localhost:8123').replace(/\/$/, '');
const HA_TOKEN = process.env.HA_TOKEN;
const HA_DASHBOARD = process.env.HA_DASHBOARD || 'dashboard-testing/0';

// The subject: the NSW RFS card, found by config predicate rather than by
// section/card index, which drifts as the testing dashboard is edited. Its
// config puts a count on Appearance, Detail panel and Behavior and leaves the
// other panels at zero, which is the state the figure is for.
const SUBJECT_SOURCE = 'nsw_rural_fire_service_feed';

// Tall enough that the edit dialog never scrolls internally, so the clip is the
// whole editor.
const VIEWPORT = { width: 1400, height: 1600 };
const CLIP_PAD = 16;

function fail(msg) {
  console.error(`capture-editor: ${msg}`);
  process.exit(1);
}

// Runs in the page. Cards and dialogs sit in nested shadow roots, so a plain
// querySelector finds nothing; walk every shadow root.
const PAGE_HELPERS = `
  window.__wacDeepAll = function (pred, root = document, out = []) {
    for (const el of root.querySelectorAll('*')) {
      if (pred(el)) out.push(el);
      if (el.shadowRoot) window.__wacDeepAll(pred, el.shadowRoot, out);
    }
    return out;
  };
  window.__wacFindSubject = function (source) {
    const wrappers = window.__wacDeepAll(el => el.localName === 'hui-card-edit-mode');
    return wrappers.find(w => window.__wacDeepAll(
      el => el.localName === 'weather-alerts-card' && (el._config?.sources || []).includes(source), w,
    ).length > 0) || null;
  };
  window.__wacEditor = function () {
    return window.__wacDeepAll(el => el.localName === 'weather-alerts-card-editor')[0] || null;
  };
`;

(async () => {
  if (!HA_TOKEN) fail('HA_TOKEN is not set (a long-lived access token for an admin user)');

  // Fail early and plainly when HA is not there, before a browser is launched.
  try {
    const res = await fetch(`${HA_URL}/api/`, { headers: { Authorization: `Bearer ${HA_TOKEN}` } });
    if (res.status === 401) fail(`HA at ${HA_URL} rejected the token`);
    if (!res.ok) fail(`HA at ${HA_URL} answered ${res.status}`);
  } catch (err) {
    fail(`cannot reach HA at ${HA_URL} (${err.message})`);
  }

  mkdirSync(OUT_DIR, { recursive: true });

  const launchOptions = { args: ['--no-sandbox', '--disable-setuid-sandbox'] };
  if (process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH) {
    launchOptions.executablePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH;
  }
  const browser = await chromium.launch(launchOptions);

  const themes = (process.env.CAPTURE_THEMES || 'light,dark')
    .split(',').map(s => s.trim()).filter(Boolean);

  for (const theme of themes) {
    console.log(`[${theme}] opening ${HA_URL}/${HA_DASHBOARD}?edit=1`);
    const context = await browser.newContext({ viewport: VIEWPORT, deviceScaleFactor: 2 });
    const page = await context.newPage();

    // A fresh context has no service worker, so the frontend installs one on
    // first load, and when it takes control (~15 s in) app.js reloads the page
    // from under the open dialog. Let registration hang forever: the worker
    // never installs, `navigator.serviceWorker` still exists for the boot code
    // that listens on it, and the capture needs no offline cache. (Playwright's
    // `serviceWorkers: 'block'` removes the container itself, which throws at
    // boot.)
    await page.addInitScript(() => {
      if (navigator.serviceWorker) {
        Object.defineProperty(navigator.serviceWorker, 'register', { value: () => new Promise(() => {}) });
      }
    });

    // The token must land before the frontend boots: the first load otherwise
    // redirects to /auth/authorize and destroys any later evaluate context. It
    // logs the frontend in with no auth flow.
    await page.addInitScript(({ url, token }) => {
      localStorage.setItem('hassTokens', JSON.stringify({
        access_token: token,
        token_type: 'Bearer',
        expires_in: 1800,
        expires: Date.now() + 365 * 24 * 3600 * 1000,
        hassUrl: url,
        clientId: url + '/',
      }));
    }, { url: HA_URL, token: HA_TOKEN });
    await page.addInitScript(PAGE_HELPERS);

    await page.goto(`${HA_URL}/${HA_DASHBOARD}?edit=1`, { waitUntil: 'domcontentloaded' });

    // Pin the theme in memory. Theme selection is server-side user data on
    // this core (the frontend subscribes to it and overwrites
    // localStorage.selectedTheme with the profile's value), so the only way to
    // photograph stock light and dark without editing the user's profile is to
    // apply it through the root element's own theme mixin, which is what the
    // `settheme` event does minus the save. Wait for the profile value first
    // so it cannot land afterwards and undo this.
    await page.waitForFunction(() => {
      const ha = document.querySelector('home-assistant');
      return !!ha?.hass?.themes && ha.hass.selectedTheme !== null;
    }, undefined, { timeout: 30000 });
    await page.evaluate(dark => {
      const ha = document.querySelector('home-assistant');
      ha._updateHass({ selectedTheme: { theme: 'default', dark } });
      ha._applyTheme(matchMedia('(prefers-color-scheme: dark)').matches);
    }, theme === 'dark');
    await page.waitForFunction(
      dark => document.querySelector('home-assistant').hass.themes.darkMode === dark,
      theme === 'dark', { timeout: 10000 },
    );

    // Edit mode wraps each card in hui-card-edit-mode; wait for the subject's.
    let found = true;
    await page.waitForFunction(
      source => window.__wacFindSubject(source) !== null, SUBJECT_SOURCE, { timeout: 30000 },
    ).catch(() => { found = false; });
    if (!found) {
      await browser.close();
      fail(`no weather-alerts-card with sources including ${SUBJECT_SOURCE} on ${HA_DASHBOARD} (is the dashboard in edit mode for this user?)`);
    }

    // The wrapper's edit button does exactly this.
    await page.evaluate(source => {
      const wrapper = window.__wacFindSubject(source);
      wrapper.dispatchEvent(new CustomEvent('ll-edit-card', {
        detail: { path: wrapper.path }, bubbles: true, composed: true,
      }));
    }, SUBJECT_SOURCE);

    // The editor has rendered once its top-level panels are in the tree and
    // upgraded (the nested styling panel is un-slotted inside its collapsed
    // parent and measures zero). HA lazy-loads the pickers inside them and the
    // device picker takes several seconds to fetch its registries, so wait
    // for every selector in an open panel to have laid out (collapsed panels
    // un-slot their content), then for the editor's height to hold still.
    await page.waitForFunction(() => {
      const root = window.__wacEditor()?.shadowRoot;
      const panels = [...(root?.querySelectorAll('.editor > ha-expansion-panel') ?? [])];
      const selectors = panels.filter(p => p.expanded).flatMap(p => [...p.querySelectorAll('ha-selector')]);
      return panels.length > 0
        && panels.every(p => p.shadowRoot && p.getBoundingClientRect().height > 30)
        && selectors.every(s => s.getBoundingClientRect().height > 20);
    }, undefined, { timeout: 30000 });
    await page.evaluate(() => document.fonts.ready);
    const measure = () => page.evaluate(() => {
      const r = window.__wacEditor().getBoundingClientRect();
      return { x: r.x, y: r.y, width: r.width, height: r.height };
    });
    let rect = await measure();
    for (let i = 0; i < 20; i++) {
      await page.waitForTimeout(500);
      const next = await measure();
      const stable = next.height === rect.height && next.width === rect.width;
      rect = next;
      if (stable && i >= 1) break;
    }
    if (rect.height < 100) {
      await browser.close();
      fail(`editor rendered ${Math.round(rect.height)}px tall; something did not load`);
    }
    const clip = {
      x: Math.max(0, rect.x - CLIP_PAD),
      y: Math.max(0, rect.y - CLIP_PAD),
      width: rect.width + 2 * CLIP_PAD,
      height: rect.height + 2 * CLIP_PAD,
    };
    const out = resolve(OUT_DIR, `editor-${theme}.png`);
    await page.screenshot({ path: out, clip });
    console.log(`  → ${out.replace(ROOT + '/', '')}  (${Math.round(clip.width)}×${Math.round(clip.height)} css px)`);
    await context.close();
  }

  await browser.close();
  console.log('Done. Next: bash scripts/encode-adaptive-svgs.sh');
})().catch(err => { console.error(err); process.exit(1); });
