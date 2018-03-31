import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
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
    readonly displayedColumns = ['auditionee', 'studentLeader', 'criteria', 'goodBad', 'comment', 'date'];
    section = '';
    auditionee = '';
    dataSource = new MatTableDataSource<any>();

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
        this.comService.getAllComments(this.section).then((snapshot) => {
            if (snapshot.val() !== null) {
                var data = Object.values(snapshot.val()).reverse().sort(function(a: any, b: any): number {
                    if (a.auditionee > b.auditionee) {
                        return 1;
                    } else if (a.auditionee < b.auditionee) {
                        return -1;
                    } else {
                        return 0;
                    }
                });
                this.dataSource = new MatTableDataSource(data);
            }
        });
    }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    }
}
