import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss']
})
export class SinglePostComponent implements OnInit {
  protected idPost: String;
  protected dataService;
  public dataInfo;
  public comment:String = '';

  constructor( private route:ActivatedRoute, private httpClient:HttpClient) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe( (paramMap:Object) => {
      const { params }:any = paramMap;
      this.loadPost(params.variable)
    })
  }

  loadPost(id:String){
    console.log('get link ', `https://private-c3edb-postsmock.apiary-mock.com/posts/{${id}}`)
    this.httpClient.get(`https://private-c3edb-postsmock.apiary-mock.com/posts/{${id}}`)
      .subscribe( reponse => {
        this.dataInfo = reponse;
        console.log('datasas ', reponse)
      });
      
  }

  postComment(){
    this.dataInfo.comments.push({id:3,author:"Santiago Ortega",content: this.comment})
    this.comment = '';
  }

}
