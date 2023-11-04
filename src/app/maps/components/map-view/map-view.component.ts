import { Component, OnInit, inject, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { MapService, PlacesService } from '../../services';
import { Map, Popup, Marker } from 'mapbox-gl';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})
export class MapViewComponent implements OnInit, AfterViewInit{
  
  private _placesService = inject(PlacesService)
  private _mapService = inject(MapService)
  
  @ViewChild('mapDiv')
  mapDivElement!: ElementRef

  





  ngOnInit() {
    console.log( this._placesService.userLocation)
  }


  ngAfterViewInit(): void {

    if(!this._placesService.userLocation) throw new Error('No hay placesService.userLocation')

    const map = new Map({
      container: this.mapDivElement.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this._placesService.userLocation, // starting position [lng, lat]
      zoom: 14, // starting zoom
      });


    const popup = new Popup()
        .setHTML(`
          <h6>Aqui estoy</h6>
          <span>Estoy en este lugar del Mundo</span>
        `);

    new Marker({color: 'red'})
      .setLngLat( this._placesService.userLocation) 
      .setPopup( popup )  
      .addTo( map ) 

    this._mapService.setMap(map)
  }
}
