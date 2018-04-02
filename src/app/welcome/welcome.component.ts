import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatButton, MatInput, MatSnackBar } from '@angular/material';
import * as firebase from 'firebase';
import { AuthService } from '../shared/auth.service';
import { CommentsService } from '../shared/comments.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})

export class WelcomeComponent implements OnInit {
  username = '';
  password = '';

  constructor(private router: Router,
              private auth: AuthService,
              private snackBar: MatSnackBar,
              private comServ: CommentsService,
              private cookieServ: CookieService) { }

  ngOnInit() {
    this.cookieServ.set('user', null);
    this.cookieServ.set('section', null);
  }

  login(): void {
    this.auth.login(this.username, this.password);
  }

  enterAction(event: any) {
    if (event.keyCode == 13) {
      this.login();
    }
  }
}
