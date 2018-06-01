import json

# This script takes the database structure made with `3-17-18 Construction.py`
#   and inverts it to a key-first scructure. It's fairly self-explanatory, but
#   merely reorients the structure.

resources = {}
# Change to the output file of `3-17-18 Construction.py`
with open("resources.json") as f:
	resources = json.loads(f.read())

new_resources = {}
for key in resources:
	# Here, every resources[key] is a sequence of random keys.
	for item in resources[key]:
		# new_resources has the secondard key of the original as its primary key
		#   and a new Resource Type field is made with the old primary key.
		resources[key][item]["Resource Type"] = key
		new_resources[item] = resources[key][item]

# Change to desired output file, now ready to upload wholesale to Firebase
#   Read warning in Technical Guide if trouble is encountered.
with open("modified-resources.json", "w") as f:
    f.write(json.dumps(new_resources))
