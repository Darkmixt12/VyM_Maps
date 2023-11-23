import { Component, ElementRef, Inject, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LngLat, Map, Marker, Popup } from 'mapbox-gl';
import { MapService, PlacesService } from 'src/app/maps/services';

interface MarkerandColor {
  color: string;
  marker: Marker
}

@Component({
  selector: 'app-map-form-page',
  templateUrl: './map-form-page.component.html',
  styleUrls: ['./map-form-page.component.css']
})
export class MapFormPageComponent{


  private fb = inject(FormBuilder)

  public currentMarker: MarkerandColor[] = []
  public test?: LngLat
  public map?: Map;
  public test2?: [number | undefined, number | undefined] 

  @ViewChild('mapDiv')
  mapDivElement!: ElementRef


  public myForm: FormGroup = this.fb.group({
    title: ['test1', [Validators.required]],
    description: ['de la calle maestra', [Validators.required]],
    lngLat: ['', [Validators.required]],
})

  ngAfterViewInit(): void {


    this.map = new Map({
      container: this.mapDivElement.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [-84.0484498, 9.9495857], // starting position [lng, lat]
      zoom: 12, // starting zoom
      });
    //this._mapService.setMap(this.map)
  }


addMarker(lngLat: LngLat){
  if(!this.map) return

  const marker = new Marker({
    color: 'black',
    draggable: true
  })
  .setLngLat( lngLat)
  .addTo(this.map)  

  this.currentMarker.push( {
    color: 'black',
    marker: marker})
  
  marker.on('dragend', ()=>{
   this.test = marker.getLngLat();
   this.test2 = [this.test.lng , this.test.lat]
  })
}

createMarker(){
  if(!this.map) return

  //const color ='#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));
  const lgnLat = this.map.getCenter()
  this.addMarker(lgnLat)
  
  
}

LogForm(){
  console.log(this.myForm.value)
}






}
