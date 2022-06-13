const fs = require('fs')
const path = './dataset'
function getDirectories(path) {
  return fs.readdirSync(path).filter(function (file) {
    return fs.statSync(path+'/'+file).isDirectory();
  });
}


// topics
exports.folders = getDirectories(path);
exports.path = path

