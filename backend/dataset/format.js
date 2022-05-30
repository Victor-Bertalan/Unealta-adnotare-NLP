onst ds = require('./train.json');

const texts = []
ds.forEach(entry => {
    let text = ''
    let len = Object.keys(entry.tokens).length
    for(let i=0; i<len; i++){
       text += entry.tokens[i]
       if (entry.space_after[i]){
           text += ' '
       }
    }
    texts.push(text)
});
module.exports = texts