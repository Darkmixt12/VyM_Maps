import { VymPageComponent } from './pages/vym-page/vym-page/vym-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapFormPageComponent } from './pages/map-form-page/map-form-page.component';
import { HomeLayoutComponent } from './layout/home-layout/home-layout.component';
import { MapListComponent } from './pages/map-list/map-list/map-list.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { UserPageComponent } from './pages/user-page/user-page.component';


const routes: Routes = [
  {
    path: '',
    component: HomeLayoutComponent,
     children: [
         {path: 'inicio', component: HomePageComponent },
         {path: 'form',  component: MapFormPageComponent },
         {path: 'map-list', component: MapListComponent},
         {path: 'user', component: UserPageComponent},
         {path: 'information', component: VymPageComponent},
         {path: '**', redirectTo: 'inicio'},
    ]
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
