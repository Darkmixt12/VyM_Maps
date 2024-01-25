import { Component, inject } from '@angular/core';
import { LocationService } from 'src/app/maps/services/locations.service';

@Component({
  selector: 'app-upload-btn',
  templateUrl: './upload-btn.component.html',
  styleUrls: ['./upload-btn.component.css']
})
export class UploadBtnComponent {

  private locationService = inject(LocationService);
  public imagenSubir!: FileList;



  uploadFile(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList) {
      console.log("FileUpload -> files", fileList);
      this.imagenSubir = fileList
    
    }
    
    
}

  upImage(){
    console.log(this.imagenSubir)
    this.locationService.uploadImage(this.imagenSubir).subscribe(console.log)
  }

}
