/* Lab 1 Main JavaScript */
//* 1. Create the Leaflet map--done (in createMap())
//--Setting up map and setting default extent/zoom
//--Function to create an instance of a Leaflet map on page
function createMap(){
    //create the map
    var map = L.map('map', {
        center: [32, -80],
        zoom: 4.2
    });

//--Bringing in Mapbox basemap */
L.tileLayer('https://api.mapbox.com/styles/v1/alexmachinmayes/cjgdcy799000d2roxfcdjrf1x/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYWxleG1hY2hpbm1heWVzIiwiYSI6ImNqNzcyaW1pdDE2dmcydnNiMXBpYnJkZTcifQ.13fGvINhS3AwegzScvXLAw', {
    }).addTo(map);

//* 2. Import GeoJSON data--done (in getData())(part 1 of 2)
//--Calls our getData function below that grabs our data and displays it on the map
    getData(map);
};
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX


//function to convert markers to circle markers
function pointToLayer(feature, latlng){
    //Determine which attribute to visualize with proportional symbols
    var attribute = "Pop_2015";

    //create marker options
    var options = {
        fillColor: "#ff7800",
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
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
    
    //For each feature, determine its value for the selected attribute
    var attValue = Number(feature.properties[attribute]);

    //Give each feature's circle marker a radius based on its attribute value
    options.radius = calcPropRadius(attValue);

    //create circle marker layer
    var layer = L.circleMarker(latlng, options);

    //build popup content string
    var popupContent = "<p><b>City:</b> " + feature.properties.City + "</p><p><b>" + attribute + ":</b> " + feature.properties[attribute] + "</p>";

    //bind the popup to the circle marker
    layer.bindPopup(popupContent);

    //return the circle marker to the L.geoJson pointToLayer option
    return layer;
};

//Add circle markers for point features to the map
function createPropSymbols(data, map){
    //create a Leaflet GeoJSON layer and add it to the map
    L.geoJson(data, {
        pointToLayer: pointToLayer
    }).addTo(map);
};



//Step 2: Import GeoJSON data
function getData(map){
    //load the data
    $.ajax("data/geoJSON/MegaCities_min.geojson", {
        dataType: "json",
        success: function(response){
            //call function to create proportional symbols
            createPropSymbols(response, map);

        }
    });
};
$(document).ready(createMap);










