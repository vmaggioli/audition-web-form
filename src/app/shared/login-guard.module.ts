import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class LoginGuard implements CanActivate {

  constructor(private authService: AuthService,
              private router: Router) {}

  canActivate() {
    if (this.authService.getCurrentUser() == null) {
      this.router.navigateByUrl('welcome');
      return false;
    }
    return true;
  }
}
