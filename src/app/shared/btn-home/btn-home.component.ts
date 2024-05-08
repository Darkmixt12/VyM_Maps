import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'alone-btn-home',
  standalone: true,
  imports: [CommonModule, RouterModule, TooltipModule ],
  templateUrl: './btn-home.component.html',
  styleUrls: ['./btn-home.component.css']
})
export class BtnHomeComponent {

}
