import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
@Injectable({
    providedIn: 'root',
})
export class GetDataService {
    dataService;
    dataInfo=[];
    constructor(private httpClient: HttpClient) {
        // this.getDataPost();
        // this.getCategories();
    }

    ngOnInit(): void {
        // Suscribe
        //Getting the data from json
        
        // Promise
        // this.dataService = this.httpClient.get('https://private-c3edb-postsmock.apiary-mock.com/posts');
        // this.dataService
        // .toPromise()
        // .then( data => {
        //     console.log(data)
        //     for(let key in data) {
        //     // console.log(key)
        //     if(data.hasOwnProperty(key)){
        //         this.dataInfo.push(data[key])
        //     }
        //     }
        // })
        // .catch( err => console.log('Couldnt load resource ', err));
    }
    getDataPost(): void {
        console.log('asdasd ', this.httpClient.get('https://private-c3edb-postsmock.apiary-mock.com/posts'))
        this.httpClient.get('https://private-c3edb-postsmock.apiary-mock.com/posts')
        .pipe(map( (response:Response) =>  this.dataInfo['posts']))
    }
    
    getCategories(): void {
        this.httpClient.get('https://private-c3edb-postsmock.apiary-mock.com/categories')
        .pipe(map( (response:Response) =>  this.dataInfo['categories']))
    }
}