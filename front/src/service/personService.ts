/// <reference path="/typings/jquery/jquery.d.ts" />

import {Injectable } from 'angular2/angular2';
import {webServiceEndpoint} from 'constants'

import {PaginationTable , PaginationTablePropertySort} from 'app/paginationTable'

@Injectable()
export class PersonService {

    fetchAllPersons(page:number, pageSize:number, sort:Array<PaginationTablePropertySort>) {
        var sortQuery = "";
        if (sort != null) {
            for (var sortEntry of sort) {
                sortQuery += "&sort=" + sortEntry.property + "," + sortEntry.direction;
            }
        }
        return $.ajax({
            dataType: "json",
            url: webServiceEndpoint + '/person?size=' + pageSize + '&page=' + page + sortQuery
        });
    }
}