import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class AuthService {

  private loggedIn = false;

  constructor(private db: AngularFireDatabase,
              private router: Router,
              private snackBar: MatSnackBar) { }

  login(username: string, password: string) {
    const user: Observable<any> = this.db.object('User').valueChanges();
    user.forEach(data => {
      if (username === data.username && password === data.password) {
        this.router.navigateByUrl('dashboard');
        this.loggedIn = true;
      } else {
        this.snackBar.open('Invalid login', 'Close', {
          duration: 3000
        });
      }
    });
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }
}
