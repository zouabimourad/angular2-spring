import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Response} from '@angular/http';
import * as Rx from 'rxjs/Rx';

import {PersonService} from '../person.service';
import {Person} from '../domain';
import {showLoading, hideLoading, doNothing} from '../commons'

@Component({
    selector: 'app-person',
    templateUrl: './person.component.html',
    styleUrls: ['./person.component.css']
})
export class PersonComponent {

    person: Person;

    constructor(private router: Router, private route: ActivatedRoute, private personService: PersonService) {
        this.person = route.snapshot.data['person'];
    }

    delete(person) {
        let observable: Rx.Observable<Response> = this.personService.deletePerson(person.id);
        showLoading();
        observable.subscribe(doNothing, hideLoading, ()=> {
            this.router.navigate(['']);
            hideLoading();
        });
    }

    back() {
        history.back();
    }
}
