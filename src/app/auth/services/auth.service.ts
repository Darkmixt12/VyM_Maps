import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environments';

import { AuthStatus, LoginResponse, User, CheckTokenResponse } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // todo privado solo en el servicio
  private readonly baseUrl: string = environment.baseUrl;
  private http = inject(HttpClient);

  private _currentUser = signal<User | null>(null)
  private _authStatus = signal<AuthStatus>( AuthStatus.checking)

  // todo en el mundo exterior de esta manera nadie podra cambiar los valores de current y auth
  
  public currentUser = computed( () => this._currentUser()) // regresa el valor que tenga el current user
  public authStatus = computed( () => this._authStatus())

  constructor() { 
    this.checkAuthStatus().subscribe();
  }

  private setAuthentication( user: User, token: string): boolean{
    this._currentUser.set ( user )
    this._authStatus.set( AuthStatus.authenticated)
    localStorage.setItem('token', token)

    return true
  }

  login(email: string, password: string): Observable<boolean>{

      const url = `${this.baseUrl}/auth/login` // direccion a donde se va a mandar el post del login
      const body =  {email, password} // este es el body de la peticion http que se va a enviar al backend 

      return this.http.post<LoginResponse>(url, body).pipe(
        map( ({user, token}) => this.setAuthentication(user, token)),

        // TODO ERRORES
        catchError( err => throwError( () => err.error.message))
      )  
  }

  checkAuthStatus(): Observable<boolean>{
    const url = `${this.baseUrl}/auth/check-token`;
    const token = localStorage.getItem(`token`)

    if( !token)  {
      this.onLogout()
      return of(false);}

    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${ token }`)

      return this.http.get<CheckTokenResponse>(url, {headers}).pipe( 
        map( ({ token, user}) => this.setAuthentication(user, token)),
        catchError(() => {
          this._authStatus.set( AuthStatus.notAuthenticated)
          return of(false)})
      )
  }

  onLogout(){
    localStorage.removeItem('token');
    this._currentUser.set(null);
    this._authStatus.set( AuthStatus.notAuthenticated)
  }




}
