import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { VerifiedUsersService } from '../shared/verified-users.service';
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
      private verUser: VerifiedUsersService) { }

  ngOnInit() {
    this.auth.getAuthState().subscribe(
      (user) => this.user = user);
  }

  loginWithGoogle() {
    this.auth.loginWithGoogle().then((result) => {
      var list = this.verUser.getVerifiedUsers(this.auth.getCurrentUser().uid);
      list.forEach(data => {
        if (data.length == 0) {
            this.router.navigateByUrl('error');
        } else {
          this.router.navigateByUrl('dashboard');
        }
      });
    });
  }
}
