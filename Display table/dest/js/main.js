var provider = new firebase.auth.GoogleAuthProvider();

var database = firebase.database();
var data;
firebase.database().ref().once('value').then(function(snapshot) {
	data = snapshot.val()
	data = preprocess(data);
});


$(document).ready(function() {
	$("select.main").on("change", function() {
		$(".filters").empty();
		$(".data").empty();
		if(this.value){
			var filters_name = "filters_" + this.value;
			window[filters_name]();
			displayData(data[this.value]);
		}
		datatype = this.value;
		$(".filters div").each(function() {
			$(this).children(":input").change(function() {
				dataset = Object.assign(true, {}, data[datatype]);
				dataset = filterData(dataset);
				$(".data").empty();
				displayData(dataset);
			});
		});
		
	});
});

/*	This function's primary role is to append toString elements to each item in the dataset
		so that the results can be quickly displayed in the search table
*/
function preprocess(data) {
	// syllabi, degree programs, etc
	str = '';
	for (var datatype in data) {
		// Individual entries
		dataset = data[datatype];
		for (var element in dataset) {
			dataset[element]["toString"] = toString(dataset[element], datatype);
		}
	}
	return data
}

/*	Given an element, give a short string that characterizes it in the search table.
		optional arg, datatype can be used to make the toStrings more unique.
*/
function toString(element, datatype) {
	str = "<b>"
	str = str + element["Name"] + "</b> <br>"
	str += element["About"]
	str += "<br> <hr>"
	return str
}

function displayData(dataset) {
	for (var element in dataset) {
		$(".data").append(dataset[element]["toString"]);
	}
}

function filterData(dataset) {
	filters = {};
	$(".filters div").each(function() {
		data_class = $(this).attr("class");
		filter_type = $(this).attr("data-filter");
		if (filter_type === "select") {
			filters[data_class] = $(this).children("select").val();
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

	console.log(dataset);

	for (var label in filters) {
		// Select
		if (typeof filters[label] === "string") {
			for (var element in dataset) {
				if (dataset[element][label] !== filters[label]) {
					delete dataset[element];
				}
			}
		}
		// Checkboxes
		if (typeof filters[label] === "object") {
			for (var element in dataset) {
				if (!filters[label].includes(dataset[element][label])) {
					delete dataset[element];
				}
			}
		}
		// Binary, only if searching specifically for something and not meeting reqs will be removed. 
		if (typeof filters[label] === "boolean") {
			for (var element in dataset) {
				if (filters[label] && !dataset[element][label]) {
					delete dataset[element];
				}
			}
		}
	}

	console.log(dataset);

	return dataset;
}