import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireAction } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuditioneesService {

  constructor(private db: AngularFireDatabase) { }

  public getAuditionees(): Observable<AngularFireAction<firebase.database.DataSnapshot>[]> {
    return this.db.list('Trumpets/Auditionees').valueChanges();
  }
}
