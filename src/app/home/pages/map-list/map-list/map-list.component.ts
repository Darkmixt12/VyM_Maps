import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { LocationsResponse } from 'src/app/maps/interfaces/locationsResponse';
import { LocationService } from 'src/app/maps/services/locations.service';
import { Table } from 'primeng/table';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ClientEditPageComponent } from '../../client-edit-page/client-edit-page.component';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-map-list',
  templateUrl: './map-list.component.html',
  providers: [DialogService, MessageService],
  styleUrls: ['./map-list.component.css']
})
export class MapListComponent implements OnInit, OnDestroy {


public locations: LocationsResponse[] = []
public agentes: any[] = []
public ref: DynamicDialogRef | undefined;
private locationService = inject(LocationService);
private dialogService  = inject(DialogService)

//! PRIMENG TABLE 


public item!: LocationsResponse
loading: boolean = true;
visible: boolean = false;



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

getByIdPlace(id?: string) {
  if (!id) return
  this.locationService.getLocationById(id).subscribe( result => {
    this.ref = this.dialogService.open(ClientEditPageComponent, { 
      data: {
        id: result._id
    },
      header: `Editar Cliente`,
      width: '50vw',});
  })

}

showDialog() {
  this.visible = true;
}



ngOnDestroy() {
  if (this.ref) {
      this.ref.close();
  }

}

}