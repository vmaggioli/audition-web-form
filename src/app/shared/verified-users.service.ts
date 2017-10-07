import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as Firebase from 'firebase';

@Injectable()
export class VerifiedUsersService {

  constructor(private db: AngularFireDatabase) { }

  getVerifiedUsers(): AngularFireList<string[]> {
    return this.db.list('VerifiedUsers');
  }
}
