import { bootstrap } from 'angular2/angular2';
import { RootRouter } from 'angular2/src/router/router';
import { Pipeline } from 'angular2/src/router/pipeline';
import { bind } from 'angular2/di';
import { Router } from 'angular2/router';
import { PipeRegistry } from 'angular2/change_detection';

import { App } from 'app/app';
import {routerInjectables} from 'angular2/router';

bootstrap(App, [routerInjectables]);
