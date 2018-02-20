import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class StudentLeadersService {

  constructor(private db: AngularFireDatabase) { }

  public getStudentLeaders(): Observable<any> {
    return this.db.list('Student Leaders').valueChanges();
  }
}
