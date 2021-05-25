import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.scss']
})
export class HomeComponentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  handleNavBar(event) :void{
    document.querySelectorAll('.card').forEach(element => {
      if(element.classList.contains('active'))
        element.classList.remove('active');
    });
    event.currentTarget.classList.add('active');
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
