import { Component, inject } from '@angular/core';
import { PlacesService } from '../../services/places.service';
import { Feature } from '../../interfaces/places';
import { MapService } from '../../services/map.service';

@Component({
  selector: 'map-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent {
private _placesService = inject(PlacesService)
private _mapService = inject(MapService)

public selectLocation: string = ''


get isLoadingPlaces(){
  return this._placesService.isLoadingPlaces
}

get places (){
  return this._placesService.places
}

flyto( place:Feature){
  this.selectLocation = place.id

  const [ lng, lat] = place.center

  this._mapService.flyTo([ lng, lat])
}

getDirections( place: Feature){
  if  (!this._placesService.userLocation) throw Error('No hay user')

  this._placesService.hideResults();

  const start = this._placesService.userLocation
  const end = place.center as [number, number]

  this._mapService.getRouteBetweenPoints(start, end)

}
}
