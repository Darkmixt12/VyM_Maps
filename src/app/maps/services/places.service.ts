import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Feature, PlacesResponse } from '../interfaces/places';
import { PlacesApiClient } from '../api/placesApiClient';
import { MapService } from './map.service';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private placesHttp = inject(PlacesApiClient)
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

  getPlacesByQuery( query: string = ''){
    // todo: EVALUAR CUANDO EL QUERY ES NULO
    if( query.length === 0) {
      this.places = [];
      this.isLoadingPlaces = false;
      return;
    }
    if( !this.userLocation) throw Error('No hay user location')

    this.isLoadingPlaces = true;

    this.placesHttp.get<PlacesResponse>(`/${query}.json?`,{params:{
      proximity: this.userLocation.join(',')}})
      .subscribe( resp => {
        console.log(resp.features)

        this.isLoadingPlaces = false;
        this.places = resp.features

        this._mapService.createMarkersFormPlaces( this.places, this.userLocation )
      })
  }

  hideResults(){
    this.places = []
  }



}
