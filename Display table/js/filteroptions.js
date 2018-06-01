/* This page offers a variety of filter types and a general-purpose structure to make them effectively carry out their
	task of carrying information for filterData() to parse and remove certain entries as needed. The important elements
	of a filter are as follows:
		* data-filter - This must be an acceptable type to filterData(). We have a couple of prepackaged filter types,
			select, boolean, checkbox, so this information tells the method how to filter the content.
		* class - This must be the name of a field in the database, as filterData() will look at `entry[$CLASS]` for
			entries to see if they are appropriate. It goes without saying that you cannot filter on data that's not 
			in the database.
		* some sort of input - There has to be a way for users to enter how they want to filter and the filterData()
			function to parse the results

   To create a new filter, simply copy the format of 
   	<br> <div data-filter=$FILTERTYPE class=$FIELDNAME> <b> $TEXTPROMPTFORUSER </b> <br> \
   		<... (some sort of input for users to choose their results) ...>
   	</div>

   The format used in the filters already listed here can be copied outright for select, checkbox, and boolean style filters.
*/


// List of UN member states
const countrySelectString = '<br> <div data-filter="select" class="Location"> <b> Select what country to search in:</b> <br> \
		<select class="country"> \
			<option value="">Search all countries</option> \
			<option>Afghanistan</option> \
			<option>Albania</option> \
			<option>Algeria</option> \
			<option>Andorra</option> \
			<option>Angola</option> \
			<option>Antigua and Barbuda</option> \
			<option>Argentina</option> \
			<option>Armenia</option> \
			<option>Australia</option> \
			<option>Austria</option> \
			<option>Azerbaijan</option> \
			<option>Bahamas</option> \
			<option>Bahrain</option> \
			<option>Bangladesh</option> \
			<option>Barbados</option> \
			<option>Belarus</option> \
			<option>Belgium</option> \
			<option>Belize</option> \
			<option>Benin</option> \
			<option>Bhutan</option> \
			<option>Bolivia</option> \
			<option>Bosnia and Herzegovina</option> \
			<option>Botswana</option> \
			<option>Brazil</option> \
			<option>Brunei Darussalam</option> \
			<option>Bulgaria</option> \
			<option>Burkina Faso</option> \
			<option>Burundi</option> \
			<option>Cabo Verde</option> \
			<option>Cambodia</option> \
			<option>Cameroon</option> \
			<option>Canada</option> \
			<option>Central African Republic</option> \
			<option>Chad</option> \
			<option>Chile</option> \
			<option>China</option> \
			<option>Colombia</option> \
			<option>Comoros</option> \
			<option>Congo</option> \
			<option>Costa Rica</option> \
			<option>Côte D\'Ivoire</option> \
			<option>Croatia</option> \
			<option>Cuba</option> \
			<option>Cyprus</option> \
			<option>Czech Republic</option> \
			<option>Democratic People\'s Republic of Korea</option> \
			<option>Democratic Republic of the Congo</option> \
			<option>Denmark</option> \
			<option>Djibouti</option> \
			<option>Dominica</option> \
			<option>Dominican Republic</option> \
			<option>Ecuador</option> \
			<option>Egypt</option> \
			<option>El Salvador</option> \
			<option>Equatorial Guinea</option> \
			<option>Eritrea</option> \
			<option>Estonia</option> \
			<option>Ethiopia</option> \
			<option>Fiji</option> \
			<option>Finland</option> \
			<option>France</option> \
			<option>Gabon</option> \
			<option>Gambia</option> \
			<option>Georgia</option> \
			<option>Germany</option> \
			<option>Ghana</option> \
			<option>Greece</option> \
			<option>Grenada</option> \
			<option>Guatemala</option> \
			<option>Guinea</option> \
			<option>Guinea Bissau</option> \
			<option>Guyana</option> \
			<option>Haiti</option> \
			<option>Honduras</option> \
			<option>Hungary</option> \
			<option>Iceland</option> \
			<option>India</option> \
			<option>Indonesia</option> \
			<option>Iran </option> \
			<option>Iraq</option> \
			<option>Ireland</option> \
			<option>Israel</option> \
			<option>Italy</option> \
			<option>Jamaica</option> \
			<option>Japan</option> \
			<option>Jordan</option> \
			<option>Kazakhstan</option> \
			<option>Kenya</option> \
			<option>Kiribati</option> \
			<option>Kuwait</option> \
			<option>Kyrgyzstan</option> \
			<option>Laos</option> \
			<option>Latvia</option> \
			<option>Lebanon</option> \
			<option>Lesotho</option> \
			<option>Liberia</option> \
			<option>Libya</option> \
			<option>Liechtenstein</option> \
			<option>Lithuania</option> \
			<option>Luxembourg</option> \
			<option>Macedonia</option> \
			<option>Madagascar</option> \
			<option>Malawi</option> \
			<option>Malaysia</option> \
			<option>Maldives</option> \
			<option>Mali</option> \
			<option>Malta</option> \
			<option>Marshall Islands</option> \
			<option>Mauritania</option> \
			<option>Mauritius</option> \
			<option>Mexico</option> \
			<option>Micronesia </option> \
			<option>Monaco</option> \
			<option>Mongolia</option> \
			<option>Montenegro</option> \
			<option>Morocco</option> \
			<option>Mozambique</option> \
			<option>Myanmar</option> \
			<option>Namibia</option> \
			<option>Nauru</option> \
			<option>Nepal</option> \
			<option>Netherlands</option> \
			<option>New Zealand</option> \
			<option>Nicaragua</option> \
			<option>Niger</option> \
			<option>Nigeria</option> \
			<option>Norway</option> \
			<option>Oman</option> \
			<option>Pakistan</option> \
			<option>Palau</option> \
			<option>Panama</option> \
			<option>Papua New Guinea</option> \
			<option>Paraguay</option> \
			<option>Peru</option> \
			<option>Philippines</option> \
			<option>Poland</option> \
			<option>Portugal</option> \
			<option>Qatar</option> \
			<option>Republic of Moldova</option> \
			<option>Romania</option> \
			<option>Russian Federation</option> \
			<option>Rwanda</option> \
			<option>Saint Kitts and Nevis</option> \
			<option>Saint Lucia</option> \
			<option>Saint Vincent and the Grenadines</option> \
			<option>Samoa</option> \
			<option>San Marino</option> \
			<option>Sao Tome and Principe</option> \
			<option>Saudi Arabia</option> \
			<option>Senegal</option> \
			<option>Serbia</option> \
			<option>Seychelles</option> \
			<option>Sierra Leone</option> \
			<option>Singapore</option> \
			<option>Slovakia</option> \
			<option>Slovenia</option> \
			<option>Solomon Islands</option> \
			<option>Somalia</option> \
			<option>South Africa</option> \
			<option>South Korea</option> \
			<option>South Sudan</option> \
			<option>Spain</option> \
			<option>Sri Lanka</option> \
			<option>Sudan</option> \
			<option>Suriname</option> \
			<option>Swaziland</option> \
			<option>Sweden</option> \
			<option>Switzerland</option> \
			<option>Syria</option> \
			<option>Tajikistan</option> \
			<option>Tanzania</option> \
			<option>Thailand</option> \
			<option>Timor—Leste</option> \
			<option>Togo</option> \
			<option>Tonga</option> \
			<option>Trinidad and Tobago</option> \
			<option>Tunisia</option> \
			<option>Turkey</option> \
			<option>Turkmenistan</option> \
			<option>Tuvalu</option> \
			<option>Uganda</option> \
			<option>Ukraine</option> \
			<option>United Arab Emirates</option> \
			<option>United Kingdom </option> \
			<option>United States of America</option> \
			<option>Uruguay</option> \
			<option>Uzbekistan</option> \
			<option>Vanuatu</option> \
			<option>Venezuela</option> \
			<option>Vietnam</option> \
			<option>Yemen</option> \
			<option>Zambia</option> \
			<option>Zimbabwe</option> \
		</select> \
	</div>'

