import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatButton, MatInput, MatSnackBar } from '@angular/material';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { AuthService } from '../shared/auth.service'; 
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})

export class WelcomeComponent implements OnInit {
  username = '';
  password = '';

  constructor(private db: AngularFireDatabase,
              private router: Router,
              private auth: AuthService,
              private snackBar: MatSnackBar) { }

  ngOnInit() {

  }

  login(): void {
    this.auth.login(this.username, this.password);
  }
}
