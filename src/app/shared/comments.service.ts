import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireAction } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CommentsService {

  constructor(private db: AngularFireDatabase) {}

  // TODO: Fix good/bad comments so it queries and returns the results
  
  // getGoodComments(section: string, auditionee: string): Observable<any> {
  //   return this.db.list('Comments' + auditionee + '/Good').valueChanges();
  // }

  // getBadComments(section: string, auditionee: string): Observable<any> {
  //   return this.db.list('Trumpets/Comments/' + auditionee + '/Bad').valueChanges();
  // }

  getAllComments(section: string): Observable<any> {
    return this.db.list(section).valueChanges();
  }
}
