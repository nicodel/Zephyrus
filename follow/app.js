/*
function onFollow() {
  console.log("Follow Me !");
  // open pop-up that show a spinner and infos ones they are retreived
  geo = navigator.geolocation.watchPosition(
    successCallback,
    errorCallback, {
    maximumAge: 0,
//    timeout: 60000,
//    enableHighAccuracy: true
  });
}
var map;

function initmap() {
  map = new OpenLayers.Map('map');
  var layer = new OpenLayers.Layer.OSM();
  map.addLayer(layer);
//  var un_point = new OpenLayers.LonLat(55.447, -20.87748) // Center of the map
  var un_point = new OpenLayers.LonLat(48.9030074, 2.0928715) // Center of the map
  un_point = un_point.transform(
    new OpenLayers.Projection("EPSG:4326"), // transform from WGS 1984
    new OpenLayers.Projection("EPSG:900913") // to Spherical Mercator Projection
  );
  var zoom=15;
  map.setCenter(un_point,zoom);
}

function successCallback(position) {
  console.log("Success !!");
  document.getElementById("accuracy").innerHTML= "Accuracy: " + position.coords.accuracy;
  document.getElementById("lat").innerHTML="Lattitude: " + position.coords.latitude;
  document.getElementById("lon").innerHTML="Longitude: " + position.coords.longitude;
  document.getElementById("speed").innerHTML="Speed: " + position.coords.speed;
  document.getElementById("time").innerHTML="Time: " + position.timestamp;
//  setActualPoint(position.coords.latitude, position.coords.longitude);
  
  var point = new OpenLayers.LonLat(48.9030074, 2.0928715);
  point = point.transform(
    new OpenLayers.Projection("EPSG:4326"), // transform from WGS 1984
    new OpenLayers.Projection("EPSG:900913") // to Spherical Mercator Projection
  );
  map.setCenter(point,15);
  map.render("map");
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
  
}*/
//////////////////////////////////////////////////////////////////////////////////////////////////////

var style = {
  fillColor: '#000',
  fillOpacity: 0.1,
  strokeWidth: 0
};

var lock = "";
OpenLayers.Renderer.symbol.church = [4, 0, 6, 0, 6, 4, 10, 4, 10, 6, 6, 6, 6, 14, 4, 14, 4, 6, 0, 6, 0, 4, 4, 4, 4, 0];
OpenLayers.Renderer.symbol.rectangle = [0, 0, 4, 0, 4, 10, 0, 10, 0, 0];
var map = new OpenLayers.Map('map');
var layer = new OpenLayers.Layer.OSM("Simple OSM Map");
var vector = new OpenLayers.Layer.Vector('vector');
map.addLayers([layer, vector]);

map.setCenter(
  new OpenLayers.LonLat(-71.147, 42.472).transform(
  new OpenLayers.Projection("EPSG:4326"),
  map.getProjectionObject()), 12);

var pulsate = function (feature) {
  var point = feature.geometry.getCentroid(),
    bounds = feature.geometry.getBounds(),
    radius = Math.abs((bounds.right - bounds.left) / 2),
    count = 0,
    grow = 'up';

  var resize = function () {
    if (count > 16) {
      clearInterval(window.resizeInterval);
    }
    var interval = radius * 0.03;
    var ratio = interval / radius;
    switch (count) {
      case 4:
      case 12:
        grow = 'down';
        break;
      case 8:
        grow = 'up';
        break;
    }
    if (grow !== 'up') {
      ratio = -Math.abs(ratio);
    }
    feature.geometry.resize(1 + ratio, point);
    vector.drawFeature(feature);
    count++;
  };
  window.resizeInterval = window.setInterval(resize, 50, point, radius);
};

var geolocate = new OpenLayers.Control.Geolocate({
  bind: false,
  geolocationOptions: {
    //    enableHighAccuracy: false,
    maximumAge: 0
    //    timeout: 7000
  }
});
map.addControl(geolocate);
var firstGeolocation = true;
geolocate.events.register("locationupdated", geolocate, function (e) {
  vector.removeAllFeatures();
  var circle = new OpenLayers.Feature.Vector(
    OpenLayers.Geometry.Polygon.createRegularPolygon(
    new OpenLayers.Geometry.Point(e.point.x, e.point.y),
    e.position.coords.accuracy / 2,
    40,
    0), {},
    style);
  vector.addFeatures([
        new OpenLayers.Feature.Vector(
      e.point, {}, {
      graphicName: 'rectangle',
      strokeColor: '#f00',
      strokeWidth: 2,
      fillOpacity: 0,
      pointRadius: 10
    }),
        circle
  ]);
  if (firstGeolocation) {
    map.zoomToExtent(vector.getDataExtent());
    pulsate(circle);
    firstGeolocation = false;
    this.bind = true;
  };
  //  console.log("e: ", e);
  document.getElementById("accuracy").innerHTML = "Accuracy: " + e.position.coords.accuracy + "m";
  document.getElementById("speed").innerHTML = "Speed: " + e.position.coords.speed + "km/h";
  document.getElementById("time").innerHTML = "Time: " + e.position.timestamp.toDateString();
});
geolocate.events.register("locationfailed", this, function () {
  OpenLayers.Console.log('Location detection failed');
  alert('Location detection failed');
});
//document.getElementById('locate').onclick = function() {

function onFollow() {
  lock = window.navigator.requestWakeLock('screen');
  vector.removeAllFeatures();
  geolocate.deactivate();
  //    document.getElementById('track').checked = false;
  geolocate.watch = true;
  firstGeolocation = true;
  geolocate.activate();
};
//document.getElementById('track').onclick = function() {
//    vector.removeAllFeatures();
//    geolocate.deactivate();
//    if (this.checked) {
//        geolocate.watch = true;
//        firstGeolocation = true;
//        geolocate.activate();
//    }
//};
//document.getElementById('track').checked = false;

window.addEventListener('unload', function () {
  lock.unlock();
});