import { Component, OnInit, inject } from '@angular/core';
import Chart from 'chart.js/auto';
import { RenderLocation } from '../descripciones-mapas/descripciones-mapas.component';
import { LocationService } from 'src/app/maps/services/locations.service';
import { LocationsResponse } from 'src/app/maps/interfaces/locationsResponse';
import { GraphicsService } from '../../services/graphics.service';
import { VentasResponse } from '../../interfaces/ventas.interface';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  public lugaresLocalStorage?: RenderLocation[];
  private locationService = inject(LocationService);
  private ventasService = inject(GraphicsService);
  public locationList: LocationsResponse[] = [];
  public VentasAlajuela: VentasResponse[] = [];

  ngOnInit(): void {
    this.donusGrap();
    this.linesGrap();
    this.getVentas();
  }
  // readFormLocalStorage() {
  //   const plainMarkersString = localStorage.getItem('locations') ?? '[]';
  //   const plainMarkers = JSON.parse(plainMarkersString);
  //   this.lugaresLocalStorage = plainMarkers;
  // }

  donusGrap() {
    this.locationService.getLocations().subscribe((locations) => {
      if (!locations) return;

      const puntoVenta = [
        ...new Set(locations.map((puntoVenta) => puntoVenta.agente)),
      ];

      const data = {
        labels: puntoVenta,
        datasets: [
          {
            data: puntoVenta.map(
              (currentModel) =>
                locations!.filter(
                  (puntoVenta) => puntoVenta.agente === currentModel
                ).length
            ),
          },
        ],
      };
      new Chart('modelsChart', { type: 'doughnut', data });
    });
  }

  linesGrap() {
    this.locationService.getLocations().subscribe((locations) => {
      if (!locations) return;

      const puntoVenta = [
        ...new Set(locations.map((puntoVenta) => puntoVenta.provincia)),
      ];

      const data = {
        labels: puntoVenta,

        datasets: [
          {
            label: 'Clientes por Provincia',
            borderColor: [
              'rgb(255, 99, 132)',
              'rgb(255, 159, 64)',
              'rgb(255, 205, 86)',
              'rgb(75, 192, 192)',
              'rgb(54, 162, 235)',
              'rgb(153, 102, 255)',
              'rgb(201, 203, 207)',
            ],
            borderWidth: 1,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 205, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(201, 203, 207, 0.2)',
            ],
            data: puntoVenta.map(
              (currentModel) =>
                locations!.filter(
                  (puntoVenta) => puntoVenta.provincia === currentModel
                ).length
            ),
          },
        ],
        options: {
          plugins: {
            legend: { position: 'left', align: 'center' },
          },
        },
      };
      new Chart('barsChart', { type: 'bar', data });
    });
  }

  getVentas() {
    this.ventasService.getVentas().subscribe((arrayVentas) => {
      const ventasArray = arrayVentas;
      console.log(ventasArray.filter( x => x.provCliente === 'Alajuela'))

      let provincias = {
        'Limon': 0,
        'Heredia': 0,
        'Cartago': 0,
        'Alajuela': 0,
        'San Jose': 0,
        'Guanacaste': 0,
        'Puntarenas': 0,
      };

      const ventasArray2 = arrayVentas.map((x:any) => {
        provincias[x.provCliente as keyof typeof provincias ] += parseInt(parseFloat(x.importe).toFixed(3))
        
        return ''
      });
      console.log(provincias)
      // como filtrar por provincia
      // como sumar todo el importe en base en a la pronvicia
    });
  }
}
