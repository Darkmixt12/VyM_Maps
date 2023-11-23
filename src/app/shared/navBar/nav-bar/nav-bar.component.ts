import { Component } from '@angular/core';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  public navBarRoutes = [
    { label: 'Mapa', description: 'Mapa Completo', url: './fullview'},
    { label: 'Lugares', description: 'Ubicaciones Añadidas', url: './ubicaciones'},
    { label: 'Nuevo Lugar', description: 'Nueva Ubicacion', url: './form'},
  ]


    constructor(){




    }
}
