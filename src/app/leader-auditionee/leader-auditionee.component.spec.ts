import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LeaderAuditioneeComponent } from './leader-auditionee.component';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { JudgementComponent } from '../judgement/judgement.component';
import { DynamicModule } from '../dynamic-module';
import { MatOptionModule, MatAutocompleteModule, MatRadioModule, MatSelectModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { StudentLeadersService } from '../shared/student-leaders.service';
import { AuditioneesService } from '../shared/auditionees.service';

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
        MatOptionModule,
        MatAutocompleteModule,
        MatRadioModule,
        MatSelectModule,
        FormsModule,
        AngularFireDatabaseModule,
        AngularFireModule.initializeApp(firebaseConfig),
        DynamicModule.withComponents([JudgementComponent]),
        ReactiveFormsModule,
        BrowserModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule
      ],
      providers: [
        StudentLeadersService,
        AuditioneesService
      ]
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