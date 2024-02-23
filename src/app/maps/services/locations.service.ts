import { LocationsResponse } from './../interfaces/locationsResponse';
import { Injectable, inject } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';
import { CloudinaryResponse } from '../interfaces/cloyudinaryResponse';
import { User } from 'src/app/auth/interfaces';
import { ImageUpdate } from '../interfaces/imageUpdate';


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


		//TODO: SERVICIOS PARA SUBIDA DE IMAGENES CLIENTE Y USUARIO

	//TODO: REFACTORIZAR TODO ESTO

	updatedLocationImage(id: string, myForm : Object | LocationsResponse ) : Observable<Object | LocationsResponse>{
	
		let headers = new HttpHeaders().set('Content-Type', 'application/json')
		return this.http.patch<Object | LocationsResponse>(this.url+'update/'+id, myForm, {headers})
	}
	updatedLocationImageUser(id: string, myForm : Object | User ) : Observable<Object | User>{
	
		let headers = new HttpHeaders().set('Content-Type', 'application/json')
		return this.http.patch<Object | User>(this.urlUser+'updateUser/'+id, myForm, {headers})
	}


	//! RE FACTORIZACION DE LA 6 FUNCIONES 

	upImage(img: File, nombre?: string): Observable<CloudinaryResponse>  {
		const formData = new FormData();
		formData.append('file', img, img.name)

		if(nombre) {
			return this.http.post<CloudinaryResponse>(this.urlImg+'cloudinaryUser', formData)
		}
			return this.http.post<CloudinaryResponse>(this.urlImg+'cloudinary', formData)


	}

	updateImage(id: string, myForm : ImageUpdate ) : Observable<User | LocationsResponse>{
		
		const {name, image} = myForm
		const formImage = { image: image}
		let headers = new HttpHeaders().set('Content-Type', 'application/json')


		if(name){
			return this.http.patch<User>(this.urlUser+'updateUser/'+id, formImage, {headers})
		}
			return this.http.patch<LocationsResponse>(this.url+'update/'+id, formImage, {headers})
	}


	deleteOldImageFact(imagePublicName : ImageUpdate){
		const {name, image} = imagePublicName
		if(name){
			return this.http.post(this.urlImg+'cloudinaryUser/delete/'+image, image )
		}
		return this.http.post(this.urlImg+'cloudinary/delete/'+image, image )
	}
  }