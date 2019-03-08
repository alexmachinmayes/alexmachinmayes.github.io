//* Lab 1 Main JavaScript */
//* 1. Create the Leaflet map--done in createMap()
//--Setting up map and setting default extent/zoom
//--Function to create an instance of a Leaflet map on page
function createMap(){
    //create the map
    var map = L.map('map', {
        center: [0, 20],
        zoom: 1
    });

//--Bringing in Mapbox basemap */
L.tileLayer('https://api.mapbox.com/styles/v1/alexmachinmayes/cjgdcy799000d2roxfcdjrf1x/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYWxleG1hY2hpbm1heWVzIiwiYSI6ImNqNzcyaW1pdDE2dmcydnNiMXBpYnJkZTcifQ.13fGvINhS3AwegzScvXLAw', {
    }).addTo(map);

//* 2. Import GeoJSON data--done (in getData())(part 1 of 2)
//--Calls our getData function below that grabs our data and displays it on the map
    getData(map);
};
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  
//Step 2: Import GeoJSON data
function getData(map){
    $.ajax("data/geoJSON/MegaCities_min.geojson", {
        dataType: "json",
        success: function(response){
            //create an attributes array
            var attributes = processData(response);

            //call functions to display
            createPropSymbols(response, map, attributes);
            createSequenceControls(map, attributes);

        }
    });
};



//calculate the radius of each proportional symbol
function calcPropRadius(attValue) {
    //scale factor to adjust symbol size evenly
    var scaleFactor = 50;
    //area based on attribute value and scale factor
    var area = attValue * scaleFactor;
    //radius calculated based on area
    var radius = Math.sqrt(area/Math.PI);

    return radius;
};
//function to convert markers to circle markers
function pointToLayer(feature, latlng, attributes){
    //Step 4: Assign the current attribute based on the first index of the attributes array
    var attribute = attributes[0];
    //check
    console.log(attribute);


    //create marker options
    var options = {
        fillColor: "#ff7800",
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
    };


    
    //For each feature, determine its value for the selected attribute
    var attValue = Number(feature.properties[attribute]);

    //Give each feature's circle marker a radius based on its attribute value
    options.radius = calcPropRadius(attValue);

    //create circle marker layer
    var layer = L.circleMarker(latlng, options);

    
////Problematic panel content - always 1985?
//    //build popup content string
//    var panelContent = "<p><b>City:</b> " + feature.properties.City + "</p>";

//    //add formatted attribute to popup content string
//    var year = attribute.split("_")[1];
//    panelContent += "<p><b>Population in " + year + ":</b> " + feature.properties[attribute] + " people</p>";

    //popup content is now just the city name
    var popupContent = feature.properties.City;

    layer.bindPopup(popupContent, {
        offset: new L.Point(0,-options.radius),
        closeButton: false
    });


    //event listeners to open popup on hover
    layer.on({
        mouseover: function(){
            this.openPopup();
        },
        mouseout: function(){
            this.closePopup();
        },
        click: function(){
            $("#panel").html(panelContent);
        }

    });

    //return the circle marker to the L.geoJson pointToLayer option
    return layer;
};


//Add circle markers for point features to the map
function createPropSymbols(data, map, attributes){
    //create a Leaflet GeoJSON layer and add it to the map
    L.geoJson(data, {
        pointToLayer: function(feature, latlng){
            return pointToLayer(feature, latlng, attributes);
        }
    }).addTo(map);
};


//Create new sequence controls
function createSequenceControls(map, attributes){

  $('#panel').append('<input class="range-slider" type="range">');

    //set slider attributes
    $('.range-slider').attr({
        max: 6,
        min: 0,
        value: 0,
        step: 1
    });
    //add skip buttons
    $('#panel').append('<button class="skip" id="reverse">Reverse</button>');
    $('#panel').append('<button class="skip" id="forward">Skip</button>');
//replace button content with images
    $('#reverse').html('<img src="img/reverse.png">');
    $('#forward').html('<img src="img/forward.png">');
    
    $('.skip').click(function(){
        var index = $('.range-slider').val();
        //Step 6: increment or decrement depending on button clicked
        if ($(this).attr('id') == 'forward'){
            index++;
            //Step 7: if past the last attribute, wrap around to first attribute
            index = index > 6 ? 0 : index;
        } else if ($(this).attr('id') == 'reverse'){
            index--;
            //Step 7: if past the first attribute, wrap around to last attribute
            index = index < 0 ? 6 : index;
        };
        $('.range-slider').val(index);
        updatePropSymbols(map, attributes[index]);
        });
    
    //Step 5: input listener for slider
    $('.range-slider').on('input', function(){
    //Step 6: get the new index value
        var index = $(this).val();
        updatePropSymbols(map, attributes[index]);
        });

};


//Build an attributes array from the data
function processData(data){
    //empty array to hold attributes
    var attributes = [];

    //properties of the first feature in the dataset
    var properties = data.features[0].properties;

    //push each attribute name into attributes array
    for (var attribute in properties){
        //only take attributes with population values
        if (attribute.indexOf("Pop") > -1){
            attributes.push(attribute);
        };
    };

    //check result
    console.log(attributes);

    return attributes;
};



//Step 10: Resize proportional symbols according to new attribute values
function updatePropSymbols(map, attribute){
    map.eachLayer(function(layer){
       //Example 3.16 line 4
        if (layer.feature && layer.feature.properties[attribute]){
            //access feature properties
            var props = layer.feature.properties;

            //update each feature's radius based on new attribute values
            var radius = calcPropRadius(props[attribute]);
            layer.setRadius(radius);

            //add city to popup content string
            var popupContent = "<p><b>City:</b> " + props.City + "</p>";

            //add formatted attribute to panel content string
            var year = attribute.split("_")[1];
            popupContent += "<p><b>Population in " + year + ":</b> " + props[attribute] + " million</p>";

            //replace the layer popup
            layer.bindPopup(popupContent, {
                offset: new L.Point(0,-radius)
            });
        };
    });
};


$(document).ready(createMap);










