import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VeiculoGastoAppComponent } from './veiculoGasto.app.component';
import { ListaComponent } from './lista/lista.component';
import { NovoComponent } from './novo/novo.component';
import { EditarComponent } from './editar/editar.component';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { ExcluirComponent } from './excluir/excluir.component';
import { VeiculoGastoResolve } from './services/veiculoGasto.resolve';
import { VeiculoGastoGuard } from './services/veiculoGasto.guard';

const veiculoGastoRouterConfig: Routes = [
    {
        path: '', component: VeiculoGastoAppComponent,
        children: [
             {
                path: 'listar-todos', component: ListaComponent,
                data: [{ claim: { nome: 'Veiculo', valor: 'Consultar' } }]
             },
             {
                path: 'adicionar-novo', component: NovoComponent,
                canDeactivate: [VeiculoGastoGuard],
                canActivate: [VeiculoGastoGuard],
                data: [{ claim: { nome: 'Veiculo', valor: 'Adicionar' } }],
             },
             {
                path: 'editar/:id', component: EditarComponent,
                canActivate: [VeiculoGastoGuard],
                data: [{ claim: { nome: 'Veiculo', valor: 'Atualizar' } }],
                resolve: {
                    veiculoGasto: VeiculoGastoResolve
                }
             },
             {
                path: 'detalhes/:id', component: DetalhesComponent,
                resolve: {
                    veiculoGasto: VeiculoGastoResolve
                }
             },
             {
                path: 'excluir/:id', component: ExcluirComponent,
                canActivate: [VeiculoGastoGuard],
                data: [{ claim: { nome: 'Veiculo', valor: 'Excluir' } }],
                resolve: {
                    veiculoGasto: VeiculoGastoResolve
                }
             },
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(veiculoGastoRouterConfig)
    ],
    exports: [RouterModule]
})
export class VeiculoGastoRoutingModule { }