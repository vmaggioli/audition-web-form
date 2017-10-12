import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable()
export class AuditioneesService {

  constructor(private db: AngularFireDatabase) { }

  public getAuditionees(): AngularFireList<string[]> {
    return this.db.list('Trumpets/Auditionees');
  }
}
