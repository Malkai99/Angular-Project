import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-project';

  handleNavBar(event) :void{
    document.querySelectorAll('.card').forEach(element => {
      if(element.classList.contains('active'))
        element.classList.remove('active');
    });
    event.currentTarget.classList.add('active');
  }
}
