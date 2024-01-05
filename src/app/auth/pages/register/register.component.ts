import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  private fb = inject( FormBuilder );
  private authService = inject( AuthService );
  private router = inject( Router );


  public myForm: FormGroup = this.fb.group({
    name: [ '', [Validators.required]],
    email: [ '', [Validators.required, Validators.email ]],
    password: [ '', [Validators.required, Validators.minLength(6) ]],
    password2: [ '', [Validators.required, Validators.minLength(6) ]],
  })


  register(){

  
  }
  
}
