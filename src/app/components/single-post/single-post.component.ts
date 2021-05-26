import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { GetDataService } from '../../services/get_data_api.service'
import { async } from 'rxjs/internal/scheduler/async';

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

  constructor( private route:ActivatedRoute, private httpClient:HttpClient , private getDataService:GetDataService) { }

  ngOnInit(): void {
    this.dataService = this.getDataService.obsDataService$;

    this.route.paramMap.subscribe( (paramMap:Object) => {
      const { params }:any = paramMap;
      this.loadPost(params.variable)
    })
  }

  loadPost(id:String){
    // console.log('get link ', `https://private-c3edb-postsmock.apiary-mock.com/posts/{${id}}`)
    // this.httpClient.get(`https://private-c3edb-postsmock.apiary-mock.com/posts/{${id}}`)
    //   .subscribe( reponse => {
    //     this.dataInfo = reponse;
    //     // console.log('datasas ', reponse)
    //   });

    this.dataInfo = this.getDataService.getSinglePost(id);
    // console.log('data service ***** ', this.getDataService.getSinglePost(id))
    // console.log('data  ***** ', this.dataService.getSinglePost(id))
  }

  postComment(){
    this.dataInfo.comments.push({id:3,author:"Santiago Ortega",content: this.comment})
    this.comment = '';
  }

}
