import { LocationService } from './../../services/locations.service';
import {Component,OnInit,inject,AfterViewInit,ViewChild, ElementRef, Input} from '@angular/core';
import { MapService, PlacesService } from '../../services';
import { Map, Popup, Marker, LngLat, LngLatBounds } from 'mapbox-gl';
import * as mapboxgl from 'mapbox-gl';
import { Places } from 'src/app/home/interfaces/Locations';
import { LocationsResponse } from '../../interfaces/locationsResponse';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css'],
})
export class MapViewComponent implements OnInit, AfterViewInit {
  private _placesService = inject(PlacesService);
  private _mapService = inject(MapService);
  private locationService = inject(LocationService);

  private markers: Marker[] = [];
  public map?: Map;
  public hidePlaces: Boolean = false;
  public places: Places[] = [];
  public locationsList: LocationsResponse[] = [];

  @ViewChild('mapDiv')
  mapDivElement!: ElementRef;
  
  @Input() item?: LocationsResponse

  ngOnInit() {
    this.getListLocations();
  }

  ngAfterViewInit(): void {
    if (!this._placesService.userLocation)
      throw new Error('No hay placesService.userLocation');

    this.map = new Map({
      container: this.mapDivElement.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this._placesService.userLocation, // starting position [lng, lat]
      zoom: 8, // starting zoom
    });

    const popup = new Popup().setHTML(`
          <h3>Aqui estoy</h3>
          <p>Estoy en este lugar del Mundo</p>
        `);

    new Marker({ color: 'red' })
      .setLngLat(this._placesService.userLocation)
      .setPopup(popup)
      .addTo(this.map);

    this._mapService.setMap(this.map);
  }

  toogleLocations() {
    this.hidePlaces = !this.hidePlaces;
  }

  markersByProv(provincias?: string, color?: string) {
    if (!this.map) return;

    const newMarkers: any[] = [];
    this.places = [];
    this.locationsList.forEach((locationsList) => {

      const popup = new Popup().setHTML(`
      <h3>${locationsList.provincia}</h3>
      <p>${locationsList.title}</p>
    `);

      if (locationsList.provincia === provincias) {
        const [lng, lat] = locationsList.lngLat;

        const newMarker = new Marker({
          color: color,
          draggable: false,
        })
          .setLngLat([lng, lat])
          .setPopup(popup)
          .addTo(this.map!);

        newMarkers.push(newMarker);
        this.places.push(locationsList);
      }
    });
    this.markers = newMarkers;
    // Limites del mapa
    if (this.markers.length === 0) return;

    const bounds = new LngLatBounds();
    newMarkers.forEach((marker) => bounds.extend(marker.getLngLat()));
    this.map.fitBounds(bounds, { padding: 200 });
  }

  flyto(place: Places) {
    //this.selectLocation = place.id
    const [lng, lat] = place.lngLat;
    this._mapService.flyTo([lng, lat]);
  }

  getListLocations() {
    this.locationService
      .getLocations()
      .subscribe((locations) => (this.locationsList = locations));
  }

  getByIdPlace(id?: string) {
      if (!id) return
      this.locationService.getLocationById(id).subscribe( result => {
        this.item = result
      })
    
  }
    
}
