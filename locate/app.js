/*
 * Core
 */


/*
 * Leaflet
 */
var map;
var ajaxRequest;
var plotlist;
var plotlayers = [];

function initmap() {
  // set up the map
  map = new L.Map('map');

  // create the tile layer with correct attribution
  var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  var osmAttrib = 'Map data © OpenStreetMap contributors';
  var osm = new L.TileLayer(osmUrl, {
    minZoom: 8,
    maxZoom: 12,
    attribution: osmAttrib
  });

  // start the map in South-East England
  map.setView(new L.LatLng(51.505, -0.09), 9);
  map.addLayer(osm);
}

var popup = L.popup();

//function onMapClick(e) {
//  console.log("clicked: ", e.latlng.toString());
//  popup
//    .setLatLng(e.latlng)
//    .setContent("You clicked the map at " + e.latlng.toString())
//    .openOn(map);
//}
map.on('click', onMapClick);