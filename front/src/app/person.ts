import {CORE_DIRECTIVES} from 'angular2/common';
import {Component,Inject} from 'angular2/core';
import {ROUTER_DIRECTIVES,Router,RouteParams,Location} from "angular2/router";
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

    person:any;

    constructor(@Inject(RouteParams) private  routeParams:RouteParams, @Inject(Router) private router:Router, @Inject(Router) private location:Location, private personService:PersonService) {

    }

    ngOnInit() {
        var param = this.routeParams.params['personId'];
        this.personService.getPerson(Number(param)).subscribe(person => this.person = person);
    }

    delete(person) {
        let observable:Rx.Observable<PaginationPage<any>> = this.personService.deletePerson(person.id);
        showLoading();
        observable.subscribe(()=> {
        }, hideLoading, ()=> {
            this.router.navigateByInstruction(this.router.generate(['/PersonList']));
            hideLoading()
        });
    }

    back() {
        this.location.back();
    }
}