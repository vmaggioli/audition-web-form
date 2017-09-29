import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing'
import { WelcomeComponent } from './welcome.component';
import { AuthService } from '../shared/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import * as firebase from 'firebase/app';

describe('WelcomeComponent', () => {
  let component: WelcomeComponent;
  let fixture: ComponentFixture<WelcomeComponent>;
  const firebaseConfig = {
    apiKey: "AIzaSyAmDhvEdGwMZ6SuZKibrUAVHCpR0DFpnXo",
    authDomain: "audition-web-form.firebaseapp.com",
    databaseURL: "https://audition-web-form.firebaseio.com",
    projectId: "audition-web-form",
    storageBucket: "audition-web-form.appspot.com",
    messagingSenderId: "32575069764"
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WelcomeComponent ],
      imports: [ RouterTestingModule,
        AngularFireModule.initializeApp(firebaseConfig) ],
      providers: [ AuthService,
        AngularFireAuth,
        AngularFireDatabase
       ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(WelcomeComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to AAMB Selections!');
  }));
});
