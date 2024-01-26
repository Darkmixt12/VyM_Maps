import { Component, Input, inject } from '@angular/core';
import { LocationService } from 'src/app/maps/services/locations.service';

@Component({
  selector: 'app-upload-btn',
  templateUrl: './upload-btn.component.html',
  styleUrls: ['./upload-btn.component.css']
})
export class UploadBtnComponent {

  private locationService = inject(LocationService);


  public imgTemporal: any
  public file?: File;

  public test: string = "https://res.cloudinary.com/dlsxaumhg/image/upload/v1706303599/locationsFolder/oljyhijjaiict3vtl8ie.jpg"

  @Input() imagenSubida?: string;

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
      console.log(this.imagenSubida)
    })


    
  }

}
