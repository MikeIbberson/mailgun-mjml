#!/usr/bin/env node
const mjml = require('mjml');
const path = require('path');
const fs = require('fs');
const {
  interceptErrors,
  getTemplateName,
} = require('./utils');

const dir = path.join(process.cwd(), 'templates');

const resolveTemplateFilePath = (pathname) =>
  path.join(dir, pathname);

const renderHtmlFromMjml = (filename) => {
  const name = getTemplateName(filename);
  const target = resolveTemplateFilePath(filename);

  return name
    ? mjml(fs.readFileSync(target, 'utf-8'), {
        beautify: true,
      })
    : null;
};

module.exports = () =>
  new Promise((resolve) => {
    fs.readdir(
      dir,
      interceptErrors((f) => {
        const templates = f
          .map(renderHtmlFromMjml)
          .filter(Boolean)
          .map(({ html }) => html);

        return resolve(templates);
      }),
    );
  });
