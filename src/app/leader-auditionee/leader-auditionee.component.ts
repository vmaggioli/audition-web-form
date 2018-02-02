import { Component, NgModule, OnInit, ComponentFactoryResolver, ViewContainerRef, ViewChild, AfterViewInit, ComponentRef, ChangeDetectorRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { JudgementComponent } from '../judgement/judgement.component';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { DynamicModule } from '../dynamic-module';
import { AngularFireDatabase, AngularFireAction } from 'angularfire2/database';
import { MatInput, MatAutocomplete, MatSelect, MatFormField, MatButton, MatOption } from '@angular/material';
import { StudentLeadersService } from '../shared/student-leaders.service';
import { Observable } from 'rxjs/Observable';
import { AuditioneesService } from '../shared/auditionees.service';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-leader-auditionee',
  templateUrl: './leader-auditionee.component.html'
})

export class LeaderAuditioneeComponent implements AfterViewInit, OnInit {
	@ViewChild('target', { read: ViewContainerRef }) target: ViewContainerRef;
	public judgementList: Array<ComponentRef<JudgementComponent>> = [];
	public studentLeader: string;
	public auditionee: string;
	public auditioneeList: Array<any> = [];
	public slList: Observable<string[]>;

	constructor(private cfr: ComponentFactoryResolver,
							private db: AngularFireDatabase,
							private cdr: ChangeDetectorRef,
							private service: StudentLeadersService,
							private auditService: AuditioneesService) { }

	ngOnInit() {

	}

	filter(val: string): any[] {
		return this.auditioneeList.filter(option => option.toLowerCase().indexOf(val.toLowerCase()) == 0);
	}

	ngAfterViewInit() {
		this.putInMyHtml();
	}

	public putInMyHtml() {
		const compFactory = this.cfr.resolveComponentFactory(JudgementComponent);
		this.judgementList.push(this.target.createComponent(compFactory));
		this.cdr.detectChanges();
	}

	public submitComment() {
		for (const item of this.judgementList) {
			const instance = item.instance;
			const newJudgement = {
				studentLeader: this.studentLeader,
				criteria: instance.getCriteria(),
				comment: instance.getComment()
			};
			this.db.list('Trumpets/Comments/' + this.auditionee + '/' + instance.getGoodOrBad()).push(newJudgement);
		}
		this.target.clear();
		this.judgementList = [];
		this.putInMyHtml();
	}
}
