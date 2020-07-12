import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from '../app/Components/main/main.component';
import { LoginComponent } from '../app/Components/login/login.component';


const routes: Routes = [{
  path: '', component: MainComponent
},{
  path: 'login', component: LoginComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
