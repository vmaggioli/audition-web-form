import { Component, NgModule, OnInit, ComponentFactoryResolver, ViewContainerRef, ViewChild, AfterViewInit, ComponentRef, ChangeDetectorRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { JudgementComponent } from '../judgement/judgement.component';
import { FormsModule } from '@angular/forms';
import { DynamicModule } from '../dynamic-module';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { MdRadioModule, MdSelectModule } from '@angular/material';
import { StudentLeadersService } from '../shared/student-leaders.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
		DynamicModule.withComponents([JudgementComponent]),
    FormsModule,
    BrowserModule,
		MdRadioModule,
    MdSelectModule
	],
	entryComponents: [ JudgementComponent ]
})

export class LeaderAuditioneeComponent implements AfterViewInit, OnInit {
	@ViewChild('target', { read: ViewContainerRef }) target: ViewContainerRef;
	private judgementList: Array<ComponentRef<JudgementComponent>> = [];
	private auditionee = '';
	private slList: Array<any> = [];

	constructor(private cfr: ComponentFactoryResolver,
							private db: AngularFireDatabase,
							private cdr: ChangeDetectorRef,
							private service: StudentLeadersService) { }

	ngOnInit() {
		var slFirebase = this.service.getStudentLeaders();
		slFirebase.subscribe(leaders => {
			this.slList = leaders;
		});
	}

	ngAfterViewInit() {
		this.putInMyHtml();
	}

	private putInMyHtml() {
		let compFactory = this.cfr.resolveComponentFactory(JudgementComponent);
		this.judgementList.push(this.target.createComponent(compFactory));
		this.cdr.detectChanges();
	}

	onKeyAuditionee(event : any) {
		this.auditionee = event.target.value;
	}

	private submitComment() {
		for (var item of this.judgementList) {
			var instance = item.instance;
			var newJudgement = {
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
