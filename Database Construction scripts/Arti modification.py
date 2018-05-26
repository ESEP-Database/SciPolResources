import json

resources = {}
with open("resources.json") as f:
	resources = json.loads(f.read())

new_resources = {}
for key in resources:
	for item in resources[key]:
		resources[key][item]["Resource Type"] = key
		new_resources[item] = resources[key][item]

with open("modified-resources.json", "w") as f:
    f.write(json.dumps(new_resources))
