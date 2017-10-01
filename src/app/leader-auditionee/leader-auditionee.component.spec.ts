import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LeaderAuditioneeComponent } from './leader-auditionee.component';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { JudgementComponent } from '../judgement/judgement.component';
import { MdRadioButton, MdRadioGroup } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, NgModel } from '@angular/forms';
import { DynamicModule } from '../dynamic-module';

describe('LeaderAuditioneeComponent', () => {
  let component: LeaderAuditioneeComponent;
  let fixture: ComponentFixture<LeaderAuditioneeComponent>;
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
      declarations: [
         LeaderAuditioneeComponent,
         JudgementComponent
       ],
      imports: [
        RouterTestingModule,
        AngularFireModule.initializeApp(firebaseConfig),
        FormsModule,
        BrowserModule,
        DynamicModule.withComponents([JudgementComponent])
      ],
      providers: [ AngularFireDatabase ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaderAuditioneeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
