import { Component, inject } from '@angular/core';
import { LocationService } from 'src/app/maps/services/locations.service';

@Component({
  selector: 'app-upload-btn',
  templateUrl: './upload-btn.component.html',
  styleUrls: ['./upload-btn.component.css']
})
export class UploadBtnComponent {

  private locationService = inject(LocationService);



  public file?: File;
  public imagenSubida?: string;

  uploadFile(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    let file: File = element.files![0];
    if (file) {
      console.log("FileUpload -> files", file);
      this.file = file
    
      console.log('Hola soy file', file)
    }
}

  

  upImage(){
    if(!this.file) return
    this.locationService.uploadImage(this.file).subscribe( (response) => {
      (this.imagenSubida = response.secure_url)
    })
  }

}
