import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapPageComponent } from './maps/pages/map-page/map-page.component';
import { isAuthenticatedGuard } from './auth/guards/is-authenticated.guard';

const routes: Routes = [
  {
    path: 'auth', 
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'map', 
    loadChildren: () => import('./maps/maps.module').then(m => m.MapsModule)
  },

  {
    path: 'home',
    canActivate: [isAuthenticatedGuard], 
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: '**', redirectTo: 'auth'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
