const fs = require("fs");

const axios = require("axios");
const puppeteer = require("puppeteer");

const {availableLanguages} = require("./package.json");

scrape(
  // availableLanguages
  ["en-US", "fr"]
);

async function scrape(
  availableLanguages = ["en-US", "de"],
  server = "https://send2.dev.lcip.org"
) {
  let README = "# Firefox Send vNext\n\n";

  // const { data } = await axios.get(`${server}/__version__`);
  // const commit = data.commit;

  for (const lang of availableLanguages) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({ width: 1024, height: 800 });

    await page.setExtraHTTPHeaders({
      "accept-language": `${lang},en-US,en`
    });
    await page.goto(server, {
      waitUntil: "networkidle0"
    });
    const el = await page.$("main.main");
    const p = `./shots/home-el-${lang}.png`;
    await wait(1000); // wait 1s
    // await page.screenshot({ path: p, fullPage: true});
    await el.screenshot({ path: p });
    await browser.close();

    README += `## ${lang}\n\n![](${p})\n\n`;
  }

  fs.writeFileSync("./README.md", README);
}

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
