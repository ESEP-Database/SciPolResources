/* Global Firebase object, used for all Firebase instance calls (only one)*/
var database = firebase.database();
/* Single entry profile*/
var profile;
/* ID of the entry*/
var profile_id;

$(document).ready(function() {
	var urlParams = new URLSearchParams(window.location.search);
	profile_id = urlParams.get('id');

	firebase.database().ref(profile_id).once('value').then(function(snapshot) {
	    profile = snapshot.val();
	    populate_page(profile);
	});
});

// This dictionary looks up the moniker-to-resource name mapping.
const resourceTypes = {
	"syllabi" : "Course Syllabi and Teaching Resources",
	"degree" : "Degree Programs",
	"details" : "Details, Pairing Schemes, and Rotations",
	"fellowships" : "Fellowships",
	"internships" : "Internships",
	"meetings" : "Meetings and Conferences",
	"training" : "Training Opportunities",
	"networks" : "Professional Networks",
	"toolkits" : "Toolkits and Outreach Resources",
	"university" : "University-based Student Policy Groups",
	"other" : "Other Tools and Resources"
}
/*	  This function simply takes a single profile entry and updates the page with it. The name is
		used as the title, and there are a couple other special handling cases.
*/
function populate_page(profile) {
	name = profile["Name"]
	$("body .name").append('<b> <i>' + name + "</i> </b>");
	for (key in profile) {
		val = profile[key];
		// Resource Type doesn't get added normally, but is added to the special ".type" span.
		if (key == "Resource Type") {
			$("body .type").append('<b><a href="http://science-engage.org/databaseparameters.html"> ' + key + "</a>:</b> "  + resourceTypes[val] + "<br>");
			continue;
		}
		// Boolean -> Yes/No
		if (typeof(val) === "boolean") {
			if (val) {
				val = "Yes";
			} else {
				val = "No";
			}
		}
		if (key === "Name") {
			continue;
		}
		// Websites get linked to- try to see if it has the appropriate http prefix, otherwise add it on.
		if (key === "Website") {
			if (val.substring(0, 4) !== "http") {
				val = "http://" + val;
			}
			val = "<a href='" + val + "'>Learn more</a>";
		}

		$("body .content").append("<br> <b> " + key + ":</b> " + val + "");
	}
}
