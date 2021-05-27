import { Injectable, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators'
import { Observable, BehaviorSubject } from 'rxjs';
import { Post } from '../models/post.model';
@Injectable({
    providedIn: 'root',
})
export class GetDataService {
    private localKey = "Posts";
    dataService;
    // dataService: Observable<Array<{}>>;
    obsDataService$: Observable<any>;
    refreshDataService = new BehaviorSubject<any>(null);
    dataInfo=[];
    @Input('posts') postsData;
    constructor(private httpClient: HttpClient) {
        this.obsDataService$ = this.refreshDataService.asObservable();
        if(this.loadLocalStorage()){
            this.setPosts(this.loadLocalStorage(),false)
        }else{
            this.getDataPost().subscribe( data => this.setPosts(data) );
        }
        // this.dataService = this.getDataPost();
        console.log('observer ', this.obsDataService$)

    }

    setPosts(posts,saveOnLocal=true){
        this.refreshDataService.next(posts);
        if(saveOnLocal){
            this.saveOnLocalStorage(JSON.stringify(posts));
        }
    }

    ngOnInit(): void {
        // this.refreshDataService$.subscribe( data =>  localStorage.setItem(this.localKey,data));
    }

    saveOnLocalStorage(data){
        console.log('data', JSON.parse(data))
        localStorage.setItem(this.localKey,data);
    }

    editSinglePostLocalStorage(postData){
        let dataStorage = JSON.parse(localStorage.getItem(this.localKey));
        console.log('Recive data ', postData)
        dataStorage.filter((post) => post.id === +postData.id)[0] = {};
        console.log('Data stprage',dataStorage.filter((post) => post.id === +postData.id)[0])
        this.saveOnLocalStorage(JSON.stringify(dataStorage));
    }

    loadLocalStorage(){
        console.log('local key', JSON.parse(localStorage.getItem(this.localKey)))
        return JSON.parse(localStorage.getItem(this.localKey));
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
        this.saveOnLocalStorage(JSON.stringify(this.refreshDataService.getValue()));
    }

    updatePostComments(id, comments){
        const currentPost = this.refreshDataService.getValue().filter((post) => post.id === +id)[0];
        currentPost.comments = comments;
        this.editSinglePostLocalStorage(currentPost);
    }

    getSinglePost(id){
        const currentPost = this.refreshDataService.getValue();
        return currentPost.filter((post) => post.id === +id)[0];
    }

    getArrayLengthPost(){
        const currentPost = this.refreshDataService.getValue();
        return currentPost.length;
    }

    addDataPost(post) {
        post.id = this.getArrayLengthPost() + 1;
        this.setPost(post);
    }

}