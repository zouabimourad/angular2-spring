import {CORE_DIRECTIVES} from 'angular2/common';
import {Component} from 'angular2/core';
import {RouteConfig} from "angular2/router";
import {ROUTER_DIRECTIVES} from "angular2/router";
import * as Rx from "rxjs/Rx";
import {PersonListComponent} from "./personList";
import {PersonComponent} from "./person";

@Component({
    selector: 'app',
    templateUrl: 'app/app.html',
    directives: [CORE_DIRECTIVES, ROUTER_DIRECTIVES, PersonListComponent]
})
@RouteConfig([
    {path: '/', name: 'PersonList', component: PersonListComponent, useAsDefault: true},
    {path: '/person', name: 'Person', component: PersonComponent}
])
export class App {


}

