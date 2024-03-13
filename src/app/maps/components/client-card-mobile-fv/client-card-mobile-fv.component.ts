import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LocationsResponse } from '../../interfaces/locationsResponse';

@Component({
  selector: 'app-client-card-mobile-fv',
  templateUrl: './client-card-mobile-fv.component.html',
  styleUrls: ['./client-card-mobile-fv.component.css']
})
export class ClientCardMobileFvComponent {
  @Input() itemHijo?: LocationsResponse

  @Input() size?: Boolean

  @Output() sizeChange = new EventEmitter<Boolean>();


  resize() {
    this.size = this.size = !this.size;
    this.sizeChange.emit(this.size);
  }


}
