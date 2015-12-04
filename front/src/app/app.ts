import {CORE_DIRECTIVES} from 'angular2/angular2';
import {Component} from 'angular2/angular2';
import {webServiceEndpoint, defaultItemsCountPerPage} from 'app/constants'
import {PersonService} from 'app/service/personService';
import {PaginationPage, PaginationPropertySort} from 'app/common/pagination';
import {tableDirectives, Table} from 'app/components/table/table';
import {showLoading, hideLoading} from "app/common/loader";

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

