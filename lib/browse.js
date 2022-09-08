const inquirer = require('inquirer');
const data = require('../lib/data');
const { exec } = require("child_process");

const questions = [
  { type: 'list', name: 'folder', message: 'Choose a folder', choices: data.folders }
];


module.exports = function () {
  inquirer
    .prompt(questions)
    .then(function (answers) {
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
    })
};
