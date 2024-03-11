import { Component, Input } from '@angular/core';
import { LocationsResponse } from '../../interfaces/locationsResponse';

@Component({
  selector: 'app-client-card-mobile',
  templateUrl: './client-card-mobile.component.html',
  styleUrls: ['./client-card-mobile.component.css']
})
export class ClientCardMobileComponent {

  @Input() itemHijo?: LocationsResponse

  public hidePlaces: Boolean = false;

  toogleLocations(){
    this.hidePlaces = !this.hidePlaces;
    console.log(this.hidePlaces)
  }


}

