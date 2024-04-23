import { Component, OnInit, inject } from '@angular/core';
import Chart from 'chart.js/auto';

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
  private locationService = inject(LocationService);
  private ventasService = inject(GraphicsService);
  public locationList: LocationsResponse[] = [];
  public VentasAlajuela: VentasResponse[] = [];
  public intentodeResult: number = 0;
  public data: any;
  public options: any;
  public basicData: any;
  public basicOptions: any;
  public dataDonut: any

  ngOnInit(): void {
    this.linesGrap();
    this.chartjs();
    this.AgentxClient();
  }


  AgentxClient(){
    this.locationService.getLocations().subscribe((locations) => {
      if (!locations) return;

      const puntoVenta = [
        ...new Set(locations.map((puntoVenta) => puntoVenta.agente)),
      ];


    this.dataDonut = {
      labels: puntoVenta,
      datasets: [
        {
          data: puntoVenta.map(
            (currentModel) =>
              locations!.filter(
                (puntoVenta) => puntoVenta.agente === currentModel
              ).length
          ),
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)',
            'rgb(242, 229, 0)',
            'rgb(229, 30,  83)',
            'rgb(240, 153,  153)',
            'rgb(51, 87, 163)',
            'rgb(98, 165, 48)',
            'rgb(149, 32, 130)',
            'rgb(249, 180, 16)',
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
            'rgb(242, 229, 0, 0.2)',
            'rgb(229, 30,  83, 0.2)',
            'rgb(240, 153,  153, 0.2)',
            'rgb(51, 87, 163, 0.2)',
            'rgb(98, 165, 48, 0.2)',
            'rgb(149, 32, 130, 0.2)',
            'rgb(249, 180, 16, 0.2)',
          ],
        },
      ]
  };


  this.options = {
      cutout: '60%',
      plugins: {
          legend: {
              labels: {
                color: 'white',
                font: {
                  size: 15 
                }
             
              }
          }
      }
  };

  })
}



  /*  ESTE ES EL GRAFICO DE CLIENTES POR PROVINCIA */

  linesGrap() {
    this.locationService.getLocations().subscribe((locations) => {  // llama la info del backend
      if (!locations) return;


      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');
      const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
      const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

      const puntoVenta = [
        ...new Set(locations.map((puntoVenta) => puntoVenta.provincia)),  // crea un nuevo array con solo las provincias
      ];
  

        this.data = {
          labels: puntoVenta,
          datasets: [
              {
                  label: 'Clientes por Provincia',
                  data: puntoVenta.map((currentModel) => 
                    locations!.filter((puntoVenta) => puntoVenta.provincia === currentModel).length
                  ),
            borderColor: [
              'rgb(255, 99, 132)',
              'rgb(255, 159, 64)',
              'rgb(255, 205, 86)',
              'rgb(75, 192, 192)',
              'rgb(54, 162, 235)',
              'rgb(153, 102, 255)',
              'rgb(201, 203, 207)',
              'rgb(229, 30,  83)',
              'rgb(240, 153,  153)',
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
              'rgb(229, 30, 83, 0.2)',
              'rgb(240, 153,  153, 0.2)',
            ],
              }
          ]
      };

      this.options = {
        plugins: {
            legend: {
                labels: {
                    color: textColor
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder,
                    drawBorder: false
                }
            },
            x: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder,
                    drawBorder: false
                }
            }
        }
    };

      })
        
}


    chartjs() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');


      this.ventasService.getVentas().subscribe( ventas => {

        let provincias = {
          Limon: 0,
          Heredia: 0,
          Cartago: 0,
          Alajuela: 0,
          'San Jose': 0,
          Guanacaste: 0,
          Puntarenas: 0,
        };
  
        ventas.map((x: any) => {
          provincias[x.provCliente as keyof typeof provincias] += parseFloat(
            x.importe.toFixed(3)
          );
          return '';
        });

        const puntoVenta2 = [
          ...new Set(ventas.map((puntoVenta2) => puntoVenta2.provCliente)),
        ];
  

        
        this.basicData = {
          labels: puntoVenta2,
          datasets: [
              {
                  label: 'Venta Semanal',
                  data: provincias,
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
              }
          ]
      };


      this.basicOptions = {
        plugins: {
            legend: {
                labels: {
                    color: textColor
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    color: 'white'
                    
                },
                grid: {
                    color: surfaceBorder,
                    drawBorder: false
                }
            },
            x: {
                ticks: {
                    color: 'white',
                    font: {
                      size: 14
                    }
                    
                },
                grid: {
                    color: surfaceBorder,
                    drawBorder: false,
                
                }
            }
        }
    };


      })
        
}
  




}
