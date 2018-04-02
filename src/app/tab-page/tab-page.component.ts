import { Component, OnInit } from '@angular/core';
import { LeaderAuditioneeComponent } from '../leader-auditionee/leader-auditionee.component';
import { ReviewComponent } from '../review/review.component';
import { MatTabsModule, MatTabChangeEvent } from '@angular/material';
import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: 'app-tab-page',
    templateUrl: './tab-page.component.html',
    styleUrls: ['./tab-page.component.css']
})

export class TabPageComponent implements OnInit {
    position: number;
    
    constructor(private cookieService: CookieService) {}

    ngOnInit() {
        if (this.cookieService.get('tab') !== null) {
            this.position = +this.cookieService.get('tab');
        }
    }

    onLinkClick(event: MatTabChangeEvent) {
        this.cookieService.set('tab', event.index.toString());
    }
}
