import {Injectable} from '@angular/core';
import {Person} from './domain'
import {PaginationPage, PaginationPropertySort} from './pagination';
import {webServiceEndpoint} from './commons';
import {Http, RequestOptions, Response, URLSearchParams} from '@angular/http';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
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

        return this.http.get(`${webServiceEndpoint}/person`, options)
          .map(this.extractData).map(e => { e.sort = (sort == null) ? [] : [sort]; return e; })
          .publish()
          .refCount();
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
