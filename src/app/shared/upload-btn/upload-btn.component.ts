import { Component, Input, OnInit, inject } from '@angular/core';
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

  public imgTemporal: any
  public file?: File;


  @Input() imagenSubida?: string;
  public secretUrl: string = ''

  uploadFile(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    let file: File = element.files![0];
    if (file) {
      console.log("FileUpload -> files", file);
      this.file = file
    
      console.log('Hola soy file', file)
    }

    //* CREA IMAGEN TEMPORAL A LA HORA DE GUARDAR
    if(!event) return

    const reader = new FileReader();
    const url64 = reader.readAsDataURL(file)

    reader.onloadend = () => {
      this.imgTemporal = reader.result
    }

}

  

  upImage(){

    if(!this.file) return
    this.locationService.uploadImage(this.file).subscribe( (response) => {
      (this.imagenSubida = response.secure_url)
      this.locationService.updatedLocation()
      console.log(this.imagenSubida)
    })

  }

  saveImage(){
    if(!this.imagenSubida) return 
    const id = this.dialogConfig.data.id
    this.locationService.updatedLocation(id, this.imagenSubida).subscribe()
  }

  getImage(){
    const id = this.dialogConfig.data.id
    this.locationService.getLocationById(id!).subscribe( result => {

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



}
