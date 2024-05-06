import { AfterViewInit, Component, Input, OnChanges, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { LocationsResponse } from 'src/app/maps/interfaces/locationsResponse';
import { LocationService } from 'src/app/maps/services/locations.service';
import { ValidatorService } from 'src/app/shared/services/validators.service';

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
  private validatorService = inject(ValidatorService)

  private confirmationService = inject(ConfirmationService)
  private dialogDataId = this.dialogConfig.data.id

  @Input() imgProfile?: string;
  @Input() itemHijo?: LocationsResponse ;
  public title?: string



  
  ref: DynamicDialogRef | undefined;

  public test = "https://res.cloudinary.com/dlsxaumhg/image/upload/v1706303599/locationsFolder/oljyhijjaiict3vtl8ie.jpg"
  


  public myForm: FormGroup = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(36)]],
    provincia: ['', Validators.required],
    description: ['', [Validators.required]],
    agente: ['', Validators.required],
    email: ['', [Validators.required,Validators.pattern(this.validatorService.emailPattern)]],
    telefono: ['', [Validators.required,Validators.pattern('^[0-9]*$'), Validators.minLength(8), Validators.maxLength(8)]],
    whatsApp: [''],
    driveToLocation: [''],
    facebook: [''],
    instagram: [''],
    webPage: [''],
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
    agente: result.agente,
    facebook: result.facebook,
    whatsApp: result.whatsApp,
    instagram: result.instagram,
    webPage: result.webPage,
    driveToLocation: result.driveToLocation
   })
   this.title = result.title

  })


}


updateClient(){
  if(!this.myForm.valid) return this.clientDataUpdateMessage('error', 'Error', 'Formulario Incorrecto, no se ha podido actualizar el cliente');
  this.locationService.updatedLocationImage(this.dialogDataId._id, this.myForm.value).subscribe();
  console.log(this.myForm.value)
  this.clientDataUpdateMessage('success', 'Completado', 'Cliente actualizado correctamente')

}


clientDataUpdateMessage(estado: string, resumen: string, mensaje: string){
  this.messageService.add({ severity: estado, summary: resumen, detail: mensaje });

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

isValidField(field: string){
  return this.validatorService.isValidField( this.myForm, field)
}

getFieldError(field:string, form: FormGroup): string | null{
  
  return this.validatorService.getFieldErrorClient(field, form)
}


}