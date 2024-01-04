import { Component, inject } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  private AuthService = inject(AuthService);

  
  public navBarRoutes = [
    { label: 'Mapa', description: 'Mapa Completo', url: '/map/fullview'},
    { label: 'Lugares', description: 'Ubicaciones Añadidas', url: './ubicaciones'},
    { label: 'Nuevo Lugar', description: 'Nueva Ubicacion', url: './form'},
    { label: 'Lista de Ubicaciones', description: 'Lista', url: './map-list'},
  ]


    constructor(){}


    logout(){
      this.AuthService.onLogout()
    }

}
