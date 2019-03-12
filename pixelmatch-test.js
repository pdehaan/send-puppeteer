const fs = require("fs");

const pixelmatch = require("pixelmatch");
const PNG = require("pngjs").PNG;

const { availableLanguages } = require("./package.json");

const defaultLang = "en-US";
const defaultLangPng = loadPng(defaultLang);

const l10nLocales = { [defaultLang]: 0 };

for (const lang of availableLanguages) {
  if (lang === defaultLang) {
    continue;
  }

  const langPng = loadPng(lang);
  const diffPng = new PNG({
    width: defaultLangPng.width,
    height: defaultLangPng.height
  });
  const diffPixels = pixelmatch(
    langPng.data,
    defaultLangPng.data,
    diffPng.data,
    defaultLangPng.width,
    defaultLangPng.height,
    { threshold: 0.6 }
  );

  if (diffPixels > 0) {
    l10nLocales[lang] = diffPixels;
    diffPng.pack().pipe(fs.createWriteStream(`./diffs/${lang}.png`));
  }
}

console.log(Object.keys(l10nLocales));

function loadPng(locale) {
  const img = fs.readFileSync(`./shots/home-el-${locale}.png`);
  return PNG.sync.read(img);
}
