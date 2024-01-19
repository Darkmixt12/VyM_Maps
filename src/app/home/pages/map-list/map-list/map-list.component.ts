import { Component, OnInit, inject } from '@angular/core';
import { LocationsResponse } from 'src/app/maps/interfaces/locationsResponse';
import { LocationService } from 'src/app/maps/services/locations.service';

@Component({
  selector: 'app-map-list',
  templateUrl: './map-list.component.html',
  styleUrls: ['./map-list.component.css']
})
export class MapListComponent implements OnInit {

public locations: LocationsResponse[] = []
private locationService = inject(LocationService);

ngOnInit(): void {
  this.getFacturas();
}

  getFacturas(){
    return this.locationService.getLocations().subscribe( (locations) => (this.locations = locations))
  }
}
