import openpyxl
import json
import random
import string

# This script generates a json-valid data object from a valid spreadsheet,
#   which is packaged in the same directory for convenience.
# This script is highly specialized and will require updates as the spreadsheet
#   is changed. Efforts will be made in the future to make this script more 
#   generalizable, but as it is not a long term solution, it is not intended to
#   be supported in the long term, as the data is being stored primarily in 
#   Firebase, so edits will be made through either the web interface or the 
#   general scripting tool in `General editing.py`.
# Points where key changes can be made will be pointed out in comments.
    

def makeKey():
""" This function simply generates a random key in the style used by Firebase.
"""
    return "-L7rY" + ''.join(random.choice(string.ascii_lowercase + 
            string.ascii_uppercase + string.digits) for _ in range(15))

def makeSheetDatabase(worksheet):
""" This function takes a single sheet and writes it into a Python dictionary:
    <random key>
        <Field 1> : entry 1, value 1
        <Field 2> : entry 1, value 2
        ...
        <Field n> : entry 1, value n
    <random key>
        <Field 1> : entry 2, value 2
        ...

    The fields are generated from the first line in the rows of the spreadsheet.
    The lines thereafter are considered to be entries.
     """

    rows = worksheet.rows
    labels = [k.value for k in next(rows, None)]

    db = {}
    for row in rows:
        entry = {}
        for i in range(len(row)):
            # If the scraper picked up too many labels, ignore the column.
            if labels[i] == None or labels[i] == " ":
                continue
            entry[labels[i].strip()] = row[i].value
            # Reprocess into boolean datatype
            if row[i].value == "" or row[i].value == "Yes" or row[i].value == "No":
                entry[labels[i]] = True if row[i].value == "Yes" else False
        db[makeKey()] = entry

    return db

def mergeListIntoDict(targetList):
    """ Merges a list of dictionaries into a single dictionary. Utility."""
    result = {}
    for miniDict in targetList:
        result = {**result, **miniDict}

    return result

def main():
    
    # Change this line to load from another spreadsheet. Use the full spreadsheet name and extension.
    workbook = openpyxl.load_workbook("/home/user/Work/esep-database-project/Database Construction scripts/Restructured ESEP Database - FINAL CLEAN.xlsx")
    # sheetnames of workbook at first:
    # ['Glossary', 'Non-Immersive Intern & fellow.', 'Details & Rotations', 'Fellowships', 
    # 'Internships', 'Pairing Schemes', 'Course Syllabi', 'Degree Programs', 
    # 'Meetings & Conferences', 'Organizations', 'Professional Networks', 'Publications', 
    # 'Toolkits & Other Resources', 'Trainings & Workshops', 'University-Based Policy Groups']

    sheets = []
    # This is the list of internal monikers for the datatypes. These must be in
    #    the order of the sheets in the spreadsheet.
    names = ["syllabi", "details", "meetings", "training", "degree", "networks", "fellowships", "internships", "toolkits", "university", "other"]
    for sheet, name in zip(workbook, names):
        sheets.append({name: makeSheetDatabase(sheet)})

    resources = mergeListIntoDict(sheets)

    # Change the name "resources.json" to write the file to another location.
    target_file = open("resources.json", "w")
    target_file.write(json.dumps(resources))
    target_file.close()


if __name__ == '__main__':
    main()
