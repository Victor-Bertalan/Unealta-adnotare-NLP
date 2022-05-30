const ds = require('./train.json');

const texts = []
ds.forEach(entry => {
    let text = ''
    entry.tokens.forEach(token => {
        text+= token +' '
    })
    texts.push(text)
});
module.exports = texts