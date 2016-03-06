import {CORE_DIRECTIVES} from 'angular2/common';
import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES} from "angular2/router";
import * as Rx from "rxjs/Rx";
import {webServiceEndpoint, defaultItemsCountPerPage} from './constants'
import {PersonService} from './service/personService';
import {PaginationPage, PaginationPropertySort} from './common/pagination';
import {tableDirectives, Table} from './components/table/table';
import {showLoading, hideLoading} from "./common/loader";

@Component({
    selector: 'app',
    templateUrl: 'app/personList.html',
    directives: [CORE_DIRECTIVES, ROUTER_DIRECTIVES, tableDirectives]
})
export class PersonList implements Table {

    personPage:any;
    self:PersonList;

    constructor(private personService:PersonService) {

    }

    ngOnInit() {
        let observable:Rx.Observable<PaginationPage<any>> = this.fetchPage(0, defaultItemsCountPerPage, null);
        showLoading();
        observable.subscribe(() => {
        }, hideLoading, hideLoading);
        this.self = this;
    }

    fetchPage(pageNumber:number, pageSize:number, sort:PaginationPropertySort):Rx.Observable<PaginationPage<any>> {
        let observable:Rx.Observable<PaginationPage<any>> = this.personService.fetchAllPersons(pageNumber, pageSize, sort);
        observable.subscribe(personPage => this.personPage = personPage);
        return observable;
    }
}