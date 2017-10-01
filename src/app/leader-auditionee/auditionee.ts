export class Auditionee {
  name: string;
  link: string; // Because names can't have . in URL
  good: {
    studentLeader: string,
    criteria: string,
    comment: string,
  };
  bad: {
    studentLeader: string,
    criteria: string,
    comment: string,
  }
}