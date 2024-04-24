import { Component, OnInit, computed, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/auth/interfaces';
import { UpdatePassword } from 'src/app/auth/interfaces/updatePassword';
import { AuthService } from 'src/app/auth/services/auth.service';
import { LocationService } from 'src/app/maps/services/locations.service';
import { UserService } from 'src/app/maps/services/user.service';
import { ValidatorService } from 'src/app/shared/services/validators.service';

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
  private validatorService = inject(ValidatorService)
  public currentUser: User | null = this.authService.currentUser()

  // IMAGEN PROFILE //
  public imgTemporal: any
  public file?: File;

  public changeType : boolean = true
  public visible : boolean = true

  private locationService = inject(LocationService);



  public updateFormPassword: FormGroup = this.fb.group({
    password: ['', [Validators.required]],
    newPassword: ['', [Validators.required]],
    newPassword2: ['', [Validators.required]],
  },
    {
      validators: [this.validatorService.isFieldOneEqualFieldTwo('newPassword','newPassword2')]
    }
  )

  public updateFormUserInfo: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(16), Validators.pattern('^[a-z A-Zñ ]*$')]],
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


  //! SUBIR IMAGENES // 
  //TODO: REFACTORIZAR TODO ESTO JUNTO CON UPLOAD-BTN.COMPONENT hacen lo mismo DRY PLS

  uploadFile(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    let file: File = element.files![0];
    if (file) {
      this.file = file
    }

    //* CREA IMAGEN TEMPORAL A LA HORA DE GUARDAR
    if(!event) return

    const reader = new FileReader();
    reader.readAsDataURL(file)

    reader.onloadend = () => {
      this.imgTemporal = reader.result
    }


}

upImage(){
  if(!this.file) return
  if(!this.currentUser) return
  const id = this.currentUser?._id
  const nombre = this.currentUser?.name
  console.log(id)
  this.locationService.upImage(this.file, nombre).subscribe( (response) => {
    const objectTest = {image: response.secure_url, name: 'usuario'}
    if(!id) return
    this.deleteImageBeforeUpdate(id);
  this.locationService.updateImage(id, objectTest).subscribe( ()=> {
    if(!this.currentUser?.image) return
      this.currentUser.image = objectTest.image
    })

  })

}

deleteImageBeforeUpdate(id: string){
  this.authService.getUserInfo(id).subscribe( result =>{
    const SecretUrl = result.image
    console.log(SecretUrl)
    const SecretUrlArray = SecretUrl.split('/')
    console.log(SecretUrlArray)
    const SecretUrlKeyCut = SecretUrlArray[SecretUrlArray.length-1]
    console.log(SecretUrlKeyCut)
    const publicName = SecretUrlKeyCut.split('.')[0]
    const imageObject = {image: publicName, name: 'usuario'}
    this.locationService.deleteOldImageFact(imageObject).subscribe()
  })
}

viewpass(){
  this.visible = !this.visible
  this.changeType = !this.changeType
}


}