/**
 * Created by MZO on 29/06/2015.
 */


export interface PaginationPage<T> {
    content? : Array<T>;
    last?: boolean;
    first?: boolean;
    number: number;
    size: number;PaginationPropertySort
    totalPages? : number;
    itemsPerPage?: number;
    sort?: Array<PaginationPropertySort>;
}

export interface PaginationPropertySort {
    direction: string;
    property: string;
}