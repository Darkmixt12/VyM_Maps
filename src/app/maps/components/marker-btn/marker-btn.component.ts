import { Component, Inject } from '@angular/core';
import { AnySourceData, LngLat, LngLatBounds, LngLatLike, Map, Marker, Popup } from 'mapbox-gl'
import { MapService } from '../../services';

@Component({
  selector: 'marker-btn',
  templateUrl: './marker-btn.component.html',
  styleUrls: ['./marker-btn.component.css']
})
export class MarkerBtnComponent {
  private _mapService = Inject(MapService)


  createMarker(){
    this._mapService.createMarker
  }
}
