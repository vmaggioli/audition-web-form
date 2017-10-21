import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class StudentLeadersService {

  constructor(private db: AngularFireDatabase) { }

  public getStudentLeaders(): AngularFireList<string[]> {
    return this.db.list('Trumpets/Student Leaders')
  }
}
