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
}

  login(): void {
    this.auth.login(this.username, this.password);
  }
}
