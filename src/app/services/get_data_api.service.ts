import { Injectable, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators'
import { Observable, BehaviorSubject } from 'rxjs';
import { Post } from '../models/post.model';
@Injectable({
    providedIn: 'root',
})
export class GetDataService {

    dataService;
    // dataService: Observable<Array<{}>>;
    refreshDataService = new BehaviorSubject<Array<{}>>([]);
    dataInfo=[];
    @Input('posts') postsData;
    constructor(private httpClient: HttpClient) {
        this.getDataPost().subscribe( data => this.dataInfo['posts'] = data );
        // this.dataService = this.refreshDataService.pipe(switchMap(_ => this.getDataPost()));
        this.dataService = this.getDataPost();
        this.refreshDataService.subscribe( data =>  data)

        console.log('Observable data',this.dataService)
        console.log('info data ',this.dataInfo)

        this.postsData = this.dataInfo['posts'];
        console.log('post data ',this.postsData)

    }

    ngOnInit(): void {
        this.refreshDataService.subscribe( data =>  console.log('refresh data ', data));
    }

    getDataPost() {
        let respo = this.httpClient.get('https://private-c3edb-postsmock.apiary-mock.com/posts')
        .pipe(map( (response:Response) =>  response))
        return respo;
    }
    
    getCategories() {
        return this.httpClient.get('https://private-c3edb-postsmock.apiary-mock.com/categories')
        .pipe(map( (response:Response) =>  response))
        
    }

    addDataPost(post) {
        post.id = this.dataInfo['posts'].length + 1;
        this.dataInfo['posts'].push(post);
        console.log('pus data ', this.dataInfo['posts'])
        this.refreshDataService.next(this.dataInfo);
    }

}