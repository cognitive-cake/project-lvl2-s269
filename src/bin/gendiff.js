#!/usr/bin/env node

import programm from 'commander';
import genDiff from '..';

programm
  .description('Compares two configuration files and shows a difference.')
  .version('0.5.2', '-v, --version')
  .option('-p --plain', 'Show diff in plain style')
  .option('-P --pretty', 'Show diff in pretty style')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => console.log(genDiff(firstConfig, secondConfig)))
  .parse(process.argv);

if (!programm.args.length) programm.help();
