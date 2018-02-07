import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WelcomeComponent } from './welcome/welcome.component';
import { TabPageComponent } from './tab-page/tab-page.component';
import { LoginGuard } from './shared/login-guard.module';

const appRoutes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'dashboard', component: TabPageComponent, canActivate: [LoginGuard] }
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
