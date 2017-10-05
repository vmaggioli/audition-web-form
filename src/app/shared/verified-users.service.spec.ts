import { TestBed, inject, async } from '@angular/core/testing';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { AuthService } from './auth.service';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { VerifiedUsersService } from './verified-users.service';
import { VERIFIEDUSERS } from '../verified-users';
import { WelcomeComponent } from '../welcome/welcome.component';
import { SignInErrorComponent } from '../error/sign-in-error.component';

describe('VerifiedUserService', () => {
    beforeEach(() => {
        const firebaseConfig = {
          apiKey: "AIzaSyAmDhvEdGwMZ6SuZKibrUAVHCpR0DFpnXo",
          authDomain: "audition-web-form.firebaseapp.com",
          databaseURL: "https://audition-web-form.firebaseio.com",
          projectId: "audition-web-form",
          storageBucket: "audition-web-form.appspot.com",
          messagingSenderId: "32575069764"
      }

      TestBed.configureTestingModule({
          providers: [
              AngularFireAuth,
              VerifiedUsersService,
              AuthService
          ],
          imports: [
            AngularFireModule.initializeApp(firebaseConfig),
            AngularFireDatabaseModule
           ]
      });
    });

    it('verify list is valid', inject([VerifiedUsersService, AngularFireDatabase], (service: VerifiedUsersService, db: AngularFireDatabase) => {
      var check = true;
      var list = service.getVerifiedUsers();
      list.forEach((uids) => {
        for (var uid in uids) {
          if (VERIFIEDUSERS.indexOf(uid) == -1) {
            check = false;
            break;
          }
        }
      });
      expect(check).toBeTruthy();
    }));

});
