import { LocationsResponse } from './../interfaces/locationsResponse';
import { Injectable, inject } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';
import { CloudinaryResponse } from '../interfaces/cloyudinaryResponse';
import { User } from 'src/app/auth/interfaces';


@Injectable({
	providedIn: 'root'
  })
  export class LocationService {

	private readonly baseUrl: string = environment.baseUrl;
	url = `${this.baseUrl}/locations/`
	private http = inject(HttpClient);

	urlImg = `${this.baseUrl}/files/`
	urlUser = `${this.baseUrl}/auth/`


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


	//TODO: REFACTORIZAR TODO ESTO

	uploadImage(img: File): Observable<CloudinaryResponse>  {
		const formData = new FormData();
		formData.append('file', img, img.name)
		return this.http.post<CloudinaryResponse>(this.urlImg+'cloudinary', formData)
	}

	updatedLocationImage(id: string, myForm : Object | LocationsResponse ) : Observable<Object | LocationsResponse>{
	
		let headers = new HttpHeaders().set('Content-Type', 'application/json')
		return this.http.patch<Object | LocationsResponse>(this.url+'update/'+id, myForm, {headers})
	}

	deleteOldImage(imagePublicName : string){
		return this.http.post(this.urlImg+'cloudinary/delete/'+imagePublicName, imagePublicName )
	}

	//TODO: REFACTORIZAR TODO ESTO

	uploadImageUser(img: File): Observable<CloudinaryResponse>  {
		const formData = new FormData();
		formData.append('file', img, img.name)
		return this.http.post<CloudinaryResponse>(this.urlImg+'cloudinaryUser', formData)
	}


	updatedLocationImageUser(id: string, myForm : Object | User ) : Observable<Object | User>{
	
		let headers = new HttpHeaders().set('Content-Type', 'application/json')
		return this.http.patch<Object | User>(this.urlUser+'updateUser/'+id, myForm, {headers})
	}


	deleteOldImageUser(imagePublicName : string){
		return this.http.post(this.urlImg+'cloudinaryUser/delete/'+imagePublicName, imagePublicName )
	}
  }