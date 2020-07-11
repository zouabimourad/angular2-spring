import {PaginationPage, PaginationPropertySort} from '../pagination';
import {Table} from '../table';
import {doNothing, hideLoading, showLoading} from "../commons"
import {Component, Input, OnChanges, OnInit} from "@angular/core";

@Component({
    selector: 'app-table-pagination',
    templateUrl: './table-pagination.component.html',
    styleUrls: ['./table-pagination.component.css']
})
export class TablePaginationComponent implements OnInit, OnChanges {

    @Input() table: Table<any>;
    @Input() page: PaginationPage<any>;

    pagesIndexes: Array<number> = [];

    ngOnInit() {

    }

    ngOnChanges(changes) {
        if (changes['page']) {
            let pagesIndexes_: Array<number> = [];
            for (let i = 0; i < this.page.totalPages; i++) {
                pagesIndexes_.push(i + 1);
            }
            this.pagesIndexes = pagesIndexes_;
        }
    }

    fetchPageNumber(pageNumer: number) {
        let observable = this.table.fetchPage(pageNumer - 1, this.page.size, this.getSort());
        if (observable != null) {
            showLoading();
            observable.subscribe(doNothing,hideLoading,hideLoading);
        }
    }

    fetchPageSize(pageSize: number) {
        let observable = this.table.fetchPage(this.page.number, pageSize, this.getSort());
        if (observable != null) {
            showLoading();
            observable.subscribe(doNothing,hideLoading,hideLoading);
        }
    }

    fetchNextPage() {
        if (this.page.number + 1 >= this.page.totalPages) {
            return;
        }

        let observable = this.table.fetchPage(this.page.number + 1, this.page.size, this.getSort());
        if (observable != null) {
            showLoading();
            observable.subscribe(doNothing,hideLoading,hideLoading);
        }
    }

    fetchPreviousPage() {
        if (this.page.number == 0) {
            return;
        }

        let observable = this.table.fetchPage(this.page.number - 1, this.page.size, this.getSort());
        if (observable != null) {
            showLoading();
            observable.subscribe(doNothing,hideLoading,hideLoading);
        }
    }

    private getSort(): PaginationPropertySort {
        if (this.page.sort != null && this.page.sort.length > 0) {
            return this.page.sort[0];
        } else {
            return null;
        }
    }
}
