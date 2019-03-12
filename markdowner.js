const fs = require("fs");

const md = require("markdown-it")();
const mdLinkAttr = require("markdown-it-link-attributes");

md.use(mdLinkAttr, {
  attrs: {
    target: "_blank",
    rel: "noopener noreferer"
  }
});

const out = mdToHtml("./legal.md");

console.log(out);

function mdToHtml(file) {
  const src = fs.readFileSync(file, "utf-8");
  const html = md.render(src);
  return html;
}
