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
  verifiedUsers: FirebaseListObservable<string[]>;

  constructor(
      private auth: AuthService,
      public db: AngularFireDatabase,
      private router: Router,
      private verUser: VerifiedUsersService) { }

  ngOnInit() {
    this.auth.getAuthState().subscribe(
      (user) => this.user = user);
    this.verifiedUsers = this.verUser.getVerifiedUsers();
    this.verifiedUsers.forEach((data) => {
      for (var item of data)
        console.log(data + " : " + item);
    })
  }

  loginWithGoogle() {
    this.auth.loginWithGoogle().then((result) => {
      if (this.auth.getCurrentUser() != null) {
      this.verifiedUsers.forEach((data) => {
          console.log("here");
          console.log(data);
          for (var item in data) {

            console.log(item.toString());
          }
        });
      }
    });
  }
}
