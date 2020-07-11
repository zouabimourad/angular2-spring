// http://docs.spring.io/spring-data/commons/docs/current/api/org/springframework/data/domain/Pageable.html

export interface PaginationPropertySort {
    direction: string;
    property: string;
}

export interface PaginationPage<T> {
    content? : Array<T>;
    last?: boolean;
    first?: boolean;
    number: number;
    size: number;
    totalPages? : number;
    itemsPerPage?: number;
    sort?: Array<PaginationPropertySort>;
}

