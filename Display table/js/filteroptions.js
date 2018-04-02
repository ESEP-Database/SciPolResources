// List of UN member states
const countrySelectString = '<br> <div data-filter="select" class="Location"> <b> Select what country to search in:</b> <br> \
		<select class="country"> \
			<option></option> \
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
			<option>Bolivia (Plurinational State of)</option> \
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
			<option>Gambia (Republic of The)</option> \
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
			<option>Iran (Islamic Republic of)</option> \
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
			<option>Lao People’s Democratic Republic</option> \
			<option>Latvia</option> \
			<option>Lebanon</option> \
			<option>Lesotho</option> \
			<option>Liberia</option> \
			<option>Libya</option> \
			<option>Liechtenstein</option> \
			<option>Lithuania</option> \
			<option>Luxembourg</option> \
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
			<option>Micronesia (Federated States of)</option> \
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
			<option>Republic of Korea</option> \
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
			<option>South Sudan</option> \
			<option>Spain</option> \
			<option>Sri Lanka</option> \
			<option>Sudan</option> \
			<option>Suriname</option> \
			<option>Swaziland</option> \
			<option>Sweden</option> \
			<option>Switzerland</option> \
			<option>Syrian Arab Republic</option> \
			<option>Tajikistan</option> \
			<option>Thailand</option> \
			<option>The former Yugoslav Republic of Macedonia</option> \
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
			<option>United Kingdom of Great Britain and Northern Ireland</option> \
			<option>United Republic of Tanzania</option> \
			<option>United States of America</option> \
			<option>Uruguay</option> \
			<option>Uzbekistan</option> \
			<option>Vanuatu</option> \
			<option>Venezuela, Bolivarian Republic of</option> \
			<option>Viet Nam</option> \
			<option>Yemen</option> \
			<option>Zambia</option> \
			<option>Zimbabwe</option> \
		</select> \
	</div>'

const academicLevelString = '<br><div data-filter="checkbox" class="Academic Level"> <b>Select what academic level to search for:</b> <br> \
			<input type="checkbox" id="Bachelor\'s" value="Bachelor\'s"> \
			<label for="Bachelor\'s"> Bachelor\'s</label> \
			<br>   \
			<input type="checkbox" id="Master\'s" value="Master\'s"> \
			<label for="Master\'s"> Master\'s</label> \
			<br>   \
			<input type="checkbox" id="Doctoral" value="Doctoral"> \
			<label for="Doctoral"> Doctoral</label> \
		</div>'

const compensatedSelectString = '<br><div data-filter="boolean" class="Compensation"> <b>Look for only compensated opportunities:</b> <br> \
		<input type="checkbox" id="Compensation" value="Compensation"> \
		<label for="Compensation"> Compensation</label> \
		</div> '

const citizenshipSelectString = '<br><div data-filter="boolean" class="Citizenship Requirement"> <b>Citizenship required?</b> <br> \
		<input type="checkbox" id="Citizenship Requirement" value="Citizenship Requirement"> \
		<label for="Citizenship Requirement"> Citizenship Requirement</label> \
		</div>'


function filters_syllabi(){
	$(".filters").append(academicLevelString + '<br><div data-filter="checkbox" class="Teaching Resource Type"> <b>Select what resource type to search for:</b> <br>\
		<input type="checkbox" id="Syllabus" value="Syllabus"> \
		<label for="Syllabus"> Syllabus</label> \
		<br>   \
		<input type="checkbox" id="Template" value="Template"> \
		<label for="Template"> Template</label> \
		<br>   \
		<input type="checkbox" id="Instructional video" value="Instructional video"> \
		<label for="Instructional video"> Instructional video</label> \
		</div> \
		');

}
function filters_degree(){
	$(".filters").append(academicLevelString + countrySelectString);
}

function filters_details(){
	$(".filters").append(compensatedSelectString+ countrySelectString);

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
	$(".filters").append('<br><div data-filter="boolean" class="Membership Fee"> <b>Only organizations with membership fees:</b> <br>\
		<input type="checkbox" id="Membership Fees" value="Membership Fees"> \
		<label for="Membership Fees"> Membership Fees</label> \
		<br>   \
		</div> \
		');

}
function filters_toolkits(){
	$(".filters").append();

}
function filters_university(){
	$(".filters").append(countrySelectString);

}
function filters_other(){
	$(".filters").append();

}