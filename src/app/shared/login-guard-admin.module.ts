import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class LoginGuardAdmin implements CanActivate {

  constructor(private auth: AuthService,
              private router: Router) {}

  canActivate() {
    if (this.auth.isLoggedInAdmin()) {
      return true;
    }
    this.router.navigateByUrl('');
    return false;
  }
}
