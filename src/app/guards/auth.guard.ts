import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private readonly router: Router,
    private readonly userService: UserService
  ) { }

  /**
   * Will redirect the user to the login page if no user is found
   * in the sessionStorage (user is not "logged in")
   * @param route 
   * @param state 
   * @returns Boolean value based on if the user is logged in or not
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.userService.user) {
      return true;
    } else {
      this.router.navigateByUrl("/login");
      return false;
    }
  }
  
}
