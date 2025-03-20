import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { Injectable } from "@angular/core";
import { AuthService } from '../services/auth.service';

@Injectable({ 
  providedIn: 'root' 
})

export class AuthGuard implements CanActivate {

  constructor (private AuthService: AuthService, private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    if (this.AuthService.isAuthenticated()) {
      return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }


   
  }
  
}