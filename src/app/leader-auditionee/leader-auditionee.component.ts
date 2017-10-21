import { Component, NgModule, OnInit, ComponentFactoryResolver, ViewContainerRef, ViewChild, AfterViewInit, ComponentRef, ChangeDetectorRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { JudgementComponent } from '../judgement/judgement.component';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { DynamicModule } from '../dynamic-module';
import { AngularFireDatabase } from 'angularfire2/database';
import { MatInput, MatAutocomplete, MatSelect, MatFormField, MatButton, MatOption } from '@angular/material';
import { StudentLeadersService } from '../shared/student-leaders.service';
import { Observable } from 'rxjs/Observable';
import { AuditioneesService } from '../shared/auditionees.service';
import { Leader } from './leader';
import { Auditionee } from './auditionee';
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
	public studentLeader: string = '';
	public auditionee: string = '';
	public auditioneeList: Array<string> = [];
	public slList: Observable<any>;
	public myControl: FormControl = new FormControl();
	public filteredOptions: Observable<string[]>;

	constructor(private cfr: ComponentFactoryResolver,
							private db: AngularFireDatabase,
							private cdr: ChangeDetectorRef,
							private service: StudentLeadersService,
							private auditService: AuditioneesService) { }

	ngOnInit() {
		// fill student leaders list
		this.slList = this.service.getStudentLeaders().valueChanges();

		// fill auditionees list
		this.auditService.getAuditionees().valueChanges().forEach(data => {
			this.auditioneeList = [];
			for (var item of data) {
				this.auditioneeList.push(item['name']);
			}
		});

		this.filteredOptions = this.myControl.valueChanges.startWith(null).map(val =>
			val ? this.filter(val) : this.auditioneeList.slice());
	}

	filter(val: string): any[] {
		return this.auditioneeList.filter(option => option.toLowerCase().indexOf(val.toLowerCase()) == 0);
	}

	ngAfterViewInit() {
		this.putInMyHtml();
	}

	public putInMyHtml() {
		let compFactory = this.cfr.resolveComponentFactory(JudgementComponent);
		this.judgementList.push(this.target.createComponent(compFactory));
		this.cdr.detectChanges();
	}

	public submitComment() {
		for (var item of this.judgementList) {
			var instance = item.instance;
			console.log(this.studentLeader);
			console.log(this.auditionee);
      console.log(instance.getCriteria());
			console.log(instance.getGoodOrBad());
			console.log(instance.getComment());
			var newJudgement = {
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