
import { Component, Input } from '@angular/core';
import { LocationsResponse } from '../../interfaces/locationsResponse';

@Component({
  selector: 'app-client-card',
  templateUrl: './client-card.component.html',
  styleUrls: ['./client-card.component.css']
})
export class ClientCardComponent {

  @Input() hidePlaces: boolean = false

  @Input() itemHijo?: LocationsResponse ;
  
  toogleLocations() {
    this.hidePlaces = !this.hidePlaces;
  }
}
