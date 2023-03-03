import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageKeys } from 'src/app/enums/storage-keys.enum';
import { UserService } from 'src/app/services/user.service';
import { StorageUtil } from 'src/app/utils/storage.util';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  get router(): Router {
    return this._router;
  }

  constructor(
    private readonly _router: Router,
    private readonly userService: UserService
  ) { }

  public logout(): void {
    StorageUtil.delete(StorageKeys.User);
    this.userService.user = undefined;
  }
}
