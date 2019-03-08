//--Example from Leaflet Quick Start Guide*/

//--Setting map default extent*/
var map = L.map('map').setView([0.0, -0.0], 2);

//--add tile layer...replace project id and accessToken with your own

//-- Bringing in Mapbox/OSM */
L.tileLayer('https://api.mapbox.com/styles/v1/alexmachinmayes/cjgdcy799000d2roxfcdjrf1x/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYWxleG1hY2hpbm1heWVzIiwiYSI6ImNqNzcyaW1pdDE2dmcydnNiMXBpYnJkZTcifQ.13fGvINhS3AwegzScvXLAw', {
}).addTo(map);



//-- Adding features (Leaflet Quick Start Guide) */
var marker = L.marker([51.5, -0.09]).addTo(map);

var circle = L.circle([51.508, -0.11], 500, {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5
}).addTo(map);

var polygon = L.polygon([
    [51.509, -0.08],
    [51.503, -0.06],
    [51.51, -0.047]
]).addTo(map);


var myLines = [{
    "type": "LineString",
    "coordinates": [[-100, 40], [-105, 45], [-110, 55]]
}, {
    "type": "LineString",
    "coordinates": [[-105, 40], [-110, 45], [-115, 55]]
}];
L.geoJSON(myLines).addTo(map);

var CoorsField = {
    "type": "Feature",
    "properties": {
        "name": "Coors Field",
        "amenity": "Baseball Stadium",
        "popupContent": "This is where the Rockies play!"
    },
    "geometry": {
        "type": "Point",
        "coordinates": [-104.99404, 39.75621]
    }
};
L.geoJSON(CoorsField).addTo(map);



//-- Blanket line feature styling (Leaflet example)*/
var myStyle = {
    "color": "#ff7800",
    "weight": 5,
    "opacity": 0.65
};



//-- Specific feature styling of red/blue polygons (Leaflet example)
var states = [{
    "type": "Feature",
    "properties": {"party": "Republican"},
    "geometry": {
        "type": "Polygon",
        "coordinates": [[
            [-104.05, 48.99],
            [-97.22,  48.98],
            [-96.58,  45.94],
            [-104.03, 45.94],
            [-104.05, 48.99]
        ]]
    }
}, {
    "type": "Feature",
    "properties": {"party": "Democrat"},
    "geometry": {
        "type": "Polygon",
        "coordinates": [[
            [-109.05, 41.00],
            [-102.06, 40.99],
            [-102.03, 36.99],
            [-109.04, 36.99],
            [-109.05, 41.00]
        ]]
    }
}];


//-- Add features to map command 1 (Leaflet example)*/

L.geoJSON(myLines, {
    style: myStyle
}).addTo(map);

//-- Add features to map command 2 (Leaflet example)*/

L.geoJSON(states, {
    style: function(feature) {
        switch (feature.properties.party) {
            case 'Republican': return {color: "#ff0000"};
            case 'Democrat':   return {color: "#0000ff"};
        }
    }
}).addTo(map);



//-- pointToLayer function (Leaflet example) - seems to override popup functions below
//
//var geojsonMarkerOptions = {
//    radius: 8,
//    fillColor: "#ff7800",
//    color: "#000",
//    weight: 1,
//    opacity: 1,
//    fillOpacity: 0.8
//};
//
//L.geoJSON(someGeojsonFeature, {
//    pointToLayer: function (feature, latlng) {
//        return L.circleMarker(latlng, geojsonMarkerOptions);
//    }
//}).addTo(map);



//-- popups and event listeners (Leaflet examples from Quick Start Guide)

marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
circle.bindPopup("I am a circle.");
polygon.bindPopup("I am a polygon.");

var popup = L.popup()
    .setLatLng([51.5, -0.09])
    .setContent("I am a standalone popup.")
    .openOn(map);

var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);
}

map.on('click', onMapClick);


//-- onEachFeature (Leaflet) - Coors stadium popup
function onEachFeature(feature, layer) {
    // does this feature have a property named popupContent?
    if (feature.properties && feature.properties.popupContent) {
        layer.bindPopup(feature.properties.popupContent);
    }
}

var geojsonFeature = {
    "type": "Feature",
    "properties": {
        "name": "Coors Field",
        "amenity": "Baseball Stadium",
        "popupContent": "This is where the Rockies play!"
    },
    "geometry": {
        "type": "Point",
        "coordinates": [-104.99404, 39.75621]
    }
};

L.geoJSON(geojsonFeature, {
    onEachFeature: onEachFeature
}).addTo(map);


//-- Filter (Leaflet example) - add or remove Busch stadium but disables popup for Coors field "this is where the rockies play"
//var someFeatures = [{
//    "type": "Feature",
//    "properties": {
//        "name": "Coors Field",
//        "show_on_map": true
//    },
//    "geometry": {
//        "type": "Point",
//        "coordinates": [-104.99404, 39.75621]
//    }
//}, {
//    "type": "Feature",
//    "properties": {
//        "name": "Busch Field",
//        "show_on_map": false
//    },
//    "geometry": {
//        "type": "Point",
//        "coordinates": [-104.98404, 40.74621]
//    }
//}];
//
//L.geoJSON(someFeatures, {
//    filter: function(feature, layer) {
//        return feature.properties.show_on_map;
//    }
//}).addTo(map);



