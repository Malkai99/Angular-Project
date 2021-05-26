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
    obsDataService$: Observable<any>;
    refreshDataService = new BehaviorSubject<any>(null);
    dataInfo=[];
    @Input('posts') postsData;
    constructor(private httpClient: HttpClient) {
        this.obsDataService$ = this.refreshDataService.asObservable();
        this.getDataPost().subscribe( data => this.setPosts(data) );
        // this.dataService = this.getDataPost();
        console.log('observer ', this.obsDataService$)

        // this.getDataPost().subscribe( data => this.dataInfo['posts'] = data );
        // this.refreshDataService.subscribe( data =>  data)
        // this.postsData = this.dataInfo['posts'];
        // console.log('post data ',this.postsData)


    }

    setPosts(posts){
        this.refreshDataService.next(posts);
    }

    ngOnInit(): void {
        // this.refreshDataService.subscribe( data =>  console.log('refresh data ', data));
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

    setPost(post){
        const currentPost = this.refreshDataService.getValue();
        this.refreshDataService.next([...currentPost,post])
    }

    getSinglePost(id){
        const currentPost = this.refreshDataService.getValue();
        // console.log(' asdasda ', currentPost.filter((post) => post.id === id)[0])
        return currentPost.filter((post) => post.id === +id)[0];
    }

    getArrayLengthPost(){
        const currentPost = this.refreshDataService.getValue();
        return currentPost.length;
    }

    addDataPost(post) {
        post.id = this.getArrayLengthPost() + 1;
        // this.dataInfo['posts'].push(post);
        // console.log('push data ', this.dataInfo['posts'])
        this.setPost(post);
    }

}