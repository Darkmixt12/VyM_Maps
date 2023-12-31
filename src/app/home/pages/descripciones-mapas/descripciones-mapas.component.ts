import { AfterViewInit, Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { MarkerBtnComponent } from 'src/app/maps/components/marker-btn/marker-btn.component';
import { LocationArray } from '../../interfaces/Locations';

export interface House {
  title: string;
  description: string;
  lngLat: [number, number];
}

export interface RenderLocation {
  title: string;
  provincia: string;
  description : string;
  lngLat: [number, number]
}

@Component({
  selector: 'app-descri-maps',
  templateUrl: './descripciones-mapas.component.html',
  styleUrls: ['./descripciones-mapas.component.css'],
  providers: [MatDialog]
})
export class DescripcionesMapasComponent implements OnInit{
  constructor(
    public dialog: MatDialog,
    ){}

  public lugaresRender? : RenderLocation[]

  public locations: House[] = [
    {
      title: 'Casa residencial, Canadá',
      description: 'Bella propiedad en Katana, Canadá',
      lngLat: [ -75.92722289474008, 45.280015511264466]
    },
    {
      title: 'Casa de playa, México',
      description: 'Hermosa casa de playa en Acapulco, México',
      lngLat: [ -99.91287720907991, 16.828940930185748]
    },
    {
      title: 'Apartamento, Argentina',
      description: 'Lujoso apartamento en el corazón de Buenos Aires, Argentina',
      lngLat: [ -58.430166677283445, -34.57150108832866 ]
    },
    {
      title: 'Local comercial, España',
      description: 'Local comercial disponible en Madrid, España, cerca de El Jardín Secreto.',
      lngLat: [ -3.7112735618380177, 40.42567285425766 ]
    },
    {
      title: 'Local comercial, España',
      description: 'Local comercial disponible en Madrid, España, cerca de El Jardín Secreto.',
      lngLat: [ -3.7112735618380177, 40.42567285425766 ]
    },
    {
      title: 'Local comercial, España',
      description: 'Local comercial disponible en Madrid, España, cerca de El Jardín Secreto.',
      lngLat: [ -6.7112735618380177, 40.42567285425766 ]
    },
    {
      title: 'Local comercial, España',
      description: 'Local comercial disponible en Madrid, España, cerca de El Jardín Secreto.',
      lngLat: [ -10.7112735618380177, 30.42567285425766 ]
    },
    {
      title: 'Local comercial, España',
      description: 'Local comercial disponible en Madrid, España, cerca de El Jardín Secreto.',
      lngLat: [ -3.7112735618380177, 40.42567285425766 ]
    },
    {
      title: 'Estadio la Sabana',
      description: 'Local comercial disponible en Madrid, España, cerca de El Jardín Secreto.',
      lngLat: [-84.10773189062814,9.93690487667125 ]

    }

    
  ]
  
  ngOnInit() {
    this.readFormLocalStorage()
  }

  readFormLocalStorage(){
    const plainMarkersString = localStorage.getItem('locations') ?? '[]'
    const plainMarkers = JSON.parse(plainMarkersString)
    this.lugaresRender = plainMarkers
  }
  
  

}