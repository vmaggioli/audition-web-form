import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LeaderAuditioneeComponent } from './leader-auditionee.component';
import { JudgementComponent } from '../judgement/judgement.component';

describe('LeaderAuditioneeComponent', () => {
  let component: LeaderAuditioneeComponent;
  let fixture: ComponentFixture<LeaderAuditioneeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LeaderAuditioneeComponent,
        JudgementComponent
      ],
      imports: [ RouterTestingModule,]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaderAuditioneeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
