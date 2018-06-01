import json
# This file is intended to serve as a general purpose basis for making changes
#   to the database as a whole, with scripting techniques. The steps are
#   fairly simple, just export the database as a JSON file, insert its location
#   to the script here, and run the script. Then, upload the newly edited JSON
#   file and verify that the changes were made correctly.
# To download/upload JSON files, go to console.firebase.google.com on the
#   appropriate account and export the main body of the database.

resources = {}
# Replace <json file> with the actual filename, perhaps in the same directory
#   for convenience. 
with open("<json file>.json") as f:
	resources = json.loads(f.read())

for key in resources:
    # This can be any condition that is desired. 
	if resources[key][“Resource Type”] == <type to change>:
        # And here, any change can be made, including removing with
        # resources[key].pop(...) or resources.pop(key)
        # Depending on if its desired to remove a field or the whole resource
		resources[key][<new field>] = <new value>

# Replace <new json file name> with the desired target file
with open("<new json file name>.json", "w") as f:
    f.write(json.dumps(resources))
