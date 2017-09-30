import { Component, NgModule, ComponentFactoryResolver, ViewContainerRef, ViewChild, AfterViewInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { JudgementComponent } from '../judgement/judgement.component';
import { FormsModule } from '@angular/forms';
import { DynamicModule } from '../dynamic-module';

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
	constructor(private cfr: ComponentFactoryResolver) { }

	ngAfterViewInit() {
		this.putInMyHtml();
	}

	private putInMyHtml() {
		let compFactory = this.cfr.resolveComponentFactory(JudgementComponent);
		this.target.createComponent(compFactory);
	}

	private submitComment() {
		// TODO
	}
}
