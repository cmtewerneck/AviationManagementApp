import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TooltipModule} from 'ngx-bootstrap/tooltip';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

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
import { FornecedoresComponent } from './Components/pages/fornecedores/fornecedores.component';
import { OperacoesComponent } from './Components/pages/operacoes/operacoes.component';
import { CoordenacaoComponent } from './Components/pages/coordenacao/coordenacao.component';
import { AeronavesComponent } from './Components/pages/aeronaves/aeronaves.component';
import { ManutencaoComponent } from './Components/pages/manutencao/manutencao.component';
import { TripulacaoComponent } from './Components/pages/tripulacao/tripulacao.component';
import { AeromedicoComponent } from './Components/pages/aeromedico/aeromedico.component';
import { FerramentariaComponent } from './Components/pages/ferramentaria/ferramentaria.component';
import { VeiculosComponent } from './Components/pages/veiculos/veiculos.component';
import { UsuariosComponent } from './Components/pages/usuarios/usuarios.component';
import { ClientesComponent } from './Components/pages/clientes/clientes.component';
import { RegisterComponent } from './Components/register/register.component';

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
    PageNotFoundComponent,
    RegisterComponent,
    FornecedoresComponent,
    OperacoesComponent,
    CoordenacaoComponent,
    AeronavesComponent,
    ManutencaoComponent,
    TripulacaoComponent,
    AeromedicoComponent,
    FerramentariaComponent,
    VeiculosComponent,
    UsuariosComponent,
    ClientesComponent
  ],
  imports: [
    BrowserModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    ToastrModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
