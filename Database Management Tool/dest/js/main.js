


$(document).ready(function() {
	// When the "Go!" button is clicked, try to load the page with the corresponding 
	//	options selected.
	$("#tool-loader").click(function() {
		loadTool($("#mode").val(), $("#type").val());
	})

	$.getScript("dest/js/loadMeetings.js").done(function() {
		window.alert("Success!");
	}).fail(function() {
		window.alert("Failure!");
	});

});


/* This function will accept mode ("Add", "Edit", "Remove") and type
	("Internship", "Fellowship", ...), and load the page beneath it accordingly. 
*/
function loadTool(mode, type) {
	// If mode is add, automatically bring up a text box to create a new entry
	// Otherwise, let the user select which existing entry from the selected datatype to edit.

	if (mode == "Add") {
		createNewTextField(type);
	} else {
		viewExistingOptions(mode, type);
	}
}


/* Thus function accepts a type and creates text fields that correspond to that type.
*/
function createNewTextField(type) {
	loadMeetingPage();
}

/* Displays to the viewer the existing options to edit or remove from a certain type.
*/
function viewExistingOptions(mode, type) {

}