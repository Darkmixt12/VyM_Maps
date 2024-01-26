import { LocationsResponse } from './../interfaces/locationsResponse';
import { Injectable, inject } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';
import { CloudinaryResponse } from '../interfaces/cloyudinaryResponse';


@Injectable({
	providedIn: 'root'
  })
  export class LocationService {

	private readonly baseUrl: string = environment.baseUrl;
	url = `${this.baseUrl}/locations/`
	private http = inject(HttpClient);

	urlImg = `${this.baseUrl}/files/cloudinary`


	registerLocation(myForm: LocationsResponse ): Observable<LocationsResponse>{
		const params = JSON.stringify(myForm)
		const headers = new HttpHeaders().set('Content-Type', 'application/json')

		return this.http.post<LocationsResponse>(this.url+'register', params, {headers})
	}

	getLocations(): Observable<LocationsResponse[]>{

		let headers = new HttpHeaders().set('Content-Type', 'application/json')

		return	this.http.get<LocationsResponse[]>(this.url+'list',{headers})
	}

	getLocationById(id: string): Observable<LocationsResponse>{

		let headers = new HttpHeaders().set('Content-Type', 'application/json')
		return	this.http.get<LocationsResponse>(this.url+'place/'+id,{headers})
	}

	deleteById(id: string | undefined): Observable<LocationsResponse>{
		return this.http.delete<LocationsResponse>(this.url+'delete/'+id)
	}





	uploadImage(img: File): Observable<CloudinaryResponse>  {
		console.log('wenas soy el service',img)
		const formData = new FormData();
		formData.append('file', img, img.name)
		console.log('soy el formulario',formData)
	
		return this.http.post<CloudinaryResponse>(this.urlImg, formData)
	}
  }