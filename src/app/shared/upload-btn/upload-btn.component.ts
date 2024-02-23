import { Component, Input, OnInit, inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { LocationService } from 'src/app/maps/services/locations.service';

@Component({
  selector: 'app-upload-btn',
  templateUrl: './upload-btn.component.html',
  providers: [DialogService,DynamicDialogRef],
  styleUrls: ['./upload-btn.component.css']
})
export class UploadBtnComponent implements OnInit{


  private locationService = inject(LocationService);
  private dialogConfig = inject(DynamicDialogConfig)
  private messageService = inject(MessageService);

  public imgTemporal: any
  public file?: File;


  @Input() imagenSubida?: string;
  public secretUrl: string = ''

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
    const id = this.dialogConfig.data.id._id
    this.locationService.uploadImageFacto(this.file).subscribe( (response) => {
      const objectTest = {image: response.secure_url}
      this.deleteImageBeforeUpdate(id);
      if(!id) return
    this.locationService.updatedLocationImageUserRefact(id, objectTest).subscribe( ()=> {
      })
      
    })

  }

  deleteImageBeforeUpdate(id: string){
    this.locationService.getLocationById(id).subscribe( result =>{
      const SecretUrl = result.image
      const SecretUrlArray = SecretUrl.split('/')
      const SecretUrlKeyCut = SecretUrlArray[SecretUrlArray.length-1]
      const publicName = SecretUrlKeyCut.split('.')[0]
      this.locationService.deleteOldImage(publicName).subscribe()
    })
  }


  getImage(){
    const id = this.dialogConfig.data.id
    this.locationService.getLocationById(id._id).subscribe( result => {

      if( result.image ) {
        this.secretUrl = result.image
      }else{
        this.secretUrl = 'https://res.cloudinary.com/dlsxaumhg/image/upload/v1706655150/locationsFolder/s05n8sxhx47ye6jbwjkl.png'
      }
        
    })
    
  }

  ngOnInit(): void {
    this.getImage();
  }

  clientImageUpdateMessage(){
    this.messageService.add({ severity: 'success', summary: 'Completado', detail: 'imagen Actualizada Correctamente' });
  }



}
