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
  { agente: 'O10', image: 'amyelsner.png' },
  { agente: 'Anna Fali', image: 'annafali.png' },
  { agente: 'Asiya Javayant', image: 'asiyajavayant.png' },
  { agente: 'Bernardo Dominic', image: 'bernardodominic.png' },
  { agente: 'Elwin Sharvill', image: 'elwinsharvill.png' },
  { agente: 'Ioni Bowcher', image: 'ionibowcher.png' },
  { agente: 'Ivan Magalhaes', image: 'ivanmagalhaes.png' },
  { agente: 'Onyama Limba', image: 'onyamalimba.png' },
  { agente: 'Stephen Shaw', image: 'stephenshaw.png' },
  { agente: 'Xuxue Feng', image: 'xuxuefeng.png' }
];
}

clear(table: Table) {
  table.clear();
}

  getFacturas(){
    return this.locationService.getLocations().subscribe( (locations) => (this.locations = locations))
  }
}
