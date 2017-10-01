import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Leader } from './leader';
import { Auditionee } from './auditionee'; 

@Injectable()
export class LeaderAuditioneeService {
  leaders = new Array<Leader>();
  auditionees = new Array<Auditionee>();

  constructor(private db: AngularFireDatabase) {
    // val[i] == {$value: , $key: , $exists: }
    db.list('Trumpets/StudentLeaders').subscribe(val => {
      for (let i = 0; i < val.length; i++) {
        let leader = new Leader;
        leader.name = val[i].$value;
        leader.link = val[i].$key;
        this.leaders.push(leader);
      }
    });
    db.list('Trumpets/Auditionees').subscribe(val => {
      console.log(val);
      for (let i = 0; i < val.length; i++) {
        let auditionee = new Auditionee;
      }
    });
  }

  getLeaders(): Leader[] {
    return this.leaders;
  }
}