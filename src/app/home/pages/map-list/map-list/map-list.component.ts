import { Component, Input, OnInit, inject } from '@angular/core';
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
export class MapListComponent implements OnInit {


public locations: LocationsResponse[] = []
public agentes: any[] = []
public ref: DynamicDialogRef | undefined;
private locationService = inject(LocationService);
private dialogService  = inject(DialogService)

//! PRIMENG TABLE 


public item!: LocationsResponse

statuses!: any[];
loading: boolean = true;
activityValues: number[] = [0, 100];
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
    this.item = result
    localStorage.setItem('id', result._id!)
    console.log(this.item)
  })

}

showDialog() {
  this.visible = true;
}

show() {
  this.ref = this.dialogService.open(ClientEditPageComponent, { 
    data: {
      id: this.item._id
  },
    header: 'Select a Product'});

  
}

ngOnDestroy() {
  if (this.ref) {
      this.ref.close();
  }
  
}
}