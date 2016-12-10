import {PaginationPropertySort} from './pagination';

import * as Rx from "rxjs/Rx";

export interface Table {

    fetchPage(pageNumber:number, pageSize:number, sort:PaginationPropertySort): Rx.Observable<any>;

}
