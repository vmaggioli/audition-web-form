import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { VerifiedUsersService } from '../shared/verified-users.service';
import { MatButton } from '@angular/material';
import { AuthService } from '../shared/auth.service';
import { AngularFireDatabase, AngularFireAction } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html'
})

export class WelcomeComponent implements OnInit {

  constructor(
      private auth: AuthService,
      private router: Router,
      private verUser: VerifiedUsersService,
      private afAuth: AngularFireAuth) { }

  ngOnInit() {

  }

  loginWithGoogle() {
    this.auth.loginWithGoogle().then(() => {
      const verified = this.verUser.getVerifiedUsers();
      verified.forEach((data) => {
        const currUid = this.afAuth.auth.currentUser.uid;
        for (const uid of Object.values(data)) {
          if (uid === currUid) {
            this.router.navigateByUrl('dashboard');
          }
        }
      });
    });
  }
}
