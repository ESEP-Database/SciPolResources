/* This page offers a variety of loader types and a general-purpose structure to make them effectively carry out their
      task of carrying information for to be parsed. The important elements are as follows:
            * data-filter - This must be an acceptable type to the major functions in main.js for the management tool.
                  We have a couple of prepackaged filter types, select, boolean, checkbox, location, text, textarea,
                  so this information tells the method how to load and parse the content.
            * id - This must be the name of a field in the database, as the page will try to read data with this label and
                  eventually write to the database with this label, and it goes without saying that you cannot filter on data 
                  that's not in the database.
            * some sort of input - There has to be a way for users to enter their information or view it and page to read the
                  results so it can update the database.

   To create a new loader, simply copy the format of 
      <br> <div data-filter=$FILTERTYPE id=$FIELDNAME class="form"> <b> $TEXTPROMPTFORUSER </b> <br> \
            <... (some sort of input for users to choose their results) ...>
      </div>

   The format used in the filters already listed here can be copied outright for the various filters we've already implemented,
      and should be done for the sake of simplicity.
*/


// List of UN Member States
const countrySelectString = '<br> <div data-filter="location" id="Location" class="form"> <b> Location details:</b> \
        <select class="input" id="Location"> \
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
const stateSelectString = '<select id="state"> \
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
    $("div#Location").children("#Location").change(function () {
        console.log($(this).val());
        if ($(this).val() === "United States of America") {
            $(this).after(stateSelectString);
        } else {
            $("select#state").remove();
        }
    });
}

const yearString = '<br> <div data-filter="select" id="Year" class="form"> <b> Year:</b> \
        <select class="input" id="Year"> \
            <option>1900</option> \
            <option>1901</option> \
            <option>1902</option> \
            <option>1903</option> \
            <option>1904</option> \
            <option>1905</option> \
            <option>1906</option> \
            <option>1907</option> \
            <option>1908</option> \
            <option>1909</option> \
            <option>1910</option> \
            <option>1911</option> \
            <option>1912</option> \
            <option>1913</option> \
            <option>1914</option> \
            <option>1915</option> \
            <option>1916</option> \
            <option>1917</option> \
            <option>1918</option> \
            <option>1919</option> \
            <option>1920</option> \
            <option>1921</option> \
            <option>1922</option> \
            <option>1923</option> \
            <option>1924</option> \
            <option>1925</option> \
            <option>1926</option> \
            <option>1927</option> \
            <option>1928</option> \
            <option>1929</option> \
            <option>1930</option> \
            <option>1931</option> \
            <option>1932</option> \
            <option>1933</option> \
            <option>1934</option> \
            <option>1935</option> \
            <option>1936</option> \
            <option>1937</option> \
            <option>1938</option> \
            <option>1939</option> \
            <option>1940</option> \
            <option>1941</option> \
            <option>1942</option> \
            <option>1943</option> \
            <option>1944</option> \
            <option>1945</option> \
            <option>1946</option> \
            <option>1947</option> \
            <option>1948</option> \
            <option>1949</option> \
            <option>1950</option> \
            <option>1951</option> \
            <option>1952</option> \
            <option>1953</option> \
            <option>1954</option> \
            <option>1955</option> \
            <option>1956</option> \
            <option>1957</option> \
            <option>1958</option> \
            <option>1959</option> \
            <option>1960</option> \
            <option>1961</option> \
            <option>1962</option> \
            <option>1963</option> \
            <option>1964</option> \
            <option>1965</option> \
            <option>1966</option> \
            <option>1967</option> \
            <option>1968</option> \
            <option>1969</option> \
            <option>1970</option> \
            <option>1971</option> \
            <option>1972</option> \
            <option>1973</option> \
            <option>1974</option> \
            <option>1975</option> \
            <option>1976</option> \
            <option>1977</option> \
            <option>1978</option> \
            <option>1979</option> \
            <option>1980</option> \
            <option>1981</option> \
            <option>1982</option> \
            <option>1983</option> \
            <option>1984</option> \
            <option>1985</option> \
            <option>1986</option> \
            <option>1987</option> \
            <option>1988</option> \
            <option>1989</option> \
            <option>1990</option> \
            <option>1991</option> \
            <option>1992</option> \
            <option>1993</option> \
            <option>1994</option> \
            <option>1995</option> \
            <option>1996</option> \
            <option>1997</option> \
            <option>1998</option> \
            <option>1999</option> \
            <option>2000</option> \
            <option>2001</option> \
            <option>2002</option> \
            <option>2003</option> \
            <option>2004</option> \
            <option>2005</option> \
            <option>2006</option> \
            <option>2007</option> \
            <option>2008</option> \
            <option>2009</option> \
            <option>2010</option> \
            <option>2011</option> \
            <option>2012</option> \
            <option>2013</option> \
            <option>2014</option> \
            <option>2015</option> \
            <option>2016</option> \
            <option>2017</option> \
            <option>2018</option> \
        </select> \
    </div>'

const academicLevelString = '<br><div data-filter="checkbox" id="Academic Level" class="form"> <b>Academic Level:</b> <br> \
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

const compensatedSelectString = '<br><div data-filter="boolean" id="Compensation" class="form"> <b>Compensated:</b> \
        <input type="checkbox" id="Compensation" value="Compensation"> \
        <label for="Compensation"> Compensation</label> \
        </div>'

const citizenshipSelectString = '<br><div data-filter="boolean" id="Citizenship Requirement" class="form"> <b>Citizenship required?</b> \
        <input type="checkbox" id="Citizenship Requirement" value="Citizenship Requirement"> \
        <label for="Citizenship Requirement"> Citizenship Requirement</label> \
        </div>'

