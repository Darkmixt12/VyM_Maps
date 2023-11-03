import { Component } from '@angular/core';

@Component({
  selector: 'app-my-location',
  templateUrl: './my-location.component.html',
  styleUrls: ['./my-location.component.css']
})
export class MyLocationComponent {


  goToMyLocation(){
    console.log('ir a mi ubicacion')
  }
}
