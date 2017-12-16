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

def mergeListIntoDict(targetList):
	result = {}
	for miniDict in targetList:
		result = {**result, miniDict}

	return result

def main():
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

	regular[0] = {"regular" : workbook['Course Syllabi']['A1':'D13']}
	regular[1] = {"degree" : workbook['Degree Programs']['A1':'F17']}
	regular[2] = {"meetings" : workbook['Meetings & Conferences']['A1':'G16']}
	regular[3] = {"organizations" : workbook['Organizations']['A1':'O113']}
	regular[4] = {"professional" : workbook['Professional Networks']['A1':'F27']}
	regular[5] = {"publications" : workbook['Publications']['A1':'P211']}
	regular[6] = {"toolkits" : workbook['Toolkits & Other Resources']['A1':'L9']}
	regular[7] = {"workshops" : workbook['Trainings & Workshops']['A1':'G26']}
	regular[8] = {"university" : workbook['University-Based Policy Groups']['A1':'F10']}

	for item in fancy:
		item[item.keys[0]] = makeSheetDatabase(item.values[0], fancy=True)

	for item in regular:
		item[item.keys[0]] = makeSheetDatabase(item.values[0], fancy=False)


	result = mergeListIntoDict(fancy + regular)

	print(result)



if __name__ == '__main__':
    main()