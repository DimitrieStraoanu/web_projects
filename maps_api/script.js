'use strict';

window.addEventListener('DOMContentLoaded', function () {
    document.getElementById('findBtn').addEventListener('click', start);
    initMap();
});
var placeQuery;
var place;
var map;
var options;
var marker;

function start() {
    placeQuery = document.getElementById('queryInput').value;
    if (placeQuery) {
        findPlace();
    }
}

function initMap() {
    options = {
        center: {
            lat: 45,
            lng: 25
        },
        zoom: 5
    };
    map = new google.maps.Map(document.getElementById('map'), options);
}

function addMarker() {
    if (marker)
        marker.setMap(null);
    marker = new google.maps.Marker({
        position: place.geometry.location,
        map: map
    });
}

function findPlace() {
    var request = {
        query: placeQuery,
        fields: ['name', 'formatted_address', 'geometry', 'type']
    };
    var service = new google.maps.places.PlacesService(map);
    service.findPlaceFromQuery(request, function (results, status) {
        if (status === 'OK') {
            place = results[0];
            map.setCenter(place.geometry.location);
            if (place.types.includes('route') || place.types.includes('point_of_interest')) {
                map.setZoom(15);
            } else if (place.types.includes('locality')) {
                map.setZoom(10);
            } else if (place.types.includes('country')) {
                map.setZoom(5);
            }
            addMarker();
            console.log(results);
            console.log(place.name);
            console.log(place.formatted_address);
            console.log(place.geometry.location.lat());
            console.log(place.geometry.location.lng());
        } else {
            console.log(status);
        }
    });
}