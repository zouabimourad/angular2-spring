/// <reference path="../../typings/tsd.d.ts" />

import {provide} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';

import {ROUTER_PROVIDERS,LocationStrategy,HashLocationStrategy} from 'angular2/router';
import {PersonService} from './service/personService';
import {App} from './app';

bootstrap(App, [ROUTER_PROVIDERS,provide(LocationStrategy,
    {useClass: HashLocationStrategy}),PersonService]);

