import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from '../app/app.component'
import { SinglePostComponent } from '../app/components/single-post/single-post.component'
import { HomeComponentComponent } from './components/home-component/home-component.component';


const routes: Routes = [
  {
    path:'',
    component: HomeComponentComponent
  },
  {
    path:'post/:variable',
    component: SinglePostComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
