import { Component, Input } from '@angular/core';
import { LocationsResponse } from '../../interfaces/locationsResponse';

@Component({
  selector: 'app-client-card-mobile-fv',
  templateUrl: './client-card-mobile-fv.component.html',
  styleUrls: ['./client-card-mobile-fv.component.css']
})
export class ClientCardMobileFvComponent {
  @Input() itemHijo?: LocationsResponse


  hideCardClient(){
    this.itemHijo = undefined
  }
}
