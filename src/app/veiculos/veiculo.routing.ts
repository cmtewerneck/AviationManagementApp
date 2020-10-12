import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VeiculoAppComponent } from './veiculo.app.component';
import { ListaComponent } from './lista/lista.component';
import { NovoComponent } from './novo/novo.component';
import { EditarComponent } from './editar/editar.component';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { ExcluirComponent } from './excluir/excluir.component';
import { VeiculoResolve } from './services/veiculo.resolve';
import { VeiculoGuard } from './services/veiculo.guard';

const veiculoRouterConfig: Routes = [
    {
        path: '', component: VeiculoAppComponent,
        children: [
             {
                 path: 'listar-todos', component: ListaComponent,
                 canActivate: [VeiculoGuard],
                 data: [{ claim: { nome: 'Veiculo', valor: 'Consultar' } }]
             },
             {
                path: 'adicionar-novo', component: NovoComponent,
                canDeactivate: [VeiculoGuard],
                canActivate: [VeiculoGuard],
                data: [{ claim: { nome: 'Veiculo', valor: 'Adicionar' } }]
             },
             {
                path: 'editar/:id', component: EditarComponent,
                canActivate: [VeiculoGuard],
                data: [{ claim: { nome: 'Veiculo', valor: 'Atualizar' } }],
                resolve: {
                    veiculo: VeiculoResolve
                }
             },
             {
                path: 'detalhes/:id', component: DetalhesComponent,
                resolve: {
                    veiculo: VeiculoResolve
                }
             },
             {
                path: 'excluir/:id', component: ExcluirComponent,
                canActivate: [VeiculoGuard],
                data: [{ claim: { nome: 'Veiculo', valor: 'Excluir' } }],
                resolve: {
                    veiculo: VeiculoResolve
                }
             },
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(veiculoRouterConfig)
    ],
    exports: [RouterModule]
})
export class VeiculoRoutingModule { }