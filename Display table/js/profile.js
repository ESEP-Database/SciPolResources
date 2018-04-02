var urlParams = new URLSearchParams(window.location.search);
profile_id = urlParams.get('id');

var database = firebase.database();
var profile;
firebase.database().ref(profile_id).once('value').then(function(snapshot) {
    profile = snapshot.val();
    populate_page(profile);
});

function populate_page(profile) {
	for (key in profile) {
		if (key == "Resource Type") {
			continue;
		}
		val = profile[key];
		if (key == "Website") {
			val = "<a href=" + val + ">" + val + "<a>";
		}
		$("body .content").append("<br> <b> " + key + "</b> : " + val + "<br>");
	}
}
