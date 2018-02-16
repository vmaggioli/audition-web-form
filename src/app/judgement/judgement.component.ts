import { Component, AfterViewInit, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { MatInput, MatRadioGroup, MatRadioButton, MatFormField, MatSelect, MatOption } from '@angular/material';
import { CRITERIA } from '../criteria';

@Component({
  selector: 'app-judgement',
  templateUrl: 'judgement.component.html'
})

export class JudgementComponent implements AfterViewInit {
  readonly CRITERIAS = [
    'Visual - Horn Angle',
    'Visual - Posture',
    'Visual - Knee Height',
    'Visual - Mark Time',
    'Visual - Not Bicycling',
    'Visual - Toe Point',
    'Movement - Steady Sound',
    'Movement - Above the Waist',
    'Movement - Below the Waist',
    'Personal - Initiative',
    'Personal - Attitude'
  ];
  private section = '';
  public criteria = '';
  public comment = '';
  public goodOrBad = '';

  constructor(private cdr: ChangeDetectorRef) { }


  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  public getCriteria() : string { return this.criteria; }
  public getGoodOrBad() : string { return this.goodOrBad; }
  public getComment() : string { return this.comment; }
}
