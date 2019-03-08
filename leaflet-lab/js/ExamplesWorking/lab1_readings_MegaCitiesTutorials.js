/* Map of GeoJSON data from MegaCities.geojson */

//--Setting map and setting default extent/zoom
//function to instantiate the Leaflet map
function createMap(){
    //create the map
    var map = L.map('map', {
        center: [32, -80],
        zoom: 4.2
    });

////-- Bringing in Mapbox/OSM */
//L.tileLayer('https://api.mapbox.com/styles/v1/alexmachinmayes/cjgdcy799000d2roxfcdjrf1x/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYWxleG1hY2hpbm1heWVzIiwiYSI6ImNqNzcyaW1pdDE2dmcydnNiMXBpYnJkZTcifQ.13fGvINhS3AwegzScvXLAw', {
//    }).addTo(map);
//   
    
//--To add OSM base tilelayer instead of Mapbox custom   
L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>'
    }).addTo(map);

    
//call getData function (finishes L.tileLayer for Mapbox OR OSM above)
    getData(map);
};



//  //Example 2.4: applying pointToLayer to AJAX data 
//            //...load the data
//    $.ajax("../data/MegaCities_min.geojson", {
//        dataType: "json",
//        success: function(response){
//            //create marker options
//            var geojsonMarkerOptions = {
//                radius: 8,
//                fillColor: "#ff7800",
//                color: "#000",
//                weight: 1,
//                opacity: 1,
//                fillOpacity: 0.8
//            };
//
//            //create a Leaflet GeoJSON layer and add it to the map
//            L.geoJson(response, {
//                pointToLayer: function (feature, latlng){
//                    return L.circleMarker(latlng, geojsonMarkerOptions);
//                }
//            }).addTo(map);
//        }
//    });



//  // Example 2.5: applying onEachFeature to AJAX data
       //added at Example 2.3 line 20...function to attach popups to each mapped feature
    function onEachFeature(feature, layer) {
        //no property named popupContent; instead, create html string with all properties
        var popupContent = "";
        if (feature.properties) {
            //loop to add feature property names and values to html string
            for (var property in feature.properties){
                popupContent += "<p>" + property + ": " + feature.properties[property] + "</p>";
            }
            layer.bindPopup(popupContent);
        };
    };

// used for all examples - function to retrieve the data and place it on the map
    function getData(map){
        //load the data
        $.ajax("../data/DecliningCities_min.geojson", {
            dataType: "json",
            success: function(response){

//      //create a Leaflet GeoJSON layer and add it to the map
//            L.geoJson(response, {
//                onEachFeature: onEachFeature
//            }).addTo(map);
//    
       
                
            
    //4 Example 2.6: applying filter to AJAX data
               //create a Leaflet GeoJSON layer and add it to the map
//            L.geoJson(response, {
//             //use filter function to only show cities with 2015 populations greater than 20 million
//                filter: function(feature, layer) {
//                    return feature.properties.Pop_2015 > 20;
//                }
//            }).addTo(map);    
//            
            
            
            
//    //5 Example 2.7: adding feature markers to a marker cluster group 
//              //examine the data in the console to figure out how to construct the loop
//            console.log(response)
//
//            //create an L.markerClusterGroup layer
//            var markers = L.markerClusterGroup();
//
//            //loop through features to create markers and add to MarkerClusterGroup
//            for (var i = 0; i < response.features.length; i++) {
//                var a = response.features[i];
//            //add properties html string to each marker
//                var properties = "";
//                for (var property in a.properties){
//                    properties += "<p>" + property + ": " + a.properties[property] + "</p>";
//                };
//                var marker = L.marker(new L.LatLng(a.geometry.coordinates[1], a.geometry.coordinates[0]), { properties: properties });
//            //add a popup for each marker
//                marker.bindPopup(properties);
//            //add marker to MarkerClusterGroup
//                markers.addLayer(marker);
//            }
//
//            //add MarkerClusterGroup to map
//            map.addLayer(markers);
      
            
            
            
//    6 Example 2.8: simplified marker clustering from a geojson layer (I re-added popups with onEachFeature) 
            //create a Leaflet GeoJSON layer
            var geoJsonLayer = L.geoJson(response, {
                onEachFeature: onEachFeature
            });
            
            //create a L.markerClusterGroup layer
            var markers = L.markerClusterGroup();
            
            //add geojson to marker cluster layer
            markers.addLayer(geoJsonLayer);
            
            //add marker cluster layer to map
            map.addLayer(markers);


            
            
        }
        
    }); 
};
$(document).ready(createMap);










