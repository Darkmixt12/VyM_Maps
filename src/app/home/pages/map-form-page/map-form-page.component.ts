import { AfterViewInit, Component, ElementRef, Inject, Input, OnInit, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Map, Marker, Popup } from 'mapbox-gl';
import { MapService, PlacesService } from 'src/app/maps/services';

@Component({
  selector: 'app-map-form-page',
  templateUrl: './map-form-page.component.html',
  styleUrls: ['./map-form-page.component.css']
})
export class MapFormPageComponent implements OnInit{


  private fb = inject(FormBuilder)
  private _placesService = Inject(PlacesService)
  private _mapService = Inject(MapService)
  public test?: [number, number]
  public map?: Map;

  @ViewChild('mapDiv')
  mapDivElement!: ElementRef





public myForm: FormGroup = this.fb.group({
    title: ['test1', [Validators.required]],
    description: ['de la calle maestra', [Validators.required]],
    lngLat: [this.test, [Validators.required]],
})


ngOnInit(){
  console.log( this._placesService.userLocation)
}


}
