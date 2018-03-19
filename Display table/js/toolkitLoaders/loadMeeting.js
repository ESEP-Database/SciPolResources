function loadMeetingPage() {
	$("#textfields").empty();
	$("#textfields").append("<div id=\"doc form\">");

	$("#textfields").append("Name: <input data-name =\"name\" class=\"form\" id =\"meeting name\" type=\"text\"> <br>");
	$("#textfields").append("About: <textarea class=\"form\" id =\"about\"></textarea> <br>");
	$("#textfields").append("Organization: <input class=\"form\" id =\"organizer(s)\" type=\"text\"> <br>");
	$("#textfields").append("Geographic Range: <input class=\"form\" id =\"geographic range\"type=\"text\"> <br>");
	$("#textfields").append("Specific Location: <input class=\"form\" id =\"specific location\"type=\"text\"> <br>");
	$("#textfields").append("Program Scope: <input class=\"form\" id =\"program scope\" type=\"text\"> <br>");
	$("#textfields").append("URL: <input class=\"form\" id =\"url\" type=\"text\"> <br>");
	$("#textfields").append("<button id = \"submitForm\" onclick=\"submitForm()\"> </button>")

	$("#textfields").append("</div>");
};