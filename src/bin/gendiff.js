#!/usr/bin/env node

import commander from 'commander';

commander
  .description('Compares two configuration files and shows a difference.')
  .version('0.1.1', '-v, --version')
  .option('-f, --format [type]', 'Output format')
  .parse(process.argv);

if (!commander.args.length) commander.help();
