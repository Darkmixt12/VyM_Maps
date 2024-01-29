import { AfterViewInit, Component, Input, OnChanges, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocationsResponse } from 'src/app/maps/interfaces/locationsResponse';
import { LocationService } from 'src/app/maps/services/locations.service';

@Component({
  selector: 'app-client-edit-page',
  templateUrl: './client-edit-page.component.html',
  styleUrls: ['./client-edit-page.component.css']
})
export class ClientEditPageComponent implements OnChanges {

  private fb = inject(FormBuilder)
  private locationService = inject(LocationService);

  @Input() imgProfile?: string;
  @Input() itemHijo?: LocationsResponse ;
  
  public test = "https://res.cloudinary.com/dlsxaumhg/image/upload/v1706303599/locationsFolder/oljyhijjaiict3vtl8ie.jpg"
  constructor(){}

  public myForm: FormGroup = this.fb.group({
    title: ['', [Validators.required]],
    provincia: ['', Validators.required],
    description: ['example location place', [Validators.required]],
    
    agente: ['', Validators.required],
    email: ['example@gmail.com', [Validators.required, Validators.email]],
    telefono: ['98741532', [Validators.required, Validators.min(8)]]
})


ngOnChanges(){
  this.patchForm()
}

patchForm(): void {

  const id = localStorage.getItem('id')
  this.locationService.getLocationById(id!).subscribe( result => {
   this.myForm.patchValue({ 
    title: result.title,
    provincia: result.provincia,
    description: result.description,
    email: result.email,
    telefono: result.telefono,
    agente: result.agente
   })




  })

}


}