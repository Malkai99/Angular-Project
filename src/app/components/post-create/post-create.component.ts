import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'btn-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  toggleOverlay(){
    console.log('click')
    if(!document.querySelector('.overlay__container').classList.contains('active')){
      document.querySelector('.overlay__container').classList.add('active');
    }else{
      document.querySelector('.overlay__container').classList.remove('active');
    }
  }

}
