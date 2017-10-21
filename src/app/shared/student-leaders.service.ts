import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable()
export class StudentLeadersService {
  leaders = new Array<string>();
  constructor(private db: AngularFireDatabase) {
    this.leaders = this.getStudentLeaders();
  }

  public getStudentLeaders(): Array<string> {
    this.db.list('Trumpets/Student Leaders').valueChanges().subscribe(val => {
      for (let i = 0; i < val.length; i++) {
        let dup = 0;
        const name = val[i].toString();
        for (let j = 0; j < this.leaders.length; j++) {
          if (this.leaders[j] === name) {
            dup = 1;
            break;
          }
        }
        if (dup === 0) {
          this.leaders.push(name); // ADDS NAMES TWICE WITHOUT DUPLICATE CHECK
        }
      }
    });
    return this.leaders;
  }
}
