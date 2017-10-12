import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { JudgementComponent } from './judgement.component';
import { MatRadioModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, NgModel } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';

describe('JudgementComponent', () => {
  let component: JudgementComponent;
  let fixture: ComponentFixture<JudgementComponent>;
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
      declarations: [ JudgementComponent ],
      imports: [
        BrowserModule,
        FormsModule,
        MatRadioModule,
        AngularFireModule.initializeApp(firebaseConfig)
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JudgementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
