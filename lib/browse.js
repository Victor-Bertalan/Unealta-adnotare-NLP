const inquirer = require('inquirer');
const colors = require('colors');
const pad = require('pad');
const data = require('../lib/data');
const open = require('open');
const { exec, spawn } = require("child_process");

const questions = [
  { type: 'list', name: 'folder', message: 'Choose a folder', choices: data.folders }
];


module.exports = function () {
  inquirer
    .prompt(questions)
    .then(function (answers) {

      // print answers
      console.log('\n');
      console.log("opening", data.path + '/' + answers.folder);
      const backend = exec('node server.js '+ answers.folder, { cwd: './backend/' },(err, stdout, stderr) => {
        if (err) {
          console.log(`err: ${err}`)
          return
        }
        console.log(`stdout: ${stdout}`)
        console.log(`stderr: ${stderr}`)
      })

      backend.stdout.on('data', function (data) {
        console.log(data);
      });

      const UI = exec('quasar dev', { cwd: './UI/' }, (err, stdout, stderr) => {
        if (err) {
          console.log(`err: ${err}`)
        }
        console.log(`stdout: ${stdout}`)
        console.log(`stderr: ${stderr}`)
      })

      UI.stdout.on('data', function (data) {
        console.log(data);
      });
    })
};
