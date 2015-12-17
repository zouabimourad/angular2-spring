import {CORE_DIRECTIVES} from 'angular2/common';
import {Component} from 'angular2/core';
import * as Rx from "rxjs/Rx";
import {webServiceEndpoint, defaultItemsCountPerPage} from './constants'
import {PersonService} from './service/personService';
import {PaginationPage, PaginationPropertySort} from './common/pagination';
import {tableDirectives, Table} from './components/table/table';
import {showLoading, hideLoading} from "./common/loader";

@Component({
    selector: 'app',
    templateUrl: 'app/app.html',
    directives: [CORE_DIRECTIVES, tableDirectives]
})
export class App implements Table {

    personPage: any;
    self: App;


    constructor(private personService: PersonService) {
        let observable: Rx.Observable<PaginationPage<any>> = this.fetchPage(0, defaultItemsCountPerPage, null);
        showLoading();
        observable.subscribe(() => {}, hideLoading, hideLoading);
        this.self = this;
    }

    fetchPage(pageNumber: number, pageSize: number, sort: PaginationPropertySort): Rx.Observable<PaginationPage<any>> {
        let observable: Rx.Observable<PaginationPage<any>> = this.personService.fetchAllPersons(pageNumber, pageSize, sort);
        observable.subscribe(personPage => this.personPage = personPage);
        return observable;
    }
}

