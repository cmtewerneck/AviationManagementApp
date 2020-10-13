import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VeiculoMultaAppComponent } from './veiculoMulta.app.component';
import { ListaComponent } from './lista/lista.component';
import { NovoComponent } from './novo/novo.component';
import { EditarComponent } from './editar/editar.component';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { ExcluirComponent } from './excluir/excluir.component';
import { VeiculoMultaResolve } from './services/veiculoMulta.resolve';
import { VeiculoMultaGuard } from './services/veiculoMulta.guard';

const veiculoMultaRouterConfig: Routes = [
    {
        path: '', component: VeiculoMultaAppComponent,
        children: [
             {
                path: 'listar-todos', component: ListaComponent,
                data: [{ claim: { nome: 'Veiculo', valor: 'Consultar' } }]
             },
             {
                path: 'adicionar-novo', component: NovoComponent,
                canDeactivate: [VeiculoMultaGuard],
                canActivate: [VeiculoMultaGuard],
                data: [{ claim: { nome: 'Veiculo', valor: 'Adicionar' } }],
             },
             {
                path: 'editar/:id', component: EditarComponent,
                canActivate: [VeiculoMultaGuard],
                data: [{ claim: { nome: 'Veiculo', valor: 'Atualizar' } }],
                resolve: {
                    veiculoMulta: VeiculoMultaResolve
                }
             },
             {
                path: 'detalhes/:id', component: DetalhesComponent,
                resolve: {
                    veiculoMulta: VeiculoMultaResolve
                }
             },
             {
                path: 'excluir/:id', component: ExcluirComponent,
                canActivate: [VeiculoMultaGuard],
                data: [{ claim: { nome: 'Veiculo', valor: 'Excluir' } }],
                resolve: {
                    veiculoMulta: VeiculoMultaResolve
                }
             },
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(veiculoMultaRouterConfig)
    ],
    exports: [RouterModule]
})
export class VeiculoMultaRoutingModule { }