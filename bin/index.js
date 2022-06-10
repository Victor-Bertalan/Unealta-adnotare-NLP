#!/usr/bin/env node
const program = require('commander');

// import menus
const browse = require('../lib/browse');
// print browse menu
program
  .command('start')
  .alias('s')
  .description('Browse a topic')
  .action(function () {
    browse()
  });

// allow commander to parse `process.argv`
program.parse(process.argv);

