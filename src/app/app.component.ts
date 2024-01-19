import { Component, OnInit, computed, effect, inject } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
import { AuthStatus } from './auth/interfaces/auth-status.enum';
import { Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {


  constructor(private primengConfig: PrimeNGConfig) {}


  ngOnInit() {
    this.primengConfig.ripple = true;
  }


  private authService = inject(AuthService);
  private router = inject(Router);
  
  public finishedAuthCheck = computed<boolean>( () => {

    if( this.authService.authStatus() === AuthStatus.checking ) {
      return false;
    }

    return true;

  })

  public authStatusChangedEffect = effect( () => {

    switch( this.authService.authStatus() ) {

      case AuthStatus.checking:
      return;

      case AuthStatus.authenticated:
        this.router.navigateByUrl('/home/inicio')
        return;

      case AuthStatus.notAuthenticated:
        this.router.navigateByUrl('/auth/login')
      return;
      
    }
      
  })

}


