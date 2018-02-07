import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireAction } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class VerifiedUsersService {

  constructor(private db: AngularFireDatabase) { }

  getVerifiedUsers(): Observable<any> {
    return this.db.list('VerifiedUsers').valueChanges();
  }
}
