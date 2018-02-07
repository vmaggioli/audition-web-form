import { Component, OnInit } from '@angular/core';
import { CommentsService } from '../shared/comments.service';
import { DataSource } from '@angular/cdk/collections';
import { MatTable } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { Comment } from '../comment';

@Component({
    selector: 'app-review',
    templateUrl: './review.component.html'
})

export class ReviewComponent implements OnInit {
    displayedColumns = ['auditionee', 'studentLeader', 'criteria', 'goodBad', 'comment'];
    dataSource = new CommentsDataSource(this.comService);

    constructor(private db: AngularFireDatabase,
        private comService: CommentsService) { }

    ngOnInit() {

    }
}

export class CommentsDataSource extends DataSource<any> {

    constructor(private comService: CommentsService) {
        super();
    }

    connect() {
        return this.comService.getAllComments();
    }

    disconnect() { }
}
