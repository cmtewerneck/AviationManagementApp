// MÓDULOS
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TooltipModule} from 'ngx-bootstrap/tooltip';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgxMaskModule } from 'ngx-mask';
import { NgBrazil } from 'ng-brazil';
import { TextMaskModule } from 'angular2-text-mask';
import { NavegacaoModule } from './navegacao/navegacao.module';

// COMPONENTES
import { AppComponent } from './app.component';
import { HomepageComponent } from './Components/homepage/homepage.component';
import { ProdutosComponent } from './Components/produtos/produtos.component';
import { TripulacaoComponent } from './Components/tripulacao/tripulacao.component';
import { AuthInterceptor } from './auth/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    ProdutosComponent,
    TripulacaoComponent,
  ],
  imports: [
    BrowserModule,
    NavegacaoModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    TabsModule.forRoot(),
    NgxMaskModule.forRoot(),
    ModalModule.forRoot(),
    ToastrModule.forRoot(),
    AppRoutingModule,
    TextMaskModule,
    NgBrazil,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
