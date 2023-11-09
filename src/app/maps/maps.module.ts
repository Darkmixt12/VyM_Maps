import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapPageComponent } from './pages/map-page/map-page.component';
import { MapViewComponent } from './components/map-view/map-view.component';
import { LoadingComponent } from './components/loading/loading.component';
import { MyLocationComponent } from './components/my-location/my-location.component';
import { VymLogoComponent } from './components/vym-logo/vym-logo.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { BtnHomeComponent } from '../alone/components/btn-home/btn-home.component';
import { MarkerBtnComponent } from './components/marker-btn/marker-btn.component';



@NgModule({
  declarations: [
    MapPageComponent,
    MapViewComponent,
    LoadingComponent,
    MyLocationComponent,
    VymLogoComponent,
    SearchBarComponent,
    SearchResultComponent,
    MarkerBtnComponent,
    
  ],
  imports: [
    CommonModule,
    BtnHomeComponent
  ]
})
export class MapsModule { }
