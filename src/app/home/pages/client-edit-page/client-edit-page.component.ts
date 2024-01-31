import { AfterViewInit, Component, Input, OnChanges, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { LocationsResponse } from 'src/app/maps/interfaces/locationsResponse';
import { LocationService } from 'src/app/maps/services/locations.service';

@Component({
  selector: 'app-client-edit-page',
  templateUrl: './client-edit-page.component.html',
  providers: [DialogService,DynamicDialogRef],
  styleUrls: ['./client-edit-page.component.css']
})
export class ClientEditPageComponent implements OnInit {

  private fb = inject(FormBuilder)
  private locationService = inject(LocationService);
  private dialogConfig = inject(DynamicDialogConfig)
  @Input() imgProfile?: string;
  @Input() itemHijo?: LocationsResponse ;
  public title?: string
  
  ref: DynamicDialogRef | undefined;

  public test = "https://res.cloudinary.com/dlsxaumhg/image/upload/v1706303599/locationsFolder/oljyhijjaiict3vtl8ie.jpg"
  


  public myForm: FormGroup = this.fb.group({
    title: ['', [Validators.required]],
    provincia: ['', Validators.required],
    description: ['example location place', [Validators.required]],
    agente: ['', Validators.required],
    email: ['example@gmail.com', [Validators.required, Validators.email]],
    telefono: ['98741532', [Validators.required, Validators.min(8)]]
})

ngOnInit(): void {
  this.patchForm()
}

patchForm(): void {

  const id = this.dialogConfig.data.id
  this.locationService.getLocationById(id._id).subscribe( result => {
   this.myForm.patchValue({ 
    title: result.title,
    provincia: result.provincia,
    description: result.description,
    email: result.email,
    telefono: result.telefono,
    agente: result.agente
   })
   this.title = result.title



  })

}


}