// Only degree and university have state-level filtering.
const stateSelect = '<br> <b> Select what state to search in: </b> <br> <select class="state"> \
						<option></option> \
						<option>Alabama</option> \
						<option>Alaska</option> \
						<option>Arizona</option> \
						<option>Arkansas</option> \
						<option>California</option> \
						<option>Colorado</option> \
						<option>Connecticut</option> \
						<option>Delaware</option> \
						<option>Florida</option> \
						<option>Georgia</option> \
						<option>Hawaii</option> \
						<option>Idaho</option> \
						<option>Illinois</option> \
						<option>Indiana</option> \
						<option>Iowa</option> \
						<option>Kansas</option> \
						<option>Kentucky</option> \
						<option>Louisiana</option> \
						<option>Maine</option> \
						<option>Maryland</option> \
						<option>Massachusetts</option> \
						<option>Michigan</option> \
						<option>Minnesota</option> \
						<option>Mississippi</option> \
						<option>Missouri</option> \
						<option>Montana</option> \
						<option>Nebraska</option> \
						<option>Nevada</option> \
						<option>New Hampshire</option> \
						<option>New Jersey</option> \
						<option>New Mexico</option> \
						<option>New York</option> \
						<option>North Carolina</option> \
						<option>North Dakota</option> \
						<option>Ohio</option> \
						<option>Oklahoma</option> \
						<option>Oregon</option> \
						<option>Pennsylvania</option> \
						<option>Rhode Island</option> \
						<option>South Carolina</option> \
						<option>South Dakota</option> \
						<option>Tennessee</option> \
						<option>Texas</option> \
						<option>Utah</option> \
						<option>Vermont</option> \
						<option>Virginia</option> \
						<option>Washington</option> \
						<option>West Virginia</option> \
						<option>Wisconsin</option> \
						<option>Wyoming</option> \
						<option>Washington, DC</option> \
					</select>'

