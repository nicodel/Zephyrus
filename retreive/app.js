/*
 * Core
 */
function onLocate() {
  console.log("Locate Me !");
//  geo = navigator.geolocation.watchPosition(
//    successCallback,
//    errorCallback, {
//    maximumAge: 1,
//    timeout: 60000,
//    enableHighAccuracy: true
//  });
  setActualPoint(48.7542506, 2.3162982000000056);
  showActualPoint(48.7542506, 2.3162982000000056);
}

/*
 * Leaflet
 */
var map;
var ajaxRequest;
var plotlist;
var plotlayers = [];

var positionIcon = L.icon({
    iconUrl: 'my-icon.png',
    iconRetinaUrl: 'my-icon@2x.png',
    iconSize: [38, 95],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
    shadowUrl: 'my-icon-shadow.png',
    shadowRetinaUrl: 'my-icon-shadow@2x.png',
    shadowSize: [68, 95],
    shadowAnchor: [22, 94]
});

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

function setActualPoint(lat, lon) {
  map.setView(new L.LatLng(lat, lon), 17);
}
function showActualPoint(lat, lon) {
  marker = L.marker([lat, lon]).addTo(map);
  marker.bindPopup("<b>Lat: </b>"+ lat +"<br><b>Lon: </b>"+ lon);
}


/*
 * Geolocation
 */
function successCallback(position) {
  var lat = position.coords.latitude;
  var lon = position.coords.longitude;
  setActualPoint(lat, lon);
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