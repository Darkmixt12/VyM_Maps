import { Component, OnInit } from '@angular/core';
import { ConnectionService, ConnectionState, ConnectionServiceOptions} from 'ng-connection-service'
import { Subscription, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  status!: string;
  currentState!: ConnectionState;
  subscription = new Subscription();

}


