import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthLoggedInGuard implements CanActivate {

  constructor(
    private readonly router: Router,
    private readonly userService: UserService
  ) { }

  /**
   * Will redirect the user to the trainer page if the user is already logged in
   * preventing the user from accessing the login page without logging out
   * @param route 
   * @param state 
   * @returns Boolean value based on if the user is logged in or not
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.userService.user === undefined) {
      return true;
    } else {
      this.router.navigateByUrl("/trainer");
      return false;
    }
  }
  
}
