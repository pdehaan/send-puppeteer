const fs = require("fs");

const axios = require("axios");
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

async function scrape(
  availableLanguages = ["en-US", "de"],
  server = "https://send2.dev.lcip.org"
) {
  let README = "# Firefox Send vNext\n\n";

  const { data } = await axios.get(`${server}/__version__`);
  const commit = data.commit;
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 800, height: 600 });

  for (const lang of availableLanguages) {
    await page.setExtraHTTPHeaders({
      "accept-language": lang
    });
    await page.goto(server, {
      waitUntil: "networkidle0"
    });
    const p = `./shots/home-${lang}-${commit}.png`;
    console.log(p);
    await page.screenshot({ path: p, fullPage: true });

    README += `## ${lang}\n\n![](${p})\n\n`;
  }

  await browser.close();
  fs.writeFileSync("./README.md", README);
}
