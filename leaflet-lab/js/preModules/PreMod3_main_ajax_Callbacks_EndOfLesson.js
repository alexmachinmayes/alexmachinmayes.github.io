////a simple counting function
//function countToThree(){
//    var count = 0;
//    while (count < 3){
//        count++;
//    };
//    return count;
//};
//
//var mydata = countToThree();
//
//console.log(mydata); 




////define AJAX function
//function jQueryAjax(){
//    //basic jQuery ajax method
//    $.ajax("../data/MegaCities_min.geojson", {
//        dataType: "json",
//        success: callback
//    });
//};
//
////define callback function
//function callback(response){
//
//    //TASKS USING THE DATA GO HERE
//    console.log(response);
//
//};
//
//$(document).ready(jQueryAjax);




function jQueryAjax(){
    //define a variable to hold the data
    var mydata;

    //basic jQuery ajax method
    $.ajax("../data/MegaCities_min.geojson", {
        dataType: "json",
        success: function(response){
            mydata = response;
            
            //check the data
            console.log(mydata);
        }
    });

    //check the data
    console.log(mydata);
};

$(document).ready(jQueryAjax);