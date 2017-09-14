import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/auth.service';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Purdue AAMB Selections';
  user = null;
  topics: FirebaseListObservable<any[]>;
  public disabledLogin = false;

  constructor(
      private auth: AuthService,
      public db: AngularFireDatabase) { }

  ngOnInit() {
    this.auth.getAuthState().subscribe(
      (user) => this.user = user);
  }


  loginWithGoogle() {
    if (this.auth.getCurrentUser() != null) {
      this.disabledLogin = true;
      return;
    }
    this.auth.loginWithGoogle().then((result) => {
      if (result != null) {
        this.disabledLogin = true;
      } else {
        this.disabledLogin = false;
      }
      this.topics = this.db.list('/topics');
    });
  }

  logoutWithGoogle() {
    this.auth.logoutWithGoogle().then((result) => {
      if (result != null) {
        this.disabledLogin = true;
      } else {
        this.disabledLogin = false;
      }
    });

  }
}
