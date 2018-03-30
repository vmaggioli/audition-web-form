import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WelcomeComponent } from './welcome/welcome.component';
import { TabPageComponent } from './tab-page/tab-page.component';
import { LoginGuardStandard } from './shared/login-guard-standard.module';
import { LoginGuardAdmin } from './shared/login-guard-admin.module';

import { MatInput } from '@angular/material';
import { ReviewComponent } from './review/review.component';
import { Page404Component } from './page404/page404.component'

const appRoutes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'dashboard', component: TabPageComponent, canActivate: [LoginGuardStandard] },
  { path: 'review', component: ReviewComponent, canActivate: [LoginGuardAdmin] },
  { path: '404', component: Page404Component },
  { path: '**', redirectTo: '404' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
