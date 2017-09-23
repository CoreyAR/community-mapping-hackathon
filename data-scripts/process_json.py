import json
from collections import defaultdict
file = './rows.json'

jsonfile = open(file, 'r')
data = json.load(jsonfile)

d = data['data']
col = data['meta']['view']['columns']

comp = []
replace_field = False
if not 'mapped_location' in col:
    replace_field = raw_input("'mapped_location' not found in columns. Select a field to replace: ")
for row in d:
    d = defaultdict()
    for idx, val in enumerate(col):
        row_data = row[idx]
        if replace_field and val['fieldName'] == replace_field:
            d['mapped_location'] = row_data
        else: 
            d[val['fieldName']] = row_data
    comp.append(d)

file_name = raw_input("file name: ")
with open('../src/data/{}.json'.format(file_name), 'w') as outfile:
    json.dump(comp,outfile)
