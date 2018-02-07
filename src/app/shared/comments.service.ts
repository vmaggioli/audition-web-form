import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireAction } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CommentsService {

  constructor(private db: AngularFireDatabase) {}

  getGoodComments(auditionee: string): Observable<any> {
    return this.db.list('Trumpets/Comments/' + auditionee + '/Good').valueChanges();
  }

  getBadComments(auditionee: string): Observable<any> {
    return this.db.list('Trumpets/Comments/' + auditionee + '/Bad').valueChanges();
  }
}
