import { Component, OnInit, inject } from '@angular/core';
import Chart from 'chart.js/auto';
import { RenderLocation } from '../descripciones-mapas/descripciones-mapas.component';
import { LocationService } from 'src/app/maps/services/locations.service';
import { LocationsResponse } from 'src/app/maps/interfaces/locationsResponse';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  public lugaresLocalStorage?: RenderLocation[];
  private locationService = inject(LocationService);
  public locationList: LocationsResponse[] = [];

  ngOnInit(): void {
    this.donusGrap();
    this.linesGrap();
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
        ...new Set(locations.map((puntoVenta) => puntoVenta.provincia)),
      ];

      const data = {
        labels: puntoVenta,
        datasets: [
          {
            data: puntoVenta.map(
              (currentModel) =>
                locations!.filter(
                  (puntoVenta) => puntoVenta.provincia === currentModel
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
}
