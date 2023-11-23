import { Component } from '@angular/core';

@Component({

  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.css']
})
export class HomeLayoutComponent {
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
}
