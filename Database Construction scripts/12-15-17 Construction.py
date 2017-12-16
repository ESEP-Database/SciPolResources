import openpyxl
import json

def makeEntryFromRowFancy(row, labels):
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
    name = row[0].value.strip()

    entry = {}
    
    for i in range(len(labels)):
        if (labels[i].value[0] == "*"):
            labels[i] = labels[i][1:]
            entry[labels[i].value.lower().strip()] = True if row[i].value != None else False
        else:
            entry[labels[i].value.lower().strip()] = row[i].value
    return {name: entry}

    
def makeSheetDatabase(worksheet, fancy=False):
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

def main():
	workbook = openpyxl.load_workbook("STP Global Resources Working Sheet - no tag listings.xlsx")
	sheetnames = workbook.sheetnames
	# ['Glossary', 'Non-Immersive Intern & fellow.', 'Details & Rotations', 'Fellowships', 
	# 'Internships', 'Pairing Schemes', 'Course Syllabi', 'Degree Programs', 
	# 'Meetings & Conferences', 'Organizations', 'Professional Networks', 'Publications', 
	# 'Toolkits & Other Resources', 'Trainings & Workshops', 'University-Based Policy Groups']

if __name__ == '__main__':
    main()