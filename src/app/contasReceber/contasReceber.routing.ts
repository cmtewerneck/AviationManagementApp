import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContasReceberAppComponent } from './contasReceber.app.component';
import { ListaComponent } from './lista/lista.component';
import { NovoComponent } from './novo/novo.component';
import { EditarComponent } from './editar/editar.component';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { ExcluirComponent } from './excluir/excluir.component';
import { ContasReceberResolve } from './services/contasReceber.resolve';
import { ContasReceberGuard } from './services/contasReceber.guard';

const contasReceberRouterConfig: Routes = [
    {
        path: '', component: ContasReceberAppComponent,
        children: [
             { path: 'listar-todos', component: ListaComponent },
             {
                path: 'adicionar-novo', component: NovoComponent,
                canDeactivate: [ContasReceberGuard],
                canActivate: [ContasReceberGuard],
                data: [{ claim: { nome: 'Financeiro', valor: 'Adicionar' } }],
             },
             {
                path: 'editar/:id', component: EditarComponent,
                canActivate: [ContasReceberGuard],
                data: [{ claim: { nome: 'Financeiro', valor: 'Atualizar' } }],
                resolve: {
                    contasReceber: ContasReceberResolve
                }
             },
             {
                path: 'detalhes/:id', component: DetalhesComponent,
                resolve: {
                    contasReceber: ContasReceberResolve
                }
             },
             {
                path: 'excluir/:id', component: ExcluirComponent,
                canActivate: [ContasReceberGuard],
                data: [{ claim: { nome: 'Financeiro', valor: 'Excluir' } }],
                resolve: {
                    contasReceber: ContasReceberResolve
                }
             },
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(contasReceberRouterConfig)
    ],
    exports: [RouterModule]
})
export class ContasReceberRoutingModule { }