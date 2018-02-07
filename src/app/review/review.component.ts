import { Component, OnInit } from '@angular/core';
import { CommentsService } from '../shared/comments.service';
import { DataSource } from '@angular/cdk/collections';
import { MatTable, MatTableDataSource } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { Comment } from '../comment';
import { MatSelect } from '@angular/material';
import { Judgement } from '../judgement';

@Component({
    selector: 'app-review',
    templateUrl: './review.component.html'
})

export class ReviewComponent implements OnInit {
    displayedColumns = ['auditionee', 'studentLeader', 'criteria', 'goodBad', 'comment'];
    section: string;
    auditionee: string;
    // dataSource = new CommentsDataSource(this.comService, this.section);
    dataSource = new MatTableDataSource<Judgement>();

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
        this.comService.getAllComments(this.section).subscribe((data) => {
            this.dataSource = new MatTableDataSource(data);
        });
    }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    }
}

// export class CommentsDataSource extends DataSource<any> {

//     constructor(private comService: CommentsService,
//                 private section: string) {
//         super();
//     }

//     connect() {
//         return this.comService.getAllComments(this.section);
//     }

//     disconnect() { }
// }
