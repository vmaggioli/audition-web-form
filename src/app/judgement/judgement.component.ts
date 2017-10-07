import { Component, AfterViewInit, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { MatRadioModule } from '@angular/material';

@Component({
  selector: 'app-judgement',
  templateUrl: 'judgement.component.html'
})

export class JudgementComponent implements AfterViewInit {
  private section: string = 'Trumpets';
  private criteria: string;
  private comment: string;
  private goodOrBad: string;

  constructor(private cdr: ChangeDetectorRef) { }

  ngAfterViewInit() {
    this.goodOrBad = '';
    this.cdr.detectChanges();
  }

  onKeyCriteria(event : any) {
    this.criteria = event.target.value;
  }

  onKeyComment(event : any) {
    this.comment = event.target.value;
  }

  public getCriteria() : String { return this.criteria; }
  public getGoodOrBad() : String { return this.goodOrBad; }
  public getComment() : String { return this.comment; }
}
