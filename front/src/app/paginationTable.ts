/// <reference path="/typings/angular2/angular2.d.ts" />

import {ComponentAnnotation as Component, ViewAnnotation as View,ParentAnnotation as Parent,DirectiveAnnotation as Directive ,AncestorAnnotation as Ancestor, EventEmitter, ElementRef, bootstrap, NgIf , NgFor} from 'angular2/angular2';
import {webServiceEndpoint , defaultItemsCountPerPage} from 'constants'
import {ContratService} from 'service/contratService'

@Component({
    selector: 'paginationTable',
    properties: {
        'definition': 'definition',
        'provider': 'provider'
    }
})
@View({
    templateUrl: 'app/paginationTable.html',
    directives: [NgIf, NgFor]
})
export class PaginationTable {

    columns : Array<PaginationTableColumn> = [];
    provider:PaginationTableDataProvider;

    tablePage:PaginationTablePage;

    constructor() {
        this.tablePage = {number: 0, size: defaultItemsCountPerPage, sort: []};
        setTimeout(()=> (this.fecthPage(this.tablePage.number, this.tablePage.size, this.tablePage.sort)), 1);
    }

    addColumn( column :  PaginationTableColumn ) {
        this.columns.push(column);
    }

    fecthPage(pageNumber:number, size:number, sort:Array<PaginationTablePropertySort>) {
        $.when(this.provider.fetchPage(pageNumber, size, sort)).done((data) => this.tablePage = data);
    }

    fetchNextPage() {
        this.fecthPage(this.tablePage.number + 1, this.tablePage.size, this.tablePage.sort);
    }

    fetchPreviousPage() {
        this.fecthPage(this.tablePage.number - 1, this.tablePage.size, this.tablePage.sort);
    }

    fetchPageNumber($event) {
        if ($event.which !== 13) {
            return;
        }
        if (isNaN($event.target.value)) {
            return;
        }
        var pageNumber:Number = new Number($event.target.value);
        this.fecthPage($event.target.value - 1, this.tablePage.size, this.tablePage.sort);
    }

    changePageSize($event) {
        if ($event.which !== 13) {
            return;
        }
        if (isNaN($event.target.value)) {
            return;
        }
        this.fecthPage(this.tablePage.number, +$event.target.value, this.tablePage.sort);
    }

    propertySort(propertyName:string):boolean {
        if (this.tablePage.sort == null) {
            return false;
        }
        return this.tablePage.sort.filter(e => e.property === propertyName).length != 0;

    }

    propertySortAsc(propertyName:string):boolean {
        if (this.tablePage.sort == null) {
            return false;
        }
        return this.tablePage.sort.filter(e => e.property === propertyName && e.direction === 'ASC').length != 0;
    }

    propertySortDesc(propertyName:string):boolean {
        if (this.tablePage.sort == null) {
            return false;
        }
        return this.tablePage.sort.filter(e => e.property === propertyName && e.direction === 'DESC').length != 0;
    }

    sortBy(property:string, direction:string) {
        if (this.tablePage.sort == null) {
            this.tablePage.sort = [];
        }
        var filtred:Array<PaginationTablePropertySort> = this.tablePage.sort.filter(e => e.property == property);
        if (filtred.length == 0) {
            this.tablePage.sort.push({direction: direction, property: property});
        } else {
            filtred[0].direction = direction;
            filtred[0].property = property;
        }
        this.fecthPage(this.tablePage.number, this.tablePage.size, this.tablePage.sort);
    }

    unSortBy(property:string) {
        if (this.tablePage.sort == null || this.tablePage.sort.length == 0) {
            return;
        }

        var filtred:Array<PaginationTablePropertySort> = this.tablePage.sort.filter(e => e.property == property);
        if (filtred.length != 0) {
            var index = this.tablePage.sort.indexOf(filtred[0]);
            this.tablePage.sort.splice(index);
        }
        this.fecthPage(this.tablePage.number, this.tablePage.size, this.tablePage.sort);
    }
}


interface PaginationTablePage {
    last? : boolean;
    first? : boolean;
    number : number;
    size : number;
    sort? : Array<PaginationTablePropertySort>;
}

interface PaginationTablePropertySort {
    direction : string;
    property: string;
}

interface PaginationTableDataProvider {
    fetchPage(pageNumber:number, size:number, sort:Object);
}

@Directive({
    selector: 'paginationTableColumn'
})
export class PaginationTableColumn {
    properties : Array<PaginationTableProperty> = [];
    constructor(el: ElementRef, @Ancestor() paginationTable: PaginationTable) {
        paginationTable.addColumn(this);
    }
    addProperty ( property :  PaginationTableProperty ) {
        this.properties.push(property);
    }
}

@Directive({
    selector: 'paginationTableProperty',
    properties: {
        'name': 'name',
        'label': 'label',
        'sortable': 'sortable'
    }
})
export class PaginationTableProperty {
    name : string;
    label : string;
    sortable : boolean  =false;
    paginationTableColumn : PaginationTableColumn;

    constructor(el: ElementRef, @Ancestor() paginationTableColumn : PaginationTableColumn) {
        this.paginationTableColumn = paginationTableColumn;
        paginationTableColumn.addProperty(this);
    }
}