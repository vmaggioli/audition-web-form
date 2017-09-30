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

  removeAll() {
    const select = document.getElementById('leader');
    while (select.childElementCount > 1) {
      select.removeChild(select.lastChild);
    }
  }

  addLeaders() {
    const rmadd = document.getElementById('rmadd');
    const div = document.createElement('div');
    div.id = "new div"

    const input = document.createElement('textarea');
    input.style.height = "150px";
    input.placeholder = "Leader 1\nLeader 2\netc.";
    input.onchange = this.handleTyping;

    const btn = document.createElement('button');
    btn.textContent = "Add";
    btn.onclick = this.add;

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

  add = (ev) => {
    const select = document.getElementById('leader');
    for (let i = 0; i < this.newLeaders.length; i++) {
      if (!this.newLeaders[i]) {
        continue;
      }
      const opt = document.createElement('option');
      opt.value = this.newLeaders[i].name;
      opt.innerText = this.newLeaders[i].name;
      select.appendChild(opt);
    }
    const rmadd = document.getElementById('rmadd');
    const div = document.getElementById('new div');
    rmadd.removeChild(div);
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