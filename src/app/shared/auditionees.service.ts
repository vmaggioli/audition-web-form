import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuditioneesService {

  constructor(public db: AngularFireDatabase) { }

  public getAuditionees(): Observable<any> {
    return this.db.list('Auditionees').valueChanges();
  }
}
