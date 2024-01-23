import { Component, OnInit, inject } from '@angular/core';
import { LocationsResponse } from 'src/app/maps/interfaces/locationsResponse';
import { LocationService } from 'src/app/maps/services/locations.service';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-map-list',
  templateUrl: './map-list.component.html',
  styleUrls: ['./map-list.component.css']
})
export class MapListComponent implements OnInit {

public locations: LocationsResponse[] = []
public agentes: any[] = []
private locationService = inject(LocationService);

//! PRIMENG TABLE 

statuses!: any[];

loading: boolean = true;

activityValues: number[] = [0, 100];




ngOnInit() {
 this.getFacturas();
 this.loading = false;


 this.agentes = [
  { name: 'O10' },
  { name: '13C'},
  { name: 'TELJ',},
  { name: 'TELA'},
  { name: '8G'},
  { name: '8F'},
  { name: '28'},
  { name: '23' },
];
}

clear(table: Table) {
  table.clear();
}

getFacturas(){
  return this.locationService.getLocations().subscribe( (locations) => (this.locations = locations))
}


}
