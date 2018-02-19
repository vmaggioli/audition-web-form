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
