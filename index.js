const fs = require("fs");
const puppeteer = require("puppeteer");

const availableLanguages = [
  "en-US",
  "ar",
  "ast",
  "az",
  "bs",
  "ca",
  "cak",
  "cs",
  "cy",
  "da",
  "de",
  "dsb",
  "el",
  "es-AR",
  "es-CL",
  "es-ES",
  "es-MX",
  "et",
  "fa",
  "fr",
  "fy-NL",
  "hsb",
  "hu",
  "ia",
  "id",
  "it",
  "ja",
  "ka",
  "kab",
  "ko",
  "ms",
  "nb-NO",
  "nl",
  "nn-NO",
  "pt-BR",
  "pt-PT",
  "ro",
  "ru",
  "sk",
  "sl",
  "sq",
  "sr",
  "sv-SE",
  "te",
  "tl",
  "tr",
  "uk",
  "vi",
  "zh-CN",
  "zh-TW"
];

scrape(availableLanguages);

async function scrape(availableLanguages = ["en-US", "de"]) {
  let README = "# Firefox Send vNext\n\n";
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 800, height: 600 });
  for (const lang of availableLanguages) {
    await page.setExtraHTTPHeaders({
      "accept-language": lang
    });
    await page.goto("https://send2.dev.lcip.org/", {
      waitUntil: "networkidle2"
    });
    const p = `./shots/home-${lang}.png`;
    await page.screenshot({ path: p, fullPage: true });

    README += `## ${lang}\n\n![](${p})\n\n`;
  }
  await browser.close();
  fs.writeFileSync("./README.md", README);
}
