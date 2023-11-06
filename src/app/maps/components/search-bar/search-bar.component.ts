import { Component, inject } from '@angular/core';
import { PlacesService } from '../../services/places.service';

@Component({
  selector: 'map-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  private debounceTimer?: NodeJS.Timeout;
  private _placeService = inject(PlacesService)

    onQueryChanged(query: string = ""){

      if(this.debounceTimer) clearTimeout( this.debounceTimer)

      this.debounceTimer = setTimeout(() => {
        this._placeService.getPlacesByQuery(query)
      }, 500)
    }
}
