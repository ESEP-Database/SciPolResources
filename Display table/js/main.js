var provider = new firebase.auth.GoogleAuthProvider();

var database = firebase.database();
var datatype;
var data;
firebase.database().ref().once('value').then(function(snapshot) {
    data = snapshot.val()
    data = preprocess(data);
    displayAllData();
    $("#resetFilters").click(function() {
        console.log("Nope");
    });
    $("#resetPage").click(resetPage());
});

$(document).ready(function() {
    $("select.main").on("change", function() {
        $(".filters").empty();
        $(".data").empty();
        if(this.value){
            var filters_name = "filters_" + this.value;
            console.log(filters_name);
            window[filters_name]();
            console.log(this.value);
            displayData(data[this.value]);
        } else {
            console.log("Normal case");
        	displayAllData();
        }
        datatype = this.value;
        $(".filters div").each(function() {
            $(this).children(":input").change(function() {
                dataset = data[datatype];
                dataset = filterData(dataset);
                $(".data").empty();
                displayData(dataset);
            });
        });
        
    });
});

/*    This function's primary role is to append toString elements to each item in the dataset
        so that the results can be quickly displayed in the search table
*/
function preprocess(data) {
    // syllabi, degree programs, etc
    str = '';
   	var processed_data = {};
    for (var key in data) {
    	item = data[key];
    	item["toString"] = toString(item, key);
    	if (typeof processed_data[item["Resource Type"]] === "undefined") {
    		processed_data[item["Resource Type"]] = {}
    	}
    	processed_data[item["Resource Type"]][key] = item;
    }
    // console.log(processed_data);
    sorted_data = {};
    console.log(Date.now())
    for (var type in processed_data) {
        console.log(processed_data[type]);
        data_array = Object.keys(processed_data[type]).map(function (key) { return processed_data[type][key]; });
        data_array.sort( function (a, b) {
            return a['Name'] > b['Name']
        });
        for (i = 0; i < data_array.length; i++) {
            // console.log(data_array[i]['Name']);
        }
        sorted_data[type] = data_array;
    }
    console.log(Date.now());
    return sorted_data;
    /*for (var datatype in data) {
        // Individual entries
        dataset = data[datatype];
        for (var element in dataset) {
            dataset[element]["toString"] = toString(dataset[element], datatype);
        }
    }
    return data*/
}

/*    Given an element, give a short string that characterizes it in the search table.
        optional arg, datatype can be used to make the toStrings more unique.
*/
function toString(element, key) {
    var website = element["Website"];
    var str = "<a href=http://science-engage.org/profile.html?id=" + key + "><div class=table-element> <span><b>";
    str = str + element["Name"] + "</b> </span> <br>";
    var info = element["About"];
    if (typeof info == "undefined") {
        var info = element["Institution"];
    }
    str += info
    str +=  "</div> </a> <br> <hr>";
    // console.log(str);
    return str;
}

function displayData(dataset) {
    for (i = 0; i < dataset.length; i++) {
        $(".data").append(dataset[i]["toString"]);
    }
    $(".count u").html($("div.table-element").length);
}

function displayAllData() {
	for (datatype in data) {
		dataset = data[datatype];
		displayData(dataset);
	}
}

function filterData(dataset) {
    // console.log(dataset);
    filters = {};
    $(".filters div").each(function() {
        data_class = $(this).attr("class");
        filter_type = $(this).attr("data-filter");
        if (filter_type === "select" && $(this).children("select").val() !== "") {
            filters[data_class] = $(this).children("select").val();
            if ($(this).children("select").length === 2 && $(this).children("select").next().val() !== "") {
                filters["_state"] = $(this).children("select").next().val();
                console.log(filters["_state"]);
            }
        } else if (filter_type === "checkbox") {
            checks = [];
            $(this).children("input[type=checkbox]:checked").each(function() {
                checks.push($(this).val());
            });
            if (checks.length > 0) {
                filters[data_class] = checks;
            }
        } else if (filter_type === "boolean") {
            filters[data_class] = $(this).children("input[type=checkbox]").is(":checked");
        }
    });
    console.log(filters);
    console.log("Logging dataset");
    console.log(dataset);
    
    filtered_indices = new Set();

    for (var label in filters) {
        // Special handling for states (placeholder)
        if (label === "_state") {
            for (i = 0; i < dataset.length; i++) {
                if (typeof dataset[i][label] === 'undefined' || dataset[i]['Location'].indexOf(filters[label]) === -1) {
                    filtered_indices.add(i);
                }
            }
            continue;
        }
        // Select
        if (typeof filters[label] === "string") {
            for (i = 0; i < dataset.length; i++) {
                // Contains the substring in the filter
                if (typeof dataset[i][label] === 'undefined' || dataset[i][label].indexOf(filters[label]) === -1) {
                    filtered_indices.add(i)
                }
            }
        }
        // Checkboxes
        if (typeof filters[label] === "object") {
            for (i = 0; i < dataset.length; i++) {
                toDelete = true;
                for (var j = 0; j < filters[label].length; j++) {
                    if (typeof dataset[i][label] === 'undefined' || dataset[i][label].indexOf(filters[label][j]) !== -1) {
                        toDelete = false;
                    }
                }
                if (toDelete) {
                    filtered_indices.add(i) 
                }
            }
        }
        // Binary, only if searching specifically for something and not meeting reqs will be removed. 
        if (typeof filters[label] === "boolean") {
            for (i = 0; i < dataset.length; i++) {
                if (filters[label] && (typeof dataset[i][label] === 'undefined' || !dataset[i][label])) {
                    filtered_indices.add(i)
                }
            }
        }
    } 

    console.log(filtered_indices);
    filtered_dataset = []
    for (i = 0; i < dataset.length; i++) {
        if (!filtered_indices.has(i)) {
            filtered_dataset.push(dataset[i]);
        }
    }

    return filtered_dataset;
}

function resetFilters() {
    $('input:checkbox').prop("checked", false);
    $(".Location select").val('');
    $(".data").empty()
    displayData(data[$("select.main").val()]);
}

function resetPage() {
    console.log("Resetting page");
	$("select.main").val('');
	$(".data").empty();
	$(".filters").empty()
    displayAllData();
}