const path = require('path');

const isNotNull = (v) => v !== null;

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

exports.hasProp = (v) => (obj) =>
  isNotNull(obj) &&
  typeof obj === 'object' &&
  v in obj &&
  isNotNull(obj[v]);

exports.asForm = (form) => ({
  form,
});

exports.promisify = (fn, ...args) =>
  new Promise((resolve, reject) =>
    fn(...args, (errors, response) => {
      if (errors) reject(errors);
      resolve(response);
    }),
  );
