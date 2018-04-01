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
		$("body .content").append("<b> " + key + "</b> : " + profile[key] + "<br>");
	}
}

$(document).ready(function() {
	console.log(profile)
    console.log(profile_id);
});
