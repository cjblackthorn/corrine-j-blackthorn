"use strict";
const { chromium } = require("playwright");

async function main() {
  const browser = await chromium.launch({ headless: true });
  try {
    const context = await browser.newContext({
      viewport: { width: 390, height: 844 }, deviceScaleFactor: 1, isMobile: true, hasTouch: true,
      reducedMotion: "reduce"
    });
    const page = await context.newPage();
    await page.goto("http://127.0.0.1:4173/", { waitUntil: "domcontentloaded", timeout: 20000 });
    const result = await page.evaluate(() => {
      const visibleWidth = window.innerWidth;
      const elements = [document.documentElement, document.body, ...document.body.querySelectorAll("*")];
      const suspects = elements.map(el => {
        const r = el.getBoundingClientRect(), c = getComputedStyle(el);
        return {
          tag: el.tagName, id: el.id, class: typeof el.className === "string" ? el.className.slice(0, 90) : "",
          text: (el.textContent || "").trim().slice(0, 70),
          left: Math.round(r.left), right: Math.round(r.right),
          clientWidth: el.clientWidth, scrollWidth: el.scrollWidth,
          overflowX: c.overflowX, whiteSpace: c.whiteSpace, minWidth: c.minWidth,
          display: c.display, position: c.position
        };
      }).filter(x => x.scrollWidth > x.clientWidth + 7 || x.right > visibleWidth + 7 || x.left < -7)
        .sort((a,b) => (b.scrollWidth - b.clientWidth) - (a.scrollWidth - a.clientWidth))
        .slice(0, 25);
      return {
        viewport: visibleWidth,
        rootScrollWidth: document.documentElement.scrollWidth,
        bodyScrollWidth: document.body.scrollWidth,
        rootRect: document.documentElement.getBoundingClientRect().toJSON(),
        bodyRect: document.body.getBoundingClientRect().toJSON(),
        suspects
      };
    });
    console.log(JSON.stringify(result, null, 2));
    await page.screenshot({ path: "mobile-overflow-diagnostic.png", fullPage: false });
    await context.close();
    if (result.rootScrollWidth > result.viewport + 4) {
      console.error("FAIL: horizontal overflow " + (result.rootScrollWidth - result.viewport) + "px");
      process.exitCode = 1;
    } else {
      console.log("PASS: viewport has no horizontal scroll");
    }
  } finally { await browser.close(); }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
