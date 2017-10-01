import { Component, NgModule, ComponentFactoryResolver, ViewContainerRef, ViewChild, AfterViewInit, ComponentRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { JudgementComponent } from '../judgement/judgement.component';
import { FormsModule } from '@angular/forms';

import { DynamicModule } from '../dynamic-module';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import { LeaderAuditioneeService } from './leader-auditionee.service';

@Component({
  selector: 'app-leader-auditionee',
  templateUrl: './leader-auditionee.component.html',
  providers: [ LeaderAuditioneeService ],
})
  
@NgModule({
	declarations: [
		LeaderAuditioneeComponent,
		JudgementComponent
	],
	imports: [
		BrowserModule,
		DynamicModule.withComponents([JudgementComponent])
	]
})

export class LeaderAuditioneeComponent implements AfterViewInit {
	@ViewChild('target', { read: ViewContainerRef }) target: ViewContainerRef;
	private judgementList: Array<ComponentRef<JudgementComponent>> = [];
	private studentLeader = '';
  private auditionee = '';
  private newLeaders: string[];
  private removeLeaders: string[];

	constructor(private cfr: ComponentFactoryResolver,
              private db: AngularFireDatabase,
              private las: LeaderAuditioneeService) {
  }

	ngAfterViewInit() {
    this.putInMyHtml();
	}

	private putInMyHtml() {
		let compFactory = this.cfr.resolveComponentFactory(JudgementComponent);
    this.judgementList.push(this.target.createComponent(compFactory));
  }

  addLeaders() {
    document.getElementById('new div').style.display = "block";
  }

  oldLeaders() {
    document.getElementById('new div 2').style.display = "block";
  }

  onKeyNewLeader (event : any) {
    this.newLeaders = event.target.value.split('\n');
  }

  private add() {
    for (let i = 0; i < this.newLeaders.length; i++) {
      if (this.newLeaders[i].length === 0) {
        continue;
      }
      this.db.object(`Trumpets/StudentLeaders/${this.newLeaders[i]}`).set(this.newLeaders[i]);
    }
    document.getElementById('new div').nodeValue = "";
    document.getElementById('new div').style.display = "none";
  }

  onKeyRemoveLeader (event : any) {
    this.removeLeaders = event.target.value.split('\n');
  }

  private remove() {
    for (let i = 0; i < this.removeLeaders.length; i++) {
      if (this.removeLeaders[i].length === 0) {
        continue;
      }
      this.db.object(`Trumpets/StudentLeaders/${this.removeLeaders[i]}`).remove();
    }
    document.getElementById('new div 2').nodeValue = "";
    document.getElementById('new div 2').style.display = "none";
  }

  removeAllLeaders() {
    this.db.object('Trumpets/StudentLeaders/').remove();
  }

  removeAllAuditionees() {
    this.db.object('Trumpets/Auditionees/').remove();
  }

	onKeyLeader(event : any) {
		this.studentLeader = event.target.value;
	}

	onKeyAuditionee(event : any) {
		this.auditionee = event.target.value;
	}

	private submitComment() {
		for (var item of this.judgementList) {
			var instance = item.instance;
			var newJudgement = {
				studentLeader: this.studentLeader,
				criteria: instance.getCriteria(),
				comment: instance.getComment()
			};
			this.db.object(`Trumpets/Auditionees/${this.auditionee}/${instance.getGoodOrBad()}`).set(newJudgement);
    }
		this.target.clear();
		this.judgementList = [];
		this.putInMyHtml();
  }
}