const teachingResourceString = '<br><div data-filter="checkbox" id="Teaching Resource Type" class="form"> <b>Teaching Resource Type:</b> <br>\
        <input type="checkbox" id="Syllabus" value="Syllabus"> \
        <label for="Syllabus"> Syllabus</label> \
        <br>   \
        <input type="checkbox" id="Template" value="Template"> \
        <label for="Template"> Template</label> \
        <br>   \
        <input type="checkbox" id="Instructional video" value="Instructional video"> \
        <label for="Instructional video"> Instructional video</label> \
        </div>'

const detailsPairingString = '<br><div data-filter="checkbox" class="Program Type"> <b>Select what program type to search for:</b> <br>\
        <input type="checkbox" id="Details & Rotations" value="Details & Rotations"> \
        <label for="Details & Rotations"> Details & Rotations</label> \
        <br>   \
        <input type="checkbox" id="Pairing Schemes" value="Pairing Schemes"> \
        <label for="Pairing Schemes"> Pairing Schemes</label> \
        </div>'

const membershipString = '<br><div data-filter="boolean" id="Membership Fee" class="form"> <b>Membership fee?:</b>\
        <input type="checkbox" id="Membership Fees" value="Membership Fees"> \
        <label for="Membership Fees"> Membership Fees</label> \
        <br>   \
        </div>'

const nameString = '<br><div data-filter="text" id="Name" class="form"> <b> Name: </b> \
        <input type="text" name="Name" id="Name"> <br> </div>'

const aboutString = '<br><div data-filter="textarea" id="About" class="form"> <b> About: </b> \
        <textarea rows=4 cols=50 name="About" id="About"> </textarea><br> </div>'

const institutionString = '<br><div data-filter="text" id="Institution" class="form"> <b> Institution: </b> \
        <input type="text" name="Institution" id="Institution"> <br> </div>'

const instructorString = '<br><div data-filter="text" id="Instructor(s)" class="form"> <b> Instructor(s): </b> \
        <input type="text" name="Instructor(s)" id="Instructor(s)"> <br> </div>'

const websiteString = '<br><div data-filter="text" id="Website" class="form"> <b> Website: </b> \
        <input type="text" name="Website" id="Website"> <br> </div>'

const organizationString = '<br><div data-filter="text" id="Sponsoring Organization" class="form"> <b> Sponsoring Organization: </b> \
        <input type="text" name="Sponsoring Organization" id="Sponsoring Organization"> <br> </div>'

const organizerString = '<br><div data-filter="text" id="Organizer" class="form"> <b> Organizer: </b> \
        <input type="text" name="Organizer" id="Organizer"> <br> </div>'

const durationString = '<br><div data-filter="text" id="Duration" class="form"> <b> Duration: </b> \
        <input type="text" name="Duration" id="Duration"> <br> </div>'

const careerString = '<br><div data-filter="text" id="Career" class="form"> <b> Career Stage: </b> \
        <input type="text" name="Career" id="Career"> <br> </div>'

const programTypeString = '<br> <div data-filter="select" id="Program Type" class="form"> <b> Program Type:</b> \
        <select class="input" id="Program Type"> \
            <option>Detail & Rotations</option> \
            <option>Pairing Schemes</option> \
        </select> \
    </div>'

const degreeRequirementString = '<br><div data-filter="text" id="Degree Requirement" class="form"> <b> Degree/Other Requirement: </b> \
        <input type="text" name="Degree Requirement" id="Degree Requirement"> <br> </div>'

const geoScopeString = '<br><div data-filter="text" class="Geographic Scope"> <b> Geographic Scope: </b> \
        <input type="text" name="Geographic Scope" id="Geographic Scope"> <br> </div>'

const submitButtonString = '<br> <button id="submitForm" onclick="submitForm()"></button> '

function load_syllabi(){
    $("#textfields").append(nameString + teachingResourceString + yearString + 
        institutionString + academicLevelString + instructorString + websiteString);
}

function load_details(){
    $("#textfields").append(nameString + programTypeString + aboutString + countrySelectString + 
        organizationString + durationString + degreeRequirementString + compensatedSelectString + websiteString);
}

function load_degree(){
    $("#textfields").append(nameString + aboutString + institutionString + countrySelectString + 
        academicLevelString + websiteString);
    bindStates();
}

function load_fellowships(){
    $("#textfields").append(nameString + aboutString + countrySelectString + organizationString + 
        citizenshipSelectString + degreeRequirementString + compensatedSelectString + websiteString);
}

function load_internships(){
    $("#textfields").append(nameString + countrySelectString + aboutString + websiteString + organizationString + 
        citizenshipSelectString + degreeRequirementString + compensatedSelectString);
}

function load_meetings(){
    $("#textfields").append(nameString + organizerString + aboutString + countrySelectString + websiteString);
}

function load_training(){
    $("#textfields").append(nameString + organizerString + aboutString + countrySelectString + websiteString)
}

function load_networks(){
    $("#textfields").append(nameString + organizationString + aboutString + membershipString + geoScopeString + websiteString);
}

function load_toolkits(){
    $("#textfields").append(nameString + organizationString + aboutString + websiteString);
}

function load_university(){
    $("#textfields").append(nameString + institutionString + aboutString + countrySelectString + websiteString);
    bindStates();
}

function load_other(){
    $("#textfields").append(nameString + organizationString + aboutString + websiteString);
}