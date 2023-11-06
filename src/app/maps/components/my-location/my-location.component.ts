import { Component, inject } from '@angular/core';
import { MapService, PlacesService } from '../../services';

@Component({
  selector: 'app-my-location',
  templateUrl: './my-location.component.html',
  styleUrls: ['./my-location.component.css']
})
export class MyLocationComponent {
  private _placesService= inject(PlacesService);
  private _mapService = inject(MapService);


  goToMyLocation(){

    if ( !this._placesService.isUserLocationReady) throw Error('No hay ubicacion de usuario')
    if ( !this._mapService.isMapReady ) throw Error('No hay mapa disponible')

    this._mapService.flyTo( this._placesService.userLocation!)
  }
}
