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

function setActualPoint(lat, lon) {
  map.setView(new L.Latlng(lat, lon), 13);
}

geo = navigator.geolocation.watchPosition(
  successCallback,
  errorCallback, {
  maximumAge: 1,
  timeout: 60000,
  enableHighAccuracy: true
});



/*
 * Geolocation
 */
function successCallback(position) {
  var lat = position.coords.latitude;
  var lon = position.coords.longitude;
  initmap(lat, lon);
}

function errorCallback(error) {
  var info = "Erreur lors de la géolocalisation : ";
  switch (error.code) {
    case error.TIMEOUT:
      alert(info += "Timeout !");
      break;
    case error.PERMISSION_DENIED:
      alert(info += "Vous n’avez pas donné la permission");
      break;
    case error.POSITION_UNAVAILABLE:
      alert(info += "La position n’a pu être déterminée");
      break;
    case error.UNKNOWN_ERROR:
      alert(info += "Erreur inconnue");
      break;
  }
}