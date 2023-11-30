import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Map, Marker } from 'mapbox-gl';
import { LocationArray } from '../../interfaces/Locations';

@Component({
  selector: 'app-mini-maps',
  templateUrl: './mini-maps.component.html',
  styleUrls: ['./mini-maps.component.css'],
})
export class MiniMapsComponent implements AfterViewInit {
  @Input() 
  lngLat?: [number, number];
  
  @ViewChild('map') divMap?: ElementRef;

  @Input()
  public latitudes?: [number, number]



  ngAfterViewInit(): void {

    if(!this.lngLat) throw Error(' Ubicacion no encontrada')
    if(!this.divMap) throw Error('Mapa no inicializado')
    const map = new Map({
      container: this.divMap.nativeElement,
      style: 'mapbox://styles/mapbox/outdoors-v12', // style URL
      center: this.lngLat, // starting position [lng, lat]
      zoom: 15, // starting zoom
      interactive: false
      });
      new Marker()
        .setLngLat(this.lngLat)
        .addTo(map)
  
  }

}
