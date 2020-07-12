import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from '../app/Components/main/main.component';
import { LoginComponent } from '../app/Components/login/login.component';
import { HomepageComponent } from './Components/pages/homepage/homepage.component';
import { ContatoComponent } from './Components/pages/contato/contato.component';
import { PageNotFoundComponent } from './Components/pages/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        component: HomepageComponent
      },
      {
        path: 'contato',
        component: ContatoComponent
      },
      {
        path: '**',
        component: PageNotFoundComponent
      },
    ],
  },
  {
    path: 'login',
    component: LoginComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
