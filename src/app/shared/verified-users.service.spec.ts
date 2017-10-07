import { TestBed, inject, async } from '@angular/core/testing';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { AuthService } from './auth.service';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { VerifiedUsersService } from './verified-users.service';
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

    it('verify list holds valid id', inject([VerifiedUsersService], (service: VerifiedUsersService) => {
      var list = service.getVerifiedUsers('oA7Gf8e2iPYDpzXMdH3ete3oFFW2');
      list.forEach(data => {
          if (data.length == 0) {
              expect(false).toBeTruthy();
          } else {
              expect(true).toBeTruthy();
          }
      });
    }));

    it('should deny bad id', inject([VerifiedUsersService], (service: VerifiedUsersService) => {
        var list = service.getVerifiedUsers('Kappa');
        list.forEach(data => {
            if (data.length == 0) {
                expect(true).toBeTruthy();
            } else {
                expect(false).toBeTruthy();
            }
        });
    }));
});
