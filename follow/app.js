/*
 * Core
 */
function onFollow() {
  console.log("Follow Me !");
  geo = navigator.geolocation.watchPosition(
    successCallback,
    errorCallback, {
    maximumAge: 0,
//    timeout: 60000,
//    enableHighAccuracy: true
  });
  //~ setActualPoint(48.7542506, 2.3162982000000056);
  //~ showActualPoint(48.7542506, 2.3162982000000056);
}

/*
 * Leaflet
 */
var map;
var ajaxRequest;
var plotlist;
var plotlayers = [];

function initmap() {
  map = new OpenLayers.Map('map');
  var layer = new OpenLayers.Layer.OSM();
  map.addLayer(layer);
  var un_point = new OpenLayers.LonLat(55.447, -20.87748) // Center of the map
  un_point = un_point.transform(
    new OpenLayers.Projection("EPSG:4326"), // transform from WGS 1984
    new OpenLayers.Projection("EPSG:900913") // to Spherical Mercator Projection
  );
  var zoom=15;
  map.setCenter(un_point,zoom);
  /*// set up the map
  map = new L.Map('map');

  // create the tile layer with correct attribution
  var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  var osmAttrib = 'Map data © OpenStreetMap contributors';
  var osm = new L.TileLayer(osmUrl, {
    minZoom: 8,
    maxZoom: 18,
    attribution: osmAttrib
  });

  // start the map in South-East England
  map.setView(new L.LatLng(51.505, -0.09), 9);
  map.addLayer(osm);*/
}

function successCallback(position) {
  console.log("Success !!");
  setActualPoint(position.coords.latitude, position.coords.longitude);
}
function errorCallback(error) {
  var info = "An error occured : ";
  switch (error.code) {
    case error.TIMEOUT:
      alert(info += "Timeout !");
      break;
    case error.PERMISSION_DENIED:
      alert(info += "You were not granted permission");
      break;
    case error.POSITION_UNAVAILABLE:
      alert(info += "Could not determin your position");
      break;
    case error.UNKNOWN_ERROR:
      alert(info += "Unknown error");
      break;
  }
}

function setActualPoint(lat, lon) {
//  console.log("Max Zoom: ", map.getMaxZoom());
  map.setView(new L.LatLng(lat, lon), 17);
}

function showActualPoint(lat, lon) {
  marker = L.marker([lat, lon]).addTo(map);
  marker.bindPopup("<b>Lat: </b>" + lat + "<br><b>Lon: </b>" + lon);
}
