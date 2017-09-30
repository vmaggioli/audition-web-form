import { Component, NgModule, ComponentFactoryResolver, ViewContainerRef, ViewChild, AfterViewInit, ComponentRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { JudgementComponent } from '../judgement/judgement.component';
import { FormsModule } from '@angular/forms';
import { DynamicModule } from '../dynamic-module';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-leader-auditionee',
  templateUrl: './leader-auditionee.component.html'
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

	constructor(private cfr: ComponentFactoryResolver,
							private db: AngularFireDatabase) { }

	ngAfterViewInit() {
		this.putInMyHtml();
	}

	private putInMyHtml() {
		let compFactory = this.cfr.resolveComponentFactory(JudgementComponent);
		this.judgementList.push(this.target.createComponent(compFactory));
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
			this.db.object('Trumpets/Auditionees/' + this.auditionee + '/' + instance.getGoodOrBad()).set(newJudgement);
		}
		this.target.clear();
		this.judgementList = [];
		this.putInMyHtml();
	}
}
