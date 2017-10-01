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

  constructor(private db: AngularFireDatabase) {
    this.leaders = this.getLeaders("init");
    this.auditionees = this.getAuditionees("init");
  }

  getLeaders(arg: string): Leader[] {
    if (arg === "clr") {
      return (this.leaders = new Array<Leader>());
    }
    // val[i] == {$value: , $key: , $exists: }
    this.db.list('Trumpets/StudentLeaders').subscribe(val => {
      for (let i = 0; i < val.length; i++) {
        let dup = 0;
        let leader = new Leader;
        leader.name = val[i].$value;
        leader.link = val[i].$key;
        for (let j = 0; j < this.leaders.length; j++) {
          if (this.leaders[j].name === leader.name) {
            dup = 1;
            break;
          }
        }
        if (dup === 0) {
          this.leaders.push(leader);
        }
      }
    });
    return this.leaders;
  }

  getAuditionees(arg: string): Auditionee[] {
    if (arg === "clr") {
      return (this.auditionees = new Array<Auditionee>());
    }
    this.db.list('Trumpets/Auditionees').subscribe(val => {
      for (let i = 0; i < val.length; i++) {
        let dup = 0;
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
        for (let k = 0; k < this.auditionees.length; k++) {
          if (this.auditionees[k].name === auditionee.name) {
            dup = 1;
            this.auditionees[k] = auditionee;
            break;
          }
        }
        if (dup === 0) {
          this.auditionees.push(auditionee);
        }
      }
    });
    return this.auditionees;
  }
}