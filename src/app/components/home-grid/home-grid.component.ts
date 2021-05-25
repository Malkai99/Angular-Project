import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'home-grid',
  templateUrl: './home-grid.component.html',
  styleUrls: ['./home-grid.component.scss']
})
export default class HomeGridComponent implements OnInit {

  dataService;
  dataInfo = [];
  cardHover:boolean;

  constructor(private httpClient:HttpClient  ) {
    this.dataService = this.httpClient.get('https://private-c3edb-postsmock.apiary-mock.com/posts');
    this.dataService
      .toPromise()
      .then( data => {
        console.log(data)
        for(let key in data) {
          // console.log(key)
          if(data.hasOwnProperty(key)){
            this.dataInfo.push(data[key])
          }
        }
      })
      .catch( err => console.log('Couldnt load resource ', err));
      this.cardHover = false;
   }

  ngOnInit(): void {

    console.log('datra info', this.dataInfo)
  }

  changeCardHover(e): void{
    this.cardHover = !this.cardHover;
    if(this.cardHover){
      e.currentTarget.classList.add('hover');
    }else{
      e.currentTarget.classList.remove('hover');
    }
  }

}
