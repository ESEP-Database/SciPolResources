var key;
var mode;
var type;

var provider = new firebase.auth.GoogleAuthProvider();
var database = firebase.database();
var data;

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        console.log(user);
        loadData();
    } else {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider);
    } 

});

function loadData() {
    $("#header").show(); // Should be before function call
    $("#signin").empty();
    firebase.database().ref().on('value', function(snapshot) {
        data = snapshot.val()
        data = preprocess(data);    
        bindSelects();    
    }, function (error) {
        console.log("Error: " + error.code);
        $("#signin").append("<br> Cannot connect to Firebase, please try again later. <br>");
        $("#signin").append("Error: " + error.code);
    });
}

function preprocess(data) {
    // syllabi, degree programs, etc
    str = '';
       var processed_data = {};
    for (var key in data) {
        item = data[key];
        if (typeof processed_data[item["Resource Type"]] === "undefined") {
            processed_data[item["Resource Type"]] = {}
        }
        processed_data[item["Resource Type"]][key] = item;
    }
    return processed_data;
}

function bindSelects() {
    $("#header select").on("change", function() {
        if ($("select#resource").val()) {
            $("#textfields").empty();
            $("#select-dropdown").empty();
            mode = $("select#mode").val();
            type = $("select#resource").val();
            loadTool(mode, type);
        }
    });
}



/* This function will accept mode ("Add", "Edit", "Remove") and type
    ("Internship", "Fellowship", ...), and load the page beneath it accordingly. 
*/
function loadTool(mode, type) {
    // If mode is add, automatically bring up a text box to create a new entry
    // Otherwise, let the user select which existing entry from the selected datatype to edit.
    if (mode == "add") {
        createNewTextField(mode, type);
    } else {
        viewExistingOptions(mode, type);
    }
}


/* Thus function accepts a type and creates text fields that correspond to that type.
*/
function createNewTextField(mode, type) {
    var functionName = "load_" + type;
    window[functionName](); 
    $("#textfields").append(submitButtonString);
    if (mode === "add") {
        $("button#submitForm").html("Add New Resource");
    } else if (mode === "edit") {
        $("button#submitForm").html("Submit Change");
    } else if (mode === "remove") {
        $("button#submitForm").html("Remove Resource");
    }
}

/* Displays to the viewer the existing options to edit or remove from a certain type.
*/
function viewExistingOptions(mode, type) {

    str = '<select id="type-select"> <option value ="">Choose one...</option>';

    for (key in data[type]) {
        option = '<option value="' + key + '">' + data[type][key]["Name"] + "</option>";
        str += option;
    }

    str += '</select>';

    $("#select-dropdown").html(str);

    $("select#type-select").change(function() {
        key = $(this).val();
        if($(this).val()) {
            $("#textfields").empty();
            createNewTextField(mode, type);
            fillTextFields(data[type][$(this).val()]);
            // console.log(data[type][$(this).val()]);
        }

        if (mode === 'remove') {
            // console.log("Trying to remove");
            disableForms();
        }
    })
}



/* Given an entry, fills out text boxes with the information in the entry. */
function fillTextFields(entry) {
    $("#textfields").children("div.form").each(function() { 
        datatype = $(this).attr("data-filter");
        if (datatype === "text") {
            $(this).children("input").val(entry[$(this).attr("id")]);
        } else if (datatype === "textarea") {
            $(this).children("textarea").val(entry[$(this).attr("id")]);
        } else if (datatype === "select") {
            // console.log($(this).children("select"));
            $(this).children("select").val(entry[$(this).attr("id")]);
        } else if (datatype === "textselect") {
            parts = entry[$(this).attr("id")].split(", ");
            country = parts.pop()
            $(this).children("input").val(parts.join(", "));
            $(this).children("select").val(country);
        } else if (datatype === "checkbox") {
            // console.log($(this).children("input"));
            // console.log(entry[$(this).attr("id")]);
            selections = entry[$(this).attr("id")]
            $(this).children("input").each(function() {
                if (selections.indexOf($(this).attr("id")) !== -1) {
                    $(this).attr("checked", "checked");
                }
                // console.log($(this));
            })
        } else if (datatype === "boolean") {
            if (entry[$(this).attr("id")]) {
                $(this).children("input").attr("checked", "checked");
            }
        } else {
            alert("Unexpected datatype: " + datatype);
        }
    })
}

function submitForm() {
    record = getRecord();
    console.log(record);
    var result = confirm("Are you sure you want to " + mode.toLowerCase() + " this record?");
    if (!result) {
        return;
    }
    if (mode == "add") {
        firebase.database().ref().push(record, function(error) {
            processError(error);
        });
    } else if ($("select#type-select").val() !== key) {
        alert("Error loading corresponding entry, please reload and try again");
        return;
    } else if (mode == "edit") {
        firebase.database().ref(key).set(record, function(error) {
            processError(error);
        });
    } else if (mode == "remove") {
        firebase.database().ref(key).remove(function(error) {
            processError(error);
        });
    } else {
        alert("Error in processing data, please reload page and try again!");
        return
    }
}

function processError(error) {
    if (error) {
        alert("Data could not be saved." + error);
    } else {
        alert("Data saved successfully.");
        $("#textfields").empty();
        $("#select-dropdown").empty();
        $("select#mode").val("add");
        $("select#resource").val("");
    }
}

function getRecord() {
    var record = {};
    $("#textfields").children("div.form").each(function() { 
        datatype = $(this).attr("data-filter");
        if (datatype === "text") {
            record[$(this).attr("id")] = $(this).children("input").val();
        } else if (datatype === "textarea") {
            record[$(this).attr("id")] = $(this).children("textarea").val();
        } else if (datatype === "select") {
            // console.log($(this).children("select"));
            record[$(this).attr("id")] = $(this).children("select").val();
        } else if (datatype === "textselect") {
            detail = $(this).children("input").val();
            country = $(this).children("select").val();
            record[$(this).attr("id")] = detail + ", " + country;
        } else if (datatype === "checkbox") {
            // console.log($(this).children("input:checked"));
            selections = []
            $(this).children("input:checked").each(function() {
                selections.push($(this).attr("value"));
            })
            record[$(this).attr("id")] = selections.join(", ");
        } else if (datatype === "boolean") {
            record[$(this).attr("id")] = $(this).children("input").is(":checked");

        } else {
            alert("Unexpected datatype: " + datatype);
        }
    });
    record["Resource Type"] = type;
    return record;
}

function disableForms() {
    $("#textfields").children("div.form").each(function() { 
        datatype = $(this).attr("data-filter");
        if (datatype === "text") {
            $(this).children("input").prop('disabled', true);
        } else if (datatype === "textarea") {
            $(this).children("textarea").prop('disabled', true);
        } else if (datatype === "select") {
            // console.log($(this).children("select"));
            $(this).children("select").attr('disabled', 'disabled');
        } else if (datatype === "textselect") {
            $(this).children("input").prop('disabled', true);
            $(this).children("select").attr('disabled', 'disabled');
        } else if (datatype === "checkbox") {
            $(this).children("input").attr('disabled', true);
        } else if (datatype === "boolean") {
            $(this).children("input").attr("disabled", true);
        } else {
            alert("Unexpected datatype: " + datatype);
        }
    })
}