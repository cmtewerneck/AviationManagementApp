// MÓDULOS
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NavegacaoModule } from './navegacao/navegacao.module';

// COMPONENTES
import { AppComponent } from './app.component';
import { HomepageComponent } from './Components/homepage/homepage.component';
import { AuthInterceptor } from './auth/auth.interceptor';
// import { ErrorInterceptor } from './_services/error.handler.service';

// export const httpInterceptorProviders = [
//   { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
// ];

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NavegacaoModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule
  ],
  providers: [
    // httpInterceptorProviders
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
