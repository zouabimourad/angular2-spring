import {CORE_DIRECTIVES} from 'angular2/common';
import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES} from "angular2/router";
import * as Rx from "rxjs/Rx";
import {webServiceEndpoint, defaultItemsCountPerPage} from './constants'
import {PersonService} from './service/personService';
import {PaginationPage, PaginationPropertySort} from './common/pagination';
import {tableDirectives, Table} from './components/table/table';
import {showLoading, hideLoading} from "./common/loader";

import {PersonListComponent} from "./personList";
import {RouteParams} from "angular2/router";
import {Inject} from "angular2/core";

@Component({
    selector: 'app',
    templateUrl: 'app/person.html',
    directives: [CORE_DIRECTIVES, ROUTER_DIRECTIVES, tableDirectives]
})
export class PersonComponent {

    self:PersonListComponent;

    person:any;

    constructor(@Inject(RouteParams) private  routeParams:RouteParams, private personService:PersonService) {

    }

    ngOnInit() {
        console.log(this.routeParams);
        var param = this.routeParams.params['personId'];
        this.personService.getPerson(Number(param)).subscribe(person => this.person = person);
    }

}