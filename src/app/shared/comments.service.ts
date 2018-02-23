import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireAction } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';

@Injectable()
export class CommentsService {

  constructor(private db: AngularFireDatabase) {}

  getAllComments(section: string): Observable<any> {
    return this.db.list('Comments/' + section).valueChanges();
  }

  getWeekComments(section: string): Observable<any> {
    const now = new Date();
    var day = now.getDay(),
      diff = now.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
    return this.db.list('Comments/' + section, ref => ref.orderByChild('date').startAt(
      new Date(now.getFullYear(), now.getMonth(), diff - 1, 12, 0, 0, 0).getTime()
    )).valueChanges();
  }

  getDayComments(section: string): Observable<any> {
    const now = new Date();
    return this.db.list('Comments/' + section, ref => ref.orderByChild('date').startAt(
      new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12, 0, 0, 0).getTime()
    )).valueChanges()
  }

  wipeComments(): void {
    let username = '';
    let pass = '';
    firebase.database().ref('User').once('value', function (data) {
      username = data.val().username;
      pass = data.val().password;
    }).then(() => {
      this.db.object('/').remove().then(() => {
        this.db.object('User').set({
          username: username,
          password: pass
        });
      });
    });
  }
}
