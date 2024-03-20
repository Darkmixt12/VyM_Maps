import { HttpClient } from '@angular/common/http';
import { Injectable, inject, OnInit } from '@angular/core';
import { Feature, PlacesResponse } from '../interfaces/places';
import { MapService } from './map.service';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private _mapService = inject(MapService);

  public userLocation?: [number,number]
  public isLoadingPlaces: boolean = false;
  public places: Feature[] = []
  //public isLoading

  get isUserLocationReady(): boolean {
    return !!this.userLocation
  }


  constructor() {
    this.getUserLocation()
   }

  async getUserLocation(): Promise<[number, number]>{

    return new Promise( (resolve, reject) => {

      navigator.geolocation.getCurrentPosition(
        
        ( {coords} ) => { this.userLocation = [coords.longitude, coords.latitude] 
          resolve( this.userLocation )
        },
        ( err ) => {
          alert('No se pudo obtener la Geolocation');
          console.log(err);
          reject()
        }
      );

    })
  }

}
