//define AJAX function
function jQueryAjax(){
    //basic jQuery ajax method
    $.ajax("../data/MegaCities_min.geojson", {
        dataType: "json",
        success: callback
    });
};

//define callback function
function callback(response, status, jqXHRobject){
    //tasks using the data go here
    console.log(response);
};

$(document).ready(jQueryAjax);

//optional jQuery AJAX alias methods:

////jQuery.get() method...Example 2.5 line 3
//$.get("../data/MegaCities_min.geojson", callback, "json");
//
////jQuery.getJSON() method...Example 2.5 line 3
//$.getJSON("../data/MegaCities_min.geojson", callback);
