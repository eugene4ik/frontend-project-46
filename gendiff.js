#!/usr/bin/env node
import { Command } from 'commander';
import gendiff from './src/index.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0', '-V, --version')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format <type>', 'output format', 'stylish')
  .action((filepath1, filepath2, options) => {
    const format = options.format;
    const result = gendiff(filepath1, filepath2, format);
    // eslint-disable-next-line no-console
    console.log(result);
  });
program.parse(process.argv);
