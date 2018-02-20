import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatButton, MatInput, MatSnackBar } from '@angular/material';
import * as firebase from 'firebase';
import { AuthService } from '../shared/auth.service';
import { CommentsService } from '../shared/comments.service';

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
              private comServ: CommentsService) { }

  ngOnInit() {
    // DB resets at midnight on August 1
    const now = new Date();
    const nowUTC = new Date(Date.UTC(now.getFullYear(), now.getMonth()
    , now.getDate(), now.getHours(), now.getMinutes()));
    const serv = this.comServ;
    let waitTime;
    // Month is 0 indexed in Date
    if (now.getMonth() >= 8 || (now.getMonth() === 7 && now.getDate() > 1)) {
      waitTime = new Date(Date.UTC(now.getFullYear() + 1, 7, 1, 12, 0, 0, 0)).getTime() - nowUTC.getTime();
    } else {
      waitTime = new Date(Date.UTC(now.getFullYear(), 7, 1, 12, 0, 0, 0)).getTime() - nowUTC.getTime();
    }
    if (waitTime > 0) {
      setTimeout(function () {
        serv.wipeComments();
        }, waitTime);
    }
  }

  login(): void {
    this.auth.login(this.username, this.password);
  }
}
