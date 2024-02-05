import { Component, ViewChild, inject } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  atributo() {
    const primaryNav = document.querySelector('.primary-navigation');
    const visibility = primaryNav?.getAttribute('data-visible');

    if (visibility === 'false') {
      primaryNav?.setAttribute('data-visible', 'true');
      console.log(primaryNav);
      console.log(visibility);
    } else if (visibility === 'true') {
      primaryNav?.setAttribute('data-visible', 'false');
      console.log(primaryNav);
      console.log(visibility);
    }
  }

  /* termina la navbar */

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
