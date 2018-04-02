#!/usr/bin/env node

import commander from 'commander';

commander
  .version('0.1.0', '-v, --version')
  .option('-t, --test', 'test test test')
  .parse(process.argv);

