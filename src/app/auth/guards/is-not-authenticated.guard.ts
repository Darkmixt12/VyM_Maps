import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { AuthStatus } from '../interfaces';

export const isNotAuthenticatedGuard: CanActivateFn = (route, state) => {

  // const url = state.url
  // localStorage.setItem('url', url)

  // console.log('ISaUTHENTICATEDguard')
  // console.log({route, state})

  const authService = inject( AuthService)
  const router = inject( Router );
  
  if( authService.authStatus() === AuthStatus.authenticated){
    router.navigateByUrl('/home/inicio')
    return false;
  }

  return true ;
};
