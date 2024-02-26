'use strict';

/* Importera leaflet-komponenter */
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon from '../images/marker-icon.png';
/* Skapa markern */
const marker = L.icon({
    iconUrl: markerIcon,
    iconAnchor: [13, 40],
});
/* Position null så att man kan ta bort gamla markern */
let position = null;

/* Skapa kartan (Baspunkt Åre) */
const map = L.map('map', {
    center: L.latLng(63.402326, 13.078144),
    zoom: 14,
});
/* API-nyckel till Maptiler */
const key = 'ywKVXMnPP04HAr2z7kvP';

/* Tiles från maptiler */
L.tileLayer(
    `https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=${key}`,
    {
        //style URL
        tileSize: 512,
        zoomOffset: -1,
        minZoom: 1,
        attribution:
            '\u003ca href="https://www.maptiler.com/copyright/" target="_blank"\u003e\u0026copy; MapTiler\u003c/a\u003e \u003ca href="https://www.openstreetmap.org/copyright" target="_blank"\u003e\u0026copy; OpenStreetMap contributors\u003c/a\u003e',
        crossOrigin: true,
    }
).addTo(map);

/* Sökfunktion */
const searchField = document.getElementById('search');
const searchButton = document.querySelector('div.search button');
const searchResults = document.querySelector('div.searchresults ul');

searchButton.addEventListener('click', searchLocation);
searchField.addEventListener('keyup', (e) => {
    // Om man trycker enter
    if (e.key === 'Enter') {
        searchLocation();
    }
});

/* Funktion som gör fetchanrop till nominatim API */
async function searchLocation() {
    const searchString = searchField.value;
    const apiURL =
        'https://nominatim.openstreetmap.org/search?format=json&q=' +
        encodeURIComponent(searchString);
    try {
        const response = await fetch(apiURL);
        const data = await response.json();
        //Skicka resultaten vidare
        displayResults(data);
    } catch (error) {
        console.error('Fel: ' + error);
        searchResults.innerHTML = 'Något verkar ha gått fel';
    }
}

/* Funktion som skriver ut sökresultat på skärmen */
function displayResults(data) {
    searchResults.innerHTML = '';
    /* kontroll om sökning lyckades */
    if (data.length > 0) {
        // forEach som skapar nytt li-element för varje resultat
        data.forEach((result) => {
            const listItem = document.createElement('li');
            //lägg till longitud och latitud som dataset så man kan komma åt från annan funktion
            listItem.setAttribute('data-lat', result.lat);
            listItem.setAttribute('data-long', result.lon);
            const textResult = document.createTextNode(result.display_name);
            //peta in i list items och in i lista
            listItem.appendChild(textResult);
            searchResults.appendChild(listItem);

            //event listener på varje, som hämtar ut lat/long från datasets och skickar med till nästa funktion
            listItem.addEventListener('click', (e) => {
                const lat = e.target.dataset.lat;
                const long = e.target.dataset.long;

                moveMap(lat, long);
            });
        });
    } else {
        searchResults.innerHTML = 'Inga resultat matchade din sökning...';
    }
}

/* Funktion som flyttar karta och markering */
function moveMap(lat, long) {
    if (position !== null) {
        map.removeLayer(position);
    }
    map.removeLayer(marker);
    map.flyTo(L.latLng(lat, long));
    position = L.marker([lat, long], { icon: marker }).addTo(map);
}
