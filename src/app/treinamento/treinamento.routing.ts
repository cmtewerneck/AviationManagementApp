import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TreinamentoAppComponent } from './treinamento.app.component';
import { ListaComponent } from './lista/lista.component';
import { NovoComponent } from './novo/novo.component';
import { EditarComponent } from './editar/editar.component';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { TreinamentoResolve } from './services/treinamento.resolve';
import { TreinamentoGuard } from './services/treinamento.guard';

const treinamentoRouterConfig: Routes = [
    {
        path: '', component: TreinamentoAppComponent,
        children: [
             { path: 'listar-todos', component: ListaComponent },
             {
                path: 'adicionar-novo', component: NovoComponent,
                canDeactivate: [TreinamentoGuard],
                canActivate: [TreinamentoGuard],
                data: [{ claim: { nome: 'Treinamento', valor: 'Adicionar' } }],
             },
             {
                path: 'editar/:id', component: EditarComponent,
                canActivate: [TreinamentoGuard],
                data: [{ claim: { nome: 'Treinamento', valor: 'Atualizar' } }],
                resolve: {
                    treinamento: TreinamentoResolve
                }
             },
             {
                path: 'detalhes/:id', component: DetalhesComponent,
                resolve: {
                    treinamento: TreinamentoResolve
                }
             }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(treinamentoRouterConfig)
    ],
    exports: [RouterModule]
})
export class TreinamentoRoutingModule { }