import { TestBed, inject } from '@angular/core/testing';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { AuthService } from './auth.service';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

describe('AuthService', () => {
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
        AuthService,
        AngularFireAuth,
      ],
      imports: [ AngularFireModule.initializeApp(firebaseConfig) ]
    });
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));
});
