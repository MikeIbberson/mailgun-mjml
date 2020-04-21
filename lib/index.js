const path = require('path');
const mjml2html = require('mjml');
const Handlebars = require('handlebars');
const fs = require('fs');

module.exports = (templateDirectory) => {
  const dir = process.cwd();
  const tmp = path.join(dir, './tmp');

  if (!fs.existsSync(tmp)) fs.mkdirSync(tmp);

  const resolveDirectory = (name = '') =>
    path.resolve(dir, `${templateDirectory}/${name}`);

  const exec = (raw) =>
    mjml2html(raw, {
      filePath: resolveDirectory(),
    }).html;

  return (templateName, data) => {
    const mj = fs.readFileSync(
      resolveDirectory(`${templateName}.mjml`),
      'utf8',
    );

    fs.writeFileSync(
      resolveDirectory(`../tmp/${templateName}.html`),
      Handlebars.compile(exec(mj))(data),
    );
  };
};
