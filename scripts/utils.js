const path = require('path');

exports.interceptErrors = (fn) => (e, data) => {
  if (e) {
    console.error('MJML file system error:', e);
    process.exit(1);
  } else {
    fn(data);
  }
};

exports.getTemplateName = (f) => {
  const ext = path.extname(f);
  const templateName = path.basename(f, ext);
  return ext === '.mjml' ? templateName : null;
};
