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
    // DB resets at midnight on Nov 16
    const now = new Date();
    const nowUTC = new Date(Date.UTC(now.getFullYear(), now.getMonth() + 1, now.getDate(), now.getHours(), now.getMinutes()));
    const serv = this.comServ;
    let waitTime;
    // Month is 0 indexed in Date
    if (now.getMonth() === 11 || (now.getMonth() === 10 && now.getDate() > 16)) {
      waitTime = new Date(now.getFullYear() + 1, 10, 16, 12, 0, 0, 0).getTime() - now.getTime();
    } else {
      waitTime = new Date(Date.UTC(now.getFullYear(), 10, 16, 12, 0, 0, 0)).getTime() - now.getTime();
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
