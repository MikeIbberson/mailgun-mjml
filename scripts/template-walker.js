#!/usr/bin/env node
require('dotenv').config();
const path = require('path');
const fs = require('fs');
const templateAttributes = require('./template-attributes');
const { hasProp } = require('./utils');

module.exports = (dir) =>
  fs
    .readdirSync(dir)
    .map((temp) =>
      templateAttributes(temp, path.join(dir, temp)),
    )
    .filter(hasProp('html'));
