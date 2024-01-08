import { Injectable, inject } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environments';
import { Location } from "../interfaces/newLocation";


@Injectable({
	providedIn: 'root'
  })
  export class LocationService {


	private readonly baseUrl: string = environment.baseUrl;
	url = `${this.baseUrl}/locations/`
	private http = inject(HttpClient);


	registerLocation(myForm: Location ): Observable<Location>{
		const params = JSON.stringify(myForm)
		const headers = new HttpHeaders().set('Content-Type', 'application/json')

		return this.http.post<Location>(this.url+'register', params, {headers})
	}

	getLocations(): Observable<Location[]>{

		let headers = new HttpHeaders().set('Content-Type', 'application/json')

		return	this.http.get<Location[]>(this.url+'list',{headers})
	}
  }