// This function makes it so that when the country is selected to be United States of America,
//  the state filter appears, and when the state filter changes, the dataset is refreshed. 
//  This is in part why datatype needs to be a global variable.
function bindStates() {
	$(".filters div").children(".country").change(function () {
		if ($(this).val() === "United States of America") {
			$(this).after(stateSelect);
			$("select.state").change(function() {
		        dataset = data[datatype];
		        dataset = filterData(dataset);
		        $(".data").empty();
		        displayData(dataset);
			});
		} else {
			$("select.state").remove();
		}
	});
}

const academicLevelString = '<br><div data-filter="checkbox" class="Academic Level"> <b>Select what academic level to search for:</b> <br> \
			<input type="checkbox" id="Bachelor\'s" value="Bachelor\'s"> \
			<label for="Bachelor\'s"> Bachelor\'s</label> \
			<br>   \
			<input type="checkbox" id="Master\'s" value="Master\'s"> \
			<label for="Master\'s"> Master\'s</label> \
			<br>   \
			<input type="checkbox" id="Doctoral" value="Doctoral"> \
			<label for="Doctoral"> Doctoral</label> \
			<br>   \
			<input type="checkbox" id="Graduate Certificate" value="Graduate Certificate"> \
			<label for="Graduate Certificate"> Graduate Certificate</label> \
			<br>   \
			<input type="checkbox" id="Undergraduate Minor" value="Undergraduate Minor"> \
			<label for="Undergraduate Minor"> Undergraduate Minor</label> \
		</div>'

const compensatedSelectString = '<br><div data-filter="boolean" class="Compensation"> <b>Look for only compensated opportunities:</b> <br> \
		<input type="checkbox" id="Compensation" value="Compensation"> \
		<label for="Compensation"> Compensation</label> \
		</div> '

const citizenshipSelectString = '<br><div data-filter="boolean" class="Citizenship Requirement"> <b>Citizenship required?</b> <br> \
		<input type="checkbox" id="Citizenship Requirement" value="Citizenship Requirement"> \
		<label for="Citizenship Requirement"> Citizenship Requirement</label> \
		</div>'

const teachingResourceTypeString = '<br><div data-filter="checkbox" class="Teaching Resource Type"> <b>Select what resource type to search for:</b> <br>\
		<input type="checkbox" id="Syllabus" value="Syllabus"> \
		<label for="Syllabus"> Syllabus</label> \
		<br>   \
		<input type="checkbox" id="Template" value="Template"> \
		<label for="Template"> Template</label> \
		<br>   \
		<input type="checkbox" id="Instructional video" value="Instructional video"> \
		<label for="Instructional video"> Instructional video</label> \
		</div> \
		'

const programTypeString = '<br><div data-filter="checkbox" class="Program Type"> <b>Select what program type to search for:</b> <br>\
		<input type="checkbox" id="Details & Rotations" value="Details & Rotations"> \
		<label for="Details & Rotations"> Details & Rotations</label> \
		<br>   \
		<input type="checkbox" id="Pairing Schemes" value="Pairing Schemes"> \
		<label for="Pairing Schemes"> Pairing Schemes</label> \
		</div> \
		'

const membershipFeeString = '<br><div data-filter="boolean" class="Membership Fee"> <b>Only organizations with membership fees:</b> <br>\
		<input type="checkbox" id="Membership Fees" value="Membership Fees"> \
		<label for="Membership Fees"> Membership Fees</label> \
		<br>   \
		</div> \
		'

function filters_syllabi(){
	$(".filters").append(academicLevelString + teachingResourceTypeString);

}
function filters_degree(){
	$(".filters").append(academicLevelString + countrySelectString);
	bindStates()
}

function filters_details(){
	$(".filters").append(compensatedSelectString + countrySelectString + programTypeString);

}
function filters_fellowships(){
	$(".filters").append(compensatedSelectString + citizenshipSelectString + countrySelectString);

}
function filters_internships(){
	$(".filters").append(countrySelectString + compensatedSelectString + citizenshipSelectString);

}
function filters_meetings(){
	$(".filters").append(countrySelectString);

}
function filters_training(){
	$(".filters").append(countrySelectString);

}
function filters_networks(){
	$(".filters").append(membershipFeeString);

}
function filters_toolkits(){
	$(".filters").append();

}
function filters_university(){
	$(".filters").append(countrySelectString);
	bindStates();
}
function filters_other(){
	$(".filters").append();

}