import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Components/main/header/header.component';
import { FooterComponent } from './Components/main/footer/footer.component';
import { LoginComponent } from './Components/login/login.component';
import { MainComponent } from './Components/main/main.component';
import { MainSidebarComponent } from './Components/main/main-sidebar/main-sidebar.component';
import { ControlSidebarComponent } from './Components/main/control-sidebar/control-sidebar.component';
import { ContatoComponent } from './Components/pages/contato/contato.component';
import { HomepageComponent } from './Components/pages/homepage/homepage.component';
import { PageNotFoundComponent } from './Components/pages/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    MainComponent,
    MainSidebarComponent,
    ControlSidebarComponent,
    HomepageComponent,
    ContatoComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
