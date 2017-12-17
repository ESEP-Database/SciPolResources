import openpyxl
import json

# This script generates a json-valid data object from a valid spreadsheet. 
# This script is highly specialized and will require updates as the spreadsheet
#   is changed. Efforts will be made in the future to make this script more 
#   generalizable, but as it is not a long term solution, it is not intended to
#   be supported in the long term.
# Points where key changes can be made will be pointed out in comments.


def makeEntryFromRowFancy(row, labels):
    """ Takes a *fancy* style row element, with labels given, and makes it into a valid
        Python dictionary. """
    name = row[0].value.strip()
    if name[-1] == '*':
        name = name[:-1].strip()
    vals = {}
    for i in range(1, 14):
        vals[labels[i].value.lower().strip()] = row[i].value
    
    hosting = {}
    for i in range(14, 26):
        hosting[labels[i].value.lower().strip()] = True if row[i].value != None else False
    
    purpose = {}
    for i in range(26, 31):
        purpose[labels[i].value.lower().strip()] = True if row[i].value != None else False

    scope = {}
    for i in range(31, 36):
        scope[labels[i].value.lower().strip()] = True if row[i].value != None else False

    focus = {}
    for i in range(36, 48):
        focus[labels[i].value.lower().strip()] = True if row[i].value != None else False

    development = {}
    for i in range(48, 52):
        development[labels[i].value.lower().strip()] = True if row[i].value != None else False

    support = {}
    for i in range(52, 60):
        support[labels[i].value.lower().strip()] = True if row[i].value != None else False
    
    vals['host'] = hosting
    vals['purpose'] = purpose
    vals['scope'] = 'scope'
    vals['focus'] = focus
    vals['professional development'] = development
    vals['financial support'] = support
    
    return {name: vals}

def makeEntryFromRowRegular(row, labels):
    """ Takes a *simple* style row element, with labels given, and makes it into a valid
    Python dictionary. """

    name = row[0].value.strip()

    entry = {}
    
    for i in range(len(labels)):
        label = labels[i].value.lower().strip()
        if (label[0] == "*"):
            label = label[1:]
            entry[label] = True if row[i].value != None else False
        else:
            entry[label] = row[i].value
    return {name: entry}

    
def makeSheetDatabase(worksheet, fancy=False):
    """ Given a worksheet (a 2 dimensional Python array of openpyxl.Cell 
        objects), this method generates a complete Python dictionary 
        representing the spreadsheet. """

    base = 1 if fancy else 0

    if fancy:
        rowMaker = makeEntryFromRowFancy
    else:
        rowMaker = makeEntryFromRowRegular

    labels = worksheet[base]

    db = {}

    for i in range(base + 1, len(worksheet)):
        db = {**db, **rowMaker(worksheet[i], labels)}
    
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
        for char in invalid_chars:
            if char in key:
                print("INVALID CHARACTER FOUND")
                print(key)
                quit()
        if type(dictionary[key]) == dict:
            validateData(dictionary[key])


def main():
    
    # Change this line to load from another spreadsheet. Use the full spreadsheet name and extension.
    workbook = openpyxl.load_workbook("STP Global Resources Working Sheet - no tag listings.xlsx")
    # sheetnames of workbook at first:
    # ['Glossary', 'Non-Immersive Intern & fellow.', 'Details & Rotations', 'Fellowships', 
    # 'Internships', 'Pairing Schemes', 'Course Syllabi', 'Degree Programs', 
    # 'Meetings & Conferences', 'Organizations', 'Professional Networks', 'Publications', 
    # 'Toolkits & Other Resources', 'Trainings & Workshops', 'University-Based Policy Groups']

    # fancy
    fancy = [0, 0, 0, 0, 0]

    fancy[0] = {"remote": workbook['Non-Immersive Intern & fellow.']['A1':'BH42']}
    fancy[1] = {"rotations" : workbook['Details & Rotations']['A1':'BH16']}
    fancy[2] = {"fellowships" : workbook['Fellowships']['A1':'BH120']}
    fancy[3] = {"internships" : workbook['Internships']['A1':'BH52']}
    fancy[4] = {"pairing" : workbook['Pairing Schemes']['A1':'BH11']}

    # regular
    regular = [0, 0, 0, 0, 0, 0, 0, 0, 0]

    regular[0] = {"syllabi" : workbook['Course Syllabi']['A1':'D13']}
    regular[1] = {"degree" : workbook['Degree Programs']['A1':'F17']}
    regular[2] = {"meetings" : workbook['Meetings & Conferences']['A1':'G16']}
    regular[3] = {"organizations" : workbook['Organizations']['A1':'O113']}
    regular[4] = {"professional" : workbook['Professional Networks']['A1':'F27']}
    regular[5] = {"publications" : workbook['Publications']['A1':'P211']}
    regular[6] = {"toolkits" : workbook['Toolkits & Other Resources']['A1':'L9']}
    regular[7] = {"workshops" : workbook['Trainings & Workshops']['A1':'G26']}
    regular[8] = {"university" : workbook['University-Based Policy Groups']['A1':'F10']}

    for item in fancy:
        for key in item:
            item[key] = makeSheetDatabase(item[key], fancy=True)

    for item in regular:
        for key in item:
            item[key] = makeSheetDatabase(item[key], fancy=False)


    resources = mergeListIntoDict(fancy + regular)

    validateData(resources)

    # Change the name "resources.json" to dump the file to another location.
    target_file = open("resources.json", "w")
    target_file.write(json.dumps(resources))
    target_file.close()



if __name__ == '__main__':
    main()