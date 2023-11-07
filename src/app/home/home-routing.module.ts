import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DescripcionesMapasComponent } from './components/descripciones-mapas/descripciones-mapas.component';


const routes: Routes = [
  {
    path: 'home',
    component: DescripcionesMapasComponent,
    // children: [
        // {path: '',  component: },
        // {path: '', component: },
        // {path: '',    component: },
        // {path: '', component: },
        // {path: '**', redirectTo: 'fullscreen'},

    //]
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
