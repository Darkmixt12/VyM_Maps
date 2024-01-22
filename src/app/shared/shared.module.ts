import { NgModule } from "@angular/core";
import { NavBarComponent } from './navBar/nav-bar/nav-bar.component';
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { SidebarModule } from 'primeng/sidebar';


@NgModule({
	declarations: [
  
    NavBarComponent
  ],
	imports: [
		CommonModule,
		RouterModule,
		SidebarModule
	],
	exports:[
		NavBarComponent
	]
  })
  export class SharedModule { }