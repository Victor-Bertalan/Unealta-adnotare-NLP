from scipy.fft import dst
import spacy
from spacy.lang.ro.examples import sentences 
import json
import os

__location__ = os.path.realpath(
    os.path.join(os.getcwd(), os.path.dirname(__file__)))

ds = open(os.path.join(__location__, 'new_dataset.json'), encoding='utf8')
sentences = json.load(ds)

nlp = spacy.load("ro_core_news_md")

doc = {}

for idx in range(len(sentences)):
    out = nlp(sentences[idx])
    entry = {}
    for idx in range(len(out.ents)):
        entry[idx] = [out.ents[idx].text ,out.ents[idx].start_char, out.ents[idx].end_char, out.ents[idx].label_]
    doc[out.text] = entry

with open(os.path.join(__location__, 'model_output.json'), 'w') as f:
    json.dump(doc, f)


