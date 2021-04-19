// MÓDULOS
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NavegacaoModule } from './navegacao/navegacao.module';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { NgxPaginationModule } from 'ngx-pagination';

// COMPONENTES
import { AppComponent } from './app.component';
import { HomepageService } from './Components/homepage/homepage.service';
import { HomepageComponent } from './Components/homepage/homepage.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { ListaAeronavesComponent } from './Components/homepage/aeronaves/lista.aeronaves.component';
import { ListaTripulantesComponent } from './Components/homepage/tripulantes/lista.tripulantes.component';
import { ListaTreinamentosComponent } from './Components/homepage/treinamentos/lista.treinamentos.component';
import { ListaTarifasComponent } from './Components/homepage/tarifas/lista.tarifas.component';
import { ListaOrdensServicoComponent } from './Components/homepage/ordensServico/lista.ordensServico.component';
// import { ErrorInterceptor } from './_services/error.handler.service';

// export const httpInterceptorProviders = [
//   { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
// ];

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    ListaAeronavesComponent,
    ListaTripulantesComponent,
    ListaTreinamentosComponent,
    ListaTarifasComponent,
    ListaOrdensServicoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxPaginationModule,
    NavegacaoModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    TooltipModule.forRoot(),
    HttpClientModule
  ],
  providers: [
    // httpInterceptorProviders
    HomepageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
