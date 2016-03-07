import {CORE_DIRECTIVES} from 'angular2/common';
import {Component, View, OnChanges, EventEmitter, Input} from 'angular2/core';
import {webServiceEndpoint} from '../../constants'
import {PaginationPage, PaginationPropertySort} from '../../common/pagination'
import * as Rx from "rxjs/Rx";
import {Injectable } from 'angular2/core';
import {showLoading, hideLoading } from "../../common/loader"

export interface Table {

    fetchPage(pageNumber:number, pageSize:number, sort:PaginationPropertySort): Rx.Observable<any>;

}

@Component({
    selector: 'table-elements-count',
    templateUrl: 'app/components/table/elements-count.html',
    directives: [CORE_DIRECTIVES]
})
export class TableElementsCount<T> {
    @Input() page:PaginationPage<T>;
}

@Component({
    selector: 'table-pagination',
    templateUrl: 'app/components/table/pagination.html',
    directives: [CORE_DIRECTIVES]
})
export class TablePagination<T> {
    @Input() table:Table;
    @Input() page:PaginationPage<T>;

    get pagesIndexes():Array<number> {
        let pagesIndexes:Array<number> = [];
        for (let i = 0; i < this.page.totalPages; i++) {
            pagesIndexes.push(i + 1);
        }
        return pagesIndexes;
    }

    fetchPageNumber(pageNumer:number) {
        let observable:Rx.Observable<any> = this.table.fetchPage(pageNumer - 1, this.page.size, this.getSort());
        if (observable != null) {
            showLoading();
            observable.subscribe(() => {
            }, (e) => {
                hideLoading()
            }, hideLoading);
        }
    }

    fetchPageSize(pageSize:number) {
        let observable:Rx.Observable<any> = this.table.fetchPage(this.page.number, pageSize, this.getSort());
        if (observable != null) {
            showLoading();
            observable.subscribe(() => {
            }, (e) => {
                hideLoading()
            }, hideLoading);
        }
    }

    fetchNextPage() {
        if (this.page.number + 1 >= this.page.totalPages) {
            return;
        }

        let observable:Rx.Observable<any> = this.table.fetchPage(this.page.number + 1, this.page.size, this.getSort());
        if (observable != null) {
            showLoading();
            observable.subscribe(() => {
            }, (e) => {
                hideLoading()
            }, hideLoading);
        }
    }

    fetchPreviousPage() {
        if (this.page.number == 0) {
            return;
        }

        let observable:Rx.Observable<any> = this.table.fetchPage(this.page.number - 1, this.page.size, this.getSort());
        if (observable != null) {
            showLoading();
            observable.subscribe(() => {
            }, (e) => {
                hideLoading()
            }, hideLoading);
        }
    }

    private getSort():PaginationPropertySort {
        if (this.page.sort != null && this.page.sort.length > 0) {
            return this.page.sort[0];
        } else {
            return null;
        }
    }
}

@Component({
    selector: 'table-sort',
    templateUrl: 'app/components/table/sort.html',
    directives: [CORE_DIRECTIVES]
})
export class TableSort<T> implements OnChanges {

    @Input() label:string;
    @Input() property:string;
    @Input() table:Table;
    @Input() page:PaginationPage<T>;

    sortDirection:string;
    sortClass:boolean = false;
    sortAscClass:boolean = false;
    sortDescClass:boolean = false;

    ngOnChanges(changes) {

        if (changes['page']) {

            var defineValues = (s, sa, sd, dir) => {
                this.sortClass = s;
                this.sortAscClass = sa;
                this.sortDescClass = sd;
                this.sortDirection = dir;
            };

            if (this.page.sort == null) {
                defineValues(true, false, false, 'ASC');
                return;
            }
            var one:PaginationPropertySort = this.page.sort.find(e => e.property === this.property);

            if (one == null) {
                defineValues(true, false, false, 'ASC');
            } else {
                if (one.direction === 'ASC') {
                    defineValues(false, true, false, 'DESC');
                } else {
                    defineValues(false, false, true, 'ASC');
                }
            }
        }
    }

    sortByProperty() {

        let sort:PaginationPropertySort;
        sort = {property: this.property, direction: this.sortDirection};

        let pageNumber = this.page.number - 1;
        if (pageNumber < 0) {
            pageNumber = 0;
        }

        let observable:Rx.Observable<any> = this.table.fetchPage(pageNumber, this.page.size, sort);

        if (observable != null) {
            showLoading();
            observable.subscribe(() => {
            }, () => {
                hideLoading()
            }, hideLoading);
        }
    }
}

export var tableDirectives:Array<any> = [
    TableElementsCount,
    TablePagination,
    TableSort,
];
