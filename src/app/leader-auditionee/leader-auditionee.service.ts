import { Component } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

import { Leaders } from './leader';

@Injectable()
export class LeaderAuditioneeService {
  //items: Observable<any[]>;
  constructor(db: AngularFireDatabase) {
    console.log("db = " + db.database);
  }
  getLeaders(): Promise<Leaders[]> {
    return Promise.resolve(STUDENTLEADERS);
  }
}

const STUDENTLEADERS: Leaders[] = [
  {name: '--Select a Leader'},
  {name: 'Alex L.'},
  {name: 'Alex K.'},
  {name: 'Bobby'},
  {name: 'Cassie'},
  {name: 'Colin'},
  {name: 'Jeremy'},
  {name: 'JC'},
  {name: 'Kristin'},
  {name: 'Nick'},
  {name: 'Ryan'},
  {name: 'Tim'},
  {name: 'Vince'},
];