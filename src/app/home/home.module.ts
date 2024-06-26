import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MapFormPageComponent } from './pages/map-form-page/map-form-page.component';
import { MapRoutingModule } from '../maps/maps-routing.module';
import { HomeLayoutComponent } from './layout/home-layout/home-layout.component';
import { SharedModule } from '../shared/shared.module';
import { MapListComponent } from './pages/map-list/map-list/map-list.component';
import { HomePageComponent } from './pages/home-page/home-page.component';

import { TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { TooltipModule } from 'primeng/tooltip';

import { FileUploadModule } from 'primeng/fileupload';
import { ClientEditPageComponent } from './pages/client-edit-page/client-edit-page.component';
import {ToastModule} from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ChartModule } from 'primeng/chart';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { VymPageComponent } from './pages/vym-page/vym-page/vym-page.component';



@NgModule({
  declarations: [
  MapFormPageComponent,
  HomeLayoutComponent,
  MapListComponent,
  HomePageComponent,
  ClientEditPageComponent,
  UserPageComponent,
  VymPageComponent,

  

  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,

    ReactiveFormsModule,
    MapRoutingModule,
    SharedModule,
    
    

    
    TableModule,
    MultiSelectModule,
    DropdownModule,
    TagModule,
    ButtonModule,
    FileUploadModule,
    ToastModule,
    DialogModule,
    DynamicDialogModule,
    ConfirmDialogModule,
    ConfirmPopupModule,
    ChartModule,
    TooltipModule
  

  ]
})
export class HomeModule { }
