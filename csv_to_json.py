import json
from collections import defaultdict
file = './src/Data/metro_nash_parks.json'

jsonfile = open(file, 'r')
data = json.load(jsonfile)

d = data['data']
col = data['meta']['view']['columns']

comp = []
for row in d:
    d = defaultdict()
    for idx, val in enumerate(col):
        print(val)
        d[val['fieldName']] = row[idx]
    comp.append(d)


with open('test.json', 'w') as outfile:
    json.dump(comp,outfile)
