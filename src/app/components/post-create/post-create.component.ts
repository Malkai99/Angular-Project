import { Component, OnInit } from '@angular/core';
import { GetDataService } from '../../services/get_data_api.service'


interface Post{
  id:number;
  title:String;
  shortDescription:String;
  description:String;
  category:String;
  image:String;
  comments:Array<Object>;
}
@Component({
  selector: 'btn-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})

export class PostCreateComponent implements OnInit {

  public post:Post = {
    id : 0,
    title : '',
    description : '',
    shortDescription : '',
    category : '',
    image : 'https://source.unsplash.com/random',
    comments: []

  };
  constructor(private getDataService:GetDataService) { }

  ngOnInit(): void {
  }

  onSavePost(){
    this.getDataService.addDataPost(this.post);
    this.toggleOverlay();
  }

  toggleOverlay(){
    if(!document.querySelector('.overlay__container').classList.contains('active')){
      document.querySelector('.overlay__container').classList.add('active');
    }else{
      document.querySelector('.overlay__container').classList.remove('active');
    }
  }

}
