import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {
  private authState: Observable<firebase.User>;

  constructor(public afAuth: AngularFireAuth) {  }

  getAuthState(): Observable<firebase.User> {
    return this.authState;
  }

  loginWithGoogle(): Promise<any> {
    return this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logoutWithGoogle(): Promise<any> {
    return this.afAuth.auth.signOut();
  }

  getCurrentUser(): firebase.User {
    return this.afAuth.auth.currentUser;
  }
}
