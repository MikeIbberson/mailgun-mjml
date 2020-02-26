#!/usr/bin/env node
require('dotenv').config();
const builder = require('./build-mjml');
const uploader = require('./sync-mailgun');

const {
  MAILGUN_ACCESS_TOKEN: token,
  MAILGUN_DOMAIN: domain,
} = process.env;

const { add } = uploader(domain, token);

builder()
  .then(add)
  .catch((r) => {
    console.log(r);
  });
