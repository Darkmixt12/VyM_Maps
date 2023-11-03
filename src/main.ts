import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
 
mapboxgl.accessToken = 'pk.eyJ1IjoidmljaW91c2xpZXMiLCJhIjoiY2xudGNwbnozMDI3MjJzbnhmMXphMzNoYyJ9.SWblGwAuYVwjF58YD0ARSA';

if ( !navigator.geolocation) {
  alert('Navegador no soporta la Geolocation')
  throw new Error('Navegador no siporta la Geolocation')
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
