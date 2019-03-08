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

//Step 3: Add circle markers for point features to the map
function createPropSymbols(data, map){
    //create marker options
    var geojsonMarkerOptions = {
        radius: 8,
        fillColor: "#ff7800",
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
    };

    //create a Leaflet GeoJSON layer and add it to the map
    L.geoJson(data, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, geojsonMarkerOptions);
        }
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










