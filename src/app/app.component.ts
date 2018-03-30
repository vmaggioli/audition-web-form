import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from './shared/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
              public router: Router,
              public auth: AuthService
              ) {}
  logout() {
    this.auth.logout();
    this.router.navigateByUrl('');
  }
}
