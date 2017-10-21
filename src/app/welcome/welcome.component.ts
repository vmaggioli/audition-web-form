import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { VerifiedUsersService } from '../shared/verified-users.service';
import { SignInErrorComponent } from '../error/sign-in-error.component'
import { MatButton } from '@angular/material';
import { AuthService } from '../shared/auth.service';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html'
})

export class WelcomeComponent implements OnInit {
  user: firebase.User = null;
  topics: AngularFireList<any[]>;
  verifiedUsers: Observable<any[]>;

  constructor(
      private auth: AuthService,
      public db: AngularFireDatabase,
      private router: Router,
      private verUser: VerifiedUsersService) { }

  ngOnInit() {
    this.auth.getAuthState().subscribe(
      (user) => this.user = user);
    this.verifiedUsers = this.verUser.getVerifiedUsers().valueChanges();
    }

  loginWithGoogle() {
    this.auth.loginWithGoogle().then((result) => {
      this.router.navigateByUrl('dashboard');
      // this.verifiedUsers.forEach(data => {
      //   var check = false;
      //   for (var item of data) {
      //     if (item.uid === this.auth.getCurrentUser().uid) {
      //       check = true;
      //       break;
      //     }
      //   }
      //   if (check) {
      //     this.router.navigateByUrl('dashboard');
      //   } else  {
      //     this.router.navigateByUrl('error');
      //   }
      // });
    });
  }
}
