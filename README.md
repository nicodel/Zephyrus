# Zephyrus Project

The Zephyrus Project aims to be a GPS Navigation system running on the web. It would run, online or offline, inside a browser. It has to be written using the web languages (HTML, CSS and Javascript).

## Features
* Textual address search.
* Display possible result based on words entered in search field.
* Display the selected result area on map for a more precise location.
* Display the actual position on map.
* Display the address of the actual position.
* Choice of routing calculation parameters (shortest path, quickest path, only free roads...).
* Routing calculation from the actual position to the choosen destination.
* Display the overall calculated route on map.
* If exists, display possible alternatives to primary route.
* Display map and route, as a first person point of view, at the actual position.
* Display the next route change and the remaining distance to it.
* Alert for special event on the way (speed camera ...).
* Select PIO types that would be displayed along the way.
* Possibility to display on map the selected PIO nearby.
* Display the overall remaining time and distance.

## Components

### Routing calculation
* Open Source Routing Machine (OSRM) - http://map.project-osrm.org/
* 
### Display
* Elements displayed during navigation are:
+ Next route change: type of change (direction, speedway, roundabout ...), distance to this change and name of the street after the change.
+ Speed (if device in movment).
+ Estimated time to arrival
+ Remaining distance to arrival
+ A scale of the actual map size.
+ Position of device represented by a icon (car, arrow...) that can be customized. Not prioritory.

### Map rendering
* Map is displayed in 3D, with a "fog" at the top end to better map ending.
* Map moves around device position, movements based on the device direction.
* Zoom in and out based on the device speed.

## Project steps

1. **Locate:** Locate device and show its position on a map.
2. **Follow:** Follow device movements and show it on a map.
3. **Search:** Search for an address an show the result on a map.
4. **Retreive:** Retreive position pointed by the user finger on the map.
5. **Calculate:** Calculate route between 2 given points and display the result on a map.
6. **...:** to be defined