import {CORE_DIRECTIVES} from '@angular/common';
import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES,Routes,Router} from "@angular/router";
import {PersonListComponent} from "./personList";
import {PersonComponent} from "./person";

@Component({
    selector: 'app',
    templateUrl: 'app/app.html',
    directives: [CORE_DIRECTIVES, ROUTER_DIRECTIVES, PersonListComponent]
})
@Routes([
    {path: '/', component: PersonListComponent},
    {path: '/person', component: PersonComponent}
])
export class App {

    constructor(private router:Router) {

    }

    ngOnInit() {
        this.router.navigate(['/']);
    }
}

