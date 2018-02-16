import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {

  loggedIn = false;

  constructor(private db: AngularFireDatabase,
              private router: Router) { }

  login(username: string, password: string) {
    const user: Observable<any> = this.db.object('User').valueChanges();
    user.forEach(data => {
      if (username === data.username && password === data.password) {
        this.loggedIn = true;
        this.router.navigateByUrl('dashboard');
      } else {
        this.router.navigateByUrl('');
      }
    });
  }
  
}
