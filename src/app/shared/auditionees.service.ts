import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable()
export class AuditioneesService {

  constructor() { }

  public getAuditionees(): Promise<any> {
    return firebase.database().ref('Trumpets/Auditionees').once('value');
  }
}
