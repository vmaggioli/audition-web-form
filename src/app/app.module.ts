import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DynamicModule } from './dynamic-module';
import { MatInputModule, MatButtonModule, MatSelectModule, MatAutocompleteModule,
  MatOptionModule, MatRadioModule, MatTabsModule, MatTableModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { LoginGuard } from './shared/login-guard.module';
import { AppComponent } from './app.component';
import { JudgementComponent } from './judgement/judgement.component';
import { LeaderAuditioneeComponent } from './leader-auditionee/leader-auditionee.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { SignInErrorComponent } from './error/sign-in-error.component';
import { TabPageComponent } from './tab-page/tab-page.component';
import { ReviewComponent } from './review/review.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AuthService } from './shared/auth.service';
import { environment } from '../environments/environment';
import * as firebase from 'firebase';
import { VerifiedUsersService } from './shared/verified-users.service';
import { StudentLeadersService } from './shared/student-leaders.service';
import { AuditioneesService } from './shared/auditionees.service';
import { CommentsService } from './shared/comments.service';

@NgModule({
  declarations: [
    AppComponent,
    LeaderAuditioneeComponent,
    JudgementComponent,
    WelcomeComponent,
    SignInErrorComponent,
    TabPageComponent,
    ReviewComponent,
  ],
  entryComponents: [ JudgementComponent ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase, 'audition-web-form'),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    DynamicModule.withComponents([JudgementComponent]),
    MatButtonModule,
    FormsModule,
    MatSelectModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatOptionModule,
    MatInputModule,
    MatRadioModule,
    MatTabsModule,
    MatTableModule,
  ],
  providers: [
    AuthService,
    LoginGuard,
    VerifiedUsersService,
    StudentLeadersService,
    AuditioneesService,
    CommentsService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
