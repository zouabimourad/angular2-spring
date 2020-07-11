import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {PaginationPropertySort} from '../pagination';
import {Table} from '../table';
import {doNothing, hideLoading, showLoading} from '../commons'
import {PersonService} from '../person.service';
import {Person} from '../domain';
import {switchMap} from "rxjs/operators";

@Component({
    selector: 'app-person-list',
    templateUrl: './person-list.component.html',
    styleUrls: ['./person-list.component.css']
})
export class PersonListComponent implements OnInit, Table<Person> {

    personPage: any;
    self: Table<Person>;

    constructor(private personService: PersonService, private router: Router) {

    }

    ngOnInit() {
        let observable = this.fetchPage(0, 10, {property: "firstname", direction: "asc"})
        showLoading();
        observable.subscribe(doNothing, hideLoading, hideLoading);
        this.self = this;
    }

    fetchPage(pageNumber: number, pageSize: number, sort: PaginationPropertySort) {
        let observable = this.personService.findPersons(pageNumber, pageSize, sort);
        observable.subscribe(personPage => this.personPage = personPage);
        return observable;
    }

    goToDetails(person) {
        this.router.navigate(['person', person.id]);
    }

    delete(person) {
        let observable = this.personService.deletePerson(person.id);
        showLoading();
        observable.pipe(switchMap(() => {
            return this.fetchPage(0, 10, null);
        })).subscribe(doNothing, hideLoading, hideLoading);
    }

}
