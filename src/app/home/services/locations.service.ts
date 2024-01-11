import { Injectable, inject } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environments';
import { LocationsResponse } from "../interfaces/newLocation";


@Injectable({
	providedIn: 'root'
  })
  export class LocationService {


	private readonly baseUrl: string = environment.baseUrl;
	url = `${this.baseUrl}/locations/`
	private http = inject(HttpClient);


	registerLocation(myForm: LocationsResponse ): Observable<LocationsResponse>{
		const params = JSON.stringify(myForm)
		const headers = new HttpHeaders().set('Content-Type', 'application/json')

		return this.http.post<LocationsResponse>(this.url+'register', params, {headers})
	}

	getLocations(): Observable<LocationsResponse[]>{

		let headers = new HttpHeaders().set('Content-Type', 'application/json')

		return this.http.get<LocationsResponse[]>(this.url+'list',{headers})
			
	}
  }