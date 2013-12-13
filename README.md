# Zephyrus Project

Le but du projet Zephyr est de proposer une application de navigation GPS entièrement basée sur les technologies web, afin qu'elle puisse être lancée depuis, presque, n'importe quel navigateur, et donc appareil.

## Principales étapes du projet

Pour que je puisse enviseager de finaliser ce projet qui me tient à coeur, je l'ai découper en étapes. Chaque étape devrait permettre de travailler sur une fonctionnalité importante. Cela devrait me permettre d'avancer progressivement et de valider ces fonctionalités de manière indépendantes.

1. **Suivre :** Suivre la position de l'appareil sur une carte, tou en ajustant l'angle d'affichage de la carte afin que les déplacements se fassent vers le haut, et le zoom afin que la visibilité des alentours et de la route soient cohérents avec la vitesse de déplacement.
2. **Chercher :** Fournir plusieurs résultats de recherche d'adresse postale, plus ou moins complète. Les résultats peuvent textuels ou visuels, et provenir de plusieurs sources identifiées.
3. **Proposer :** Fournir plusieurs routes possibles pour un départ et une destination donnée. Les résultats peuvent textuels et visuels. Les critères de choix (route à péage, chemins de terre ...) peuvent être définis à l'avance.
4. **Guider :** Une route est choisie, et les directions sont donnés à l'utilisateur, lors de ces déplacements, de manière visuel et auditive (plusieurs langues).
5. **Ajuster :** Lors d'un parcours, l'utilisateur sort de la route choisie. Le changement de direction est détecté, une nouvelle route est calculée, affichée en remplacement de l'ancienne, et le guidage de l'utilisateur, visuel et auditif, est modifié en conséquence. Cette mise à jour doit être rapide et fluide, et ne doit pas demander une action de l'utilisateur pour se réaliser.
6. **Récupérer :** Récupérer la position sélectionnée par l'utilisateur via son doight sur l'écran.

## Spéficications générales
* Recherche d'adresse postale sur plusieurs moteurs de recherche.
* Recherche de routes possibles selon plusieurs critères et moteurs.
* Affichage lors de déplacements

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

## Composants

### Calcul de routes
* Open Source Routing Machine (OSRM) - http://map.project-osrm.org/

### Affichage
* Elements displayed during navigation are:
  + Next route change: type of change (direction, speedway, roundabout ...), distance to this change and name of the street after the change.
  + Speed (if device in movment).
  + Estimated time to arrival
  + Remaining distance to arrival
  + A scale of the actual map size.
  + Position of device represented by a icon (car, arrow...) that can be customized. Not prioritory.

### Rendu de carte
* Map is displayed in 3D, with a "fog" at the top end to better map ending.
* Map moves around device position, movements based on the device direction.
* Zoom in and out based on the device speed, and distance to next route change.



