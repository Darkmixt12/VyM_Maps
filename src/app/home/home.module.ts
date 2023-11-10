import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DescripcionesMapasComponent } from './pages/descripciones-mapas/descripciones-mapas.component';
import { MiniMapsComponent } from './components/mini-maps/mini-maps.component';
import { HomeRoutingModule } from './home-routing.module';
import { FormUbicationComponent } from './components/form-ubication/form-ubication.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SideMenuComponent } from '../alone/components/side-menu/side-menu.component';




@NgModule({
  declarations: [
	DescripcionesMapasComponent,
  MiniMapsComponent,
  FormUbicationComponent,
  

  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    SideMenuComponent
    
  ]
})
export class HomeModule { }
