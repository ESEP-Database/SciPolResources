import openpyxl
import json
import random
import string

# This script generates a json-valid data object from a valid spreadsheet. 
# This script is highly specialized and will require updates as the spreadsheet
#   is changed. Efforts will be made in the future to make this script more 
#   generalizable, but as it is not a long term solution, it is not intended to
#   be supported in the long term.
# Points where key changes can be made will be pointed out in comments.
    
def makeKey():
    
    return "-L7rY" + ''.join(random.choice(string.ascii_lowercase + 
            string.ascii_uppercase + string.digits) for _ in range(15))

def makeSheetDatabase(worksheet, fancy=False):
    """ 
     """

    rows = worksheet.rows
    labels = [k.value for k in next(rows, None)]

    db = {}
    count = 0
    for row in rows:
        if count > 6 : break
        entry = {}
        for i in range(len(row)):
            if labels[i] == None or labels[i] == " ":
                continue
            entry[labels[i].strip()] = row[i].value
            if row[i].value == "" or row[i].value == "Yes" or row[i].value == "No":
                entry[labels[i]] = True if row[i].value == "Yes" else False
        db[makeKey()] = entry
        count += 1

    return db

def mergeListIntoDict(targetList):
    """ Merges a list of dictionaries into a single dictionary. Utility."""
    result = {}
    for miniDict in targetList:
        result = {**result, **miniDict}

    return result

def validateData(dictionary):
    """ Ensures that the keys in the dictionary are valid characters for
        Firebase's JSON database. """
    keys = dictionary.keys()
    invalid_chars = ['$', '#', '[', ']', '/', '.']
    for key in keys:
        print(keys)
        for char in invalid_chars:
            if char in key:
                print("INVALID CHARACTER FOUND")
                print(key)
                quit()
        if type(dictionary[key]) == dict:
            validateData(dictionary[key])


def main():
    
    # Change this line to load from another spreadsheet. Use the full spreadsheet name and extension.
    workbook = openpyxl.load_workbook("/home/user/Work/esep-database-project/Database Construction scripts/Restructured ESEP Database - Neel preliminary data.xlsx")
    # sheetnames of workbook at first:
    # ['Glossary', 'Non-Immersive Intern & fellow.', 'Details & Rotations', 'Fellowships', 
    # 'Internships', 'Pairing Schemes', 'Course Syllabi', 'Degree Programs', 
    # 'Meetings & Conferences', 'Organizations', 'Professional Networks', 'Publications', 
    # 'Toolkits & Other Resources', 'Trainings & Workshops', 'University-Based Policy Groups']

    sheets = []
    names = ["syllabi", "degree", "details", "fellowships", "internships", "meetings", "training", "networks", "toolkits", "university", "other"]
    for sheet, name in zip(workbook, names):
        sheets.append({name: makeSheetDatabase(sheet)})

    resources = mergeListIntoDict(sheets)

    # validateData(resources)

    # Change the name "resources.json" to dump the file to another location.
    target_file = open("resources-0.5.json", "w")
    target_file.write(json.dumps(resources))
    target_file.close()


if __name__ == '__main__':
    main()