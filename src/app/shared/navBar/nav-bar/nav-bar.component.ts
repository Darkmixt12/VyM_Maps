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
    { label: 'Home', description: 'Informacion', url: './home/inicio'},
    { label: 'Mapa', description: 'Mapa Completo', url: '/map/fullview'},
    { label: 'Clientes', description: 'Lista', url: './map-list'},
    { label: 'Nuevo Lugar', description: 'Nueva Ubicacion', url: './form'},
  
  ]


    constructor(){}


    logout(){
      this.AuthService.onLogout()
    }

}
