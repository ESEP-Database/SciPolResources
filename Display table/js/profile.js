var urlParams = new URLSearchParams(window.location.search);
profile_id = urlParams.get('id');

var database = firebase.database();
var profile;
firebase.database().ref(profile_id).once('value').then(function(snapshot) {
    profile = snapshot.val();
    populate_page(profile);
});

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

function populate_page(profile) {
	name = profile["Name"]
	$("body .name").append('<b> <i>' + name + "</i> </b>");
	for (key in profile) {
		val = profile[key];
		if (key == "Resource Type") {
			$("body .type").append('<b><a href="http://science-engage.org/databaseparameters.html"> ' + key + "</a>:</b> "  + resourceTypes[val] + "<br>");
			continue;
		}
		if ((key === "Membership Fee" || key === "Compensation" ) && typeof(val) === "boolean") {
			console.log("Working");
			if (val) {
				val = "Yes";
				console.log("Yes");
			} else {
				val = "No";
				console.log("No");
			}
		}
		if (key === "Name") {
			continue;
		}
		if (key === "Website") {
			val = "<a href='" + val + "'>Learn more</a>";
		}
		console.log(key, val);

		$("body .content").append("<br> <b> " + key + ":</b> " + val + "");
	}
}
