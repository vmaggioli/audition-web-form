import { Component, OnInit } from '@angular/core';
import { CommentsService } from '../shared/comments.service';
import { DataSource } from '@angular/cdk/collections';
import { MatTable, MatTableDataSource } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { Comment } from '../comment';
import { MatSelect } from '@angular/material';

@Component({
    selector: 'app-review',
    templateUrl: './review.component.html'
})

export class ReviewComponent implements OnInit {
    displayedColumns = ['auditionee', 'studentLeader', 'criteria', 'goodBad', 'comment'];
    section = '';
    auditionee = '';
    dataSource = new MatTableDataSource<any>();
    timeSpan: string;

    readonly SECTIONS = [
        'Piccolos',
        'Clarinets',
        'Alto Saxophones',
        'Tenor Saxophones',
        'Trumpets',
        'Mellophones',
        'Trombones',
        'Baritones',
        'Tubas',
        'Big Ten Flags'
    ];

    constructor(private db: AngularFireDatabase,
        private comService: CommentsService) { }

    ngOnInit() {
    }

    setData(): void {
        if (this.timeSpan === 'Week') {
            this.comService.getWeekComments(this.section).subscribe((data) => {
                this.dataSource = new MatTableDataSource(data.reverse());
            });
        } else if (this.timeSpan === 'Day') {
            this.comService.getDayComments(this.section).subscribe((data) => {
                this.dataSource = new MatTableDataSource(data.reverse());
            });
        } else {
            this.comService.getAllComments(this.section).subscribe((data) => {
                this.dataSource = new MatTableDataSource(data.reverse());
            })
        }
    }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    }
}
