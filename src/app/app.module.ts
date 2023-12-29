import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule} from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { MapsModule } from './maps/maps.module';
import { HomeModule } from './home/home.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    AppComponent,


  ],
  imports: [
    
    BrowserModule,
    AppRoutingModule,
    MapsModule,
    HomeModule,
    
    
    
    HttpClientModule,
    BrowserAnimationsModule,
    
         
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
