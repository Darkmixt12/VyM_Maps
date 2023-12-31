import { Component, ElementRef, Inject, ViewChild, inject } from '@angular/core';
import { AnySourceData, LngLat, LngLatBounds, LngLatLike, Map, Marker, Popup } from 'mapbox-gl'
import { MapService, PlacesService } from '../../services';

@Component({
  selector: 'marker-btn',
  templateUrl: './marker-btn.component.html',
  styleUrls: ['./marker-btn.component.css']
})
export class MarkerBtnComponent {

    
  private _placesService = inject(PlacesService)
  private _mapService = inject(MapService)
  public map?: Map;
  public ubicacion! : LngLat

  @ViewChild('mapDiv')
  mapDivElement!: ElementRef





  ngOnInit() {
    console.log( this._placesService.userLocation)
  }

  ngAfterViewInit(): void {

    if(!this._placesService.userLocation) throw new Error('No hay placesService.userLocation')

    this.map = new Map({
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
  .addTo( this.map ) 

this._mapService.setMap(this.map)
}


getMarkerLngLat(lngLat: LngLat){
  if(!this.map) return

  const marker = new Marker({
    draggable: true,
    color: 'black'
  })
  .setLngLat(lngLat)
  .addTo(this.map)
  
  marker.on('dragend', ()=>{
    console.log(lngLat)
    const ubicaciones =marker.getLngLat()
    this.ubicacion = ubicaciones
  })
}

createMarker(){
  if(!this.map) return
  console.log('si estoy sirviendo mae')

  
  const lgnLat = this.map.getCenter()
  this.getMarkerLngLat(lgnLat)

  
}



}
