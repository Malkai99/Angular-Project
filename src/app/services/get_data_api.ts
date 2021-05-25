import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';

@Injectable()
export class GetDataService {
    constructor(private httpClient: HttpClient) {
    }
    getDataPost(): Observable<any> {

        let response = this.httpClient.get('https://private-c3edb-postsmock.apiary-mock.com/posts')
                            .subscribe( data => console.log('data',data))
        console.log(' response ', response)
        return this.httpClient.get('https://private-c3edb-postsmock.apiary-mock.com/posts');
    }
}