import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapPageComponent } from './pages/map-page/map-page.component';
import { MapsLayoutComponent } from './layout/maps-layout/maps-layout.component';



const routes: Routes = [
  {
    path: '',
    component: MapsLayoutComponent,
     children: [
       {path: 'fullview',  component: MapPageComponent},
        // {path: '**', redirectTo: ''},

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
export class MapRoutingModule { }
