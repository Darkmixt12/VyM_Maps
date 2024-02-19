import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent {

  public readonly image: string = 'https://res.cloudinary.com/dlsxaumhg/image/upload/v1708126079/userFolder/fgxftnesgdhutkavyhba.jpg'
  private fb = inject(FormBuilder)




  public updateFormPassword: FormGroup = this.fb.group({
    oldPassword: ['', [Validators.required]],
    newPassword: ['', [Validators.required]],
    newPassword2: ['', [Validators.required]],
  })




  changePassword(){
    console.log(this.updateFormPassword.value)
  }
}
