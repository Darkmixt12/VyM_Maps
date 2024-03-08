import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapPageComponent } from './pages/map-page/map-page.component';
import { MapViewComponent } from './components/map-view/map-view.component';
import { LoadingComponent } from './components/loading/loading.component';
import { MyLocationComponent } from './components/my-location/my-location.component';
import { VymLogoComponent } from './components/vym-logo/vym-logo.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { BtnHomeComponent } from '../shared/btn-home/btn-home.component';
import { MapRoutingModule } from './maps-routing.module';
import { MapsLayoutComponent } from './layout/maps-layout/maps-layout.component';
import { ClientCardComponent } from './components/client-card/client-card.component';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';
import { ClientCardMobileComponent } from './components/client-card-mobile/client-card-mobile.component';




@NgModule({
  declarations: [
    MapPageComponent,
    MapViewComponent,
    LoadingComponent,
    MyLocationComponent,
    VymLogoComponent,
    SearchBarComponent,
    SearchResultComponent,
    MapsLayoutComponent,
    ClientCardComponent,
    DeleteDialogComponent,
    ClientCardMobileComponent,

    
  ],
  imports: [
    CommonModule,
    BtnHomeComponent,
    MapRoutingModule,
  
  ]
})
export class MapsModule { }
