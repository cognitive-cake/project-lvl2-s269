#!/usr/bin/env node

import program from 'commander';
import genDiff from '..';

program
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.1', '-v, --version')
  .option('-f --format [format]', 'Format output', /^(pretty|plain|json)$/i)
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) =>
    console.log(genDiff(firstConfig, secondConfig, program.format)))
  .parse(process.argv);

if (!program.args.length) program.help();
