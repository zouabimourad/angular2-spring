import {Component, OnInit, Input} from '@angular/core';
import {PaginationPage} from '../pagination';

@Component({
    selector: 'app-table-elements-count',
    templateUrl: './table-elements-count.component.html',
    styleUrls: ['./table-elements-count.component.css']
})
export class TableElementsCountComponent implements OnInit {

    @Input() page: PaginationPage<any>;

    constructor() {
    }

    ngOnInit() {

    }

}
