import { Router } from '@angular/router';

import { LocationService } from './../../services/locations.service';
import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { LocationsResponse } from '../../interfaces/locationsResponse';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent implements OnInit {
  @Input() public hidePlacesChild?: boolean;
  @Output() changeToTrue = new EventEmitter<boolean>();
  @Input() public ChildLocation?: LocationsResponse;
  private locationService = inject(LocationService);
  private router = inject(Router);

  changeValue(){
    this.changeToTrue.emit(this.hidePlacesChild)
  }

  ngOnInit(): void {
    console.log(this.ChildLocation)
  }

  deleteLocation(id: string | undefined){
    if(id === 'undefined') return
    this.locationService.deleteById(id).subscribe(console.log)
    this.changeValue();
    location.reload();
  }
}
