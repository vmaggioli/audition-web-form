import { Component, NgModule, OnInit, ComponentFactoryResolver, ViewContainerRef, ViewChild, AfterViewInit,
	ComponentRef, ChangeDetectorRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { JudgementComponent } from '../judgement/judgement.component';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { DynamicModule } from '../dynamic-module';
import { AngularFireDatabase, AngularFireAction } from 'angularfire2/database';
import { MatInput, MatAutocomplete, MatSelect, MatFormField, MatButton, MatOption, MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';

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

	constructor(private cfr: ComponentFactoryResolver,
							private db: AngularFireDatabase,
							private cdr: ChangeDetectorRef,
							private snackBar: MatSnackBar) { }

	ngOnInit() {
		this.db.object('User').update({
			username: 'pubandsleadership',
			password: 'bandsrock'
		});
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
		for (const item of this.judgementList) {
			const instance = item.instance;
			const newJudgement = {
				auditionee: this.auditionee,
				studentLeader: this.studentLeader,
				criteria: instance.getCriteria(),
				goodBad: instance.getGoodOrBad(),
				comment: instance.getComment()
			};
			this.db.list(this.section).push(newJudgement);
		}
		this.target.clear();
		this.judgementList = [];
		this.putInMyHtml();
	}
}
