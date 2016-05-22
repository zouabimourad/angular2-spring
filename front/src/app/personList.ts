import {CORE_DIRECTIVES} from '@angular/common';
import {Component,Inject} from '@angular/core';
import {ROUTER_DIRECTIVES,Router} from "@angular/router";
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
export class PersonListComponent implements Table {

    personPage:PaginationPage<Person>;
    self:PersonListComponent;

    constructor(private personService:PersonService, @Inject(Router) private router:Router) {

    }

    ngOnInit() {
        let observable:Rx.Observable<PaginationPage<any>> = this.fetchPage(0, defaultItemsCountPerPage, null);
        showLoading();
        observable.subscribe(() => {}, hideLoading, hideLoading);
        this.self = this;
    }

    fetchPage(pageNumber:number, pageSize:number, sort:PaginationPropertySort):Rx.Observable<PaginationPage<Person>> {
        let observable:Rx.Observable<PaginationPage<Person>> = this.personService.findPersons(pageNumber, pageSize, sort);
        observable.subscribe(personPage => this.personPage = personPage);
        return observable;
    }

    goToDetails(person) {
        this.router.navigate(['/person', {personId: person.id }]);
    }

    delete(person) {
        let observable:Rx.Observable<PaginationPage<any>> = this.personService.deletePerson(person.id);
        showLoading();
        observable.switchMap(() => {

            return this.fetchPage(0, defaultItemsCountPerPage, null);

        }).subscribe(() => {}, hideLoading, hideLoading);
    }
}
