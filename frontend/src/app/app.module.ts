import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {AppComponent} from './app.component';
import {PersonComponent} from './person/person.component';
import {PersonListComponent} from './person-list/person-list.component';
import {TableElementsCountComponent} from './table-elements-count/table-elements-count.component';
import {TablePaginationComponent} from './table-pagination/table-pagination.component';
import {TableSortComponent} from './table-sort/table-sort.component';
import {PersonService} from './person.service'
import {HttpClientModule} from "@angular/common/http";

const appRoutes: Routes = [
    {path: '', component: PersonListComponent},
    {path: 'person/:id', component: PersonComponent, resolve: {person: PersonService}}
];

@NgModule({
    declarations: [
        AppComponent,
        PersonComponent,
        PersonListComponent,
        TableElementsCountComponent,
        TablePaginationComponent,
        TableSortComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes)
    ],
    providers: [PersonService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
