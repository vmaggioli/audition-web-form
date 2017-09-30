import { NgModule, ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';

import { JudgementComponent } from './judgement/judgement.component';

@NgModule({})
export class DynamicModule {
  static withComponents(components: any[]) {
    return {
      ngModule: DynamicModule,
      providers: [
        {
          provide:ANALYZE_FOR_ENTRY_COMPONENTS,
          useValue: components,
          multi: true
        }
      ]
    }
  }
}
