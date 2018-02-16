import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in-error',
  templateUrl: './sign-in-error.component.html'
})

export class SignInErrorComponent {
  constructor(private router: Router) { }

  navigateHome() {
    this.router.navigateByUrl('welcome');
  }
}
