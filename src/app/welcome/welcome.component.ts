import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { VerifiedUserService } from '../shared/verified-users.service';
import { STUDENTLEADERS } from '../student-leaders';
import { SignInErrorComponent } from '../error/sign-in-error.component'

import { AuthService } from '../shared/auth.service';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html'
})

export class WelcomeComponent implements OnInit {
  user: firebase.User = null;
  topics: FirebaseListObservable<any[]>;

  constructor(
      private auth: AuthService,
      public db: AngularFireDatabase,
      private router: Router,
      private verUser: VerifiedUserService) { }

    writeVerifiedUsers() {
      this.db.object('VerifiedUsers').set(STUDENTLEADERS);
    }

  ngOnInit() {
    this.auth.getAuthState().subscribe(
      (user) => this.user = user);
      this.writeVerifiedUsers();
  }

  loginWithGoogle() {
    this.auth.loginWithGoogle().then((result) => {
      if (this.auth.getCurrentUser() != null) {
        for (var item in STUDENTLEADERS) {
          if (this.auth.getCurrentUser().uid === item) {
            this.router.navigateByUrl('dashboard');
          }
          this.router.navigateByUrl('error');
        }
      }
    });
  }
}
