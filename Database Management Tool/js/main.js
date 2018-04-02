var meeting;
var data;
var degree;	

var entry;
var mode;
var type;

var provider = new firebase.auth.GoogleAuthProvider();
var database = firebase.database();
var data;


$(document).ready(function() {

	var firebaseRef = new Firebase("https://esep-testing.firebaseio.com/");
	firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
			console.log(user);
		} else {
			var provider = new firebase.auth.GoogleAuthProvider();
			firebase.auth().signInWithPopup(provider);
		}
	});

	loadToolLoaders();
	// When the "Go!" button is clicked, try to load the page with the corresponding 
	//	options selected.

	initializeFirebase(firebaseRef);

	firebase.database().ref().once('value').then(function(snapshot) {
    data = snapshot.val()
    data = preprocess(data);
    displayAllData();
    
	});

	$("#tool-loader").click(function() {
		mode = $("#mode").val()
		type = $("#type").val()
		loadTool(mode, type);
	});

});


/* This function will accept mode ("Add", "Edit", "Remove") and type
	("Internship", "Fellowship", ...), and load the page beneath it accordingly. 
*/
function loadTool(mode, type) {
	// If mode is add, automatically bring up a text box to create a new entry
	// Otherwise, let the user select which existing entry from the selected datatype to edit.

	if (mode == "Add") {
		createNewTextField(mode, type);
	} else {
		viewExistingOptions(mode, type);
	}
}


/* Thus function accepts a type and creates text fields that correspond to that type.
*/
function createNewTextField(mode, type) {
	var functionName = "load" + type + "Page";
	window[functionName]();
	$("#submitForm").html(mode + " " + type);
}

/* Displays to the viewer the existing options to edit or remove from a certain type.
*/
function viewExistingOptions(mode, type) {
	var lowerCaseType = type.toLowerCase();
	typeclass = window[lowerCaseType];

	$("#select-dropdown").empty();

	str = "<select id=\"type-select\">";

	for (var k in typeclass) {
		option = "<option value=\"" + k + "\">" + k + "</option>";
		str += option;
	}

	str += "</select>";

	$("#select-dropdown").html(str);

	$("select#type-select").change(function() {
		name = $(this).val();

		entry = typeclass[name];

		createNewTextField(mode, type);

		fillTextFields(entry);

		if (mode == 'Edit') {
			$(".name").attr("disabled", "disabled");
		} else {
			disableForms();
		}
	})
}


/* Loads the overhead code meant to handle each type of object.*/
function loadToolLoaders() {
	$.getScript("dest/js/toolkitLoaders/loadMeeting.js")
	$.getScript("dest/js/toolkitLoaders/loadInternship.js")
	$.getScript("dest/js/toolkitLoaders/loadFellowship.js")
}

/* Loads Firebase and updates it live, keeping global data in check. */
function initializeFirebase(ref) {

	ref.on("value", function(snapshot){
		data = snapshot.val();
		degree = data["degree"];
		meeting = data["meeting"];
	});

}

/* Given an entry, fills out text boxes with the information in the entry. */
function fillTextFields(entry) {
	$(".form").each(function() {
		$(this).val(entry[$(this).attr("id")]);
	});
}

function submitForm() {


	record = getRecord();

	var result = confirm("Are you sure you want to " + mode.toLowerCase() + " this " + type.toLowerCase() + "?");
	if (mode != "Remove") {
		firebase.database().ref(type.toLowerCase() + "/" + $("name").val()).set(record);
	}
	else {
		firebase.database().ref(type.toLowerCase() + "/" + $(".name").val()).remove();
	}
	console.log(record);

}

function getRecord() {
	var record = {};
	$(".form").each(function() {
		record[$(this).attr("id")] = $(this).val();
	});

	return record;
}

function disableForms() {
	$(".form").each(function() {
		$(this).attr("disabled", "disabled");
	})
}