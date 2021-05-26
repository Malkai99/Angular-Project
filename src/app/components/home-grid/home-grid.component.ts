import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { BehaviorSubject } from 'rxjs';
import { GetDataService } from '../../services/get_data_api.service'

@Component({
  selector: 'home-grid',
  templateUrl: './home-grid.component.html',
  styleUrls: ['./home-grid.component.scss']
})
export default class HomeGridComponent implements OnInit {

  dataService;
  dataInfo = [];
  cardHover:boolean;
  // refreshDataService = new BehaviorSubject<boolean>(true);

  constructor(private httpClient:HttpClient, private getDataService:GetDataService  ) {

    // this.dataService = this.httpClient.get('https://private-c3edb-postsmock.apiary-mock.com/posts');
    // this.dataService
    //   .toPromise()
    //   .then( data => {
    //     console.log(data)
    //     for(let key in data) {
    //       // console.log(key)
    //       if(data.hasOwnProperty(key)){
    //         this.dataInfo.push(data[key])
    //       }
    //     }
    //   })
    //   .catch( err => console.log('Couldnt load resource ', err));
      this.cardHover = false;
   }

  ngOnInit(): void {
    this.dataService = this.getDataService.dataService.subscribe( data => {
      this.dataInfo = data;
      console.log('DATA INFO **********  ', this.dataInfo );
    });
    
  }

  changeCardHover(e): void{
    this.cardHover = !this.cardHover;
    if(this.cardHover){
      e.currentTarget.classList.add('hover');
    }else{
      e.currentTarget.classList.remove('hover');
    }
  }

  preventDefaultClick(event){
    console.log('click')
    event.preventDefault();
    event.stopPropagation();
  }

  controlsHover(event){
    // event.currentTarget.parentNode.parentNode.classList.remove('hover')
    // event.currentTarget.parentNode.parentNode.classList.add('card__hover')
    // console.log('parent ',event.currentTarget.parentNode.parentNode)

  }

  ngOnDestroy(){
    this.dataService.unsubscribe();
  }


}
