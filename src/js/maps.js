'use strict';

import L from 'leaflet';

import 'leaflet/dist/leaflet.css';
import { GeocodingControl } from '@maptiler/geocoding-control/leaflet';
import '@maptiler/geocoding-control/style.css';

const map = L.map('map', {
    center: L.latLng(63.402326, 13.078144),
    zoom: 14,
});

const key = 'ywKVXMnPP04HAr2z7kvP';

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

L.control.maptilerGeocoding({ apiKey: key }).addTo(map);
