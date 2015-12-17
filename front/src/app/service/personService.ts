import {webServiceEndpoint} from '../constants'
import {PaginationPage, PaginationPropertySort} from '../common/pagination';
import * as Rx from "rxjs/Rx";

export class PersonService {

    fetchAllPersons(page:number, pageSize:number, sort:PaginationPropertySort) {
        let params:any = {size: pageSize, page: page};
        if (sort != null) {
            params.sort = sort.property + "," + sort.direction;
        }
        return <Rx.Observable<PaginationPage<any>>> Rx.Observable.fromPromise(
            $.ajax({dataType: "json", url: webServiceEndpoint + '/person', data: params})

        ).publish().refCount();
    }
}