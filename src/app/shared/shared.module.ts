import { NgModule } from "@angular/core";
import { NavBarComponent } from './navBar/nav-bar/nav-bar.component';
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { SidebarModule } from 'primeng/sidebar';
import { UploadBtnComponent } from './upload-btn/upload-btn.component';


@NgModule({
	declarations: [
  
    NavBarComponent,
        UploadBtnComponent
  ],
	imports: [
		CommonModule,
		RouterModule,
		SidebarModule
	],
	exports:[
		NavBarComponent,
		UploadBtnComponent
	]
  })
  export class SharedModule { }