import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContasPagarAppComponent } from './contasPagar.app.component';
import { ListaComponent } from './lista/lista.component';
import { NovoComponent } from './novo/novo.component';
import { EditarComponent } from './editar/editar.component';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { ExcluirComponent } from './excluir/excluir.component';
import { ContasPagarResolve } from './services/contasPagar.resolve';
import { ContasPagarGuard } from './services/contasPagar.guard';

const contasPagarRouterConfig: Routes = [
    {
        path: '', component: ContasPagarAppComponent,
        children: [
             { path: 'listar-todos', component: ListaComponent },
             {
                path: 'adicionar-novo', component: NovoComponent,
                canDeactivate: [ContasPagarGuard],
                canActivate: [ContasPagarGuard],
                data: [{ claim: { nome: 'Financeiro', valor: 'Adicionar' } }],
             },
             {
                path: 'editar/:id', component: EditarComponent,
                canActivate: [ContasPagarGuard],
                data: [{ claim: { nome: 'Financeiro', valor: 'Atualizar' } }],
                resolve: {
                    contasPagar: ContasPagarResolve
                }
             },
             {
                path: 'detalhes/:id', component: DetalhesComponent,
                resolve: {
                    contasPagar: ContasPagarResolve
                }
             },
             {
                path: 'excluir/:id', component: ExcluirComponent,
                canActivate: [ContasPagarGuard],
                data: [{ claim: { nome: 'Financeiro', valor: 'Excluir' } }],
                resolve: {
                    contasPagar: ContasPagarResolve
                }
             },
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(contasPagarRouterConfig)
    ],
    exports: [RouterModule]
})
export class ContasPagarRoutingModule { }