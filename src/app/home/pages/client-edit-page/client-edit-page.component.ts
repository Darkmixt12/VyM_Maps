import { AfterViewInit, Component, Input, OnChanges, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { LocationsResponse } from 'src/app/maps/interfaces/locationsResponse';
import { LocationService } from 'src/app/maps/services/locations.service';

@Component({
  selector: 'app-client-edit-page',
  templateUrl: './client-edit-page.component.html',
  providers: [DialogService,DynamicDialogRef,ConfirmationService],
  styleUrls: ['./client-edit-page.component.css']
})
export class ClientEditPageComponent implements OnInit {

  private fb = inject(FormBuilder)
  private messageService = inject(MessageService);
  private locationService = inject(LocationService);
  private dialogConfig = inject(DynamicDialogConfig)
  private confirmationService = inject(ConfirmationService)
  private dialogDataId = this.dialogConfig.data.id

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
  this.locationService.getLocationById(this.dialogDataId._id).subscribe( result => {
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


updateClient(){
  if(!this.myForm.valid) return
  this.locationService.updatedLocationImage(this.dialogDataId._id, this.myForm.value).subscribe(console.log)

}


clientDataUpdateMessage(){
  this.messageService.add({ severity: 'success', summary: 'Completado', detail: 'Datos del Cliente Actualizados' });

}


confirm2(event: Event) {
  this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Desea eliminar este Cliente?',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-sm',
      accept: () => {
          this.messageService.add({ severity: 'info', summary: 'Confirmado', detail: 'Elemento Eliminado', life: 3000 });
          this.locationService.deleteById(this.dialogDataId._id).subscribe()

          
      },
      reject: () => {
        
          this.messageService.add({ severity: 'error', summary: 'Rechazado', detail: 'Elemento no Eliminado', life: 3000 });
      }
  });
}

}