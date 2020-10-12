import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EstoqueAppComponent } from './estoque.app.component';
import { ListaComponent } from './lista/lista.component';
import { NovoComponent } from './novo/novo.component';
import { EditarComponent } from './editar/editar.component';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { ExcluirComponent } from './excluir/excluir.component';
import { EstoqueResolve } from './services/estoque.resolve';
import { EstoqueGuard } from './services/estoque.guard';

const estoqueRouterConfig: Routes = [
    {
        path: '', component: EstoqueAppComponent,
        children: [
             {
                 path: 'listar-todos', component: ListaComponent,
                 canActivate: [EstoqueGuard],
                 data: [{ claim: { nome: 'Estoque', valor: 'Consultar' } }]
             },
             {
                path: 'adicionar-novo', component: NovoComponent,
                canDeactivate: [EstoqueGuard],
                canActivate: [EstoqueGuard],
                data: [{ claim: { nome: 'Estoque', valor: 'Adicionar' } }]
             },
             {
                path: 'editar/:id', component: EditarComponent,
                canActivate: [EstoqueGuard],
                data: [{ claim: { nome: 'Estoque', valor: 'Atualizar' } }],
                resolve: {
                    estoque: EstoqueResolve
                }
             },
             {
                path: 'detalhes/:id', component: DetalhesComponent,
                resolve: {
                    estoque: EstoqueResolve
                }
             },
             {
                path: 'excluir/:id', component: ExcluirComponent,
                canActivate: [EstoqueGuard],
                data: [{ claim: { nome: 'Estoque', valor: 'Excluir' } }],
                resolve: {
                    estoque: EstoqueResolve
                }
             },
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(estoqueRouterConfig)
    ],
    exports: [RouterModule]
})
export class EstoqueRoutingModule { }