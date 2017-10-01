import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { JudgementComponent } from './judgement.component';
import { MatRadioModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, NgModel } from '@angular/forms';

describe('JudgementComponent', () => {
  let component: JudgementComponent;
  let fixture: ComponentFixture<JudgementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JudgementComponent ],
      imports: [
        BrowserModule,
        FormsModule,
        MatRadioModule
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JudgementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
