import {CORE_DIRECTIVES} from '@angular/common';
import {Component,Inject} from '@angular/core';
import {ROUTER_DIRECTIVES,Router,RouteSegment} from "@angular/router";
import * as Rx from "rxjs/Rx";
import {webServiceEndpoint, defaultItemsCountPerPage} from './constants'
import {showLoading, hideLoading} from "./common/loader";
import {tableDirectives, Table} from './components/table/table';
import {PaginationPage, PaginationPropertySort} from './common/pagination';
import {PersonService} from './service/personService';
import {PersonListComponent} from "./personList";

@Component({
    selector: 'app',
    templateUrl: 'app/person.html',
    directives: [CORE_DIRECTIVES, ROUTER_DIRECTIVES, tableDirectives]
})
export class PersonComponent {

    self:PersonListComponent;

    person:Person;

    constructor(private  routeParams:RouteSegment, private router:Router, private personService:PersonService) {

    }

    ngOnInit() {
        var param = this.routeParams.getParam('personId');
        this.personService.getPerson(Number(param)).subscribe(person => this.person = person);
    }

    delete(person) {
        let observable:Rx.Observable<void> = this.personService.deletePerson(person.id);
        showLoading();
        observable.subscribe(()=> {
        }, hideLoading, ()=> {
            this.router.navigate(['/']);
            hideLoading()
        });
    }

    back() {
        history.back();
    }
}
