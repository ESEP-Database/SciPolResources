const countrySelectString = '<div data-filter="select" class="Location"> Select what country to search in: <br> \
		<select class="country"> \
			<option>US</option> \
			<option>Mexico</option> \
			<option>Canada</option> \
		</select> \
	</div>'

const academicLevelString = '<div data-filter="checkbox" class="Academic Level"> Select what academic level to search for: <br> \
			<input type="checkbox" id="Bachelor\'s" value="Bachelor\'s"> \
			<label for="Bachelor\'s"> Bachelor\'s</label> \
			<br>   \
			<input type="checkbox" id="Master\'s" value="Master\'s"> \
			<label for="Master\'s"> Master\'s</label> \
			<br>   \
			<input type="checkbox" id="Doctoral" value="Doctoral"> \
			<label for="Doctoral"> Doctoral</label> \
		</div>'

const compensatedSelectString = '<div data-filter="boolean" class="Compensation"> Look for only compensated opportunities: <br> \
		<input type="checkbox" id="Compensation" value="Compensation"> \
		<label for="Compensation"> Compensation</label> \
		</div> '

const citizenshipSelectString = '<div data-filter="boolean" class="Citizenship Requirement"> Citizenship required? <br> \
		<input type="checkbox" id="Citizenship Requirement" value="Citizenship Requirement"> \
		<label for="Citizenship Requirement"> Citizenship Requirement</label> \
		</div>'


function filters_syllabi(){
	$(".filters").append(academicLevelString + '<div data-filter="checkbox" class="Teaching Resource Type"> Select what resource type to search for: <br>\
		<input type="checkbox" id="Syllabus" value="Syllabus"> \
		<label for="Syllabus"> Syllabus</label> \
		<br>   \
		<input type="checkbox" id="Workshop" value="Workshop"> \
		<label for="Workshop"> Workshop</label> \
		<br>   \
		<input type="checkbox" id="Instructional video" value="Instructional video"> \
		<label for="Instructional video"> Instructional video</label> \
		</div> \
		');

}
function filters_degree(){
	$(".filters").append(academicLevelString + countrySelectString);
}
function filters_steo(){
	$(".filters").append(compensatedSelectString+ countrySelectString);

}
function filters_fellowships(){
	$(".filters").append(compensatedSelectString + citizenshipSelectString + countrySelectString);

}
function filters_internships(){
	$(".filters").append();

}
function filters_meetings(){
	$(".filters").append();

}
function filters_training(){
	$(".filters").append();

}
function filters_networks(){
	$(".filters").append();

}
function filters_toolkits(){
	$(".filters").append();

}
function filters_ubspg(){
	$(".filters").append();

}
function filters_other(){
	$(".filters").append();

}