import { Component, OnInit, computed, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/auth/interfaces';
import { UpdatePassword } from 'src/app/auth/interfaces/updatePassword';
import { AuthService } from 'src/app/auth/services/auth.service';
import { UserService } from 'src/app/maps/services/user.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
  ngOnInit(): void {
    this.getUserInfo()
  }

  private userId = localStorage.getItem('id')
  public readonly image: string = 'https://res.cloudinary.com/dlsxaumhg/image/upload/v1708126079/userFolder/fgxftnesgdhutkavyhba.jpg'
  private fb = inject(FormBuilder)
  private authService = inject(AuthService)
  private userService = inject(UserService)
  public currentUser: User | null = this.authService.currentUser()



  public updateFormPassword: FormGroup = this.fb.group({
    password: ['', [Validators.required]],
    newPassword: ['', [Validators.required]],
    newPassword2: ['', [Validators.required]],
  })

  public updateFormUserInfo: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(20)]],
    email: ['', [Validators.required]],
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
    
    if(!this.userId) return
    this.authService.getUserInfo(this.userId).subscribe(result => {
      this.updateFormUserInfo.patchValue({
        name: result.name,
        email: result.email
      })


    })
  }

  updateUser(){
    if(!this.updateFormUserInfo.valid || !this.userId) return
    this.userService.updateUser(this.userId, this.updateFormUserInfo.value).subscribe( () =>{
        const { name } = this.updateFormUserInfo.value;
        this.currentUser!.name = name


    })
  }


}
