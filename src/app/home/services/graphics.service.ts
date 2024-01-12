//import { LocationsResponse } from './../interfaces/locationsResponse';
import { Injectable, inject } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';
import { VentasResponse } from "../interfaces/ventas.interface";



@Injectable({
	providedIn: 'root'
  })
  export class GraphicsService {

	private readonly baseUrl: string = environment.baseUrl;
	url = `${this.baseUrl}/graphics/`
	private http = inject(HttpClient);


	getVentas(): Observable<VentasResponse[]>{

		let headers = new HttpHeaders().set('Content-Type', 'application/json')

		return	this.http.get<VentasResponse[]>(this.url+'list',{headers})
	}

  }