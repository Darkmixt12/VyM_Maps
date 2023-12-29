import { Component, computed, inject } from '@angular/core';
import { ConnectionService, ConnectionState, ConnectionServiceOptions} from 'ng-connection-service'
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({

  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.css']
})
export class HomeLayoutComponent {

  private authService = inject(AuthService);
  public user = computed( () => this.authService.currentUser()); 

  public sidebarItems = [
    {
      label: 'Ubicaciones', icon: 'label', url: '/home/ubicaciones'
    },
    {
      label: 'Añadir', icon: 'add', url: '/home/form'
    },
    {
      label: 'Buscar', icon: 'search', url: '/map/fullview'
    },
  ]


  // get user(){ es igual a usar el user computed de arriba
  //   return this.authService.currentUser();
  // }

}




