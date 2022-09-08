from scipy.fft import dst
import spacy
from spacy.lang.ro.examples import sentences 
import json
import os
import sys

ds_name = sys.argv[1]

__location__ = os.path.realpath(
    os.path.join(os.getcwd(), os.path.dirname(__file__)))

ds = open(os.path.join(__location__, ds_name), encoding='utf8')
sentences = json.load(ds)
nlp = spacy.load("ro_core_news_md")

doc = {}

for idx in range(25):
    out = nlp(sentences[idx])
    tokens = {}
    for idx in range(len(out)):
        tokens[idx] = [out[idx].text, out[idx].whitespace_, False, '']
    entry = {}
    for idx in range(len(out.ents)):
        entry[idx] = [out.ents[idx].text, out.ents[idx].label_, out.ents[idx].start, out.ents[idx].end]
        for i in range( out.ents[idx].start, out.ents[idx].end):
            tokens[i][2] = True
            tokens[i][3] = idx
    doc[out.text] = [tokens, entry]

with open(os.path.join(__location__, ds_name), 'w') as f:
    json.dump(doc, f)

