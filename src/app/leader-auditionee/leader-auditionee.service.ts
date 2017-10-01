import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import { Leader } from './leader';
import { Auditionee } from './auditionee'; 
import { Good } from './good';
import { Bad } from './bad';

@Injectable()
export class LeaderAuditioneeService {
  leaders = new Array<Leader>();
  auditionees = new Array<Auditionee>();


  // TODO - need to read from database/update lists even after constructor is called
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
      for (let i = 0; i < val.length; i++) {
        let auditionee = new Auditionee;
        auditionee.name = val[i].$key;
        const goodKeys = Object.keys(val[i].undefined); // TODO change when buttons are defined
        for (let j = 0; j < goodKeys.length; j++) {
          auditionee.good.push(val[i].undefined[goodKeys[j]]);
        }
        const badKeys = Object.keys(val[i].undefined); // TODO change when buttons are defined
        for (let j = 0; j < badKeys.length; j++) {
          auditionee.bad.push(val[i].undefined[badKeys[j]]);
        }
        this.auditionees.push(auditionee);
      }
    });
  }

  getLeaders(): Leader[] {
    return this.leaders;
  }

  getAuditionees(): Auditionee[] {
    return this.auditionees;
  }
}