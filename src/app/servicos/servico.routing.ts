import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServicoAppComponent } from './servico.app.component';
import { ListaComponent } from './lista/lista.component';
import { NovoComponent } from './novo/novo.component';
import { EditarComponent } from './editar/editar.component';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { ExcluirComponent } from './excluir/excluir.component';
import { ServicoResolve } from './services/servico.resolve';
import { ServicoGuard } from './services/servico.guard';

const servicoRouterConfig: Routes = [
    {
        path: '', component: ServicoAppComponent,
        children: [
             { path: 'listar-todos', component: ListaComponent },
             {
                path: 'adicionar-novo', component: NovoComponent,
                canDeactivate: [ServicoGuard],
                canActivate: [ServicoGuard],
                data: [{ claim: { nome: 'Servico', valor: 'Adicionar' } }],
             },
             {
                path: 'editar/:id', component: EditarComponent,
                canActivate: [ServicoGuard],
                data: [{ claim: { nome: 'Servico', valor: 'Atualizar' } }],
                resolve: {
                    servico: ServicoResolve
                }
             },
             {
                path: 'detalhes/:id', component: DetalhesComponent,
                resolve: {
                    servico: ServicoResolve
                }
             },
             {
                path: 'excluir/:id', component: ExcluirComponent,
                canActivate: [ServicoGuard],
                data: [{ claim: { nome: 'Servico', valor: 'Excluir' } }],
                resolve: {
                    servico: ServicoResolve
                }
             },
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(servicoRouterConfig)
    ],
    exports: [RouterModule]
})
export class ServicoRoutingModule { }