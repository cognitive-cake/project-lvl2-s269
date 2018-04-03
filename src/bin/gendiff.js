#!/usr/bin/env node

import programm from 'commander';
// import fs from 'fs';
// import _ from 'lodash';

programm
  .arguments('<firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .parse(process.argv);

if (!programm.args.length) programm.help();

programm
  .command('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => {
    console.log('blabla', firstConfig, secondConfig);
  });
