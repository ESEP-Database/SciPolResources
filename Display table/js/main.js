var provider = new firebase.auth.GoogleAuthProvider();

var database = firebase.database();
var datatype;
var data;

firebase.database().ref().once('value').then(function(snapshot) {
    data = snapshot.val()
    data = preprocess(data);
    displayAllData();
});

$(document).ready(function() {
    $("select.main").on("change", function() {
        $(".filters").empty();
        $(".data").empty();
        if(this.value){
            var filters_name = "filters_" + this.value;
            window[filters_name]();
            displayData(data[this.value]);
        } else {
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
var all_data;
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
    sorted_data = {};
    all_data = []
    for (var type in processed_data) {
        data_array = Object.keys(processed_data[type]).map(function (key) { return processed_data[type][key]; });
        all_data = all_data.concat(data_array);
        data_array.sort(function (a, b) {
            return a['Name'] > b['Name']? 1: -1;
        });
        sorted_data[type] = data_array;
    }
    all_data.sort(function (a, b) {
        return a['Name'] > b['Name']? 1: -1;
    });
    return sorted_data;
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
    return str;
}

var current_data;
function displayData(dataset) {
    current_data = dataset;
    if (current_data.length > 100) {
        for (i = 0; i < 100; i++) {
            $(".data").append(current_data[i]["toString"]);
        }
        $(".pages").empty();
        $(".pages").append("View page: ");
        num_pages = Math.ceil(current_data.length / 100);
        for (n = 0; n < num_pages; n++) {
            $(".pages").append("<span id="+n.toString()+"><a><u>" + (n+1).toString() + "</u></a></span>")
            if (n !== num_pages - 1) {
                $(".pages").append(", ");
            }
            $("span#"+n.toString()).click(function() {
                $(".data").empty();
                i = parseInt($(this).attr('id')) * 100
                num = 0
                while (num < 100 && i < current_data.length) {
                    $(".data").append(current_data[i]["toString"]);
                    i++;
                    num++;
                }
            });
        }
    } else {
        $(".pages").empty();
        for (i = 0; i < current_data.length; i++) {
            $(".data").append(current_data[i]["toString"]);
        }
    }
    $(".count u").html(current_data.length);
}

function displayAllData() {
    displayData(all_data);
}

function filterData(dataset) {
    filters = {};
    $(".filters div").each(function() {
        data_class = $(this).attr("class");
        filter_type = $(this).attr("data-filter");
        if (filter_type === "select" && $(this).children("select").val() !== "") {
            filters[data_class] = $(this).children("select").val();
            if ($(this).children("select").length === 2 && $(this).children("select").next().val() !== "") {
                filters["_state"] = $(this).children("select").next().val();
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
	$("select.main").val('');
	$(".data").empty();
	$(".filters").empty()
    displayAllData();
}
