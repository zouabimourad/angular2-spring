/// <reference path="../typings/tsd.d.ts" />

import {provide, bind, Injectable} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';

import {PersonService} from './app/service/personService';
import {App} from './app/app';

bootstrap(App, [PersonService]);

