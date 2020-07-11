import {Injectable} from '@angular/core';
import {Person} from './domain'
import {PaginationPropertySort} from './pagination';
import {webServiceEndpoint} from './commons';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {map, publish, refCount} from "rxjs/operators";
import {Observable} from "rxjs";

@Injectable()
export class PersonService implements Resolve<Person> {

    constructor(private http: HttpClient) {

    }

    findPersons(page: number, pageSize: number, sort: PaginationPropertySort) {
        let params = new HttpParams();
        params.append('size', `${pageSize}`);
        params.append('page', `${page}`);

        if (sort != null) {
            params.append('sort', `${sort.property},${sort.direction}`);
        }

        return this.http.get(`${webServiceEndpoint}/person`, {params: params})
            .pipe(map(e => {
                e['sort'] = (sort == null) ? [] : [sort];
                return e;
            }), publish(), refCount())

    }

    getPerson(id: number) {
        return this.http.get(`${webServiceEndpoint}/person/${id}`);
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        return this.getPerson(Number(route.params['id']));
    }

    deletePerson(id: number) {
        return this.http.delete(`${webServiceEndpoint}/person/${id}`);
    }

}
