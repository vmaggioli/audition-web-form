import { Component } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

import { Leaders } from './leader';

@Injectable()
export class LeaderAuditioneeService {
  getLeaders(): Leaders[] {
    return STUDENTLEADERS;
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