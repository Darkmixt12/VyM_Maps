import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Dialog, DIALOG_DATA, DialogModule} from '@angular/cdk/dialog';
import { House } from '../../pages/descripciones-mapas/descripciones-mapas.component';

@Component({
  selector: 'app-form-ubication',
  templateUrl: './form-ubication.component.html',
  styleUrls: ['./form-ubication.component.css']
})
export class FormUbicationComponent {

  constructor(@Inject(DIALOG_DATA) public location: House){

}
public test?: [number, number]
private fb = inject(FormBuilder)

public myForm: FormGroup = this.fb.group({
    title: ['test1', [Validators.required]],
    description: ['de la calle maestra', [Validators.required]],
    lngLat: [this.test, [Validators.required]],
})


onSubmit(){
  // const locations = Object.values(this.myForm.value)
  // console.log(locations)
  // locations.push(this.location)
  // console.log(this.location)
}

}
