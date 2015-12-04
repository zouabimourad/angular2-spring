/// <reference path="../typings/tsd.d.ts" />

import {bootstrap,provide, bind, CORE_DIRECTIVES, Injectable} from 'angular2/angular2';
import {PersonService} from 'app/service/personService';
import { App } from 'app/app';

bootstrap(App , [PersonService]);
