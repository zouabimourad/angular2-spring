import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Response} from '@angular/http';
import * as Rx from 'rxjs/Rx';

import { PersonService } from '../person.service';
import { Person } from '../domain';
import { showLoading, hideLoading } from '../loader'

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {

    self:PersonComponent;

    person:Person;

    constructor(private router:Router, private route: ActivatedRoute, private personService:PersonService) {

    }

    ngOnInit() {
        this.route.params.subscribe (params=> {
          this.personService.getPerson(Number(params['id'])).subscribe(person => this.person = person);
        });
        
    }

    delete(person) {
        let observable:Rx.Observable<Response> = this.personService.deletePerson(person.id);
        showLoading();
        observable.subscribe(()=> {
        }, hideLoading, ()=> {
            this.router.navigate(['']);
            hideLoading();
        });
    }

    back() {
        history.back();
    }
}
