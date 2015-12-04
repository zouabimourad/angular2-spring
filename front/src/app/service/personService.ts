
import {webServiceEndpoint} from 'app/constants'
import {PaginationPage, PaginationPropertySort} from 'app/common/pagination';

export class PersonService {

    fetchAllPersons(page:number, pageSize:number, sort : PaginationPropertySort) {
        var sortQuery = "";
        if (sort != null) {            
            sortQuery += "&sort=" + sort.property + "," + sort.direction;            
        }
        return <Rx.Observable<PaginationPage<any>>> Rx.Observable.fromPromise(
            $.ajax({ dataType: "json", url: webServiceEndpoint + '/person?size=' + pageSize + '&page=' + page + sortQuery })
                    
        ).publish().refCount();
    }
}