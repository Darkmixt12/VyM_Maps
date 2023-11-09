import { Component, inject } from '@angular/core';
import { PlacesService } from '../../services';

@Component({
  selector: 'app-map-page',
  templateUrl: './map-page.component.html',
  styleUrls: ['./map-page.component.css']
})
export class MapPageComponent {

  private _placesService = inject(PlacesService)

  constructor() {}

  get isUserLocationReady(){
    return this._placesService.isUserLocationReady;
  }

}
