import { Component, NgModule, OnInit, ComponentFactoryResolver, ViewContainerRef, ViewChild, AfterViewInit,
	ComponentRef, ChangeDetectorRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { JudgementComponent } from '../judgement/judgement.component';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { DynamicModule } from '../dynamic-module';
import { AngularFireDatabase, AngularFireAction } from 'angularfire2/database';
import { MatInput, MatAutocomplete, MatSelect, MatFormField, MatButton, MatOption, MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';
import { AuditioneesService } from '../shared/auditionees.service';
import { StudentLeadersService } from '../shared/student-leaders.service';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';

@Component({
	selector: 'app-leader-auditionee',
	templateUrl: './leader-auditionee.component.html'
})

export class LeaderAuditioneeComponent implements AfterViewInit, OnInit {
	@ViewChild('target', { read: ViewContainerRef }) target: ViewContainerRef;
	public judgementList: Array<ComponentRef<JudgementComponent>> = [];
	public studentLeader = '';
	public auditionee = '';
	public section = '';
	public auditioneeList = [];
	public auditioneeListFiltered: Observable<string[]>;
	public studentLeaderList = [];
	public studentLeaderListFiltered: Observable<string[]>;
	myControlLeaders: FormControl = new FormControl();
	myControlAuditionees: FormControl = new FormControl();

	readonly SECTIONS = [
		'Piccolos',
		'Clarinets',
		'Alto Saxophones',
		'Tenor Saxophones',
		'Trumpets',
		'Mellophones',
		'Trombones',
		'Baritones',
		'Tubas',
		'Big Ten Flags'
	];

	readonly MONTHNAMES = ["January", "February", "March", "April", "May", "June",
		"July", "August", "September", "October", "November", "December"
	];

	constructor(private cfr: ComponentFactoryResolver,
							private db: AngularFireDatabase,
							private cdr: ChangeDetectorRef,
							private snackBar: MatSnackBar,
							private auditServ: AuditioneesService,
							private slServ: StudentLeadersService) { }

	ngOnInit() {
	}

	ngAfterViewInit() {
		this.putInMyHtml();
	}

	public putInMyHtml() {
		const compFactory = this.cfr.resolveComponentFactory(JudgementComponent);
		this.judgementList.push(this.target.createComponent(compFactory));
		this.cdr.detectChanges();
	}

	private isValidForm(): boolean {
		if (this.section === '') {
			this.snackBar.open('Error: No Section', 'Close', {
				duration: 3000
			});
			return false;
		} else if (this.studentLeader === '') {
			this.snackBar.open('Error: No Student Leader', 'Close', {
				duration: 3000
			});
			return false;
		} else if (this.auditionee === '') {
			this.snackBar.open('Error: No Auditionee', 'Close', {
				duration: 3000
			});
			return false;
		}
		for (const item of this.judgementList) {
			const instance = item.instance;
			if (instance.criteria === '') {
				this.snackBar.open('Error: No Criteria', 'Close', {
					duration: 3000
				});
				return false;
			} else if (instance.goodOrBad === '') {
				this.snackBar.open('Error: No Good or Bad', 'Close', {
					duration: 3000
				});
				return false;
			}
		}
		return true;
	}

	public submitComment(): void {
		if (!this.isValidForm()) {
			return;
		}

		// Submit comment
		for (const item of this.judgementList) {
			const instance = item.instance;
			const newJudgement = {
				auditionee: this.sanitize(this.convertNameCase(this.auditionee)),
				studentLeader: this.sanitize(this.convertNameCase(this.studentLeader)),
				criteria: instance.getCriteria(),
				goodBad: instance.getGoodOrBad(),
				comment: this.sanitize(instance.getComment()),
				date: this.dateConstructor(new Date())
			};
			firebase.database().ref('Comments/' + this.section).push(newJudgement);
		}

		// Add auditionee and SL to DB
		firebase.database().ref('Auditionees/' + this.sanitize(this.auditionee.toLowerCase())).update({
			name: this.convertNameCase(this.auditionee),
			section: this.section
		});
		firebase.database().ref('Student Leaders/' + this.sanitize(this.studentLeader.toLowerCase())).update({
			name: this.convertNameCase(this.studentLeader),
			section: this.section
		});

		// Clear form
		this.auditionee = '';
		this.target.clear();
		this.judgementList = [];
		this.putInMyHtml();
	}

	public sanitize(toSanitize: string): string {
		return toSanitize.trim().replace(/\$|\.|\#|\[|\]|\\|\//g, '');
	}

	public convertNameCase(name: string): string {
		const nameArr = name.split(' ');
		let fullName = '';
		for (var i = 0; i < nameArr.length; i++) {
			nameArr[i] = nameArr[i].charAt(0).toUpperCase() + nameArr[i].substring(1, nameArr[i].length);
			fullName += ' ' + nameArr[i];
		}
		return fullName.trim();
	}

	public sectionChange(): void {
		this.auditServ.getAuditionees().subscribe(data => {
			const section = this.section
			this.auditioneeList = data.filter(function (el) {
				return el.section === section;
			});
			this.auditioneeListFiltered = this.myControlAuditionees.valueChanges
				.pipe(
					startWith(''),
					map(name => this.filterAuditionees(name))
				);
		});

		this.slServ.getStudentLeaders().subscribe(data => {
			const section = this.section
			this.studentLeaderList = data.filter(function (el) {
				return el.section === section;
			});
			this.studentLeaderListFiltered = this.myControlLeaders.valueChanges
				.pipe(
					startWith(''),
					map(name => this.filterStudentLeaders(name))
				);
		});
	}

	public filterAuditionees(name: any): any[] {
		return this.auditioneeList.filter(auditionee =>
			auditionee.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
	}

	public filterStudentLeaders(name: any): any[] {
		return this.studentLeaderList.filter(sl =>
			sl.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
	}

	private dateConstructor(date: Date): string {
		return this.MONTHNAMES[date.getMonth()] + ' ' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes();
	}
}
