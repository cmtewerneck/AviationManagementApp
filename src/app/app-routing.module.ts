import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from '../app/Components/main/main.component';
import { LoginComponent } from '../app/Components/login/login.component';
import { HomepageComponent } from './Components/pages/homepage/homepage.component';
import { ContatoComponent } from './Components/pages/contato/contato.component';
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
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: '',
    component: MainComponent,
    children: [
      { path: '', component: HomepageComponent, canActivate: [AuthGuard], },
      { path: 'contato', component: ContatoComponent, canActivate: [AuthGuard], },
      { path: 'fornecedores', component: FornecedoresComponent, canActivate: [AuthGuard], },
      { path: 'veiculos', component: VeiculosComponent, canActivate: [AuthGuard], },
      { path: 'usuarios', component: UsuariosComponent, canActivate: [AuthGuard], },
      { path: 'ferramentaria', component: FerramentariaComponent, canActivate: [AuthGuard], },
      { path: 'clientes', component: ClientesComponent, canActivate: [AuthGuard], },
      { path: 'aeronaves', component: AeronavesComponent, canActivate: [AuthGuard], },
      { path: 'manutencao', component: ManutencaoComponent, canActivate: [AuthGuard], },
      { path: 'tripulacao', component: TripulacaoComponent, canActivate: [AuthGuard], },
      { path: 'coordenacao', component: CoordenacaoComponent, canActivate: [AuthGuard], },
      { path: 'operacao-aeromedica', component: AeromedicoComponent, canActivate: [AuthGuard], },
      { path: 'operacoes', component: OperacoesComponent, canActivate: [AuthGuard], },
      { path: '**', component: PageNotFoundComponent, }]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
