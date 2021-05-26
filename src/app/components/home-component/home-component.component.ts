import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GetDataService } from '../../services/get_data_api.service'
@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.scss']
})
export class HomeComponentComponent implements OnInit {

  dataService;
  categories=[];

  constructor(private httpClient:HttpClient, private getDataService:GetDataService) { }

  ngOnInit(): void {
    
    // this.dataService = this.httpClient.get('https://private-c3edb-postsmock.apiary-mock.com/categories')
    //   .toPromise()
    //   .then( data => {
    //     console.log(data)
    //     for(let key in data) {
    //       // console.log(key)
    //       if(data.hasOwnProperty(key)){
    //         this.categories.push(data[key])
    //       }
    //     }
    //   })
    //   .catch( err => console.log('Couldnt load resource ', err));
      // this.getDataService.getDataPost().subscribe( data => console.log('esta es la data ', data));
      // console.log('data servcice******',this.getDataService)
  }

  handleNavBar(event) :void{
    document.querySelectorAll('.card').forEach(element => {
      if(element.classList.contains('active'))
        element.classList.remove('active');
    });
    event.currentTarget.classList.add('active');

    document.querySelectorAll('.container__element').forEach( element => {
      if(event.currentTarget.getAttribute('data-category') == 'all'){
        // console.log('entro all')
        if(element.classList.contains('hidden')){
          element.classList.remove('hidden');
        }
        return;
      }

      if(element.getAttribute('data-category') !== event.currentTarget.getAttribute('data-category')){
        // console.log('data element ', element.getAttribute('data-category'))
        if(!element.classList.contains('hidden'))
          element.classList.add('hidden');
      }else if(element.classList.contains('hidden')){
        element.classList.remove('hidden');
      }

    })
  }
  
  toggleOverlay(){
    // console.log('click')
    if(!document.querySelector('.overlay__container').classList.contains('active')){
      document.querySelector('.overlay__container').classList.add('active');
    }else{
      document.querySelector('.overlay__container').classList.remove('active');
    }
  }

}
