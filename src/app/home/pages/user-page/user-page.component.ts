import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UpdatePassword } from 'src/app/auth/interfaces/updatePassword';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent {

  public readonly image: string = 'https://res.cloudinary.com/dlsxaumhg/image/upload/v1708126079/userFolder/fgxftnesgdhutkavyhba.jpg'
  private fb = inject(FormBuilder)
  private authService = inject(AuthService)




  public updateFormPassword: FormGroup = this.fb.group({
    password: ['', [Validators.required]],
    newPassword: ['', [Validators.required]],
    newPassword2: ['', [Validators.required]],
  })

  public updateFormUserInfo: FormGroup = this.fb.group({
    name: ['Steven Muñoz', [Validators.required]],
    email: ['munozsteven@hotmail.com', [Validators.required]],
  })




  changePassword(){

    const { password,newPassword, newPassword2} = this.updateFormPassword.value
    const email = localStorage.getItem('email')


    if( newPassword === newPassword2){
      const updatePassword : UpdatePassword ={
        email,
        password,
        newPassword,
        newPassword2
      }

      console.log(updatePassword)
      this.authService.changePassword(updatePassword).subscribe()
    } else{
    console.log('Las contraseñas son distintas.')
    }

  }

  getUserInfo(){
  
  }


}
