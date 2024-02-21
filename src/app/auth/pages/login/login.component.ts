import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public testId?: string
    private fb = inject( FormBuilder );
    private authService = inject( AuthService );
    private router = inject( Router );


    public myForm: FormGroup = this.fb.group({
      email: [ 'munozsteven@hotmail.com', [Validators.required, Validators.email ]],
      password: [ '321321', [Validators.required, Validators.minLength(6) ]],
    })


  login() {
    const { email, password} = this.myForm.value
    this.authService.login( email, password )
    .subscribe( {
      
      next: () => this.router.navigateByUrl('/home/inicio'),
      error: (error) => console.log( { loginError: error}),
    } )
  }
}
 