import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable()
export class UsersService {

  constructor() { }

  getAdminUser() {
    return firebase.database().ref('Users/Admin').once('value');
  }

  getStandardUser() {
    return firebase.database().ref('Users/Standard').once('value');
  }

}
