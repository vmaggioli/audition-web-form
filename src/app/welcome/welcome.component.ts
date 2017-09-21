import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../shared/auth.service';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html'
})

export class WelcomeComponent implements OnInit {
  title: 'AAMB Selections';
  user = null;
  topics: FirebaseListObservable<any[]>;

  constructor(
      private auth: AuthService,
      public db: AngularFireDatabase,
      private router: Router) { }

  ngOnInit() {
    this.auth.getAuthState().subscribe(
      (user) => this.user = user);
  }

  loginWithGoogle() {
    this.auth.loginWithGoogle().then((result) => {
      if (this.auth.getCurrentUser() != null) {
        this.router.navigateByUrl('dashboard');
      }
    });
  }
}
