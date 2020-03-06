const fs = require('fs');
const path = require('path');
const mjml = require('mjml');

module.exports = (filename, filepath) => ({
  get extension() {
    return path.extname(filename);
  },

  get isMjml() {
    return this.extension === '.mjml';
  },

  get templateName() {
    return this.isMjml && !filename.startsWith('__')
      ? path.basename(filename, this.extension)
      : null;
  },

  get html() {
    return this.templateName
      ? mjml(fs.readFileSync(filepath, 'utf-8'), {
          beautify: true,
          filePath: path.resolve(filepath),
        }).html
      : null;
  },
});
