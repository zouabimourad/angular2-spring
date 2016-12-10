import { Component, OnInit } from '@angular/core';
import { Response} from '@angular/http';
import { Router } from '@angular/router';
import * as Rx from 'rxjs/Rx';

import 'rxjs/add/operator/switchMap';

import { PaginationPage, PaginationPropertySort } from '../pagination';
import { Table } from '../table';
import { showLoading, hideLoading } from '../loader'
import { PersonService } from '../person.service';
import { Person } from '../domain';


@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})
export class PersonListComponent implements OnInit {

  personPage: PaginationPage<Person>;

  self: PersonListComponent; 

  constructor(private personService: PersonService, private router: Router) {

  }

  ngOnInit() {
    let observable: Rx.Observable<PaginationPage<any>> = this.fetchPage(0, 10, null);
    showLoading();
    observable.subscribe(() => { }, hideLoading, hideLoading);
    this.self = this;
  }

  fetchPage(pageNumber: number, pageSize: number, sort: PaginationPropertySort): Rx.Observable<PaginationPage<Person>> {
    let observable: Rx.Observable<PaginationPage<Person>> = this.personService.findPersons(pageNumber, pageSize, sort);
    observable.subscribe(personPage => this.personPage = personPage);
    return observable;
  }

  goToDetails(person) {
    this.router.navigate(['person', person.id]);
  }

  delete(person) {

    let observable: Rx.Observable<Response> = this.personService.deletePerson(person.id);
    showLoading();
    observable.switchMap(() => {
      return this.fetchPage(0, 10, null);
    }).subscribe(() => { }, hideLoading, hideLoading);
  }
}