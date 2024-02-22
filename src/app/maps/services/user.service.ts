import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { UserResponse } from "src/app/home/interfaces/UserResponse";
import { environment } from "src/environments/environments";



@Injectable({
	providedIn: 'root'
  })
  export class UserService {
	private http = inject(HttpClient);
	private readonly url : string =  environment.baseUrl

	updateUser(id: string, form: UserResponse ): Observable<UserResponse>{
		let headers = new HttpHeaders().set('Content-Type', 'application/json')
		return this.http.patch<UserResponse>(this.url+'/auth/updateUser/'+id, form, {headers})
	}

  }