import { Component } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.css']
})
export class LoginPage {
  constructor (private readonly loginService: LoginService) { }

  public loginSubmit(username: string): void {
    console.log(username);
    this.loginService.login(username)
      .subscribe({
        next: (user: User) => {
          console.log(user);
        },
        error: () => {
        }
      })
  }
}
