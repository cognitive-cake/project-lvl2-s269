#!/usr/bin/env node

import commander from 'commander';

commander
  .arguments('<firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows a difference.')
  .version('0.1.3', '-v, --version')
  .option('-f, --format [type]', 'output format')
  .parse(process.argv);

if (!commander.args.length) commander.help();
