import {Injectable} from '@angular/core';
import {Person} from './domain'
import {PaginationPage, PaginationPropertySort} from './pagination';
import {webServiceEndpoint} from './commons';
import {Http, Response, URLSearchParams, RequestOptions} from '@angular/http';
import {Resolve, RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';
import * as Rx from "rxjs/Rx";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publish';

@Injectable()
export class PersonService implements Resolve<Person>{

    constructor(private http: Http) {

    }

    findPersons(page: number, pageSize: number, sort: PaginationPropertySort): Rx.Observable<PaginationPage<Person>> {
        let params = new URLSearchParams();
        params.set('size', `${pageSize}`);
        params.set('page', `${page}`);
        if (sort != null) {
            params.set('sort', `${sort.property},${sort.direction}`);
        }

        let options = new RequestOptions({
            search: params
        });
        return this.http.get(`${webServiceEndpoint}/person`, options).map(this.extractData).publish().refCount();
    }

    getPerson(id: number): Rx.Observable<Person> {
        return this.http.get(`${webServiceEndpoint}/person/${id}`).map(this.extractData).publish().refCount();
    }

    resolve(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): Rx.Observable<Person> {
        return this.getPerson(Number(route.params['id']));
    }

    deletePerson(id: number): Rx.Observable<Response> {
        return this.http.delete(`${webServiceEndpoint}/person/${id}`).publish().refCount();
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }
}
