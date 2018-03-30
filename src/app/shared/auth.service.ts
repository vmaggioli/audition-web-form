import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { CookieService } from 'ngx-cookie-service';
import { UsersService } from './users.service';
import * as firebase from 'firebase';

@Injectable()
export class AuthService {

  private loggedIn = false;

  constructor(private router: Router,
              private snackBar: MatSnackBar,
              private cookieService: CookieService,
              private usersService: UsersService) { 
              }
              

  login(username: string, password: string) {
    this.usersService.getStandardUser().then((snapshot) => {
      if (snapshot.val().username === username && snapshot.val().password === password) {
        this.cookieService.set('loggedIn', 'standard');
        this.router.navigateByUrl('dashboard');
        return;
      }
      this.usersService.getAdminUser().then((snapshot2) => {
        if (snapshot2.val().username === username && snapshot2.val().password === password) {
          this.cookieService.set('loggedIn', 'admin');
          this.router.navigateByUrl('review');
          return;
        }
        this.snackBar.open('Invalid login', 'Close', {
          duration: 3000
        });
      });
    });
  }

  logout() {
    this.cookieService.set('loggedIn', '');
    this.router.navigateByUrl('');
  }

  isLoggedInStandard(): boolean {
    return this.cookieService.get('loggedIn') === 'standard';
  }

  isLoggedInAdmin(): boolean {
    return this.cookieService.get('loggedIn') === 'admin';
  }
}
