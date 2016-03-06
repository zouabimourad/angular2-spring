import {CORE_DIRECTIVES} from 'angular2/common';
import {Component} from 'angular2/core';
import {RouteConfig} from "angular2/router";
import {ROUTER_DIRECTIVES} from "angular2/router";
import * as Rx from "rxjs/Rx";
import {PersonList} from "./personList";

@Component({
    selector: 'app',
    templateUrl: 'app/app.html',
    directives: [CORE_DIRECTIVES, ROUTER_DIRECTIVES, PersonList]
})
@RouteConfig([
    {path: '/', name: 'PersonList', component: PersonList, useAsDefault: true}
])
export class App {


}

