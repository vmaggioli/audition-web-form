import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class LoginGuardStandard implements CanActivate {

  constructor(private auth: AuthService,
              private router: Router) {}

  canActivate() {
    if (this.auth.isLoggedInStandard()) {
      return true;
    }
    this.router.navigateByUrl('');
    return false;
  }
}
