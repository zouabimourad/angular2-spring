/// <reference path="../../typings/tsd.d.ts" />

import {provide} from '@angular/core';
import {bootstrap}    from '@angular/platform-browser-dynamic';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {ROUTER_PROVIDERS} from '@angular/router';
import {PersonService} from './service/personService';
import {App} from './app';

bootstrap(App, [ROUTER_PROVIDERS, provide(LocationStrategy,
    {useClass: HashLocationStrategy}), PersonService]);



