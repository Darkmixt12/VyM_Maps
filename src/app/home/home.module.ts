import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DescripcionesMapasComponent } from './components/descripciones-mapas/descripciones-mapas.component';
import { MiniMapsComponent } from './components/mini-maps/mini-maps.component';
import { HomeRoutingModule } from './home-routing.module';




@NgModule({
  declarations: [
	DescripcionesMapasComponent,
  MiniMapsComponent

  ],
  imports: [
    CommonModule,
    HomeRoutingModule

  ]
})
export class HomeModule { }
