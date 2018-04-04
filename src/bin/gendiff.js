#!/usr/bin/env node

import programm from 'commander';
import genDiff from '..';

programm
  .description('Compares two configuration files and shows a difference.')
  .version('0.2.7', '-v, --version')
  .option('-f, --format [type]', 'output format')
  .arguments('<firstConfig> <secondConfig>')
  .action(genDiff)
  .parse(process.argv);

if (!programm.args.length) programm.help();
