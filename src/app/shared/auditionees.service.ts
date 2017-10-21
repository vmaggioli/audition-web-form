import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireAction } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuditioneesService {
  auditionees = new Array<string>();
  constructor(private db: AngularFireDatabase) { 
    this.auditionees = this.getAuditionees();
  }

  public getAuditionees(): Array<string> {
    this.db.list('Trumpets/Auditionees').valueChanges().subscribe(val => {
      for (let i = 0; i < val.length; i++) {
        let dup = 0;
        const name = val[i].toString();
        for (let j = 0; j < this.auditionees.length; j++) {
          if (this.auditionees[j] === name) {
            dup = 1;
            break;
          }
        }
        if (dup === 0) {
          this.auditionees.push(name); // ADDS NAMES TWICE WITHOUT DUPLICATE CHECK
        }
      }
    });
    return this.auditionees;
  }
}
