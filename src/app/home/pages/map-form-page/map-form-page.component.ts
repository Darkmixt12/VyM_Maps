import { Component, ElementRef, Inject, ViewChild, inject, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LngLat, Map, Marker, Popup } from 'mapbox-gl';
import { LocationArray } from '../../interfaces/Locations';
import { LocationService } from 'src/app/maps/services/locations.service';
import { MessageService } from 'primeng/api';
import { ValidatorService } from 'src/app/shared/services/validators.service';





interface MarkerandColor {
  color: string;
  marker: Marker
}

@Component({
  selector: 'app-map-form-page',
  templateUrl: './map-form-page.component.html',
  providers: [MessageService],
  styleUrls: ['./map-form-page.component.css']
})
export class MapFormPageComponent implements AfterViewInit{


  private fb = inject(FormBuilder)
  private locationService = inject(LocationService);
  private validatorService = inject(ValidatorService);


  public currentMarker: MarkerandColor[] = []
  public test?: LngLat
  public map?: Map;
  public locationsArray : LocationArray[] = []


  @ViewChild('mapDiv')
  mapDivElement!: ElementRef

  private messageService = inject(MessageService);

  public myForm: FormGroup = this.fb.group({
    title: ['testeo', [Validators.required]],
    provincia: ['Alajuela', Validators.required],
    description: ['ninguna', [Validators.required]],
    lngLat: ['-84.17663016743874,9.857752791289585', [Validators.required, Validators.pattern('^[-0-9,.]*$')]],
    agente: ['O10', Validators.required],
    email: ['munozste@hotmail.com', [Validators.required, Validators.pattern(this.validatorService.emailPattern)]],
    telefono: ['98564578', [Validators.required, Validators.minLength(8),]], //Validators.maxLength(8),  Validators.pattern('^[0-9]*$')//]],
    image: ['https://res.cloudinary.com/dlsxaumhg/image/upload/v1708463020/locationsFolder/huqfmwgbwppicvavscxn.jpg'],
    whatsApp: [''],
    facebook: [''],
    instagram: [''],
  })

  ngAfterViewInit(): void {


    this.map = new Map({
      container: this.mapDivElement.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/outdoors-v12', // style URL
      center: [-84.0484498, 9.9495857], // starting position [lng, lat]
      zoom: 7.5, // starting zoom
      });
 
  }

addMarker(lngLat: LngLat){
  if(!this.map) return

  const marker = new Marker({
    color: 'black',
    draggable: true
  })
  .setLngLat( lngLat)
  .addTo(this.map)  

  this.currentMarker.push( {
    color: 'black',
    marker: marker})
  
  marker.on('dragend', ()=>{
   this.test = marker.getLngLat();
  })
}

createMarker(){
  if(!this.map) return

  //const color ='#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));
  const lgnLat = this.map.getCenter()
  this.addMarker(lgnLat)
  
  
}

inputFormValue(){

  if  (!this.test) return
  this.myForm.patchValue({
    lngLat: [this.test.lng,this.test.lat]
  })
}

saveNewLocation(){
  if(this.myForm.invalid) return
  this.locationService.registerLocation(this.myForm.value).subscribe(result=> {
    if (result) {
      //this.myForm.reset()
    } else{
      console.log('error al registrar la nueva ubicacion')
    }
    
  })

}


clientDataUpdateMessage( message: string){
  if(!this.test) {
    this.messageService.add({ severity: 'error', summary: 'Recuerde añadir un marcador y moverlo antes de precionarme', detail: message });
  } else{
    this.messageService.add({ severity: 'success', summary: 'Completado', detail: message });
  }
 

}

isValidField(field: string){
  return this.validatorService.isValidFiel( this.myForm, field)
}

getFieldError(field: string): string | null{

    if( !this.myForm.controls[field] ) return null

    const errores = this.myForm.controls[field].errors || {};


    for (const key of Object.keys(errores)) {
      
      switch( key ) {

        case 'required': 
          return 'Este campo es requerido'

        case 'minlength': 
          return `Minimo ${ errores['minlength'].requiredLength } caracters`
        
        case 'maxlength': 
          return `Maximo ${ errores['maxlength'].requiredLength } caracters`

          case 'pattern': 
          return `El numero de telefono solo puede contener numeros`
      }
    }

    return null
}

}    

