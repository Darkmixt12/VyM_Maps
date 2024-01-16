
import { Component, Input } from '@angular/core';
import { LocationsResponse } from '../../interfaces/locationsResponse';

@Component({
  selector: 'app-client-card',
  templateUrl: './client-card.component.html',
  styleUrls: ['./client-card.component.css']
})
export class ClientCardComponent {

  @Input() itemHijo?: LocationsResponse ;
}
