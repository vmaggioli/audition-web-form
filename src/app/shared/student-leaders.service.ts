import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Injectable()
export class StudentLeadersService {

  constructor(private db: AngularFireDatabase) { }

  public getStudentLeaders(): FirebaseListObservable<any[]> {
    return this.db.list('Trumpets/StudentLeaders', {
      query: {
        orderByChild: 'name'
      }
    });
  }
}
