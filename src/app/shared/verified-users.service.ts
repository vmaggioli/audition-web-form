import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Injectable()
export class VerifiedUsersService {

  constructor(private db: AngularFireDatabase) { }

  getVerifiedUsers(uid: string): FirebaseListObservable<string[]> {
    return this.db.list('VerifiedUsers', {
      query: {
        orderByChild: 'uid',
        equalTo: uid
      }
    });
  }
}
