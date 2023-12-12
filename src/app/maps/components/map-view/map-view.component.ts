import {
  Component,
  OnInit,
  inject,
  AfterViewInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { MapService, PlacesService } from '../../services';
import { Map, Popup, Marker, LngLat, LngLatBounds } from 'mapbox-gl';
import * as mapboxgl from 'mapbox-gl';
import { RenderLocation } from 'src/app/home/pages/descripciones-mapas/descripciones-mapas.component';
import { elementAt } from 'rxjs';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css'],
})
export class MapViewComponent implements OnInit, AfterViewInit {
  private _placesService = inject(PlacesService);
  private _mapService = inject(MapService);
  public map?: Map;
  public ubicacion!: LngLat;

  public lugaresRender?: RenderLocation[];
  public hidePlaces: Boolean = false;

  @ViewChild('mapDiv')
  mapDivElement!: ElementRef;
  
  

  ngOnInit() {
    this.readFormLocalStorage();
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
          <h6>Aqui estoy</h6>
          <span>Estoy en este lugar del Mundo</span>
        `);

    new Marker({ color: 'red' })
      .setLngLat(this._placesService.userLocation)
      .setPopup(popup)
      .addTo(this.map);

    this._mapService.setMap(this.map);
  }

  toogleLocations(){
    this.hidePlaces =! this.hidePlaces
  }

  readFormLocalStorage() {
    const plainMarkersString = localStorage.getItem('locations') ?? '[]';
    const plainMarkers = JSON.parse(plainMarkersString);
    this.lugaresRender = plainMarkers;
  }

  marksPorProvincia(provincias?: string, color?: string) {
    if (!this.map) return;
 
    this.lugaresRender?.forEach(({ lngLat, provincia, title, description  }) => {
      
      const popup = new Popup().setHTML(`
      <h3>${provincia}</h3>
      <span>${title}</span>
    `);

      if (provincia === provincias) {


        new Marker({
          color: color,
          draggable: false,
        })
          .setLngLat(lngLat)
          .setPopup(popup)
          .addTo(this.map!)
          

      } else {
        if (provincias === undefined) {
          new Marker({
            color: '#075e62',
            draggable: false,
          })
            .setLngLat(lngLat)
            .setPopup(popup)
            .addTo(this.map!);
            
        }
      }
    });


  }

  
}
