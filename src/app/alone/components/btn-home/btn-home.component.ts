import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'alone-btn-home',
  standalone: true,
  imports: [CommonModule, RouterModule ],
  templateUrl: './btn-home.component.html',
  styleUrls: ['./btn-home.component.css']
})
export class BtnHomeComponent {

}
