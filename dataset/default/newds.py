import json
import os

__location__ = os.path.realpath(
    os.path.join(os.getcwd(), os.path.dirname(__file__)))

ds = open(os.path.join(__location__, 'dataset.json'), encoding='utf8')

dataset = json.load(ds)

new_ds = []
for ent in range(len(dataset)):
    text = ''
    for idx in range(len(dataset[ent]["tokens"])):
        text+=dataset[ent]["tokens"][idx]
        if(dataset[ent]["space_after"][idx]):
            text += ' '
    new_ds.append(text)
with open(os.path.join(__location__, 'new_dataset.json'), 'w', encoding = "utf8") as f:
    json.dump(new_ds, f)