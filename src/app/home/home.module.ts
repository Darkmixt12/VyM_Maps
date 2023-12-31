import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DescripcionesMapasComponent } from './pages/descripciones-mapas/descripciones-mapas.component';
import { MiniMapsComponent } from './components/mini-maps/mini-maps.component';
import { HomeRoutingModule } from './home-routing.module';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MapFormPageComponent } from './pages/map-form-page/map-form-page.component';
import { MapRoutingModule } from '../maps/maps-routing.module';
import { HomeLayoutComponent } from './layout/home-layout/home-layout.component';
import { SharedModule } from '../shared/shared.module';
import { MapListComponent } from './pages/map-list/map-list/map-list.component';
import { HomePageComponent } from './pages/home-page/home-page.component';






@NgModule({
  declarations: [
	DescripcionesMapasComponent,
  MiniMapsComponent,
  MapFormPageComponent,
  HomeLayoutComponent,
  MapListComponent,
  HomePageComponent,

  

  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    MapRoutingModule,
    SharedModule,

  ]
})
export class HomeModule { }
