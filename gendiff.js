#!/usr/bin/env node
import { Command } from 'commander';
//import compareFiles from './__fixtures__/parser.js';
import gendiff from './__fixtures__/parser.js';
const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0', '-V, --version')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format <type>', 'output format')
  .action(gendiff);
program.parse(process.argv);
