import {PaginationPropertySort} from './pagination';


export interface Table<T> {

    fetchPage(pageNumber:number, pageSize:number, sort:PaginationPropertySort)

}
