import { Injectable } from '@angular/core';
import { STUDENTLEADERS } from '../student-leaders';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class VerifiedUserService {
  getVerifiedUsers(): string[] {
    return STUDENTLEADERS;
  }
}
