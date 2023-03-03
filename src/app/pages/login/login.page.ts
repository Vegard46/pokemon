import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.css']
})
export class LoginPage {

  constructor (
    private readonly loginService: LoginService,
    private readonly router: Router,
    private readonly userService: UserService
  ) { }

  /**
   * On submit of the login button we call the login method of the service
   * that either logs in or creates a new user based on the inputted username
   * @param username The username of the user retrieved from the component input
   */
  public loginSubmit(username: string): void {
    console.log(username);
    this.loginService.login(username)
      .subscribe({
        next: (user: User) => {
          console.log(user);
          this.userService.user = user;
          this.router.navigateByUrl("/trainer");
        },
        error: () => {
        }
      })
  }
}
