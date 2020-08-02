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

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        component: HomepageComponent,
      },
      {
        path: 'contato',
        component: ContatoComponent,
      },
      {
        path: 'fornecedores',
        component: FornecedoresComponent,
      },
      {
        path: 'veiculos',
        component: VeiculosComponent,
      },
      {
        path: 'usuarios',
        component: UsuariosComponent,
      },
      {
        path: 'ferramentaria',
        component: FerramentariaComponent,
      },
      {
        path: 'clientes',
        component: ClientesComponent,
      },
      {
        path: 'aeronaves',
        component: AeronavesComponent,
      },
      {
        path: 'manutencao',
        component: ManutencaoComponent,
      },
      {
        path: 'tripulacao',
        component: TripulacaoComponent,
      },
      {
        path: 'coordenacao',
        component: CoordenacaoComponent,
      },
      {
        path: 'operacao-aeromedica',
        component: AeromedicoComponent,
      },
      {
        path: 'operacoes',
        component: OperacoesComponent,
      },
      {
        path: '**',
        component: PageNotFoundComponent,
      }]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
