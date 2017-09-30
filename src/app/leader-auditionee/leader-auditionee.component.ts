import { Component } from '@angular/core';
import { JudgementComponent } from '../judgement/judgement.component';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { Leaders } from './leader';

@Component({
  selector: 'app-leader-auditionee',
  templateUrl: './leader-auditionee.component.html'
})

export class LeaderAuditioneeComponent {
  leaders = STUDENTLEADERS;
  newLeaders: Leaders[];

  addLeaders() {
    const rmadd = document.getElementById('rmadd');
    const div = document.createElement('div');
    const input = document.createElement('textarea');
    input.style.height = "150px";
    input.placeholder = "leader_name_1, leader_name_2, etc.";
    input.onchange = this.handleTyping;
    const btn = document.createElement('button');
    btn.textContent = "Add";

    div.appendChild(input);
    div.appendChild(btn);
    rmadd.appendChild(div);
  }

  handleTyping = (ev) => { // TODO split is too large
    const list = ev.target.value.split('\n'); // split ==> array
    this.newLeaders = new Array(list.length);
    for (let i = 0; i < list.length; i++) {
      if (list[i].length === 0) {
        continue;
      }
      this.newLeaders.push({ name: list[i] });
    }
  }
}

const STUDENTLEADERS: Leaders[] = [
  {name: '              '},
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

