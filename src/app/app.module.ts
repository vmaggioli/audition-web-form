import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DynamicModule } from './dynamic-module';

import { AppRoutingModule } from './app-routing.module';
import { LoginGuard } from './shared/login-guard.module';
import { AppComponent } from './app.component';
import { JudgementComponent } from './judgement/judgement.component';
import { LeaderAuditioneeComponent } from './leader-auditionee/leader-auditionee.component';
import { WelcomeComponent } from './welcome/welcome.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AuthService } from './shared/auth.service';
import { environment } from '../environments/environment';
import * as firebase from 'firebase';

@NgModule({
  declarations: [
    AppComponent,
    LeaderAuditioneeComponent,
    JudgementComponent,
    WelcomeComponent
  ],
  entryComponents: [JudgementComponent],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase, 'audition-web-form'),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    DynamicModule.withComponents([JudgementComponent])
  ],
  providers: [
    AuthService,
    LoginGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }