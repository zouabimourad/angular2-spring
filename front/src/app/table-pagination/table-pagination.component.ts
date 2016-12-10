import { Component, OnInit , Input } from '@angular/core';
import { PaginationPage , PaginationPropertySort } from '../pagination';
import { Table } from '../table';
import {showLoading, hideLoading } from "../loader"
import * as Rx from "rxjs/Rx";

@Component({
  selector: 'app-table-pagination',
  templateUrl: './table-pagination.component.html',
  styleUrls: ['./table-pagination.component.css']
})
export class TablePaginationComponent implements OnInit {

    @Input() table:Table;
    @Input() page:PaginationPage<any>;

    ngOnInit() {

    }

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
