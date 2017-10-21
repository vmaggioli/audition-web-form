import { Good } from './good';
import { Bad } from './bad';

export class Auditionee {
  name: string;
  link: string; // Because names can't have . in URL
  good = new Array<Good>();
  bad = new Array<Bad>();
}