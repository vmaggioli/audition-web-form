import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { VerifiedUsersService } from './verified-users.service';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class LoginGuard implements CanActivate {

  constructor(private auth: AngularFireAuth) {}

  canActivate() {
    if (this.auth.auth.currentUser != null) {
      return true;
    }
    return false;
  }
}
