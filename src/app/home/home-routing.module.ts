import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DescripcionesMapasComponent } from './pages/descripciones-mapas/descripciones-mapas.component';
import { MapFormPageComponent } from './pages/map-form-page/map-form-page.component';
import { HomeLayoutComponent } from './layout/home-layout/home-layout.component';
import { MapListComponent } from './pages/map-list/map-list/map-list.component';


const routes: Routes = [
  {
    path: '',
    component: HomeLayoutComponent,
     children: [
         {path: 'ubicaciones', component: DescripcionesMapasComponent },
         {path: 'form',  component: MapFormPageComponent },
         {path: 'map-list', component: MapListComponent},
         {path: '**', redirectTo: ''},

        // {path: '', component: },
        // {path: '',    component: },
        // {path: '', component: },
        // {path: '**', redirectTo: 'fullscreen'},

    ]
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
