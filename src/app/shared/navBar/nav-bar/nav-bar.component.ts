import { Component, ViewChild, inject } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  @ViewChild('sidebarRef') sidebarRef!: any;
  private AuthService = inject(AuthService);
  public userName = localStorage.getItem(`user`)
  sidebarVisible: boolean = false;
  
  public navBarRoutes = [
    { label: 'Home', description: 'Informacion', url: './home/inicio'},
    { label: 'Mapa', description: 'Mapa Completo', url: '/map/fullview'},
    { label: 'Clientes', description: 'Lista', url: './map-list'},
    { label: 'Nuevo Lugar', description: 'Nueva Ubicacion', url: './form'},
  
  ]


    constructor(){}

    closeCallback(e: any): void {
      this.sidebarRef.close(e);
  }

    logout(){
      this.AuthService.onLogout()
    }


  

}
