#!/usr/bin/env node
const program = require('commander');

// import menus
const browse = require('../lib/browse');
// print browse menu
program
  .command('start')
  .alias('s')
  .description('Start application and select dataset and model')
  .action(function () {
    browse()
  });

program.parse(process.argv);

