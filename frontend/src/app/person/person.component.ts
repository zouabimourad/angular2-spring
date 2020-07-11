import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';


import {PersonService} from '../person.service';
import {Person} from '../domain';
import {doNothing, hideLoading, showLoading} from '../commons'

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
        let observable = this.personService.deletePerson(person.id);
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
