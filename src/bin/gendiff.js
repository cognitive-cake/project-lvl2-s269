#!/usr/bin/env node

import programm from 'commander';
import genDiff from '..';

programm
  .description('Compares two configuration files and shows a difference.')
  .version('0.2.12', '-v, --version')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => console.log(genDiff(firstConfig, secondConfig)))
  .parse(process.argv);

if (!programm.args.length) programm.help();
