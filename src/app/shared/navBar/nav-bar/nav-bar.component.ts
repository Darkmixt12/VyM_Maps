import { Component, Input, ViewChild, computed, inject } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { User } from 'src/app/auth/interfaces';

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
  public currentUser= computed( () => this.AuthService.currentUser())
  
  sidebarVisible: boolean = false;
  
  public navBarRoutes = [
    { label: 'Inicio', description: 'Informacion', url: './home/inicio'},
    { label: 'Mapa', description: 'Mapa Completo', url: '/map/fullview'},
    { label: 'Clientes', description: 'Lista', url: './map-list'},
    { label: 'Nuevo Lugar', description: 'Nueva Ubicacion', url: './form'},
  
  ]


    constructor(){ }
    closeCallback(e: any): void {
      this.sidebarRef.close(e);
  }

    logout(){
      this.AuthService.onLogout()
    }

  

    consoleIMg(){
      console.log('click')
    }



  

}
