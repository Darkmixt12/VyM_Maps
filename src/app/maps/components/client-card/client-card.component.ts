
import { Component, Input, inject } from '@angular/core';
import { LocationsResponse } from '../../interfaces/locationsResponse';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-card',
  templateUrl: './client-card.component.html',
  styleUrls: ['./client-card.component.css']
})
export class ClientCardComponent {

  @Input() hidePlaces: boolean = false
  @Input() itemHijo?: LocationsResponse ;
  private router = inject(Router)
  
  toogleLocations() {
    this.hidePlaces = !this.hidePlaces;
  }

  addNewLocation(){
    this.router.navigateByUrl('home/form')
  }
}
