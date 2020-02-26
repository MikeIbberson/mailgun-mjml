#!/usr/bin/env node
require('dotenv').config();
const path = require('path');
const { dirname, trace } = require('minimist')(
  process.argv.slice(2),
);

const mg = require('./mailgun');
const walk = require('./template-walker');

if (!dirname)
  throw new Error(
    '--dirname flag required to find templates',
  );

const {
  MAILGUN_ACCESS_TOKEN,
  MAILGUN_DOMAIN,
} = process.env;

const templates = walk(path.join(process.cwd(), dirname));
const upload = mg(MAILGUN_DOMAIN, MAILGUN_ACCESS_TOKEN);

const showTrace = (v) =>
  trace ? v : 'Use the --trace flag for more details';

Promise.all(templates.map(upload))
  .then((r) => {
    console.log('Upload completed:', showTrace(r));
    process.exit(0);
  })
  .catch((r) => {
    console.log('Upload failed:', showTrace(r));
    process.exit(1);
  });
