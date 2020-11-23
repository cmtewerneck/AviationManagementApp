import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrdemServicoAppComponent } from './ordemServico.app.component';
import { ListaComponent } from './lista/lista.component';
import { NovoComponent } from './novo/novo.component';
import { EditarComponent } from './editar/editar.component';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { ExcluirComponent } from './excluir/excluir.component';
import { OrdemServicoResolve } from './services/ordemServico.resolve';
import { OrdemServicoGuard } from './services/ordemServico.guard';

const ordemServicoRouterConfig: Routes = [
    {
        path: '', component: OrdemServicoAppComponent,
        children: [
             { path: 'listar-todos', component: ListaComponent },
             {
                path: 'adicionar-novo', component: NovoComponent,
                canDeactivate: [OrdemServicoGuard],
                canActivate: [OrdemServicoGuard],
                data: [{ claim: { nome: 'OrdemServico', valor: 'Adicionar' } }],
             },
             {
                path: 'editar/:id', component: EditarComponent,
                canActivate: [OrdemServicoGuard],
                data: [{ claim: { nome: 'OrdemServico', valor: 'Atualizar' } }],
                resolve: {
                    ordemServico: OrdemServicoResolve
                }
             },
             {
                path: 'detalhes/:id', component: DetalhesComponent,
                resolve: {
                    ordemServico: OrdemServicoResolve
                }
             },
             {
                path: 'excluir/:id', component: ExcluirComponent,
                canActivate: [OrdemServicoGuard],
                data: [{ claim: { nome: 'OrdemServico', valor: 'Excluir' } }],
                resolve: {
                    ordemServico: OrdemServicoResolve
                }
             },
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(ordemServicoRouterConfig)
    ],
    exports: [RouterModule]
})
export class OrdemServicoRoutingModule { }