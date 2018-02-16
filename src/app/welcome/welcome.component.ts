import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatButton, MatInput } from '@angular/material';
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

  constructor(
      private auth: AuthService) { }

  ngOnInit() {

  }

  login() {
    this.auth.login(this.username, this.password);
  }
}
