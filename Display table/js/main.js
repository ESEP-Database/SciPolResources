/* Global Firebase object, used for all Firebase instance calls (only one)*/
var database = firebase.database();
/* Global datatype, needs to be tracked so that the table can respond quickly to searches.*/
var datatype;
/* Data recieved from Firebase. */
var data;
/* Sorted and processed data from Firebase, meant for when displaying all records.*/
var all_data;
/* Sorted subset of the currently displayed data meant for the view-page structure.*/
var current_data;


// This function is performed asynchronously with the one below.
firebase.database().ref().once('value').then(function(snapshot) {
    data = snapshot.val()
    data = preprocess(data);
    displayAllData();
});

// Once the page is loaded, the main select has a function bound to it that runs
//  the rest of the page logic.
$(document).ready(function() {
    $("select.main").on("change", function() {
        // Clear out what's currently present.
        $(".filters").empty();
        $(".data").empty();
        if(this.value){
            // Display only one resource type and the associate filters.
            var filters_name = "filters_" + this.value;
            window[filters_name]();
            displayData(data[this.value]);
        } else {
            // Display all.
        	displayAllData();
        }
        datatype = this.value;
        // Need to track global datatype since otherwise the function below won't have
        //  access to it by scoping.
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
        so that the results can be quickly displayed in the search table, as well as to sort each
        category, so that selecting subsets of each category are automatically sorted.
      This also reverts the database structure to the category-first type.
*/
function preprocess(data) {
    str = '';
   	var processed_data = {};
    for (var key in data) {
    	item = data[key];
    	item["toString"] = toString(item, key);
        // Initialize the object if not yet existent.
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

/*    Given an element, return a short string that characterizes it in the search table.
        optional arg, datatype can be used to make the toStrings more unique.
      This function can be changed to alter the display properties of the table.
*/
function toString(element, key) {
    var website = element["Website"];
    var str = "<a href=http://science-engage.org/profile.html?id=" + key + "><div class=table-element> <span><b>";
    str = str + element["Name"] + "</b> </span> <br>";
    var info = element["About"];
    if (typeof info == "undefined") {
        // Use institution as a backup.
        var info = element["Institution"];
    }
    if (typeof info == "undefined") {
        var info = "No information available!";
    }
    str += info
    str +=  "</div> </a> <br> <hr>";
    return str;
}
/*    This function takes an array of entries and displays them in the array order that
        they are given. It will not clear the area meant for the data, nor will it display
        more than 100 elements at once.
*/
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

/*    Displays all the data available.
*/
function displayAllData() {
    displayData(all_data);
}

/*    This function does a variety of things. First, it reads the filters from the table and 
        processes them into a convenient data structure. Then, it uses that data structure to test
        the entries in the array that's passed in to check which entries are allowed to be displayed.
        Finally, it copies only the entries that are allowed to be displayed into a new array and returns them
        so that they can be displayed.
*/
function filterData(dataset) {
    filters = {};
    // Each sub-div in the filter-class div must be a filter.
    $(".filters div").each(function() {

        data_class = $(this).attr("class");
        filter_type = $(this).attr("data-filter");

        if (filter_type === "select" && $(this).children("select").val() !== "") {
            filters[data_class] = $(this).children("select").val();

            if ($(this).children("select").length === 2 && $(this).children("select").next().val() !== "") {
                // The only filter type with two selects is the Location, so the second select is the state.
                filters["_state"] = $(this).children("select").next().val();
            }
        } else if (filter_type === "checkbox") {
            checks = [];
            $(this).children("input[type=checkbox]:checked").each(function() {
                checks.push($(this).val());
            });
            // Only filter if something at all is checked.
            if (checks.length > 0) {
                filters[data_class] = checks;
            }
        } else if (filter_type === "boolean") {
            filters[data_class] = $(this).children("input[type=checkbox]").is(":checked");
        }
    });
    
    filtered_indices = new Set();

    for (var label in filters) {
        // Special handling for states (placeholder variable name)
        if (label === "_state") {
            for (i = 0; i < dataset.length; i++) {
                // As long as the name has the appropriate label within it.
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
                // Only delete if there is a checkbox that is checked (true) while the current entry is false.
                // If unchecked, don't filter, if checked and true, don't filter.
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
    // Copy results into new array
    filtered_dataset = []
    for (i = 0; i < dataset.length; i++) {
        if (!filtered_indices.has(i)) {
            filtered_dataset.push(dataset[i]);
        }
    }

    return filtered_dataset;
}

/*    Reset all the filters and display the dataset as normal again.
*/
function resetFilters() {
    $('input:checkbox').prop("checked", false);
    $(".Location select").val('');
    $(".data").empty()
    displayData(data[$("select.main").val()]);
}

/*    Reset the page to default, clearing all the results and entered filter information.
*/
function resetPage() {
	$("select.main").val('');
	$(".data").empty();
	$(".filters").empty()
    displayAllData();
}
