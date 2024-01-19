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
  public intentodeResult: number = 0;

  ngOnInit(): void {
    this.donusGrap();
    this.linesGrap();
    this.getVentas();
    //this.ventaSemanal();
    this.ventaSemanal();
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
    this.locationService.getLocations().subscribe((locations) => {  // llama la info del backend
      if (!locations) return;

      const puntoVenta = [
        ...new Set(locations.map((puntoVenta) => puntoVenta.provincia)),  // crea un nuevo array con solo las provincias
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


      //console.log(ventasArray.filter( x => x.provCliente))

      let provincias = {
        Limon: 0,
        Heredia: 0,
        Cartago: 0,
        Alajuela: 0,
        'San Jose': 0,
        Guanacaste: 0,
        Puntarenas: 0,
      };

      arrayVentas.map((x: any) => {
        provincias[x.provCliente as keyof typeof provincias] += parseFloat(
          x.importe.toFixed(3)
        );
        return '';
      });



      const puntoVenta2 = [
        ...new Set(arrayVentas.map((puntoVenta2) => puntoVenta2.provCliente)),
      ];


      const data = {
        labels: puntoVenta2,

        datasets: [
          {
            label: 'Venta Semanal por Provincia',
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
            data: provincias,
          },
        ],
        options: {
          plugins: {
            legend: { position: 'left', align: 'center' },
          },
        },
      };
      new Chart('ventCharts', { type: 'bar', data });
    });
  }

  ventaSemanal() {
    this.ventasService.getVentas().subscribe((ventasArray) => {
      let fechas = {
        '05/01/2024': 0,
        '04/01/2024': 0,
        '03/01/2024': 0,
        '02/01/2024': 0,
      };

      ventasArray.map((x) => {
        fechas[x.regFecha as keyof typeof fechas] += parseFloat(
          x.importe.toFixed(3)
        );
        return '';
      });

      const diaVenta = [
        ...new Set(ventasArray.map((puntoVenta2) => puntoVenta2.regFecha)),
      ];

      new Chart('acquisitions', {
        type: 'line',
        data: {
          labels: diaVenta.sort(),
          datasets: [
            {
              label: 'Venta Semanal',
              data: fechas,
              tension: 0.1,
            },
          ],
        },
      });
    });
  }
}

//  getgetArrayexample(array:VentasResponse[], fecha:string, result:number): number {

//     array.forEach( n => {
//       if( n.regFecha === fecha){
//         result += n.importe
//       }
//     })
//   return result

//   num2 = this.getgetArrayexample(ventasArray, '02/01/2024', num1);
//   console.log('hola',num2)
//  }

// getVentasByAgente() {
//   this.ventasService.getVentas().subscribe((arrayVentas) => {
//     const ventasArray = arrayVentas;

//     //console.log(ventasArray.filter( x => x.provCliente))

//     let agentes = {
//       'V1': 0,
//       '8': 0,
//       '8G': 0,
//       '14': 0,
//       '19': 0,
//       '23': 0,
//       '26': 0,
//       '28': 0,
//       'O10': 0,
//       '13C': 0,
//       '13F': 0,
//       '25L': 0,
//       '8F': 0,
//       'P10': 0,
//       'TELA': 0,
//       'TELJ': 0,
//       'TELV': 0,
//       '7': 0,
//       '99': 0,

//     };

//     arrayVentas.map((x:any) => {
//       agentes[x.codAgente as keyof typeof agentes ] += parseFloat(x.importe.toFixed(3))
//       return ''
//     });

//     console.log('wenas',agentes,)

//     const puntoVenta2 = [
//       ...new Set(arrayVentas.map((puntoVenta2) => puntoVenta2.codVendedor)),
//     ];
//     const data = {
//       labels: puntoVenta2,

//       datasets:
//       [
//         {
//           label: 'Venta Semanal por Agente',
//           borderColor: [
//             'rgb(255, 99, 132)',
//             'rgb(255, 159, 64)',
//             'rgb(255, 205, 86)',
//             'rgb(75, 192, 192)',
//             'rgb(54, 162, 235)',
//             'rgb(153, 102, 255)',
//             'rgb(201, 203, 207)',
//             'rgba(160, 052, 114)',
//             'rgba(230, 050, 068)',
//             'rgba(049, 102, 080)',
//             'rgba(132, 195, 190)',
//             'rgba(087, 166, 057)',
//             'rgba(037, 034, 027)',
//             'rgba(138, 102, 066)',
//             'rgba(034, 113, 179)',
//             'rgba(228, 160, 016)',
//           ],
//           borderWidth: 1,
//           backgroundColor: [
//             'rgba(255, 99, 132, 0.2)',
//             'rgba(255, 159, 64, 0.2)',
//             'rgba(255, 205, 86, 0.2)',
//             'rgba(75, 192, 192, 0.2)',
//             'rgba(54, 162, 235, 0.2)',
//             'rgba(153, 102, 255, 0.2)',
//             'rgba(201, 203, 207, 0.2)',
//             'rgba(160, 052, 114, 0.2)',
//             'rgba(230, 050, 068, 0.2)',
//             'rgba(049, 102, 080, 0.2)',
//             'rgba(132, 195, 190, 0.2)',
//             'rgba(087, 166, 057, 0.2)',
//             'rgba(037, 034, 027, 0.2)',
//             'rgba(138, 102, 066, 0.2)',
//             'rgba(034, 113, 179, 0.2)',
//             'rgba(228, 160, 016, 0.2)',
//           ],
//           data: agentes,
//         },
//       ],
//       options: {
//         plugins: {
//           legend: { position: 'left', align: 'center' },
//         },
//       },
//     };
//     new Chart('acquisitions', { type: 'bar', data });
//   });

// }
